// src/types/index.ts

export type PromptCategory = "Study" | "Resume" | "Coding" | "Image" | "General";
export type PromptModel = "GPT" | "Gemini" | "Claude";

export interface Board {
  id: string;
  name: string;
  slug: string;
  description: string;
  promptCount: number;
  visibility: "public" | "private";
  ownerId: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  body: string; // ✅ NEW: full prompt text
  model: PromptModel;
  category: PromptCategory;
  courseCode?: string;
  difficulty?: string;
  boardSlug: string;
}

export interface MindMap {
  id: string;
  boardSlug: string;
  title: string;
  description?: string;
  imageUrl: string;
}

export type QuestionTag = "concept" | "assignment" | "exam";

export interface Question {
  id: string;
  boardSlug: string;
  text: string;
  tag?: QuestionTag;
  createdAt: string;
}
