import { useContext, useState } from "react";
import { DataContext } from "../context/data_context";

export default function EditPopCard({postId,content, open, onClose, onConfirm }) {
    
  if (!open) return null; 

  const [editedContent, setEditedContent] = useState(content);
  const {editPost} = useContext(DataContext);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="bg-white w-80 p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-4">
          {}
        </h2>
        <textarea value={editedContent} onChange={(e)=>setEditedContent(e.target.value)} className="p-4 border rounded-lg border-orange-500" />

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-orange-600 text-white rounded-md"
            onClick={
                ()=>{
                editPost(postId,editedContent);
                onConfirm();
                }            
            }
            
          >
            Save
          </button>
        </div>
      </div>

    </div>
  );
}
