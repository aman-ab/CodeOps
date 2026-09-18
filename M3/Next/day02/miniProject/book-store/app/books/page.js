import {books} from '../data/books';
import Link from 'next/link';
import { Suspense } from 'react';

export const revalidate=3600;
//revalidate the page in ever 1 hr

function BookSkelton(){
  return(
    <div>
      <p>Loading...</p>
    </div>
  )
}

async function BookList(){
await new Promise((resolve)=>setTimeout(resolve, 3000)); 
  return (
    <div>
      <div className='book-container'>
      {books.map((book)=><div className='book-item' key={book.id} >
        <h1>{book.title}</h1>
        <p>{book.description}</p>
        <p>Price: ${book.price}</p>
        <Link href={`/books/${book.id}`}>
          View Details
        </Link>
      </div>)}
     </div>
    </div>
  )
}

export default  function Books() {

  return (
    <div >
      <h1>Our Books List</h1>
    <Suspense fallback={<BookSkelton/>}>
      <BookList/>
    </Suspense>
      
    </div>
  );
}
