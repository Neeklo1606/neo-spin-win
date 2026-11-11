import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { lazy, Suspense } from "react";
import Index from "./pages/Index.tsx";
const Profile = lazy(() => import("./pages/Profile.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Checkout = lazy(() => import("./pages/Checkout.tsx"));
const AdminLogin = lazy(() => import("./admin/pages/Login.tsx"));
const AdminLayout = lazy(() => import("./admin/components/AdminLayout.tsx"));
const ProtectedRoute = lazy(() => import("./admin/components/ProtectedRoute.tsx"));
const AdminDashboard = lazy(() => import("./admin/pages/Dashboard.tsx"));
const AdminOrders = lazy(() => import("./admin/pages/Orders.tsx"));
const AdminProducts = lazy(() => import("./admin/pages/Products.tsx"));
const AdminUsers = lazy(() => import("./admin/pages/Users.tsx"));
const AdminBroadcast = lazy(() => import("./admin/pages/Broadcast.tsx"));
const AdminBotSettings = lazy(() => import("./admin/pages/BotSettings.tsx"));
const AdminContent = lazy(() => import("./admin/pages/Content.tsx"));
const AdminDocs = lazy(() => import("./admin/pages/AdminDocs.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={<Navigate to="/admin/login" replace />}
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminOrders />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminProducts />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminUsers />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/broadcast"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminBroadcast />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
                <Route
                  path="/admin/bot-settings"
                  element={
                    <ProtectedRoute>
                      <AdminLayout>
                        <AdminBotSettings />
                      </AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/content"
                  element={
                    <ProtectedRoute>
                      <AdminLayout>
                        <AdminContent />
                      </AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/docs"
                  element={
                    <ProtectedRoute>
                      <AdminLayout>
                        <AdminDocs />
                      </AdminLayout>
                    </ProtectedRoute>
                  }
                />
                
                <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
