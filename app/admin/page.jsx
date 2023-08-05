import Admin from "@/app/components/Admin";
import { AuthContextProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Admin Dashboard"
}

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
