import { ExternalLink, FileText, Link as LinkIcon } from "lucide-react";

type WorkshopResourcesProps = {
  galleryIds: string[];
  onGalerie: () => void;
  onAddRes: () => void;
};

const resources = [
  { kind: "file", title: "Introduction au raku", meta: "Marie D. · 12 jan." },
  { kind: "link", title: "Fournisseur d'émaux — Solargil", meta: "Thomas R. · 8 jan." },
  { kind: "file", title: "Guide des températures raku", meta: "Lucie M. · 3 jan." },
];

export function WorkshopResources({ galleryIds, onGalerie, onAddRes }: WorkshopResourcesProps) {
  return (
    <div className="content-white">
      <div className="section-row">
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)" }}>
          Galerie de l'atelier
        </div>
        <button className="section-link" onClick={onGalerie}>
          Voir tout
        </button>
      </div>

      <div className="gallery-grid">
        {galleryIds.map((id, i) => (
          <img
            key={i}
            className="gal-img"
            onClick={onGalerie}
            src={`https://images.unsplash.com/${id}?q=80&w=400&auto=format&fit=crop`}
            alt=""
          />
        ))}
      </div>

      <div className="section-row">
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)" }}>
          Documents et liens
        </div>
        <button className="section-link" onClick={onAddRes}>
          + Ajouter
        </button>
      </div>

      {resources.map((r, i) => (
        <div className="res-item" key={i}>
          <div className="res-icon">
            {r.kind === "file" ? (
              <FileText size={17} strokeWidth={1.8} />
            ) : (
              <LinkIcon size={17} strokeWidth={1.8} />
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div className="res-title">{r.title}</div>
            <div className="res-meta">{r.meta}</div>
          </div>
          <div style={{ color: "var(--color-text-placeholder)" }}>
            <ExternalLink size={15} strokeWidth={1.8} />
          </div>
        </div>
      ))}
    </div>
  );
}
