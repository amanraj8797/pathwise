
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Collaborative = () => {
  const [roomId, setRoomId] = useState("");
  const { toast } = useToast();

  const handleCreateRoom = () => {
    // Generate a random room ID
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Navigate to the room
    window.location.href = `/room/${newRoomId}`;
    
    toast({
      title: "Room created successfully",
      description: `Room ID: ${newRoomId}. Share this with others to join.`,
    });
  };

  const handleJoinRoom = () => {
    if (!roomId) {
      toast({
        title: "Room ID required",
        description: "Please enter a room ID to join",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to the room
    window.location.href = `/room/${roomId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 flex items-center">
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
            Back to Home
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Collaborative Practice</h1>
        <p className="text-gray-600 mb-8">Join or create a collaborative coding session to practice with peers.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Room Card */}
          <Card className="shadow-md border-2 hover:border-indigo-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2 text-indigo-500" />
                Create a New Room
              </CardTitle>
              <CardDescription>
                Start a new collaborative coding session and invite others to join
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-500 mb-4">
                Creating a new room will generate a unique room ID that you can share with up to 5 other students.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                <li>Real-time code collaboration</li>
                <li>Maximum 5 students per room</li>
                <li>Shareable room link</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCreateRoom}>
                <Plus className="h-4 w-4 mr-2" />
                Create Room
              </Button>
            </CardFooter>
          </Card>
          
          {/* Join Room Card */}
          <Card className="shadow-md border-2 hover:border-indigo-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-indigo-500" />
                Join an Existing Room
              </CardTitle>
              <CardDescription>
                Enter a room ID to join an existing collaborative session
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-500 mb-4">
                Ask your peer for their room ID and enter it below to join their collaborative coding session.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="roomId" className="text-sm font-medium">
                    Room ID
                  </label>
                  <Input
                    id="roomId"
                    placeholder="Enter room ID (e.g., ABC123)"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleJoinRoom}
                disabled={!roomId}
              >
                <Users className="h-4 w-4 mr-2" />
                Join Room
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Collaborative;
