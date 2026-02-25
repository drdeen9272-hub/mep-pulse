import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Dashboard
import DashboardOverview from "./pages/dashboard/Overview";
import Epidemiology from "./pages/dashboard/Epidemiology";
import Entomology from "./pages/dashboard/Entomology";
import Diagnostics from "./pages/dashboard/Diagnostics";
import Commodities from "./pages/dashboard/Commodities";
import Chemoprevention from "./pages/dashboard/Chemoprevention";
import Financing from "./pages/dashboard/Financing";
import DataQuality from "./pages/dashboard/DataQuality";
import WMR2025 from "./pages/dashboard/WMR2025";
import MIS2021 from "./pages/dashboard/MIS2021";

// Surveillance
import CaseBased from "./pages/surveillance/CaseBased";
import Aggregate from "./pages/surveillance/Aggregate";
import OutbreakDetection from "./pages/surveillance/OutbreakDetection";
import PPMVNetwork from "./pages/surveillance/PPMVNetwork";

// Applications
import Authentication from "./pages/applications/Authentication";
import RDTReader from "./pages/applications/RDTReader";
import Surveys from "./pages/applications/Surveys";
import AISHAChat from "./pages/applications/AISHAChat";
import WhatsAppBot from "./pages/applications/WhatsAppBot";
import Transfers from "./pages/applications/Transfers";

// Reports
import ExportData from "./pages/reports/ExportData";
import AutomatedReports from "./pages/reports/AutomatedReports";
import CustomAnalysis from "./pages/reports/CustomAnalysis";

import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/dashboard/epidemiology" element={<Epidemiology />} />
            <Route path="/dashboard/entomology" element={<Entomology />} />
            <Route path="/dashboard/diagnostics" element={<Diagnostics />} />
            <Route path="/dashboard/commodities" element={<Commodities />} />
            <Route path="/dashboard/chemoprevention" element={<Chemoprevention />} />
            <Route path="/dashboard/financing" element={<Financing />} />
            <Route path="/dashboard/data-quality" element={<DataQuality />} />
            <Route path="/dashboard/wmr-2025" element={<WMR2025 />} />
            <Route path="/dashboard/mis-2021" element={<MIS2021 />} />

            {/* Surveillance */}
            <Route path="/surveillance/case-based" element={<CaseBased />} />
            <Route path="/surveillance/aggregate" element={<Aggregate />} />
            <Route path="/surveillance/outbreak-detection" element={<OutbreakDetection />} />
            <Route path="/surveillance/ppmv-network" element={<PPMVNetwork />} />

            {/* Applications */}
            <Route path="/applications/authentication" element={<Authentication />} />
            <Route path="/applications/rdt-reader" element={<RDTReader />} />
            <Route path="/applications/surveys" element={<Surveys />} />
            <Route path="/applications/aisha-chat" element={<AISHAChat />} />
            <Route path="/applications/whatsapp" element={<WhatsAppBot />} />
            <Route path="/applications/transfers" element={<Transfers />} />

            {/* Reports */}
            <Route path="/reports/export" element={<ExportData />} />
            <Route path="/reports/automated" element={<AutomatedReports />} />
            <Route path="/reports/custom-analysis" element={<CustomAnalysis />} />

            {/* About */}
            <Route path="/about" element={<About />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
