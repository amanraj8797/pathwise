
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useStreakData } from "@/hooks/use-streak-data";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["M", "W", "F", "S"];

const StreakCalendar = () => {
  const { contributionData } = useStreakData();
  const [year, setYear] = useState(new Date().getFullYear());

  const getContributionLevel = (count: number) => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
  };

  // Get calendar data organized by week for the year
  const getCalendarData = () => {
    const calendarData: { date: Date; contributions: number }[][] = [];
    
    let currentDate = new Date(year, 0, 1);
    // Go to first Monday of the year or last Monday of previous year if Jan 1 is not Monday
    const day = currentDate.getDay();
    currentDate.setDate(currentDate.getDate() - (day === 0 ? 6 : day - 1));
    
    // Generate 53 weeks (max in a year view including partial weeks)
    for (let week = 0; week < 53; week++) {
      const weekData = [];
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        const dateString = date.toISOString().split('T')[0];
        const contributions = contributionData[dateString] || 0;
        
        weekData.push({
          date,
          contributions,
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      calendarData.push(weekData);
      
      // Break when we've gone past the year
      if (currentDate.getFullYear() > year && currentDate.getMonth() > 0) break;
    }
    
    return calendarData;
  };
  
  const calendarData = getCalendarData();
  
  return (
    <div className="pt-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">{contributionData.totalCount} contributions in the last year</h3>
        <div className="flex items-center">
          <button 
            onClick={() => setYear(year - 1)} 
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100"
            aria-label="Previous year"
          >
            &lt;
          </button>
          <span className="mx-2 font-medium">{year}</span>
          <button 
            onClick={() => setYear(year + 1)} 
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100"
            disabled={year >= new Date().getFullYear()}
            aria-label="Next year"
          >
            &gt;
          </button>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <div className="flex">
          <div className="w-6 mr-1 shrink-0">
            {days.map((day, i) => (
              <div key={day} className="h-[11px] mb-[2px] text-[10px] text-gray-500 flex items-center">
                {day}
              </div>
            ))}
          </div>
          
          <div className="w-full overflow-x-auto pb-2">
            <div className="inline-flex mb-1 text-[10px] text-gray-500 min-w-max">
              {calendarData.map((week, i) => {
                // Only show month label if it's first day of month
                const firstDayOfMonth = week[0].date.getDate() === 1 || i === 0;
                return (
                  <div key={i} className="w-[11px] mr-[2px]">
                    {firstDayOfMonth && months[week[0].date.getMonth()]}
                  </div>
                );
              })}
            </div>
            
            <div className="inline-flex min-w-max">
              {calendarData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col mr-[2px]">
                  {week.map((day, dayIndex) => (
                    <TooltipProvider key={`${weekIndex}-${dayIndex}`}>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <div 
                            className={cn(
                              "w-[11px] h-[11px] mb-[2px] rounded-sm",
                              getContributionLevel(day.contributions) === 0 && "bg-gray-100 border border-gray-200",
                              getContributionLevel(day.contributions) === 1 && "bg-green-100",
                              getContributionLevel(day.contributions) === 2 && "bg-green-300",
                              getContributionLevel(day.contributions) === 3 && "bg-green-500",
                              getContributionLevel(day.contributions) === 4 && "bg-green-700"
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs p-2">
                          <p>{day.contributions} contributions on {day.date.toDateString()}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end mt-2 text-xs">
          <span className="mr-1">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div 
              key={level}
              className={cn(
                "w-[10px] h-[10px] mx-[1px] rounded-sm",
                level === 0 && "bg-gray-100 border border-gray-200",
                level === 1 && "bg-green-100",
                level === 2 && "bg-green-300",
                level === 3 && "bg-green-500",
                level === 4 && "bg-green-700"
              )}
            />
          ))}
          <span className="ml-1">More</span>
        </div>
      </div>
    </div>
  );
};

export default StreakCalendar;
