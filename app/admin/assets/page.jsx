"use client";
import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, deleteObject, getDownloadURL } from 'firebase/storage';
import styles from '@/app/styles/admin.module.css';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { db } from '@/firebase/config';

export default function page() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch all images from Firebase Storage
    const fetchImages = async () => {
      try {
        const storage = getStorage();
        const imagesRef = ref(storage, 'images'); // Replace 'images' with the folder path where your images are stored

        const imagesList = await listAll(imagesRef);
        const imageUrls = await Promise.all(
          imagesList.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return {
              url,
              filename: item.name,
            };
          })
        );

        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images: ', error);
        Swal.fire('Error', 'An error occurred while fetching images.', 'error');
      }
    };

    fetchImages();
  }, []);

  const handleDelete = async (filename) => {
    try {
      // Show a confirmation dialog using SweetAlert2
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this image!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });

      // If the user confirms the deletion, proceed with the deletion process
      if (result.isConfirmed) {
        const storage = getStorage();
        const imageRef = ref(storage, `images/${filename}`); // Replace 'images' with the folder path where your images are stored

        await deleteObject(imageRef);

        // Remove the deleted image from the local state
        setImages((prevImages) => prevImages.filter((image) => image.filename !== filename));

        // Show a success message using SweetAlert2
        Swal.fire('Deleted!', 'The image has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting image: ', error);
      Swal.fire('Error', 'An error occurred while deleting the image.', 'error');
    }
  };

  return (
    <>
      <section className={styles.ImagesHolder}>
        <div className={styles.imageGallery}>
          {images.map((image) => (
            <div key={image.filename} className={styles.imageContainer}>
              <div className={styles.imageWrapper}>
                <Image src={image.url} alt={image.filename} layout="fill" objectFit="cover" />
              </div>
              <div className={styles.deleteButton} onClick={() => handleDelete(image.filename)}>
                <span>Delete</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
