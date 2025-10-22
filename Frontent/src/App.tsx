import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Appointment from "./pages/Appointment";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Pharmacy from "./pages/Admin/Pharmacy";
import Ward from "./pages/Admin/Ward";
import PatientDashboard from "./pages/Patient/PatientDashboard";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/ward" element={<Ward />} />

          <Route path="/patientdashboard" element={<PatientDashboard />} />
          <Route path="/doctordashboard" element={<DoctorDashboard />} />

          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
