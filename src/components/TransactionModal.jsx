import { useState, useEffect } from 'react';

export default function TransactionModal({ open, mode, data, onClose, onSave }) {
  const [formData, setFormData] = useState({
    transaction_id: '',
    recipient_name: '',
    date: '',
    description: '',
    type: 'debit',
    amount: '',
    currency: 'EUR',
    status: 'pending',
  });

  useEffect(() => {
    if (mode === 'edit' && data) {
      setFormData({
        transaction_id: data.transaction_id,
        recipient_name: data.recipient_name,
        date: data.date ? new Date(data.date).toISOString().slice(0, 16) : '',
        description: data.description || '',
        type: data.type,
        amount: data.amount,
        currency: data.currency,
        status: data.status,
      });
    } else if (mode === 'create') {
      setFormData({
        transaction_id: `TXN${Date.now()}`,
        recipient_name: '',
        date: new Date().toISOString().slice(0, 16),
        description: '',
        type: 'debit',
        amount: '',
        currency: 'EUR',
        status: 'pending',
      });
    }
  }, [mode, data, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      date: new Date(formData.date).toISOString(),
      amount: parseFloat(formData.amount),
    };
    onSave(submitData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-text">
            {mode === 'create' ? 'Create Transaction' : 'Edit Transaction'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Transaction ID</label>
              <input
                type="text"
                value={formData.transaction_id}
                onChange={(e) => setFormData({ ...formData, transaction_id: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
                disabled={mode === 'edit'}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Recipient Name</label>
              <input
                type="text"
                value={formData.recipient_name}
                onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text mb-2">Time (Description)</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="e.g., 10:30 AM, Yesterday, 2 days ago"
            />
            <p className="text-xs text-textLight mt-1">This will be displayed as the transaction time in the app</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text mb-2">Date</label>
            <input
              type="datetime-local"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              >
                <option value="debit">Debit (Expense)</option>
                <option value="credit">Credit (Income)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Amount</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Currency</label>
              <input
                type="text"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-border rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition"
            >
              {mode === 'create' ? 'Create' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}