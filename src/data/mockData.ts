import type { Atelier, Post, PostType } from "../types";

export const ATELIERS: Atelier[] = [
  {
    id: 1,
    emoji: "🏺",
    name: "Céramique raku",
    members: 23,
    tags: ["Argile", "Raku", "Japonais"],
    last: "Marie D. a partagé une photo",
    time: "2 h",
    unread: 3,
    about:
      "La communauté dédiée à la céramique raku. Partagez vos réalisations, vos essais de cuisson, vos recettes d'émaux et vos ressources. Débutants et confirmés bienvenus.",
  },
  {
    id: 2,
    emoji: "📷",
    name: "Photographie argentique",
    members: 18,
    tags: ["Argentique", "Chambre noire"],
    last: "Thomas R. a posé une question",
    time: "5 h",
    unread: 1,
    about:
      "Tout sur la photographie argentique : techniques, développement, scans et partage de tirages.",
  },
  {
    id: 3,
    emoji: "📚",
    name: "Reliure d'art",
    members: 11,
    tags: ["Reliure", "Papier"],
    last: "Nouveau document partagé",
    time: "3 j",
    unread: 0,
    about:
      "Atelier consacré à la reliure artisanale et d'art. Partagez vos projets, techniques et ressources.",
  },
  {
    id: 4,
    emoji: "🧵",
    name: "Broderie contemporaine",
    members: 31,
    tags: ["Broderie", "Textile"],
    last: "Leïla K. a publié un message",
    time: "1 sem",
    unread: 0,
    about:
      "Exploration de la broderie comme médium artistique contemporain.",
  },
];

export const DISCOVER: Atelier[] = [
  {
    id: 5,
    emoji: "🧴",
    name: "Poterie traditionnelle",
    members: 42,
    tags: ["Poterie", "Tour"],
    description: "Un espace pour partager essaisen poterie, techniques et inspirations autour de la poterie traditionnelle.",
  },
  {
    id: 6,
    emoji: "🎸",
    name: "Lutherie",
    members: 15,
    tags: ["Bois", "Guitare"],
   description: "Un espace pour ceux qui aiment la musique et qui ont décidé de fabriquer eux-mêmes leur propre outil d'expression !",
  },
  {
    id: 7,
    emoji: "🖨️",
    name: "Sérigraphie",
    members: 27,
    tags: ["Impression", "Encre"],
   description: "Un espace pour partager essais, techniques et inspirations autour de la poterie traditionnelle.",
  },
  {
    id: 8,
    emoji: "🔵",
    name: "Cyanotype",
    members: 19,
    tags: ["Photo", "Botanique"],
    description: "Un espace pour partager essais, techniques et inspirations autour de la poterie traditionnelle.",
  },
];

export const POSTS: Post[] = [
  {
    id: 1,
    av: "MD",
    avColor: "#C6784F",
    author: "Marie D.",
    role: "Référente",
    time: "il y a 2 h",
    type: "Résultat",
    typeKey: "resultat",
    title: "Sortie de four ce matin",
    body: "Voici ma dernière pièce sortie du four ce matin. La couleur de l'émail a très bien pris — je suis contente du résultat !",
    img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=900&auto=format&fit=crop",
    replies: 4,
    pinned: false,
  },
  {
    id: 2,
    av: "LM",
    avColor: "#78917F",
    author: "Lucie M.",
    role: null,
    time: "il y a 3 jours",
    type: "Ressource",
    typeKey: "ressource",
    title: "Guide des températures raku — mis à jour",
    body: "Le guide collaboratif a été enrichi avec 8 nouvelles contributions. Retrouvez-le dans l'onglet Ressources.",
    replies: 4,
    pinned: true,
  },
  {
    id: 3,
    av: "TR",
    avColor: "#5C7A6F",
    author: "Thomas R.",
    role: null,
    time: "il y a 5 jours",
    type: "Question",
    typeKey: "question",
    title: "Problème d'émail qui craquelle",
    body: "Mon émail blanc mat craquelle systématiquement après refroidissement. Quelqu'un a déjà eu ce problème ?",
    replies: 2,
    pinned: false,
  },
];

export const POST_TYPES: PostType[] = ["Avancement", "Question", "Découverte", "Résultat", "Sondage"];

