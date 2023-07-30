import React from "react";
import styles from "@/app/styles/pages.module.css";
import Logo from "@/app/assets/main-logo.png";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: `Learn about our Privacy Policy at HealthCare BioDiversity. We are committed to safeguarding your privacy and protecting your personal information.`,
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
            <h1 className={styles.heading}>Our Privacy Policy</h1>
            <p className={styles.description} style={{ textAlign: "left" }}>
              At HealthCare BioDiversity, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website or services.
              <br /> <br />
              <strong>Information We Collect:</strong> We may collect personal information, such as your name, email address, and other relevant details when you sign up for our newsletter, submit a contact form, or participate in surveys.
              <br /> <br />
              <strong>How We Use Your Information:</strong> We use the information collected to provide you with relevant content, improve our services, and communicate with you about our latest updates and offerings.
              <br /> <br />
              <strong>Data Security:</strong> We employ industry-standard security measures to protect your data from unauthorized access, disclosure, or alteration.
              <br /> <br />
              <strong>Third-Party Services:</strong> We may use third-party services, such as analytics tools, to understand website traffic and user behavior. These services may collect information about your interactions with our site.
              <br /> <br />
              <strong>Cookie Policy:</strong> Our website may use cookies to enhance your browsing experience. You can manage cookie preferences through your browser settings.
              <br /> <br />
              <strong>Your Rights:</strong> You have the right to access, modify, or delete your personal information held by us. You can also unsubscribe from our communications at any time.
              <br /> <br />
              <strong>Updates to Privacy Policy:</strong> We may update this Privacy Policy from time to time. Any changes will be reflected on this page, so we encourage you to review it periodically.
              <br /> <br />
              <strong>Contact Us:</strong> If you have any questions or concerns about our Privacy Policy or data practices, please contact us via our contact form or email.
              <br /> <br />
              By using our website or services, you consent to the terms outlined in this Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
