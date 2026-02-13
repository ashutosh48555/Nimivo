import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useAuthStore } from '@/store/authStore';
import CustomerLayout from '@/layouts/CustomerLayout';
import ProviderLayout from '@/layouts/ProviderLayout';
import ToastContainer from '@/components/shared/ToastContainer';

// Lazy-loaded pages
const HomePage = lazy(() => import('@/pages/customer/HomePage'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const BookingPage = lazy(() => import('@/pages/customer/BookingPage'));
const TrackingPage = lazy(() => import('@/pages/customer/TrackingPage'));
const HistoryPage = lazy(() => import('@/pages/customer/HistoryPage'));
const ProviderDashboard = lazy(() => import('@/pages/provider/ProviderDashboard'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-sm text-slate-500">Loading...</p>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function App() {
  const loadUser = useAuthStore((s) => s.loadUser);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (token) loadUser();
  }, []);

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* CUSTOMER PORTAL */}
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/login"
              element={
                <GuestRoute>
                  <LoginPage />
                </GuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <RegisterPage />
                </GuestRoute>
              }
            />

            <Route
              path="/book"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book/:serviceId"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/track/:bookingId"
              element={
                <ProtectedRoute>
                  <TrackingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <HistoryPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* PROVIDER PORTAL */}
          <Route path="/provider" element={
            <ProtectedRoute>
              <ProviderLayout />
            </ProtectedRoute>
          }>
            <Route index element={<ProviderDashboard />} />
            {/* Add more provider routes here later */}
          </Route>

          {/* ADMIN PORTAL (Uses Provider Layout for now or create separate) */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <ProviderLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
