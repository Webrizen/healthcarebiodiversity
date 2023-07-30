"use client";
import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Swal from 'sweetalert2';
import styles from "@/app/styles/admin.module.css";
import 'sweetalert2/dist/sweetalert2.min.css';

export default function AdminContact() {
    const [contacts, setContacts] = useState([]);

    // Function to fetch all contact data from Firestore
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'contact'));
        const contactsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setContacts(contactsData);
      } catch (error) {
        console.error('Error fetching contacts: ', error);
        // Show an error message using SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching contacts. Please try again.',
        });
      }
    };
  
    // Function to delete a contact document
    const handleDeleteContact = async (contactId) => {
      // Show a confirmation alert before deleting the contact
      Swal.fire({
        icon: 'warning',
        title: 'Delete Contact',
        text: 'Do you really want to delete this contact?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteDoc(doc(db, 'contact', contactId));
            // Fetch the updated contacts after deletion
            fetchContacts();
            // Show a success message using SweetAlert2
            Swal.fire({
              icon: 'success',
              title: 'Contact Deleted Successfully!',
              text: 'You have successfully deleted the contact.',
              showConfirmButton: false,
              timer: 1500,
            });
          } catch (error) {
            console.error('Error deleting contact: ', error);
            // Show an error message using SweetAlert2
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while deleting the contact. Please try again.',
            });
          }
        }
      });
    };
  
    // Fetch all contacts on component mount
    useEffect(() => {
      fetchContacts();
    }, []);
  return (
    <>
     <h1>Manage Contacts</h1>
      <div className={styles.tablecontainer}>
      {contacts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
                <td>
                  <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No contacts found.</p>
      )}
      </div> 
    </>
  )
}
