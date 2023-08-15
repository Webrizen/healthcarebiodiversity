import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  try {
    const querySnapshot = await getDocs(collection(db, 'BlogPosts'), {
      orderBy: 'createdAt',
      limit: 1, // Get only the latest post
    });

    const latestPostData = querySnapshot.docs[0].data();

    return NextResponse.json({ latestPost: latestPostData });
  } catch (error) {
    console.error('Error fetching latest post: ', error);
    return NextResponse.error('An error occurred while fetching the latest post.');
  }
}
