import { ArrowLeft } from "lucide-react";
import { CONVERSATIONS } from "../data/mockData";
import { EmptyState } from "../components/common/EmptyState";

export function MessagesScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="screen">
      <div className="topbar">
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft size={22} strokeWidth={1.8} />
        </button>
        <div className="topbar-title">Messages</div>
      </div>

      <div className="content">
        {CONVERSATIONS.length === 0 ? (
          <EmptyState icon="💬" title="Aucun message" text="Vos conversations apparaîtront ici." />
        ) : (
          CONVERSATIONS.map((c) => (
            <div className="card" key={c.id}>
              <div className="card-top">
                <div className="av" style={{ background: c.avColor }}>{c.av}</div>
                <div className="card-info">
                  <div className="title-row">
                    <div>
                      <div className="atelier-name">{c.name}</div>
                    </div>
                    {c.unread > 0 && <div className="new-badge">{c.unread}</div>}
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="last-text">{c.lastMessage}</div>
                <div className="time">{c.time}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
