import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export const useSettings = () => {
  const [settings, setSettings] = useState({
    account_balance: 0,
    profile_name: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await api.getSettings();
      if (data.success) {
        setSettings(data.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      const data = await api.updateSettings(newSettings);
      if (data.success) {
        setSettings(data.data);
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, loading, error, refetch: fetchSettings, updateSettings };
};