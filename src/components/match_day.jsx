import { useContext, useEffect, useState } from "react";
import { MatchDayContext } from "../context/match_dayContext.jsx";

export function MatchDay() {
  const { createMatchDay, getMatchDay, matchDays, loading, error } = useContext(MatchDayContext);
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [venue, setVenue] = useState("");
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  useEffect(() => {
    getMatchDay();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMatchDay({ home_team: homeTeam, away_team: awayTeam, match_date: matchDate.replace('T', ' ') + ':00', event_type: eventType, venue });
    showToast(`Match created: ${homeTeam} vs ${awayTeam}`);
    setHomeTeam("");
    setAwayTeam("");
    setMatchDate("");
    setEventType("");
    setVenue("");
    e.target.reset();
  };

  const onPageChange = (value) => {
    setCurrentPage(value);
    getMatchDay(value);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString("en-GB", { 
      day: "2-digit", 
      month: "short", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true 
    });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 720, margin: "0 auto", padding: "1.5rem 1rem" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=DM+Sans:wght@400;500&display=swap');

        .md-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          outline: none;
          transition: border-color .15s;
          box-sizing: border-box;
        }
        .md-input:focus { border-color: #f97316; }
        input[type="datetime-local"].md-input { color: #94a3b8; }

        .md-submit {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 8px;
          background: #f97316;
          color: #fff;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity .15s;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
        }
        .md-submit:hover { opacity: .88; }

        .md-btn-edit {
          background: transparent;
          border: 0.5px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          border-radius: 6px;
          padding: 5px 14px;
          font-size: 12px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: all .15s;
        }
        .md-btn-edit:hover { border-color: #f97316; color: #f97316; background: rgba(249, 115, 22, 0.05); }

        .md-btn-delete {
          background: transparent;
          border: 0.5px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          border-radius: 6px;
          padding: 5px 14px;
          font-size: 12px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: all .15s;
        }
        .md-btn-delete:hover { background: #ef4444; color: #fff; }

        .md-form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 12px;
        }
        @media (min-width: 640px) {
          .md-form-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .md-match-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 16px 0;
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
          gap: 12px;
          animation: md-fadein .25s ease;
        }
        @media (min-width: 640px) {
          .md-match-row {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 12px 0;
          }
        }
        
        .md-match-row:last-child { border-bottom: none; padding-bottom: 0; }
        @keyframes md-fadein { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }

        .md-match-info {
          flex: 1;
          min-width: 0;
          width: 100%;
        }

        .md-match-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 12px;
        }
        @media (min-width: 640px) {
          .md-match-meta {
            width: auto;
            justify-content: flex-end;
          }
        }

        .md-page-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 0.5px solid #e0ddd8;
          background: transparent;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #888;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .15s;
        }
        .md-page-btn:hover { border-color: #f97316; color: #f97316; }
        .md-page-btn.active { background: #f97316; color: #fff; border-color: #f97316; shadow: 0 4px 12px rgba(249, 115, 22, 0.2); }
        .md-page-btn:disabled { opacity: .35; cursor: default; }

        .md-badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
          background: rgba(249, 115, 22, 0.1);
          color: #f97316;
          white-space: nowrap;
        }
        .md-venue-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #888;
          white-space: nowrap;
        }

        .md-toast {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #1a1a1a;
          color: #fff;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          z-index: 9999;
          pointer-events: none;
        }

        .md-section-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 12px;
        }
        .md-panel-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: .02em;
          color: #fff;
        }
        .md-field-label {
          font-size: 11px;
          font-weight: 500;
          color: #888;
          letter-spacing: .05em;
          text-transform: uppercase;
          margin-bottom: 4px;
          display: block;
        }
      `}</style>

      {/* ── CREATE PANEL ── */}
      <div style={{ background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          {/* Calendar icon */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.5" y="3" width="15" height="13.5" rx="2" stroke="#f97316" strokeWidth="1.2"/>
            <path d="M1.5 7.5h15" stroke="#f97316" strokeWidth="1.2"/>
            <path d="M6 1.5v3M12 1.5v3" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span className="md-panel-title">Create Match Day</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="md-form-grid">
            {/* Date */}
            <div>
              <span className="md-field-label">Match Date & Time</span>
              <input type="datetime-local" required className="md-input" onChange={e => setMatchDate(e.target.value)} />
            </div>
            {/* Home */}
            <div>
              <span className="md-field-label">Home Team</span>
              <input type="text" required className="md-input" placeholder="e.g. Arsenal" value={homeTeam} onChange={e => setHomeTeam(e.target.value)} />
            </div>
            {/* Away */}
            <div>
              <span className="md-field-label">Away Team</span>
              <input type="text" required className="md-input" placeholder="e.g. Chelsea" value={awayTeam} onChange={e => setAwayTeam(e.target.value)} />
            </div>
            {/* Competition */}
            <div>
              <span className="md-field-label">Competition</span>
              <input type="text" required className="md-input" placeholder="e.g. Premier League" value={eventType} onChange={e => setEventType(e.target.value)} />
            </div>
            {/* Venue */}
            <div>
              <span className="md-field-label">Venue</span>
              <input type="text" required className="md-input" placeholder="e.g. Emirates Stadium" value={venue} onChange={e => setVenue(e.target.value)} />
            </div>
            {/* Submit */}
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button type="submit" className="md-submit">
                {loading ? "Creating..." : "Create Match"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ── MATCH LIST PANEL ── */}
      <div style={{ background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: 12, padding: "1rem 1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <span className="md-panel-title">Scheduled Matches</span>
          {matchDays?.length > 0 && (
            <span style={{ fontSize: 12, color: "#888" }}>{matchDays.length} match{matchDays.length !== 1 ? "es" : ""}</span>
          )}
        </div>

        {matchDays && matchDays.length > 0 ? (
          <div>
            {matchDays.map((match, index) => (
              <div key={index} className="md-match-row">
                {/* Teams */}
                <div className="md-match-info">
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#fff", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {match.home_team}
                    <span style={{ color: "#64748b", fontWeight: 400, margin: "0 6px" }}>vs</span>
                    {match.away_team}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                    <span className="md-badge">{match.event_type}</span>
                    <span className="md-venue-tag">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1C3.567 1 2 2.567 2 4.5c0 2.625 3.5 5.5 3.5 5.5S9 7.125 9 4.5C9 2.567 7.433 1 5.5 1z" stroke="#888" strokeWidth="1"/></svg>
                      {match.venue}
                    </span>
                  </div>
                </div>

                <div className="md-match-meta">
                  {/* Date */}
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 12, color: "#888", margin: 0, fontVariantNumeric: "tabular-nums" }}>
                      {formatDate(match.match_date)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="md-btn-edit">Edit</button>
                    <button className="md-btn-delete" onClick={() => showToast(`Deleted: ${match.home_team} vs ${match.away_team}`)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 14, color: "#888", textAlign: "center", padding: "24px 0" }}>No matches scheduled</p>
        )}

        {error && <p style={{ color: "#E24B4A", fontSize: 13, marginTop: 8 }}>Error occurred — please try again.</p>}

        {/* ── PAGINATION ── */}
        <div style={{ display: "flex", alignItems: "center", justifyCenter: "center", gap: 4, marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <button
            className="md-page-btn"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            style={{ fontSize: 16 }}
          >‹</button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
            .reduce((acc, p, idx, arr) => {
              if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === "..." ? (
                <span key={`ellipsis-${i}`} style={{ fontSize: 13, color: "#bbb", padding: "0 4px" }}>…</span>
              ) : (
                <button
                  key={p}
                  className={`md-page-btn${currentPage === p ? " active" : ""}`}
                  onClick={() => onPageChange(p)}
                >
                  {p}
                </button>
              )
            )}

          <button
            className="md-page-btn"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            style={{ fontSize: 16 }}
          >›</button>
        </div>
      </div>

      {/* ── TOAST ── */}
      {toastVisible && <div className="md-toast">{toast}</div>}
    </div>
  );
}