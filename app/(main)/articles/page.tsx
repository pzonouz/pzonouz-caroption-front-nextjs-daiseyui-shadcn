import { Articles } from "@/app/components/Articles/Artciles";
import { Article } from "@/app/lib/schemas";

const page = async () => {
  const articlesRes = await fetch(`${process.env.BACKEND_URL}/articles`);
  const articles: Article[] = await articlesRes.json();
  return (
    <div>
      <Articles articles={articles} />
    </div>
  );
};
export default page;
