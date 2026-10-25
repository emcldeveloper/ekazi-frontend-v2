import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  article: any;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Card>
      <CardContent>
        {/* Featured Image */}
        {article.featured_image && (
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-auto object-cover"
          />
        )}

        {/* Top Meta */}
        <div className="flex items-center justify-between mb-3">
          <small className="text-muted-foreground">
            {article.published_at}
          </small>

          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-[#d36314]" />
            <small className="text-muted-foreground">{article.views}</small>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold mb-2 text-[#2E58A6] text-lg">
          {article.title}
        </h3>

        {/* Content Preview */}
        <div
          className="text-muted-foreground mb-2 line-clamp-3 **:m-0"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Spacer + Button */}
        <div className="mt-auto">
          <Link to={`/articles/${article.slug}`}>
            <Button
              variant="outline"
              size="sm"
              className="border-[#d36314] text-[#d36314] hover:bg-[#d36314] hover:text-white"
            >
              Read More
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
