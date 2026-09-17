import {books} from '../data/books';
import Link from 'next/link';
export default async function Books() {

  await new Promise((resolve)=>setTimeout(resolve, 3000));  
  return (
    <div>
      <h1>Our Books List</h1>
      {books.map((book)=><div key={book.id}>
        <h1>{book.title}</h1>
        <p>{book.description}</p>
        <p>Price: ${book.price}</p>
        <Link href={`/books/${book.id}`}>
          View Details
        </Link>
      </div>)}

    </div>
  );
}
