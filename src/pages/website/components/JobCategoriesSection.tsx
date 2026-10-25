import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import Industry from "./categories/Industry";
import Category from "./categories/Category";
import Locations from "./categories/Locations";

const JobCategoriesSection = () => {
  return (
    <div className="w-full bg-white">
      <div className="container mx-auto py-8 px-10">
        <h2 className="text-center text-3xl font-semibold text-Blue mb-10">
          Job Categories
        </h2>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="industry" className="w-full">
            {/* Tabs Header */}
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="industry">By Category</TabsTrigger>

                <TabsTrigger value="byindustry">By Industry</TabsTrigger>

                <TabsTrigger value="location">By Location</TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Contents */}
            <TabsContent value="industry">
              <Industry />
            </TabsContent>

            <TabsContent value="byindustry">
              <Category />
            </TabsContent>

            <TabsContent value="location">
              <Locations />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default JobCategoriesSection;
