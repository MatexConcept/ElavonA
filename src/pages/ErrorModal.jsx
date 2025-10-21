export default function ErrorModal({ visible, onClose, type }) {
  if (!visible) return null;

  const modalContent = {
    send: {
      title: "Transfer Unavailable",
      message: "We're unable to proceed with your transfer at this time. Your account has been temporarily restricted pending a regulatory and compliance review.\n\nThis restriction has been placed in line with Central Bank of Ireland directives and will remain active until the ongoing investigation is concluded.",
      buttonText: "Close"
    },
    receive: {
      title: "Unable to Receive Funds",
      message: "Incoming payments to this account are currently suspended due to a court-issued injunction and ongoing compliance review.\n\nAny attempted transfers will be automatically declined and returned to the sender's bank. This measure is temporary and will be lifted once the review is completed.",
      buttonText: "Got It"
    }
  };

  const content = modalContent[type] || modalContent.send;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Error Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-[#4A3428] text-center mb-4">{content.title}</h3>

        {/* Message */}
        <p className="text-[#9A8478] text-center mb-6 leading-relaxed whitespace-pre-line">
          {content.message}
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full bg-[#8B593E] text-white py-3 rounded-xl font-semibold hover:bg-[#6B4530] transition"
        >
          {content.buttonText}
        </button>
      </div>
    </div>
  );
}