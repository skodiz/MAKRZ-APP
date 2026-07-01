import { ArrowLeft } from "lucide-react";
import type { Post } from "../types";

export function SavedPostsScreen({
  posts,
  savedPostIds,
  onBack,
  onPost,
}: {
  posts: Post[];
  savedPostIds: number[];
  onBack: () => void;
  onPost: (p: Post) => void;
}) {
  const savedPosts = posts.filter((p) => savedPostIds.includes(p.id));

  return (
    <div className="screen">
      <div className="topbar">
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft size={22} strokeWidth={1.8} />
        </button>
        <div className="topbar-title">Enregistrés</div>
      </div>

      <div className="content">
        {savedPosts.length === 0 ? (
          <div className="empty-state">Aucune publication enregistrée pour le moment.</div>
        ) : (
          savedPosts.map((p) => (
            <div className="post" key={p.id} onClick={() => onPost(p)}>
              <div className="post-title">{p.title}</div>
              <div className="post-body">{p.body}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
// ─── SCREEN: GALERIE ──────────────────────────────────────────────────────────

