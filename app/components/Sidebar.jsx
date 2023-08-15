"use client";
import React, { useState, useEffect } from 'react';
import styles from "@/app/styles/componets.module.css";
import { IoMdSearch } from "react-icons/io";
import Link from "next/link";
import { checkEnvironment } from "./checkEnvironment";

async function getData() {
  "use server";
  const res = await fetch(checkEnvironment().concat("/api/categories"), {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function searchData(searchText) {
  "use server";
  const res = await fetch(checkEnvironment().concat('/api/search'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ searchText }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Sidebar() {
  const data = await getData();
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleSearch = async () => {
    try {
      const data = await searchData(searchText);
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching search results: ', error);
    }
  };

  return (
    <>
      <div className={styles.Sidebar}>
        <div className={styles.sideTop}>
        <div className={styles.searchbar}>
            <input
              type="search"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <span onClick={handleSearch}>
              <IoMdSearch />
            </span>
          </div>
          <hr />
          <div className={styles.searchResults}>
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <Link key={result.id} href={`/blogs/${result.id}`} style={{ whiteSpace: 'normal' }}>
                  <div className={styles.searchResult}>{result.title}</div>
                </Link>
              ))
            ) : (
              <div className={styles.searchResult}>No results found.</div>
            )}
          </div>
          <hr />
          <div className={styles.categories}>
            <ul>
              {data.categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.id}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
