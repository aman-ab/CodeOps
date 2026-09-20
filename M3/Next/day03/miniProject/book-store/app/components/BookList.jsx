import BookCard from '../components/BookCard';


export default async function BookList({books}){
await new Promise((resolve)=>setTimeout(resolve, 3000)); 
  return (
    
      <div className='book-container'>
      {books.map((book)=>(<BookCard key={book.id} book={book}/>))}
      </div>
  );
} 