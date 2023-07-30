import React from "react";
import styles from "@/app/styles/pages.module.css";
import Logo from "@/app/assets/main-logo.png";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Advertise With Us",
  description: `HealthCare BioDiversity" provides an exceptional platform for partners to connect with enthusiastic and discerning audiences interested in healthcare biodiversity. Our company hosts a diverse range of events that seamlessly integrate in-person experiences with digital media and branded content. Additionally, we curate exclusive media specials focused on significant healthcare biodiversity milestones and tech advancements.`,
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
              Branded Content. Digital Media. Events.
            </h1>
            <p className={styles.description}>
              HealthCare BioDiversity" provides an exceptional platform for
              partners to connect with enthusiastic and discerning audiences
              interested in healthcare biodiversity. Our company hosts a diverse
              range of events that seamlessly integrate in-person experiences
              with digital media and branded content. Additionally, we curate
              exclusive media specials focused on significant healthcare
              biodiversity milestones and tech advancements.
              <br />
              <br />
              At "HealthCare BioDiversity," we take pride in crafting
              influential content that captivates readers and positions brands
              as prominent thought leaders within the healthcare and
              biodiversity sectors. Our commitment to engaging storytelling
              empowers our partners to make a meaningful impact on their target
              audience, driving innovation and advancements in the field of
              healthcare biodiversity.
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
