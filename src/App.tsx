import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  MoreHorizontal,
  Send,
  Share2,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Link as LinkIcon,
  ExternalLink,
  Check,
  X,
  Bookmark,
} from "lucide-react";
import "./styles/global.css";
import type { Atelier, Post, PostType, ScreenKey } from "./types";
import { ATELIERS, DISCOVER, POSTS, POST_TYPES } from "./data/mockData";
import { typeClass } from "./utils/postTypes";
import { AppHeader } from "./components/common/AppHeader";
import { NavBar } from "./components/common/NavBar";
import { SearchBar } from "./components/common/SearchBar";
import { EmptyState } from "./components/common/EmptyState";
import { TagPill } from "./components/common/TagPill";
import { WorkshopCard } from "./components/workshops/WorkshopCard";

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

// ─── HEADER ────────────────────────────────────────────────────
// ─── SCREEN: ATELIERS LIST ────────────────────────────────────────────────────

function AteliersList({ 
  onOpen, 
  onProfile, 
  joinedAtelierIds,
setJoinedAtelierIds,
}:{ 
  onOpen: (a: Atelier) => void;
  onProfile: () => void;
  joinedAtelierIds: number[];
setJoinedAtelierIds: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const [tab, setTab] = useState<"mes" | "discover">("mes");
const [, setFilter] = useState("Tous");
const [showFilters, setShowFilters] = useState(false);
const [search, setSearch] = useState("");
const [activeFilterTab, setActiveFilterTab] = useState<"all" | "filters">("all");
const [activeFilters, setActiveFilters] = useState<string[]>([]);
const joinedDiscover = DISCOVER.filter((a) => joinedAtelierIds.includes(a.id));

const visibleAteliers = joinedDiscover
  .map((a) => ({
    ...a,
    last: a.last || "Nouvelle activité dans l'atelier",
    time: a.time || "à l'instant",
    unread: 0,
  }))
  .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));
const visibleDiscover = DISCOVER.filter((a) =>
  !joinedAtelierIds.includes(a.id) &&
  (a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.tags.join(" ").toLowerCase().includes(search.toLowerCase())) &&
  (activeFilters.length === 0 || activeFilters.some((f) => a.tags.includes(f)))
);  
  return (
    <div className="screen">
           <AppHeader onProfile={onProfile} />
      <div className="tabs">
        <button className={`tab ${tab === "mes" ? "active" : ""}`} onClick={() => setTab("mes")}>Mes ateliers</button>
        <button className={`tab ${tab === "discover" ? "active" : ""}`} onClick={() => setTab("discover")}>Découvrir</button>
      </div>
      <div className="content">
        <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un atelier..." />
       {tab === "mes" ? (
  <>
    {visibleAteliers.length === 0 ? (
      <EmptyState
        icon="🏺"
        title="Aucun atelier pour l'instant"
        text="Rejoins un atelier pour commencer à échanger avec d'autres makers."
        actionLabel="Découvrir des ateliers"
        onAction={() => setTab("discover")}
      />
    ) : (
      <>
        <div className="sect">Actifs récemment</div>
        {visibleAteliers.map((a) => (
          <WorkshopCard
            key={a.id}
            atelier={a}
            onOpen={onOpen}
            variant="mine"
          />
        ))}
      </>
    )}
  </>
) : (
          <>
            <div className="filters">
              <button className={`filter ${activeFilterTab === "all" ? "active" : ""}`} onClick={() => { setActiveFilterTab("all"); setShowFilters(false); setFilter("Tous"); }}>Tous</button>
              <button className={`filter ${activeFilterTab === "filters" ? "active" : ""}`} onClick={() => { setActiveFilterTab("filters"); setShowFilters(true); }}>Filtres</button></div>
           {showFilters && <div className="filter-panel"><div className="filter-row"><span>Matière</span><button className={`filter-choice ${activeFilters.includes("Bois") ? "active" : ""}`} onClick={() => setActiveFilters((fs) => fs.includes("Bois") ? fs.filter((f) => f !== "Bois") : [...fs, "Bois"])}>Bois</button><button className={`filter-choice ${activeFilters.includes("Céramique") ? "active" : ""}`} onClick={() => setActiveFilters((fs) => fs.includes("Céramique") ? fs.filter((f) => f !== "Céramique") : [...fs, "Céramique"])}>Céramique</button><button className={`filter-choice ${activeFilters.includes("Textile") ? "active" : ""}`} onClick={() => setActiveFilters((fs) => fs.includes("Textile") ? fs.filter((f) => f !== "Textile") : [...fs, "Textile"])}>Textile</button></div><div className="filter-row"><span>Technique</span><button className={`filter-choice ${activeFilters.includes("Tour") ? "active" : ""}`} onClick={() => setActiveFilters((fs) => fs.includes("Tour") ? fs.filter((f) => f !== "Tour") : [...fs, "Tour"])}>Tour</button><button className={`filter-choice ${activeFilters.includes("Sérigraphie") ? "active" : ""}`} onClick={() => setActiveFilters((fs) => fs.includes("Sérigraphie") ? fs.filter((f) => f !== "Sérigraphie") : [...fs, "Sérigraphie"])}>Sérigraphie</button><button className={`filter-choice ${activeFilters.includes("Broderie") ? "active" : ""}`} onClick={() => setActiveFilters((fs) => fs.includes("Broderie") ? fs.filter((f) => f !== "Broderie") : [...fs, "Broderie"])}>Broderie</button></div><div className="filter-row"><span>Niveau</span><button className={`filter-choice ${activeFilters.includes("Débutant") ? "active" : ""}`} onClick={() => setActiveFilters((fs) => fs.includes("Débutant") ? fs.filter((f) => f !== "Débutant") : [...fs, "Débutant"])}>Débutant</button><button className={`filter-choice ${activeFilters.includes("Confirmé") ? "active" : ""}`} onClick={() => setActiveFilters((fs) => fs.includes("Confirmé") ? fs.filter((f) => f !== "Confirmé") : [...fs, "Confirmé"])}>Confirmé</button></div></div>}
           {visibleDiscover.map((a) => (
              <WorkshopCard
                key={a.id}
                atelier={a}
                onOpen={onOpen}
                variant="discover"
                isJoined={joinedAtelierIds.includes(a.id)}
                onToggleJoin={(atelierId) => {
                  setJoinedAtelierIds((ids) =>
                    ids.includes(atelierId)
                      ? ids.filter((id) => id !== atelierId)
                      : [...ids, atelierId]
                  );
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

// ─── SCREEN: ATELIER DETAIL ───────────────────────────────────────────────────

function AtelierDetail({
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
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  commentsByPost: Record<number, { main: string[]; replies: Record<string, string[]> }>;
  onBack: () => void;
  onPost: (p: Post) => void;
  onGalerie: () => void;
  onAddRes: () => void;
  savedPostIds: number[];
setSavedPostIds: React.Dispatch<React.SetStateAction<number[]>>;
  joinedAtelierIds: number[];
setJoinedAtelierIds: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  
  const [innerTab, setInnerTab] = useState<"fil" | "res" | "mem">("fil");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [postType, setPostType] = useState<PostType>("Question");
  const [newPostTitle, setNewPostTitle] = useState("");
const [newPostBody, setNewPostBody] = useState("");

  const galleryIds = [
    "photo-1565193566173-7a0ee3dbe261", // céramique
    "photo-1558618666-fcd25c85cd64",    // broderie
    "photo-1452860606245-08befc0ff44b", // atelier bois
    "photo-1473621038790-b778b4750efe", // poterie mains
    "photo-1604594849809-dfedbc827105", // fil textile
    "photo-1530026405186-ed1f139313f8", // papier
  ];
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
           <div className="topbar">
             <div className="topbar-left">
          <button className="icon-btn" onClick={onBack}><ArrowLeft size={22} strokeWidth={1.8} /></button>
        </div>
        <button className="icon-btn"><MoreHorizontal size={22} strokeWidth={1.8} /></button>
      </div>

      <div className="ws-header">
        <div className="ws-main">
          <div className="ws-icon">{atelier.emoji}</div>
          <div>
            <div className="ws-info">
            <div className="ws-name">{atelier.name}</div>
            <div className="members">{atelier.members} membres</div>
             <div className="tags" style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>{atelier.tags.map((t) => <TagPill key={t} label={t} />)}</div>
              </div>
          </div>
    <button
  className={`join-btn atelier-join-btn ${
    joinedAtelierIds.includes(atelier.id) ? "joined" : ""
  }`}
  onClick={() => {
    setJoinedAtelierIds((ids) =>
      ids.includes(atelier.id)
        ? ids.filter((id) => id !== atelier.id)
        : [...ids, atelier.id]
    );
  }}
>
  {joinedAtelierIds.includes(atelier.id) ? "✓ Membre" : "Rejoindre"}
</button>
        </div>
              </div>

      {aboutOpen ? (
        <div className="about-open">
          <div className="about-title-row" onClick={() => setAboutOpen(false)}>
            <span>À propos de l'atelier</span><span>⌃</span>
          </div>
          <p className="about-text">{atelier.about}</p>
        </div>
      ) : (
        <div className="about" onClick={() => setAboutOpen(true)}>
          <span>À propos de l'atelier</span><span>⌄</span>
        </div>
      )}

      <div className="inner-tabs">
        <button className={`inner-tab ${innerTab === "fil" ? "active" : ""}`} onClick={() => setInnerTab("fil")}>Fil</button>
        <button className={`inner-tab ${innerTab === "res" ? "active" : ""}`} onClick={() => setInnerTab("res")}>Ressources</button>
        <button className={`inner-tab ${innerTab === "mem" ? "active" : ""}`} onClick={() => setInnerTab("mem")}>Membres</button>
      </div>

      {/* FIL */}
      {innerTab === "fil" && (
        <div className="content">
          {!composerOpen ? (
            <div className="composer-bar" onClick={() => setComposerOpen(true)}>
              <div className="av-small">V</div>
              <span>Publier dans l'atelier...</span>
            </div>
          ) : (
            <div className="composer-open">
              <div className="type-row">
                {POST_TYPES.map((t) => (
                  <button
                    key={t}
                    className={`type-chip ${typeClass(t)} ${postType === t ? "active" : ""}`}
                    onClick={() => setPostType(t)}
                  >{t}</button>
                ))}
              </div>
<input
  className="comp-input"
  placeholder="Titre de la publication *"
  value={newPostTitle}
  onChange={(e) => setNewPostTitle(e.target.value)}
/>              <textarea className="comp-textarea" placeholder={
                postType === "Question" ? "Décrivez votre question ou le problème rencontré..."
                  : postType === "Découverte" ? "Partagez une technique, un outil ou une inspiration..."
                  : postType === "Résultat" ? "Présentez votre création terminée..."
                  : postType === "Sondage" ? "Présentez rapidement le sujet du sondage..."
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
                <button className="cancel-btn" onClick={() => setComposerOpen(false)}>Annuler</button>
               <button
  className="publish-btn"
  onClick={() => {
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
  }}
>
  Publier
</button>
              </div>
            </div>
          )}
         {posts.map((p) => {
  const extraReplies =
    (commentsByPost[p.id]?.main?.length || 0) +
    Object.values(commentsByPost[p.id]?.replies || {}).reduce(
      (total, replies) => total + replies.length,
      0
    );

  const replyCount = p.replies + extraReplies;

  return (
    <div className={`post ${p.pinned ? "pinned" : ""}`} key={p.id} onClick={() => onPost(p)}>
              {p.pinned && <div className="pin-label">📌 Épinglé par la référente</div>}
              <div className="post-head">
  <div className="av" style={{ background: p.avColor }}>{p.av}</div>

  <div className="post-meta">
    <div className="post-author">{p.author}{p.role && <span className="role">{p.role}</span>}</div>
    <div className="post-time">{p.time}</div>
  </div>

  <div className={`post-type-badge ${p.typeKey}`}>{p.type}</div>
</div>
              {p.title && <div className="post-title">{p.title}</div>}
              <div className="post-body">{p.body}</div>
              {p.img && <img className="post-img" src={p.img} alt="" />}
              <div className="post-actions">
                <div className="post-action"><MessageCircle size={14} strokeWidth={1.8} />{replyCount}</div>
<div className="post-actions-right">
  <button
    className="post-action"
    onClick={(e) => {
      e.stopPropagation();
      setSavedPostIds((ids) =>
        ids.includes(p.id)
          ? ids.filter((id) => id !== p.id)
          : [...ids, p.id]
      );
    }}
  >
    <Bookmark
      size={15}
      strokeWidth={1.8}
      fill={savedPostIds.includes(p.id) ? "currentColor" : "none"}
    />
  </button>

  <button
  className="post-action"
  onClick={(e) => {
    e.stopPropagation();
    handleShare(p);
  }}
>
  <Share2 size={15} strokeWidth={1.8} />
</button>
</div>              </div>
            </div>
          );
})}
        </div>
      )}

      {/* RESSOURCES */}
      {innerTab === "res" && (
        <div className="content-white">
          <div className="section-row">
            <div style={{ fontSize: 15, fontWeight: 700, color: "#2C2623" }}>Galerie de l'atelier</div>
            <button className="section-link" onClick={onGalerie}>Voir tout</button>
          </div>
          <div className="gallery-grid">
            {galleryIds.map((id, i) => (
              <img key={i} className="gal-img" onClick={onGalerie}
                src={`https://images.unsplash.com/${id}?q=80&w=400&auto=format&fit=crop`} alt="" />
            ))}
          </div>
          <div className="section-row">
            <div style={{ fontSize: 15, fontWeight: 700, color: "#2C2623" }}>Documents et liens</div>
            <button className="section-link" onClick={onAddRes}>+ Ajouter</button>
          </div>
          {[
            { icon: <FileText size={17} strokeWidth={1.8} />, title: "Introduction au raku", meta: "Marie D. · 12 jan." },
            { icon: <LinkIcon size={17} strokeWidth={1.8} />, title: "Fournisseur d'émaux — Solargil", meta: "Thomas R. · 8 jan." },
            { icon: <FileText size={17} strokeWidth={1.8} />, title: "Guide des températures raku", meta: "Lucie M. · 3 jan." },
          ].map((r, i) => (
            <div className="res-item" key={i}>
              <div className="res-icon">{r.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="res-title">{r.title}</div>
                <div className="res-meta">{r.meta}</div>
              </div>
              <div style={{ color: "#B6ADA4" }}><ExternalLink size={15} strokeWidth={1.8} /></div>
            </div>
          ))}
        </div>
      )}

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
          <div className="sect" style={{ marginTop: 16 }}>Membres actifs</div>
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

function PostDetail({
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
  setCommentsByPost: React.Dispatch<React.SetStateAction<Record<number, { main: string[]; replies: Record<string, string[]> }>>>;
  savedPostIds: number[];
setSavedPostIds: React.Dispatch<React.SetStateAction<number[]>>;
}) 
{  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [replyText, setReplyText] = useState("");
const saved = savedPostIds.includes(post.id);
    const [activeReplyBox, setActiveReplyBox] = useState<string | null>(null);
  const [newMainComments, setNewMainComments] = useState<string[]>([]);
  const [newReplies, setNewReplies] = useState<Record<string, string[]>>({ lucie: [], thomas: [] });
  const replyInputRef = useRef<HTMLInputElement>(null);
const postComments = commentsByPost[post.id] || {
  main: [],
  replies: { lucie: [], thomas: [] }
};
    
 const lucieReplyCount = 1 + (postComments.replies.lucie?.length || 0);
const thomasReplyCount = 1 + (postComments.replies.thomas?.length || 0);
const allDynamicRepliesCount = Object.values(postComments.replies || {}).reduce(
  (total, replies) => total + replies.length,
  0
);

const totalReplyCount =
  post.replies +
  postComments.main.length +
  allDynamicRepliesCount;
    const replyPlaceholder = activeReplyBox === "lucie" ? "Répondre à Lucie..." : activeReplyBox === "thomas" ? "Répondre à Thomas..." : activeReplyBox?.startsWith("main-") ? "Répondre à Moi..." : "Répondre à la publication...";
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
        [activeReplyBox]: [
          ...((prev[post.id]?.replies?.[activeReplyBox] || [])),
          text
        ]
      }
    }
  }));

  if (activeReplyBox === "lucie") setOpen1(true);
  if (activeReplyBox === "thomas") setOpen2(true);

} else {

  setCommentsByPost((prev) => ({
    ...prev,
    [post.id]: {
      main: [...(prev[post.id]?.main || []), text],
      replies: prev[post.id]?.replies || { lucie: [], thomas: [] }
    }
  }));

}

    setReplyText("");
    setActiveReplyBox(null);
  };
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
      <div className="topbar" style={{ borderBottom: "1px solid #E6DDD2" }}>
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
      setActiveReplyBox(null);
      replyInputRef.current?.focus();
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

     
{post.replies > 0 && (<>
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
                <button className="reply-action" onClick={() => { setActiveReplyBox("lucie"); replyInputRef.current?.focus(); }}>Répondre</button>
                <button className="toggle-btn" onClick={() => setOpen1(!open1)}>
                  {open1 ? <><span>Masquer</span><ChevronUp size={13} /></> : <><span>Voir {lucieReplyCount} réponse{lucieReplyCount > 1 ? "s" : ""}</span><ChevronDown size={13} /></>}
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
                <button className="reply-action" onClick={() => { setActiveReplyBox("thomas"); replyInputRef.current?.focus(); }}>Répondre</button>
                <button className="toggle-btn" onClick={() => setOpen2(!open2)}>
                  {open2 ? <><span>Masquer</span><ChevronUp size={13} /></> : <><span>Voir {thomasReplyCount} réponse{thomasReplyCount > 1 ? "s" : ""}</span><ChevronDown size={13} /></>}
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
                  <button className="reply-action" onClick={() => { setActiveReplyBox(`main-${index}`); replyInputRef.current?.focus(); }}>Répondre</button>
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
  <input ref={replyInputRef} 
            className="reply-input" value={replyText} onChange={(e) => setReplyText(e.target.value)} 
            placeholder={replyPlaceholder}
            />

          <button type="button" className="send-btn" onClick={sendReply}>
            <Send size={17} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
// ─── SCREEN: SAVED ──────────────────────────────────────────────────────────
function SavedPostsScreen({
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
            <div className="post" key={p.id} onClick={() => onPost(p)}>
              <div className="post-title">{p.title}</div>
              <div className="post-body">{p.body}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
// ─── SCREEN: GALERIE ──────────────────────────────────────────────────────────

function GalerieAtelier({ atelier, onBack }: { atelier: Atelier | null; onBack: () => void }) {
  const [filter, setFilter] = useState("Toutes");
  const [openPhoto, setOpenPhoto] = useState(false);
  const [openReplies, setOpenReplies] = useState(false);

  const photos = [
    { src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=700&auto=format&fit=crop", h: 230 }, // céramique
    { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=700&auto=format&fit=crop", h: 170 }, // broderie
    { src: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=700&auto=format&fit=crop", h: 170 }, // atelier bois
    { src: "https://images.unsplash.com/photo-1473621038790-b778b4750efe?q=80&w=700&auto=format&fit=crop", h: 230 }, // poterie mains
    { src: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?q=80&w=700&auto=format&fit=crop", h: 130 }, // fil textile
    { src: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=700&auto=format&fit=crop", h: 130 }, // papier reliure
  ];

  return (
    <div className="screen" style={{ position: "relative" }}>
            <div className="topbar" style={{ borderBottom: "1px solid #E6DDD2" }}>
        <div className="topbar-left">
          <button className="icon-btn" onClick={onBack}><ArrowLeft size={22} strokeWidth={1.8} /></button>
          <span className="topbar-title">Galerie · {atelier?.name ?? "MAKRZ"}</span>
        </div>
      </div>
      <div className="content">
        <div className="filters" style={{ marginBottom: 10 }}>
          {["Toutes", "Résultats", "Avancement", "Techniques"].map((f) => (
            <button key={f} className={`filter ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="masonry">
          {photos.map((p, i) => (
            <img key={i} className="m-photo" style={{ height: p.h }} src={p.src} alt="" onClick={() => setOpenPhoto(true)} />
          ))}
        </div>
      </div>

      {openPhoto && (
        <div className="overlay">
          <div className="detail-sheet">
            <div className="close-row">
              <button className="close-btn" onClick={() => setOpenPhoto(false)}><X size={16} strokeWidth={2} /></button>
            </div>
            <img className="detail-img"
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=900&auto=format&fit=crop" alt="" />
            <div className="detail-title">Sortie de four ce matin</div>
            <div className="detail-meta">Marie D. · Céramique raku · il y a 2 h</div>
            <div className="detail-text">Voici ma dernière pièce sortie du four ce matin. La couleur de l'émail a très bien pris — je suis contente du résultat !</div>
            <div className="detail-actions">
              <div className="reply-count"><MessageCircle size={15} strokeWidth={1.8} /> 4</div>
              <button className="share-btn-sm"><Share2 size={14} strokeWidth={1.8} /> Partager</button>
            </div>
            <div className="comment-head" style={{ marginTop: 8 }}>
              <div className="c-av">LM</div>
              <div><div className="comment-name">Lucie M.</div><div className="comment-time">il y a 1 h</div></div>
            </div>
            <div className="comment-text">Magnifique résultat !</div>
            <div className="comment-actions">
              <span>Répondre</span>
              <button className="toggle-btn" onClick={() => setOpenReplies(!openReplies)}>
                {openReplies ? <><span>Masquer</span><ChevronUp size={13} /></> : <><span>Voir 1 réponse</span><ChevronDown size={13} /></>}
              </button>
            </div>
            {openReplies && (
              <div className="nested">
                <div className="comment-head"><div className="c-av">TR</div><div><div className="comment-name">Théo R.</div><div className="comment-time">il y a 45 min</div></div></div>
                <div className="comment-text">La texture est superbe.</div>
                <div className="comment-actions"><span>Répondre</span></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SCREEN: ADD RESOURCE ─────────────────────────────────────────────────────

function AddResource({ atelier, onBack }: { atelier: Atelier | null; onBack: () => void }) {
  return (
    <div className="screen">
       <div className="topbar" style={{ borderBottom: "1px solid #E6DDD2" }}>
        <div className="topbar-left">
          <button className="icon-btn" onClick={onBack}><ArrowLeft size={22} strokeWidth={1.8} /></button>
          <span className="topbar-title">Nouvelle ressource</span>
        </div>
      </div>
      <div className="add-res-content">
        <div className="form-card">
          <div className="form-intro">
            Ajoutez un document, un lien ou une référence utile à l'atelier {atelier?.name ?? "Céramique raku"}.
          </div>
          <div className="field">
            <label className="label">Type de ressource</label>
            <div className="select-look">
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <LinkIcon size={16} strokeWidth={1.8} color="#C6784F" /> Lien
              </span>
              <ChevronDown size={17} strokeWidth={1.8} />
            </div>
          </div>
          <div className="field">
            <label className="label">Titre</label>
            <input className="f-input" placeholder="Ex. Fournisseur d'émaux — Solargil" />
          </div>
          <div className="field">
            <label className="label">Description</label>
            <textarea className="f-textarea" placeholder="Pourquoi cette ressource est utile pour l'atelier ?" />
          </div>
          <div className="field">
            <label className="label">Lien ou fichier</label>
            <input className="f-input" placeholder="Coller un lien ou ajouter un fichier" />
            <div className="helper">PDF, article, vidéo, fournisseur, événement ou fiche technique.</div>
          </div>
          <div className="announce">
            <div className="checkbox"><Check size={13} strokeWidth={2.5} /></div>
            <div>
              <div className="announce-title">Annoncer dans le fil de l'atelier</div>
              <div className="announce-sub">Une publication sera créée automatiquement pour prévenir les membres.</div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-actions">
        <button className="cancel-lnk" onClick={onBack}>Annuler</button>
        <button className="submit-btn" onClick={onBack}>Ajouter</button>
      </div>
    </div>
  );
}

// ─── SCREEN: FEED GLOBAL ──────────────────────────────────────────────────────

  function FeedScreen({
  posts,
  savedPostIds,
  setSavedPostIds,
  onProfile,
}: {
  posts: Post[];
  savedPostIds: number[];
  setSavedPostIds: React.Dispatch<React.SetStateAction<number[]>>;
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
          <div className="post" key={p.id} style={{ cursor: "default" }}>
            <div className="post-head">
              <div className="av" style={{ background: p.avColor }}>{p.av}</div>
              <div>
                <div className="post-author">{p.author}{p.role && <span className="role">{p.role}</span>}</div>
                <div className="post-time">{p.time} · Céramique raku</div>
              </div>
              <div className={`post-type-badge ${p.typeKey}`}>{p.type}</div>
            </div>
            {p.title && <div className="post-title">{p.title}</div>}
            <div className="post-body">{p.body}</div>
            {p.img && <img className="post-img" src={p.img} alt="" />}
            <div className="post-actions">
              <div className="post-action"><MessageCircle size={14} strokeWidth={1.8} />{p.replies}</div>
<div className="post-actions-right">
 <button
  className="post-action"
  onClick={(e) => {
    e.stopPropagation();
    setSavedPostIds((ids) =>
      ids.includes(p.id)
        ? ids.filter((id) => id !== p.id)
        : [...ids, p.id]
    );
  }}
>
  <Bookmark
    size={15}
    strokeWidth={1.8}
    fill={savedPostIds.includes(p.id) ? "currentColor" : "none"}
  />
</button>

  <button
  className="post-action"
  onClick={(e) => {
    e.stopPropagation();
    handleShare(p);
  }}
>
  <Share2 size={15} strokeWidth={1.8} />
</button>
</div>            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [navTab, setNavTab] = useState("ateliers");
  const [screen, setScreen] = useState<ScreenKey>(null);
  const [selectedAtelier, setSelectedAtelier] = useState<Atelier | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [atelierPosts, setAtelierPosts] = useState<Post[]>(POSTS);
  const [savedPostIds, setSavedPostIds] = useState<number[]>([]);
  const [commentsByPost, setCommentsByPost] = useState<
  Record<number, { main: string[]; replies: Record<string, string[]> }>
>({});

  useEffect(() => {
  const setAppHeight = () => {
    document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  setAppHeight();
  window.addEventListener("resize", setAppHeight);
  window.addEventListener("orientationchange", setAppHeight);

  return () => {
    window.removeEventListener("resize", setAppHeight);
    window.removeEventListener("orientationchange", setAppHeight);
  };
}, []);
  
  const handleNavTab = (t: string) => {
    setScreen(null);
    setNavTab(t);
  };

  const showNav = screen === null || screen === "atelier";
const [joinedAtelierIds, setJoinedAtelierIds] = useState<number[]>([]);
  const renderScreen = () => {
    if (screen === "atelier" && selectedAtelier) {
      return (
        <AtelierDetail
  atelier={selectedAtelier}
          joinedAtelierIds={joinedAtelierIds}
setJoinedAtelierIds={setJoinedAtelierIds}
  posts={atelierPosts}
  setPosts={setAtelierPosts}
  commentsByPost={commentsByPost}
  onBack={() => setScreen(null)}
  onPost={(p) => {
    setSelectedPost(p);
    setScreen("post");
  }}
  onGalerie={() => setScreen("galerie")}
  onAddRes={() => setScreen("address")}
  savedPostIds={savedPostIds}
  setSavedPostIds={setSavedPostIds}
/>
      );
    }
   if (screen === "post" && selectedPost) {
  return (
    <PostDetail
      post={selectedPost}
      onBack={() => setScreen("atelier")}
      commentsByPost={commentsByPost}
      setCommentsByPost={setCommentsByPost}
      savedPostIds={savedPostIds}
setSavedPostIds={setSavedPostIds}
    />
  );
}
    if (screen === "saved") {
  return (
    <SavedPostsScreen
      posts={atelierPosts}
      savedPostIds={savedPostIds}
      onBack={() => setScreen(null)}
      onPost={(p) => {
        setSelectedPost(p);
        setScreen("post");
      }}
    />
  );
}
    if (screen === "galerie") {
      return <GalerieAtelier atelier={selectedAtelier} onBack={() => setScreen("atelier")} />;
    }
    if (screen === "addres") {
      return <AddResource atelier={selectedAtelier} onBack={() => setScreen("atelier")} />;
    }
if (navTab === "feed")
  return (
   <FeedScreen
  posts={atelierPosts}
  savedPostIds={savedPostIds}
  setSavedPostIds={setSavedPostIds}
  onProfile={() => setScreen("saved")}
/>
  );    if (navTab === "galerie") return <GalerieAtelier atelier={null} onBack={() => handleNavTab("ateliers")} />;
    return (
     <AteliersList
  onOpen={(a) => {
    setSelectedAtelier(a);
    setScreen("atelier");
  }}
  onProfile={() => setScreen("saved")}
  joinedAtelierIds={joinedAtelierIds}
  setJoinedAtelierIds={setJoinedAtelierIds}
/>
    );
  };

  return (
    <>
      <div className="phone">
        {renderScreen()}
        {showNav && <NavBar tab={navTab} setTab={handleNavTab} />}
      </div>
    </>
  );
}
