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

export type ScreenKey = "atelier" | "post" | "galerie" | "addres" | "saved" | null;
