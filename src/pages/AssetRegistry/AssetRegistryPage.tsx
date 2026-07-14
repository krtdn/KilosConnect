import React, { useState } from "react";
import { Plus, Search, ChevronDown, Archive, AlertCircle, CheckCircle } from "lucide-react";
import { SidebarNavigationSection } from "../../components/SidebarNavigationSection";
import { useAuth } from '../../hooks/useAuth';

// Asset Equipment Sub-Components
import { AssetRegistryStats } from "./AssetRegistryStats";
import { AssetRegistryList } from "./AssetRegistryList";
import { AddAssetModal } from "./AddAssetModal";
import { UpdateAssetModal } from "./UpdateAssetModal";
import { ArchiveConfirmModal } from "./ArchiveConfirmModal";

// Lost & Found Integrated Sub-Components
import { AddLoFItemModal } from "../LostandFound/AddLoFItemModal";
import { LoFItemCard } from "../LostandFound/LoFItemCard";
import { ClaimModal } from "../LostandFound/ClaimModal";
import { LoFDetailedModal } from "../LostandFound/LoFDetailedModal";
import { useLostAndFound } from "../../hooks/useLostAndFound";
import type { LostAndFound } from "../../types/lostAndFound";

const INITIAL_ASSETS = [
  {
    assetId: "A001",
    name: "Olympic Barbell #45",
    type: "Barbell",
    zone: "Powerlifting Area",
    status: "Hazardous",
    srp: 12000,
    value: 8400,
    repairsCost: 15200,
    maintenanceCount: 8,
    lastMaintenanceDate: "2024-05-10",
    recommendation: "Replace Immediately",
  },
  {
    assetId: "A002",
    name: "Squat Rack A",
    type: "Rack",
    zone: "Powerlifting Area",
    status: "Working",
    srp: 45000,
    value: 31500,
    repairsCost: 5200,
    maintenanceCount: 3,
    lastMaintenanceDate: "2024-05-14",
    recommendation: "Healthy",
  },
  {
    assetId: "A003",
    name: "Rowing Machine #12",
    type: "Cardio",
    zone: "WOD Area",
    status: "Working",
    srp: 28000,
    value: 22400,
    repairsCost: 0,
    maintenanceCount: 1,
    lastMaintenanceDate: "2024-05-15",
    recommendation: "Healthy",
  },
  {
    assetId: "A004",
    name: "Cable Machine B",
    type: "Machine",
    zone: "Mezzanine",
    status: "Under Repair",
    srp: 65000,
    value: 39000,
    repairsCost: 42000,
    maintenanceCount: 12,
    lastMaintenanceDate: "2024-05-12",
    recommendation: "Healthy",
  },
  {
    assetId: "A005",
    name: "Bumper Plates Set",
    type: "Plates",
    zone: "Weightlifting Area",
    status: "Working",
    srp: 18000,
    value: 14400,
    repairsCost: 0,
    maintenanceCount: 0,
    lastMaintenanceDate: "2024-05-01",
    recommendation: "Healthy",
  },
];

// Seeded Mock Data structured specifically to pass strict TypeScript validations
// Seeded Mock Data for Lost & Found matching the strict TypeScript interface structure
// Seeded Mock Data fully satisfying the exact LostAndFound interface layout
const LOF_MOCK_DATA: LostAndFound[] = [
  {
    _id: "64aef1234b5c6d7e8f901111",
    lostId: "LF-001",
    item: "Hydro Flask 32oz",
    description: "Olive green bottle with a black cap. Slight scratch at the bottom.",
    areaFound: "Powerlifting",
    date: "2026-07-10",
    itemImage: { public_id: "", url: "" },
    status: "Unclaimed",
    claimedBy: null,
    claimedAt: null,
    claimedImage: { public_id: "", url: "" },
    reportedBy: "Coach Marcus",
    isArchived: false,
    archivedAt: null,
    archivedBy: null
  },
  {
    _id: "64aef1234b5c6d7e8f902222",
    lostId: "LF-002",
    item: "Apple AirPods Pro",
    description: "Left in a white charging case with a small blue sticker.",
    areaFound: "Mezzanine",
    date: "2026-07-12",
    itemImage: { public_id: "", url: "" },
    status: "Unclaimed",
    claimedBy: null,
    claimedAt: null,
    claimedImage: { public_id: "", url: "" },
    reportedBy: "Sasha Lee",
    isArchived: false,
    archivedAt: null,
    archivedBy: null
  },
  {
    _id: "64aef1234b5c6d7e8f903333",
    lostId: "LF-003",
    item: "Leather Weightlifting Belt",
    description: "Medium black leather Rogue belt.",
    areaFound: "Powerlifting",
    date: "2026-07-08",
    itemImage: { public_id: "", url: "" },
    status: "Claimed",
    claimedBy: "Jason Cruz",
    claimedAt: "2026-07-09",
    claimedImage: { public_id: "", url: "" },
    reportedBy: "Dave Miller",
    isArchived: false,
    archivedAt: null,
    archivedBy: null
  },
  {
    _id: "64aef1234b5c6d7e8f904444",
    lostId: "LF-004",
    item: "Sony WH-1000XM4 Headphones",
    description: "Silver over-ear active noise canceling headphones.",
    areaFound: "WOD",
    date: "2026-07-13",
    itemImage: { public_id: "", url: "" },
    status: "Unclaimed",
    claimedBy: null,
    claimedAt: null,
    claimedImage: { public_id: "", url: "" },
    reportedBy: "Admin Assistant Rose",
    isArchived: false,
    archivedAt: null,
    archivedBy: null
  }
];
// Cleaned drop-down values matching your type definition names exactly
const lofAreas = [
  "All Areas",
  "WOD",
  "Cafe",
  "Powerlifting",
  "CrossFit",
  "Mezzanine",
  "Other"
];

export const AssetRegistryPage = () => {
  const [activeTab, setActiveTab] = useState<"Equipment" | "LostFound">("Equipment");
  
  // Equipment State Management
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [selectedAssetForEdit, setSelectedAssetForEdit] = useState<any>(null);
  const [assetToArchive, setAssetToArchive] = useState<any>(null);

  // Lost & Found Integrated Logic Hooks
  const { items: hookItems, handleCreate, handleClaim } = useLostAndFound();
  
  // Dynamic switch: falls back to structural mock data seamlessly if database state is empty
  const items = hookItems && hookItems.length > 0 ? hookItems : LOF_MOCK_DATA;

  const [viewingItem, setViewingItem] = useState<LostAndFound | null>(null);
  const [claimingItem, setClaimingItem] = useState<LostAndFound | null>(null);
  const [filter, setFilter] = useState<"All" | "Unclaimed" | "Claimed">("All");
  const [zoneFilter, setZoneFilter] = useState("All Areas");
  const [isLoFModalOpen, setIsLoFModalOpen] = useState(false);
  const [loFSearchQuery, setLoFSearchQuery] = useState("");

  const { role } = useAuth();
  const userRole = (role ?? 'admin') as any;

  // Filtration for Equipment
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.assetId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = selectedZone === "All Zones" || asset.zone === selectedZone;
    const matchesStatus = selectedStatus === "All Statuses" || asset.status === selectedStatus;
    return matchesSearch && matchesZone && matchesStatus;
  });

  // Filtration for Lost & Found
  const filteredLoFItems = items.filter((item) => {
    const matchesStatus = filter === "All" ? true : item.status === filter;
    const matchesZone = zoneFilter === 'All Areas' ? true : item.areaFound === zoneFilter;
    const matchesSearch = (item.item ?? '').toLowerCase().includes(loFSearchQuery.toLowerCase()) || 
                          (item.description ?? '').toLowerCase().includes(loFSearchQuery.toLowerCase());
    return matchesStatus && matchesZone && matchesSearch;
  });

  // Equipment Action Callbacks
  const handleAddAsset = (newItem: any) => {
    const nextId = `A00${assets.length + 1}`;
    setAssets((prev) => [
      ...prev,
      {
        assetId: newItem.id || nextId,
        name: newItem.name,
        type: newItem.type || "Equipment",
        zone: newItem.zone || "General Storage",
        status: "Working",
        srp: Number(newItem.srp) || 0,
        value: Number(newItem.value) || 0,
        repairsCost: 0,
        maintenanceCount: 0,
        lastMaintenanceDate: newItem.purchaseDate || new Date().toISOString().split("T")[0],
        recommendation: "Healthy",
      },
    ]);
  };

  const handleUpdateAsset = (id: string, updates: any) => {
    setAssets((prev) =>
      prev.map((asset) =>
        asset.assetId === id
          ? {
              ...asset,
              status: updates.condition,
              recommendation: updates.condition === "Hazardous" ? "Replace Immediately" : "Healthy",
            }
          : asset
      )
    );
  };

  const handleConfirmArchive = () => {
    if (assetToArchive) {
      setAssets((prev) => prev.filter((a) => a.assetId !== assetToArchive.assetId));
      setIsArchiveModalOpen(false);
      setAssetToArchive(null);
    }
  };

  // Lost & Found Action Callbacks
  const handleViewItem = (item: LostAndFound) => {
    setViewingItem(item);
  };

  const handleAddLoFItem = async (data: any, imageFile: File) => {
    await handleCreate(data, imageFile);
    setIsLoFModalOpen(false);
  };

  const handleClaimItem = (id: string) => {
    const item = items.find(i => i.lostId === id);
    if (item) setClaimingItem(item);
  };

  const handleConfirmClaim = async (claimedBy: string, imageFile: File) => {
    if (!claimingItem) return;
    await handleClaim(claimingItem.lostId, claimedBy, imageFile);
    setClaimingItem(null);
  };

  // Stats Derived for Lost & Found
  const totalLoF = items.length;
  const unclaimedLoF = items.filter(i => i.status === "Unclaimed").length;
  const claimedLoF = items.filter(i => i.status === "Claimed").length;

  return (
    <div className="flex min-h-screen bg-[#f8fafc] w-full relative">
      <SidebarNavigationSection userRole={userRole} />
      
      <div className="flex flex-col flex-1 min-w-0 pl-24 pr-8 py-8 overflow-y-auto h-full text-[#1f1f1f] w-full">
        <div className="w-full mx-auto space-y-6">
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0f2942]">Smart Facility Asset Registry</h1>
            <p className="text-gray-500 text-sm mt-1">Equipment lifecycle monitoring, predictive analytics, and lost-and-found management</p>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-gray-200 gap-8 text-sm font-semibold">
            <button
              onClick={() => setActiveTab("Equipment")}
              className={`pb-3 transition-all ${
                activeTab === "Equipment" ? "text-[#10b981] border-b-2 border-[#10b981]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Equipment Assets
            </button>
            <button
              onClick={() => setActiveTab("LostFound")}
              className={`pb-3 transition-all ${
                activeTab === "LostFound" ? "text-[#10b981] border-b-2 border-[#10b981]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Lost & Found
            </button>
          </div>

          {activeTab === "Equipment" ? (
            <>
              {/* Equipment Content View */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-full">
                <div className="relative flex-1 min-w-[280px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by asset name or ID..."
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white"
                  />
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative">
                    <select
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      className="appearance-none pl-4 pr-9 py-2 text-sm border border-gray-200 rounded-lg bg-white font-medium text-gray-700 cursor-pointer focus:outline-none"
                    >
                      <option value="All Zones">All Zones</option>
                      <option value="Powerlifting Area">Powerlifting Area</option>
                      <option value="WOD Area">WOD Area</option>
                      <option value="Mezzanine">Mezzanine</option>
                      <option value="Weightlifting Area">Weightlifting Area</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="appearance-none pl-4 pr-9 py-2 text-sm border border-gray-200 rounded-lg bg-white font-medium text-gray-700 cursor-pointer focus:outline-none"
                    >
                      <option value="All Statuses">All Statuses</option>
                      <option value="Working">Working</option>
                      <option value="Damaged">Damaged</option>
                      <option value="Under Repair">Under Repair</option>
                      <option value="Hazardous">Hazardous</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>

                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[#0a2e27] hover:bg-[#07201b] text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Plus size={16} /> Add Asset
                  </button>
                </div>
              </div>

              <AssetRegistryStats assets={assets} />

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden w-full">
                <AssetRegistryList
                  filteredAssets={filteredAssets}
                  onAssetClick={(asset) => {
                    setSelectedAssetForEdit(asset);
                    setIsUpdateModalOpen(true);
                  }}
                  onDeleteAsset={(asset) => {
                    setAssetToArchive(asset);
                    setIsArchiveModalOpen(true);
                  }}
                />
              </div>
            </>
          ) : (
            /* Perfectly Synced Lost & Found UI Section Layout */
            <div className="space-y-6 animate-fadeIn w-full">
              
              {/* Filter Bar with Matching Layout */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-full">
                <div className="relative flex-1 min-w-[280px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    value={loFSearchQuery}
                    onChange={(e) => setLoFSearchQuery(e.target.value)}
                    placeholder="Search Lost & Found items..."
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white"
                  />
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative">
                    <select
                      value={zoneFilter}
                      onChange={(e) => setZoneFilter(e.target.value)}
                      className="appearance-none pl-4 pr-9 py-2 text-sm border border-gray-200 rounded-lg bg-white font-medium text-gray-700 cursor-pointer focus:outline-none"
                    >
                      {lofAreas.map((area) => (
                        <option key={area} value={area}>{area === "All Areas" ? area : `${area} Area`}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value as any)}
                      className="appearance-none pl-4 pr-9 py-2 text-sm border border-gray-200 rounded-lg bg-white font-medium text-gray-700 cursor-pointer focus:outline-none"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Unclaimed">Unclaimed</option>
                      <option value="Claimed">Claimed</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>

                  <button
                    onClick={() => setIsLoFModalOpen(true)}
                    className="bg-[#0a2e27] hover:bg-[#07201b] text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Plus size={16} /> Report Found Item
                  </button>
                </div>
              </div>

              {/* Minimalistic Accent Themed Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-100 border-l-4 border-l-[#10b981] shadow-sm flex flex-col justify-between">
                  <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Items</span>
                  <span className="text-3xl font-bold mt-2 text-[#0f2942]">{totalLoF}</span>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 border-l-4 border-l-amber-500 shadow-sm flex flex-col justify-between">
                  <span className="text-amber-600 text-xs font-semibold uppercase tracking-wider">Unclaimed</span>
                  <span className="text-3xl font-bold mt-2 text-[#0f2942]">{unclaimedLoF}</span>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 border-l-4 border-l-blue-500 shadow-sm flex flex-col justify-between">
                  <span className="text-blue-600 text-xs font-semibold uppercase tracking-wider">Claimed</span>
                  <span className="text-3xl font-bold mt-2 text-[#0f2942]">{claimedLoF}</span>
                </div>
              </div>

              {/* Items Main Display Grid */}
              <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLoFItems.map((item) => (
                    <LoFItemCard key={item.lostId} item={item} onClaim={handleClaimItem} onView={handleViewItem} />
                  ))}
                </div>
                {filteredLoFItems.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    No Lost & Found items found matching your filters.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Equipment Overlays Modals */}
      <AddAssetModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddAsset} />
      <UpdateAssetModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} asset={selectedAssetForEdit} onUpdate={handleUpdateAsset} />
      <ArchiveConfirmModal isOpen={isArchiveModalOpen} onClose={() => setIsArchiveModalOpen(false)} onConfirm={handleConfirmArchive} itemName={assetToArchive?.name || ""} />

      {/* Lost & Found Overlays Modals */}
      {isLoFModalOpen && <AddLoFItemModal onClose={() => setIsLoFModalOpen(false)} onSubmit={handleAddLoFItem} />}
      
      {claimingItem && (
        <ClaimModal
          itemName={claimingItem.item}
          onClose={() => setClaimingItem(null)}
          onConfirm={handleConfirmClaim}
        />
      )}

      {viewingItem && (
        <LoFDetailedModal 
          item={viewingItem} 
          onClose={() => setViewingItem(null)} 
        />
      )}
    </div>
  );
};