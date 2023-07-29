"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import the styles for the editor
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/firebase/config";
import Swal from 'sweetalert2';
import styles from "@/app/styles/admin.module.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function New() {
    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    };
  
    const handleUpload = async () => {
      event.preventDefault();
      try {
        // Show a loading message using SweetAlert2 while uploading data
        Swal.fire({
          title: 'Uploading Data...',
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
    
        // Step 1: Upload the image file to Firebase Storage
        const storage = getStorage();
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
    
        // Step 2: Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);
    
        // Step 3: Create a new blog post object with the form data, including the image URL
        const newBlogPost = {
          title,
          shortDescription,
          image: downloadURL,
          content,
          author,
          category,
          date: serverTimestamp(),
        };
    
        // Step 4: Add the new blog post to the "BlogPosts" collection in Firestore
        const docRef = await addDoc(collection(db, 'BlogPosts'), newBlogPost);
    
        console.log('Blog post added with ID: ', docRef.id);
    
        // Show a success message using SweetAlert2 after successful submission
        Swal.fire({
          icon: 'success',
          title: 'Blog Post Added!',
          showConfirmButton: false,
          timer: 1500,
        });
    
        // Step 5: Clear the form fields and file input after successful submission
        setTitle('');
        setShortDescription('');
        setImage('');
        setContent('');
        setAuthor('');
        setCategory('');
        setFile(null);
      } catch (error) {
        console.error('Error adding blog post: ', error);
        // Show an error message using SweetAlert2 if there's an error
        Swal.fire('Error', 'An error occurred while adding the blog post.', 'error');
      }
    };
  
    return (
      <>
        <section className={styles.AddBlog}>
          <h2>Add New Blog</h2>
          <form onSubmit={handleUpload}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Short Description:</label>
              <textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                style={{ height: '200px', borderRadius: '4px' }}
              />
            </div>
            <div style={{ marginTop: '40px' }}>
              <label>Image Upload:</label>
              <input type="file" onChange={handleFileChange} />
            </div>
            <div style={{ marginTop: '10px' }}>
              <label>Content:</label>
              <ReactQuill value={content} onChange={setContent} style={{ height: '400px', borderRadius: '4px' }} />
            </div>
            <div style={{ marginTop: '40px' }}>
              <label>Author:</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div>
              <label>Category:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <button type="submit">Add Blog Post</button>
          </form>
        </section>
      </>
    );
}
