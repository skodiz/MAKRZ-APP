import type { PostType } from "../types";

export const typeClass = (t: PostType) =>
  t === "Avancement" ? "avancement"
  : t === "Question" ? "question"
  : t === "Découverte" ? "decouverte"
  : t === "Résultat" ? "resultat"
  : "sondage";
