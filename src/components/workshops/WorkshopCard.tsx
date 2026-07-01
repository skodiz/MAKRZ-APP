import type { Atelier } from "../../types";
import { TagPill } from "../common/TagPill";

type WorkshopCardProps = {
  atelier: Atelier;
  onOpen: (atelier: Atelier) => void;
  variant?: "mine" | "discover";
  isJoined?: boolean;
  onToggleJoin?: (atelierId: number) => void;
};

export function WorkshopCard({
  atelier,
  onOpen,
  variant = "mine",
  isJoined = false,
  onToggleJoin,
}: WorkshopCardProps) {
  const showUnread = variant === "mine" && (atelier.unread ?? 0) > 0;
  const showTags = variant === "discover" && atelier.tags.length > 0;
  const showJoinButton = variant === "discover" && onToggleJoin;

  return (
    <div className="card" onClick={() => onOpen(atelier)}>
      <div className="card-top">
        <div className="icon">{atelier.emoji}</div>
        <div className="card-info">
          <div className="title-row">
            <div>
              <div className="atelier-name">{atelier.name}</div>
              <div className="members">{atelier.members} membres</div>

              {showTags && (
                <div
                  className="tags"
                  style={{ marginTop: "var(--space-6)", display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}
                >
                  {atelier.tags.map((tag) => (
                    <TagPill key={tag} label={tag} />
                  ))}
                </div>
              )}
            </div>

            {showUnread && (
              <div className="new-badge">
                {atelier.unread === 1 ? "1 nouveau" : `${atelier.unread} nouveaux`}
              </div>
            )}

            {showJoinButton && (
              <button
                className={`join-btn ${isJoined ? "joined" : ""}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleJoin(atelier.id);
                }}
              >
                {isJoined ? "✓ Membre" : "Rejoindre"}
              </button>
            )}
          </div>
        </div>
      </div>

      {variant === "mine" ? (
        <div className="card-footer">
          <div className="last-text">{atelier.last}</div>
          <div className="time">{atelier.time}</div>
        </div>
      ) : (
        <div className="discover-description full">{atelier.description}</div>
      )}
    </div>
  );
}
