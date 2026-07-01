import { ArrowLeft } from "lucide-react";
import { CURRENT_USER, PROJECTS, RECENT_ACTIVITY } from "../data/mockData";

export function ProfileScreen({
  savedCount,
  onBack,
  onSavedPosts,
  onProjects,
}: {
  savedCount: number;
  onBack: () => void;
  onSavedPosts: () => void;
  onProjects: () => void;
}) {
  return (
    <div className="screen">
      <div className="topbar">
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft size={22} strokeWidth={1.8} />
        </button>
        <div className="topbar-title">Profil</div>
      </div>

      <div className="content">
        <div className="member-card">
          <div className="av" style={{ background: CURRENT_USER.avColor, width: 40, height: 40 }}>
            {CURRENT_USER.av}
          </div>
          <div style={{ flex: 1 }}>
            <div className="mem-name">{CURRENT_USER.name}</div>
            <div className="mem-sub">{CURRENT_USER.bio}</div>
          </div>
        </div>

        <div className="section-row">
          <div className="sect" style={{ marginBottom: 0 }}>Publications enregistrées</div>
          <button className="section-link" onClick={onSavedPosts}>
            Voir tout ({savedCount})
          </button>
        </div>

        <div className="section-row" style={{ marginTop: 16 }}>
          <div className="sect" style={{ marginBottom: 0 }}>Mes projets</div>
          <button className="section-link" onClick={onProjects}>
            Voir tout ({PROJECTS.length})
          </button>
        </div>

        <div className="sect" style={{ marginTop: 16 }}>Activité récente</div>
        {RECENT_ACTIVITY.map((item) => (
          <div className="res-item" key={item.id}>
            <div className="res-icon">{item.icon}</div>
            <div style={{ flex: 1 }}>
              <div className="res-title">{item.title}</div>
              <div className="res-meta">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
