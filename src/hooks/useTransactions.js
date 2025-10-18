import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await api.getAllTransactions();
      setTransactions(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (transactionData) => {
    try {
      const data = await api.createTransaction(transactionData);
      if (data.data) {
        await fetchTransactions();
        return { success: true, data: data.data };
      }
      return { success: false, error: data.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateTransaction = async (transaction_id, updates) => {
    try {
      const data = await api.updateTransaction(transaction_id, updates);
      if (data.data) {
        await fetchTransactions();
        return { success: true, data: data.data };
      }
      return { success: false, error: data.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteTransaction = async (transaction_id) => {
    try {
      const data = await api.deleteTransaction(transaction_id);
      if (data.data) {
        await fetchTransactions();
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    refetch: fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};