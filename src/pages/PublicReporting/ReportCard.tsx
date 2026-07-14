import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ReportCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onAction: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  buttonText, 
  onAction 
}) => {
  return (
    <div className="bg-[#1e293b]/40 border border-[#334155]/60 rounded-xl p-6 flex items-start gap-4 transition-all hover:bg-[#1e293b]/60">
      {/* Icon Container */}
      <div className="bg-[#0f172a] text-[#10b981] p-3 rounded-lg flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-gray-400 text-sm mt-1 leading-relaxed">{description}</p>
        </div>
        
        {/* Button */}
        <div>
          <button 
            onClick={onAction}
            className="bg-[#115e59] hover:bg-[#134e4a] text-white text-sm font-medium py-2 px-4 rounded-md transition-colors inline-flex items-center"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;