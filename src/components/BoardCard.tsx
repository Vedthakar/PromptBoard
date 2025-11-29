import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight, Layers } from "lucide-react";
import { Board } from "@/types";

interface BoardCardProps {
  board: Board;
}

export const BoardCard = ({ board }: BoardCardProps) => {
  return (
    <Card className="p-6 card-hover border-border bg-card">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <Layers className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{board.name}</h3>
          <p className="text-muted-foreground text-sm mb-4">
            {board.description}
          </p>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="font-medium">
              {board.promptCount} prompts
            </Badge>
            <Button variant="ghost" size="sm" asChild>
              <Link
                to={`/boards/${board.slug}`}
                className="flex items-center gap-1"
              >
                View board
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
