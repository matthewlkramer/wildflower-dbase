//src/components/UnifiedDetail.jsx
import React, { useState } from 'react';

const UnifiedDetail = ({
  entity,
  entityType,
  tabsConfig,
  onBack,
  onOpenRelated, // Optional: for linking to related entities
}) => {
  const [activeTab, setActiveTab] = useState(tabsConfig[0]?.id || '');

  if (!entity) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No {entityType} Data
          </h2>
          <button
            onClick={onBack}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const activeTabConfig = tabsConfig.find((tab) => tab.id === activeTab);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white border-b">
        <div>
          <button
            onClick={onBack}
            className="text-teal-600 hover:underline mr-4"
          >
            &larr; Back
          </button>
          <span className="text-2xl font-bold text-gray-900">
            {entity.name || entity.fullName || entityType}
          </span>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex space-x-2 px-6 py-2 bg-gray-50 border-b">
        {tabsConfig.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1 rounded-lg font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-teal-100 text-teal-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTabConfig &&
          activeTabConfig.renderContent({
            entity,
            onOpenRelated,
            // Add more props if you want to pass editing/handlers/etc
          })}
      </div>
    </div>
  );
};

export default UnifiedDetail;
