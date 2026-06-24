import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";
import AgentLayout from "./layouts/AgentLayout";

// Public Pages
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Agents from "./pages/Agents";
import AgentProfile from "./pages/AgentProfile";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FinancialTools from "./pages/FinancialTools";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Dashboard
import UserDashboard from "./pages/dashboard/UserDashboard";
import SavedProperties from "./pages/dashboard/SavedProperties";
import CompareProperties from "./pages/dashboard/CompareProperties";
import MyEnquiries from "./pages/dashboard/MyEnquiries";
import SiteVisits from "./pages/dashboard/SiteVisits";
import UserProfile from "./pages/dashboard/UserProfile";

// Agent Dashboard
import AgentDashboard from "./pages/agent/AgentDashboard";
import AgentListings from "./pages/agent/AgentListings";
import AddProperty from "./pages/agent/AddProperty";
import AgentLeads from "./pages/agent/AgentLeads";
import AgentAppointments from "./pages/agent/AgentAppointments";
import AgentAnalytics from "./pages/agent/AgentAnalytics";
import AgentProfileSettings from "./pages/agent/AgentProfileSettings";

// Admin Dashboard
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminListings from "./pages/admin/AdminListings";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";

import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property/:slug" element={<PropertyDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:slug" element={<ProjectDetail />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agent/:id" element={<AgentProfile />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/tools" element={<FinancialTools />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User Dashboard */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/dashboard/saved" element={<SavedProperties />} />
              <Route path="/dashboard/compare" element={<CompareProperties />} />
              <Route path="/dashboard/enquiries" element={<MyEnquiries />} />
              <Route path="/dashboard/visits" element={<SiteVisits />} />
              <Route path="/dashboard/profile" element={<UserProfile />} />
            </Route>

            {/* Agent Dashboard */}
            <Route element={<AgentLayout />}>
              <Route path="/agent-dashboard" element={<AgentDashboard />} />
              <Route path="/agent-dashboard/listings" element={<AgentListings />} />
              <Route path="/agent-dashboard/add-property" element={<AddProperty />} />
              <Route path="/agent-dashboard/leads" element={<AgentLeads />} />
              <Route path="/agent-dashboard/appointments" element={<AgentAppointments />} />
              <Route path="/agent-dashboard/analytics" element={<AgentAnalytics />} />
              <Route path="/agent-dashboard/profile" element={<AgentProfileSettings />} />
            </Route>

            {/* Admin Dashboard */}
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/listings" element={<AdminListings />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/leads" element={<AdminLeads />} />
              <Route path="/admin/blog" element={<AdminBlog />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
