export type PostType = "Avancement" | "Question" | "Découverte" | "Résultat" | "Sondage";

export interface Atelier {
  id: number;
  emoji: string;
  name: string;
  members: number;
  tags: string[];
  last?: string;
  time?: string;
  unread?: number;
  about?: string;
  description?: string;
}

export interface Post {
  id: number;
  av: string;
  avColor: string;
  author: string;
  role: string | null;
  time: string;
  type: string;
  typeKey: string;
  title?: string;
  body: string;
  img?: string;
  replies: number;
  pinned: boolean;
}

export type ScreenKey =
  | "atelier"
  | "post"
  | "galerie"
  | "addres"
  | "saved"
  | "profile"
  | "search"
  | "messages"
  | "notifications"
  | null;

export interface CurrentUser {
  name: string;
  av: string;
  avColor: string;
  bio: string;
}

export interface Conversation {
  id: number;
  name: string;
  av: string;
  avColor: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export interface AppNotification {
  id: number;
  icon: string;
  title: string;
  time: string;
  read: boolean;
}

export interface ActivityItem {
  id: number;
  icon: string;
  title: string;
  time: string;
}
