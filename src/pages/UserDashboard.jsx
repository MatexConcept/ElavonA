import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';
import { useTransactions } from '../hooks/useTransactions';
import ErrorModal from '../pages/ErrorModal';

export default function UserDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { settings, loading: settingsLoading } = useSettings();
  const { transactions, loading: transactionsLoading } = useTransactions();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('send');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSend = () => {
    setModalType('send');
    setModalVisible(true);
  };

  const handleReceive = () => {
    setModalType('receive');
    setModalVisible(true);
  };

  if (settingsLoading || transactionsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F3]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#8B593E] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#8B593E] to-[#6B4530] pt-12 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-white/80 text-sm mb-1">Welcome back,</p>
              <h1 className="text-2xl font-bold text-white">{settings.profile_name}</h1>
            </div>
            <button
              onClick={handleLogout}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition"
              title="Logout"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>

          {/* Balance Card */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">Total Balance</p>
            <h2 className="text-4xl font-bold text-white mb-6">
              ${Number(settings.account_balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h2>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleSend}
                className="bg-white text-[#8B593E] py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send
              </button>
              <button
                onClick={handleReceive}
                className="bg-white/20 backdrop-blur-sm border border-white/40 text-white py-3 rounded-xl font-semibold hover:bg-white/30 transition flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Receive
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Transactions Section */}
      <main className="max-w-6xl mx-auto px-6 -mt-10">
        <div className="bg-white rounded-3xl shadow-xl border border-[#E5D3B7] overflow-hidden">
          <div className="p-6 border-b border-[#E5D3B7]">
            <h3 className="text-xl font-bold text-[#4A3428]">Latest Transactions</h3>
          </div>
          
          <div className="divide-y divide-[#E5D3B7]">
            {transactions.length === 0 ? (
              <div className="p-12 text-center">
                <svg className="w-16 h-16 mx-auto text-[#9A8478]/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-[#9A8478]">No transactions yet</p>
              </div>
            ) : (
              transactions.slice(0, 10).map((transaction) => {
                const isCredit = transaction.type === 'credit';
                return (
                  <div key={transaction.transaction_id} className="p-5 hover:bg-[#FFF8F3] transition">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isCredit ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          <svg className={`w-6 h-6 ${isCredit ? 'text-[#2ECC71]' : 'text-[#E74C3C]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCredit ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"} />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-[#4A3428]">{transaction.recipient_name}</p>
                          <p className="text-sm text-[#9A8478]">{transaction.description || 'No time'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${isCredit ? 'text-[#2ECC71]' : 'text-[#E74C3C]'}`}>
                          {isCredit ? '+' : '-'}${parseFloat(transaction.amount).toFixed(2)}
                        </p>
                        <p className="text-xs text-[#9A8478] capitalize">{transaction.status}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* Error Modal */}
      <ErrorModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        type={modalType}
      />
    </div>
  );
}