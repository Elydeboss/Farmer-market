import type React from "react";

type Props = {
  title: string;
  value: string | number;
  hint?: React.ReactNode;
  className?: string;
  icon: React.ReactNode;
};

const StatsCard = ({ title, value, hint, className = "", icon }: Props) => {
  return (
    <div>
      <div className={`p-5 rounded-xl h-full hover:shadow-sm ${className}`}>
        <div className="flex  justify-between gap-4">
          <div>
            <p className=" font-medium md:text-xl text-[#737373]">{title}</p>
            <h4 className="text-black text-[22px] md:text-[28px] my-5 font-bold">
              {value}
            </h4>
          </div>
          <div className="w-10 h-10 p-[6px] md:w-13 md:h-13 flex items-center justify-center rounded-full bg-white">
            {icon}
          </div>
        </div>
        {hint && <div className=" text-pri font-medium mt-1">{hint}</div>}
      </div>
    </div>
  );
};

export default StatsCard;
