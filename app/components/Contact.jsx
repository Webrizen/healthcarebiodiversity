"use client";
import React, { useState } from "react";
import styles from "@/app/styles/pages.module.css";
import Logo from "@/app/assets/logo.webp";
import Image from "next/image";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Add the form data to the "contact" collection in Firestore
        try {
          await addDoc(collection(db, "contact"), formData);
          // Show a success message using SweetAlert2
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Your message has been sent successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          // Clear the form after successful submission
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        } catch (error) {
          console.error("Error sending message: ", error);
          // Show an error message using SweetAlert2
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while sending the message. Please try again.",
          });
        }
      };
    

  return (
   <>
   <section className={styles.section}>
        <div className={styles.twoColContact}>
          <div className={styles.container}>
            <div className={styles.logoContainer}>
              <Image src={Logo} alt="HealthCare Biodiversity Logo" />
            </div>
            <div className={styles.contentContainer}>
              <h1>Contact Us</h1>
              <p>
                If you have any questions, suggestions, or feedback regarding
                healthcare biodiversity, feel free to reach out to us. We value
                your input and are eager to hear from you!
              </p>
              <form className={styles.contactForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className={styles.submitButton}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className={styles.mainContactContent}>
            <h1>Our Networks</h1>
            <div>
              <h3>Press</h3>
              <p>
                For any press-related inquiries, please contact:
                press@healthcarebiodiversity.com
              </p>
            </div>
            <div>
              <h3>Customer Support</h3>
              <p>
                For customer support, reach us at:
                support@healthcarebiodiversity.com
              </p>
            </div>
            <div>
              <h3>Payments</h3>
              <p>
                For payments and billing inquiries, email:
                payments@healthcarebiodiversity.com
              </p>
            </div>
            <div>
              <h3>Legal</h3>
              <p>
                For legal matters and partnerships, contact:
                legal@healthcarebiodiversity.com
              </p>
            </div>
          </div>
        </div>
      </section>
   </>
  )
}
