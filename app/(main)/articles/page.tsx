import { Articles } from "@/app/components/Articles/Articles";
import { Article } from "@/app/lib/schemas";

const page = async () => {
  const articlesRes = await fetch(`${process.env.BACKEND_URL}/articles`);
  const articles: Article[] = await articlesRes.json();
  return (
    <div className="">
      <Articles articles={articles} />
    </div>
  );
};
export default page;
