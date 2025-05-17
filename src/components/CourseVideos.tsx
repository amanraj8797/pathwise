
import { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface VideoData {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  src: string;
  course: string;
}

const sampleVideos: VideoData[] = [
  {
    id: "1",
    title: "React Fundamentals: Components and Props",
    duration: "12:34",
    thumbnail: "https://placehold.co/640x360/001/fff?text=React+Fundamentals",
    src: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    course: "react"
  },
  {
    id: "2",
    title: "React Hooks: useState and useEffect Explained",
    duration: "15:21",
    thumbnail: "https://placehold.co/640x360/001/fff?text=React+Hooks",
    src: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    course: "react"
  },
  {
    id: "3",
    title: "Python Basics: Variables and Data Types",
    duration: "10:15",
    thumbnail: "https://placehold.co/640x360/004/fff?text=Python+Basics",
    src: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    course: "python"
  },
  {
    id: "4",
    title: "Python Functions and Classes",
    duration: "14:20",
    thumbnail: "https://placehold.co/640x360/004/fff?text=Python+Functions",
    src: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    course: "python"
  },
  {
    id: "5",
    title: "JavaScript Basics: Syntax and Variables",
    duration: "09:45",
    thumbnail: "https://placehold.co/640x360/440/fff?text=JavaScript+Basics",
    src: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    course: "javascript"
  },
  {
    id: "6",
    title: "JavaScript Functions and Objects",
    duration: "11:30",
    thumbnail: "https://placehold.co/640x360/440/fff?text=JS+Functions",
    src: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    course: "javascript"
  }
];

interface CourseVideosProps {
  course?: string;
}

export const CourseVideos = ({ course }: CourseVideosProps) => {
  const [activeVideo, setActiveVideo] = useState<VideoData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);

  const filteredVideos = course
    ? sampleVideos.filter(video => video.course === course)
    : sampleVideos;

  const handleVideoSelect = (video: VideoData) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="space-y-6">
      {activeVideo ? (
        <div className="bg-black rounded-lg overflow-hidden">
          <div className="aspect-video relative">
            {/* Video player would be implemented here */}
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <img 
                src={activeVideo.thumbnail} 
                alt={activeVideo.title} 
                className="max-w-full max-h-full object-cover"
              />
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    className="rounded-full h-16 w-16"
                    onClick={togglePlay}
                  >
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3 text-white">
              <div className="mb-2">
                <Slider
                  value={[progress]}
                  max={100}
                  step={1}
                  className="w-full"
                  onValueChange={(value) => setProgress(value[0])}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white"
                    onClick={toggleMute}
                  >
                    {isMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </Button>
                  <div className="w-24 hidden sm:block">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={100}
                      step={1}
                      className="w-full"
                      onValueChange={(value) => setVolume(value[0])}
                    />
                  </div>
                  <span className="text-xs">
                    0:00 / {activeVideo.duration}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                >
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-white p-4">
            <h3 className="text-lg font-medium">{activeVideo.title}</h3>
            <p className="text-sm text-muted-foreground">
              Part of {activeVideo.course.charAt(0).toUpperCase() + activeVideo.course.slice(1)} course
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-muted rounded-lg">
          <h3 className="text-lg font-medium mb-2">No video selected</h3>
          <p className="text-muted-foreground">
            Select a video from the list below to start watching
          </p>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-4">
          {course
            ? `${course.charAt(0).toUpperCase() + course.slice(1)} Videos`
            : "All Course Videos"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleVideoSelect(video)}
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button className="rounded-full h-12 w-12">
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
                <Badge className="absolute bottom-2 right-2">
                  {video.duration}
                </Badge>
              </div>
              <div className="p-3">
                <h4 className="font-medium line-clamp-2">{video.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {video.course.charAt(0).toUpperCase() + video.course.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
