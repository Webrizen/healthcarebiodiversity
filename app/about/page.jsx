import React from 'react';
import styles from '@/app/styles/pages.module.css';
import Logo from '@/app/assets/main-logo.png';
import StaffLogo from '@/app/assets/staff.png';
import Emplyee1 from '@/app/assets/emplyee1.png'
import Image from 'next/image';

export const metadata = {
    title: "About Us",
    description: `HealthCare Biodiversity is a company dedicated to writing about healthcare and biodiversity.
    We are passionate about improving healthcare practices while preserving our planet's diverse ecosystems.
    Our mission is to bridge the gap between the healthcare industry and biodiversity conservation efforts.`
  }

export default function page() {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.aboutContainer}>
          <div className={styles.logoContainer}>
            <Image src={Logo} alt="HealthCare Biodiversity" className={styles.logo} />
          </div>
          <div className={styles.contentContainer}>
            <h1 className={styles.heading}>About Us</h1>
            <p className={styles.description}>
              HealthCare Biodiversity is a company dedicated to writing about healthcare and biodiversity.
              We are passionate about improving healthcare practices while preserving our planet's diverse ecosystems.
              Our mission is to bridge the gap between the healthcare industry and biodiversity conservation efforts.
            </p>
            <p className={styles.mission}>
              Our Mission:
            </p>
            <ul className={styles.missionList} style={{ listStyle: 'none' }}>
              <li>Advance medical research for sustainable healthcare solutions.</li>
              <li>Raise awareness about the importance of biodiversity conservation.</li>
              <li>Promote ethical practices that prioritize both human health and the environment.</li>
            </ul>
          </div>
        </div>
      </section>
      <section className={styles.section} id='staff'>
        <div className={styles.aboutContainer}>
          <div className={styles.logoContainer}>
            <Image src={StaffLogo} alt="Our Staff at HealthCare Biodiversity" className={styles.logoStaff} />
          </div>
          <div className={styles.contentContainer}>
            <h1 className={styles.heading}>Our Staff</h1>
            <p className={styles.description}>
              Meet the dedicated team of professionals at HealthCare Biodiversity.
              Each member of our staff is committed to making a positive impact on healthcare and biodiversity.
              Get to know our team below:
            </p>
            <div className={styles.staffGrid}>
              <div className={styles.staffCard}>
                <Image src={Emplyee1} alt="Staff Member 1" className={styles.staffImage} />
                <h3>John Doe</h3>
                <p>Medical Researcher</p>
              </div>
              <div className={styles.staffCard}>
                <Image src={Emplyee1} alt="Staff Member 2" className={styles.staffImage} />
                <h3>Jane Smith</h3>
                <p>Biodiversity Specialist</p>
              </div>
              <div className={styles.staffCard}>
                <Image src={Emplyee1} alt="Staff Member 1" className={styles.staffImage} />
                <h3>John Doe</h3>
                <p>Medical Researcher</p>
              </div>
              <div className={styles.staffCard}>
                <Image src={Emplyee1} alt="Staff Member 2" className={styles.staffImage} />
                <h3>Jane Smith</h3>
                <p>Biodiversity Specialist</p>
              </div>
              <div className={styles.staffCard}>
                <Image src={Emplyee1} alt="Staff Member 1" className={styles.staffImage} />
                <h3>John Doe</h3>
                <p>Medical Researcher</p>
              </div>
              <div className={styles.staffCard}>
                <Image src={Emplyee1} alt="Staff Member 2" className={styles.staffImage} />
                <h3>Jane Smith</h3>
                <p>Biodiversity Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
