import React from "react";
import styles from "@/app/styles/pages.module.css";
import Logo from "@/app/assets/main-logo.png";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions",
  description: `Welcome to HealthCare BioDiversity! These Terms & Conditions outline the rules and regulations for the use of our platform and services. By accessing and using our website and services, you accept and agree to be bound by these Terms & Conditions. If you disagree with any part of these terms, please do not use our platform.`,
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
            <h1 className={styles.heading}>Our Terms & Conditions</h1>
            <p className={styles.description} style={{ textAlign: "left" }}>
              Welcome to HealthCare BioDiversity! These Terms & Conditions
              outline the rules and regulations for the use of our platform and
              services. By accessing and using our website and services, you
              accept and agree to be bound by these Terms & Conditions. If you
              disagree with any part of these terms, please do not use our
              platform.
              <br /> <br />
              1. Use of Content: All content on this website, including
              articles, images, videos, and other media, is the property of
              HealthCare BioDiversity and protected by copyright laws. You may
              not reproduce, modify, or distribute any content without prior
              written permission from us.
              <br /> <br />
              2. User Contributions: Users of our platform may contribute
              content, such as comments, reviews, or articles. By submitting
              user contributions, you grant HealthCare BioDiversity a
              non-exclusive, royalty-free, perpetual, and worldwide license to
              use, modify, and publish the content for any purpose.
              <br /> <br />
              3. Privacy: Protecting your privacy is important to us. Please
              review our Privacy Policy to understand how we collect, use, and
              disclose personal information.
              <br /> <br />
              4. Disclaimer: The information provided on this platform is for
              general informational purposes only. While we strive to keep the
              content accurate and up-to-date, we make no representations or
              warranties of any kind, express or implied, about the
              completeness, accuracy, reliability, suitability, or availability
              of the information.
              <br /> <br />
              5. Limitation of Liability: HealthCare BioDiversity shall not be
              liable for any direct, indirect, incidental, special, or
              consequential damages that result from the use of, or inability to
              use, our platform and services.
              <br /> <br />
              6. Changes to Terms & Conditions: We reserve the right to update
              or modify these Terms & Conditions at any time without prior
              notice. The revised version will be effective as soon as it is
              published on this page.
              <br /> <br />
              If you have any questions or concerns regarding our Terms &
              Conditions, please contact us through the provided contact
              information.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
