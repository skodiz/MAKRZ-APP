import type { Dispatch, SetStateAction } from "react";
import type { Post } from "../types";
import { AppHeader } from "../components/common/AppHeader";
import { PostCard } from "../components/posts/PostCard";

export function FeedScreen({
  posts,
  savedPostIds,
  setSavedPostIds,
  onProfile,
}: {
  posts: Post[];
  savedPostIds: number[];
  setSavedPostIds: Dispatch<SetStateAction<number[]>>;
  onProfile: () => void;
}) { 
    const handleShare = async (p: Post) => {
  const shareText = `${p.title}\n\n${p.body}`;

  if (navigator.share) {
    await navigator.share({
      title: p.title,
      text: shareText,
      url: window.location.href,
    });
  } else {
    await navigator.clipboard.writeText(shareText);
    alert("Lien copié");
  }
};
  return (
    <div className="screen">
          <AppHeader onProfile={onProfile} />
      <div className="content">
        <div className="sect">Fil global</div>
        {posts.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            timeSuffix="Céramique raku"
            saved={savedPostIds.includes(p.id)}
            onToggleSave={(postId) => {
              setSavedPostIds((ids) =>
                ids.includes(postId)
                  ? ids.filter((id) => id !== postId)
                  : [...ids, postId]
              );
            }}
            onShare={handleShare}
          />
        ))}
      </div>
    </div>
  );
}

