import { useState, useEffect } from "react";
import "./styles/global.css";
import type { Atelier, Post, ScreenKey } from "./types";
import { POSTS } from "./data/mockData";
import { NavBar } from "./components/common/NavBar";
import { WorkshopsScreen } from "./screens/WorkshopsScreen";
import { WorkshopDetailScreen } from "./screens/WorkshopDetailScreen";
import { PostDetailScreen } from "./screens/PostDetailScreen";
import { SavedPostsScreen } from "./screens/SavedPostsScreen";
import { GalleryScreen } from "./screens/GalleryScreen";
import { AddResourceScreen } from "./screens/AddResourceScreen";
import { FeedScreen } from "./screens/FeedScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { SearchScreen } from "./screens/SearchScreen";
import { MessagesScreen } from "./screens/MessagesScreen";
import { NotificationsScreen } from "./screens/NotificationsScreen";

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
        <WorkshopDetailScreen
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
  onAddRes={() => setScreen("addres")}
  savedPostIds={savedPostIds}
  setSavedPostIds={setSavedPostIds}
/>
      );
    }
   if (screen === "post" && selectedPost) {
  return (
    <PostDetailScreen
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
      return <GalleryScreen atelier={selectedAtelier} onBack={() => setScreen("atelier")} />;
    }
    if (screen === "addres") {
      return <AddResourceScreen atelier={selectedAtelier} onBack={() => setScreen("atelier")} />;
    }
    if (screen === "profile") {
      return (
        <ProfileScreen
          savedCount={savedPostIds.length}
          onBack={() => setScreen(null)}
          onSavedPosts={() => setScreen("saved")}
        />
      );
    }
    if (screen === "search") {
      return (
        <SearchScreen
          posts={atelierPosts}
          onBack={() => setScreen(null)}
          onOpenAtelier={(a) => {
            setSelectedAtelier(a);
            setScreen("atelier");
          }}
          onOpenPost={(p) => {
            setSelectedPost(p);
            setScreen("post");
          }}
        />
      );
    }
    if (screen === "messages") {
      return <MessagesScreen onBack={() => setScreen(null)} />;
    }
    if (screen === "notifications") {
      return <NotificationsScreen onBack={() => setScreen(null)} />;
    }
if (navTab === "feed")
  return (
   <FeedScreen
  posts={atelierPosts}
  savedPostIds={savedPostIds}
  setSavedPostIds={setSavedPostIds}
  onProfile={() => setScreen("profile")}
  onSearch={() => setScreen("search")}
  onMessages={() => setScreen("messages")}
  onNotifications={() => setScreen("notifications")}
/>
  );    if (navTab === "galerie") return <GalleryScreen atelier={null} onBack={() => handleNavTab("ateliers")} />;
    return (
     <WorkshopsScreen
  onOpen={(a) => {
    setSelectedAtelier(a);
    setScreen("atelier");
  }}
  onProfile={() => setScreen("profile")}
  onSearch={() => setScreen("search")}
  onMessages={() => setScreen("messages")}
  onNotifications={() => setScreen("notifications")}
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
