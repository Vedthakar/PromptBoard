import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Prompt } from "@/types";
import { Sparkle } from "lucide-react";

interface PromptCardProps {
  prompt: Prompt;
  showBoard?: boolean;
}

const modelColors: Record<Prompt["model"], string> = {
  GPT: "bg-primary/10 text-primary border-primary/20",
  Gemini: "bg-accent/10 text-accent border-accent/20",
  Claude: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

const categoryColors: Record<Prompt["category"], string> = {
  Study: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Resume: "bg-green-500/10 text-green-600 border-green-500/20",
  Coding: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  Image: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  General: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

export const PromptCard = ({ prompt, showBoard = true }: PromptCardProps) => {
  return (
    <Card className="p-5 card-hover border-border bg-card group cursor-pointer">
      <Link to={`/prompts/${prompt.id}`} className="block">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 rounded-md bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform">
            <Sparkle className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
              {prompt.title}
            </h4>
            {showBoard && (
              <p className="text-xs text-muted-foreground mb-2">
                from {prompt.boardSlug.replace("-", " ")}
              </p>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {prompt.description}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className={modelColors[prompt.model]}>
            {prompt.model}
          </Badge>
          <Badge
            variant="outline"
            className={categoryColors[prompt.category]}
          >
            {prompt.category}
          </Badge>
        </div>
      </Link>
    </Card>
  );
};
