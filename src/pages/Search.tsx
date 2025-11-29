import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { BoardCard } from "@/components/BoardCard";
import { PromptCard } from "@/components/PromptCard";
import { boards, prompts } from "@/data/mockData";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredBoards = boards.filter(
    (board) =>
      board.name.toLowerCase().includes(query.toLowerCase()) ||
      board.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPrompts = prompts.filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(query.toLowerCase()) ||
      prompt.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-muted-foreground">
            Found {filteredBoards.length} boards and {filteredPrompts.length}{" "}
            prompts
          </p>
        </div>

        {filteredBoards.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Boards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBoards.map((board) => (
                <BoardCard key={board.slug} board={board} />
              ))}
            </div>
          </section>
        )}

        {filteredPrompts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Prompts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </section>
        )}

        {filteredBoards.length === 0 && filteredPrompts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No results found for "{query}"
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
