type TagPillProps = {
  label: string;
  variant?: "default" | "workshop";
};

export function TagPill({ label, variant = "workshop" }: TagPillProps) {
  return <span className={variant === "workshop" ? "ws-tag" : "tag"}>{label}</span>;
}
