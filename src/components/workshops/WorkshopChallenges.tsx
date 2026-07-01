import { useState } from "react";
import { CHALLENGES } from "../../data/mockData";

export function WorkshopChallenges() {
  const [joinedIds, setJoinedIds] = useState<number[]>([]);
  const activeChallenges = CHALLENGES.filter((c) => c.status === "active");

  if (activeChallenges.length === 0) return null;

  return (
    <>
      <div className="sect">Défis d'atelier</div>
      {activeChallenges.map((challenge) => {
        const joined = joinedIds.includes(challenge.id);
        return (
          <div className="card" key={challenge.id} style={{ cursor: "default" }}>
            <div className="title-row">
              <div className="atelier-name">{challenge.title}</div>
              <span className="type-chip question" style={{ cursor: "default" }}>
                Actif
              </span>
            </div>

            <div className="discover-description full">{challenge.description}</div>

            <div className="card-footer">
              <div className="last-text">{challenge.linkedPostsCount} participations</div>
              <button
                className="photo-btn"
                onClick={() => setJoinedIds((ids) => (ids.includes(challenge.id) ? ids : [...ids, challenge.id]))}
              >
                {joined ? "✓ Vous participez" : "Participer"}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
