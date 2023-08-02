// utils/firebase.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export async function fetchBlogPostData(id) {
  try {
    const blogDocRef = doc(db, "BlogPosts", id);
    const blogDocSnapshot = await getDoc(blogDocRef);

    if (blogDocSnapshot.exists()) {
      const { title, shortDescription, tags } = blogDocSnapshot.data();
      const keywords = tags || [];
      return { title, shortDescription, keywords };
    }
  } catch (error) {
    console.error("Error fetching blog post data: ", error);
  }

  return { title: "Loading...", shortDescription: "Loading...", keywords: [] };
}
