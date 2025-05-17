import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Youtube,
  PlayCircle,
  Clock,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoCardProps {
  title: string;
  description: string;
  views: string;
  duration: string;
  videoId: string;
  isExpanded: boolean;
  setActiveVideoId: (videoId: string | null) => void;
}

const VideoCard = ({
  title,
  description,
  views,
  duration,
  videoId,
  isExpanded,
  setActiveVideoId,
}: VideoCardProps) => {
  const handleClick = () => {
    setActiveVideoId(isExpanded ? null : videoId); // Collapse if already expanded, otherwise expand this one
  };

  // Function to handle closing the expanded video
  const handleClose = () => {
    setActiveVideoId(null);
  };

  // Function to open video in a new tab
  const openInYoutube = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://www.youtube.com/watch?v=${videoId}, '_blank'`);
  };

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 ${
        isExpanded
          ? "col-span-full md:col-span-2 shadow-xl"
          : "hover:scale-105 hover:shadow-lg"
      }`}
    >
      <CardContent className="p-0">
        {!isExpanded ? (
          // Thumbnail and Info Section (Collapsed state)
          <div className="cursor-pointer" onClick={handleClick}>
            <div className="relative bg-muted aspect-video group">
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition-colors">
                <Youtube className="h-12 w-12 text-red-600" />
                <PlayCircle className="absolute h-16 w-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-1 text-indigo-700">{title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {description}
              </p>
              <div className="flex items-center text-sm">
                <span className="flex items-center mr-4">
                  <PlayCircle className="h-3 w-3 mr-1" />
                  {views} views
                </span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {duration}
                </span>
              </div>
            </div>
          </div>
        ) : (
          // Expanded video player view
          <div>
            {/* Header with controls */}
            <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 p-4 text-white flex justify-between items-center">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="mr-2 text-white hover:bg-indigo-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <h2 className="font-semibold">{title}</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={openInYoutube}
                className="text-white hover:bg-indigo-800"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Open in YouTube
              </Button>
            </div>

            {/* Video Player */}
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Video details */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground mb-4">{description}</p>
              <div className="flex items-center text-sm space-x-4">
                <span className="flex items-center">
                  <PlayCircle className="h-4 w-4 mr-1" />
                  {views} views
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {duration}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCard;
