import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { BoardCard } from "@/components/BoardCard";
import { PromptCard } from "@/components/PromptCard";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { useBoards } from "@/contexts/BoardContext";
import { ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  const { boards, prompts } = useBoards();
  const publicBoards = boards.filter((b) => b.visibility === "public");
  const popularBoards = publicBoards.slice(0, 4);
  const latestPrompts = prompts.slice(0, 8);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI-Powered Prompt Marketplace
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Share and discover{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                powerful AI prompts
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              Boards for courses, careers, and creative use cases. Find the
              perfect prompt or share your own.
            </p>

            <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-250">
              <SearchBar variant="hero" />
            </div>

            <div className="flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <Button size="lg" asChild className="group">
                <Link to="/boards" className="flex items-center gap-2">
                  Browse boards
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/boards">View marketplace</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Boards Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Popular Boards
              </h2>
              <p className="text-muted-foreground">
                Explore curated collections of prompts
              </p>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/boards" className="flex items-center gap-1">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularBoards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Prompts Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Latest Prompts
            </h2>
            <p className="text-muted-foreground">
              Discover recently added prompts from the community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {latestPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 PromptBoards. Built with React + Vite.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
