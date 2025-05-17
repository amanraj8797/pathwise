
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { technologies } from "@/data/technologies";

// Create search suggestions based on our technologies
const techSuggestions = technologies.map(tech => tech.title);

export const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = techSuggestions.filter(
        (tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    // Find the technology by title and navigate to its path
    const tech = technologies.find(t => t.title === suggestion);
    if (tech) {
      navigate(`/path/${tech.id}`);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Try to find a matching technology
      const tech = technologies.find(t => 
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (tech) {
        navigate(`/path/${tech.id}`);
      } else {
        // If no exact match, use the search term as a path ID
        const path = searchTerm.toLowerCase().replace(/\s+/g, "-");
        navigate(`/path/${path}`);
      }
    }
  };

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight hero-gradient bg-clip-text text-transparent">
          Your Personalized Learning Journey Starts Here
        </h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Discover the perfect path to master any technology. Learn, track progress,
          and compete with others in your learning journey.
        </p>
        <div className="max-w-xl mx-auto relative" ref={searchRef}>
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search for any technology or topic..."
            className="w-full pl-12 pr-4 py-3 rounded-full border bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button 
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary hover:bg-primary/90 transition-all"
            onClick={handleSearch}
          >
            Explore
          </Button>
          
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 border">
              <ul className="py-2 max-h-60 overflow-y-auto text-left">
                {filteredSuggestions.map((suggestion, index) => (
                  <li 
                    key={index} 
                    className="px-4 py-2 hover:bg-muted cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="mt-12 flex items-center justify-center space-x-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">1000+</p>
            <p className="text-sm text-muted-foreground">Learning Paths</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">50K+</p>
            <p className="text-sm text-muted-foreground">Active Learners</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">95%</p>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};
