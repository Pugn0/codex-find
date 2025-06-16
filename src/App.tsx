
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConsultaProvider } from "./contexts/ConsultaContext";
import { Navbar } from "./components/Navbar";
import Index from "./pages/Index";
import ConsultaCpf from "./pages/ConsultaCpf";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConsultaProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen w-full">
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/consulta/cpf" element={<ConsultaCpf />} />
              {/* Adicionar outras rotas conforme necessário */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ConsultaProvider>
  </QueryClientProvider>
);

export default App;
