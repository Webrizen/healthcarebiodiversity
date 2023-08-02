"use client";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/admin.module.css";
import Link from "next/link";
import signOutUser from "@/firebase/auth/logout";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function Admin() {
    const [postCount, setPostCount] = useState(0);

  const handleLogout = async () => {
    const { success, error } = await signOutUser();
    if (success) {
      // Show a success alert using SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "User logged out successfully.",
      }).then(() => {
        // Redirect to the login page
        router.push("/admin/login");
      });
    } else {
      // Show an error alert using SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Logout Error",
        text: "An error occurred during logout.",
      });
      console.error("Logout error:", error);
    }
  };
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/admin/login");
  }, [user]);

  const Time = new Date().toTimeString();

  // Function to fetch the post count from Firestore
  const fetchPostCount = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "BlogPosts"));
      const count = querySnapshot.size;
      setPostCount(count);
    } catch (error) {
      console.error("Error fetching post count: ", error);
    }
  };

  useEffect(() => {
    if (user == null) router.push("/admin/login");
    fetchPostCount(); // Fetch post count when the component mounts
  }, [user]);

  return (
    <>
      <section className={styles.Admin}>
        <div className={styles.topInfo}>
          <span>{Time}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className={styles.threeCol}>
          <div className={styles.onboarding}>
            <h1>Welcome Back Admin!</h1>
            <p>
              You Can Post A Blog From Here, Edit Them, OR even Delete Them.
              Good Day!
            </p>
          </div>
          <div className={styles.onboarding}>
            <h1>You Have {postCount} Posts Till Date.</h1>
            {postCount === 0 ? (
              <p>Seems Like You Don't Have Any Posts Yet!</p>
            ) : (
              <p>You have {postCount} posts. Keep up the good work!</p>
            )}
          </div>
          <div className={styles.onboarding}>
            <h1>Manage Contacts</h1>
            <p>Manage all contact requests from here, contact them or remove them from database!</p>
            <Link href="/admin/contact">
            <button>Manage</button>
            </Link>
          </div>
          <div className={styles.onboarding}>
            <h1>All Posts!</h1>
            <p>Browse All Posts!</p>
            <Link href="/admin/posts">
              <button>Manage</button>
            </Link>
          </div>
          <div className={styles.onboarding}>
            <h1>New Posts!</h1>
            <p>Publish A New Posts!</p>
            <Link href="/admin/new">
              <button>Manage</button>
            </Link>
          </div>
          <div className={styles.onboarding}>
            <h1>Add New Categories!</h1>
            <p>Add A New Category In The Blog!</p>
            <Link href="/admin/categories">
              <button>Manage</button>
            </Link>
          </div>
          <div className={styles.onboarding}>
            <h1>Post A New Job!</h1>
            <p>Now You Can Actually Post A New Job To Your Careers Page!</p>
            <Link href="/admin/careers">
              <button>Manage</button>
            </Link>
          </div>
          <div className={styles.onboarding}>
            <h1>Manage Careers!</h1>
            <p>Manage Job To Your Careers Page!</p>
            <Link href="/admin/careers/manage">
              <button>Manage</button>
            </Link>
          </div>
          <div className={styles.onboarding}>
            <h1>Manage Content Images!</h1>
            <p>Now You Can Actually Manage All Images From Database!</p>
            <Link href="/admin/assets">
              <button>Manage</button>
            </Link>
          </div>
          <div className={styles.onboarding}>
            <h1>Manage Newsletters!</h1>
            <p>Now You Can Actually Manage All newsletters From Database! Delte, & View</p>
            <Link href="/admin/newsletters">
              <button>Manage</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
