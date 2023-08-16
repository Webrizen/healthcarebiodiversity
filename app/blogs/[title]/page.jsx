export default function Page({ params }) {
    function decodeLinkTitle(linkTitle) {
        return linkTitle
          .replace(/-/g, " ") // Replace hyphens with spaces
          .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
      }
      const originalTitle = decodeLinkTitle(params.title);      
    return <div>My Post: {originalTitle}</div>
}