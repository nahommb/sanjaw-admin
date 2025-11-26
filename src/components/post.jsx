import { Button } from "@mui/material";
import { useState } from "react";

export function Post() {
  const posts = [1, 2, 3, 4, 5];

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  function handleFileUpload(e) {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewURL(objectUrl);
    }
  }

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-md">

        {/* Create Post */}
        <p className="my-4 font-semibold text-lg">Create Post</p>

        <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Textarea */}
          <textarea
            placeholder="Write your post..."
            className="border rounded-lg p-2 h-24 sm:col-span-2"
          />

          {/* File Input */}
          <input
            type="file"
            onChange={handleFileUpload}
            className="border rounded-lg p-2 bg-gray-50"
          />

          {/* Preview Area */}
          {previewURL && (
            <div className="sm:col-span-2 border p-3 rounded-lg bg-gray-100">
              <p className="font-semibold mb-2">File Preview:</p>

              {/* IMAGE PREVIEW */}
              {selectedFile?.type.startsWith("image/") && (
                <img
                  src={previewURL}
                  alt="preview"
                  className="max-h-64 object-contain rounded-md"
                />
              )}

              {/* VIDEO PREVIEW */}
              {selectedFile?.type.startsWith("video/") && (
                <video
                  src={previewURL}
                  controls
                  className="max-h-64 object-contain rounded-md"
                />
              )}

              {/* PDF PREVIEW */}
              {selectedFile?.type === "application/pdf" && (
                <embed
                  src={previewURL}
                  type="application/pdf"
                  className="w-full h-64 rounded-md"
                />
              )}
            </div>
          )}

          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            className="border rounded-lg px-3 py-2 w-full"
          />

          <div className="sm:col-span-2 flex justify-start">
            <Button variant="contained" color="primary">
              Post
            </Button>
          </div>
        </form>

        {/* Edit Post */}
        <p className="my-6 font-semibold text-lg">Edit Post</p>

        <div className="space-y-3">
          {posts.map((post, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between 
                         border p-3 rounded-md bg-gray-50 shadow-sm"
            >
              <p className="font-medium text-gray-800">
                Post {post} — Lorem ipsum title
              </p>

              <div className="mt-2 sm:mt-0 flex gap-2">
                <Button variant="outlined">Edit</Button>
                <Button variant="contained" color="error">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
