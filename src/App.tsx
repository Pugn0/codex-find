
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConsultaProvider } from "./contexts/ConsultaContext";
import { Navbar } from "./components/Navbar";
import Index from "./pages/Index";
import ConsultaCpf from "./pages/ConsultaCpf";
import ConsultaEmail from "./pages/ConsultaEmail";
import ConsultaTelefone from "./pages/ConsultaTelefone";
import ConsultaEndereco from "./pages/ConsultaEndereco";
import ConsultaParentesco from "./pages/ConsultaParentesco";
import ConsultaPoderAquisitivo from "./pages/ConsultaPoderAquisitivo";
import ConsultaMassa from "./pages/ConsultaMassa";
import ConsultaFiltros from "./pages/ConsultaFiltros";
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
              <Route path="/consulta/email" element={<ConsultaEmail />} />
              <Route path="/consulta/telefone" element={<ConsultaTelefone />} />
              <Route path="/consulta/endereco" element={<ConsultaEndereco />} />
              <Route path="/consulta/parentesco" element={<ConsultaParentesco />} />
              <Route path="/consulta/poder-aquisitivo" element={<ConsultaPoderAquisitivo />} />
              <Route path="/consulta/massa" element={<ConsultaMassa />} />
              <Route path="/consulta/filtros" element={<ConsultaFiltros />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ConsultaProvider>
  </QueryClientProvider>
);

export default App;
