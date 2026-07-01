import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { Atelier, Post } from "../types";
import { ATELIERS, DISCOVER } from "../data/mockData";
import { SearchBar } from "../components/common/SearchBar";
import { EmptyState } from "../components/common/EmptyState";
import { WorkshopCard } from "../components/workshops/WorkshopCard";
import { PostCard } from "../components/posts/PostCard";

export function SearchScreen({
  posts,
  onBack,
  onOpenAtelier,
  onOpenPost,
}: {
  posts: Post[];
  onBack: () => void;
  onOpenAtelier: (atelier: Atelier) => void;
  onOpenPost: (post: Post) => void;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const matchedAteliers = q
    ? [...ATELIERS, ...DISCOVER].filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.tags.join(" ").toLowerCase().includes(q)
      )
    : [];

  const matchedPosts = q
    ? posts.filter(
        (p) =>
          (p.title ?? "").toLowerCase().includes(q) ||
          p.body.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
      )
    : [];

  const hasResults = matchedAteliers.length > 0 || matchedPosts.length > 0;

  return (
    <div className="screen">
      <div className="topbar">
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft size={22} strokeWidth={1.8} />
        </button>
        <div className="topbar-title">Rechercher</div>
      </div>

      <div className="content">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Rechercher une publication ou un atelier..."
        />

        {!q && (
          <EmptyState
            icon="🔎"
            title="Rechercher dans MAKRZ"
            text="Trouvez des ateliers ou des publications par mot-clé."
          />
        )}

        {q && !hasResults && (
          <EmptyState
            icon="🔎"
            title="Aucun résultat"
            text={`Rien ne correspond à « ${query} ». Essayez un autre mot-clé.`}
          />
        )}

        {matchedAteliers.length > 0 && (
          <>
            <div className="sect">Ateliers</div>
            {matchedAteliers.map((a) => (
              <WorkshopCard
                key={a.id}
                atelier={a}
                onOpen={onOpenAtelier}
                variant={ATELIERS.some((x) => x.id === a.id) ? "mine" : "discover"}
              />
            ))}
          </>
        )}

        {matchedPosts.length > 0 && (
          <>
            <div className="sect" style={{ marginTop: "var(--space-11)" }}>Publications</div>
            {matchedPosts.map((p) => (
              <PostCard key={p.id} post={p} variant="compact" onOpen={onOpenPost} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
