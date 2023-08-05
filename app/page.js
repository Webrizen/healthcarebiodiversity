import React from 'react'
import Home from '@/app/components/Home';

export const metadata = {
  title: "Home - HealthCare Biodiversity",
  description: `HealthCare Biodiversity is a company dedicated to writing about healthcare and biodiversity.
  We are passionate about improving healthcare practices while preserving our planet's diverse ecosystems.
  Our mission is to bridge the gap between the healthcare industry and biodiversity conservation efforts.`
}

export default function page() {
  return (
    <>
     <Home /> 
    </>
  )
}
