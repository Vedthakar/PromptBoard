import React, { createContext, useContext, useState, ReactNode } from "react";
import { Board, Prompt, MindMap, Question } from "@/types";
import { boards as initialBoards, prompts as initialPrompts } from "@/data/mockData";

interface BoardContextType {
  boards: Board[];
  prompts: Prompt[];
  mindMaps: MindMap[];
  questions: Question[];
  addBoard: (board: Omit<Board, "id" | "promptCount">) => void;
  addMindMap: (mindMap: Omit<MindMap, "id">) => void;
  addQuestion: (question: Omit<Question, "id" | "createdAt">) => void;
  currentUserId: string;
  isSignedIn: boolean;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [boards, setBoards] = useState<Board[]>(initialBoards);
  const [prompts] = useState<Prompt[]>(initialPrompts);
  const [mindMaps, setMindMaps] = useState<MindMap[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const currentUserId = "user-1";
  const isSignedIn = true;

  const addBoard = (board: Omit<Board, "id" | "promptCount">) => {
    const newBoard: Board = {
      ...board,
      id: `board-${Date.now()}`,
      promptCount: 0,
    };
    setBoards((prev) => [...prev, newBoard]);
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
