"use client";
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Swal from 'sweetalert2';
import styles from "@/app/styles/admin.module.css";
import CategoryTable from '@/app/components/CategoryTable';

const Categories = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add the new category to the "categories" collection in Firestore
    try {
      const newCategory = {
        name: categoryName,
      };

      await addDoc(collection(db, 'categories'), newCategory);

      // Clear the input field after successful submission
      setCategoryName('');

      // Show a success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Category Added Successfully!',
        text: 'You have successfully added a new category.',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error adding category: ', error);
      // Show an error message using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the category. Please try again.',
      });
    }
  };

  return (
    <>
    <section className={styles.AddBlog}>
      <h1>Add New Category</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={handleCategoryNameChange}
          />
        </div>
        <button type="submit">Add Category</button>
      </form>
      <CategoryTable/>
      </section>
    </>
  );
};

export default Categories;