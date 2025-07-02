import { useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useTableColumns } from '../hooks/useTableColumns';
import { useUnifiedData } from '../hooks/useUnifiedData';
import { TABS } from '../utils/constants.js';
import { charterTabsConfig, educatorTabsConfig, schoolTabsConfig } from '../utils/tabsConfig';
import ResizableDataTable from './shared/ResizableDataTable';
import UnifiedDetail from './UnifiedDetail';

const WildflowerDatabase = () => {
  const [mainTab, setMainTab] = useState(TABS.SCHOOLS);

  const { selectedItem, navigateToItem, navigateBack, navigateToEducator, navigateToSchool } = useNavigation();

  const schoolsResult = useUnifiedData(TABS.SCHOOLS, { includeInactive: true });
  const educatorsResult = useUnifiedData(TABS.EDUCATORS, { includeInactive: true });
  const chartersResult = useUnifiedData(TABS.CHARTERS);

  const columns = useTableColumns(mainTab);

  const getCurrentData = () => {
    switch (mainTab) {
      case TABS.SCHOOLS:
        return schoolsResult.data || [];
      case TABS.EDUCATORS:
        return educatorsResult.data || [];
      case TABS.CHARTERS:
        return chartersResult.data || [];
      default:
        return [];
    }
  };

  // Define mainTabs for the main navigation
  const mainTabs = [
    {
      id: TABS.SCHOOLS,
      label: 'Schools',
      count: schoolsResult.data ? schoolsResult.data.length : 0
    },
    {
      id: TABS.EDUCATORS,
      label: 'Educators',
      count: educatorsResult.data ? educatorsResult.data.length : 0
    },
    {
      id: TABS.CHARTERS,
      label: 'Charters',
      count: chartersResult.data ? chartersResult.data.length : 0
    }
  ];

  const handleRowClick = (item) => navigateToItem(mainTab, item);

  const renderDetailContent = () => {
    if (!selectedItem) return null;

    const configMap = {
      [TABS.SCHOOLS]: schoolTabsConfig,
      [TABS.EDUCATORS]: educatorTabsConfig,
      [TABS.CHARTERS]: charterTabsConfig
    };

    return (
      <UnifiedDetail
        entity={selectedItem.data}
        entityType={selectedItem.type}
        tabsConfig={configMap[selectedItem.type]}
        onBack={navigateBack}
        onOpenRelated={(id) => {
          if (selectedItem.type === TABS.SCHOOLS) navigateToEducator(id, educatorsResult.data);
          if (selectedItem.type === TABS.EDUCATORS) navigateToSchool(id, schoolsResult.data);
        }}
      />
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-white shadow-sm border-b">
                <div className="w-full px-6 lg:px-8 xl:px-12">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Wildflower</h1>
                                {selectedItem && (
                                    <p className="text-gray-600">
                                        {selectedItem.data.name || selectedItem.data.fullName || selectedItem.data.Name || 'Details'}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Main tabs - always visible */}
                        <div className="flex space-x-8">
                            {mainTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        if (selectedItem) {
                                            navigateBack();
                                        }
                                        setMainTab(tab.id);
                                    }}
                                    className={`py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                                        !selectedItem && mainTab === tab.id
                                            ? 'bg-teal-100 text-teal-700'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {tab.label} ({tab.count})
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>      
          <div className="flex-1 min-h-0 overflow-hidden">
        {selectedItem ? (
          <div className="h-full">
            {renderDetailContent()}
          </div>
        ) : (
          <div className="w-full px-6 lg:px-8 xl:px-12 h-full min-h-0 flex flex-col">
            <div className="flex-1 min-h-0 overflow-auto">
              <ResizableDataTable
                data={getCurrentData()}
                columns={columns}
                onRowClick={handleRowClick}
                loading={schoolsResult.loading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WildflowerDatabase;
