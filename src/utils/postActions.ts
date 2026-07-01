import type { Post } from "../types";

export async function sharePost(post: Post) {
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
}

export function toggleId(ids: number[], id: number): number[] {
  return ids.includes(id) ? ids.filter((existing) => existing !== id) : [...ids, id];
}
