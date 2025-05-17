
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Calendar, Coins } from "lucide-react";
import StreakCalendar from "./StreakCalendar";
import StreakGraphs from "./StreakGraphs";
import StreakRanking from "./StreakRanking";
import { useStreakData } from "@/hooks/use-streak-data";
import { ScrollArea } from "@/components/ui/scroll-area";

const StreakTracker = () => {
  const { currentStreak, nextMilestone, totalRewards } = useStreakData();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4 w-full max-w-md">
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Your Progress Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-purple-500 mt-1" />
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Current Streak</span>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-primary">{currentStreak}</span>
                  <span className="ml-2 text-sm text-muted-foreground">Days</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Next reward in {nextMilestone.daysRemaining} days
                </p>
              </div>
            </div>
            
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Eye size={16} /> View
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden">
                <DialogHeader>
                  <DialogTitle>Your Learning Streak</DialogTitle>
                </DialogHeader>
                
                <ScrollArea className="h-[calc(90vh-10rem)]">
                  <div className="mt-2 pr-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm text-muted-foreground">Current Streak</h3>
                        <p className="text-2xl font-bold">{currentStreak} Days</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-muted-foreground">Ranking</h3>
                        <p className="text-2xl font-bold">#42</p>
                      </div>
                    </div>
                    
                    <Tabs defaultValue="calendar" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="calendar">Calendar</TabsTrigger>
                        <TabsTrigger value="graphs">Graphs</TabsTrigger>
                        <TabsTrigger value="ranking">Ranking</TabsTrigger>
                      </TabsList>
                      <TabsContent value="calendar" className="p-1">
                        <StreakCalendar />
                      </TabsContent>
                      <TabsContent value="graphs" className="p-1">
                        <StreakGraphs />
                      </TabsContent>
                      <TabsContent value="ranking" className="p-1">
                        <StreakRanking />
                      </TabsContent>
                    </Tabs>
                    
                    <div className="mt-4">
                      <h3 className="text-sm font-medium mb-2">Upcoming Rewards</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-md bg-slate-50">
                          <div className="flex items-center">
                            <div className="bg-purple-100 p-2 rounded-md">
                              <div className="w-5 h-5 text-purple-500">🏆</div>
                            </div>
                            <div className="ml-3">
                              <p className="font-medium">20 Days Streak</p>
                              <p className="text-xs text-muted-foreground">{nextMilestone.daysRemaining} days remaining</p>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-green-600">+200 Coins</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-md bg-slate-50">
                          <div className="flex items-center">
                            <div className="bg-purple-100 p-2 rounded-md">
                              <div className="w-5 h-5 text-purple-500">🏆</div>
                            </div>
                            <div className="ml-3">
                              <p className="font-medium">30 Days Streak</p>
                              <p className="text-xs text-muted-foreground">15 days remaining</p>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-green-600">+500 Coins</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex items-start space-x-3">
              <Coins className="h-5 w-5 text-yellow-500 mt-1" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-muted-foreground">Total Rewards</span>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold">{totalRewards.coins}</span>
                      <span className="ml-2 text-xs text-muted-foreground">Coins</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {totalRewards.tier} tier • Next tier: {totalRewards.nextTierCoins} coins away
                    </p>
                  </div>
                  <Button className="bg-indigo-500 hover:bg-indigo-600">Claim Daily</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreakTracker;
