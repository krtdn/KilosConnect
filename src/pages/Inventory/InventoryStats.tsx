import React from "react";

interface Props {
  assets: any[];
}

export const InventoryStats: React.FC<Props> = ({ assets }) => {
  const total = assets.length;
  const working = assets.filter((a) => a.status === "Working").length;
  const damaged = assets.filter((a) => a.status === "Damaged").length;
  const underRepair = assets.filter((a) => a.status === "Under Repair").length;
  const hazardous = assets.filter((a) => a.status === "Hazardous").length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {/* Card 1 */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <p className="text-gray-400 text-xs font-semibold">Total Assets</p>
        <p className="text-2xl font-bold mt-1 text-black">{total}</p>
      </div>
      {/* Card 2 */}
      <div className="bg-white p-4 rounded-xl border border-[#eafaf1] shadow-sm">
        <p className="text-[#10b981] text-xs font-semibold">Working</p>
        <p className="text-2xl font-bold mt-1 text-[#10b981]">{working}</p>
      </div>
      {/* Card 3 */}
      <div className="bg-white p-4 rounded-xl border border-[#fffbeb] shadow-sm">
        <p className="text-amber-600 text-xs font-semibold">Damaged</p>
        <p className="text-2xl font-bold mt-1 text-amber-600">{damaged}</p>
      </div>
      {/* Card 4 */}
      <div className="bg-white p-4 rounded-xl border border-[#eff6ff] shadow-sm">
        <p className="text-blue-600 text-xs font-semibold">Under Repair</p>
        <p className="text-2xl font-bold mt-1 text-blue-600">{underRepair}</p>
      </div>
      {/* Card 5 */}
      <div className="bg-white p-4 rounded-xl border border-[#fef2f2] shadow-sm">
        <p className="text-red-600 text-xs font-semibold">Hazardous</p>
        <p className="text-2xl font-bold mt-1 text-red-600">{hazardous}</p>
      </div>
    </div>
  );
};