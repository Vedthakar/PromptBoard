import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  variant?: "navbar" | "hero";
}

export const SearchBar = ({ variant = "navbar" }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (variant === "hero") {
    return (
      <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search prompts and boards..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          <Button type="submit" size="lg" className="px-6">
            Search
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 w-64"
        />
      </div>
    </form>
  );
};
