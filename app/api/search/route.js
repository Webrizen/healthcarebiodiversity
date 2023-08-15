import { NextResponse } from 'next/server';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';

export async function POST(req) {
  const { searchText } = await req.json();

  try {
    const postsRef = collection(db, 'BlogPosts');
    const q = query(postsRef, where('title', '>=', searchText));

    const querySnapshot = await getDocs(q);
    const searchResults = querySnapshot.docs.map((doc) => doc.data());

    return NextResponse.json({ searchResults });
  } catch (error) {
    console.error('Error searching for posts: ', error);
    return NextResponse.error('An error occurred while searching for posts.');
  }
}
