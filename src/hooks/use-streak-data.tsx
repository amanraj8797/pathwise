
import { useState, useEffect } from "react";

type ContributionData = {
  [date: string]: number;
  totalCount: number;
};

type TimeFrameData = {
  daily: { name: string; value: number }[];
  weekly: { name: string; value: number }[];
  monthly: { name: string; value: number }[];
};

type UserRank = {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  level: string;
  progressPercentage: number;
  rank?: number;
};

type RankingData = {
  topUsers: UserRank[];
  currentUser: UserRank;
};

type TotalRewards = {
  coins: number;
  tier: string;
  nextTierCoins: number;
};

const generateContributionData = (): ContributionData => {
  const data: ContributionData = { totalCount: 0 };
  const today = new Date();
  let totalCount = 0;

  // Generate data for the last 365 days
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    // Random contribution count with higher probability for recent dates and weekdays
    let count = 0;
    const dayOfWeek = date.getDay();
    const isWeekday = dayOfWeek > 0 && dayOfWeek < 6;
    const isRecent = i < 90; // Last 3 months
    
    if (Math.random() < (isWeekday ? 0.7 : 0.3) * (isRecent ? 1.2 : 0.8)) {
      count = Math.floor(Math.random() * 10) + 1;
      
      // Higher count for a current streak of 15 days
      if (i < 15) {
        count = Math.max(count, 1);
      }
    }
    
    data[dateString] = count;
    totalCount += count;
  }
  
  data.totalCount = totalCount;
  return data;
};

const generateTimeFrameData = (): TimeFrameData => {
  return {
    daily: Array.from({ length: 14 }, (_, i) => ({
      name: i === 0 ? 'Today' : i === 1 ? 'Yesterday' : `${i} days ago`,
      value: Math.floor(Math.random() * 12)
    })).reverse(),
    
    weekly: Array.from({ length: 12 }, (_, i) => ({
      name: `W${i + 1}`,
      value: Math.floor(Math.random() * 48)
    })),
    
    monthly: Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return {
        name: date.toLocaleString('default', { month: 'short' }),
        value: Math.floor(Math.random() * 124)
      };
    }).reverse()
  };
};

const generateRankingData = (): RankingData => {
  // Generate top users
  const topUsers: UserRank[] = Array.from({ length: 10 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    avatar: "", // No actual avatar image
    streak: i === 0 ? 92 : i === 1 ? 81 : Math.floor(Math.random() * 40) + 40,
    level: i < 3 ? "Diamond" : i < 6 ? "Platinum" : "Gold",
    progressPercentage: Math.floor(Math.random() * 100)
  }));

  // Current user (at position 42)
  const currentUser: UserRank = {
    id: "current-user",
    name: "You",
    avatar: "", // No actual avatar image
    streak: 15,
    level: "Silver",
    progressPercentage: 65,
    rank: 42
  };

  return {
    topUsers,
    currentUser
  };
};

const generateTotalRewards = (): TotalRewards => {
  return {
    coins: 2500,
    tier: "Silver",
    nextTierCoins: 500
  };
};

export const useStreakData = () => {
  const [contributionData, setContributionData] = useState<ContributionData>({ totalCount: 0 });
  const [timeFrameData, setTimeFrameData] = useState<TimeFrameData>({
    daily: [],
    weekly: [],
    monthly: []
  });
  const [rankingData, setRankingData] = useState<RankingData>({
    topUsers: [],
    currentUser: {
      id: "",
      name: "",
      avatar: "",
      streak: 0,
      level: "",
      progressPercentage: 0,
      rank: 0
    }
  });
  
  const [currentStreak, setCurrentStreak] = useState(15);
  const [nextMilestone, setNextMilestone] = useState({
    days: 20,
    daysRemaining: 5
  });
  
  const [totalRewards, setTotalRewards] = useState<TotalRewards>({
    coins: 0,
    tier: "",
    nextTierCoins: 0
  });
  
  useEffect(() => {
    // Generate mock data
    setContributionData(generateContributionData());
    setTimeFrameData(generateTimeFrameData());
    setRankingData(generateRankingData());
    setTotalRewards(generateTotalRewards());
  }, []);

  return {
    contributionData,
    timeFrameData,
    rankingData,
    currentStreak,
    nextMilestone,
    totalRewards
  };
};
