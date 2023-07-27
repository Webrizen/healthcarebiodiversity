import React from 'react';
import styles from '@/app/styles/componets.module.css';
import Image from 'next/image';
import Logo from '@/app/assets/logo.png';

export default function Navbar() {
  return (
    <>
     <header className={styles.Navbar}>
      <div className={styles.logo}>
        <Image src={Logo} alt='HealthCare biodiversity'/>
      </div>
      <div className={styles.leftHeader}>
        <button>Newsletters</button>
      </div>
      </header> 
    </>
  )
}
