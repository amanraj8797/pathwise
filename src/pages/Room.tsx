import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CodeEditor from "@/components/CodeEditor";
import { Users, ArrowRight, Copy, UserCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for our participants
const mockParticipants = [
  { id: "1", name: "You", isCurrentUser: true, color: "#4F46E5" },
  { id: "2", name: "Alex", color: "#10B981" },
  { id: "3", name: "Jamie", color: "#F59E0B" },
];

const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { toast } = useToast();
  const [participants, setParticipants] = useState(mockParticipants);
  const [code, setCode] = useState(`// Start coding together
function HelloWorld() {
  return 'Hello, collaborative coders!';
}

// Everyone's changes will appear in real time
// Try editing this code!`);
  const [activeEditor, setActiveEditor] = useState<string | null>(null);

  // Function to simulate code changes from other participants
  const simulateOtherUserEditing = () => {
    const otherUsers = participants.filter((p) => !p.isCurrentUser);
    if (otherUsers.length === 0) return;

    // Randomly select a user
    const randomUser =
      otherUsers[Math.floor(Math.random() * otherUsers.length)];

    // Set them as active editor
    setActiveEditor(randomUser.id);

    // After a delay, make a code change
    setTimeout(() => {
      const newComment = `\n`; // ${randomUser.name} made an edit at ${new Date().toLocaleTimeString()};
      setCode((prevCode) => prevCode + newComment);

      // After another delay, clear the active editor
      setTimeout(() => {
        setActiveEditor(null);
        toast({
          title: `${randomUser.name} made a change`,
          description: "Their edits have been applied to the code.",
        });
      }, 1000);
    }, 1000);
  };

  // Handle local user code changes
  const handleCodeChange = (newCode: string) => {
    // Set current user as active editor
    setActiveEditor(participants.find((p) => p.isCurrentUser)?.id || null);

    // Update the code
    setCode(newCode);

    // Broadcast to others (simulated)
    console.log("Broadcasting code changes to others...");
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // This simulates periodic updates
      console.log("Checking for updates...");

      // 30% chance of another user making an edit
      if (Math.random() < 0.3 && !activeEditor) {
        simulateOtherUserEditing();
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [activeEditor, participants]);

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId || "");
    toast({
      title: "Room ID copied!",
      description: "You can now share this with others to join.",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              to="/collaborative"
              className="text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
              Back
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-lg font-bold">Collaborative Room</h1>
            <Badge variant="outline" className="ml-2 px-2 py-1">
              {roomId}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyRoomId}
              className="ml-1 h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy room ID</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {participants.map((participant, i) => (
                <div
                  key={participant.id}
                  className={`rounded-full w-8 h-8 flex items-center justify-center text-white font-medium text-xs border-2 ${
                    activeEditor === participant.id
                      ? "border-yellow-400 ring-2 ring-yellow-300"
                      : "border-white"
                  }`}
                  style={{
                    backgroundColor: participant.color,
                    zIndex: participants.length - i,
                  }}
                  title={`${participant.name}${
                    activeEditor === participant.id ? " (editing)" : ""
                  }`}
                >
                  {participant.name.charAt(0)}
                </div>
              ))}
            </div>
            <Badge variant="secondary">
              <Users className="h-3 w-3 mr-1" />
              {participants.length}/5
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r p-4 flex flex-col">
          <h2 className="font-medium mb-4 flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Participants
          </h2>

          <div className="space-y-3">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  activeEditor === participant.id
                    ? "bg-yellow-50 border border-yellow-200"
                    : "hover:bg-gray-100"
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ backgroundColor: participant.color }}
                >
                  {participant.name.charAt(0)}
                </div>
                <span className="text-sm">{participant.name}</span>
                {participant.isCurrentUser && (
                  <Badge variant="outline" className="ml-auto text-xs">
                    You
                  </Badge>
                )}
                {activeEditor === participant.id && (
                  <Badge
                    variant="outline"
                    className="ml-auto text-xs bg-yellow-100 text-yellow-800 border-yellow-200"
                  >
                    Editing...
                  </Badge>
                )}
              </div>
            ))}
          </div>

          <div className="mt-auto pt-4">
            <p className="text-xs text-gray-500 mb-2">Room ID:</p>
            <div className="flex items-center space-x-2">
              <code className="text-xs bg-gray-100 p-2 rounded flex-1 overflow-x-auto">
                {roomId}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyRoomId}
                className="h-8 w-8 p-0"
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy room ID</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-2 bg-gray-800 text-white text-sm flex justify-between items-center">
            <span>main.js</span>
            <div className="flex items-center space-x-2">
              {activeEditor && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-yellow-200 text-yellow-800"
                >
                  {participants.find((p) => p.id === activeEditor)?.name ||
                    "Someone"}{" "}
                  is editing...
                </Badge>
              )}
              <Badge variant="secondary" className="text-xs">
                Real-time collaboration
              </Badge>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor
              value={code}
              onChange={handleCodeChange}
              language="javascript"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
