// tabsConfig.js

// --- Educator Tab Components ---
import EducatorSummary from '../components/educators/EducatorSummary';
import EducatorDemographics from '../components/educators/EducatorDemographics';
import EducatorContactInfo from '../components/educators/EducatorContactInfo';
import EducatorSchoolStints from '../components/educators/EducatorSchoolStints';
import EducatorOnlineForms from '../components/educators/EducatorOnlineForms';
import EducatorCultivation from '../components/educators/EducatorCultivation';
import EducatorCertifications from '../components/educators/EducatorCertifications';
import EducatorEvents from '../components/educators/EducatorEvents';
import EducatorNotes from '../components/educators/EducatorNotes';
import EducatorInteractions from '../components/educators/EducatorInteractions';

// --- School Tab Components ---
import SchoolSummary from '../components/schools/SchoolSummary';
import SchoolDetails from '../components/schools/SchoolDetails';
import SchoolEducators from '../components/schools/SchoolEducators';
import SchoolLocations from '../components/schools/SchoolLocations';
import SchoolGovernance from '../components/schools/SchoolGovernance';
import SchoolGuides from '../components/schools/SchoolGuides';
import SchoolSupport from '../components/schools/SchoolSupport';
import SchoolMembership from '../components/schools/SchoolMembership'; 
import SchoolFunds from '../components/schools/SchoolFunds'
import SchoolActions from '../components/schools/SchoolActions';
import SchoolInteractions from '../components/schools/SchoolInteractions';

// --- Charter Tab Components ---
import CharterSummary from '../components/charters/CharterSummary.jsx';

// --- Educator Tabs Config ---
export const educatorTabsConfig = [
  {
    id: 'summary',
    label: 'Summary',
    renderContent: ({ entity }) => <EducatorSummary educator={entity} />,
  },
  {
    id: 'demographics',
    label: 'Demographics',
    renderContent: ({ entity }) => <EducatorDemographics educator={entity} />,
  },
  {
    id: 'contact_info',
    label: 'Contact Info',
    renderContent: ({ entity }) => <EducatorContactInfo educator={entity} />,
  },
  {
    id: 'school_stints',
    label: 'School Stints',
    renderContent: ({ entity }) => <EducatorSchoolStints educator={entity} />,
  },
    {
    id: 'online_forms',
    label: 'SSJ Forms',
    renderContent: ({ entity }) => <EducatorOnlineForms educator={entity} />,
  },  {
    id: 'cultivation',
    label: 'Early Cultivation',
    renderContent: ({ entity }) => <EducatorCultivation educator={entity} />,
  },
  {
    id: 'certifications',
    label: 'Certifications',
    renderContent: ({ entity }) => <EducatorCertifications educator={entity} />,
  },
  {
    id: 'events',
    label: 'Events',
    renderContent: ({ entity }) => <EducatorEvents educator={entity} />,
  },
  {
    id: 'notes',
    label: 'Notes',
    renderContent: ({ entity }) => <EducatorNotes educator={entity} />,
  },{
    id: 'interactions',
    label: 'Emails and Meetings',
    renderContent: ({ entity }) => <EducatorInteractions educator={entity} />,
  },
];

// --- School Tabs Config ---
export const schoolTabsConfig = [
  {
    id: 'summary',
    label: 'Summary',
    renderContent: ({ entity }) => <SchoolSummary school={entity} />,
  },
  {
    id: 'details',
    label: 'Details',
    renderContent: ({ entity }) => <SchoolDetails school={entity} />,
  },
  {
    id: 'educators',
    label: 'Educators',
    renderContent: ({ entity }) => <SchoolEducators school={entity} />,
  },
  {
    id: 'locations',
    label: 'Locations',
    renderContent: ({ entity }) => <SchoolLocations school={entity} />,
  },
  {
    id: 'governance',
    label: 'Governance',
    renderContent: ({ entity }) => <SchoolGovernance school={entity} />,
  },
  {
    id: 'guides',
    label: 'Guides',
    renderContent: ({ entity }) => <SchoolGuides school={entity} />,
  },
  {
    id: 'support',
    label: 'OSS / SSJ',
    renderContent: ({ entity }) => <SchoolSupport school={entity} />,
  },
  {
    id: 'membership',
    label: 'Fees',
    renderContent: ({ entity }) => <SchoolMembership school={entity} />,
  },
  {
    id: 'funds',
    label: 'Grants and Loans',
    renderContent: ({ entity }) => <SchoolFunds school={entity} />,
  },
  {
    id: 'notes_actions',
    label: 'Notes and Actions',
    renderContent: ({ entity }) => <SchoolActions school={entity} />,
  },
    {
    id: 'interactions',
    label: 'Emails and Meetings',
    renderContent: ({ entity }) => <SchoolInteractions school={entity} />,
  },

];

// --- Charter Tabs Config ---
export const charterTabsConfig = [
  {
    id: 'summary',
    label: 'Summary',
    renderContent: ({ entity }) =>
      // Swap in a real CharterSummary when available
      <CharterSummary charter={entity} />,
  },
];

