import { Bookmark, MessageCircle, Share2 } from "lucide-react";
import type { Post } from "../../types";

type PostCardProps = {
  post: Post;
  replyCount?: number;
  saved?: boolean;
  timeSuffix?: string;
  variant?: "full" | "compact";
  onOpen?: (post: Post) => void;
  onToggleSave?: (postId: number) => void;
  onShare?: (post: Post) => void;
};

export function PostCard({
  post,
  replyCount,
  saved = false,
  timeSuffix,
  variant = "full",
  onOpen,
  onToggleSave,
  onShare,
}: PostCardProps) {
  if (variant === "compact") {
    return (
      <div className="post" onClick={onOpen ? () => onOpen(post) : undefined}>
        <div className="post-title">{post.title}</div>
        <div className="post-body">{post.body}</div>
      </div>
    );
  }

  const count = replyCount ?? post.replies;

  return (
    <div
      className={`post ${post.pinned ? "pinned" : ""}`}
      style={{ cursor: onOpen ? "pointer" : "default" }}
      onClick={onOpen ? () => onOpen(post) : undefined}
    >
      {post.pinned && <div className="pin-label">📌 Épinglé par la référente</div>}

      <div className="post-head">
        <div className="av" style={{ background: post.avColor }}>{post.av}</div>

        <div className="post-meta">
          <div className="post-author">
            {post.author}{post.role && <span className="role">{post.role}</span>}
          </div>
          <div className="post-time">
            {post.time}{timeSuffix ? ` · ${timeSuffix}` : ""}
          </div>
        </div>

        <div className={`post-type-badge ${post.typeKey}`}>{post.type}</div>
      </div>

      {post.title && <div className="post-title">{post.title}</div>}
      <div className="post-body">{post.body}</div>
      {post.img && <img className="post-img" src={post.img} alt="" />}

      <div className="post-actions">
        <div className="post-action">
          <MessageCircle size={14} strokeWidth={1.8} />
          {count}
        </div>

        <div className="post-actions-right">
          {onToggleSave && (
            <button
              className="post-action"
              onClick={(event) => {
                event.stopPropagation();
                onToggleSave(post.id);
              }}
            >
              <Bookmark
                size={15}
                strokeWidth={1.8}
                fill={saved ? "currentColor" : "none"}
              />
            </button>
          )}

          {onShare && (
            <button
              className="post-action"
              onClick={(event) => {
                event.stopPropagation();
                onShare(post);
              }}
            >
              <Share2 size={15} strokeWidth={1.8} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
