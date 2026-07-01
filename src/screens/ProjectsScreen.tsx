import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PROJECTS } from "../data/mockData";

export function ProjectsScreen({ onBack }: { onBack: () => void }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="screen">
      <div className="topbar">
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft size={22} strokeWidth={1.8} />
        </button>
        <div className="topbar-title">Mes projets</div>
      </div>

      <div className="content">
        <div className="sect">Journal de bord</div>
        {PROJECTS.map((project) => {
          const expanded = expandedId === project.id;
          const chipClass =
            project.status === "Terminé"
              ? "resultat"
              : project.status === "En pause"
                ? "avancement"
                : "decouverte";
          const doneSteps = project.steps.filter((s) => s.done).length;
          const firstPendingIndex = project.steps.findIndex((s) => !s.done);

          return (
            <div
              className="card"
              key={project.id}
              onClick={() => setExpandedId(expanded ? null : project.id)}
            >
              <div className="title-row">
                <div>
                  <div className="atelier-name">{project.title}</div>
                  <div className="members">{project.discipline}</div>
                </div>
                <span className={`type-chip ${chipClass}`}>{project.status}</span>
              </div>

              <div className="discover-description full">{project.description}</div>

              <div className="card-footer">
                <div className="last-text">
                  {doneSteps} / {project.steps.length} étapes
                </div>
                <span style={{ fontSize: 12, color: "var(--color-text-placeholder-alt)" }}>
                  {expanded ? "Masquer ⌃" : "Voir le journal ⌄"}
                </span>
              </div>

              {expanded && (
                <div className="timeline">
                  <div className="timeline-track">
                    <div
                      className="timeline-track-fill"
                      style={{ height: `${Math.round((doneSteps / project.steps.length) * 100)}%` }}
                    />
                  </div>
                  {project.steps.map((step, index) => {
                    const isCurrent = !step.done && index === firstPendingIndex;
                    const stateClass = step.done ? "done" : isCurrent ? "current" : "upcoming";

                    return (
                      <div className="timeline-item" key={step.id}>
                        <div className={`timeline-dot ${stateClass}`} />
                        <div className={`timeline-title ${stateClass}`}>{step.label}</div>
                        {isCurrent && <div className="timeline-status">En cours</div>}
                        {step.note && <div className="timeline-note">{step.note}</div>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
