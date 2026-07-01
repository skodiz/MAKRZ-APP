import { Bell, MessageSquare, Search } from "lucide-react";

type AppHeaderProps = {
  onProfile: () => void;
  onSearch?: () => void;
  onMessages?: () => void;
  onNotifications?: () => void;
};

export function AppHeader({ onProfile, onSearch, onMessages, onNotifications }: AppHeaderProps) {
  return (
    <div className="header">
      <div className="logo">MAKRZ</div>

      <div className="header-right">
        <button className="icon-btn" type="button" onClick={onSearch} aria-label="Rechercher">
          <Search size={20} strokeWidth={1.8} />
        </button>

        <button className="icon-btn" type="button" onClick={onMessages} aria-label="Messages">
          <MessageSquare size={20} strokeWidth={1.8} />
        </button>

        <button className="icon-btn" type="button" onClick={onNotifications} aria-label="Notifications">
          <Bell size={20} strokeWidth={1.8} />
        </button>

        <button className="avatar" type="button" onClick={onProfile} aria-label="Ouvrir le profil">
          ML
        </button>
      </div>
    </div>
  );
}
