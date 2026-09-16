import {books} from "./data/books";
export default function Books(){
    return (
        <div>
        <h1>
        Our Books
        </h1>
        {books.map((book)=>
        <div key={book.id}> 
        <h1>title: {book.title}</h1> 
        <p>price: {book.price}</p>
        <p>description: {book.description}</p>
        </div>
        )}
        </div>
    );
}