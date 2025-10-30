"use server";
import Image from "next/image";
import Link from "next/link";
import { Article } from "../../lib/schemas";

const ArticleCard = async ({ article }: { article: Article }) => {
  return (
    <Link
      href={`/articles/${article?.slug}`}
      className="flex flex-row gap-3 items-center p-2 mt-2"
    >
      <Image
        src={
          article.imageUrl
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/${article?.imageUrl}`
            : "/images/logo.jpg"
        }
        alt={article.name}
        width={800}
        height={800}
        className="w-1/3"
      />
      <div>
        <div>{article.name}</div>
      </div>
    </Link>
  );
};

export default ArticleCard;
