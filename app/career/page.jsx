"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/styles/pages.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import Logo from "@/app/assets/main-logo.png";
import Image from "next/image";
import Link from "next/link";
import { BsDot } from "react-icons/bs";

export const metadata = {
  title: "Career At HealthCare BioDiversity",
  description: `...`,
};

export default function page() {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    // Fetch the careers data from Firestore
    const fetchCareers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Careers"));
        const careersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCareers(careersData);
      } catch (error) {
        console.error("Error fetching careers: ", error);
      }
    };

    fetchCareers();
  }, []);

  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.heading}>Careers</h1>
        {careers.length > 0 ? (
          <div className={styles.threeCol}>
            {careers.map((career) => (
              <div className={styles.Cardx} key={career.id}>
                <h2>{career.jobTitle}</h2>
                <p>{career.jobDescription}</p>
                <span>{career.date} <BsDot/> {career.location}</span>
                <a href={`mailto:${career.contactMail}`}>
                  <button>Apply</button>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noDataContainer}>
            <Image
              src="/placeholder.svg"
              alt="No Data"
              width={400}
              height={300}
            />
            <p>No careers available at the moment.</p>
          </div>
        )}
        <div className={styles.Cardx} style={{ marginTop: "10px" }}>
        <h2>
          ***Send Us Your CV OR Resume, If You're looking For A Specific Job Role!***
        </h2>
        <Link href="/contact">
          <button>Contact</button>
        </Link>
        </div>
      </section>
    </>
  );
}
