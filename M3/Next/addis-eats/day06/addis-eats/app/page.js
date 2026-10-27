import Link from "next/link";

export default function Home() {
  return (
   <div>
  
    <h1> Welcome to Addis Eats</h1>
    <p> Explore our collection of dishes</p>

    <Link href="/dishes">Browse Menu</Link>
   </div>
  );
}
