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
import ApplyJobPage from "./pages/app/jobs/apply_jobs/ApplyJobPage";
import RequestDemo from "./pages/website/components/RequestDemo";
import ArticleDetails from "./pages/website/articles/components/ArticleDetails";
import CandidatesPage from "./pages/website/components/candidates/CandidatesPage";
import CVTemplatesPage from "./pages/app/cv_builder/CVTemplatesPage";
import { TemplatesProvider } from "./context/TemplatesProvider";
import PreviewTemplate from "./pages/app/cv_builder/PreviewTemplate";
import CoverLettersPage from "./pages/app/cover_letter/CoverLettersPage";
import CreateCoverLetter from "./pages/app/cover_letter/CreateCoverLetter";
import ApplyByEmailPage from "./pages/app/applications/ApplyByEmailPage";
import OtherFilesPage from "./pages/app/documents/OtherFilesPage";
import MessagesPage from "./pages/app/messages/MessagesPage";
import ExternalApplicationsPage from "./pages/app/applications/ExternalApplicationsPage";
import EmailApplicationPage from "./pages/website/jobs/EmailApplicationPage";
import NotificationsPage from "./pages/app/notifications/NotificationsPage";
import SettingsPage from "./pages/app/settings/SettingsPage";
import AppArticles from "./pages/app/articles/AppArticles";
import AppArticleDetails from "./pages/app/articles/components/AppArticleDetails";
import AppCalculatorPage from "./pages/app/calculator/AppCalculatorPage";
import SubscriptionPage from "./pages/app/subscription/SubscriptionPage";

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
            <Route path="/jobs/email" element={<EmailApplicationPage />} />
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
              <Route
                element={
                  <TemplatesProvider>
                    <AppLayout />
                  </TemplatesProvider>
                }
              >
                <Route path="/app/dashboard" element={<DashboardPage />} />

                <Route path="/app/profile" element={<ProfilePage />} />

                <Route path="/app/jobs" element={<AppJobsPage />} />
                <Route
                  path="/app/jobs/:jobId/apply"
                  element={<ApplyJobPage />}
                />

                <Route path="/app/apply-job" element={<ApplyJobPage />} />
                <Route path="/app/saved-jobs" element={<SavedJobsPage />} />
                <Route path="/app/matched-jobs" element={<MatchedJobsPage />} />

                <Route
                  path="/app/applications"
                  element={<ApplicationsPage />}
                />

                <Route
                  path="/app/external-applications"
                  element={<ExternalApplicationsPage />}
                />
                <Route
                  path="/app/external-applications/email"
                  element={<ApplyByEmailPage />}
                />

                <Route path="/app/templates" element={<CVTemplatesPage />} />
                <Route
                  path="/app/templates/:id"
                  element={<PreviewTemplate />}
                />
                <Route
                  path="/app/cover-letters"
                  element={<CoverLettersPage />}
                />
                <Route
                  path="/app/cover-letters/new"
                  element={<CreateCoverLetter />}
                />
                <Route path="/app/other-files" element={<OtherFilesPage />} />
                <Route path="/app/messages" element={<MessagesPage />} />

                <Route
                  path="/app/notifications"
                  element={<NotificationsPage />}
                />

                <Route
                  path="/app/salary-calculator"
                  element={<AppCalculatorPage />}
                />

                <Route path="/app/articles" element={<AppArticles />} />
                <Route
                  path="/app/articles/:id"
                  element={<AppArticleDetails />}
                />

                <Route path="/app/settings" element={<SettingsPage />} />

                <Route
                  path="/app/subscription"
                  element={<SubscriptionPage />}
                />
                <Route
                  path="/app/subscription/plans"
                  element={<SettingsPage />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
