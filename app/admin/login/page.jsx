'use client';
import React from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation';
import styles from '@/app/styles/admin.module.css';

function page() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    } else {
      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Login successful!',
      }).then(() => {
        router.push("/admin");
      });
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h1>Welcome Back!</h1>
        <form onSubmit={handleForm}>
          <label htmlFor="email">
            <p>Email</p>
            <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
          </label>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </>
  );
}

export default Page;
