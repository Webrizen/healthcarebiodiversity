"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/styles/componets.module.css";
import { IoMdSearch } from "react-icons/io";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch all categories from the "BlogPosts" collection
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "BlogPosts"));
        const allCategories = new Set(); // Using a Set to ensure unique categories

        // Loop through all documents and collect unique categories
        querySnapshot.forEach((doc) => {
          const category = doc.data().category;
          if (category) {
            allCategories.add(category);
          }
        });

        setCategories(Array.from(allCategories));
      } catch (error) {
        console.error("Error fetching categories: ", error);
        Swal.fire("Error", "An error occurred while fetching categories.", "error");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Filter posts based on title, description, and categories
    const filterPosts = () => {
      if (!searchQuery) {
        setSearchResults([]);
        return;
      }

      const formattedQuery = searchQuery.toLowerCase();

      // Fetch all posts from the "BlogPosts" collection
      const fetchAllPosts = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "BlogPosts"));
          const postsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

          // Filter the posts based on the search query
          const filteredPosts = postsData.filter(
            (post) =>
              post.title.toLowerCase().includes(formattedQuery) ||
              post.shortDescription.toLowerCase().includes(formattedQuery) ||
              post.category.toLowerCase().includes(formattedQuery) ||
              post.category.toLowerCase().replace(/\s+/g, "-").includes(formattedQuery)
          );

          setSearchResults(filteredPosts);
        } catch (error) {
          console.error("Error fetching posts: ", error);
          // Handle the error, e.g., show a message to the user
        }
      };

      fetchAllPosts();
    };

    filterPosts();
  }, [searchQuery]);

  const formatCategory = (category) => {
    // Replace spaces with "-"
    // Replace "&" with "and"
    return category.replace(/\s+/g, "-").replace(/&/g, "and");
  };


  return (
    <>
      <div className={styles.Sidebar}>
        <div className={styles.sideTop}>
        <div className={styles.searchbar}>
        <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span>
            <IoMdSearch />{" "}
          </span>
        </div>
        <hr />
        {searchQuery && (
          <div className={styles.searchResults}>
            {searchResults.map((result) => (
              <Link href={`/blogs/${result.id}`} key={result.id} style={{ whiteSpace: 'normal' }}>
                <div className={styles.searchResult}>{result.title}</div>
              </Link>
            ))}
            {searchResults.length === 0 && (
              <p>No posts found for the search query.</p>
            )}
          </div>
        )}
        <div className={styles.categories}>
          <ul>
            {categories.map((category) => (
              <Link
                href={`/categories/${formatCategory(category)}`}
                key={category}
              >
                <li>{category}</li>
              </Link>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </>
  );
}
