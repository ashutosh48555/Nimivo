import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useAuthStore } from '@/store/authStore';
import { setAuthToken } from '@/lib/api';
import { connectSocket, disconnectSocket } from '@/lib/socket';
import CustomerLayout from '@/layouts/CustomerLayout';
import ProviderLayout from '@/layouts/ProviderLayout';
import ToastContainer from '@/components/shared/ToastContainer';

// Lazy-loaded pages
const AccessPage = lazy(() => import('@/pages/auth/AccessPage'));
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
        <div className="w-10 h-10 border-4 border-blue-200 border-t-fp-blue-600 rounded-full animate-spin" />
        <p className="text-sm text-slate-500">Loading...</p>
      </div>
    </div>
  );
}

function ClerkAuthSync() {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const { user: clerkUser } = useUser();
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    if (!isLoaded) {
      setLoading(true);
      return;
    }
    setLoading(false);

    if (isSignedIn && clerkUser) {
      const role = (clerkUser.unsafeMetadata?.role as string) || 'customer';
      setUser({
        id: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        phone: clerkUser.primaryPhoneNumber?.phoneNumber || '',
        fullName:
          clerkUser.fullName ||
          `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() ||
          'User',
        role: role as 'customer' | 'provider' | 'admin',
        createdAt: clerkUser.createdAt
          ? new Date(clerkUser.createdAt).toISOString()
          : new Date().toISOString(),
        updatedAt: clerkUser.updatedAt
          ? new Date(clerkUser.updatedAt).toISOString()
          : new Date().toISOString(),
      });

      getToken().then((token) => {
        if (token) {
          setAuthToken(token);
          connectSocket(token);
        }
      });
    } else {
      setUser(null);
      setAuthToken(null);
      disconnectSocket();
    }
  }, [isSignedIn, isLoaded, clerkUser]);

  return null;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) return <PageLoader />;
  if (!isSignedIn) return <Navigate to="/access" replace />;
  return <>{children}</>;
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) return <PageLoader />;
  if (isSignedIn) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function App() {
  return (
    <>
      <ClerkAuthSync />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* CUSTOMER PORTAL */}
          {/* Access / Role Selection (outside layout for full-width) */}
          <Route
            path="/access"
            element={
              <GuestRoute>
                <AccessPage />
              </GuestRoute>
            }
          />

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
