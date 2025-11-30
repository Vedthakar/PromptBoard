// src/contexts/BoardContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { Board, Prompt, MindMap, Question } from "@/types";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

interface BoardContextType {
  boards: Board[];
  prompts: Prompt[];
  mindMaps: MindMap[];
  questions: Question[];
  addBoard: (board: Omit<Board, "id" | "promptCount">) => Promise<void>;
  addPrompt: (data: {
    boardSlug: string;
    title: string;
    description: string;
    body: string;
    model: Prompt["model"];
    category: Prompt["category"];
    courseCode?: string;
    difficulty?: string;
  }) => Promise<void>;
  addMindMap: (mindMap: Omit<MindMap, "id">) => void;
  addQuestion: (question: Omit<Question, "id" | "createdAt">) => void;
  currentUserId: string;
  isSignedIn: boolean;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [mindMaps, setMindMaps] = useState<MindMap[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  // fake id for now – real auth later
  const currentUserId = "user-1";
  const isSignedIn = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // boards
        const boardsRes = await fetch(`${API_BASE}/api/boards/`);
        if (boardsRes.ok) {
          const data = await boardsRes.json();
          const mappedBoards: Board[] = data.map((b: any) => ({
            id: String(b.id),
            name: b.name,
            slug: b.slug,
            description: b.description ?? "",
            promptCount: b.prompt_count ?? 0,
            visibility: "public",
            ownerId: currentUserId, // UI-only for now
          }));
          setBoards(mappedBoards);
        }

        // prompts
        const promptsRes = await fetch(`${API_BASE}/api/prompts/`);
        if (promptsRes.ok) {
          const data = await promptsRes.json();
          const mappedPrompts: Prompt[] = data.map((p: any) => ({
            id: String(p.id),
            title: p.title,
            description: p.description ?? "",
            body: p.body,
            model: p.model,
            category: p.category,
            courseCode: p.course_code ?? "",
            difficulty: p.difficulty ?? "",
            boardSlug: p.board?.slug ?? "",
          }));
          setPrompts(mappedPrompts);
        }
      } catch (err) {
        console.error("Error fetching boards/prompts", err);
      }
    };

    fetchData();
  }, []);

  // create board in backend
  const addBoard = async (board: Omit<Board, "id" | "promptCount">) => {
    try {
      const res = await fetch(`${API_BASE}/api/boards/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: board.name,
          description: board.description,
        }),
      });

      if (!res.ok) {
        console.error("Failed to create board:", res.status, await res.text());
        return;
      }

      const created = await res.json();

      const newBoard: Board = {
        id: String(created.id),
        name: created.name,
        slug: created.slug,
        description: created.description ?? "",
        promptCount: created.prompt_count ?? 0,
        visibility: board.visibility,
        ownerId: board.ownerId,
      };

      setBoards((prev) => [...prev, newBoard]);
    } catch (err) {
      console.error("Error creating board", err);
    }
  };

  // create prompt in backend
  const addPrompt = async (data: {
    boardSlug: string;
    title: string;
    description: string;
    body: string;
    model: Prompt["model"];
    category: Prompt["category"];
    courseCode?: string;
    difficulty?: string;
  }) => {
    try {
      const res = await fetch(`${API_BASE}/api/prompts/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          body: data.body,
          model: data.model,
          category: data.category,
          course_code: data.courseCode ?? "",
          difficulty: data.difficulty ?? "",
          board_slug: data.boardSlug,
        }),
      });

      if (!res.ok) {
        console.error("Failed to create prompt:", res.status, await res.text());
        return;
      }

      const created = await res.json();

      const newPrompt: Prompt = {
        id: String(created.id),
        title: created.title,
        description: created.description ?? "",
        body: created.body,
        model: created.model,
        category: created.category,
        courseCode: created.course_code ?? "",
        difficulty: created.difficulty ?? "",
        boardSlug: created.board?.slug ?? data.boardSlug,
      };

      setPrompts((prev) => [...prev, newPrompt]);
    } catch (err) {
      console.error("Error creating prompt", err);
    }
  };

  const addMindMap = (mindMap: Omit<MindMap, "id">) => {
    const newMindMap: MindMap = {
      ...mindMap,
      id: `mindmap-${Date.now()}`,
    };
    setMindMaps((prev) => [...prev, newMindMap]);
  };

  const addQuestion = (question: Omit<Question, "id" | "createdAt">) => {
    const newQuestion: Question = {
      ...question,
      id: `question-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setQuestions((prev) => [...prev, newQuestion]);
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        prompts,
        mindMaps,
        questions,
        addBoard,
        addPrompt,
        addMindMap,
        addQuestion,
        currentUserId,
        isSignedIn,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoards = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoards must be used within BoardProvider");
  }
  return context;
};
