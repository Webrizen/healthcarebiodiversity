import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const querySnapshot = await getDocs(collection(db, 'BlogPosts'));
    const postsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
    return NextResponse.json({ posts: postsData });
  } catch (error) {
    console.error('Error fetching blog posts: ', error);
    return NextResponse.error('An error occurred while fetching blog posts.');
  }
}
