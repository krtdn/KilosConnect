import React, { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (asset: any) => void;
}

export const AddAssetModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "",
    zone: "",
    srp: "",
    value: "",
    purchaseDate: ""
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        id: "",
        name: "",
        type: "",
        zone: "",
        srp: "",
        value: "",
        purchaseDate: new Date().toISOString().split('T')[0]
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.zone || !formData.type) {
      alert("Please fill in the required fields (Name, Type, and Zone)");
      return;
    }
    onAdd(formData);
    onClose();
  };

  const zones = [
    "Mezzanine", 
    "Powerlifting Area", 
    "Open WOD Area", 
    "CrossFit Area", 
    "Weightlifting Area", 
    "General Storage"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-[540px] rounded-[32px] shadow-2xl overflow-hidden">
        <div className="bg-[#0a2e27] p-6 flex justify-between items-start text-white">
          <div>
            <h2 className="text-xl font-bold">Add Facility Asset</h2>
            <p className="text-white/70 text-xs mt-0.5">Configure tracking settings for new equipment</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#4a5568]">Asset Tracking ID</label>
              <input name="id" value={formData.id} onChange={handleChange} className="w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-sm" placeholder="e.g. A006" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#4a5568]">Classification *</label>
              <input name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-sm" placeholder="e.g. Barbell, Machine" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#4a5568]">Asset Name *</label>
            <input name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-sm" placeholder="e.g. Rowing Machine #13" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#4a5568]">Target Area/Zone *</label>
              <div className="relative">
                <select name="zone" value={formData.zone} onChange={handleChange} className="w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-sm appearance-none cursor-pointer">
                  <option value="" disabled>Select zone</option>
                  {zones.map((z) => <option key={z} value={z}>{z}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#4a5568]">Acquisition Date</label>
              <input name="purchaseDate" type="date" value={formData.purchaseDate} onChange={handleChange} className="w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#4a5568]">SRP (PHP)</label>
              <input name="srp" type="number" value={formData.srp} onChange={handleChange} className="w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-sm" placeholder="15000" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#4a5568]">Current Valuation (PHP)</label>
              <input name="value" type="number" value={formData.value} onChange={handleChange} className="w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-sm" placeholder="12000" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-[#e2e8f0] rounded-xl font-bold text-[#4a5568] hover:bg-gray-50">Cancel</button>
            <button type="button" onClick={handleSubmit} className="flex-1 py-3 bg-[#0a2e27] text-white rounded-xl font-bold shadow-lg hover:bg-[#08241f]">+ Register Asset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAssetModal;