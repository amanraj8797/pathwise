
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

export const UserStreak = () => {
  // In a real app, this would be fetched from an API or context
  const userStats = {
    currentStreak: 15,
    longestStreak: 32,
    nextReward: 5,
    rewards: 2500,
    nextTier: 500,
  };

  const daysToNextReward = userStats.nextReward;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Current Streak</span>
            <span className="font-bold text-lg">{userStats.currentStreak} days</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Longest: {userStats.longestStreak} days</span>
            <span>Next reward in {daysToNextReward} days</span>
          </div>
          <Progress value={(userStats.currentStreak % 20) * 5} />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Total Rewards</span>
            <span className="font-bold text-lg">{userStats.rewards} Coins</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Silver tier</span>
            <span>Next tier: {userStats.nextTier} coins away</span>
          </div>
          <Progress value={75} className="bg-gray-200" />
        </div>
      </CardContent>
    </Card>
  );
};
