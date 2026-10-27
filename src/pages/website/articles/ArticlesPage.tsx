import { useState } from "react";
import { Loader2, SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import Navbar from "../components/Navbar";
import { useArticles } from "@/hooks/articles";
import ArticleCard from "./components/ArticleCard";
import HotArticles from "./components/HotArticles";
import { useDebounce } from "@/hooks/useDebounce";

const ArticlesPage = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(25);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data: articlesData, isLoading } = useArticles({
    page,
    limit: perPage,
    search: debouncedSearch,
  });
  const articles = articlesData?.data ?? [];

  return (
    <div>
      <Navbar />

      <div className="container mx-auto max-w-6xl my-10 px-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-4 text-Blue">Articles</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <InputGroup className="w-full">
              <InputGroupInput
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>

            {isLoading ? (
              <div className="flex justify-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : articles.length === 0 ? (
              <div className="flex justify-center">No articles</div>
            ) : (
              <div className="flex flex-col gap-4">
                {articles?.map((article: any) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-Blue font-semibold text-lg">
              Hot Articles
            </h3>

            <div className="flex flex-col gap-4">
              <HotArticles />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
