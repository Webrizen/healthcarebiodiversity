'use client';
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

  const formatCategory = (category) => {
    // Replace spaces with "-"
    // Replace "&" with "and"
    return category.replace(/\s+/g, "-").replace(/&/g, "and");
  };

  return (
    <>
      <div className={styles.Sidebar}>
        <div className={styles.searchbar}>
          <input type="search" placeholder="Search..." />
          <span>
            <IoMdSearch />{" "}
          </span>
        </div>
        <hr />
        <div className={styles.categories}>
          <ul>
            {categories.map((category) => (
              <Link href={`/categories/${formatCategory(category)}`} key={category}>
                <li>{category}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
