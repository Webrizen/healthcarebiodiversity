import React from "react";
import styles from "@/app/styles/sixposts.module.css";
import Image from "next/image";
import { BsDot } from "react-icons/bs";
import { checkEnvironment } from "./checkEnvironment";

// async function getData() {
//   const res = await fetch(checkEnvironment().concat("/api"), {
//     cache: "force-cache",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

const SixPosts = async () => {
  // const data = await getData();
  // const posts = data.posts.slice(-6);

  return (
    <div className={styles.SixPosts}>
      {/* {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className={styles.card}>
            <div className={styles.image}>
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title || "Something Went Wrong!"}
                width={600}
                placeholder="blur"
                blurDataURL="/placeholder.svg"
                quality={100}
                height={400}
              />
            </div>
            <div className={styles.info}>
              <p>
                {post.category || "Loading..."} <BsDot />{" "}
                {post.author || "Loading..."}
              </p>
              <h1>{post.title || "Loading..."}</h1>
              <span>{post.shortDescription || "Loading..."}</span>
            </div>
          </div>
        ))
      ) : (
        <p>No blog posts available.</p>
      )} */}
      just api things
    </div>
  );
};

export default SixPosts;
