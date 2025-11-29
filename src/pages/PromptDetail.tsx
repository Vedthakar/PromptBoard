import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { prompts, boards } from "@/data/mockData";
import { ArrowLeft, Sparkle } from "lucide-react";

const PromptDetail = () => {
  const { id } = useParams<{ id: string }>();
  const prompt = prompts.find((p) => p.id === id);

  if (!prompt) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Prompt not found</h1>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const board = boards.find((b) => b.slug === prompt.boardSlug);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link
              to={`/boards/${prompt.boardSlug}`}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {board?.name}
            </Link>
          </Button>

          {/* Prompt Header */}
          <div className="bg-card border border-border rounded-xl p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                <Sparkle className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  {prompt.title}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline">{prompt.model}</Badge>
                  <Badge variant="outline">{prompt.category}</Badge>
                  {board && (
                    <Badge variant="secondary">
                      <Link to={`/boards/${board.slug}`}>{board.name}</Link>
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <p className="text-lg text-muted-foreground">
              {prompt.description}
            </p>
          </div>

          {/* Prompt Content (Placeholder) */}
          <div className="bg-muted/30 border border-border rounded-xl p-8">
            <h2 className="text-xl font-bold mb-4">Prompt Details</h2>
            <p className="text-muted-foreground mb-4">
              This is a placeholder for the full prompt content. In a real
              application, this would display:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Complete prompt text and instructions</li>
              <li>Usage examples and best practices</li>
              <li>Expected outputs and results</li>
              <li>Tips for customization</li>
            </ul>

            <div className="mt-8 pt-8 border-t border-border">
              <Button className="w-full sm:w-auto">Copy Prompt</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptDetail;
