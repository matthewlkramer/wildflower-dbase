// src/utils/dataTransformers.js

// Helper functions
const safeExtract = (field) => {
  if (Array.isArray(field)) {
    return field.length > 0 ? field[0] : null;
  }
  return field || null;
};

const safeNumber = (field) => {
  if (field === null || field === undefined || field === '') return null;
  const num = parseFloat(field);
  return isNaN(num) ? null : num;
};

const safeInterestRate = (field) => {
  if (field === null || field === undefined || field === '') return null;
  let rate = parseFloat(field);
  if (isNaN(rate)) return null;
  return rate; // Airtable percent fields are already decimals
};


// Transform grant data with actual Airtable field names
export const transformGrantData = (airtableRecord) => {
  if (!airtableRecord) return null;

  return {
    id: airtableRecord.id,
    schoolId: airtableRecord['school_id'], // Use the formula field, not the relationship
    schoolShortName: airtableRecord['School Short Name'] || '', // Lookup field
    amount: safeNumber(airtableRecord['Amount']), // Currency field
    issueDate: airtableRecord['Issue Date'] || null, // Date field
    issuedBy: airtableRecord['Issued by Short Name'] || 'Unknown',
    fundingSource: airtableRecord['Funding Source'] || '', // Single select
    status: airtableRecord['Grant Status'] || 'Unknown', // Single select
    notes: airtableRecord['Notes'] || '', // Multiline text
    accountingNotes: airtableRecord['Accounting Notes'] || '', // Multiline text
    textForLedgerEntry: airtableRecord['Text for Ledger Entry'] || '',
    fundingPurpose: airtableRecord['Funding purpose (for grant agreement)'] || '',
    fundingPeriod: airtableRecord['Funding period (for grant agreement)'] || '', 
    automationStep: airtableRecord['Automation step trigger'] || '', // Single select
    prelimAdviceReqTime: airtableRecord['Preliminary advice request time'] || '', // Date field
    fullAdviceReqTime: airtableRecord['Full advice request time'] || '', // Date field
    unsignedGrantAgreement: airtableRecord['Unsigned Grant Agreement'] || '', // Attachment field
    signedGrantAgreement: airtableRecord['Signed Grant Agreement'] || '', // Attachment field
  };
};

// Transform loan data with actual Airtable field names
export const transformLoanData = (airtableRecord) => {
  if (!airtableRecord) return null;

  return {
    id: airtableRecord.id,
    schoolId: airtableRecord['school_id'], // Use the formula field, not the relationship
    amount: safeNumber(airtableRecord['Amount Issued']), // Currency field
    issueDate: airtableRecord['Effective Issue Date'] || null, // Date field
    maturityDate: airtableRecord['Maturity'] || null, // Date field
    interestRate: safeInterestRate(airtableRecord['Interest Rate']), // Percent field
    status: airtableRecord['Loan Status'] || 'Active', // Single select
    useOfProceeds: airtableRecord['Use of Proceeds'] || '', // Single select
    issueMethod: airtableRecord['Issue Method'] || '', // Single select
    approximateOutstanding: safeNumber(airtableRecord['Approximate Outstanding Amount']),
    notes: airtableRecord['Notes'] || '', // Multiline text
    createdTime: airtableRecord.createdTime
  };
};

// Transform guide assignment data with actual Airtable field names
export const transformGuideAssignmentData = (airtableRecord) => {
  if (!airtableRecord) return null;

  return {
    id: airtableRecord.id,
    schoolId: airtableRecord['school_id'], // Use the formula field, not the relationship
    schoolName: airtableRecord['School Short Name'], // Lookup field
    guideId: airtableRecord['guide_id'], // Use the formula field
    guideShortName: airtableRecord['Guide short name'] || 'Unknown', // Lookup
    type: airtableRecord['Type'] || '', // Single select (Type field)
    startDate: airtableRecord['Start date'] || null, // Date field
    endDate: airtableRecord['End date'] || null, // Date field
    currentlyActive: airtableRecord['Currently active'], // Checkbox field
    createdTime: airtableRecord.createdTime
  };
};

// Transform location data with actual Airtable field names
export const transformLocationData = (airtableRecord) => {
  if (!airtableRecord) return null;

  return {
    id: airtableRecord.id,
    schoolId: airtableRecord['school_id'], // Use the formula field, not the relationship
    address: airtableRecord['Address'] || '', // Rich text field
    startDate: airtableRecord['Start of time at location'] || '', // Date field
    endDate: airtableRecord['End of time at location'] || null, // Date field
    locationType: airtableRecord['Location type'] || '', // Single select
    currentMailingAddress: airtableRecord['Current mailing address?'], // Checkbox
    currentPhysicalAddress: airtableRecord['Current physical address?'], // Checkbox
    squareFeet: safeNumber(airtableRecord['Square feet']), // Number field
    maxStudentsLicensedFor: safeNumber(airtableRecord['Max Students Licensed For']), // Number
    neighborhood: airtableRecord['Neighborhood'] || '', // Single line text
    coLocationType: airtableRecord['Co-Location Type'] || '', // Single select
    coLocationPartner: airtableRecord['Co-Location Partner '] || '', // Single line text
    leaseEndDate: airtableRecord['Lease End Date'] || null, // Date field
    lease: airtableRecord['Lease'] || '', // Attachments field
    timeZone: airtableRecord['Time Zone'] || '', // Single select
    city: airtableRecord['City'] || '', // Single line text
    state: airtableRecord['State'] || '', // Single line text
    locationKey: airtableRecord['Location Key'] || '', // Formula field,
    latitude: airtableRecord['Latitude'] || null, // Number field
    longitude: airtableRecord['Longitude'] || null, // Number field
    censusTract: airtableRecord['Census Tract'] || '', // Single line text
    qualCDFI: airtableRecord['Qualified Low Income Census Tract'], // Checkbox field
    createdTime: airtableRecord.createdTime
  };
};

// Transform action step data with actual Airtable field names
export const transformActionStepData = (airtableRecord) => {
  if (!airtableRecord) return null;

  return {
    id: airtableRecord.id,
    schoolId: airtableRecord['school_id'], // Use the formula field, not the relationship
    schoolName: airtableRecord['School Short Name'] || '', // Lookup field
    schoolStatus: airtableRecord['School Status'] || '', // Single select
    schoolStage: airtableRecord['SSJ Stage'] || '', // Single select
    item: airtableRecord['Item'] || '', // Multiline text
    assigneeId: airtableRecord['assignee_id'] || '', // Use the formula field for ID
    assigneeShortName: airtableRecord['Assignee Short Name'] || 'Unknown', // Lookup field
    status: airtableRecord['Status'], // Single select
    dueDate: airtableRecord['Due date'] || null, // Date field
    assignedDate: airtableRecord['Assigned date'] || null, // Date field
    completedDate: airtableRecord['Completed date'] || null, // Date field
    actionStepKey: airtableRecord['action_step_id'] || '', // Formula field
    createdTime: airtableRecord.createdTime
  };
};

// Transform school note data with actual Airtable field names
export const transformSchoolNoteData = (airtableRecord) => {
  if (!airtableRecord) return null;

  return {
    id: airtableRecord.id,
    schoolId: airtableRecord['school_id'], // Use the formula field, not the relationship
    noteText: airtableRecord['Notes'] || '', // Multiline text
    createdBy: airtableRecord['Partner Short Name'] || '', // Lookup field
    createdDate: airtableRecord['Date created'] || '', // Date field
    isPrivate: airtableRecord['Private'], // Checkbox field
    createdTime: airtableRecord.createdTime
  };
};

// Transform governance doc data with actual Airtable field names
export const transformGovernanceDocData = (airtableRecord) => {
  if (!airtableRecord) return null;

  return {
    id: airtableRecord.id,
    schoolId: airtableRecord['school_id'], // Use the formula field, not the relationship
    documentType: airtableRecord['Document type'] || '', // Single select
    date: airtableRecord['Date'] || '', // Date field
    doc: airtableRecord['Document PDF'] || '', // Attachment field
    //          Array.isArray(airtableRecord['Document PDF']) && 
    //          airtableRecord['Document PDF'].length > 0 ? 
    //            airtableRecord['Document PDF'][0].url : ''), // Attachment field
    docNotes: airtableRecord['Doc notes'] || '', // Rich text
    createdTime: airtableRecord.createdTime
  };
};

// Transform educator x school relationship with actual field names
export const transformEducatorXSchoolData = (airtableRecord) => {
  if (!airtableRecord) return null;

  return {
    id: airtableRecord.id,
    educatorId: airtableRecord['educator_id'], // Use the formula field for ID,
    schoolId: airtableRecord['school_id'], // Use the formula field for ID
    schoolShortName: airtableRecord['School Short Name'] || '', // Lookup field
    educatorName: airtableRecord['Educator Full Name'] || 'Unknown', // Lookup field
    startDate: airtableRecord.['Start Date'] || null, // Date field
    endDate: airtableRecord.['End Date'] || null,  // Date field
    currentlyActive: airtableRecord['Currently Active'], // Checkbox field
    emailAtSchool: airtableRecord['Email at School'] || '', // Email field
    roles: airtableRecord['Roles'] || [], // Multiple select field
    ssjStage: airtableRecord['SSJ Stage'] || '', // Single select
    schoolStatus: airtableRecord['School Status'] || '', // Single select
    stageStatus: airtableRecord['Stage_Status'] || '', // Formula
    onConnected: airtableRecord['On Connected'] || '', // Single select
    onSlack: airtableRecord['On Slack'] || '', // Single select
    onTeacherLeaderGoogleGroup: airtableRecord['On Teacher Leader Google Group'] || '', // Single select
    onWildflowerDirectory: airtableRecord['On Wildflower Directory'] || '', // Single select
    emailStatus: airtableRecord['Email Status'] || '', // Single select
    onNationalWebsite: airtableRecord['On National Website'] || '', // Single select
    gsuiteRoles: airtableRecord['G Suite Roles'] || [], // Multiple select
    removalInitiator: airtableRecord['Who Initiated E/TL removal?'] || '', // Text field  
    createdTime: airtableRecord.createdTime
  };
};

// Transform school data with actual Airtable field names
export const transformSchoolData = (airtableRecord) => {
  if (!airtableRecord) return null;

  return {
    id: airtableRecord.id,
    name: airtableRecord['Name'] || '',
    shortName: airtableRecord['Short Name'] '',
    schoolStatus: airtableRecord['School Status'] || '', // Single select
    governanceModel: airtableRecord['Governance Model'] || '', // Single select
    agesServed: airtableRecord['Ages served'] || [], // Multiple selects

    // Location data from lookups
    currentPhysicalAddress: airtableRecord['Current Physical Address'] || '',
    activeLocationCity: airtableRecord['Current Physical Address - City'],
    activeLocationState: airtableRecord['Current Physical Address - State'],
    targetCity: airtableRecord['SSJ - Target City'] || null,
    targetState: airtableRecord['SSJ - Target State'] || null,

    priorNames: airtableRecord['Prior Names'] || '', // Single line text
    narrative: airtableRecord['Narrative'] || '', // Multiline text
    institutionalPartner: airtableRecord['Institutional partner'] || null, // Single line text
    opened: airtableRecord['Opened'] || null, // Date field
    charterName: airtableRecord['Charter Name'] || '', // Single line text
    stageStatus: airtableRecord['Stage_Status'] || '', // Formula field
    membershipStatus: airtableRecord['Membership Status'] || '', // Single select
    founders: airtableRecord['Founders'] || [], // Rollup from relationships
    membershipAgreementDate: airtableRecord['Membership Agreement date'] || '', // Date
    signedMembershipAgreement: airtableRecord['Signed Membership Agreement'] || '', // Attachment field
    agreementVersion: airtableRecord['Agreement Version'] || '', // Single select
    about: airtableRecord['About'] || '', // Multiline text
    aboutSpanish: airtableRecord['About Spanish'] || '', // Multiline text


    
    // SSJ/OSS Data - all actual field names from the metadata
    ssjStage: airtableRecord['SSJ Stage'] || '', // Single select
    ssjTargetCity: airtableRecord['SSJ - Target City'] || '', // Single line text
    ssjTargetState: airtableRecord['SSJ - Target State'] || '', // Single line text
    ssjOriginalProjectedOpenDate: airtableRecord['SSJ - Original Projected Open Date'] || '', // Date
    ssjProjOpenSchoolYear: airtableRecord['SSJ - Proj Open School Year'] || '', // Formula
    ssjProjectedOpen: airtableRecord['SSJ - Projected Open'] || '', // Date
    riskFactors: airtableRecord['Risk Factors'] || [], // Multiple selects
    watchlist: airtableRecord['Watchlist'] || [], // Multiple selects
    ssjBoardDevelopment: airtableRecord['SSJ - Board development'] || '', // Single select
    enteredVisioningDate: airtableRecord['Entered Visioning Date'] || '', // Date
    enteredPlanningDate: airtableRecord['Entered Planning Date'] || '', // Date
    enteredStartupDate: airtableRecord['Entered Startup Date'] || '', // Date
    ssjHasETLPartner: airtableRecord['SSJ - Has the ETL identified a partner?'] || '', // Single select
    ssjOpsGuideTrack: airtableRecord['SSJ - Ops Guide Support Track'] || [], // Multiple selects
    ssjReadinessRating: airtableRecord['SSJ - Readiness to Open Rating'] || '', // Single select
    ssjFacility: airtableRecord['SSJ - Facility'] || '', // Single select
    building4GoodFirm: airtableRecord['Building4Good Firm & Attorney'] || '', // Single line text
    ssjTotalStartupFunding: airtableRecord['SSJ - Total Startup Funding Needed'] || '', // Single line text
    ssjFundraisingNarrative: airtableRecord['SSJ - Fundraising narrative'] || '', // Multiline text
    planningAlbum: airtableRecord['Planning Album'] || '', // Attachment field
    activePodMember: airtableRecord['Active Pod Member'] || '', // Single select
    cohorts: airtableRecord['Cohorts'] || [], // Multiple selects


    
    // Systems - all actual field names
    googleVoice: airtableRecord['Google Voice'] || '', // Single select
    budgetUtility: airtableRecord['Budget Utility'] || '', // Single select
    admissionsSystem: airtableRecord['Admissions System'] || '', // Single select
    qbo: airtableRecord['QBO'] || '', // Single select
    websiteTool: airtableRecord['Website tool'] || '', // Single select
    logoDesigner: airtableRecord['Logo designer'] || '', // Single select
    transparentClassroom: airtableRecord['Transparent Classroom'] || '', // Single select
    tcAdmissions: airtableRecord['TC Admissions'] || '', // Single select
    tcRecordkeeping: airtableRecord['TC Recordkeeping'] || '', // Single select
    gusto: airtableRecord['Gusto'] || '', // Single select
    businessInsurance: airtableRecord['Business Insurance'] || '', // Single select
    nameSelectionProposal: airtableRecord['Name Selection Proposal'] || '', // Single select
    trademarkFiled: airtableRecord['Trademark Filed'] || '', // Single select
    billComAccount: airtableRecord['Bill.com Account'] || '', // Single select
    googleWorkspacePath: airtableRecord['Google Workspace Org Unit Path'] || '', // Text
    budgetLink: airtableRecord['Budget Link'] || '', // Single line text
    bookkeeper: airtableRecord['Bookkeeper / Accountant'] || '', // Single select


    
    // Additional fields
    currentTLs: airtableRecord['Current TLs'] || [], // Rollup
    programFocus: airtableRecord['Program Focus'] || [], // Multiple selects
    maxCapacityEnrollments: safeNumber(airtableRecord['Enrollment at Full Capacity']), // Number
    numberOfClassrooms: safeNumber(airtableRecord['Number of classrooms']), // Number
    schoolCalendar: airtableRecord['School calendar'] || '', // Single select
    schoolSchedule: airtableRecord['School schedule'] || [], // Multiple selects
    flexibleTuitionModel: airtableRecord['Flexible Tuition Model'] === true, // Checkbox
    publicFundingSources: airtableRecord['Public funding sources'] || [], // Multiple selects
    
    // Contact and Comms info
    schoolEmail: airtableRecord['School Email'] || '', // Email field
    emailDomain: airtableRecord['Email Domain'] || '', // Single line text
    primaryPhone: airtableRecord['School Phone'] || '', // Phone number field
    secondaryPhone: airtableRecord['Secondary Phone'] || null, // Phone number field
    facebook: airtableRecord['Facebook'] || '', // Single line text
    instagram: airtableRecord['Instagram'] || '', // Single line text
    website: airtableRecord['Website'] || '', // Single line text
    onNationalWebsite: airtableRecord['On National Website'] || '', // Single select
    
    // Logo - check for attachment field
    logo: (airtableRecord['Logo'] && 
           Array.isArray(airtableRecord['Logo']) && 
           airtableRecord['Logo'].length > 0) ? 
             airtableRecord['Logo'][0].url : null, // Attachment field
    logoThumbnail: (airtableRecord['Logo'] && 
                    Array.isArray(airtableRecord['Logo']) && 
                    airtableRecord['Logo'].length > 0 &&
                    airtableRecord['Logo'][0].thumbnails) ? 
                      airtableRecord['Logo'][0].thumbnails.large?.url || 
                      airtableRecord['Logo'][0].thumbnails.small?.url || 
                      airtableRecord['Logo'][0].url : null,
    
    // Legal entity
    legalStructure: airtableRecord['Legal structure'] || '', // Single select
    ein: airtableRecord['EIN'] || '', // Single line text
    legalName: airtableRecord['Legal Name'] || '', // Single line text
    incorporationDate: airtableRecord['Incorporation Date'] || '', // Date field
    nonprofitStatus: airtableRecord['Nonprofit status'] || '', // Single select
    groupExemptionStatus: airtableRecord['Group exemption status'] || '', // Single select
    dateReceivedGroupExemption: airtableRecord['Date received group exemption'] || '', // Date
    dateWithdrawnFromGroupExemption: airtableRecord['Date withdrawn from Group Exemption'] || null, // Date
    currentFYEnd: airtableRecord['Current FY end'] || '', // Single select

    
    // Closed school fields
    leftNetworkDate: airtableRecord['Left Network Date'] || null, // Date
    leftNetworkReason: airtableRecord['Left Network Reason'] || [], // Multiple selects
    
    createdTime: airtableRecord.createdTime
  };
};

// Transform educator data (keeping existing structure as it looked correct)
export const transformEducatorData = (airtableRecord) => {
  if (!airtableRecord) return null;

  return {
    id: airtableRecord.id,
    fullName: airtableRecord['Full Name'] || '',
    firstName: airtableRecord['First Name'] || '',
    nickname: airtableRecord['Nickname'] || '',
    middleName: airtableRecord['Middle Name'] || '',
    lastName: airtableRecord['Last Name'] || '',
    contactEmail: airtableRecord['Current Primary Email Address'],
    emailAddresses: airtableRecord['Email Addresses'] || [],
    currentlyActiveAtASchool: airtableRecord['Currently Active at a School?'],
    currentSchool: airtableRecord['Currently Active School'] || '',
    currentSchoolStageStatus: airtableRecord['Stage_Status for Active School'] || '', // Formula field
    currentRole: airtableRecord['Current Role'] || '', // Single select
    discoveryStatus: airtableRecord['Discovery status'] || '',
    individualType: airtableRecord['Individual Type'] || '',
    montessoriCertified: airtableRecord['Montessori Certified'],
    montessoriLeadGuideTraining: airtableRecord['Montessori Lead Guide Training'] || '',
    startupStageForActiveSchool: airtableRecord['Startup Stage for Active School'] || '',

    
    // Demographics
    pronouns: airtableRecord['Pronouns'] || '',
    pronounsOther: airtableRecord['Pronouns - Other'] || '',
    raceEthnicity: airtableRecord['Race & Ethnicity'] || [],
    raceEthnicityOther: airtableRecord['Race & Ethnicity - Other'] || '',
    gender: airtableRecord['Gender'] || '',
    genderOther: airtableRecord['Gender - Other'] || '',
    householdIncome: airtableRecord['Household Income'] || '',
    incomeBackground: airtableRecord['Income Background'] || '',
    educationalAttainment: airtableRecord['Educational Attainment'] || '',
    lgbtqia: airtableRecord['LGBTQIA'] === 'TRUE',
    primaryLanguage: safeExtract(airtableRecord['Primary Language']) || '',
    otherLanguages: airtableRecord['Other languages'] || [],
    
    // Contact Info
    primaryPhone: airtableRecord['Primary phone'] || null,
    secondaryPhone: airtableRecord['Secondary phone'] || null,
    homeAddress: airtableRecord['Home Address'] || '',
    excludeFromEmailLogging: airtableRecord['Exclude from email logging'], // Checkbox


    // Target location
    targetGeo: airtableRecord['Target geo combined'] || '',
    targetIntl: airtableRecord['Target - international'] || '',
    targetCity: airtableRecord['Target city'] || '',
    targetState: airtableRecord['Target state'] || '',
  
    assignedPartnerEmail: airtableRecord['Assigned Partner Email'] || '', // Lookup field
    assignedPartnerOverride: airtableRecord['Assigned Partner Override'] || '', // Single line text
    assignedPartnerShortName: airtableRecord['Assigned Partner Short Name'] || '', // Lookup field

    selfReflection: airtableRecord['Self-reflection'] || '', // Attachment
  
    // First contact info
    firstContactRelocate: airtableRecord['First Contact - Willingness to Relocate'] || '', // Single select
    firstContactGovernance: airtableRecord['First Contact - Initial Interest in Governance Model'] || '', // Single select
    firstContactPreWFEmployment: airtableRecord['First Contact - Notes on pre-Wildflower Employment'] || '', // Single select
    firstContactWFSchoolEmployee: airtableRecord['First Contact - WF School Employment Status'] || '',
    firstContactAges: airtableRecord['First Contact - initial interest in ages'] || [], // Multiple selects
    firstContactInterests: airtableRecord['First Contact - Initial Interests'] || '', // Text

    // Ops Guide
    opsGuideMeetingPrefTime: airtableRecord['Ops Guide Meeting Preferrence Time'] || '', // Single select
    opsGuideSpecificsChecklist: airtableRecord['Ops Guide Specifics Checklist'] || [], // Multiple selects
    opsGuideReqPertinentInfo: airtableRecord['Ops Guide Request Pertinent Info'] || [], // Multiple selects
    opsGuideSupportTypeNeeded: airtableRecord['Ops Guide Support Type Needed'] || [], // Multiple selects
    opsGuideFundraisingOps: airtableRecord['Ops Guide Any fundraising opportunities?'] || '', // Long text

    inactiveFlag: airtableRecord['Inactive Flag'] || '', // Checkbox
    createdTime: airtableRecord.createdTime
  };
};

// Batch transform functions
export const transformSchoolsData = (airtableRecords) => {
  if (!Array.isArray(airtableRecords)) {
    return [];
  }
  return airtableRecords.map(transformSchoolData).filter(Boolean);
};

export const transformEducatorsData = (airtableRecords) => {
  if (!Array.isArray(airtableRecords)) {
    return [];
  }
  return airtableRecords.map(transformEducatorData).filter(Boolean);
};

export const transformEducatorsXSchoolsData = (airtableRecords) => {
  if (!Array.isArray(airtableRecords)) {
    return [];
  }
  return airtableRecords.map(transformEducatorXSchoolData).filter(Boolean);
};

export const transformLocationsData = (airtableRecords) => {
  if (!Array.isArray(airtableRecords)) {
    return [];
  }
  return airtableRecords.map(transformLocationData).filter(Boolean);
};

export const transformGrantsData = (airtableRecords) => {
  if (!Array.isArray(airtableRecords)) {
    return [];
  }
  return airtableRecords.map(transformGrantData).filter(Boolean);
};

export const transformLoansData = (airtableRecords) => {
  if (!Array.isArray(airtableRecords)) {
    return [];
  }
  return airtableRecords.map(transformLoanData).filter(Boolean);
};

export const transformGuideAssignmentsData = (airtableRecords) => {
  if (!Array.isArray(airtableRecords)) {
    return [];
  }
  return airtableRecords.map(transformGuideAssignmentData).filter(Boolean);
};

export const transformActionStepsData = (airtableRecords) => {
  if (!Array.isArray(airtableRecords)) {
    return [];
  }
  return airtableRecords.map(transformActionStepData).filter(Boolean);
};

// Charter data transformer (keeping minimal structure)
export const transformCharterData = (airtableRecord) => {
  if (!airtableRecord) return null;

  return {
    id: airtableRecord.id,
    name: airtableRecord['Full name'] || airtableRecord['Charter key'] || '',
    shortName: airtableRecord['Short Name'] || '',
    status: airtableRecord['Status'] || '',
    initialTargetCommunity: airtableRecord['Initial target community'] || ''
  };
};

export const transformChartersData = (airtableRecords) => {
  if (!Array.isArray(airtableRecords)) {
    return [];
  }
  return airtableRecords.map(transformCharterData).filter(Boolean);
};