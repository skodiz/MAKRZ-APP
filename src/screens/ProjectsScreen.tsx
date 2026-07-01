import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
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
              </div>

              {expanded && (
                <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                  {project.steps.map((step) => (
                    <div key={step.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        className="checkbox"
                        style={{
                          background: step.done ? "var(--color-green-sage)" : "var(--color-bg-taupe)",
                        }}
                      >
                        {step.done && <Check size={13} strokeWidth={2.5} />}
                      </div>
                      <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
