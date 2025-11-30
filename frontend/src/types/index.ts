export type Visibility = "public" | "private";

export interface Board {
  id: string;
  slug: string;
  name: string;
  description: string;
  promptCount: number;
  visibility: Visibility;
  ownerId: string;
}

export interface Prompt {
  id: string;
  title: string;
  boardSlug: string;
  category: "Study" | "Resume" | "Coding" | "Image" | "General";
  model: "GPT" | "Gemini" | "Claude";
  description: string;
}

export interface MindMap {
  id: string;
  boardSlug: string;
  title: string;
  description?: string;
  imageUrl: string;
}

export interface Question {
  id: string;
  boardSlug: string;
  text: string;
  tag?: string;
  createdAt: string;
}
