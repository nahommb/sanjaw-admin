import { useContext, useEffect, useState } from "react";
import { LiveStreamContext } from "../context/live_stream_context";

export default function LiveStream() {
  const {
    liveEvent,
    getLiveEvent,
    streamMatch,
    createLiveMatch,
    sendNotification,
    endMatch,
    loading,
    error,
  } = useContext(LiveStreamContext);

  const [activeTab, setActiveTab] = useState("create");
  const [eventType, setEventType] = useState("");
  const [teamType, setTeamType] = useState("home");
  const [teamName, setTeamName] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [liveId, setLiveId] = useState("");
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [localMatches, setLocalMatches] = useState([]);
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    getLiveEvent();
  }, []);

  // Sync localMatches whenever liveEvent loads from the server
  useEffect(() => {
    if (liveEvent) setLocalMatches(liveEvent);
  }, [liveEvent]);

  const showToast = (msg) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  };

  const handleCreateMatch = async (e) => {
    e.preventDefault();
    const newMatch = {
      id: `temp-${Date.now()}`,
      home_team: homeTeam,
      away_team: awayTeam,
      live_id: liveId,
    };
    // Optimistically add to list immediately
    setLocalMatches(prev => [...prev, newMatch]);
    showToast(`Match created: ${homeTeam} vs ${awayTeam}`);
    setHomeTeam("");
    setAwayTeam("");
    setLiveId("");
    // Then persist to server — context should update liveEvent which syncs back
    await createLiveMatch({ home_team: homeTeam, away_team: awayTeam, live_id: liveId });
    // Re-fetch to replace temp id with real server id
    getLiveEvent();
  };

  const handleStreamMatch = (e) => {
    e.preventDefault();
    streamMatch({
      match_id: localMatches[localMatches.length - 1]?.id,
      event_type: eventType,
      team_type: teamType,
      team_name: teamName,
      home_score: homeScore,
      away_score: awayScore,
    });
    showToast(`Streamed: ${eventType}${teamName ? " — " + teamName : ""}`);
  };

  const handleSendNotification = (e) => {
    e.preventDefault();
    sendNotification({ title: notificationTitle, body: notificationMessage });
    showToast(`Notification sent: ${notificationTitle}`);
    setNotificationTitle("");
    setNotificationMessage("");
  };

  const handleEndMatch = (id, label) => {
    setLocalMatches(prev => prev.filter(m => m.id !== id));
    endMatch(id);
    showToast(`Match ended: ${label}`);
  };

  const tabs = [
    { id: "create", label: "Create Match" },
    { id: "stream", label: "Stream Event" },
    { id: "notify", label: "Notification" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 680, margin: "0 auto", padding: "1.5rem 1rem" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=DM+Sans:wght@400;500&display=swap');
        .ls-input { width:100%;background:rgba(255, 255, 255, 0.05);border:1px solid rgba(255, 255, 255, 0.1);border-radius:8px;padding:8px 12px;font-size:14px;font-family:'DM Sans',sans-serif;color:#fff;outline:none;transition:border-color .15s;box-sizing:border-box; }
        .ls-input:focus { border-color:#f97316; }
        .ls-btn-end { background:transparent;border:0.5px solid rgba(239, 68, 68, 0.3);color:#ef4444;border-radius:6px;padding:4px 12px;font-size:12px;font-family:'DM Sans',sans-serif;font-weight:500;cursor:pointer;transition:all .15s; }
        .ls-btn-end:hover { background:#ef4444;color:#fff; }
        .ls-submit { width:100%;margin-top:8px;padding:10px;border:none;border-radius:8px;font-family:'Barlow Condensed',sans-serif;font-size:15px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;transition:opacity .15s;box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2); }
        .ls-submit:hover { opacity:.88; }
        .ls-tab { flex:1;padding:8px 0;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;text-align:center;border:none;border-radius:8px;cursor:pointer;transition:all .15s; }
        .ls-pulse { width:8px;height:8px;border-radius:50%;background:#ef4444;animation:ls-pulse 1.4s infinite;flex-shrink:0; }
        @keyframes ls-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
        .ls-toast { position:fixed;bottom:20px;right:20px;background:#1a1a1a;color:#fff;padding:10px 16px;border-radius:8px;font-size:13px;font-weight:500;z-index:9999;transition:all .3s;pointer-events:none; }
      `}</style>

      {/* Live Matches Panel */}
      <div style={{ background:"rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", border:"1px solid rgba(255, 255, 255, 0.1)", borderRadius:12, padding:"1rem 1.25rem", marginBottom:"1rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
          <div className="ls-pulse" />
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:20, fontWeight:700, letterSpacing:".02em", color:"#fff" }}>
            Live Matches
          </span>
        </div>

        {localMatches && localMatches.length > 0 ? (
          localMatches.map((match, index) => (
            <div key={match.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderBottom: index < localMatches.length - 1 ? "1px solid rgba(255, 255, 255, 0.1)" : "none" }}>
              <span style={{ fontSize:14, fontWeight:500, color:"#fff" }}>
                {match.home_team}
                <span style={{ color:"#94a3b8", fontWeight:400, margin:"0 6px" }}>vs</span>
                {match.away_team}
              </span>
              <button className="ls-btn-end" onClick={() => handleEndMatch(match.id, `${match.home_team} vs ${match.away_team}`)}>
                Finished
              </button>
            </div>
          ))
        ) : (
          <p style={{ fontSize:14, color:"#94a3b8", textAlign:"center", padding:"12px 0" }}>No live matches available</p>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:4, marginBottom:"1rem", background:"rgba(255, 255, 255, 0.02)", border:"1px solid rgba(255, 255, 255, 0.05)", borderRadius:10, padding:4 }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className="ls-tab"
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? "#f97316" : "transparent",
              color: activeTab === tab.id ? "#fff" : "#94a3b8",
              boxShadow: activeTab === tab.id ? "0 4px 12px rgba(249, 115, 22, 0.2)" : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Create Match */}
      {activeTab === "create" && (
        <div style={{ background:"rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", border:"1px solid rgba(255, 255, 255, 0.1)", borderRadius:12, padding:"1rem 1.25rem" }}>
          <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#94a3b8", marginBottom:12 }}>
            Create Live Match
          </p>
          <form onSubmit={handleCreateMatch}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:10 }}>
              {[
                { label:"Home Team", val:homeTeam, set:setHomeTeam, ph:"e.g. Arsenal" },
                { label:"Away Team", val:awayTeam, set:setAwayTeam, ph:"e.g. Chelsea" },
                { label:"Live ID",   val:liveId,   set:setLiveId,   ph:"e.g. LV-001" },
              ].map(({ label, val, set, ph }) => (
                <div key={label} style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <span style={{ fontSize:11, fontWeight:500, color:"#888", letterSpacing:".05em", textTransform:"uppercase" }}>{label}</span>
                  <input required className="ls-input" placeholder={ph} value={val} onChange={e => set(e.target.value)} />
                </div>
              ))}
            </div>
            <button type="submit" className="ls-submit" style={{ background:"#f97316", color:"#fff" }}>
              {loading ? "Creating..." : "Create Match"}
            </button>
          </form>
        </div>
      )}

      {/* Tab: Stream Event */}
      {activeTab === "stream" && (
        <div style={{ background:"rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", border:"1px solid rgba(255, 255, 255, 0.1)", borderRadius:12, padding:"1rem 1.25rem" }}>
          <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#94a3b8", marginBottom:12 }}>
            Stream Event
          </p>
          <form onSubmit={handleStreamMatch}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:12 }}>
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                <span style={{ fontSize:11, fontWeight:500, color:"#888", letterSpacing:".05em", textTransform:"uppercase" }}>Event Type</span>
                <input required className="ls-input" placeholder="e.g. Goal, Yellow Card" onChange={e => setEventType(e.target.value)} />
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                <span style={{ fontSize:11, fontWeight:500, color:"#888", letterSpacing:".05em", textTransform:"uppercase" }}>Team Side</span>
                <select className="ls-input" value={teamType} onChange={e => setTeamType(e.target.value)}>
                  <option value="home">Home</option>
                  <option value="away">Away</option>
                </select>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                <span style={{ fontSize:11, fontWeight:500, color:"#888", letterSpacing:".05em", textTransform:"uppercase" }}>Team Name</span>
                <input className="ls-input" placeholder="e.g. Arsenal" onChange={e => setTeamName(e.target.value)} />
              </div>
            </div>

            <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#94a3b8", marginBottom:8 }}>Score</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:8, alignItems:"center", marginBottom:8 }}>
              <input required className="ls-input" placeholder="Home" style={{ textAlign:"center", fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:700 }} onChange={e => setHomeScore(e.target.value)} />
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:24, fontWeight:700, color:"#334155", textAlign:"center" }}>—</span>
              <input required className="ls-input" placeholder="Away" style={{ textAlign:"center", fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:700 }} onChange={e => setAwayScore(e.target.value)} />
            </div>

            <button type="submit" className="ls-submit" style={{ background:"#f97316", color:"#fff" }}>
              {loading ? "Streaming..." : "Stream Event"}
            </button>
          </form>
        </div>
      )}

      {/* Tab: Notification */}
      {activeTab === "notify" && (
        <div style={{ background:"rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", border:"1px solid rgba(255, 255, 255, 0.1)", borderRadius:12, padding:"1rem 1.25rem" }}>
          <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#94a3b8", marginBottom:12 }}>
            Send Notification
          </p>
          <form onSubmit={handleSendNotification}>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:4 }}>
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                <span style={{ fontSize:11, fontWeight:500, color:"#888", letterSpacing:".05em", textTransform:"uppercase" }}>Title</span>
                <input required className="ls-input" placeholder="e.g. Full Time Whistle" value={notificationTitle} onChange={e => setNotificationTitle(e.target.value)} />
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                <span style={{ fontSize:11, fontWeight:500, color:"#888", letterSpacing:".05em", textTransform:"uppercase" }}>Message</span>
                <input required className="ls-input" placeholder="e.g. Arsenal 2–1 Chelsea — Full Time" value={notificationMessage} onChange={e => setNotificationMessage(e.target.value)} />
              </div>
            </div>
            <button type="submit" className="ls-submit" style={{ background:"#ef4444", color:"#fff" }}>
              {loading ? "Sending..." : "Send Notification"}
            </button>
          </form>
          {error && <p style={{ color:"#E24B4A", fontSize:13, marginTop:8 }}>Error occurred — please try again.</p>}
        </div>
      )}

      {/* Toast */}
      {toastVisible && (
        <div className="ls-toast">{toast}</div>
      )}
    </div>
  );
}
