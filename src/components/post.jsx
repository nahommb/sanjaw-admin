import { Button, Pagination } from "@mui/material";
import { useState, useContext } from "react";
import { DataContext } from "../context/data_context.jsx";
import { AuthContext } from "../context/authContext.jsx";
import ConfirmDelete from "./confirm_delete.jsx";
import EditPopCard from "./edit_pop_card.jsx";

export function Post() {
  // const posts = [1, 2, 3, 4, 5];

  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const { createPost,getPosts,editPost,deletePost, posts,loading, error } = useContext(DataContext);

  // Handle multiple file selection
  function handleFileUpload(e) {

    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // Create preview links
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewURLs(previews);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", user.email);

    // Append each file
    files.forEach((file) => {
      formData.append("media", file);
    });

    createPost(formData);
  }
function onPageChange(event,value){
  console.log(value);
  getPosts(value);
}
  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-md">

        {/* Create Post */}
        <p className="my-4 font-semibold text-lg">Create Post</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Textarea */}
          <textarea
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post..."
            className="border rounded-lg p-2 h-24 sm:col-span-2"
          />

          {/* Multiple File Input */}
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="border rounded-lg p-2 bg-gray-50"
          />

          {/* Preview Section */}
          {previewURLs.length > 0 && (
            <div className="sm:col-span-2 border p-3 rounded-lg bg-gray-100">
              <p className="font-semibold mb-2">Preview Files:</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {files.map((file, idx) => (
                  <div key={idx} className="border rounded p-2 bg-white">
                    {file.type.startsWith("image/") && (
                      <img
                        src={previewURLs[idx]}
                        alt="preview"
                        className="max-h-64 object-contain rounded-md"
                      />
                    )}

                    {file.type.startsWith("video/") && (
                      <video
                        src={previewURLs[idx]}
                        controls
                        className="max-h-64 object-contain rounded-md"
                      />
                    )}

                    {file.type === "application/pdf" && (
                      <embed
                        src={previewURLs[idx]}
                        type="application/pdf"
                        className="w-full h-64 rounded-md"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Title */}
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="border rounded-lg px-3 py-2 w-full"
          />

          <div className="sm:col-span-2 flex justify-start mb-8">
            <Button type="submit" variant="contained" color="primary">
              {loading ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
        <p className="mb-8">All Posts</p>
        <div className="space-y-3"> {
        loading ? ( <p>Loading posts...</p> ) : error ? ( <p className="text-red-500"> {error} </p> ) : (
        posts.map((post, index) => 
          ( <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between border p-3 rounded-md bg-gray-50 shadow-sm" > 
          <div>
            <p className="font-medium text-gray-800"> {post.title}</p>
            <div className="text-sm text-gray-600"> {post.content}</div>
          </div>   
           <div className="mt-2 sm:mt-0 flex gap-2">
             <Button onClick={
              ()=> setEditOpen(true)
             }
              variant="outlined">Edit</Button> 
             <Button onClick={
                ()=>setConfirmOpen(true)
             } variant="contained" color="error"> Delete </Button> 
             </div> 
               {
              editOpen && (
                <EditPopCard 
                  content={post.content} 
                  postId={post.id}
                  open={editOpen}
                  onClose ={()=> setEditOpen(false)}
                  onConfirm ={()=>{
                    // editPost(post.id);
                    setEditOpen (false);
                  }}
                />
              )
               }
                {
              confirmOpen && (
                <ConfirmDelete 
                  open={confirmOpen}
                  onClose ={()=> setConfirmOpen(false)}
                  onConfirm ={()=>{
                    deletePost(post.id);
                    setConfirmOpen (false);
                  }}
                />
              )
            }
             </div> 
            )))}
         
             <Pagination count={10} color="primary" onChange = {onPageChange} />
              </div>
      </div>
    </>
  );
}
