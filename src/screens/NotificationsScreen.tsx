import { ArrowLeft } from "lucide-react";
import { NOTIFICATIONS } from "../data/mockData";
import { EmptyState } from "../components/common/EmptyState";

export function NotificationsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="screen">
      <div className="topbar">
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft size={22} strokeWidth={1.8} />
        </button>
        <div className="topbar-title">Notifications</div>
      </div>

      <div className="content">
        {NOTIFICATIONS.length === 0 ? (
          <EmptyState icon="🔔" title="Aucune notification" text="Vous êtes à jour !" />
        ) : (
          NOTIFICATIONS.map((n) => (
            <div className="res-item" key={n.id} style={{ opacity: n.read ? 0.6 : 1 }}>
              <div className="res-icon">{n.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="res-title">{n.title}</div>
                <div className="res-meta">{n.time}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
