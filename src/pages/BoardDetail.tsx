import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { PromptCard } from "@/components/PromptCard";
import { boards, prompts } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Layers } from "lucide-react";
import { Prompt } from "@/types";

const BoardDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const board = boards.find((b) => b.slug === slug);

  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [modelFilter, setModelFilter] = useState<string>("All");

  if (!board) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Board not found</h1>
          <Button asChild>
            <Link to="/boards">Back to Boards</Link>
          </Button>
        </div>
      </div>
    );
  }

  const boardPrompts = prompts.filter((p) => p.boardSlug === slug);

  const filteredPrompts = boardPrompts.filter((prompt) => {
    const matchesCategory =
      categoryFilter === "All" || prompt.category === categoryFilter;
    const matchesModel =
      modelFilter === "All" || prompt.model === modelFilter;
    return matchesCategory && matchesModel;
  });

  const categories: Array<Prompt["category"] | "All"> = [
    "All",
    "Study",
    "Resume",
    "Coding",
    "Image",
    "General",
  ];
  const models: Array<Prompt["model"] | "All"> = [
    "All",
    "GPT",
    "Gemini",
    "Claude",
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/boards" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Boards
            </Link>
          </Button>

          {/* Board Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{board.name}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {board.description}
            </p>
          </div>

          {/* Filter Bar */}
          <div className="bg-card border border-border rounded-lg p-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">
                  Category
                </label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">
                  Model
                </label>
                <Select value={modelFilter} onValueChange={setModelFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by model" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredPrompts.length} of {boardPrompts.length} prompts
            </div>
          </div>

          {/* Prompts Grid */}
          {filteredPrompts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} showBoard={false} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No prompts match your filters. Try adjusting your selection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
