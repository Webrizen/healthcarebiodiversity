"use client";
import React, { useState, useEffect } from 'react';
import styles from "@/app/styles/admin.module.css";
import Swal from 'sweetalert2';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default function ManageCareers() {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    // Fetch all careers from Firestore
    const fetchCareers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Careers'));
        const careersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCareers(careersData);
      } catch (error) {
        console.error('Error fetching careers: ', error);
        Swal.fire('Error', 'An error occurred while fetching careers.', 'error');
      }
    };

    fetchCareers();
  }, []);

  // Function to handle deleting a career
  const handleDeleteCareer = async (careerId) => {
    try {
      await deleteDoc(doc(db, 'Careers', careerId));
      // Show success message using SweetAlert2
      Swal.fire('Success', 'Career deleted successfully!', 'success');
      // Remove the deleted career from the state to update the table
      setCareers(prevCareers => prevCareers.filter(career => career.id !== careerId));
    } catch (error) {
      console.error('Error deleting career: ', error);
      // Show error message using SweetAlert2
      Swal.fire('Error', 'An error occurred while deleting the career.', 'error');
    }
  };

  return (
    <>
      <section>
        <h1>Manage Careers</h1>
        <div className={styles.tablecontainer}>
          <table>
            <thead>
              <tr className={styles.tr}>
                <th>Job Title</th>
                <th>Job Description</th>
                <th>Date</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {careers.length > 0 ? (
                careers.map((career) => (
                  <tr key={career.id}>
                    <td>{career.jobTitle}</td>
                    <td>{career.jobDescription}</td>
                    <td>{career.date}</td>
                    <td>{career.location}</td>
                    <td>
                      <button onClick={() => handleDeleteCareer(career.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No careers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
