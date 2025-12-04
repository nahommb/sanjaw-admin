export default function ConfirmDelete({ open, onClose, onConfirm }) {
    
  if (!open) return null; 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="bg-white w-80 p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to delete this?
        </h2>

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>

    </div>
  );
}
