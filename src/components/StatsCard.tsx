
import { CircleIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  unit: string;
  progress: number;
  details: string[];
  showProgressRing?: boolean;
  onClick?: () => void;
}

export const StatsCard = ({ 
  title, 
  value, 
  unit, 
  progress, 
  details,
  showProgressRing = true,
  onClick 
}: StatsCardProps) => {
  const progressRingCircumference = 2 * Math.PI * 45;
  const offset = progressRingCircumference - (progress / 100) * progressRingCircumference;

  return (
    <div 
      className={`bg-white rounded-2xl p-6 card-shine border shadow-sm ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value} {unit}</h3>
        </div>
        {showProgressRing && (
          <svg width="100" height="100" className="transform -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#F1F5F9"
              strokeWidth="10"
              fill="none"
            />
            <circle
              className="progress-ring"
              cx="50"
              cy="50"
              r="45"
              stroke="#6366F1"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={progressRingCircumference}
              strokeDashoffset={offset}
            />
          </svg>
        )}
      </div>
      <div className="space-y-2">
        {details.map((detail, index) => (
          <div key={index} className="flex items-center text-sm">
            <CircleIcon className="h-2 w-2 mr-2 text-primary" />
            <span className="text-muted-foreground">{detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
