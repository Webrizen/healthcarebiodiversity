import React from 'react';
import styles from '@/app/styles/componets.module.css';
import Image from 'next/image';
import Logo from '@/app/assets/logo.png';
import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';

export default function Navbar() {
  return (
    <>
      <header className={styles.Navbar}>
        <Link href="/">
          <div className={styles.logo}>
            <Image src={Logo} priority alt="HealthCare biodiversity" />
          </div>
        </Link>
        <div className={styles.leftHeader}>
          <Link href="/newsletters">
            <button style={{ background: '#1f1f1f', color: '#f1f1f1' }} >Newsletters</button>
          </Link>
          {"  "}{"  "}
          <Link href="/search">
          <div className={styles.ico}>
          <BsSearch size={20} />
          </div>
          </Link>
        </div>
      </header>
    </>
  );
}
