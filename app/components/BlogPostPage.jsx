"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import styles from "@/app/styles/pages.module.css";
import { MdComment } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import {
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoPinterest,
  IoLogoWhatsapp,
  IoLogoInstagram,
  IoMdLink,
  IoMdClose,
  IoLogoReddit,
} from "react-icons/io";
import { useRouter } from "next/navigation";

export default function BlogPostPage({ params }) {
  // Inside your component
  const router = useRouter();
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(url, "_blank");
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(url, "_blank");
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(url, "_blank");
  };

  const handleRedditShare = () => {
    const url = `https://www.reddit.com/submit?url=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(url, "_blank");
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(url, "_blank");
  };

  const handleCopyLink = () => {
    // Create a temporary input element to hold the URL
    const tempInput = document.createElement("input");
    tempInput.value = currentUrl;
    document.body.appendChild(tempInput);

    // Select and copy the URL
    tempInput.select();
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    // Show a success message (optional)
    Swal.fire(
      "Link Copied!",
      "The page URL has been copied to the clipboard.",
      "success"
    );
  };

  const { id } = params;
  const [blogData, setBlogData] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);

  useEffect(() => {
    // Fetch the specific blog post using the document ID
    const fetchBlogPost = async () => {
      try {
        if (!id) return; // If "id" is not available, return early

        const blogDocRef = doc(db, "BlogPosts", id);
        const blogDocSnapshot = await getDoc(blogDocRef);

        if (blogDocSnapshot.exists()) {
          // If the blog post with the given document ID exists, set the data in the state
          setBlogData(blogDocSnapshot.data());
        } else {
          // If the blog post does not exist, handle the case
          Swal.fire(
            "Blog Post Not Found",
            "The requested blog post does not exist.",
            "info"
          );
        }
      } catch (error) {
        console.error("Error fetching blog post: ", error);
        Swal.fire(
          "Error",
          "An error occurred while fetching the blog post.",
          "error"
        );
      }
    };

    fetchBlogPost();
  }, [id]);

  useEffect(() => {
    // Fetch 4 blogs from Firestore and store them in the state
    const fetchOtherBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "BlogPosts"), {
          limit: 4, // Get 4 latest blogs
        });

        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOtherBlogs(blogsData.filter((blog) => blog.id !== id)); // Exclude the current blog post
      } catch (error) {
        console.error("Error fetching other blogs: ", error);
        // Handle the error, e.g., show a message to the user
      }
    };

    fetchOtherBlogs();
  }, [id]);

  // If the blog post is not available yet, you can show a loading state or a message
  if (!blogData || !otherBlogs.length) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <section className={styles.twomainCol}>
        <div className={styles.mainContent}>
          <span className={styles.cato}>{blogData.category}</span>
          <h1>{blogData.title}</h1>
          <div className={styles.twocol}>
            <span className={styles.Something}>
              {blogData.author} <BsDot />{" "}
              {new Date(blogData.date.seconds * 1000).toLocaleString()}
            </span>
            <span className={styles.cato}>
              <MdComment /> Comment
            </span>
          </div>
          {blogData.image ? (
            <Image
              src={blogData.image}
              alt="Blog Post Image"
              width={400}
              height={300}
              className={styles.Image}
              priority={true}
            />
          ) : (
            <div>No Image</div>
          )}
          <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
          <hr />
          <h2>More To Read</h2>
          <div className={styles.threeCol}>
            {otherBlogs.map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.id}`}>
                <div className={styles.SingleCard}>
                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt="Blog Post Image"
                      width={400}
                      height={300}
                      className={styles.NextImage}
                      priority={true}
                    />
                  ) : (
                    <div>No Image</div>
                  )}
                  <h3>{blog.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.options}>
          <div className={styles.threeicons}>
            <Link href="/">
              <div className={styles.icoSpecail}>
                <IoMdClose style={{ position: "absolute" }} />
              </div>
            </Link>
            <div className={styles.ico} onClick={handleTwitterShare}>
              <IoLogoTwitter />
            </div>
            <div className={styles.ico} onClick={handleFacebookShare}>
              <IoLogoFacebook />
            </div>
            <div className={styles.ico} onClick={handleLinkedInShare}>
              <IoLogoLinkedin />
            </div>
            <div className={styles.ico} onClick={handleRedditShare}>
              <IoLogoReddit />
            </div>
            <div className={styles.ico} onClick={handleWhatsAppShare}>
              <IoLogoWhatsapp />
            </div>
            <div className={styles.ico} onClick={handleCopyLink}>
              <IoMdLink />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
