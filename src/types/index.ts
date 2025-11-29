export interface Board {
  slug: string;
  name: string;
  description: string;
  promptCount: number;
}

export interface Prompt {
  id: string;
  title: string;
  boardSlug: string;
  category: "Study" | "Resume" | "Coding" | "Image" | "General";
  model: "GPT" | "Gemini" | "Claude";
  description: string;
}
