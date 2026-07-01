import { NOTEBOOK_ENTRIES } from "../../data/mockData";
import type { NotebookCategory } from "../../types";

const CATEGORIES: NotebookCategory[] = ["Matériaux", "Outils", "Techniques", "Erreurs fréquentes"];

export function WorkshopNotebook() {
  return (
    <div className="content-white">
      {CATEGORIES.map((category) => {
        const entries = NOTEBOOK_ENTRIES.filter((e) => e.category === category);
        if (entries.length === 0) return null;

        return (
          <div key={category}>
            <div className="sect">{category}</div>
            {entries.map((entry) => (
              <div className="res-item" key={entry.id}>
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
