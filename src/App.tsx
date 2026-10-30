import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/sonner";

import AppLayout from "./layouts/AppLayout";

import HomePage from "./pages/website/HomePage";
import JobsPage from "./pages/website/jobs/JobsPage";
import EmployersPage from "./pages/website/employers/EmployersPage";
import CVBuilderPage from "./pages/website/cv_builder/CVBuilderPage";
import SalaryCalculatorPage from "./pages/website/salary_calculator/SalaryCalculatorPage";
import PricingPage from "./pages/website/pricing/PricingPage";
import ArticlesPage from "./pages/website/articles/ArticlesPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyAccountPage from "./pages/auth/VerifyAccountPage";
import NotVerifiedPage from "./pages/auth/NotVerifiedPage";
import DashboardPage from "./pages/app/dashboard/DashboardPage";
import ProfilePage from "./pages/app/profile/ProfilePage";
import AppJobsPage from "./pages/app/jobs/JobsPage";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import ApplicationsPage from "./pages/app/applications/ApplicationsPage";
import SavedJobsPage from "./pages/app/jobs/saved_jobs/SavedJobsPage";
import MatchedJobsPage from "./pages/app/jobs/matched_jobs/MatchedJobsPage";
import CoverLetterPage from "./pages/app/cover_letter/CoverLetterPage";
import ApplyJobPage from "./pages/app/jobs/apply_jobs/ApplyJobPage";
import RequestDemo from "./pages/website/components/RequestDemo";
import ArticleDetails from "./pages/website/articles/components/ArticleDetails";
import CandidatesPage from "./pages/website/components/candidates/CandidatesPage";

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
            <Route path="/employers/request-demo" element={<RequestDemo />} />
            <Route path="/candidates" element={<CandidatesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:id" element={<ArticleDetails />} />
            <Route path="/cv-builder" element={<CVBuilderPage />} />
            <Route
              path="/salary-calculator"
              element={<SalaryCalculatorPage />}
            />

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
                <Route path="/app/jobs" element={<AppJobsPage />} />
                <Route path="/app/apply-job" element={<ApplyJobPage />} />
                <Route path="/app/saved-jobs" element={<SavedJobsPage />} />
                <Route path="/app/matched-jobs" element={<MatchedJobsPage />} />
                <Route
                  path="/app/applications"
                  element={<ApplicationsPage />}
                />
                <Route path="/app/cover-letter" element={<CoverLetterPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
