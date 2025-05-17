
import React, { useState } from 'react';
import { CalendarDays, Award, X } from "lucide-react";
import { StatsCard } from './StatsCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface StatsSummaryCardProps {
  streak: {
    current: number;
    nextReward: number;
    rank: number;
  };
  rewards: {
    total: number;
    tier: string;
    nextTier: number;
  };
}

export const StatsSummaryCard = ({ streak, rewards }: StatsSummaryCardProps) => {
  const [showStreakWindow, setShowStreakWindow] = useState(false);
  const { toast } = useToast();

  const handleStreak = () => {
    setShowStreakWindow(true);
  };

  const handleClaimReward = () => {
    toast({
      title: "Daily reward claimed!",
      description: "You've earned 50 coins for your learning streak.",
    });
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm">
      {/* Summary Card */}
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-bold">Your Progress Summary</h3>
        
        {/* Streak */}
        <div className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center">
            <CalendarDays className="h-5 w-5 mr-3 text-primary" />
            <div>
              <p className="font-medium">Current Streak</p>
              <p className="text-sm text-muted-foreground">Next reward in {streak.nextReward} days</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg">{streak.current} Days</span>
            <Button size="sm" variant="outline" onClick={handleStreak}>View</Button>
          </div>
        </div>
        
        {/* Rewards */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <Award className="h-5 w-5 mr-3 text-yellow-500" />
            <div>
              <p className="font-medium">Total Rewards</p>
              <p className="text-sm text-muted-foreground">{rewards.tier} tier • Next tier: {rewards.nextTier} coins away</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg">{rewards.total.toLocaleString()} Coins</span>
            <Button size="sm" onClick={handleClaimReward}>Claim Daily</Button>
          </div>
        </div>
      </div>

      {/* Streak Window */}
      {showStreakWindow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative animate-fade-in">
            <button 
              onClick={() => setShowStreakWindow(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            
            <h2 className="text-xl font-bold mb-4">Your Learning Streak</h2>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-3xl font-bold">{streak.current} Days</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ranking</p>
                <p className="text-3xl font-bold">#{streak.rank}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Streak Calendar</h3>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 28 }).map((_, i) => {
                  const isActive = i < 15; // Mock active days for demo
                  const isCurrent = i === 14; // Today
                  return (
                    <div 
                      key={i} 
                      className={`aspect-square rounded-md flex items-center justify-center text-xs ${
                        isCurrent ? 'bg-primary text-white ring-2 ring-primary ring-offset-2' : 
                        isActive ? 'bg-primary/20 text-primary font-medium' : 
                        'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {(i + 1)}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium">Upcoming Rewards</h3>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">20 Days Streak</p>
                    <p className="text-sm text-muted-foreground">5 days remaining</p>
                  </div>
                </div>
                <p className="font-bold text-green-600">+200 Coins</p>
              </div>
              
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">30 Days Streak</p>
                    <p className="text-sm text-muted-foreground">15 days remaining</p>
                  </div>
                </div>
                <p className="font-bold text-blue-600">+500 Coins</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
