import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { useCVData } from "@/context/TemplatesContext";

import { TEMPLATES } from "./data/constants";
import {
  useCVCount,
  useCVNormalized,
  useIncrementCVCount,
} from "@/hooks/cv";
import TemplateThumbnail from "./components/TemplateThumbnail";

export default function CVTemplatesPage() {
  const navigate = useNavigate();

  const applicant_id = 31914;

  // CV counts
  const { data } = useCVCount();
  const viewCounts = data?.view_count || [];

  const getTemplateViewCount = (templateId: any) => {
    if (!Array.isArray(viewCounts)) return 0;

    const found = viewCounts.find(
      (item) => Number(item.template_no) === Number(templateId),
    );

    return Number(found?.view ?? 0);
  };

  // Add cv counts
  const { mutate: incrementCvCount } = useIncrementCVCount();
  const handlecvincrementSubmit = (templateId: any) => {
    if (!templateId || !applicant_id) return;

    const formData = new FormData();
    formData.append("template_id", String(templateId));
    formData.append("view_count", String(1));
    formData.append("applicant_id", String(applicant_id));

    incrementCvCount(formData);
  };

  const [activeTab, setActiveTab] = useState("all");

  const { data: templateData } = useCVData() as { data?: { data?: any } };
  const payload = templateData;
  const profile = useCVNormalized(payload);

  const handlePreview = (templateId: any) => {
    navigate(`/app/templates/${templateId}`);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-Blue">Templates</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="px-4 space-y-4">
          {/* ── Template Selection Grid ── */}
          <div className="flex items-center gap-2 mb-6 overflow-y-scroll">
            {[
              "all",
              "classic",
              "sidebar-left",
              "sidebar-right",
              "header",
              "header-sidebar",
              "modern-sidebar",
            ].map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full capitalize transition ${
                  activeTab === tab
                    ? "bg-Orange text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-Orange hover:text-white"
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5">
            {TEMPLATES.filter((t) => {
              if (activeTab === "all") return true;
              return t.category === activeTab;
            })
              .sort((a, b) => {
                const aViews = getTemplateViewCount(a.id);
                const bViews = getTemplateViewCount(b.id);

                // Lower viewed templates get higher chance
                const aScore = aViews + Math.random() * 50;
                const bScore = bViews + Math.random() * 50;

                return aScore - bScore;
              })
              .map((t) => {
                const TComp = t.Component;
                const viewCount = getTemplateViewCount(t.id);
                return (
                  <Card
                    key={t.id}
                    onClick={() => {
                      handlecvincrementSubmit(t.id);
                      handlePreview(t.id);
                    }}
                    className="p-0  hover:border-gray-300 hover:shadow-lg transition-all overflow-hidden group cursor-pointer"
                  >
                    <CardContent className="p-0">
                      {/* Thumbnail — scaled down live render */}
                      <TemplateThumbnail>
                        <TComp profile={profile} />
                      </TemplateThumbnail>

                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-Orange flex items-center gap-1">
                            <Eye size={14} /> {viewCount}
                          </span>
                          {t.tier === "premium" ? (
                            <Badge className="bg-orange-50 text-orange-700">
                              {t.tier}
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-700">
                              {t.tier}
                            </Badge>
                          )}
                        </div>
                        <span className="font-semibold text-gray-900 text-sm">
                          {t.name}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
