import React from 'react';
import styles from '@/app/styles/componets.module.css';
import Image from 'next/image';
import Logo from '@/app/assets/logo.png';
import Link from 'next/link';

export default function Navbar() {
  return (
    <>
     <header className={styles.Navbar}>
      <Link href="/">
      <div className={styles.logo}>
        <Image src={Logo} alt='HealthCare biodiversity'/>
      </div>
      </Link>
      <div className={styles.leftHeader}>
        <Link href="/admin"><button>Newsletters</button></Link>
      </div>
      </header> 
    </>
  )
}
