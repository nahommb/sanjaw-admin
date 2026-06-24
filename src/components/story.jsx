import { useContext, useState, useEffect } from "react";
import { StoryContext } from "../context/storyContext.jsx";

export function Story() {
  const { createStory, story, loading, error, getStory, deleteStory } = useContext(StoryContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [dragging, setDragging] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  };

  function handleFileSelect(e) {
    const selected = Array.from(e.target.files);
    const withPreview = selected.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
      type: f.type,
    }));
    setFiles(withPreview);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const selected = Array.from(e.dataTransfer.files).filter(
      (f) => f.type.startsWith("image") || f.type.startsWith("video")
    );
    const withPreview = selected.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
      type: f.type,
    }));
    setFiles(withPreview);
  }

  function removeFile(index) {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    files.forEach((item) => formData.append("media", item.file));
    createStory({ formData });
    showToast(`Story created: ${title}`);
    setTitle("");
    setContent("");
    setFiles([]);
  }

  useEffect(() => {
    getStory();
    return () => files.forEach((item) => URL.revokeObjectURL(item.preview));
  }, []);

  const isVideo = (url) =>
    url.endsWith(".mp4") || url.endsWith(".mov") || url.endsWith(".webm") || url.includes("video");

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 720, margin: "0 auto", padding: "1.5rem 1rem" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=DM+Sans:wght@400;500&display=swap');

        .st-input {
          width: 100%; 
          background: rgba(255, 255, 255, 0.05); 
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px; padding: 8px 12px; font-size: 14px;
          font-family: 'DM Sans', sans-serif; color: #fff; outline: none;
          transition: border-color .15s; box-sizing: border-box;
        }
        .st-input:focus { border-color: #f97316; }

        .st-submit {
          padding: 10px 28px; border: none; border-radius: 8px;
          background: #f97316; color: #fff;
          font-family: 'Barlow Condensed', sans-serif; font-size: 15px;
          font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
          cursor: pointer; transition: opacity .15s;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
        }
        .st-submit:hover { opacity: .88; filter: brightness(1.1); }

        .st-drop-zone {
          border: 1px dashed rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 24px 16px;
          text-align: center; cursor: pointer; transition: all .2s;
          background: rgba(255, 255, 255, 0.02); position: relative;
        }
        .st-drop-zone.drag-over { border-color: #f97316; background: rgba(249, 115, 22, 0.05); }
        .st-drop-zone input[type=file] {
          position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%;
        }

        .st-thumb {
          position: relative; width: 90px; height: 90px;
          border-radius: 8px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1); flex-shrink: 0;
        }
        .st-thumb-remove {
          position: absolute; top: 4px; right: 4px; width: 18px; height: 18px;
          border-radius: 50%; background: rgba(0,0,0,.55); color: #fff;
          border: none; font-size: 11px; cursor: pointer; display: flex;
          align-items: center; justify-content: center; line-height: 1;
        }

        .st-btn-delete {
          background: transparent; border: 0.5px solid rgba(239, 68, 68, 0.3); color: #ef4444;
          border-radius: 6px; padding: 4px 12px; font-size: 12px;
          font-family: 'DM Sans', sans-serif; font-weight: 500; cursor: pointer; transition: all .15s;
        }
        .st-btn-delete:hover { background: #ef4444; color: #fff; }

        .st-story-card {
          background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px;
          padding: 1rem 1.25rem; margin-bottom: 10px;
          animation: st-fadein .25s ease;
        }
        .st-story-card:hover { background: rgba(255, 255, 255, 0.08); }
        @keyframes st-fadein { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }

        .st-media-grid { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
        .st-media-item {
          width: 120px; height: 120px; border-radius: 8px; overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1); flex-shrink: 0;
        }
        .st-media-item img, .st-media-item video { width: 100%; height: 100%; object-fit: cover; display: block; }

        .st-field-label {
          font-size: 11px; font-weight: 500; color: #888;
          letter-spacing: .05em; text-transform: uppercase;
          margin-bottom: 4px; display: block;
        }
        .st-panel-title {
          font-family: 'Barlow Condensed', sans-serif; font-size: 20px;
          font-weight: 700; letter-spacing: .02em; color: #fff;
        }
        .st-toast {
          position: fixed; bottom: 20px; right: 20px; background: #1a1a1a; color: #fff;
          padding: 10px 16px; border-radius: 8px; font-size: 13px; font-weight: 500;
          z-index: 9999; pointer-events: none;
        }
      `}</style>

      {/* ── CREATE PANEL ── */}
      <div style={{ background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1.5" y="1.5" width="15" height="15" rx="3" stroke="#f97316" strokeWidth="1.2"/>
            <path d="M6 9h6M9 6v6" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span className="st-panel-title">Create Story</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            <div>
              <span className="st-field-label">Title</span>
              <input
                type="text" required className="st-input"
                placeholder="e.g. Match Highlights"
                value={title} onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div>
              <span className="st-field-label">Content</span>
              <input
                type="text" className="st-input"
                placeholder="Short description..."
                value={content} onChange={e => setContent(e.target.value)}
              />
            </div>
          </div>

          {/* Drop Zone */}
          <div
            className={`st-drop-zone${dragging ? " drag-over" : ""}`}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <input type="file" multiple accept="image/*,video/*" onChange={handleFileSelect} />
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ margin: "0 auto 8px", display: "block" }}>
              <path d="M14 4v14M14 4l-4 4M14 4l4 4" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 20v2a2 2 0 002 2h16a2 2 0 002-2v-2" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>
              Drag &amp; drop images or videos, or <span style={{ color: "#f97316" }}>browse</span>
            </p>
            <p style={{ fontSize: 11, color: "#bbb", margin: "4px 0 0" }}>JPG, PNG, MP4, MOV supported</p>
          </div>

          {/* Previews */}
          {files.length > 0 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
              {files.map((item, i) => (
                <div key={i} className="st-thumb">
                  {item.type.startsWith("image") ? (
                    <img src={item.preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <video src={item.preview} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                  <button type="button" className="st-thumb-remove" onClick={() => removeFile(i)}>✕</button>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
            {files.length > 0 && (
              <span style={{ fontSize: 12, color: "#888" }}>{files.length} file{files.length !== 1 ? "s" : ""} selected</span>
            )}
            <button type="submit" className="st-submit" style={{ marginLeft: "auto" }}>
              {loading ? "Creating..." : "Publish Story"}
            </button>
          </div>

          {error && <p style={{ color: "#E24B4A", fontSize: 13, marginTop: 8 }}>Error occurred — please try again.</p>}
        </form>
      </div>

      {/* ── STORY LIST ── */}
      <div style={{ background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: 12, padding: "1rem 1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <span className="st-panel-title">Story List</span>
          {story?.length > 0 && (
            <span style={{ fontSize: 12, color: "#888" }}>{story.length} stor{story.length !== 1 ? "ies" : "y"}</span>
          )}
        </div>

        {story && story.length > 0 ? (
          story.map((item, index) => (
            <div key={index} className="st-story-card">
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 2px" }}>
                    {item.title}
                  </p>
                  {item.content && (
                    <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>{item.content}</p>
                  )}
                </div>
                <button className="st-btn-delete" onClick={() => { deleteStory(item.id); showToast(`Deleted: ${item.title}`); }}>
                  Delete
                </button>
              </div>

              {item.media_urls?.length > 0 && (
                <div className="st-media-grid">
                  {item.media_urls.map((url, idx) => (
                    <div key={idx} className="st-media-item">
                      {isVideo(url) ? (
                        <video src={url} controls />
                      ) : (
                        <img src={url} alt={`story media ${idx}`} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p style={{ fontSize: 14, color: "#888", textAlign: "center", padding: "24px 0" }}>No stories yet</p>
        )}
      </div>

      {/* ── TOAST ── */}
      {toastVisible && <div className="st-toast">{toast}</div>}
    </div>
  );
}