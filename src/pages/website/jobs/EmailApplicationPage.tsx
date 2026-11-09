import HomeLayout from "@/layouts/HomeLayout";
import ApplyJobByEmailPage from "@/pages/app/applications/ApplyByEmailPage";

const EmailApplicationPage = () => {
  return (
    <HomeLayout>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
        <ApplyJobByEmailPage />
      </div>
    </HomeLayout>
  );
};

export default EmailApplicationPage;
