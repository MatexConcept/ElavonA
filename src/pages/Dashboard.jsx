import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';
import { useTransactions } from '../hooks/useTransactions';
import TransactionCard from '../components/TransactionCard';
import TransactionModal from '../components/TransactionModal';
import SettingsModal from '../components/SettingsModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { settings, loading: settingsLoading, updateSettings } = useSettings();
  const { 
    transactions, 
    loading: transactionsLoading, 
    createTransaction,
    updateTransaction,
    deleteTransaction 
  } = useTransactions();

  const [transactionModal, setTransactionModal] = useState({ open: false, mode: 'create', data: null });
  const [settingsModal, setSettingsModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, transaction: null });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCreateTransaction = () => {
    setTransactionModal({ open: true, mode: 'create', data: null });
  };

  const handleEditTransaction = (transaction) => {
    setTransactionModal({ open: true, mode: 'edit', data: transaction });
  };

  const handleDeleteClick = (transaction) => {
    setDeleteModal({ open: true, transaction });
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.transaction) {
      await deleteTransaction(deleteModal.transaction.transaction_id);
      setDeleteModal({ open: false, transaction: null });
    }
  };

  const handleSaveTransaction = async (data) => {
    if (transactionModal.mode === 'create') {
      await createTransaction(data);
    } else {
      await updateTransaction(transactionModal.data.transaction_id, data);
    }
    setTransactionModal({ open: false, mode: 'create', data: null });
  };

  const handleSaveSettings = async (data) => {
    await updateSettings(data);
    setSettingsModal(false);
  };

  if (settingsLoading || transactionsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text">Elavon Admin</h1>
              <p className="text-sm text-textLight mt-1">Manage transactions and settings</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSettingsModal(true)}
                className="px-4 py-2 text-primary hover:bg-primary/5 rounded-xl transition font-medium"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
            <p className="text-sm font-semibold text-textLight uppercase tracking-wide mb-2">Account Balance</p>
            <p className="text-3xl font-bold text-primary">
              ${Number(settings.account_balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
            <p className="text-sm font-semibold text-textLight uppercase tracking-wide mb-2">Profile Name</p>
            <p className="text-3xl font-bold text-text">{settings.profile_name}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
            <p className="text-sm font-semibold text-textLight uppercase tracking-wide mb-2">Total Transactions</p>
            <p className="text-3xl font-bold text-text">{transactions.length}</p>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white rounded-2xl border border-border shadow-sm">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-xl font-bold text-text">Transactions</h2>
            <button
              onClick={handleCreateTransaction}
              className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition shadow-lg shadow-primary/30"
            >
              + New Transaction
            </button>
          </div>
          <div className="p-6 space-y-4">
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-textLight/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-textLight">No transactions yet</p>
              </div>
            ) : (
              transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.transaction_id}
                  transaction={transaction}
                  onEdit={handleEditTransaction}
                  onDelete={handleDeleteClick}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <TransactionModal
        open={transactionModal.open}
        mode={transactionModal.mode}
        data={transactionModal.data}
        onClose={() => setTransactionModal({ open: false, mode: 'create', data: null })}
        onSave={handleSaveTransaction}
      />
      <SettingsModal
        open={settingsModal}
        settings={settings}
        onClose={() => setSettingsModal(false)}
        onSave={handleSaveSettings}
      />
      <DeleteConfirmModal
        open={deleteModal.open}
        transaction={deleteModal.transaction}
        onClose={() => setDeleteModal({ open: false, transaction: null })}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}