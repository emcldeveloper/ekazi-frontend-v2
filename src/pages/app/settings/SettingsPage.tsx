import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountPage from "./account/AccountPage";
import SecurityPage from "./security/SecurityPage";
import TermsConditions from "./terms/TermsConditions";

const SettingsPage = () => {
  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-Blue">
            Settings
          </h1>
        </div>
        {/* <Button type="button" variant="outline">
          <CheckCheck className="size-4 text-primary" aria-hidden="true" />
          Mark all as read
        </Button> */}
      </header>

      <Tabs defaultValue="account">
        <TabsList variant="line">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <AccountPage />
        </TabsContent>
        <TabsContent value="security">
          <SecurityPage />
        </TabsContent>
        <TabsContent value="terms">
          <TermsConditions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
