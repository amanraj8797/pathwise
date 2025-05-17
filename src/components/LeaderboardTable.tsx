
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Medal, Star, ArrowUp, ArrowDown } from "lucide-react";

interface User {
  id: string;
  name: string;
  avatar?: string;
  streak: number;
  score: number;
  progress: number;
  change: "up" | "down" | "none";
}

interface LeaderboardTableProps {
  data: User[];
  type: "streak" | "score";
}

export const LeaderboardTable = ({ data, type }: LeaderboardTableProps) => {
  const sortedData = [...data].sort((a, b) => 
    type === "streak" ? b.streak - a.streak : b.score - a.score
  );

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return <Medal className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="font-medium">{index + 1}</span>;
    }
  };

  const getChangeIcon = (change: string) => {
    switch (change) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Rank</TableHead>
          <TableHead>User</TableHead>
          {type === "streak" ? (
            <TableHead className="text-right">Current Streak</TableHead>
          ) : (
            <TableHead className="text-right">Test Score</TableHead>
          )}
          <TableHead className="text-right">Progress</TableHead>
          <TableHead className="text-center">Change</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((user, index) => (
          <TableRow key={user.id} className={index < 3 ? "font-medium" : ""}>
            <TableCell className="flex justify-center items-center">
              {getRankBadge(index)}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary/10">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              {type === "streak" ? (
                <div className="flex items-center justify-end gap-1">
                  <span>{user.streak}</span>
                  <span className="text-muted-foreground">days</span>
                </div>
              ) : (
                <div className="flex items-center justify-end gap-1">
                  <span>{user.score}</span>
                  <span className="text-muted-foreground">pts</span>
                </div>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="w-full bg-secondary rounded-full h-2.5 dark:bg-secondary">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${user.progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-muted-foreground">{user.progress}%</span>
            </TableCell>
            <TableCell className="text-center">
              {getChangeIcon(user.change)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
