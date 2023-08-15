import React from "react";
import Image from "next/image";
import styles from "@/app/styles/latestPosts.module.css";
import { BsDot } from "react-icons/bs";
import { checkEnvironment } from "./checkEnvironment";

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



const LatestPost = async () => {
  const data = await getData();
  const svgSource = `/blur.svg`;
  const base64Svg = `data:image/svg+xml;base64,${btoa(svgSource)}`;
  return (
    <>
    <div className={styles.latestPost}>
      <Image
        src={data.latestPost.image || "/placeholder.svg"}
        alt={data.latestPost.title || "Please Check Your Internet Connection."}
        width={600}
        height={400}
        placeholder="blur"
        blurDataURL={base64Svg}
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
    </>
  );
};

export default LatestPost;
