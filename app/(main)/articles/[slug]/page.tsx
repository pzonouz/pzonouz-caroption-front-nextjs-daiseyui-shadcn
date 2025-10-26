export const revalidate = 60;

import { Metadata } from "next";
import { Article } from "../../../lib/schemas";

export async function generateStaticParams() {
  const articlesRes = await fetch(`${process.env.BACKEND_URL}/articles`);
  const articles: Article[] = await articlesRes.json();
  return articles.map((article) => ({
    id: article.id.toString(),
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const articleRes = await fetch(
    `${process.env.BACKEND_URL}/article_by_slug/search?q=${encodeURIComponent(slug)}`,
  );
  const article: Article = await articleRes.json();
  return {
    title: article?.name,
    description: article?.description,
  };
}
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const articleRes = await fetch(
    `${process.env.BACKEND_URL}/article_by_slug/search?q=${encodeURIComponent(slug)}`,
  );
  const article: Article = (await articleRes.json()) ?? [];
  return (
    <div className="article">
      <h1>{article?.name}</h1>
      <div
        className="description"
        dangerouslySetInnerHTML={{
          __html: article?.description ?? "",
        }}
      />
    </div>
  );
};

export default page;
