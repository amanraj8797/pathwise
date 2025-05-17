import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsCard } from "@/components/StatsCard";
import { StatsSummaryCard } from "@/components/StatsSummaryCard";
import { CourseCard } from "@/components/CourseCard";
import { Toaster } from "@/components/ui/toaster";
import { technologies } from "@/data/technologies";
import { UserStreak } from "@/components/UserStreak";
import StreakTracker from "@/components/StreakTracker";
import ChatWidget from "@/components/chat/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6 mt-17">
            <StreakTracker />
          </div>
          {/* Stats Section - Left Side */}
          {/* <div className="lg:col-span-1 space-y-6">
            <StatsSummaryCard
              streak={{
                current: 15,
                nextReward: 5,
                rank: 42,
              }}
              rewards={{
                total: 2500,
                tier: "Silver",
                nextTier: 500,
              }}
            />
            <StatsCard
              title="Completion Rate"
              value="85"
              unit="%"
              progress={85}
              details={["Above average", "Top 25% learners"]}
              showProgressRing={true}
            />
          </div> */}

          {/* Course Cards - Right Side */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6">Popular Learning Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {technologies.map((tech) => (
                <CourseCard
                  key={tech.id}
                  id={tech.id}
                  title={tech.title}
                  description={tech.description}
                  students={tech.students}
                  lessons={tech.lessons}
                  difficulty={tech.difficulty}
                  color={tech.color}
                  icon={tech.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
      <ChatWidget />
    </div>
  );
};

export default Index;
