import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';

const SiteURL = "http://healthcarebiodiversity.com"

export default async function sitemap() {
  // Fetch all dynamic posts from Firestore
  const querySnapshot = await getDocs(collection(db, 'BlogPosts'));
  const postsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  // Generate sitemap entries for each dynamic post
  const sitemapEntries = postsData.map((post) => {
    const url = `${SiteURL}/blogs/${post.id}`; // Assuming your dynamic route for blog posts is '/blogs/[id]'
    const lastModified = post.timestamp?.toDate() || new Date();
    return {
      url,
      lastModified,
    };
  });

  // Fetch all categories from Firestore
  const categoryQuerySnapshot = await getDocs(collection(db, 'categories'));
  const categoriesData = categoryQuerySnapshot.docs.map((doc) => doc.data());

  // Generate sitemap entries for each category
  const categorySitemapEntries = categoriesData.map((category) => {
    const categoryName = category.name; // Replace 'name' with the actual field name containing the category name
    const formattedCategory = categoryName
      .replace(/ /g, "-") // Replace spaces with "-"
      .replace(/&/g, "and"); // Replace "&" with "and"
    const url = `${SiteURL}/categories/${encodeURIComponent(formattedCategory)}`; // Assuming your dynamic route for categories is '/categories/[category]'
    const lastModified = new Date(); // You can set the last modified date for categories as per your requirement
    return {
      url,
      lastModified,
    };
  });

  // Add other static sitemap entries here (if any)
  const staticEntries = [
    {
      url: `${SiteURL}`,
      lastModified: new Date(),
    },
    {
      url: `${SiteURL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${SiteURL}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${SiteURL}/advertise`,
      lastModified: new Date(),
    },
    {
      url: `${SiteURL}/career`,
      lastModified: new Date(),
    },
    {
      url: `${SiteURL}/sitemap`,
      lastModified: new Date(),
    },
    {
      url: `${SiteURL}/terms-and-conditions`,
      lastModified: new Date(),
    },
    {
      url: `${SiteURL}/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${SiteURL}/code-of-conduct`,
      lastModified: new Date(),
    },
  ];

  // Combine dynamic, category, and static sitemap entries
  const allEntries = [...sitemapEntries, ...categorySitemapEntries, ...staticEntries];

  return allEntries;
}
