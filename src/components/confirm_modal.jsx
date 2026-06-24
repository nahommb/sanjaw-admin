import { FiAlertTriangle } from "react-icons/fi";

export default function ConfirmModal({ open, onClose, onConfirm, title, confirmText, type = "danger" }) {
  if (!open) return null;

  const isDanger = type === "danger";

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-2 pt-4 sm:pt-10">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-[#1e293b] border border-white/10 w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${isDanger ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'}`}>
            <FiAlertTriangle size={32} />
          </div>

          <h2 className="text-xl font-bold text-white mb-2">
            {title || "Are you sure?"}
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            This action cannot be undone. Please confirm if you want to proceed.
          </p>

          <div className="flex gap-3 w-full">
            <button
              className="flex-1 px-2 py-1 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all active:scale-95"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className={`flex-1 px-2 py-1 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-lg ${isDanger ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20'}`}
              onClick={onConfirm}
            >
              {confirmText || (isDanger ? "Delete" : "Confirm")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
