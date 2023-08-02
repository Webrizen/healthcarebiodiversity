import BlogPostPage from "@/app/components/BlogPostPage";
import { fetchBlogPostData } from "@/app/utils/firestore";

export async function generateMetadata({ params }) {
  const { id } = params;
  const { title, shortDescription, keywords } = await fetchBlogPostData(id);

  return {
    title: title,
    description: shortDescription,
    keywords: keywords || [
      "HealthCare Biodiversity",
      "Nutrition & Diet",
      "Fitness & Exercise",
      "Mental Health & Wellness",
      "Medical Conditions",
      "Women's Health",
      "Men's Health",
      "Healthy Lifestyle",
      "Weight Loss & Management",
      "Children's Health",
      "Aging & Senior Health",
      "Chronic Illness Support",
      "Healthy Recipes",
      "Healthy Habits",
      "Wellness Tips",
      "Health Education",
      "Preventive Care",
      "Mindfulness",
      "Work-Life Balance",
      "Stress Management",
      "Healthy Living",
      "Holistic Health",
      "Physical Fitness",
      "Healthy Mindset",
      "Self-Care",
      "Well-Being",
      "Health Benefits",
      "Disease Prevention",
      "Healthy Eating",
      "Mental Clarity",
      "Healthy Aging",
      "Natural Remedies",
      "Fitness Challenges",
      "Yoga & Meditation",
    ],
  };
}

export default function page({ params }) {
  return (
    <>
      <BlogPostPage params={params} />
    </>
  );
}
