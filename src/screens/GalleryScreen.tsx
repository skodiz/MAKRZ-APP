import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, MessageCircle, Share2, X } from "lucide-react";
import type { Atelier } from "../types";
import { GalleryGrid } from "../components/gallery/GalleryGrid";

export function GalleryScreen({ atelier, onBack }: { atelier: Atelier | null; onBack: () => void }) {
  const [filter, setFilter] = useState("Toutes");
  const [openPhoto, setOpenPhoto] = useState(false);
  const [openReplies, setOpenReplies] = useState(false);

  const photos = [
    { src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=700&auto=format&fit=crop", h: 230 }, // céramique
    { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=700&auto=format&fit=crop", h: 170 }, // broderie
    { src: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=700&auto=format&fit=crop", h: 170 }, // atelier bois
    { src: "https://images.unsplash.com/photo-1473621038790-b778b4750efe?q=80&w=700&auto=format&fit=crop", h: 230 }, // poterie mains
    { src: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?q=80&w=700&auto=format&fit=crop", h: 130 }, // fil textile
    { src: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=700&auto=format&fit=crop", h: 130 }, // papier reliure
  ];

  return (
    <div className="screen" style={{ position: "relative" }}>
            <div className="topbar" style={{ borderBottom: "1px solid #E6DDD2" }}>
        <div className="topbar-left">
          <button className="icon-btn" onClick={onBack}><ArrowLeft size={22} strokeWidth={1.8} /></button>
          <span className="topbar-title">Galerie · {atelier?.name ?? "MAKRZ"}</span>
        </div>
      </div>
      <div className="content">
        <div className="filters" style={{ marginBottom: 10 }}>
          {["Toutes", "Résultats", "Avancement", "Techniques"].map((f) => (
            <button key={f} className={`filter ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <GalleryGrid photos={photos} onPhotoClick={() => setOpenPhoto(true)} />
      </div>

      {openPhoto && (
        <div className="overlay">
          <div className="detail-sheet">
            <div className="close-row">
              <button className="close-btn" onClick={() => setOpenPhoto(false)}><X size={16} strokeWidth={2} /></button>
            </div>
            <img className="detail-img"
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=900&auto=format&fit=crop" alt="" />
            <div className="detail-title">Sortie de four ce matin</div>
            <div className="detail-meta">Marie D. · Céramique raku · il y a 2 h</div>
            <div className="detail-text">Voici ma dernière pièce sortie du four ce matin. La couleur de l'émail a très bien pris — je suis contente du résultat !</div>
            <div className="detail-actions">
              <div className="reply-count"><MessageCircle size={15} strokeWidth={1.8} /> 4</div>
              <button className="share-btn-sm"><Share2 size={14} strokeWidth={1.8} /> Partager</button>
            </div>
            <div className="comment-head" style={{ marginTop: 8 }}>
              <div className="c-av">LM</div>
              <div><div className="comment-name">Lucie M.</div><div className="comment-time">il y a 1 h</div></div>
            </div>
            <div className="comment-text">Magnifique résultat !</div>
            <div className="comment-actions">
              <span>Répondre</span>
              <button className="toggle-btn" onClick={() => setOpenReplies(!openReplies)}>
                {openReplies ? <><span>Masquer</span><ChevronUp size={13} /></> : <><span>Voir 1 réponse</span><ChevronDown size={13} /></>}
              </button>
            </div>
            {openReplies && (
              <div className="nested">
                <div className="comment-head"><div className="c-av">TR</div><div><div className="comment-name">Théo R.</div><div className="comment-time">il y a 45 min</div></div></div>
                <div className="comment-text">La texture est superbe.</div>
                <div className="comment-actions"><span>Répondre</span></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SCREEN: ADD RESOURCE ─────────────────────────────────────────────────────

