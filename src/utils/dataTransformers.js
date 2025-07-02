// src/utils/dataTransformers.js

// ---- Helpers ----
const safeExtract = (field) => {
  if (Array.isArray(field)) return field.length > 0 ? field[0] : null;
  return field || null;
};
const safeNumber = (field) => {
  if (field === null || field === undefined || field === "") return null;
  const num = parseFloat(field);
  return isNaN(num) ? null : num;
};
const safeInterestRate = (field) => {
  if (field === null || field === undefined || field === "") return null;
  let rate = parseFloat(field);
  if (isNaN(rate)) return null;
  return rate;
};

// ---- Single-record transformers ----

export const transformGrantData = (r) => r && {
  id: r.id,
  schoolId: r['school_id'],
  schoolShortName: r['School Short Name'] || '',
  amount: safeNumber(r['Amount']),
  issueDate: r['Issue Date'] || null,
  issuedBy: r['Issued by Short Name'] || 'Unknown',
  fundingSource: r['Funding Source'] || '',
  status: r['Grant Status'] || 'Unknown',
  notes: r['Notes'] || '',
  accountingNotes: r['Accounting Notes'] || '',
  textForLedgerEntry: r['Text for Ledger Entry'] || '',
  fundingPurpose: r['Funding purpose (for grant agreement)'] || '',
  fundingPeriod: r['Funding period (for grant agreement)'] || '',
  automationStep: r['Automation step trigger'] || '',
  prelimAdviceReqTime: r['Preliminary advice request time'] || '',
  fullAdviceReqTime: r['Full advice request time'] || '',
  unsignedGrantAgreement: r['Unsigned Grant Agreement'] || '',
  signedGrantAgreement: r['Signed Grant Agreement'] || '',
};

export const transformLoanData = (r) => r && {
  id: r.id,
  schoolId: r['school_id'],
  amount: safeNumber(r['Amount Issued']),
  issueDate: r['Effective Issue Date'] || null,
  maturityDate: r['Maturity'] || null,
  interestRate: safeInterestRate(r['Interest Rate']),
  status: r['Loan Status'] || 'Active',
  useOfProceeds: r['Use of Proceeds'] || '',
  issueMethod: r['Issue Method'] || '',
  approximateOutstanding: safeNumber(r['Approximate Outstanding Amount']),
  notes: r['Notes'] || '',
  createdTime: r.createdTime
};

export const transformGuideAssignmentData = (r) => r && {
  id: r.id,
  schoolId: r['school_id'],
  schoolName: r['School Short Name'],
  guideId: r['guide_id'],
  guideShortName: r['Guide short name'] || 'Unknown',
  type: r['Type'] || '',
  startDate: r['Start date'] || null,
  endDate: r['End date'] || null,
  currentlyActive: r['Currently active'],
  createdTime: r.createdTime
};

export const transformLocationData = (r) => r && {
  id: r.id,
  schoolId: r['school_id'],
  address: r['Address'] || '',
  startDate: r['Start of time at location'] || '',
  endDate: r['End of time at location'] || null,
  locationType: r['Location type'] || '',
  currentMailingAddress: r['Current mailing address?'],
  currentPhysicalAddress: r['Current physical address?'],
  squareFeet: safeNumber(r['Square feet']),
  maxStudentsLicensedFor: safeNumber(r['Max Students Licensed For']),
  neighborhood: r['Neighborhood'] || '',
  coLocationType: r['Co-Location Type'] || '',
  coLocationPartner: r['Co-Location Partner '] || '',
  leaseEndDate: r['Lease End Date'] || null,
  lease: r['Lease'] || '',
  timeZone: r['Time Zone'] || '',
  city: r['City'] || '',
  state: r['State'] || '',
  locationKey: r['Location Key'] || '',
  latitude: r['Latitude'] || null,
  longitude: r['Longitude'] || null,
  censusTract: r['Census Tract'] || '',
  qualCDFI: r['Qualified Low Income Census Tract'],
  createdTime: r.createdTime
};

export const transformActionStepData = (r) => r && {
  id: r.id,
  schoolId: r['school_id'],
  schoolName: r['School Short Name'] || '',
  schoolStatus: r['School Status'] || '',
  schoolStage: r['SSJ Stage'] || '',
  item: r['Item'] || '',
  assigneeId: r['assignee_id'] || '',
  assigneeShortName: r['Assignee Short Name'] || 'Unknown',
  status: r['Status'],
  dueDate: r['Due date'] || null,
  assignedDate: r['Assigned date'] || null,
  completedDate: r['Completed date'] || null,
  actionStepKey: r['action_step_id'] || '',
  createdTime: r.createdTime
};

export const transformSchoolNoteData = (r) => r && {
  id: r.id,
  schoolId: r['school_id'],
  noteText: r['Notes'] || '',
  createdBy: r['Partner Short Name'] || '',
  createdDate: r['Date created'] || '',
  isPrivate: r['Private'],
  createdTime: r.createdTime
};

export const transformGovernanceDocData = (r) => r && {
  id: r.id,
  schoolId: r['school_id'],
  documentType: r['Document type'] || '',
  date: r['Date'] || '',
  doc: r['Document PDF'] || '',
  docNotes: r['Doc notes'] || '',
  createdTime: r.createdTime
};

export const transformEducatorXSchoolData = (r) => r && {
  id: r.id,
  educatorId: r['educator_id'],
  schoolId: r['school_id'],
  schoolShortName: r['School Short Name'] || '',
  educatorName: r['Educator Full Name'] || 'Unknown',
  startDate: r['Start Date'] || null,
  endDate: r['End Date'] || null,
  currentlyActive: r['Currently Active'],
  emailAtSchool: r['Email at School'] || '',
  roles: r['Roles'] || [],
  ssjStage: r['SSJ Stage'] || '',
  schoolStatus: r['School Status'] || '',
  stageStatus: r['Stage_Status'] || '',
  onConnected: r['On Connected'] || '',
  onSlack: r['On Slack'] || '',
  onTeacherLeaderGoogleGroup: r['On Teacher Leader Google Group'] || '',
  onWildflowerDirectory: r['On Wildflower Directory'] || '',
  emailStatus: r['Email Status'] || '',
  onNationalWebsite: r['On National Website'] || '',
  gsuiteRoles: r['G Suite Roles'] || [],
  removalInitiator: r['Who Initiated E/TL removal?'] || '',
  createdTime: r.createdTime
};

export const transformSchoolData = (r) => r && {
  id: r.id,
  name: r['Name'] || '',
  shortName: r['Short Name'] || '',
  schoolStatus: r['School Status'] || '',
  governanceModel: r['Governance Model'] || '',
  agesServed: r['Ages served'] || [],
  // --- Location data from lookups ---
  currentPhysicalAddress: r['Current Physical Address'] || '',
  activeLocationCity: r['Current Physical Address - City'],
  activeLocationState: r['Current Physical Address - State'],
  targetCity: r['SSJ - Target City'] || null,
  targetState: r['SSJ - Target State'] || null,
  priorNames: r['Prior Names'] || '',
  narrative: r['Narrative'] || '',
  institutionalPartner: r['Institutional partner'] || null,
  opened: r['Opened'] || null,
  charterName: r['Charter Name'] || '',
  stageStatus: r['Stage_Status'] || '',
  membershipStatus: r['Membership Status'] || '',
  founders: r['Founders'] || [],
  membershipAgreementDate: r['Membership Agreement date'] || '',
  signedMembershipAgreement: r['Signed Membership Agreement'] || '',
  agreementVersion: r['Agreement Version'] || '',
  about: r['About'] || '',
  aboutSpanish: r['About Spanish'] || '',
  // --- SSJ/OSS Data ---
  ssjStage: r['SSJ Stage'] || '',
  ssjTargetCity: r['SSJ - Target City'] || '',
  ssjTargetState: r['SSJ - Target State'] || '',
  ssjOriginalProjectedOpenDate: r['SSJ - Original Projected Open Date'] || '',
  ssjProjOpenSchoolYear: r['SSJ - Proj Open School Year'] || '',
  ssjProjectedOpen: r['SSJ - Projected Open'] || '',
  riskFactors: r['Risk Factors'] || [],
  watchlist: r['Watchlist'] || [],
  ssjBoardDevelopment: r['SSJ - Board development'] || '',
  enteredVisioningDate: r['Entered Visioning Date'] || '',
  enteredPlanningDate: r['Entered Planning Date'] || '',
  enteredStartupDate: r['Entered Startup Date'] || '',
  ssjHasETLPartner: r['SSJ - Has the ETL identified a partner?'] || '',
  ssjOpsGuideTrack: r['SSJ - Ops Guide Support Track'] || [],
  ssjReadinessRating: r['SSJ - Readiness to Open Rating'] || '',
  ssjFacility: r['SSJ - Facility'] || '',
  building4GoodFirm: r['Building4Good Firm & Attorney'] || '',
  ssjTotalStartupFunding: r['SSJ - Total Startup Funding Needed'] || '',
  ssjFundraisingNarrative: r['SSJ - Fundraising narrative'] || '',
  planningAlbum: r['Planning Album'] || '',
  activePodMember: r['Active Pod Member'] || '',
  cohorts: r['Cohorts'] || [],
  // --- Systems ---
  googleVoice: r['Google Voice'] || '',
  budgetUtility: r['Budget Utility'] || '',
  admissionsSystem: r['Admissions System'] || '',
  qbo: r['QBO'] || '',
  websiteTool: r['Website tool'] || '',
  logoDesigner: r['Logo designer'] || '',
  transparentClassroom: r['Transparent Classroom'] || '',
  tcAdmissions: r['TC Admissions'] || '',
  tcRecordkeeping: r['TC Recordkeeping'] || '',
  gusto: r['Gusto'] || '',
  businessInsurance: r['Business Insurance'] || '',
  nameSelectionProposal: r['Name Selection Proposal'] || '',
  trademarkFiled: r['Trademark Filed'] || '',
  billComAccount: r['Bill.com Account'] || '',
  googleWorkspacePath: r['Google Workspace Org Unit Path'] || '',
  budgetLink: r['Budget Link'] || '',
  bookkeeper: r['Bookkeeper / Accountant'] || '',
  // --- Additional fields ---
  currentTLs: r['Current TLs'] || [],
  programFocus: r['Program Focus'] || [],
  maxCapacityEnrollments: safeNumber(r['Enrollment at Full Capacity']),
  numberOfClassrooms: safeNumber(r['Number of classrooms']),
  schoolCalendar: r['School calendar'] || '',
  schoolSchedule: r['School schedule'] || [],
  flexibleTuitionModel: r['Flexible Tuition Model'] === true,
  publicFundingSources: r['Public funding sources'] || [],
  schoolEmail: r['School Email'] || '',
  emailDomain: r['Email Domain'] || '',
  primaryPhone: r['School Phone'] || '',
  secondaryPhone: r['Secondary Phone'] || null,
  facebook: r['Facebook'] || '',
  instagram: r['Instagram'] || '',
  website: r['Website'] || '',
  onNationalWebsite: r['On National Website'] || '',
  // Logo fields
  logo: (r['Logo'] && Array.isArray(r['Logo']) && r['Logo'].length > 0)
    ? r['Logo'][0].url : null,
  logoThumbnail: (r['Logo'] && Array.isArray(r['Logo']) && r['Logo'].length > 0 && r['Logo'][0].thumbnails)
    ? r['Logo'][0].thumbnails.large?.url || r['Logo'][0].thumbnails.small?.url || r['Logo'][0].url
    : null,
  // Legal entity
  legalStructure: r['Legal structure'] || '',
  ein: r['EIN'] || '',
  legalName: r['Legal Name'] || '',
  incorporationDate: r['Incorporation Date'] || '',
  nonprofitStatus: r['Nonprofit status'] || '',
  groupExemptionStatus: r['Group exemption status'] || '',
  dateReceivedGroupExemption: r['Date received group exemption'] || '',
  dateWithdrawnFromGroupExemption: r['Date withdrawn from Group Exemption'] || null,
  currentFYEnd: r['Current FY end'] || '',
  leftNetworkDate: r['Left Network Date'] || null,
  leftNetworkReason: r['Left Network Reason'] || [],
  createdTime: r.createdTime
};

export const transformEducatorData = (r) => r && {
  id: r.id,
  fullName: r['Full Name'] || '',
  firstName: r['First Name'] || '',
  nickname: r['Nickname'] || '',
  middleName: r['Middle Name'] || '',
  lastName: r['Last Name'] || '',
  contactEmail: r['Current Primary Email Address'],
  emailAddresses: r['Email Addresses'] || [],
  currentlyActiveAtASchool: r['Currently Active at a School?'],
  currentSchool: r['Currently Active School'] || '',
  currentSchoolStageStatus: r['Stage_Status for Active School'] || '',
  currentRole: r['Current Role'] || '',
  discoveryStatus: r['Discovery status'] || '',
  individualType: r['Individual Type'] || '',
  montessoriCertified: r['Montessori Certified'],
  montessoriLeadGuideTraining: r['Montessori Lead Guide Training'] || '',
  startupStageForActiveSchool: r['Startup Stage for Active School'] || '',
  // Demographics
  pronouns: r['Pronouns'] || '',
  pronounsOther: r['Pronouns - Other'] || '',
  raceEthnicity: r['Race & Ethnicity'] || [],
  raceEthnicityOther: r['Race & Ethnicity - Other'] || '',
  gender: r['Gender'] || '',
  genderOther: r['Gender - Other'] || '',
  householdIncome: r['Household Income'] || '',
  incomeBackground: r['Income Background'] || '',
  educationalAttainment: r['Educational Attainment'] || '',
  lgbtqia: r['LGBTQIA'] === 'TRUE',
  primaryLanguage: safeExtract(r['Primary Language']) || '',
  otherLanguages: r['Other languages'] || [],
  primaryPhone: r['Primary phone'] || null,
  secondaryPhone: r['Secondary phone'] || null,
  homeAddress: r['Home Address'] || '',
  excludeFromEmailLogging: r['Exclude from email logging'],
  targetGeo: r['Target geo combined'] || '',
  targetIntl: r['Target - international'] || '',
  targetCity: r['Target city'] || '',
  targetState: r['Target state'] || '',
  assignedPartnerEmail: r['Assigned Partner Email'] || '',
  assignedPartnerOverride: r['Assigned Partner Override'] || '',
  assignedPartnerShortName: r['Assigned Partner Short Name'] || '',
  selfReflection: r['Self-reflection'] || '',
  firstContactRelocate: r['First Contact - Willingness to Relocate'] || '',
  firstContactGovernance: r['First Contact - Initial Interest in Governance Model'] || '',
  firstContactPreWFEmployment: r['First Contact - Notes on pre-Wildflower Employment'] || '',
  firstContactWFSchoolEmployee: r['First Contact - WF School Employment Status'] || '',
  firstContactAges: r['First Contact - initial interest in ages'] || [],
  firstContactInterests: r['First Contact - Initial Interests'] || '',
  opsGuideMeetingPrefTime: r['Ops Guide Meeting Preferrence Time'] || '',
  opsGuideSpecificsChecklist: r['Ops Guide Specifics Checklist'] || [],
  opsGuideReqPertinentInfo: r['Ops Guide Request Pertinent Info'] || [],
  opsGuideSupportTypeNeeded: r['Ops Guide Support Type Needed'] || [],
  opsGuideFundraisingOps: r['Ops Guide Any fundraising opportunities?'] || '',
  inactiveFlag: r['Inactive Flag'] || '',
  createdTime: r.createdTime
};

export const transformCharterData = (r) => r && {
  id: r.id,
  name: r['Full name'] || r['Charter key'] || '',
  shortName: r['Short Name'] || '',
  status: r['Status'] || '',
  initialTargetCommunity: r['Initial target community'] || ''
};

// ---- Batch transformers ----

export const transformSchoolsData = (records) => Array.isArray(records) ? records.map(transformSchoolData).filter(Boolean) : [];
export const transformEducatorsData = (records) => Array.isArray(records) ? records.map(transformEducatorData).filter(Boolean) : [];
export const transformEducatorsXSchoolsData = (records) => Array.isArray(records) ? records.map(transformEducatorXSchoolData).filter(Boolean) : [];
export const transformLocationsData = (records) => Array.isArray(records) ? records.map(transformLocationData).filter(Boolean) : [];
export const transformGrantsData = (records) => Array.isArray(records) ? records.map(transformGrantData).filter(Boolean) : [];
export const transformLoansData = (records) => Array.isArray(records) ? records.map(transformLoanData).filter(Boolean) : [];
export const transformGuideAssignmentsData = (records) => Array.isArray(records) ? records.map(transformGuideAssignmentData).filter(Boolean) : [];
export const transformActionStepsData = (records) => Array.isArray(records) ? records.map(transformActionStepData).filter(Boolean) : [];
export const transformSchoolNotesData = (records) => Array.isArray(records) ? records.map(transformSchoolNoteData).filter(Boolean) : [];
export const transformGovernanceDocsData = (records) => Array.isArray(records) ? records.map(transformGovernanceDocData).filter(Boolean) : [];
export const transformChartersData = (records) => Array.isArray(records) ? records.map(transformCharterData).filter(Boolean) : [];
