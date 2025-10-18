import { useState, useEffect } from 'react';

export default function SettingsModal({ open, settings, onClose, onSave }) {
  const [formData, setFormData] = useState({
    account_balance: '',
    profile_name: '',
  });

  useEffect(() => {
    if (open && settings) {
      setFormData({
        account_balance: settings.account_balance,
        profile_name: settings.profile_name,
      });
    }
  }, [open, settings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      account_balance: parseFloat(formData.account_balance),
      profile_name: formData.profile_name,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-text">Settings</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text mb-2">Profile Name</label>
            <input
              type="text"
              value={formData.profile_name}
              onChange={(e) => setFormData({ ...formData, profile_name: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text mb-2">Account Balance</label>
            <input
              type="number"
              step="0.01"
              value={formData.account_balance}
              onChange={(e) => setFormData({ ...formData, account_balance: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
