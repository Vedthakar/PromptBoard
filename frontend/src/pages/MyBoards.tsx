import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useBoards } from "@/contexts/BoardContext";
import { ArrowRight, Lock, Globe } from "lucide-react";

const MyBoards = () => {
  const { boards, addBoard, currentUserId } = useBoards();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
    addBoard({
      slug,
      name,
      description,
      visibility: isPublic ? "public" : "private",
      ownerId: currentUserId,
    });

    setName("");
    setDescription("");
    setIsPublic(true);
  };

  const myBoards = boards.filter((b) => b.ownerId === currentUserId);
  const privateBoards = myBoards.filter((b) => b.visibility === "private");

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">My Boards</h1>
            <p className="text-lg text-muted-foreground">
              Create boards, keep private collections, or publish them to everyone.
            </p>
          </div>

          {/* Create Board Form */}
          <Card className="p-6 mb-10 border-border">
            <h2 className="text-xl font-bold mb-4">Create Board</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="board-name">Board Name</Label>
                <Input
                  id="board-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter board name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="board-description">Description</Label>
                <Textarea
                  id="board-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your board"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  {isPublic ? (
                    <Globe className="h-5 w-5 text-primary" />
                  ) : (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <Label htmlFor="visibility" className="cursor-pointer">
                      {isPublic ? "Public" : "Private"}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {isPublic
                        ? "Everyone can see this board"
                        : "Only you can see this board"}
                    </p>
                  </div>
                </div>
                <Switch
                  id="visibility"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
              </div>

              <Button type="submit" className="w-full">
                Create Board
              </Button>
            </form>
          </Card>

          {/* My Boards Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-5">My Boards</h2>
            {myBoards.length === 0 ? (
              <p className="text-muted-foreground">
                You haven't created any boards yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {myBoards.map((board) => (
                  <Card key={board.id} className="p-5 border-border card-hover">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold mb-1">{board.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {board.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          board.visibility === "public" ? "default" : "secondary"
                        }
                      >
                        {board.visibility === "public" ? (
                          <Globe className="h-3 w-3 mr-1" />
                        ) : (
                          <Lock className="h-3 w-3 mr-1" />
                        )}
                        {board.visibility}
                      </Badge>
                      <Button variant="ghost" size="sm" asChild>
                        <Link
                          to={`/boards/${board.slug}`}
                          className="flex items-center gap-1"
                        >
                          Open board
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* My Private Collections */}
          <div>
            <h2 className="text-2xl font-bold mb-2">My Private Collections</h2>
            <p className="text-sm text-muted-foreground mb-5">
              Private boards are only visible to you and great for saving your own
              prompts.
            </p>
            {privateBoards.length === 0 ? (
              <p className="text-muted-foreground">
                You don't have any private boards.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {privateBoards.map((board) => (
                  <Card key={board.id} className="p-5 border-border card-hover">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold mb-1">{board.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {board.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        <Lock className="h-3 w-3 mr-1" />
                        Private
                      </Badge>
                      <Button variant="ghost" size="sm" asChild>
                        <Link
                          to={`/boards/${board.slug}`}
                          className="flex items-center gap-1"
                        >
                          Open board
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBoards;
