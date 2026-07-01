import { Search } from "lucide-react";

type AppHeaderProps = {
  onProfile: () => void;
};

export function AppHeader({ onProfile }: AppHeaderProps) {
  return (
    <div className="header">
      <div className="logo">MAKRZ</div>

      <div className="header-right">
        <button className="icon-btn" type="button" aria-label="Rechercher">
          <Search size={20} strokeWidth={1.8} />
        </button>

        <button className="avatar" type="button" onClick={onProfile} aria-label="Ouvrir le profil">
          ML
        </button>
      </div>
    </div>
  );
}
