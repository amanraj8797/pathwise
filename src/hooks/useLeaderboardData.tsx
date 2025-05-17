
import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  avatar?: string;
  streak: number;
  score: number;
  progress: number;
  change: "up" | "down" | "none";
}

export function useLeaderboardData() {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchData = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        const mockUsers: User[] = [
          {
            id: "1",
            name: "Sarah Johnson",
            avatar: "https://i.pravatar.cc/150?img=1",
            streak: 42,
            score: 98,
            progress: 85,
            change: "up",
          },
          {
            id: "2",
            name: "Michael Chen",
            avatar: "https://i.pravatar.cc/150?img=8",
            streak: 37,
            score: 92,
            progress: 79,
            change: "none",
          },
          {
            id: "3",
            name: "Jessica Williams",
            avatar: "https://i.pravatar.cc/150?img=5",
            streak: 30,
            score: 95,
            progress: 73,
            change: "up",
          },
          {
            id: "4",
            name: "David Rodriguez",
            avatar: "https://i.pravatar.cc/150?img=3",
            streak: 25,
            score: 88,
            progress: 68,
            change: "down",
          },
          {
            id: "5",
            name: "Emily Taylor",
            avatar: "https://i.pravatar.cc/150?img=9",
            streak: 21,
            score: 86,
            progress: 65,
            change: "up",
          },
          {
            id: "6",
            name: "James Wilson",
            streak: 18,
            score: 79,
            progress: 60,
            change: "none",
          },
          {
            id: "7",
            name: "Olivia Martinez",
            avatar: "https://i.pravatar.cc/150?img=2",
            streak: 15,
            score: 82,
            progress: 54,
            change: "down",
          },
          {
            id: "8",
            name: "Ethan Thompson",
            streak: 12,
            score: 75,
            progress: 48,
            change: "up",
          },
          {
            id: "9",
            name: "Sophia Lee",
            avatar: "https://i.pravatar.cc/150?img=4",
            streak: 9,
            score: 71,
            progress: 41,
            change: "down",
          },
          {
            id: "10",
            name: "Alexander Garcia",
            streak: 7,
            score: 68,
            progress: 35,
            change: "none",
          },
        ];
        
        setUserData(mockUsers);
        setLoading(false);
      }, 800);
    };

    fetchData();
  }, []);

  return { userData, loading };
}
