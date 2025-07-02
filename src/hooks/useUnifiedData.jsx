import { useState, useEffect, useRef, useCallback } from "react";
import { airtableService } from "../airtableService";
import { TABLES } from "../airtableConfig";
import * as transformers from "../utils/dataTransformers";

// Maps entityType to transformer function, defaulting to passthrough if missing
const ENTITY_TRANSFORMERS = {
  schools: transformers.transformSchoolData,
  educators: transformers.transformEducatorData,
  charters: transformers.transformCharterData,
  locations: transformers.transformLocationData,
  actionsteps: transformers.transformActionStepData,
  educatorsxschools: transformers.transformEducatorXSchoolData,
  grants: transformers.transformGrantData,
  loans: transformers.transformLoanData,
  guideassignments: transformers.transformGuideAssignmentData,
  schoolnotes: transformers.transformSchoolNoteData,
  governancedocs: transformers.transformGovernanceDocData,
  // add more as you need...
};

export function useUnifiedData(entityType, initialOptions = {}) {
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cacheRef = useRef({});

  // Support both lower and upper case keys for table lookup
  const tableName = TABLES[entityType?.toUpperCase()] || entityType;

  const transformer =
    ENTITY_TRANSFORMERS[entityType?.toLowerCase()] || (x => x);

  const optionsKey = JSON.stringify(options);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const cacheKey = `${tableName}_${optionsKey}`;
    try {
      if (cacheRef.current[cacheKey]) {
        setRawData(cacheRef.current[cacheKey]);
        setData(cacheRef.current[cacheKey].map(transformer));
        setLoading(false);
        return;
      }
      const records = await airtableService.fetchRecords(tableName, options);
      cacheRef.current[cacheKey] = records;
      setRawData(records);
      setData(records.map(transformer));
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }, [tableName, optionsKey, transformer, options]);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, [tableName, optionsKey, refresh]);

  // CRUD ops:
  const createRecord = useCallback(async (fields) => {
    setLoading(true);
    setError(null);
    try {
      const record = await airtableService.createRecord(tableName, fields);
      setRawData(prev => [...prev, record]);
      setData(prev => [...prev, transformer(record)]);
      cacheRef.current = {}; // Invalidate cache
      return transformer(record);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [tableName, transformer]);

  const updateRecord = useCallback(async (id, fields) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await airtableService.updateRecord(tableName, id, fields);
      setRawData(prev => prev.map(r => r.id === id ? updated : r));
      setData(prev => prev.map(r => r.id === id ? transformer(updated) : r));
      cacheRef.current = {};
      return transformer(updated);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [tableName, transformer]);

  const deleteRecord = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await airtableService.deleteRecord(tableName, id);
      setRawData(prev => prev.filter(r => r.id !== id));
      setData(prev => prev.filter(r => r.id !== id));
      cacheRef.current = {};
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [tableName]);

  return {
    data,
    rawData,
    loading,
    error,
    refresh,
    setOptions,
    createRecord,
    updateRecord,
    deleteRecord
  };
}
