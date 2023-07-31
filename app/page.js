'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/app/styles/pages.module.css';
import Image from 'next/image';
import { collection, getDocs, onSnapshot  } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Link from 'next/link';

export default function Home() {
  const [latestPost, setLatestPost] = useState({ id: null, data: null });
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
          setLatestPost({ id: null, data: null });
          Swal.fire('No Latest Post', 'No posts found in the database.', 'info');
          return;
        }

        // Get the latest post from the query result
        const latestPostData = querySnapshot.docs[0].data();
        const latestPostId = querySnapshot.docs[0].id;
        setLatestPost({ id: latestPostId, data: latestPostData });
      } catch (error) {
        console.error('Error fetching latest post: ', error);
        Swal.fire('Error', 'An error occurred while fetching the latest post.', 'error');
      }
    };

    // Fetch all posts except the latest one from the "BlogPosts" collection
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

        const latestPostsData = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((post) => post.id !== latestPost?.id); // Exclude the latest post

        setLatestPosts(latestPostsData);
      } catch (error) {
        console.error('Error fetching latest posts: ', error);
        Swal.fire('Error', 'An error occurred while fetching the latest posts.', 'error');
      }
    };

    const unsubscribeLatestPost = onSnapshot(collection(db, 'BlogPosts'), (snapshot) => {
      fetchLatestPost();
    });

    const unsubscribeLatestPosts = onSnapshot(collection(db, 'BlogPosts'), (snapshot) => {
      fetchLatestPosts();
    });

    return () => {
      // Unsubscribe from the snapshots when the component is unmounted
      unsubscribeLatestPost();
      unsubscribeLatestPosts();
    };
  }, [latestPost?.id]);

  return (
    <>
      <section className={styles.Home}>
        {/* Show Only 1 Latest POST here  */}
        {latestPost.data ? (
          <Link href={`/blogs/${latestPost.id}`} style={{ whiteSpace: 'normal' }}>
            <div className={styles.HomeCard}>
              <>
                <h1>{latestPost.data.title}</h1>
                <span>{latestPost.data.author}</span>
                {latestPost.data.image ? (
                  <Image
                    src={latestPost.data.image}
                    alt="POST IMAGE"
                    loading="lazy"
                    width={400}
                    height={500}
                    style={{ width: 'auto' }}
                  />
                ) : (
                  <div>No Image</div>
                )}
              </>
            </div>
          </Link>
        ) : (
          <div>No Latest Post Found</div>
        )}
        <div className={styles.VerticalPosts}>
          {/* Show Only 3 POSTS excluding The Post You showed Above  */}
          {latestPosts.length > 0 ? (
            latestPosts.slice(0, 3).map((post) => (
              <>
                <Link key={post.id} href={`/blogs/${post.id}`} style={{ whiteSpace: 'normal' }}>
                  <div className={styles.card}>
                    <span>{post.category}</span>
                    <h2>{post.title}</h2>
                    <p>{post.author}</p>
                  </div>
                </Link>
                <hr />
              </>
            ))
          ) : (
            <div>No Latest Posts Found</div>
          )}
        </div>
      </section>
      <section className={styles.HomeNext}>
        <h1>The Latest</h1>
        <hr />
        {/* Show All Post Below  */}
        {latestPosts.map((post) => (
          <Link key={post.id} href={`/blogs/${post.id}`} style={{ whiteSpace: 'normal' }}>
            <div className={styles.ThreeColCard}>
              <div className={styles.Left}>
                <span>{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.author}</p>
                <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>{new Date(post.date.seconds * 1000).toLocaleString()}</p>
              </div>
              <div className={styles.mid}>
                <p dangerouslySetInnerHTML={{ __html: post.shortDescription }} />
              </div>
              <div className={styles.Right}>
                {post.image ? (
                  <Image src={post.image} alt="POST IMAGE" loading="lazy" width={400} height={300} />
                ) : (
                  <div>No Image</div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
