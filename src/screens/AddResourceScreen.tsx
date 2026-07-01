import { ArrowLeft, Check, ChevronDown, Link as LinkIcon } from "lucide-react";
import type { Atelier } from "../types";

export function AddResourceScreen({ atelier, onBack }: { atelier: Atelier | null; onBack: () => void }) {
  return (
    <div className="screen">
       <div className="topbar" style={{ borderBottom: "1px solid #E6DDD2" }}>
        <div className="topbar-left">
          <button className="icon-btn" onClick={onBack}><ArrowLeft size={22} strokeWidth={1.8} /></button>
          <span className="topbar-title">Nouvelle ressource</span>
        </div>
      </div>
      <div className="add-res-content">
        <div className="form-card">
          <div className="form-intro">
            Ajoutez un document, un lien ou une référence utile à l'atelier {atelier?.name ?? "Céramique raku"}.
          </div>
          <div className="field">
            <label className="label">Type de ressource</label>
            <div className="select-look">
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <LinkIcon size={16} strokeWidth={1.8} color="#C6784F" /> Lien
              </span>
              <ChevronDown size={17} strokeWidth={1.8} />
            </div>
          </div>
          <div className="field">
            <label className="label">Titre</label>
            <input className="f-input" placeholder="Ex. Fournisseur d'émaux — Solargil" />
          </div>
          <div className="field">
            <label className="label">Description</label>
            <textarea className="f-textarea" placeholder="Pourquoi cette ressource est utile pour l'atelier ?" />
          </div>
          <div className="field">
            <label className="label">Lien ou fichier</label>
            <input className="f-input" placeholder="Coller un lien ou ajouter un fichier" />
            <div className="helper">PDF, article, vidéo, fournisseur, événement ou fiche technique.</div>
          </div>
          <div className="announce">
            <div className="checkbox"><Check size={13} strokeWidth={2.5} /></div>
            <div>
              <div className="announce-title">Annoncer dans le fil de l'atelier</div>
              <div className="announce-sub">Une publication sera créée automatiquement pour prévenir les membres.</div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-actions">
        <button className="cancel-lnk" onClick={onBack}>Annuler</button>
        <button className="submit-btn" onClick={onBack}>Ajouter</button>
      </div>
    </div>
  );
}

// ─── SCREEN: FEED GLOBAL ──────────────────────────────────────────────────────

  