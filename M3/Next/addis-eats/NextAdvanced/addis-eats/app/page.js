import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
   <div>

    <Image src="/dishes/firfir.jpg" alt="Firfir"
     width={470} 
     height={400}
     priority />
    <h1> Welcome to Addis Eats</h1>
    <p> Explore our collection of dishes</p>

    <Link href="/dishes">Browse Menu</Link>
  
   </div>
  );
}
