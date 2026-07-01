import { useState } from "react";
import type { Post, PostType } from "../../types";
import { POST_TYPES } from "../../data/mockData";
import { typeClass } from "../../utils/postTypes";

type PostComposerProps = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

export function PostComposer({ posts, setPosts }: PostComposerProps) {
  const [composerOpen, setComposerOpen] = useState(false);
  const [postType, setPostType] = useState<PostType>("Question");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");

  const publishPost = () => {
    if (!newPostTitle.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      av: "ML",
      avColor: "#E2D1BC",
      author: "Moi",
      role: null,
      time: "à l'instant",
      type: postType === "Avancement" ? "Process" : postType,
      typeKey: postType.toLowerCase() as Post["typeKey"],
      title: newPostTitle,
      body: newPostBody,
      replies: 0,
      pinned: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostBody("");
    setComposerOpen(false);
  };

  if (!composerOpen) {
    return (
      <div className="composer-bar" onClick={() => setComposerOpen(true)}>
        <div className="av-small">V</div>
        <span>Publier dans l'atelier...</span>
      </div>
    );
  }

  return (
    <div className="composer-open">
      <div className="type-row">
        {POST_TYPES.map((t) => (
          <button
            key={t}
            className={`type-chip ${typeClass(t)} ${postType === t ? "active" : ""}`}
            onClick={() => setPostType(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <input
        className="comp-input"
        placeholder="Titre de la publication *"
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
      />

      <textarea
        className="comp-textarea"
        placeholder={
          postType === "Question"
            ? "Décrivez votre question ou le problème rencontré..."
            : postType === "Découverte"
              ? "Partagez une technique, un outil ou une inspiration..."
              : postType === "Résultat"
                ? "Présentez votre création terminée..."
                : postType === "Sondage"
                  ? "Présentez rapidement le sujet du sondage..."
                  : "Partagez l'évolution de votre projet..."
        }
        value={newPostBody}
        onChange={(e) => setNewPostBody(e.target.value)}
      />

      <div className="photo-line">
        <button className="photo-btn">+ Photos</button>
        <span>0 / 7</span>
      </div>

      {postType === "Sondage" && (
        <div className="poll-opts">
          <div className="poll-opt">Option 1</div>
          <div className="poll-opt">Option 2</div>
          <div className="poll-add">+ Ajouter un choix</div>
        </div>
      )}

      <div className="comp-actions">
        <button className="cancel-btn" onClick={() => setComposerOpen(false)}>
          Annuler
        </button>
        <button className="publish-btn" onClick={publishPost}>
          Publier
        </button>
      </div>
    </div>
  );
}
