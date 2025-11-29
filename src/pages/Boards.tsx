import { Navbar } from "@/components/Navbar";
import { BoardCard } from "@/components/BoardCard";
import { boards } from "@/data/mockData";
import { Layers } from "lucide-react";

const Boards = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
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

          {/* Boards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {boards.map((board) => (
              <BoardCard key={board.slug} board={board} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boards;
