import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Atelier, Post } from "../types";
import { WorkshopHeader } from "../components/workshops/WorkshopHeader";
import { WorkshopResources } from "../components/workshops/WorkshopResources";
import { WorkshopNotebook } from "../components/workshops/WorkshopNotebook";
import { WorkshopChallenges } from "../components/workshops/WorkshopChallenges";
import { PostCard } from "../components/posts/PostCard";
import { PostComposer } from "../components/posts/PostComposer";
import { sharePost, toggleId } from "../utils/postActions";

export function WorkshopDetailScreen({
  atelier,
  posts,
  setPosts,
  commentsByPost,
  onBack,
  onPost,
  onGalerie,
  onAddRes,
  savedPostIds,
  setSavedPostIds,
  joinedAtelierIds,
setJoinedAtelierIds,
}: {
  
  atelier: Atelier;
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
  commentsByPost: Record<number, { main: string[]; replies: Record<string, string[]> }>;
  onBack: () => void;
  onPost: (p: Post) => void;
  onGalerie: () => void;
  onAddRes: () => void;
  savedPostIds: number[];
setSavedPostIds: Dispatch<SetStateAction<number[]>>;
  joinedAtelierIds: number[];
setJoinedAtelierIds: Dispatch<SetStateAction<number[]>>;
}) {
  
  const [innerTab, setInnerTab] = useState<"fil" | "res" | "carnet" | "mem">("fil");
  const [aboutOpen, setAboutOpen] = useState(false);

  const galleryIds = [
    "photo-1565193566173-7a0ee3dbe261", // céramique
    "photo-1558618666-fcd25c85cd64",    // broderie
    "photo-1452860606245-08befc0ff44b", // atelier bois
    "photo-1473621038790-b778b4750efe", // poterie mains
    "photo-1604594849809-dfedbc827105", // fil textile
    "photo-1530026405186-ed1f139313f8", // papier
  ];
  return (
    <div className="screen">
      <WorkshopHeader
        atelier={atelier}
        innerTab={innerTab}
        setInnerTab={setInnerTab}
        aboutOpen={aboutOpen}
        setAboutOpen={setAboutOpen}
        isJoined={joinedAtelierIds.includes(atelier.id)}
        onToggleJoin={() => {
          setJoinedAtelierIds((ids) =>
            ids.includes(atelier.id)
              ? ids.filter((id) => id !== atelier.id)
              : [...ids, atelier.id]
          );
        }}
        onBack={onBack}
      />

      {/* FIL */}
      {innerTab === "fil" && (
        <div className="content">
          <WorkshopChallenges />
          <PostComposer posts={posts} setPosts={setPosts} />
         {posts.map((p) => {
  const extraReplies =
    (commentsByPost[p.id]?.main?.length || 0) +
    Object.values(commentsByPost[p.id]?.replies || {}).reduce(
      (total, replies) => total + replies.length,
      0
    );

  const replyCount = p.replies + extraReplies;

  return (
    <PostCard
      key={p.id}
      post={p}
      replyCount={replyCount}
      saved={savedPostIds.includes(p.id)}
      onOpen={onPost}
      onToggleSave={(postId) => setSavedPostIds((ids) => toggleId(ids, postId))}
      onShare={sharePost}
    />
  );
})}
        </div>
      )}

      {/* RESSOURCES */}
      {innerTab === "res" && (
        <WorkshopResources
          galleryIds={galleryIds}
          onGalerie={onGalerie}
          onAddRes={onAddRes}
        />
      )}

      {/* CARNET */}
      {innerTab === "carnet" && <WorkshopNotebook />}

      {/* MEMBRES */}
      {innerTab === "mem" && (
        <div className="content">
          <div className="sect">Référente</div>
          <div className="member-card">
            <div className="mem-av green">LM</div>
            <div style={{ flex: 1 }}>
              <div className="mem-name">Lucie M.</div>
              <div className="mem-sub">Céramiste · Paris</div>
            </div>
            <div className="role-badge ref">Référente</div>
          </div>
          <div className="sect" style={{ marginTop: "var(--space-11)" }}>Membres actifs</div>
          {[
            { av: "MD", name: "Marie D.", sub: "Céramiste · Lille" },
            { av: "TR", name: "Théo R.", sub: "Potier · Lyon" },
            { av: "NB", name: "Nora B.", sub: "Céramiste · Bordeaux" },
            { av: "VL", name: "Victor L.", sub: "Sculpteur · Paris" },
          ].map((m) => (
            <div className="member-card" key={m.av}>
              <div className="mem-av">{m.av}</div>
              <div style={{ flex: 1 }}>
                <div className="mem-name">{m.name}</div>
                <div className="mem-sub">{m.sub}</div>
              </div>
              <div className="role-badge">Membre</div>
            </div>
          ))}
          <div className="more-members">Voir tous les {atelier.members} membres</div>
        </div>
      )}
    </div>
  );
}

// ─── SCREEN: POST DETAIL ──────────────────────────────────────────────────────

