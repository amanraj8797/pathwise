
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  icon: 'ml' | 'react' | 'java' | 'python' | 'js' | 'cloud' | 'mobile' | 'blockchain' | 'ai' | 'devops';
  color: string;
  students: number;
  lessons: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const Path = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchEnrolledCourses();
    } else {
      setIsLoading(false);
      setEnrolledCourses([]);
    }
  }, [isAuthenticated, user]);

  const fetchEnrolledCourses = async () => {
    setIsLoading(true);
    try {
      // Get user enrollments with course details
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          course_id,
          courses:course_id (*)
        `)
        .eq('user_id', user?.id);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        // Convert the nested structure to a flat array of courses
        const courses = data.map(item => item.courses) as Course[];
        setEnrolledCourses(courses);
      } else {
        setEnrolledCourses([]);
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      setEnrolledCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-muted flex justify-center">
        <div className="container mx-auto px-4 pb-20 pt-24">
          {/* Title at the top */}
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent text-center">
            Enrolled Courses
          </h1>

          {!isAuthenticated ? (
            <div className="text-center mt-10 p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Please sign in</h2>
              <p className="text-muted-foreground">
                You need to be signed in to view your enrolled courses
              </p>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-center mt-10">
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mt-10">
              {enrolledCourses.length > 0 ? (
                enrolledCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))
              ) : (
                <div className="col-span-full text-center p-6 bg-white rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-2">No enrolled courses</h2>
                  <p className="text-muted-foreground mb-4">
                    You haven't enrolled in any courses yet. Browse courses on the home page.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Path;
