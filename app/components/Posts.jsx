"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import { db } from "@/firebase/config";
import styles from "@/app/styles/admin.module.css";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const itemsPerPage = 5;

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedShortDescription, setEditedShortDescription] = useState("");
  const [editedAuthor, setEditedAuthor] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const [editedImageFile, setEditedImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch all posts from the "BlogPosts" collection
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "BlogPosts"));
        const allPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Fetch all categories from the "categories" collection in Firestore
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
        // Show an error message using SweetAlert2
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while fetching the categories. Please try again.",
        });
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (postId) => {
    try {
      // Show a confirmation dialog using SweetAlert2
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this post!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      // If the user confirms the deletion, proceed with the deletion process
      if (result.isConfirmed) {
        // Delete the post from Firestore using the postId
        await deleteDoc(doc(db, "BlogPosts", postId));

        // Remove the deleted post from the local state
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

        // Show a success message using SweetAlert2
        Swal.fire("Deleted!", "The post has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting post: ", error);
      // Show an error message using SweetAlert2
      Swal.fire("Error", "An error occurred while deleting the post.", "error");
    }
  };

  const handleEditModalOpen = (post) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
    setEditedTitle(post.title);
    setEditedShortDescription(post.shortDescription);
    setEditedAuthor(post.author);
    setEditedCategory(post.category);
    setEditedContent(post.content);
    setEditedImage(post.image);
    setPreviewImage(post.image);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setEditedImageFile(selectedFile); // Update the editedImageFile state with the selected file

    // Generate a preview of the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditSubmit = async () => {
    try {
      // Show a loading message using SweetAlert2 while updating data
      Swal.fire({
        title: "Updating Data...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
  
      let editedImageURL = editedImage; // Use the current editedImage URL as the default value
  
      if (editedImageFile) {
        // If the editedImageFile contains a new image, upload it to Firebase Storage
        const storage = getStorage();
        const storageRef = ref(storage, `images/${editedImageFile.name}`);
        await uploadBytes(storageRef, editedImageFile);
  
        // Get the download URL of the uploaded image
        editedImageURL = await getDownloadURL(storageRef);
      }
  
      // Update the post data in Firestore
      await updateDoc(doc(db, "BlogPosts", selectedPost.id), {
        title: editedTitle,
        shortDescription: editedShortDescription,
        author: editedAuthor,
        category: editedCategory,
        content: editedContent,
        image: editedImageURL, // Update the image URL with the new or existing image URL
      });
  
      // Update the local state with the edited post data
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === selectedPost.id
            ? {
                ...post,
                title: editedTitle,
                shortDescription: editedShortDescription,
                author: editedAuthor,
                category: editedCategory,
                content: editedContent,
                image: editedImageURL,
              }
            : post
        )
      );
  
      setIsEditModalOpen(false);
  
      // Show a success message using SweetAlert2 after updating data
      Swal.fire({
        icon: "success",
        title: "Data Updated!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error editing post: ", error);
      // Show an error message using SweetAlert2 if there's an error
      Swal.fire("Error", "An error occurred while updating data.", "error");
    }
  };
  

  const totalPages = Math.ceil(posts.length / itemsPerPage);

  // Create a function to handle page navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "code", "code-block", "blockquote", "clean"],
    ],
  };

  return (
    <>
      <section>
        <h1>All Posts</h1>
        <div className={styles.tablecontainer}>
          <table>
            <thead>
              <tr className={styles.tr}>
                <th>Title</th>
                <th>Short Description</th>
                <th>Author</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan="5">No Data Found In The Table</td>
                </tr>
              ) : (
                posts
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((post) => (
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: post.shortDescription,
                        }}
                      />
                      <td>{post.author}</td>
                      <td>{post.category}</td>
                      <td className={styles.tdButtons}>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className={styles.delete}
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleEditModalOpen(post)}
                          className={styles.edit}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={
                    pageNumber === currentPage
                      ? styles.active
                      : styles.pageNumber
                  }
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </div>
        {isEditModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.close} onClick={handleEditModalClose}>
                &times;
              </span>
              <h2>Edit Post</h2>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ width: "100%" }}
                />
              )}
              <label>Change Image:</label>
              <input type="file" onChange={handleFileChange} />
              <label>Title:</label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <label>Short Description:</label>
              <textarea
                cols="30"
                rows="10"
                value={editedShortDescription}
                onChange={(e) => setEditedShortDescription(e.target.value)}
              ></textarea>

              <label>Author:</label>
              <input
                type="text"
                value={editedAuthor}
                onChange={(e) => setEditedAuthor(e.target.value)}
              />
              <label>Category:</label>
              <select
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <label>Content:</label>
              <ReactQuill
                value={editedContent}
                onChange={setEditedContent}
                style={{ height: "300px" }}
                modules={modules}
              />
            </div>
            <button onClick={handleEditSubmit}>Save Changes</button>
          </div>
        )}
      </section>
    </>
  );
}
