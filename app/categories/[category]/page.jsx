"use client";
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Link from 'next/link';
import styles from '@/app/styles/pages.module.css';

export default function page({ params }) {
  const [posts, setPosts] = useState([]);
  const encodedCategory = encodeURIComponent(params.category);

  useEffect(() => {
    // Fetch posts with the specific category name from Firestore
    const fetchPosts = async () => {
      try {
        const decodedCategory = decodeURIComponent(encodedCategory);
        const formattedCategory = decodedCategory
          .replace(/-/g, ' ') // Replace "-" with space
          .replace(/and/g, '&'); // Replace "and" with "&"
        const q = query(collection(db, 'BlogPosts'), where('category', '==', formattedCategory));
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts: ', error);
        // Handle the error, e.g., show a message to the user
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
              <Link href={`/blogs/${post.id}`} style={{ whiteSpace: 'normal' }} >
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
        <p>No posts found with this category.</p>
      )}
    </div>
  );
}
