
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, Star, Trophy } from "lucide-react";

export const StatsOverview = () => {
  // In a real app, these would be fetched from an API
  const stats = [
    {
      label: "Active Learners",
      value: "50K+",
      icon: <User className="h-4 w-4" />,
    },
    {
      label: "Learning Paths",
      value: "1000+",
      icon: <Star className="h-4 w-4" />,
    },
    {
      label: "Success Rate",
      value: "95%",
      icon: <Trophy className="h-4 w-4" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none text-muted-foreground">
                {stat.label}
              </p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              {stat.icon}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
