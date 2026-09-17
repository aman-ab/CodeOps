import {books} from "../data/books";
import Link from "next/link";
export default async function Books(){
    await new Promise(resolve => setTimeout(resolve, 2000));
//    throw new Error("Failed to fetch books data");   //simulation 
    return (
        <div>
        <h1>
        Our Books
        </h1>
        {books.map((book)=>(<div key={book.id}> 
        <h1>title: {book.title}</h1> 
        <p>price: {book.price}</p>
        <p>description: {book.description}</p>
        <Link href={`/books/${book.id}`}>View Details</Link>
        </div>)
        )}
        </div>
    );
}