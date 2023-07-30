import React from "react";
import styles from "@/app/styles/pages.module.css";
import Logo from "@/app/assets/main-logo.png";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Career At HealthCare BioDiversity",
  description: `...`,
};

export default function page() {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.aboutContainer}>
          <div className={styles.logoContainer}>
            <Image
              src={Logo}
              alt="HealthCare Biodiversity"
              className={styles.logo}
            />
          </div>
          <div className={styles.contentContainer}>
            <h1 className={styles.heading}>
            Careers
            </h1>
            <p className={styles.description}>
              No Current Openings
              <br /><br />
              ***Send Us You CV OR Resume, If You're looking For Specific Job Role!***
            </p>
            <Link href="/contact">
              <button>Conatct</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
