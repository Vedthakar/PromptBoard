import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { PromptCard } from "@/components/PromptCard";
import { useBoards } from "@/contexts/BoardContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Layers, Upload } from "lucide-react";
import { Prompt } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

const BoardDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { boards, prompts, mindMaps, questions, addMindMap, addQuestion } =
    useBoards();
  const { user } = useAuth();

  const board = boards.find((b) => b.slug === slug);

  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [modelFilter, setModelFilter] = useState<string>("All");

  // Mind Map form state
  const [mindMapFile, setMindMapFile] = useState<File | null>(null);
  const [mindMapTitle, setMindMapTitle] = useState("");
  const [mindMapDescription, setMindMapDescription] = useState("");

  // Question form state
  const [questionText, setQuestionText] = useState("");
  const [questionTag, setQuestionTag] = useState<string>("");

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

  const boardMindMaps = mindMaps.filter((m) => m.boardSlug === slug);
  const boardQuestions = questions.filter((q) => q.boardSlug === slug);

  const handleMindMapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mindMapFile || !mindMapTitle || !slug) return;

    const imageUrl = URL.createObjectURL(mindMapFile);
    addMindMap({
      boardSlug: slug,
      title: mindMapTitle,
      description: mindMapDescription,
      imageUrl,
    });

    setMindMapFile(null);
    setMindMapTitle("");
    setMindMapDescription("");
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || !slug) return;

    addQuestion({
      boardSlug: slug,
      text: questionText,
      tag: questionTag || undefined,
    });

    setQuestionText("");
    setQuestionTag("");
  };

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

          {/* Tabs */}
          <Tabs defaultValue="prompts" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="prompts">Prompts</TabsTrigger>
              <TabsTrigger value="mindmaps">Mind Maps</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
            </TabsList>

            {/* Prompts Tab */}
            <TabsContent value="prompts">
              {/* Filter Bar */}
              <div className="bg-card border border-border rounded-lg p-4 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">
                      Category
                    </label>
                    <Select
                      value={categoryFilter}
                      onValueChange={setCategoryFilter}
                    >
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
                    <Select
                      value={modelFilter}
                      onValueChange={setModelFilter}
                    >
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
                  Showing {filteredPrompts.length} of {boardPrompts.length}{" "}
                  prompts
                </div>
              </div>

              {/* Prompts Grid */}
              {filteredPrompts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredPrompts.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      prompt={prompt}
                      showBoard={false}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    No prompts match your filters. Try adjusting your selection.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Mind Maps Tab */}
            <TabsContent value="mindmaps">
              {user ? (
                <Card className="p-6 mb-8 border-border">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Mind Map
                  </h2>
                  <form onSubmit={handleMindMapSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="mindmap-file">Image File</Label>
                      <Input
                        id="mindmap-file"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setMindMapFile(e.target.files?.[0] || null)
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="mindmap-title">Title</Label>
                      <Input
                        id="mindmap-title"
                        value={mindMapTitle}
                        onChange={(e) => setMindMapTitle(e.target.value)}
                        placeholder="Enter mind map title"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="mindmap-description">
                        Description (optional)
                      </Label>
                      <Textarea
                        id="mindmap-description"
                        value={mindMapDescription}
                        onChange={(e) =>
                          setMindMapDescription(e.target.value)
                        }
                        placeholder="Describe your mind map"
                        rows={3}
                      />
                    </div>

                    <Button type="submit">Add Mind Map</Button>
                  </form>
                </Card>
              ) : (
                <Card className="p-6 mb-8 border-border">
                  <p className="text-sm text-muted-foreground">
                    Sign in to upload mind maps to this board.
                  </p>
                </Card>
              )}

              {boardMindMaps.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {boardMindMaps.map((mindMap) => (
                    <Card
                      key={mindMap.id}
                      className="overflow-hidden border-border card-hover"
                    >
                      <img
                        src={mindMap.imageUrl}
                        alt={mindMap.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-1">
                          {mindMap.title}
                        </h3>
                        {mindMap.description && (
                          <p className="text-sm text-muted-foreground">
                            {mindMap.description}
                          </p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    No mind maps uploaded yet.
                    {user ? " Upload your first one above!" : " Sign in to add one."}
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Questions Tab */}
            <TabsContent value="questions">
              {user ? (
                <Card className="p-6 mb-8 border-border">
                  <h2 className="text-xl font-bold mb-4">Ask a Question</h2>
                  <form onSubmit={handleQuestionSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="question-text">Your question</Label>
                      <Textarea
                        id="question-text"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        placeholder="What would you like to ask?"
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="question-tag">Tag (optional)</Label>
                      <Select
                        value={questionTag}
                        onValueChange={setQuestionTag}
                      >
                        <SelectTrigger id="question-tag">
                          <SelectValue placeholder="Select a tag" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="concept">Concept</SelectItem>
                          <SelectItem value="assignment">
                            Assignment-style
                          </SelectItem>
                          <SelectItem value="exam">Exam practice</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit">Post Question</Button>
                  </form>
                </Card>
              ) : (
                <Card className="p-6 mb-8 border-border">
                  <p className="text-sm text-muted-foreground">
                    Sign in to ask questions on this board.
                  </p>
                </Card>
              )}

              {boardQuestions.length > 0 ? (
                <div className="space-y-4">
                  {boardQuestions.map((question) => (
                    <Card key={question.id} className="p-5 border-border">
                      <p className="mb-3">{question.text}</p>
                      <div className="flex items-center gap-2">
                        {question.tag && (
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {question.tag}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          Just now
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    No questions yet.
                    {user ? " Be the first to ask!" : " Sign in to ask a question."}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
