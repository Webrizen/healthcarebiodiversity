"use client";
import React, { useState } from "react";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import "@/app/globals.css";

export default function Appearance({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
    var x = document.getElementById("sidebar");
    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
  };

  return (
    <>
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <div className="main-layout">
        <div className="sidebar" id="sidebar">
          <Sidebar />
        </div>
        <div className="main-content">{children}</div>
      </div>
      <Footer />
    </>
  );
}
