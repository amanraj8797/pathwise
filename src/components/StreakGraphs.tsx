
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useStreakData } from "@/hooks/use-streak-data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded-md shadow-sm text-xs">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-green-600">{`${payload[0].value} contributions`}</p>
      </div>
    );
  }

  return null;
};

const StreakGraphs = () => {
  const { timeFrameData } = useStreakData();
  const [timeFrame, setTimeFrame] = useState<"daily" | "weekly" | "monthly">("daily");

  const data = timeFrameData[timeFrame];

  return (
    <div className="pt-3">
      <Tabs value={timeFrame} onValueChange={(v) => setTimeFrame(v as "daily" | "weekly" | "monthly")}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              width={25}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill="#8b5cf6" 
              radius={[4, 4, 0, 0]}
              minPointSize={2}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Statistics</h3>
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 bg-slate-50 rounded-md">
            <p className="text-xs text-muted-foreground">Average</p>
            <p className="text-base sm:text-lg font-semibold">
              {timeFrame === "daily" ? "3.2" : timeFrame === "weekly" ? "18.5" : "63.8"}
            </p>
          </div>
          <div className="p-2 sm:p-3 bg-slate-50 rounded-md">
            <p className="text-xs text-muted-foreground">Highest</p>
            <p className="text-base sm:text-lg font-semibold">
              {timeFrame === "daily" ? "12" : timeFrame === "weekly" ? "48" : "124"}
            </p>
          </div>
          <div className="p-2 sm:p-3 bg-slate-50 rounded-md">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-base sm:text-lg font-semibold">
              {timeFrame === "daily" ? "83" : timeFrame === "weekly" ? "83" : "83"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakGraphs;
