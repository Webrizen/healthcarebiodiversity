import React from "react";
import styles from "@/app/styles/componets.module.css";
import Link from "next/link";

export default function Footer() {
  const Year = new Date().getFullYear();
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
            <li>
              <Link href="/">About Our Ads</Link>
            </li>
          </ul>
        </div>
        <div className={styles.footCol}>
          <h4>Trending 🔥</h4>
          <ul>
            <li >
              <Link
                href="/2023/07/06/tech-industry-layoffs-2023/"
              >
                Tech Layoffs
              </Link>
            </li>
            <li >
              <Link
                href="/2023/06/28/chatgpt-everything-you-need-to-know-about-the-open-ai-powered-chatbot/"
              >
                ChatGPT
              </Link>
            </li>
            <li >
              <Link
                href="/2023/07/10/what-is-instagrams-threads-app-all-your-questions-answered/"
              >
                Threads FAQ
              </Link>
            </li>
          </ul>
        </div>
        </div>
        <div className={styles.footRight}>
        <div className={styles.footCol}>
          <h4>Follow Us</h4>
          <ul>
            <li >
              <Link
                href="/"
              >
                Instagram
              </Link>
            </li>
            <li >
              <Link
                href="/"
              >
                Facebook
              </Link>
            </li>
            <li >
              <Link
                href="/"
              >
                Twitter
              </Link>
            </li>
            <li >
              <Link
                href="/"
              >
                YouTube
              </Link>
            </li>
            <li >
              <Link
                href="/"
              >
                Linkdin
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
