"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/styles/componets.module.css";
import Link from "next/link";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";

export default function Footer() {
  const Year = new Date().getFullYear();
  const [latestPosts, setLatestPosts] = useState([]);
  const [latestPost, setLatestPost] = useState({ id: null, data: null });

  useEffect(() => {
    // Fetch the latest post from the "BlogPosts" collection
    const fetchLatestPost = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "BlogPosts"), {
          orderBy: "createdAt", // Assuming you have a 'createdAt' field in your documents to sort by
          limit: 1, // Get only the latest post
        });

        // If there are no documents, handle the case
        if (querySnapshot.empty) {
          setLatestPost({ id: null, data: null });
          Swal.fire(
            "No Latest Post",
            "No posts found in the database.",
            "info"
          );
          return;
        }

        // Get the latest post from the query result
        const latestPostData = querySnapshot.docs[0].data();
        const latestPostId = querySnapshot.docs[0].id;
        setLatestPost({ id: latestPostId, data: latestPostData });
      } catch (error) {
        console.error("Error fetching latest post: ", error);
        Swal.fire(
          "Error",
          "An error occurred while fetching the latest post.",
          "error"
        );
      }
    };

    // Fetch all posts except the latest one from the "BlogPosts" collection
    const fetchLatestPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "BlogPosts"), {
          orderBy: "createdAt", // Assuming you have a 'createdAt' field in your documents to sort by
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
        console.error("Error fetching latest posts: ", error);
        Swal.fire(
          "Error",
          "An error occurred while fetching the latest posts.",
          "error"
        );
      }
    };

    const unsubscribeLatestPost = onSnapshot(
      collection(db, "BlogPosts"),
      (snapshot) => {
        fetchLatestPost();
      }
    );

    const unsubscribeLatestPosts = onSnapshot(
      collection(db, "BlogPosts"),
      (snapshot) => {
        fetchLatestPosts();
      }
    );

    return () => {
      // Unsubscribe from the snapshots when the component is unmounted
      unsubscribeLatestPost();
      unsubscribeLatestPosts();
    };
  }, [latestPost?.id]);

  return (
    <>
      <section className={styles.FooterSection}>
        <div className={styles.footLeft}>
          <div className={styles.footCol}>
            <h4>About</h4>
            <ul>
              <li>
                <Link href="/about">HealthCare Biodiversity</Link>
              </li>
              <li>
                <Link href="/about#staff">Staff</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/advertise">Advertise</Link>
              </li>
              <li>
                <Link href="/career">Career</Link>
              </li>
              <li>
                <Link href="/sitemap">Site Map</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footCol}>
            <h4>Legal</h4>
            <ul>
              <li>
                <Link href="/terms-and-conditions">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/code-of-conduct">Code of Conduct</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footCol}>
            <h4>Trending 🔥</h4>
            <ul>
              {latestPosts.length > 0 ? (
                <ul>
                  {latestPosts.slice(0, 3).map((post) => (
                    <li key={post.id}>
                      <Link
                        href={`/blogs/${post.id}`}
                        style={{ whiteSpace: "normal" }}
                      >
                        {post.category}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No Latest Posts Found</div>
              )}
            </ul>
          </div>
        </div>
        <div className={styles.footRight}>
          <div className={styles.footCol}>
            <h4>Follow Us</h4>
            <ul>
              <li>
                <Link href="/">
                  <BsInstagram /> {"  "} Instagram
                </Link>
              </li>
              <li>
                <Link href="/">
                  <BsFacebook />
                  {"  "} Facebook
                </Link>
              </li>
              <li>
                <Link href="/">
                  <BsTwitter />
                  {"  "} Twitter
                </Link>
              </li>
              <li>
                <Link href="/">
                  <BsYoutube />
                  {"  "} YouTube
                </Link>
              </li>
              <li>
                <Link href="/">
                  <BsLinkedin />
                  {"  "} Linkedin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <footer className={styles.Footer}>
        © {Year} HealthCare Biodiversity | All Rights Reserved.
      </footer>
    </>
  );
}
