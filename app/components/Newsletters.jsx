"use client";
import React, { useState } from 'react';
import styles from '@/app/styles/pages.module.css';
import Swal from 'sweetalert2';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default function Newsletters() {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if the name and email fields are not empty
    if (!name || !email) {
      Swal.fire('Incomplete Form', 'Please fill in all fields.', 'error');
      return;
    }

    // Create a new object with the form data
    const formData = {
      name,
      email,
      timestamp: serverTimestamp(), // Add a timestamp for the submission
    };

    try {
      // Add the form data to the "Newsletters" collection in Firestore
      await addDoc(collection(db, 'Newsletters'), formData);

      // Show a success message using SweetAlert2 after successful submission
      Swal.fire({
        icon: 'success',
        title: 'Subscribed!',
        text: 'You have successfully subscribed to our newsletters.',
        showConfirmButton: false,
        timer: 2000,
      });

      // Clear the form fields after successful submission
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error adding newsletter subscription: ', error);

      // Show an error message using SweetAlert2 if there's an error
      Swal.fire('Error', 'An error occurred while subscribing to our newsletters.', 'error');
    }
  };
  return (
    <>
     <div className={styles.newsletterPage}>
      <form className={styles.newsletterForm} onSubmit={handleFormSubmit}>
        <h2>Subscribe To Our Newsletters</h2>
        <p>***It's Completely Free!***</p>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Subscribe</button>
      </form>
    </div> 
    </>
  )
}
