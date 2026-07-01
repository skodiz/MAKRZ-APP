import { ArrowLeft, MoreHorizontal } from "lucide-react";
import type { Atelier } from "../../types";
import { TagPill } from "../common/TagPill";

type WorkshopHeaderProps = {
  atelier: Atelier;
  innerTab: "fil" | "res" | "carnet" | "mem";
  setInnerTab: React.Dispatch<React.SetStateAction<"fil" | "res" | "carnet" | "mem">>;
  aboutOpen: boolean;
  setAboutOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isJoined: boolean;
  onToggleJoin: () => void;
  onBack: () => void;
};

export function WorkshopHeader({
  atelier,
  innerTab,
  setInnerTab,
  aboutOpen,
  setAboutOpen,
  isJoined,
  onToggleJoin,
  onBack,
}: WorkshopHeaderProps) {
  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <button className="icon-btn" onClick={onBack}>
            <ArrowLeft size={22} strokeWidth={1.8} />
          </button>
        </div>
        <button className="icon-btn">
          <MoreHorizontal size={22} strokeWidth={1.8} />
        </button>
      </div>

      <div className="ws-header">
        <div className="ws-main">
          <div className="ws-icon">{atelier.emoji}</div>
          <div>
            <div className="ws-info">
              <div className="ws-name">{atelier.name}</div>
              <div className="members">{atelier.members} membres</div>
              <div
                className="tags"
                style={{ marginTop: "var(--space-8)", display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}
              >
                {atelier.tags.map((t) => (
                  <TagPill key={t} label={t} />
                ))}
              </div>
            </div>
          </div>
          <button
            className={`join-btn atelier-join-btn ${isJoined ? "joined" : ""}`}
            onClick={onToggleJoin}
          >
            {isJoined ? "✓ Membre" : "Rejoindre"}
          </button>
        </div>
      </div>

      {aboutOpen ? (
        <div className="about-open">
          <div className="about-title-row" onClick={() => setAboutOpen(false)}>
            <span>À propos de l'atelier</span>
            <span>⌃</span>
          </div>
          <p className="about-text">{atelier.about}</p>
        </div>
      ) : (
        <div className="about" onClick={() => setAboutOpen(true)}>
          <span>À propos de l'atelier</span>
          <span>⌄</span>
        </div>
      )}

      <div className="inner-tabs">
        <button
          className={`inner-tab ${innerTab === "fil" ? "active" : ""}`}
          onClick={() => setInnerTab("fil")}
        >
          Fil
        </button>
        <button
          className={`inner-tab ${innerTab === "res" ? "active" : ""}`}
          onClick={() => setInnerTab("res")}
        >
          Ressources
        </button>
        <button
          className={`inner-tab ${innerTab === "carnet" ? "active" : ""}`}
          onClick={() => setInnerTab("carnet")}
        >
          Carnet
        </button>
        <button
          className={`inner-tab ${innerTab === "mem" ? "active" : ""}`}
          onClick={() => setInnerTab("mem")}
        >
          Membres
        </button>
      </div>
    </>
  );
}
