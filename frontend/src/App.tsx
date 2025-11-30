import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BoardProvider } from "@/contexts/BoardContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Boards from "./pages/Boards";
import BoardDetail from "./pages/BoardDetail";
import PromptDetail from "./pages/PromptDetail";
import Search from "./pages/Search";
import MyBoards from "./pages/MyBoards";
import SignIn from "./pages/SIgnIn";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import { Analytics } from "@vercel/analytics/next"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BoardProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/boards" element={<Boards />} />
              <Route path="/boards/:slug" element={<BoardDetail />} />
              <Route path="/prompts/:id" element={<PromptDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/my-boards" element={<MyBoards />} />
              <Route path="/signin" element={<SignIn />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BoardProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
