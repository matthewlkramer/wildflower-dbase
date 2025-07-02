import { useState, useCallback } from 'react';

export const useNavigation = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const navigateToItem = useCallback((type, data) => {
    console.log('Navigating to:', type, data.name || data.firstName);
    setSelectedItem({ type, data });
  }, []);

  const navigateBack = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const navigateToEducator = useCallback((educatorId, allEducators) => {
    const educator = allEducators.find(ed => ed.id === educatorId);
    if (educator) {
      setSelectedItem({ type: 'educators', data: educator });
    }
  }, []);

  const navigateToSchool = useCallback((schoolId, allSchools) => {
    const school = allSchools.find(s => s.id === schoolId);
    if (school) {
      setSelectedItem({ type: 'schools', data: school });
    }
  }, []);

  return { 
    selectedItem, 
    navigateToItem, 
    navigateBack, 
    navigateToEducator,
    navigateToSchool
  };
};

