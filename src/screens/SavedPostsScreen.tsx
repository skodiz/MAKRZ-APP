import { ArrowLeft } from "lucide-react";
import type { Post } from "../types";
import { PostCard } from "../components/posts/PostCard";

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
            <PostCard key={p.id} post={p} variant="compact" onOpen={onPost} />
          ))
        )}
      </div>
    </div>
  );
}
// ─── SCREEN: GALERIE ──────────────────────────────────────────────────────────

