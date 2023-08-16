import React from "react";
import Image from "next/image";
import styles from "@/app/styles/latestPosts.module.css";
import { BsDot } from "react-icons/bs";
import { checkEnvironment } from "./checkEnvironment";
import Link from "next/link";

async function getData() {
  const res = await fetch(
    checkEnvironment().concat("/api/latestposts"),
    { cache: "force-cache" },
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

function generateLinkTitle(title) {
  return title
    .replace(/[^\w\s]/gi, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .toLowerCase();
}

const LatestPost = async () => {
  const data = await getData();
  const linkTitle = generateLinkTitle(data.latestPost.title);

  return (
    <>
      <Link href={`/blogs/${linkTitle}`}>
        <div className={styles.latestPost}>
          <Image
            src={data.latestPost.image || "/placeholder.svg"}
            alt={data.latestPost.title || "Please Check Your Internet Connection."}
            width={600}
            height={400}
            placeholder="blur"
            blurDataURL="/placeholder.svg"
            quality={100}
          />
          <div className={styles.info}>
            <p>
              {data.latestPost.category || "Loading..."} <BsDot />{" "}
              {data.latestPost.author || "Loading..."}
            </p>
            <h1>{data.latestPost.title || "Loading..."}</h1>
            <span>{data.latestPost.shortDescription || "Loading..."}</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default LatestPost;