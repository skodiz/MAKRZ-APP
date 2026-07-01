import { useRef, useState } from "react";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import type { Post } from "../../types";

type CommentsByPost = Record<number, { main: string[]; replies: Record<string, string[]> }>;

type CommentThreadProps = {
  post: Post;
  commentsByPost: CommentsByPost;
  setCommentsByPost: React.Dispatch<React.SetStateAction<CommentsByPost>>;
};

export function CommentThread({ post, commentsByPost, setCommentsByPost }: CommentThreadProps) {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [activeReplyBox, setActiveReplyBox] = useState<string | null>(null);
  const replyInputRef = useRef<HTMLInputElement>(null);

  const postComments = commentsByPost[post.id] || {
    main: [],
    replies: { lucie: [], thomas: [] },
  };

  const lucieReplyCount = 1 + (postComments.replies.lucie?.length || 0);
  const thomasReplyCount = 1 + (postComments.replies.thomas?.length || 0);

  const replyPlaceholder =
    activeReplyBox === "lucie"
      ? "Répondre à Lucie..."
      : activeReplyBox === "thomas"
        ? "Répondre à Thomas..."
        : activeReplyBox?.startsWith("main-")
          ? "Répondre à Moi..."
          : "Répondre à la publication...";

  const focusReplyInput = (target: string | null) => {
    setActiveReplyBox(target);
    replyInputRef.current?.focus();
  };

  const sendReply = () => {
    const text = replyText.trim();
    if (!text) return;

    if (activeReplyBox) {
      setCommentsByPost((prev) => ({
        ...prev,
        [post.id]: {
          main: prev[post.id]?.main || [],
          replies: {
            ...(prev[post.id]?.replies || { lucie: [], thomas: [] }),
            [activeReplyBox]: [...(prev[post.id]?.replies?.[activeReplyBox] || []), text],
          },
        },
      }));

      if (activeReplyBox === "lucie") setOpen1(true);
      if (activeReplyBox === "thomas") setOpen2(true);
    } else {
      setCommentsByPost((prev) => ({
        ...prev,
        [post.id]: {
          main: [...(prev[post.id]?.main || []), text],
          replies: prev[post.id]?.replies || { lucie: [], thomas: [] },
        },
      }));
    }

    setReplyText("");
    setActiveReplyBox(null);
  };

  return (
    <>
      {post.replies > 0 && (
        <>
          <div className="comment-card">
            <div className="comment-head">
              <div className="c-av">LM</div>

              <div className="comment-content">
                <div className="comment-meta">
                  <span className="comment-name">Lucie M.</span>
                  <span className="comment-dot">·</span>
                  <span className="comment-time">il y a 1 h</span>
                </div>

                <div className="comment-text">Magnifique résultat !</div>

                <div className="comment-actions">
                  <button className="reply-action" onClick={() => focusReplyInput("lucie")}>Répondre</button>
                  <button className="toggle-btn" onClick={() => setOpen1(!open1)}>
                    {open1 ? (
                      <><span>Masquer</span><ChevronUp size={13} /></>
                    ) : (
                      <><span>Voir {lucieReplyCount} réponse{lucieReplyCount > 1 ? "s" : ""}</span><ChevronDown size={13} /></>
                    )}
                  </button>
                </div>

                {(open1 || postComments.replies.lucie.length > 0) && (
                  <div className="nested">
                    {open1 && (
                      <div className="comment-head">
                        <div className="c-av">TR</div>
                        <div className="comment-content">
                          <div className="comment-meta"><span className="comment-name">Théo R.</span><span className="comment-dot">·</span><span className="comment-time">il y a 45 min</span></div>
                          <div className="comment-text">La texture est superbe.</div>
                        </div>
                      </div>
                    )}

                    {postComments.replies.lucie.map((text, index) => (
                      <div className="comment-head" key={index}>
                        <div className="c-av">ML</div>
                        <div className="comment-content">
                          <div className="comment-meta"><span className="comment-name">Moi</span><span className="comment-dot">·</span><span className="comment-time">à l'instant</span></div>
                          <div className="comment-text">{text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="comment-card">
            <div className="comment-head">
              <div className="c-av">TR</div>

              <div className="comment-content">
                <div className="comment-meta">
                  <span className="comment-name">Thomas R.</span>
                  <span className="comment-dot">·</span>
                  <span className="comment-time">il y a 30 min</span>
                </div>

                <div className="comment-text">Tu as utilisé quel émail ?</div>

                <div className="comment-actions">
                  <button className="reply-action" onClick={() => focusReplyInput("thomas")}>Répondre</button>
                  <button className="toggle-btn" onClick={() => setOpen2(!open2)}>
                    {open2 ? (
                      <><span>Masquer</span><ChevronUp size={13} /></>
                    ) : (
                      <><span>Voir {thomasReplyCount} réponse{thomasReplyCount > 1 ? "s" : ""}</span><ChevronDown size={13} /></>
                    )}
                  </button>
                </div>

                {(open2 || postComments.replies.thomas.length > 0) && (
                  <div className="nested">
                    {open2 && (
                      <div className="comment-head">
                        <div className="c-av">MD</div>
                        <div className="comment-content">
                          <div className="comment-meta"><span className="comment-name">Marie D.</span><span className="comment-dot">·</span><span className="comment-time">il y a 20 min</span></div>
                          <div className="comment-text">Émail blanc mat Solargil.</div>
                        </div>
                      </div>
                    )}

                    {postComments.replies.thomas.map((text, index) => (
                      <div className="comment-head" key={index}>
                        <div className="c-av">ML</div>
                        <div className="comment-content">
                          <div className="comment-meta"><span className="comment-name">Moi</span><span className="comment-dot">·</span><span className="comment-time">à l'instant</span></div>
                          <div className="comment-text">{text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {postComments.main.map((text, index) => (
        <div className="comment-card" key={index}>
          <div className="comment-head">
            <div className="c-av">ML</div>

            <div className="comment-content">
              <div className="comment-meta">
                <span className="comment-name">Moi</span>
                <span className="comment-dot">·</span>
                <span className="comment-time">à l'instant</span>
              </div>

              <div className="comment-text">{text}</div>

              <div className="comment-actions">
                <button className="reply-action" onClick={() => focusReplyInput(`main-${index}`)}>Répondre</button>
              </div>

              {postComments.replies[`main-${index}`]?.length > 0 && (
                <div className="nested">
                  {postComments.replies[`main-${index}`].map((reply, replyIndex) => (
                    <div className="comment-head" key={replyIndex}>
                      <div className="c-av">ML</div>
                      <div className="comment-content">
                        <div className="comment-meta"><span className="comment-name">Moi</span><span className="comment-dot">·</span><span className="comment-time">à l'instant</span></div>
                        <div className="comment-text">{reply}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="post-detail-reply-bar">
        <input
          ref={replyInputRef}
          className="reply-input"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder={replyPlaceholder}
        />

        <button type="button" className="send-btn" onClick={sendReply}>
          <Send size={17} strokeWidth={2} />
        </button>
      </div>
    </>
  );
}
