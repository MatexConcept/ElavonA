export default function TransactionCard({ transaction, onEdit, onDelete }) {
  const isCredit = transaction.type === 'credit';

  return (
    <div className="bg-background rounded-xl p-3 sm:p-4 border border-border hover:shadow-md transition">
      {/* Mobile Layout: Stacked */}
      <div className="flex flex-col sm:hidden gap-3">
        {/* Top Row: Icon, Name, Amount */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Icon */}
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isCredit ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <svg
                className={`w-5 h-5 ${isCredit ? 'text-income' : 'text-expense'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isCredit
                      ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                      : 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'
                  }
                />
              </svg>
            </div>

            {/* Name and Description */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-text text-sm leading-tight mb-1 break-words">
                {transaction.recipient_name}
              </p>
              <p className="text-xs text-textLight leading-tight">
                {transaction.description || 'No description'}
              </p>
            </div>
          </div>

          {/* Amount */}
          <div className="text-right flex-shrink-0">
            <p
              className={`text-base sm:text-lg font-bold leading-tight ${
                isCredit ? 'text-income' : 'text-expense'
              }`}
            >
              {isCredit ? '+' : '-'}${parseFloat(transaction.amount).toFixed(2)}
            </p>
            <p className="text-xs text-textLight capitalize mt-0.5">
              {transaction.status}
            </p>
          </div>
        </div>

        {/* Bottom Row: Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-border">
          <button
            onClick={() => onEdit(transaction)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary/5 hover:bg-primary/10 rounded-lg transition"
          >
            <svg
              className="w-4 h-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <span className="text-sm font-medium text-primary">Edit</span>
          </button>

          <button
            onClick={() => onDelete(transaction)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 hover:bg-red-100 rounded-lg transition"
          >
            <svg
              className="w-4 h-4 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span className="text-sm font-medium text-red-600">Delete</span>
          </button>
        </div>
      </div>

      {/* Desktop Layout: Horizontal */}
      <div className="hidden sm:flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isCredit ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <svg
              className={`w-6 h-6 ${isCredit ? 'text-income' : 'text-expense'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isCredit
                    ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                    : 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'
                }
              />
            </svg>
          </div>

          {/* Transaction Info */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-text truncate">
              {transaction.recipient_name}
            </p>
            <p className="text-sm text-textLight">
              {transaction.description || 'No description'}
            </p>
          </div>
        </div>

        {/* Amount and Actions */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right">
            <p
              className={`text-lg font-bold ${
                isCredit ? 'text-income' : 'text-expense'
              }`}
            >
              {isCredit ? '+' : '-'}${parseFloat(transaction.amount).toFixed(2)}
            </p>
            <p className="text-xs text-textLight capitalize">
              {transaction.status}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(transaction)}
              className="p-2 hover:bg-primary/10 rounded-lg transition"
              title="Edit"
            >
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete(transaction)}
              className="p-2 hover:bg-red-50 rounded-lg transition"
              title="Delete"
            >
              <svg
                className="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
