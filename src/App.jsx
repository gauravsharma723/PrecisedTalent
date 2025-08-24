
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import AboutUsPage from '@/pages/AboutUsPage';
import EmployersPage from '@/pages/EmployersPage';
import JobSeekersPage from '@/pages/JobSeekersPage';
import JobDetailsPage from '@/pages/JobDetailsPage';
import ContactUsPage from '@/pages/ContactUsPage';
import LoginPage from '@/pages/LoginPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import SignUpPage from '@/pages/SignUpPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import EmployerManagementPanel from '@/pages/EmployerManagementPanel';
import EmployerDashboard from '@/pages/EmployerDashboard';
import CandidateDashboard from '@/pages/CandidateDashboard';
import NotFoundPage from '@/pages/NotFoundPage';
import ScrollToTop from './components/ScrollToTop';


import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';



// DRY: AnimatedPage wrapper
import { forwardRef } from 'react';
const AnimatedPage = forwardRef(({ children }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, x: "-100vw", scale: 0.8 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: "100vw", scale: 1.2 }}
    transition={{ type: "tween", ease: "anticipate", duration: 0 }}
  >
    {children}
  </motion.div>
));

function AnimatedRoutes() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout><AnimatedPage><HomePage /></AnimatedPage></Layout>} />
        <Route path="/about" element={<Layout><AnimatedPage><AboutUsPage /></AnimatedPage></Layout>} />
        <Route path="/employers" element={<Layout><AnimatedPage><EmployersPage /></AnimatedPage></Layout>} />
        <Route path="/job-seekers" element={<Layout><AnimatedPage><JobSeekersPage /></AnimatedPage></Layout>} />
        <Route path="/contact" element={<Layout><AnimatedPage><ContactUsPage /></AnimatedPage></Layout>} />
        <Route path="/job-details/:id" element={<Layout><AnimatedPage><JobDetailsPage /></AnimatedPage></Layout>} />
        <Route path="/login" element={<AnimatedPage><LoginPage /></AnimatedPage>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/employer-management-panel" element={<EmployerManagementPanel />} />

        {/* Protected Dashboards, using kebab-case for route paths */}
        <Route path="/candidate/dashboard" element={isAuthenticated ? (
          <Layout>
            <AnimatedPage>
              <CandidateDashboard />
            </AnimatedPage>
          </Layout>
        ) : (
          <Navigate to="/login" replace />
        )} />

        <Route path="/sign-up" element={<SignUpPage />} />

        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated ? (
              <Layout><AnimatedPage><AdminDashboardPage /></AnimatedPage></Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        <Route
          path="/employer/dashboard"
          element={
            isAuthenticated ? (
              <Layout><AnimatedPage><EmployerDashboard /></AnimatedPage></Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 404 Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AnimatedRoutes />
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
