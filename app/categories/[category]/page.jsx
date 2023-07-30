import Searchcategories from "@/app/components/Searchcategories";

export const metadata = {
  title: "Search By Categories"
}

export default function page({ params }) {
  return (
    <>
      <Searchcategories params={params} />
    </>
  );
}
