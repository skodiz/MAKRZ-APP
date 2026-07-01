import type {
  ActivityItem,
  AppNotification,
  Atelier,
  Challenge,
  Conversation,
  CurrentUser,
  NotebookEntry,
  Post,
  PostType,
  Project,
} from "../types";

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
    questionStatus: "attente",
  },
  {
    id: 4,
    av: "NB",
    avColor: "#8A6B4F",
    author: "Nora B.",
    role: null,
    time: "il y a 1 jour",
    type: "Question",
    typeKey: "question",
    title: "Comment fixer une anse qui se détache après séchage ?",
    body: "Sur ma dernière théière, l'anse se détache légèrement au séchage malgré le collage à la barbotine. Une astuce ?",
    replies: 1,
    pinned: false,
    questionStatus: "attente",
  },
  {
    id: 5,
    av: "VL",
    avColor: "#6D8A78",
    author: "Victor L.",
    role: null,
    time: "il y a 4 jours",
    type: "Question",
    typeKey: "question",
    title: "Quelle terre pour un four à bois ?",
    body: "Je débute la cuisson au four à bois, quelle terre me conseillez-vous pour bien résister ?",
    replies: 3,
    pinned: false,
    questionStatus: "resolue",
  },
  {
    id: 6,
    av: "ML",
    avColor: "#E2D1BC",
    author: "Moi",
    role: null,
    time: "il y a 6 h",
    type: "Avancement",
    typeKey: "avancement",
    title: "Émaillage du service à thé terminé",
    body: "L'étape émaillage est bouclée pour le service à thé raku — plus qu'à passer à la cuisson !",
    replies: 1,
    pinned: false,
  },
];

export const POST_TYPES: PostType[] = ["Avancement", "Question", "Découverte", "Résultat", "Sondage"];

export const CURRENT_USER: CurrentUser = {
  name: "Moi",
  av: "ML",
  avColor: "#E2D1BC",
  bio: "Céramiste amateur · Paris",
};

export const CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    name: "Lucie M.",
    av: "LM",
    avColor: "#78917F",
    lastMessage: "Merci pour le partage du guide des températures !",
    time: "5 min",
    unread: 2,
  },
  {
    id: 2,
    name: "Thomas R.",
    av: "TR",
    avColor: "#5C7A6F",
    lastMessage: "Tu utilises quel four pour la cuisson raku ?",
    time: "1 h",
    unread: 0,
  },
  {
    id: 3,
    name: "Marie D.",
    av: "MD",
    avColor: "#C6784F",
    lastMessage: "Photo envoyée",
    time: "hier",
    unread: 0,
  },
];

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: 1,
    icon: "💬",
    title: "Lucie M. a commenté votre publication",
    time: "il y a 10 min",
    read: false,
  },
  {
    id: 2,
    icon: "❤️",
    title: "Thomas R. a aimé votre photo",
    time: "il y a 2 h",
    read: false,
  },
  {
    id: 3,
    icon: "🏺",
    title: "Nouvelle publication dans Céramique raku",
    time: "il y a 5 h",
    read: true,
  },
  {
    id: 4,
    icon: "👋",
    title: "Marie D. a rejoint l'atelier Broderie contemporaine",
    time: "hier",
    read: true,
  },
];

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: 1,
    icon: "📸",
    title: "Vous avez publié « Sortie de four ce matin »",
    time: "il y a 2 h",
  },
  {
    id: 2,
    icon: "🧵",
    title: "Vous avez rejoint l'atelier Broderie contemporaine",
    time: "il y a 1 sem",
  },
  {
    id: 3,
    icon: "💬",
    title: "Vous avez commenté une publication de Thomas R.",
    time: "il y a 3 j",
  },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Service à thé raku",
    discipline: "Céramique",
    status: "En cours",
    description:
      "Un service à thé complet (théière, 4 tasses) en grès émaillé, cuisson raku traditionnelle.",
    steps: [
      {
        id: 1,
        label: "Tournage des pièces",
        done: true,
        note: "Six pièces tournées en une session : une théière et cinq tasses.",
      },
      { id: 2, label: "Séchage et tournassage", done: true },
      {
        id: 3,
        label: "Émaillage",
        done: false,
        note: "Test de l'émail craquelé blanc avant application définitive.",
      },
      { id: 4, label: "Cuisson raku", done: false },
    ],
  },
  {
    id: 2,
    title: "Carnet photo argentique — quartier Belleville",
    discipline: "Photographie",
    status: "En pause",
    description:
      "Série de portraits de commerçants du quartier, développée en chambre noire.",
    steps: [
      {
        id: 1,
        label: "Repérage et prises de vue",
        done: true,
        note: "Douze portraits réalisés sur trois jours de repérage.",
      },
      { id: 2, label: "Développement des négatifs", done: false },
      { id: 3, label: "Tirages", done: false },
    ],
  },
  {
    id: 3,
    title: "Reliure japonaise — carnet de croquis",
    discipline: "Reliure",
    status: "Terminé",
    description: "Carnet relié à la main selon la technique de reliure japonaise à 4 trous.",
    steps: [
      { id: 1, label: "Préparation du papier", done: true },
      { id: 2, label: "Pliage et assemblage", done: true },
      {
        id: 3,
        label: "Reliure",
        done: true,
        note: "Reliure finalisée, carnet de 40 pages.",
      },
    ],
  },
];

export const NOTEBOOK_ENTRIES: NotebookEntry[] = [
  {
    id: 1,
    category: "Matériaux",
    title: "Terre chamottée pour le raku",
    summary:
      "Résiste mieux aux chocs thermiques que la terre lisse. Privilégier une chamotte fine pour les pièces à parois fines.",
    updatedAt: "12 jan.",
    contributor: "Lucie M.",
  },
  {
    id: 2,
    category: "Matériaux",
    title: "Émail craquelé blanc",
    summary: "Un mélange fiable et ses proportions de base, testé sur plusieurs cuissons.",
    updatedAt: "28 déc.",
    contributor: "Marie D.",
  },
  {
    id: 3,
    category: "Outils",
    title: "Choisir ses mirettes",
    summary: "Les mirettes fines permettent un tournassage précis sans fragiliser la pièce.",
    updatedAt: "20 déc.",
    contributor: "Thomas R.",
  },
  {
    id: 4,
    category: "Techniques",
    title: "Refroidissement post-cuisson raku",
    summary:
      "Un refroidissement trop rapide provoque des chocs thermiques. Prévoir une phase de réduction en sciure.",
    updatedAt: "15 jan.",
    contributor: "Lucie M.",
  },
  {
    id: 5,
    category: "Erreurs fréquentes",
    title: "Émail qui craquelle après refroidissement",
    summary:
      "Souvent lié à une épaisseur d'émail irrégulière ou un séchage trop rapide entre les couches.",
    updatedAt: "22 jan.",
    contributor: "Marie D.",
  },
];

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: "Une pièce, une couleur",
    description:
      "Réalisez une pièce en n'utilisant qu'un seul émail. Partagez le résultat, même imparfait !",
    status: "active",
    linkedPostsCount: 6,
  },
  {
    id: 2,
    title: "Défi tasses d'hiver",
    description: "Créez une tasse inspirée par la saison froide.",
    status: "termine",
    linkedPostsCount: 14,
  },
];

