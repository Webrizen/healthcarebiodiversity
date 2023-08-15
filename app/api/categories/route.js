import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    const categoriesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ categories: categoriesData });
  } catch (error) {
    console.error('Error fetching categories: ', error);
    return NextResponse.error('An error occurred while fetching categories.');
  }
}
