import { Home, ImageIcon, Palette } from "lucide-react";

type NavBarProps = {
  tab: string;
  setTab: (tab: string) => void;
};

export function NavBar({ tab, setTab }: NavBarProps) {
  return (
    <div className="nav">
      <button className={`nav-item ${tab === "feed" ? "active" : ""}`} onClick={() => setTab("feed")}>
        <Home size={22} strokeWidth={1.8} />
        <span>Fil</span>
      </button>
      <button className={`nav-item ${tab === "ateliers" ? "active" : ""}`} onClick={() => setTab("ateliers")}>
        <Palette size={22} strokeWidth={1.8} />
        <span>Ateliers</span>
      </button>
      <button className={`nav-item ${tab === "galerie" ? "active" : ""}`} onClick={() => setTab("galerie")}>
        <ImageIcon size={22} strokeWidth={1.8} />
        <span>Galerie</span>
      </button>
    </div>
  );
}
