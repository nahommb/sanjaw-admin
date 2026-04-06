import { useContext, useState, useEffect } from "react";
import { StoryContext } from "../context/storyContext.jsx";
import { Pagination } from "@mui/material";

export function Story() {
  const { createStory, story, loading ,error,getStory,deleteStory} = useContext(StoryContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState([]);

  // Handle file selection + preview
  function handleFileSelect(e) {
    const selectedFiles = Array.from(e.target.files);

    const filesWithPreview = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type,
    }));

    setFile(filesWithPreview);
  }

  // Submit form
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    file.forEach((item) => {
      formData.append("media", item.file);
    });

    createStory({ formData });
  }

  // Cleanup preview URLs (important)
  useEffect(() => {
    getStory();
    return () => {
      file.forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, [file]);

  // const onPageChange = (event, value) => {
  //   console.log(value);
  //   getStory(value);
  // }

  return (
    <>
      <p>Create Story</p>

      <form onSubmit={handleSubmit}>
        <input className=" border p-1 rounded-lg m-2"
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
           className=" border p-1 rounded-lg m-2"
          type="text"
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className=""
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileSelect}
        />

        {/* Preview Section */}
        <div className="flex gap-4 mt-4 flex-wrap">
          {file.map((item, index) => (
            <div
              key={index}
              className="w-32 h-32 border rounded overflow-hidden"
            >
              {/* Image */}
              {item.type.startsWith("image") && (
                <img
                  src={item.preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              )}

              {/* Video */}
              {item.type.startsWith("video") && (
                <video
                  src={item.preview}
                  className="w-full h-full object-cover"
                  controls
                />
              )}
            </div>
          ))}
        </div>

        <button
          className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 mt-4"
          type="submit"
        >
         {loading ? "Creating..." : "Create"}
        </button>
       {/* {error && <p className="text-red-500 mt-2">{error.message}</p>} */}
      </form>

      {/* Story List */}
      <div className="mt-8">
        <p>Story List</p>

        {story.map((storyItem, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md mb-4"
          >
            <p className="font-semibold text-lg">{storyItem.title}</p>
            {storyItem.content && <p className="text-gray-700">{storyItem.content}</p>}
            {storyItem.media_urls.map((url, idx) => (
              <div key={idx} className="mt-2">
                {url.endsWith(".jpg") || url.endsWith(".png") ? (
                  <img src={url} alt={`story media ${idx}`} className="w-full h-auto rounded" />
                ) : (
                  <video src={url} controls className="w-50 h-60 rounded" />
                )}
              </div>
            ))}
            <button className="px-2 m-2 py-0.5 rounded bg-red-500 text-white hover:bg-red-600" onClick={() => deleteStory(storyItem.id)}>
              Delete
            </button>
          </div>
        ))}
        {/* <Pagination count={10} color="primary" onChange={onPageChange} /> */}
      </div>
    </>
  );
}