
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { StatsCard } from "@/components/StatsCard";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user, profile, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted">
      <Navbar />
      <div className="container mx-auto pt-24 px-4">
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome, {profile?.username || user?.email?.split('@')[0] || "User"}!</h1>
              <p className="text-muted-foreground">Track your learning progress and achievements</p>
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Your Learning Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            title="Completion Rate"
            value="85"
            unit="%"
            progress={85}
            details={["Above average", "Top 25% learners"]}
            showProgressRing={true}
          />
          <StatsCard 
            title="Learning Streak"
            value="15"
            unit="days"
            progress={75}
            details={["Current streak", "Personal best: 22 days"]}
            showProgressRing={true}
          />
          <StatsCard 
            title="Course Progress"
            value="4"
            unit="/12"
            progress={33}
            details={["React Basics", "Advanced JavaScript"]}
            showProgressRing={true}
          />
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for learning paths */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow card-shine">
            <h3 className="font-semibold text-lg mb-2">Frontend Development</h3>
            <div className="h-2 bg-muted rounded-full mb-4">
              <div className="h-2 bg-primary rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-muted-foreground text-sm">65% complete</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow card-shine">
            <h3 className="font-semibold text-lg mb-2">Data Structures</h3>
            <div className="h-2 bg-muted rounded-full mb-4">
              <div className="h-2 bg-accent rounded-full" style={{ width: '40%' }}></div>
            </div>
            <p className="text-muted-foreground text-sm">40% complete</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow card-shine">
            <h3 className="font-semibold text-lg mb-2">Machine Learning</h3>
            <div className="h-2 bg-muted rounded-full mb-4">
              <div className="h-2 bg-secondary rounded-full" style={{ width: '10%' }}></div>
            </div>
            <p className="text-muted-foreground text-sm">10% complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
