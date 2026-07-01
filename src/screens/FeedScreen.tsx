import type { Dispatch, SetStateAction } from "react";
import type { Post } from "../types";
import { AppHeader } from "../components/common/AppHeader";
import { PostCard } from "../components/posts/PostCard";
import { sharePost, toggleId } from "../utils/postActions";

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
            onToggleSave={(postId) => setSavedPostIds((ids) => toggleId(ids, postId))}
            onShare={sharePost}
          />
        ))}
      </div>
    </div>
  );
}

