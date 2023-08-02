import React from 'react';
import styles from '@/app/styles/componets.module.css';
import Image from 'next/image';
import Logo from '@/app/assets/logo.png';
import Link from 'next/link';
import { CgMenu } from 'react-icons/cg';

export default function Navbar({ onToggleSidebar }) {
  return (
    <>
      <header className={styles.Navbar}>
        <Link href="/">
          <div className={styles.logo}>
            <Image src={Logo} alt="HealthCare biodiversity" />
          </div>
        </Link>
        <div className={styles.leftHeader}>
          <Link href="/newsletters">
            <button style={{ background: '#1f1f1f', color: '#f1f1f1' }} >Newsletters</button>
          </Link>
          {"  "}{"  "}
          <div className={styles.ico}>
          <CgMenu onClick={onToggleSidebar} />
          </div>
        </div>
      </header>
    </>
  );
}
