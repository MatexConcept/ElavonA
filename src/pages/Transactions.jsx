export default function TransactionCard({ transaction, onEdit, onDelete }) {
  const isCredit = transaction.type === 'credit';

  return (
    <div className="bg-background rounded-xl p-4 border border-border hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isCredit ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <svg className={`w-6 h-6 ${isCredit ? 'text-income' : 'text-expense'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCredit ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"} />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-text truncate">{transaction.recipient_name}</p>
            <p className="text-sm text-textLight">{transaction.description || 'No time'}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className={`text-lg font-bold ${isCredit ? 'text-income' : 'text-expense'}`}>
              {isCredit ? '+' : '-'}€{parseFloat(transaction.amount).toFixed(2)}
            </p>
            <p className="text-xs text-textLight capitalize">{transaction.status}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(transaction)}
              className="p-2 hover:bg-primary/10 rounded-lg transition"
              title="Edit"
            >
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(transaction)}
              className="p-2 hover:bg-red-50 rounded-lg transition"
              title="Delete"
            >
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}