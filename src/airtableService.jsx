// src/airtableService.jsx

import { AIRTABLE_CONFIG, TABLES } from './airtableConfig.js';
import { rateLimiter } from './utils/rateLimiter.js';

class AirtableService {
    constructor() {
        this.baseUrl = `${AIRTABLE_CONFIG.BASE_URL}/${AIRTABLE_CONFIG.BASE_ID}`;
        this.headers = {
            'Authorization': `Bearer ${AIRTABLE_CONFIG.API_KEY}`,
            'Content-Type': 'application/json'
        };
    }

    // Generic method to fetch records from any table
    async fetchRecords(tableName, options = {}) {
        const {
            view,
            maxRecords = 10000, // Get all records by default
            pageSize = 100,
            sort,
            filterByFormula,
            fields
        } = options;

        let allRecords = [];
        let offset = null;
        let pageCount = 0;

        do {
            const params = new URLSearchParams();
            if (view) params.append('view', view);
            if (pageSize) params.append('pageSize', pageSize);
            if (sort && sort.field) {
                params.append('sort[0][field]', sort.field);
                params.append('sort[0][direction]', sort.direction || 'asc');
            }
            if (filterByFormula) params.append('filterByFormula', filterByFormula);
            if (fields && Array.isArray(fields)) fields.forEach(field => params.append('fields[]', field));
            if (offset) params.append('offset', offset);

            const url = `${this.baseUrl}/${encodeURIComponent(tableName)}?${params.toString()}`;

            const response = await rateLimiter.throttle(() =>
                fetch(url, {
                    headers: this.headers,
                    mode: 'cors'
                })
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Airtable API error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            const recordsInThisPage = data.records || [];

            allRecords = allRecords.concat(recordsInThisPage);
            offset = data.offset;
            pageCount++;

            // Stop if no more pages or we've reached maxRecords
            if (!offset || allRecords.length >= maxRecords) {
                break;
            }

            // Safety check to prevent infinite loops
            if (pageCount > 100) {
                // Stopping after 100 pages to prevent infinite loop
                break;
            }

        } while (offset);

        // Trim to maxRecords if we got too many
        if (allRecords.length > maxRecords) {
            allRecords = allRecords.slice(0, maxRecords);
        }
        return this.transformRecords(allRecords);
    }

    // Transform Airtable records to a more usable format
    transformRecords(records) {
        const transformed = records.map(record => ({
            id: record.id,
            ...record.fields,
            createdTime: record.createdTime
        }));
        return transformed;
    }

    // Create a new record
    async createRecord(tableName, fields) {
        const url = `${this.baseUrl}/${encodeURIComponent(tableName)}`;
        const response = await rateLimiter.throttle(() =>
            fetch(url, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({ fields })
            })
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return this.transformRecords([data])[0];
    }

    // Update a record
    async updateRecord(tableName, recordId, fields) {
        const url = `${this.baseUrl}/${encodeURIComponent(tableName)}/${recordId}`;
        const response = await rateLimiter.throttle(() =>
            fetch(url, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({ fields })
            })
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return this.transformRecords([data])[0];
    }

    // Delete a record
    async deleteRecord(tableName, recordId) {
        const url = `${this.baseUrl}/${encodeURIComponent(tableName)}/${recordId}`;
        const response = await rateLimiter.throttle(() =>
            fetch(url, {
                method: 'DELETE',
                headers: this.headers
            })
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true;
    }

    // Get table schema/fields
    async getTableFields(tableName) {
        // Fetch just one record to inspect fields
        const options = { maxRecords: 1 };
        const records = await this.fetchRecords(tableName, options);
        if (records.length > 0) {
            const fields = Object.keys(records[0]).filter(key => key !== 'id' && key !== 'createdTime');
            return fields;
        }
        return [];
    }

    // Fetch schools
    async fetchSchools(includeInactive = false) {
        const options = {
            sort: { field: 'Name', direction: 'asc' },
        };

        if (!includeInactive) {
            options.filterByFormula = "OR({School Status} = 'Open', {School Status} = 'Emerging')";
        }

        const schools = await this.fetchRecords(TABLES.SCHOOLS, options);
        return schools;
    }

    // Fetch educators
    async fetchEducators() {
        const options = {
            sort: { field: 'Last Name', direction: 'asc' },
        };
        // includeInactive is not used, so we don't add filterByFormula
        const result = await this.fetchRecords(TABLES.EDUCATORS, options);
        return result;
    }

    // Fetch charters
    async fetchCharters() {
        return this.fetchRecords(TABLES.CHARTERS, {
            sort: { field: 'Initial target community', direction: 'asc' }
        });
    }

    // Fetch relationships between educators and schools
    async fetchEducatorsXSchools() {
        const result = await this.fetchRecords(TABLES.EDUCATORS_X_SCHOOLS, {
            sort: { field: 'Start Date', direction: 'desc' }
        });
        
        return result;
    }

    // Add a generic method to fetch all records from any table (for your hooks)
    async getAllRecords(tableName, options = {}) {
        return this.fetchRecords(tableName, {
            maxRecords: 10000, // Allow up to 10,000 records
            ...options
        });
    }

    async fetchBySchoolId(tableName, schoolId, sortField = null, sortDirection = 'desc') {
        let options = {};
        options.filterByFormula = `{School} = "${schoolId}"`;
        if (sortField) options.sort = { field: sortField, direction: sortDirection };
        const result = await this.fetchRecords(tableName, options);
        return result;
    }

    // Locations - using 'Start of time at location' field
    async fetchSchoolLocations(schoolId) {
        return this.fetchBySchoolId(TABLES.LOCATIONS, schoolId, 'Start of time at location', 'desc');
    }

    // School Notes - using 'Date created' field
    async fetchSchoolNotes(schoolId) {
        return this.fetchBySchoolId(TABLES.SCHOOL_NOTES, schoolId, 'Date created', 'desc');
    }

    // Action Steps - using 'Due date' field, table name is 'Schools' (plural)
    async fetchSchoolActionSteps(schoolId) {
        return this.fetchBySchoolId(TABLES.ACTION_STEPS, schoolId, 'Due date', 'asc');
    }

    // Governance Documents - using 'Date' field
    async fetchSchoolGovernanceDocs(schoolId) {
        return this.fetchBySchoolId(TABLES.GOVERNANCE_DOCS, schoolId, 'Date', 'desc');
    }

    // Guide Assignments - using 'Start date' field
    async fetchSchoolGuideAssignments(schoolId) {
        return this.fetchBySchoolId(TABLES.GUIDES_ASSIGNMENTS, schoolId, 'Start date', 'desc');
    }

    // Grants - using 'Issue Date' field
    async fetchSchoolGrants(schoolId) {
        return this.fetchBySchoolId(TABLES.GRANTS, schoolId, 'Issue Date', 'desc');
    }

    // Loans - using 'Effective Issue Date' field
    async fetchSchoolLoans(schoolId) {
        return this.fetchBySchoolId(TABLES.LOANS, schoolId, 'Effective Issue Date', 'desc');
    }

    // Family Surveys
    async fetchFamilySurveys(schoolId) {
        return this.fetchBySchoolId(TABLES.FAMILY_SURVEYS, schoolId, 'School year', 'desc');
    }

    // Membership Fee Overview
    async fetchSchoolMembershipFees(schoolId) {
        return this.fetchBySchoolId(TABLES.MEMBERSHIP_FEE_OVERVIEW, schoolId, 'School year', 'desc');
    }

    async fetchByEducatorId(tableName, educatorId, sortField = null, sortDirection = 'desc') {
        let options = {}
        options.filterByFormula = `{Educator} = "${educatorId}"`;
        if (sortField) options.sort = { field: sortField, direction: sortDirection };
        const result = await this.fetchRecords(tableName, options);
        return result;
    }

    // Fetch SSJ forms for a specific educator
    async fetchEducatorSSJForms(educatorId) {
        return this.fetchByEducatorId(TABLES.SSJ_FILLOUT_FORMS, educatorId, 'Entry Date', 'desc');
    }

    // Fetch event attendance for a specific educator
    async fetchEducatorEventAttendance(educatorId) {
        return this.fetchByEducatorId(TABLES.EVENT_ATTENDANCE, educatorId, 'Registration Date', 'desc');
    }

    // Fetch Montessori certifications for a specific educator
    async fetchEducatorMontessoriCerts(educatorId) {
        return this.fetchByEducatorId(TABLES.MONTESSORI_CERTS, educatorId, 'Year Certified', 'desc');
    }
}

export const airtableService = new AirtableService();