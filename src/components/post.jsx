import { Button, Pagination, Avatar, IconButton, Chip, Tooltip } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/data_context.jsx";
import { AuthContext } from "../context/authContext.jsx";
import ConfirmDelete from "./confirm_modal.jsx";
import EditPopCard from "./edit_pop_card.jsx";
import { FiPlus, FiImage, FiFile, FiTrash2, FiEdit3, FiClock } from "react-icons/fi";

export function Post() {
  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const { user } = useContext(AuthContext);
  const { createPost, getPosts, deletePost, posts, loading, error } = useContext(DataContext);

  useEffect(() => {
    getPosts(1);
  }, []);

  function handleFileUpload(e) {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewURLs(previews);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", user.email);
    files.forEach((file) => formData.append("media", file));
    createPost(formData);
  }

  function onPageChange(event, value) {
    getPosts(value);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <style>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }
        .post-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .post-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      {/* CREATE POST SECTION */}
      <section className="glass-panel rounded-3xl p-8 relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-orange-500/20 rounded-xl text-orange-500"><FiPlus /></div>
          Create Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 h-32 focus:ring-2 focus:ring-orange-500/50 outline-none transition-all resize-none text-white placeholder-gray-500"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <label className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors shadow-sm text-gray-300">
                <FiImage className="text-orange-500" />
                <span className="text-sm font-medium">Add Media</span>
                <input type="file" multiple onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
            
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-orange-500 transition-colors placeholder-gray-500"
            />
          </div>

          {previewURLs.length > 0 && (
            <div className="grid grid-cols-4 gap-2 animate-in slide-in-from-bottom-2">
              {files.map((file, idx) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden border bg-gray-100">
                  {file.type.startsWith("image/") ? (
                    <img src={previewURLs[idx]} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400"><FiFile /></div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button 
              type="submit" 
              disabled={loading} 
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold shadow-orange-200 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:bg-gray-300 disabled:shadow-none"
            >
              {loading ? "Publishing..." : (
                <>
                  <FiPlus className="text-lg" />
                  <span>Publish Post</span>
                </>
              )}
            </button>
          </div>

        </form>
      </section>

      {/* POST LIST SECTION */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold text-white px-2 mt-12 mb-4">All Posts</h3>
        
        <div className="space-y-4">
          {loading ? (
            <p className="py-10 text-center text-gray-500">Loading feed...</p>
          ) : error ? (
            <p className="text-red-400 bg-red-500/10 p-4 rounded-xl text-center border border-red-500/20"> {error} </p>
          ) : (
            posts.map((post, index) => (
              <div key={index} className="glass-panel post-card rounded-2xl p-6 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="bg-orange-600 border-2 border-white/10 shadow-sm uppercase">
                      {post.author ? post.author[0] : 'A'}
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-white leading-none mb-1">{post.title || "Untitled Post"}</h4>
                      <p className="text-sm text-gray-400 line-clamp-2">{post.content}</p>
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                         <FiClock /> {post.created_at ? new Date(post.created_at).toLocaleDateString() : "Just now"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Tooltip title="Edit Content">
                      <button 
                        onClick={() => { setSelectedPost(post); setEditOpen(true); }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-400 hover:text-orange-500 hover:bg-orange-500/10 rounded-full transition-all duration-200 active:scale-95"
                      >
                        <FiEdit3 className="text-lg" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                    </Tooltip>

                    <Tooltip title="Delete Post">
                      <button 
                        onClick={() => { setSelectedPost(post); setConfirmOpen(true); }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all duration-200 active:scale-95"
                      >
                        <FiTrash2 className="text-lg" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </Tooltip>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-center pt-8">
          <Pagination 
            count={10} 
            color="primary" 
            onChange={onPageChange} 
            size="large" 
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: '12px',
                fontWeight: 'bold',
                color: '#94a3b8',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                },
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  color: '#fff',
                  boxShadow: '0 4px 14px 0 rgba(249, 115, 22, 0.3)',
                  '&:hover': {
                    filter: 'brightness(1.1)',
                  }
                }
              }
            }}
          />
        </div>

      </section>

      {/* MODAL SECTION - TRACKED BY selectedPost TO AVOID MULTI-RENDER LOGIC BUG */}
      {editOpen && selectedPost && (
        <EditPopCard 
          content={selectedPost.content} 
          postId={selectedPost.id}
          open={editOpen}
          onClose={() => { setEditOpen(false); setSelectedPost(null); }}
          onConfirm={() => { setEditOpen(false); setSelectedPost(null); }}
        />
      )}
      
     {confirmOpen && selectedPost && (
        <ConfirmDelete 
          open={confirmOpen}
          onClose={() => { setConfirmOpen(false); setSelectedPost(null); }}
          onConfirm={async () => {
            await deletePost(selectedPost.id);  // ← ADD THIS LINE
            setConfirmOpen(false); 
            setSelectedPost(null); 
          }}
        />
      )}
    </div>
  );
}
