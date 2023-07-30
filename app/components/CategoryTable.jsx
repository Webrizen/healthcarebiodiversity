"use client";
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Swal from 'sweetalert2';
import styles from "@/app/styles/admin.module.css";

const CategoryTable = () => {
    const [categories, setCategories] = useState([]);

    // Function to fetch the categories from Firestore
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories: ', error);
        // Show an error message using SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching the categories. Please try again.',
        });
      }
    };
  
    // Function to delete a category
    const handleDeleteCategory = async (categoryId) => {
      // Show a confirmation alert before deleting the category
      Swal.fire({
        icon: 'warning',
        title: 'Delete Category',
        text: 'Do you really want to delete this category?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteDoc(doc(db, 'categories', categoryId));
            // Show a success message using SweetAlert2
            Swal.fire({
              icon: 'success',
              title: 'Category Deleted Successfully!',
              text: 'You have successfully deleted the category.',
              showConfirmButton: false,
              timer: 1500,
            });
          } catch (error) {
            console.error('Error deleting category: ', error);
            // Show an error message using SweetAlert2
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while deleting the category. Please try again.',
            });
          }
        }
      });
    };
    
  
    // Fetch the categories and set up a Firestore listener on component mount
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, 'categories'), (querySnapshot) => {
        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);
      });
  
      // Clean up the listener on component unmount
      return () => unsubscribe();
    }, []);
  return (
    <section className={styles.CategoryTable}>
      <h1>Categories</h1>
      <table>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CategoryTable;