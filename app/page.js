'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/app/styles/pages.module.css';
import Image from 'next/image';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function Home() {
  const [latestPost, setLatestPost] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    // Fetch the latest post from the "BlogPosts" collection
    const fetchLatestPost = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'BlogPosts'), {
          orderBy: 'createdAt', // Assuming you have a 'createdAt' field in your documents to sort by
          limit: 1, // Get only the latest post
        });

        // If there are no documents, handle the case
        if (querySnapshot.empty) {
          setLatestPost(null);
          Swal.fire('No Latest Post', 'No posts found in the database.', 'info');
          return;
        }

        // Get the latest post from the query result
        const latestPostData = querySnapshot.docs[0].data();
        setLatestPost(latestPostData);
      } catch (error) {
        console.error('Error fetching latest post: ', error);
        Swal.fire('Error', 'An error occurred while fetching the latest post.', 'error');
      }
    };

    fetchLatestPost();

    // Fetch the latest 3 posts from the "BlogPosts" collection
    const fetchLatestPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'BlogPosts'), {
          orderBy: 'createdAt', // Assuming you have a 'createdAt' field in your documents to sort by
          limit: 4, // Get 4 latest posts (1 latest post + 3 more)
        });

        // If there are no documents, handle the case
        if (querySnapshot.empty) {
          setLatestPosts([]);
          return;
        }

        // Get the latest 3 posts from the query result (excluding the latest post)
        const latestPostsData = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((post) => post.id !== latestPost?.id) // Exclude the latest post
          .slice(0, 3); // Take only the first 3 posts

        setLatestPosts(latestPostsData);
      } catch (error) {
        console.error('Error fetching latest posts: ', error);
        Swal.fire('Error', 'An error occurred while fetching the latest posts.', 'error');
      }
    };

    fetchLatestPosts();
  }, [latestPost?.id]); // Use latestPost?.id as a dependency to re-fetch the latest 3 posts whenever the latestPost changes

  return (
    <>
      <section className={styles.AdsSection}>
        <div className={styles.Ads}>Advertisment</div>
      </section>
      <section className={styles.Home}>
        <div className={styles.HomeCard}>
          {latestPost ? (
            <>
              <h1>{latestPost.title}</h1>
              <span>{latestPost.author}</span>
              {latestPost.image ? (
                <Image
                  src={latestPost.image}
                  alt="POST IMAGE"
                  loading="lazy"
                  width={400}
                  height={400}
                  style={{ width: 'auto', height: '400px' }}
                />
              ) : (
                <div>No Image</div>
              )}
            </>
          ) : (
            <div>No Latest Post Found</div>
          )}
        </div>
        <div className={styles.VerticalPosts}>
          {/* Map this Card for 3 latest posts */}
          {latestPosts.length > 0 ? (
            latestPosts.map((post) => (
              <div key={post.id} className={styles.card}>
                <span>{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.author}</p>
              </div>
            ))
          ) : (
            <div>No Latest Posts Found</div>
          )}
          <hr />
        </div>
      </section>
    </>
  );
}