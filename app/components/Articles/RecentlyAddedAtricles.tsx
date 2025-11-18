import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import ArticleCard from "./ArticleCard";
import { ArticleCarousel } from "./ArticlesCrousel";

const RecentlyAddedArticles = async () => {
  const articlesRes = await fetch(
    `${process.env.BACKEND_URL}/recently_added_articles`,
    {
      next: { revalidate: 60 },
    }
  );
  const articles = await articlesRes.json();

  return (
    <div className="bg-gray-600  mt-6">
      <div className="flex justify-between items-center">
        <div className="font-bold text-white p-5">جدیدترین مقالات</div>
        <Link href={"/recently_added_articles"} className="text-white flex ">
          <div>مشاهده همه</div>
          <ChevronLeft />
        </Link>
      </div>
      <ArticleCarousel articles={articles} className="p-2" />
    </div>
  );
};
export { RecentlyAddedArticles };
