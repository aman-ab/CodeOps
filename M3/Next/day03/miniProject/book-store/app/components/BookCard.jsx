import Link from 'next/link';
import AddToCart from './AddToButton';
export default function BookCard({book}){

    return (
        <div className='book-item'>
        <h1>{book.title}</h1>
        <p>{book.description}</p>
        <p>Price: ${book.price}</p>
        <p> {book.category}</p>
        <Link href={`/books/${book.id}`}>
          View Details
        </Link>
        <AddToCart book={book}/>
        </div>
    )
}