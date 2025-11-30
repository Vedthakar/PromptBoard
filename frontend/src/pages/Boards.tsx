import { Navbar } from "@/components/Navbar";
import { BoardCard } from "@/components/BoardCard";
import { useBoards } from "@/contexts/BoardContext";
import { Layers, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Analytics } from "@vercel/analytics/next"

const Boards = () => {
  const { boards } = useBoards();
  const { user } = useAuth();

  // 👇 if logged in: see all boards; if logged out: only public
  const visibleBoards = user
    ? boards
    : boards.filter((b) => b.visibility === "public");

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">Boards</h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Browse all prompt collections organized by topic, course, or use
                case. Each board contains curated prompts to help you work more
                effectively.
              </p>
            </div>

            {user && (
              <Button size="sm" className="mt-4 md:mt-0">
                <Plus className="h-4 w-4 mr-2" />
                New board
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleBoards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boards;
