import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  hint?: React.ReactNode;
  colorClass?: string; // e.g. "bg-amber-50"
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  hint,
  colorClass = "bg-white",
  icon,
}) => {
  return (
    <div className={`rounded-2xl p-6 shadow-sm ${colorClass}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-gray-500">{title}</div>
          <div className="mt-3 text-2xl font-semibold text-gray-800">
            {value}
          </div>
          {hint && <div className="mt-2 text-xs text-gray-400">{hint}</div>}
        </div>

        <div className="text-gray-500">{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
