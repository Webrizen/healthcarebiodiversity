import React from "react";
import styles from "@/app/styles/pages.module.css";
import Logo from "@/app/assets/main-logo.png";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Code Of Conduct",
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
            <h1 className={styles.heading}>Our Code Of Conduct</h1>
            <p className={styles.description} style={{ textAlign: "left" }}>
            <p className={styles.description} style={{ textAlign: "left" }}>
              At HealthCare BioDiversity, we strive to create a respectful and welcoming environment for all attendees. We base our Code of Conduct on the principles of inclusion, equality, diversity, and respect. Please review the guidelines below to ensure that everyone can safely enjoy our events.
              <br /> <br />
              <strong>Harassment Policy:</strong> HealthCare BioDiversity will not tolerate any type of harassment of attendees, including but not limited to:
              <br /> <br />
              - Inappropriate physical contact<br />
              - Unwelcome sexual attention<br />
              - Display of sexual images in public spaces<br />
              - Sustained disruption of talks or other events <br />
              - Advocating for or encouraging any of the above behaviors<br />
              <br /> <br />
              We are committed to ensuring a safe space for everyone, regardless of:
              <br /> <br />
              - Race<br />
              - Ethnicity<br />
              - Gender<br />
              - Gender identity and expression<br />
              - Sexual orientation<br />
              - Disability<br />
              - Physical appearance<br />
              - Body size<br />
              - Age<br />
              - Religion<br />
              <br /> <br />
              <strong>Reporting Incidents:</strong> If you experience or witness any violation of our Code of Conduct, we urge you to report it promptly to the TechCrunch staff. You can reach us by calling +1 (415) 579-3838 or emailing codeofconduct@techcrunch.com. In case of emergencies, please dial 911.
              <br /> <br />
              You can also report incidents to:
              <br /> <br />
              - Security staff stationed throughout the venue <br />
              - HealthCare BioDiversity volunteers, identifiable by their HealthCare BioDiversity T-shirts<br />
              - HealthCare BioDiversity employees<br />
              <br /> <br />
              <strong>Consequences of Violation:</strong> HealthCare BioDiversity reserves the right to take appropriate action in response to Code of Conduct violations. Those found in violation may be removed from the venue immediately without a refund and barred from attending future HealthCare BioDiversity events.
              <br /> <br />
              By attending, working for, vending at, or sponsoring any HealthCare BioDiversity event, conference, or conference-related social event, you agree to abide by the policies set forth in this Code of Conduct.
              <br /> <br />
              We thank you for helping us create an inclusive and respectful environment for all our attendees.
            </p>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
