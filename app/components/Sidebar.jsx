import styles from "@/app/styles/componets.module.css";
// import { IoMdSearch } from "react-icons/io";
// import Link from "next/link";
// import { checkEnvironment } from "./checkEnvironment";

// async function getData() {
//   const res = await fetch(checkEnvironment().concat("/api/categories"), {
//     cache: "force-cache",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export default async function Sidebar() {
  // const data = await getData();
  return (
    <>
      <div className={styles.Sidebar}>
        <div className={styles.sideTop}>
          <div className={styles.categories}>
            <ul>
              {/* {data.categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.id}`}>{category.name}</Link>
                </li>
              ))} */} Now
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
