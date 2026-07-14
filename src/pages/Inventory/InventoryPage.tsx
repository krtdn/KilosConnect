import React, { useState } from "react";
import { Plus, Search, ChevronDown, Download } from "lucide-react";
import { SidebarNavigationSection } from "../../components/SidebarNavigationSection";
import { useAuth } from '../../hooks/useAuth';
import { InventoryStats } from "./InventoryStats";
import { InventoryList } from "./InventoryList";
import { AddItemModal } from "./AddItemModal";
import { UpdateAssetModal } from "./UpdateAssetModal";
import { ArchiveConfirmModal } from "./ArchiveConfirmModal";

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

export const InventoryPage = () => {
  const [activeTab, setActiveTab] = useState<"Equipment" | "LostFound">("Equipment");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const [assets, setAssets] = useState(INITIAL_ASSETS);

  // Modal controls
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  const [selectedAssetForEdit, setSelectedAssetForEdit] = useState<any>(null);
  const [assetToArchive, setAssetToArchive] = useState<any>(null);

  // Authentication & Sidebar Roles setup
  const { role } = useAuth();
  const userRole = (role ?? 'custodian') as React.ComponentProps<typeof SidebarNavigationSection>["userRole"];

  // Filters logic
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.assetId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = selectedZone === "All Zones" || asset.zone === selectedZone;
    const matchesStatus = selectedStatus === "All Statuses" || asset.status === selectedStatus;

    return matchesSearch && matchesZone && matchesStatus;
  });

  const handleAddAsset = (newItem: any) => {
    const nextId = `A00${assets.length + 1}`;
    setAssets((prev) => [
      ...prev,
      {
        assetId: nextId,
        name: newItem.name,
        type: "Equipment",
        zone: newItem.zone || "General Storage",
        status: "Working",
        srp: 0,
        value: 0,
        repairsCost: 0,
        maintenanceCount: 0,
        lastMaintenanceDate: new Date().toISOString().split("T")[0],
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

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Retained Persistent Navigation Sidebar Component */}
      <SidebarNavigationSection userRole={userRole} />
      
      {/* Right Content Area Box Offset by Sidebar Width */}
      <div className="flex flex-col flex-1 min-w-0 ml-[240px] overflow-y-auto h-full p-8 text-[#1f1f1f]">
        <div className="max-w-[1300px] w-full mx-auto space-y-6">
          
          {/* Title Header Layout Block */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0f2942]">Smart Facility Asset Registry</h1>
            <p className="text-gray-500 text-sm mt-1">Equipment lifecycle monitoring, predictive analytics, and lost-and-found management</p>
          </div>

          {/* Sub Navigation Segment Bars */}
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
              {/* Filter Toolbars */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
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
                    className="bg-[#10b981] hover:bg-[#0da06f] text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Plus size={16} /> Add Asset
                  </button>

                  <button className="border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors">
                    <Download size={14} /> Export
                  </button>
                </div>
              </div>

              {/* Status Metric Grid Counters */}
              <InventoryStats assets={assets} />

              {/* Functional Registered Table */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <InventoryList
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
            <div className="p-12 text-center text-gray-400 bg-white rounded-xl border border-dashed">
              Lost & Found sub-module workspace container view.
            </div>
          )}
        </div>
      </div>

      {/* Global Overlay Modals */}
      <AddItemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddAsset} />
      <UpdateAssetModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} asset={selectedAssetForEdit} onUpdate={handleUpdateAsset} />
      <ArchiveConfirmModal isOpen={isArchiveModalOpen} onClose={() => setIsArchiveModalOpen(false)} onConfirm={handleConfirmArchive} itemName={assetToArchive?.name || ""} />
    </div>
  );
};