import React from 'react';
import styles from '@/app/styles/TrendingPosts.module.css';
import Image from 'next/image';

async function getData() {
  const res = await fetch('https://healthcarebiodiversity.vercel.app/api/trendingposts', { cache: 'force-cache' }, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const TrendingPosts = async () => {
  const data = await getData();
  const trendingPosts = data.trendingPosts.slice(0, 5); // Only take the first 5 posts

  return (
    <div className={styles.vertposts}>
      {trendingPosts && trendingPosts.length > 0 ? (
        trendingPosts.map(post => (
          <>
          <div key={post.id} className={styles.TrendingPosts}>
            <div className={styles.info}>
              <span>{post.category || 'Loading...'}</span>
              <h2>{post.title || 'Loading...'}</h2>
              <p>By {post.author || 'Loading...'} on{' '}
                {new Date(post.date.seconds * 1000 + post.date.nanoseconds / 1000000).toLocaleString() ||
                  'Loading...'}</p>
            </div>
          </div>
          <hr />
          </>
        ))
      ) : (
        <p>No trending posts available.</p>
      )}
    </div>
  );
};

export default TrendingPosts;