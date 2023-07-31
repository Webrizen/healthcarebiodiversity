import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: "404 - Page Not Found"
}

export default function NotFound() {
  return (
    <>
    <div className="container">
      <h1 className="heading">404</h1>
      <h4 className="subheading">Oops! Page not found.</h4>
      <p className="body-text">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <Link href="/">
          <button className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary">
            Go to Home
          </button>
      </Link>
    </div>
    </>
  )
}
