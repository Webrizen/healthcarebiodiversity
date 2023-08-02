"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/firebase/config";
import Swal from "sweetalert2";
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
  const [tags, setTags] = useState(""); // State to hold the tags as a comma-separated string
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Function to fetch the categories from Firestore
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories: ", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while fetching the categories. Please try again.",
        });
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    try {
      Swal.fire({
        title: "Uploading Data...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      const storage = getStorage();
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

      // Parse the tags from the comma-separated string and store them as an array
      const tagsArray = tags.split(",").map((tag) => tag.trim());

      const newBlogPost = {
        title,
        shortDescription,
        image: downloadURL,
        content,
        author,
        category,
        tags: tagsArray, // Add the tags array to the blog post object
        date: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "BlogPosts"), newBlogPost);

      console.log("Blog post added with ID: ", docRef.id);

      Swal.fire({
        icon: "success",
        title: "Blog Post Added!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTitle("");
      setShortDescription("");
      setImage("");
      setContent("");
      setAuthor("");
      setCategory("");
      setTags("");
      setFile(null);
    } catch (error) {
      console.error("Error adding blog post: ", error);
      Swal.fire("Error", "An error occurred while adding the blog post.", "error");
    }
  };

  return (
    <>
      <section className={styles.AddBlog}>
        <h2>Add New Blog</h2>
        <form onSubmit={handleUpload}>
          <div>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label>Short Description:</label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              style={{ height: "200px", borderRadius: "4px" }}
            />
          </div>
          <div style={{ marginTop: "40px" }}>
            <label>Image Upload:</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div style={{ marginTop: "10px" }}>
            <label>Content:</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              style={{ height: "400px", borderRadius: "4px" }}
            />
          </div>
          <div style={{ marginTop: "40px" }}>
            <label>Author:</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div>
            <label>Categories:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Tags:</label>
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
            <small>Enter tags separated by commas (e.g., tag1, tag2, tag3)</small>
          </div>
          <button type="submit">Add Blog Post</button>
        </form>
      </section>
    </>
  );
}

