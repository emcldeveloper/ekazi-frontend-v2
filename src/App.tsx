import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/sonner";

import AppLayout from "./layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/website/HomePage";
import JobsPage from "./pages/website/jobs/JobsPage";
import EmployersPage from "./pages/website/employers/EmployersPage";
import CVBuilderPage from "./pages/website/cv_builder/CVBuilderPage";
import SalaryCalculatorPage from "./pages/website/salary_calculator/SalaryCalculatorPage";
import PricingPage from "./pages/website/pricing/PricingPage";
import ArticlesPage from "./pages/website/articles/ArticlesPage";
import ForEmployersPage from "./pages/website/for_employers/ForEmployersPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyAccountPage from "./pages/auth/VerifyAccountPage";
import NotVerifiedPage from "./pages/auth/NotVerifiedPage";
import DashboardPage from "./pages/app/dashboard/DashboardPage";
import ProfilePage from "./pages/app/profile/ProfilePage";
import ProtectedRoutes from "./layouts/ProtectedRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster position="top-center" richColors />

        {/* Routes */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/employers" element={<EmployersPage />} />
            <Route path="/cv-builder" element={<CVBuilderPage />} />
            <Route
              path="/salary-calculator"
              element={<SalaryCalculatorPage />}
            />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/for-employers" element={<ForEmployersPage />} />

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify" element={<VerifyAccountPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/not-verified" element={<NotVerifiedPage />} />

            <Route element={<ProtectedRoutes />}>
              <Route element={<AppLayout />}>
                <Route path="/app/dashboard" element={<DashboardPage />} />
                <Route path="/app/profile" element={<ProfilePage />} />
                <Route path="/app/jobs" element={<Dashboard />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
