import { Button } from "@mui/material";
import { useState, useContext } from "react";
import { DataContext } from "../context/data_context.jsx";
import { AuthContext } from "../context/authContext.jsx";

export function Post() {
  const posts = [1, 2, 3, 4, 5];

  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { user } = useContext(AuthContext);
  const { createPost, loading, error } = useContext(DataContext);

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

          <div className="sm:col-span-2 flex justify-start">
            <Button type="submit" variant="contained" color="primary">
              {loading ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
        <div className="space-y-3"> {posts.map((post, index) => 
          ( <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between border p-3 rounded-md bg-gray-50 shadow-sm" > 
          <p className="font-medium text-gray-800"> Post {post} — Lorem ipsum title </p>
           <div className="mt-2 sm:mt-0 flex gap-2">
             <Button variant="outlined">Edit</Button> 
             <Button variant="contained" color="error"> Delete </Button> 
             </div> 
             </div> ))}
              </div>
      </div>
    </>
  );
}
