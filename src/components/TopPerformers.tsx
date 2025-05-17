
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";

interface User {
  id: string;
  name: string;
  avatar?: string;
  streak: number;
  score: number;
  progress: number;
  change: "up" | "down" | "none";
}

interface TopPerformersProps {
  data: User[];
}

export const TopPerformers = ({ data }: TopPerformersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Top Performers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {data.map((user, index) => (
          <div key={user.id} className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-6 h-6 bg-background rounded-full border-2 border-primary">
                <span className="text-xs font-bold">{index + 1}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <div className="flex text-sm text-muted-foreground gap-3">
                <span>{user.streak} day streak</span>
                <span>{user.score} pts</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
