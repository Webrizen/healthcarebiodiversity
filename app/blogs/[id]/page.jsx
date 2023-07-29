// pages/page.js
import BlogPostPage from "@/app/components/BlogPostPage";
import { fetchBlogPostData } from "@/app/utils/firestore";

export async function generateMetadata({ params }) {
  const { id } = params;
  const { title, shortDescription } = await fetchBlogPostData(id);

  return {
    title,
    description: shortDescription,
  };
}

export default function page({ params }) {
  return (
    <>
      <BlogPostPage params={params} />
    </>
  );
}
