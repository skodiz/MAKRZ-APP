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
  const activeProject = PROJECTS.find((p) => p.status === "En cours") ?? PROJECTS[0];
  const activeProjectDone = activeProject?.steps.filter((s) => s.done).length ?? 0;

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

        <div className="section-row" style={{ marginTop: "var(--space-11)" }}>
          <div className="sect" style={{ marginBottom: 0 }}>Mes projets</div>
          <button className="section-link" onClick={onProjects}>
            Voir tout ({PROJECTS.length})
          </button>
        </div>
        {activeProject && (
          <div className="res-item" onClick={onProjects} style={{ cursor: "pointer" }}>
            <div className="res-icon">🗂️</div>
            <div style={{ flex: 1 }}>
              <div className="res-title">{activeProject.title}</div>
              <div className="res-meta">
                {activeProject.discipline} · {activeProjectDone}/{activeProject.steps.length} étapes
              </div>
            </div>
          </div>
        )}

        <div className="sect" style={{ marginTop: "var(--space-12)" }}>Activité récente</div>
        {RECENT_ACTIVITY.map((item) => (
          <div className="member-card" key={item.id}>
            <div className="mem-av">{item.icon}</div>
            <div style={{ flex: 1 }}>
              <div className="mem-name">{item.title}</div>
              <div className="mem-sub">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
