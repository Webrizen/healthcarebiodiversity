"use client";
import Admin from "@/app/components/Admin";
import { AuthContextProvider } from "@/context/AuthContext";

function Page() {
  
  return (
    <>
    <AuthContextProvider>
      <Admin/>
    </AuthContextProvider>
    </>
  );
}

export default Page;
