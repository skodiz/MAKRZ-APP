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
  const projectUpdates = posts.filter((p) => p.typeKey === "avancement");
  const mainPosts = posts.filter(
    (p) => p.typeKey !== "avancement" && !(p.typeKey === "question" && p.questionStatus)
  );

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

        {projectUpdates.length > 0 && (
          <div style={{ marginTop: "var(--space-12)" }}>
            <div className="sect">Avancées de projet</div>
            {projectUpdates.map((p) => (
              <PostCard
                key={p.id}
                post={p}
                timeSuffix="Céramique raku"
                saved={savedPostIds.includes(p.id)}
                onOpen={onOpenPost}
                onToggleSave={(postId) => setSavedPostIds((ids) => toggleId(ids, postId))}
                onShare={sharePost}
              />
            ))}
          </div>
        )}

        <div className="sect" style={{ marginTop: "var(--space-12)" }}>Fil global</div>
        {mainPosts.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            timeSuffix="Céramique raku"
            saved={savedPostIds.includes(p.id)}
            onOpen={onOpenPost}
            onToggleSave={(postId) => setSavedPostIds((ids) => toggleId(ids, postId))}
            onShare={sharePost}
          />
        ))}
      </div>
    </div>
  );
}

