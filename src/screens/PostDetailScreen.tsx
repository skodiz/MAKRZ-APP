import type { Dispatch, SetStateAction } from "react";
import { ArrowLeft, Bookmark, MessageCircle, Share2 } from "lucide-react";
import type { Post } from "../types";
import { CommentThread } from "../components/comments/CommentThread";

export function PostDetailScreen({
  post,
  onBack,
  commentsByPost,
  setCommentsByPost,
  savedPostIds,
setSavedPostIds,
}: {
  post: Post;
  onBack: () => void;
  commentsByPost: Record<number, { main: string[]; replies: Record<string, string[]> }>;
  setCommentsByPost: Dispatch<SetStateAction<Record<number, { main: string[]; replies: Record<string, string[]> }>>>;
  savedPostIds: number[];
setSavedPostIds: Dispatch<SetStateAction<number[]>>;
}) 
{
const saved = savedPostIds.includes(post.id);
const postComments = commentsByPost[post.id] || {
  main: [],
  replies: { lucie: [], thomas: [] }
};
const allDynamicRepliesCount = Object.values(postComments.replies || {}).reduce(
  (total, replies) => total + replies.length,
  0
);
const totalReplyCount = post.replies + postComments.main.length + allDynamicRepliesCount;
const handleShare = async () => {
  const shareText = `${post.title}\n\n${post.body}`;

  if (navigator.share) {
    await navigator.share({
      title: post.title,
      text: shareText,
      url: window.location.href,
    });
  } else {
    await navigator.clipboard.writeText(shareText);
    alert("Lien copié");
  }
};
  return (
  <div className="screen post-detail-screen">
      <div className="topbar" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="topbar-left">
          <button className="icon-btn" onClick={onBack}>
            <ArrowLeft size={22} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <div className="content post-detail-content">
        <div className="post" style={{ cursor: "default" }}>
          <div className="post-head">
            <div className="av" style={{ background: post.avColor }}>{post.av}</div>

            <div className="post-meta">
              <div className="post-author">{post.author}{post.role && <span className="role">{post.role}</span>}</div>
              <div className="post-time">{post.time}</div>
            </div>

            <div className={`post-type-badge ${post.typeKey}`}>{post.type}</div>
          </div>

          {post.title && <div className="post-title">{post.title}</div>}
          <div className="post-body">{post.body}</div>
          {post.img && <img className="post-img" style={{ height: 200 }} src={post.img} alt="" />}

          <div className="post-actions">
          <div className="post-actions-left">
  <button
    className="reply-action"
    onClick={() => {
      document.querySelector<HTMLInputElement>(".post-detail-reply-bar input")?.focus();
    }}
  >
    Répondre
  </button>

  <div className="reply-total">
    <MessageCircle size={15} strokeWidth={1.8} />
    <span>{totalReplyCount}</span>
  </div>
</div>

            <div className="post-actions-right">
              <button className="post-action save-action" onClick={() => {
  setSavedPostIds((ids) =>
    ids.includes(post.id)
      ? ids.filter((id) => id !== post.id)
      : [...ids, post.id]
  );
}}
                >
                <Bookmark size={14} strokeWidth={1.8} fill={saved ? "currentColor" : "none"} />
              </button>

              <button className="post-action" onClick={handleShare}>
  <Share2 size={14} strokeWidth={1.8} />
</button>
            </div>
          </div>
        </div>

     
<CommentThread
          post={post}
          commentsByPost={commentsByPost}
          setCommentsByPost={setCommentsByPost}
        />
      </div>
    </div>
  );
}
// ─── SCREEN: SAVED ──────────────────────────────────────────────────────────
