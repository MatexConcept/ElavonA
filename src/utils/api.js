const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  // Settings endpoints
  getSettings: async () => {
    const response = await fetch(`${API_URL}/settings`);
    return response.json();
  },

  updateSettings: async (data) => {
    const response = await fetch(`${API_URL}/settings`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Transaction endpoints
  getAllTransactions: async (limit = 100, offset = 0) => {
    const response = await fetch(
      `${API_URL}/elavon/transactions?limit=${limit}&offset=${offset}`
    );
    return response.json();
  },

  createTransaction: async (data) => {
    const response = await fetch(`${API_URL}/elavon/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  updateTransaction: async (transaction_id, data) => {
    const response = await fetch(`${API_URL}/elavon/transactions/${transaction_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  deleteTransaction: async (transaction_id) => {
    const response = await fetch(`${API_URL}/elavon/transactions/${transaction_id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};