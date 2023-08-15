import styles from '@/app/styles/pages.module.css';
import Link from 'next/link';
import LatestPost from '@/app/components/LatestPost';
import TrendingPosts from '@/app/components/TrendingPosts';
import SixPosts from '@/app/components/SixPosts';

export default function Home() {
  
    return (
      <>
        <section className={styles.Home}>
          <div className={styles.HomeCard}>
          <LatestPost />
            <SixPosts/>
          </div>
          <div className={styles.VerticalPosts}>
            <TrendingPosts />
          </div>
        </section>
      </>
    );
  }