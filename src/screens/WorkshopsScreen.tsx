import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Atelier } from "../types";
import { DISCOVER } from "../data/mockData";
import { AppHeader } from "../components/common/AppHeader";
import { SearchBar } from "../components/common/SearchBar";
import { EmptyState } from "../components/common/EmptyState";
import { WorkshopCard } from "../components/workshops/WorkshopCard";

export function WorkshopsScreen({
  onOpen,
  onProfile,
  joinedAtelierIds,
setJoinedAtelierIds,
  onSearch,
  onMessages,
  onNotifications,
}:{
  onOpen: (a: Atelier) => void;
  onProfile: () => void;
  joinedAtelierIds: number[];
setJoinedAtelierIds: Dispatch<SetStateAction<number[]>>;
  onSearch?: () => void;
  onMessages?: () => void;
  onNotifications?: () => void;
}) {
  const [tab, setTab] = useState<"mes" | "discover">("mes");
const [, setFilter] = useState("Tous");
const [showFilters, setShowFilters] = useState(false);
const [search, setSearch] = useState("");
const [activeFilterTab, setActiveFilterTab] = useState<"all" | "filters">("all");
const [activeFilters, setActiveFilters] = useState<string[]>([]);
const joinedDiscover = DISCOVER.filter((a) => joinedAtelierIds.includes(a.id));

const visibleAteliers = joinedDiscover
  .map((a) => ({
    ...a,
    last: a.last || "Nouvelle activité dans l'atelier",
    time: a.time || "à l'instant",
    unread: 0,
  }))
  .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));
const visibleDiscover = DISCOVER.filter((a) =>
  !joinedAtelierIds.includes(a.id) &&
  (a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.tags.join(" ").toLowerCase().includes(search.toLowerCase())) &&
  (activeFilters.length === 0 || activeFilters.some((f) => a.tags.includes(f)))
);  
  return (
    <div className="screen">
           <AppHeader
             onProfile={onProfile}
             onSearch={onSearch}
             onMessages={onMessages}
             onNotifications={onNotifications}
           />
      <div className="tabs">
        <button className={`tab ${tab === "mes" ? "active" : ""}`} onClick={() => setTab("mes")}>Mes ateliers</button>
        <button className={`tab ${tab === "discover" ? "active" : ""}`} onClick={() => setTab("discover")}>Découvrir</button>
      </div>
      <div className="content">
        <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un atelier..." />
       {tab === "mes" ? (
  <>
    {visibleAteliers.length === 0 ? (
      <EmptyState
        icon="🏺"
        title="Aucun atelier pour l'instant"
        text="Rejoins un atelier pour commencer à échanger avec d'autres makers."
        actionLabel="Découvrir des ateliers"
        onAction={() => setTab("discover")}
      />
    ) : (
      <>
        <div className="sect">Actifs récemment</div>
        {visibleAteliers.map((a) => (
          <WorkshopCard
            key={a.id}
            atelier={a}
            onOpen={onOpen}
            variant="mine"
          />
        ))}
      </>
    )}
  </>
) : (
          <>
            <div className="filters">
              <button className={`filter ${activeFilterTab === "all" ? "active" : ""}`} onClick={() => { setActiveFilterTab("all"); setShowFilters(false); setFilter("Tous"); }}>Tous</button>
              <button className={`filter ${activeFilterTab === "filters" ? "active" : ""}`} onClick={() => { setActiveFilterTab("filters"); setShowFilters(true); }}>Filtres</button></div>
           {showFilters && <div className="filter-panel"><div className="filter-row"><span>Matière</span><button className={`filter-choice ${activeFilters.includes("Bois") ? "active" : ""}`} onClick={() => setActiveFilters((fs) => fs.includes("Bois") ? fs.filter((f) => f !== "Bois") : [...fs, "Bois"])}>Bois</button><button className={`filter-choice ${activeFilters.includes("Céramique") ? "active" : ""}`} onClick={() => setActiveFilters((fs) => fs.includes("Céramique") ? fs.filter((f) => f !== "Céramique") : [...fs, "Céramique"])}>Céramique</button><button className={`filter-choice ${activeFilters.includes("Textile") ? "active" : ""}`} onClick={() => setActiveFilters((fs) => fs.includes("Textile") ? fs.filter((f) => f !== "Textile") : [...fs, "Textile"])}>Textile</button></div><div className="filter-row"><span>Technique</span><button className={`filter-choice ${activeFilters.includes("Tour") ? "active" : ""}`} onClick={() => setActiveFilters((fs) => fs.includes("Tour") ? fs.filter((f) => f !== "Tour") : [...fs, "Tour"])}>Tour</button><button className={`filter-choice ${activeFilters.includes("Sérigraphie") ? "active" : ""}`} onClick={() => setActiveFilters((fs) => fs.includes("Sérigraphie") ? fs.filter((f) => f !== "Sérigraphie") : [...fs, "Sérigraphie"])}>Sérigraphie</button><button className={`filter-choice ${activeFilters.includes("Broderie") ? "active" : ""}`} onClick={() => setActiveFilters((fs) => fs.includes("Broderie") ? fs.filter((f) => f !== "Broderie") : [...fs, "Broderie"])}>Broderie</button></div><div className="filter-row"><span>Niveau</span><button className={`filter-choice ${activeFilters.includes("Débutant") ? "active" : ""}`} onClick={() => setActiveFilters((fs) => fs.includes("Débutant") ? fs.filter((f) => f !== "Débutant") : [...fs, "Débutant"])}>Débutant</button><button className={`filter-choice ${activeFilters.includes("Confirmé") ? "active" : ""}`} onClick={() => setActiveFilters((fs) => fs.includes("Confirmé") ? fs.filter((f) => f !== "Confirmé") : [...fs, "Confirmé"])}>Confirmé</button></div></div>}
           {visibleDiscover.map((a) => (
              <WorkshopCard
                key={a.id}
                atelier={a}
                onOpen={onOpen}
                variant="discover"
                isJoined={joinedAtelierIds.includes(a.id)}
                onToggleJoin={(atelierId) => {
                  setJoinedAtelierIds((ids) =>
                    ids.includes(atelierId)
                      ? ids.filter((id) => id !== atelierId)
                      : [...ids, atelierId]
                  );
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

// ─── SCREEN: ATELIER DETAIL ───────────────────────────────────────────────────

