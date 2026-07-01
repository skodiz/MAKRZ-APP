import { NOTEBOOK_ENTRIES } from "../../data/mockData";
import type { NotebookCategory } from "../../types";

const CATEGORIES: NotebookCategory[] = ["Matériaux", "Outils", "Techniques", "Erreurs fréquentes"];

export function WorkshopNotebook() {
  return (
    <div className="content-white">
      {CATEGORIES.map((category, categoryIndex) => {
        const entries = NOTEBOOK_ENTRIES.filter((e) => e.category === category);
        if (entries.length === 0) return null;

        return (
          <div key={category} style={{ marginTop: categoryIndex === 0 ? 0 : "var(--space-12)" }}>
            <div className="sect">{category}</div>
            {entries.map((entry, entryIndex) => (
              <div
                className="res-item"
                key={entry.id}
                style={entryIndex === entries.length - 1 ? { borderBottom: "none" } : undefined}
              >
                <div className="res-icon">📓</div>
                <div style={{ flex: 1 }}>
                  <div className="res-title">{entry.title}</div>
                  <div className="res-meta">{entry.summary}</div>
                  <div className="res-meta">
                    Mis à jour le {entry.updatedAt} · {entry.contributor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
