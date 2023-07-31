"use client";
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import styles from "@/app/styles/admin.module.css";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function PostCareers() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [contactMail, setContactMail] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the career data to be added to Firestore
    const careerData = {
      jobTitle,
      jobDescription,
      contactMail,
      date,
      location,
    };

    try {
      // Add the career data to the "Careers" collection in Firestore
      const docRef = await addDoc(collection(db, 'Careers'), careerData);
      console.log('Career added with ID: ', docRef.id);

      // Show success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Career added successfully!',
      });

      // Reset the form fields after successful submission
      setJobTitle('');
      setJobDescription('');
      setContactMail('');
      setDate('');
      setLocation('');
    } catch (error) {
      console.error('Error adding career: ', error);

      // Show error message using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the career. Please try again.',
      });
    }
  };

  return (
    <div>
      <section className={styles.AddBlog}>
      <h1>Post New Careers</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            cols={30}
            rows={10}
          ></textarea>
        </div>
        <div>
          <label htmlFor="contactMail">Contact Mail</label>
          <input
            type="email"
            id="contactMail"
            value={contactMail}
            onChange={(e) => setContactMail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      </section>
      
    </div>
  );
}
