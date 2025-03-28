import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import { useAuth } from "@/lib/auth-context";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/client/Index";
import Login from "./pages/client/Login";
import SignUp from "./pages/client/SignUp";
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Items from "./pages/admin/Items";
import SellerApplications from "./pages/admin/SellerApplications";
import AuctionApprovals from "./pages/admin/AuctionApprovals";
import AuctionsPage from "./pages/client/AuctionsPage";
import AuctionPage from "./pages/client/AuctionPage";
import ArtistsPage from "./pages/client/ArtistsPage";
import ArtistDetailPage from "./pages/client/ArtistDetailPage";
import AboutPage from "./pages/client/AboutPage";
import NotFound from "./pages/client/NotFound";
import ForgotPassword from "./pages/client/ForgotPassword";
import ResetPassword from "./pages/client/ResetPassword";
import SellerApplication from "./pages/client/SellerApplication";
import SellerDashboard from "./pages/seller/Dashboard";
import AdminProfile from "./pages/admin/Profile";
import ClientProfile from "./pages/client/Profile";
import SellerProfile from "./pages/seller/Profile";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
});

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/auctions" element={<AuctionsPage />} />
      <Route path="/artwork/:id" element={<AuctionPage />} />
      <Route path="/artists" element={<ArtistsPage />} />
      <Route path="/artist/:id" element={<ArtistDetailPage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Client Protected Routes */}
      <Route
        path="/client/profile"
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <ClientProfile />
          </ProtectedRoute>
        }
      />

      {/* Seller Protected Routes */}
      <Route
        path="/seller/dashboard"
        element={
          <ProtectedRoute allowedRoles={['seller']}>
            <SellerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/profile"
        element={
          <ProtectedRoute allowedRoles={['seller']}>
            <SellerProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller-application"
        element={
          <ProtectedRoute>
            <SellerApplication />
          </ProtectedRoute>
        }
      />

      {/* Admin Protected Routes */}
      {user?.role?.toLowerCase() === 'admin' && (
        <>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/items"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Items />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/seller-applications"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <SellerApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/auction-approvals"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AuctionApprovals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminProfile />
              </ProtectedRoute>
            }
          />
        </>
      )}

      {/* Fallback Routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;