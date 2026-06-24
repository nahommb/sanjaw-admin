import { useContext, useState } from "react";
import { DataContext } from "../context/data_context";

export default function EditPopCard({postId,content, open, onClose, onConfirm }) {
    
  if (!open) return null; 

  const [editedContent, setEditedContent] = useState(content);
  const {editPost} = useContext(DataContext);

  return (
    <div className="fixed inset-0 bg-[#1e293b] bg-opacity-50 flex items-center justify-center z-50">

      <div className="bg-[#1e293b] w-full p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-4">
          {}
        </h2>
        <textarea value={editedContent} onChange={(e)=>setEditedContent(e.target.value)} className="w-full h-64 border p-4 rounded-lg border-orange-500 bg-black/60" />

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
