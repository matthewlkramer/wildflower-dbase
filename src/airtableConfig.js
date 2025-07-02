// src/airtableConfig.js
export const AIRTABLE_CONFIG = {
    BASE_ID: import.meta.env.VITE_AIRTABLE_BASE_ID || 'appJBT9a4f3b7hWQ2',
    API_KEY: import.meta.env.VITE_AIRTABLE_API_KEY || 'patPJ0FQbeJOXZV6q.47a003922253003392f41b305cb163caba0c18ec6be85ee4bb1219d89c453048',
    BASE_URL: 'https://api.airtable.com/v0'
};

// Table names mapping from your Airtable
export const TABLES = {
    SCHOOLS: 'Schools',
    EDUCATORS: 'Educators',
    CHARTERS: 'Charters',
    EDUCATORS_X_SCHOOLS: 'Educators x Schools',
    LOCATIONS: 'Locations',
    SCHOOL_NOTES: 'School notes',
    EDUCATOR_NOTES: 'Educator notes',
    GRANTS: 'Grants',
    LOANS: 'Loans',
    ACTION_STEPS: 'Action steps',
    MEMBERSHIP_FEE_OVERVIEW: 'Membership fee overview',
    MEMBERSHIP_FEE_UPDATES: 'Membership fee change log',
    SSJ_FILLOUT_FORMS: 'SSJ Fillout Forms',
    EVENT_ATTENDANCE: 'Event attendance',
    MONTESSORI_CERTS: 'Montessori Certs',
    GUIDES_ASSIGNMENTS: 'Guides Assignments',
    GOVERNANCE_DOCS: 'Governance docs',
    EMAIL_ADDRESSES: 'Email Addresses',
    NINE_NINETIES: '990s',
    FAMILY_SURVEYS: 'Family Survey',
    ASSESSMENT_DATA: 'Assessment data'
};

// API Rate limiting configuration
//export const API_CONFIG = {
//    MAX_REQUESTS_PER_SECOND: 5,
//    REQUEST_DELAY: 200, // milliseconds
//    RETRY_ATTEMPTS: 3,
//    RETRY_DELAY: 1000 // milliseconds
//};

// Environment-specific settings
//export const ENV_CONFIG = {
//    isDevelopment: import.meta.env.DEV,
//    isProduction: import.meta.env.PROD,
//    enableDebugLogs: import.meta.env.VITE_DEBUG_LOGS === 'true'
//};