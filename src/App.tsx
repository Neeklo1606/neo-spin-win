import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LazyMotion } from "framer-motion";
import { CartProvider } from "@/contexts/CartContext";
import { lazy, Suspense } from "react";
import Index from "./pages/Index.tsx";

const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const loadCheckout = () => import("./pages/Checkout.tsx");
const loadProfile = () => import("./pages/Profile.tsx");
const Checkout = lazy(loadCheckout);
const Profile = lazy(loadProfile);
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

// Warm up customer pages once the home page is idle, so cart → checkout is instant.
if (typeof window !== "undefined") {
  const warm = () => {
    loadCheckout();
    loadProfile();
  };
  const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void }).requestIdleCallback;
  if (ric) ric(warm, { timeout: 4000 });
  else setTimeout(warm, 2500);
}

const loadMotionFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

const App = () => (
  <LazyMotion features={loadMotionFeatures}>
      <CartProvider>
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
  </LazyMotion>
);

export default App;
