"use client";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import Link from "next/link";
import styles from "@/app/styles/pages.module.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Searchcategories({ params }) {
  const [posts, setPosts] = useState([]);
  const encodedCategory = encodeURIComponent(params.category);

  useEffect(() => {
    // Fetch posts with the specific category name from Firestore
    const fetchPosts = async () => {
      try {
        const decodedCategory = decodeURIComponent(encodedCategory);
        const formattedCategory = decodedCategory
          .replace(/-/g, " ") // Replace "-" with space
          .replace(/and/g, "&"); // Replace "and" with "&"
        const q = query(
          collection(db, "BlogPosts"),
          where("category", "==", formattedCategory)
        );
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts: ", error);
        // Show an error message using SweetAlert2
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while fetching posts. Please try again.",
        });
      }
    };

    fetchPosts();
  }, [encodedCategory]);
  return (
    <div>
      <h1>Posts with Category: {params.category}</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blogs/${post.id}`} style={{ whiteSpace: "normal" }}>
                <div className={styles.cardMox}>
                  <span>{post.category}</span>
                  <h2>{post.title}</h2>
                  <p>{post.shortDescription}</p>
                  <p>{post.author}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p>No posts found with this category.</p>
        </>
      )}
    </div>
  );
}
