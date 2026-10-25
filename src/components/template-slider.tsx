import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TEMPLATES } from "@/pages/app/cv_builder/data";

export default function TemplateSlider() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const total = TEMPLATES.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(interval);
  }, [total]);

  const handleClick = () => {
    const token = localStorage.getItem("applicantId");

    if (token) {
      navigate("/app/templates");
    } else {
      navigate("/login");
    }
  };

  return (
    <Card size="sm" className="rounded-none p-0 sticky top-24">
      <CardContent className="rounded-none p-0 pb-4">
        <CardHeader className="py-4 bg-linear-to-r from-orange-500 to-orange-600 rounded-none">
          <CardTitle className="text-white">Available CV Templates</CardTitle>
        </CardHeader>
        <div
          className="w-full h-64 px-8 align- overflow-hidden cursor-pointer mb-3 mt-2 group"
          onClick={handleClick}
        >
          <img
            src={TEMPLATES[index].image}
            alt=""
            className="w-full h-auto object-contain transition-all duration-500 group-hover:scale-105"
          />
        </div>

        <p className="text-xs px-4 text-muted-foreground leading-relaxed">
          Build a professional CV in minutes — completely free. Select your
          preferred design and get started right away. Click the link to
          register or log in.
        </p>
      </CardContent>
    </Card>
  );
}
