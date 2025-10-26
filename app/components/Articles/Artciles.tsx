import { Article } from "@/app/lib/schemas";
import ArticleCard from "./ArticleCard";

const Articles = ({ articles }: { articles: Article[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:mt-14 md:mt-24">
    {articles.map((article) => (
      <ArticleCard key={article.id} article={article} />
    ))}
  </div>
);
export { Articles };
