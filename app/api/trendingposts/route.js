import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  try {
    const querySnapshot = await getDocs(collection(db, 'BlogPosts'), {
      orderBy: 'createdAt',
      limit: 7, // Fetch 7 posts (including the first one to be excluded)
    });

    const trendingPostsData = querySnapshot.docs
      .slice(1) // Exclude the first post
      .map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ trendingPosts: trendingPostsData });
  } catch (error) {
    console.error('Error fetching trending posts: ', error);
    return NextResponse.error('An error occurred while fetching trending posts.');
  }
}