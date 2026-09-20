import {books} from '../../data/books'; 
import { notFound } from "next/navigation";
export default async function SingleBookPage({ params }) {
  const { id } = await params;
  const book= books.find((book)=> book.id===id)
 if(!book) {
   notFound();
  }
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <p>{book.category}</p>
      <p>Price: ${book.price}</p>
    </div>
  );
}
