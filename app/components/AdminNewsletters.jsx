"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/admin.module.css";
import Swal from "sweetalert2";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function AdminNewsletters() {
    const [newsletters, setNewsletters] = useState([]);
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
  
    // Function to fetch all newsletters from Firestore
    const fetchNewsletters = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Newsletters'));
        const newslettersData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // Add the document ID as "id" field
            ...data,
            // Check if createdAt field exists before converting to date
            timestamp: data.timestamp?.toDate()?.toLocaleString() || 'N/A',
          };
        });
        setNewsletters(newslettersData);
  
        if (newslettersData.length === 0) {
          // Show a message using SweetAlert2 if there are no newsletters available
          Swal.fire({
            icon: 'info',
            title: 'No Newsletters',
            text: 'There are no newsletters available in the collection.',
          });
        }
      } catch (error) {
        console.error('Error fetching newsletters: ', error);
        // Handle the error, e.g., show a message to the user
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching the newsletters. Please try again.',
        });
      }
    };
  
    useEffect(() => {
      fetchNewsletters();
    }, []);

    const handleDelete = async (id) => {
        try {
          // Show a confirmation message using SweetAlert2
          const result = await Swal.fire({
            icon: 'warning',
            title: 'Delete Newsletter?',
            text: 'Are you sure you want to delete this newsletter?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#dc3545',
            cancelButtonText: 'Cancel',
          });
    
          if (result.isConfirmed) {
            // Delete the newsletter from Firestore
            await deleteDoc(doc(db, 'Newsletters', id));
    
            // Show a success message using SweetAlert2
            Swal.fire({
              icon: 'success',
              title: 'Newsletter Deleted',
              text: 'The newsletter has been successfully deleted.',
            });
    
            // Refresh the newsletters list
            fetchNewsletters();
          }
        } catch (error) {
          console.error('Error deleting newsletter: ', error);
          // Show an error message using SweetAlert2 if there's an error
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while deleting the newsletter.',
          });
        }
      };

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page's newsletters
  const currentNewsletters = newsletters.slice(startIndex, endIndex);
  return (
    <>
      <div className={styles.tablecontainer}>
      <h2>All Newsletters</h2>
      <table>
        <thead style={{ whiteSpace: 'nowrap' }}>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Joined At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentNewsletters.length > 0 ? (
            currentNewsletters.map((newsletter, index) => (
              <tr key={index}>
                <td>{newsletter.email}</td>
                <td>{newsletter.name}</td>
                <td style={{ whiteSpace: 'nowrap' }} >{newsletter.timestamp}</td>
                <td>
              <button onClick={() => handleDelete(newsletter.id)}>
                Delete
              </button>
            </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No newsletters available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {newsletters.length > itemsPerPage && (
        <div className={styles.pagination}>
          {Array.from({
            length: Math.ceil(newsletters.length / itemsPerPage),
          }).map((item, index) => (
            <button
              key={index}
              className={index + 1 === currentPage ? styles.active : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
    </>
  )
}
