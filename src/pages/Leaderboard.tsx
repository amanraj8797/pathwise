import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navbar } from "@/components/Navbar";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Medal, Trophy, Star, User } from "lucide-react";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { UserStreak } from "@/components/UserStreak";
import { TopPerformers } from "@/components/TopPerformers";
import { StatsOverview } from "@/components/StatsOverview";
import { useLeaderboardData } from "@/hooks/useLeaderboardData";
import { useAuth } from "@/contexts/AuthContext"; // Import auth context

const Leaderboard = () => {
  const { userData, loading } = useLeaderboardData();
  const { isAuthenticated } = useAuth(); // Get authentication status

  return (
    <>
      {/* Navbar positioned outside the main content container */}
      <Navbar />

      <div className="container max-w-7xl mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Leaderboard
            </h1>
            <p className="text-muted-foreground">
              Track your progress and compete with others on your learning
              journey
            </p>
          </div>

          <StatsOverview />

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="streaks">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="streaks">Streak Ranking</TabsTrigger>
                    <TabsTrigger value="scores">Test Scores</TabsTrigger>
                  </TabsList>
                  <TabsContent value="streaks">
                    <ScrollArea className="h-[400px]">
                      <LeaderboardTable data={userData} type="streak" />
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="scores">
                    <ScrollArea className="h-[400px]">
                      <LeaderboardTable data={userData} type="score" />
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-6">
              {/* TopPerformers moved to the top */}
              <TopPerformers data={userData.slice(0, 3)} />

              {/* UserStreak only shown when user is logged in */}
              {isAuthenticated && <UserStreak />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
