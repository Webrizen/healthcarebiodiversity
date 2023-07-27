"use client";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/admin.module.css";
import Link from "next/link";
import signOutUser from "@/firebase/auth/logout";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function Page() {
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

  // Step 1: Function to get system performance data
  const getSystemPerformanceData = () => {
    const memoryInfo = window.performance.memory;
    const memoryUsed = memoryInfo.usedJSHeapSize / (1024 * 1024); // Convert to MB

    const navigationInfo = window.performance.getEntriesByType("navigation")[0];
    const pageLoadTime =
      navigationInfo.loadEventEnd - navigationInfo.navigationStart;

    return { memoryUsed, pageLoadTime };
  };

  // Step 2: Display system performance data in the last card
  const [systemPerformance, setSystemPerformance] = useState(null);

  useEffect(() => {
    const performanceData = getSystemPerformanceData();
    setSystemPerformance(performanceData);
  }, []);

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
            <h1>0 Posts</h1>
            <p>Seems Like You Don't Have Any Posts Yet!</p>
          </div>
          <div className={styles.onboarding}>
            <h1>System Performance</h1>
            {systemPerformance && (
              <>
                <p>Memory Used: {systemPerformance.memoryUsed.toFixed(2)} MB</p>
                <p>Page Load Time: {systemPerformance.pageLoadTime} m/s</p>
              </>
            )}
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
        </div>
      </section>
    </>
  );
}

export default Page;
