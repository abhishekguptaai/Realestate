import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AgentSidebar from "@/components/dashboard/AgentSidebar";

export default function AgentLayout() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || (user?.role !== "agent" && user?.role !== "admin")) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex bg-background">
      <AgentSidebar />
      <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
