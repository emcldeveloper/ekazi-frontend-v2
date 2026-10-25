import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TEMPLATES } from "@/pages/app/cv_builder/data";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { DialogFooter } from "./ui/dialog";

export default function TemplateSlider2() {
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
    <Card size="sm">
      <CardHeader>
        <CardTitle>Available CV Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
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
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Browse Templates <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
