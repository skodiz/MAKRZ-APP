import type { Dispatch, SetStateAction } from "react";
import type { Post } from "../types";
import { AppHeader } from "../components/common/AppHeader";
import { PostCard } from "../components/posts/PostCard";
import { UnansweredQuestions } from "../components/posts/UnansweredQuestions";
import { sharePost, toggleId } from "../utils/postActions";

export function FeedScreen({
  posts,
  savedPostIds,
  setSavedPostIds,
  onProfile,
  onSearch,
  onMessages,
  onNotifications,
  onOpenPost,
}: {
  posts: Post[];
  savedPostIds: number[];
  setSavedPostIds: Dispatch<SetStateAction<number[]>>;
  onProfile: () => void;
  onSearch?: () => void;
  onMessages?: () => void;
  onNotifications?: () => void;
  onOpenPost: (post: Post) => void;
}) {
  return (
    <div className="screen">
          <AppHeader
            onProfile={onProfile}
            onSearch={onSearch}
            onMessages={onMessages}
            onNotifications={onNotifications}
          />
      <div className="content">
        <UnansweredQuestions posts={posts} onOpen={onOpenPost} />
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

