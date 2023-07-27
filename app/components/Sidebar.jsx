import React from "react";
import styles from "@/app/styles/componets.module.css";
import { IoMdSearch } from "react-icons/io";
import { RiHealthBookFill } from "react-icons/ri";
import Link from "next/link";

export default function Sidebar() {
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
            <Link href="/admin">
              <li>
                <RiHealthBookFill className={styles.categoryIcon} />
                HealthCare
              </li>
            </Link>
            <Link href="/">
              <li>
                <RiHealthBookFill className={styles.categoryIcon} />
                Biodiversity
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
