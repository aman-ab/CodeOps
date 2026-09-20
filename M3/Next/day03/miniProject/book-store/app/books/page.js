import {books} from '../data/books';

import { Suspense } from 'react';
import BookSkelton from '../components/BookSkeleton';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import FilterShell from '../components/FilterShell';

export const revalidate=3600;
//revalidate the page in ever 1 hr

export default  function Books() {

  return (
    <div >
      <CategoryFilter categories={["All",
        ...new Set(books.map((book)=>book.category)),
      ]}/>
      
      <h1>Our Books List</h1>
    <Suspense fallback={<BookSkelton/>}> 
      <FilterShell>
         <BookList books={books}/>
            </FilterShell>
    

      
    
      
    </Suspense>  
      
    </div>
  );
}
