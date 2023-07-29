"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "@/firebase/config";
import styles from "@/app/styles/admin.module.css";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

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
    const [previewImage, setPreviewImage] = useState("");
  
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
    };
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setEditedImage(selectedFile);
  
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
  
        await updateDoc(doc(db, "BlogPosts", selectedPost.id), {
          title: editedTitle,
          shortDescription: editedShortDescription,
          author: editedAuthor,
          category: editedCategory,
          content: editedContent,
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
                  posts.map((post) => (
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
                {/* Add the input field for the image */}
                <label>Change Image:</label>
                <input type="file" onChange={handleFileChange} />
                <label>Title:</label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <label>Short Description:</label>
                <ReactQuill
                  value={editedShortDescription}
                  onChange={setEditedShortDescription}
                />
  
                <label>Author:</label>
                <input
                  type="text"
                  value={editedAuthor}
                  onChange={(e) => setEditedAuthor(e.target.value)}
                />
                <label>Category:</label>
                <input
                  type="text"
                  value={editedCategory}
                  onChange={(e) => setEditedCategory(e.target.value)}
                />
                <label>Content:</label>
                <ReactQuill
                  value={editedContent}
                  onChange={setEditedContent}
                  style={{ height: "300px" }}
                />
              </div>
              <button onClick={handleEditSubmit}>Save Changes</button>
            </div>
          )}
        </section>
      </>
    );
  }
