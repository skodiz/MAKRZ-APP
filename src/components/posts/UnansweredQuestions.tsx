import type { Post } from "../../types";
import { PostCard } from "./PostCard";

type UnansweredQuestionsProps = {
  posts: Post[];
  onOpen: (post: Post) => void;
};

export function UnansweredQuestions({ posts, onOpen }: UnansweredQuestionsProps) {
  const questions = posts.filter((p) => p.typeKey === "question" && p.questionStatus);

  if (questions.length === 0) return null;

  return (
    <>
      <div className="sect-soft">Un coup de main ?</div>
      {questions.map((q) => (
        <div key={q.id}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              marginBottom: 4,
              color:
                q.questionStatus === "resolue"
                  ? "var(--color-green-sage)"
                  : "var(--color-accent-dark)",
            }}
          >
            {q.questionStatus === "resolue" ? "✓ Résolue" : "En attente"}
          </div>
          <PostCard post={q} variant="compact" onOpen={onOpen} />
          {q.questionStatus === "resolue" && (
            <div className="res-meta">Une réponse a aidé</div>
          )}
        </div>
      ))}
    </>
  );
}
