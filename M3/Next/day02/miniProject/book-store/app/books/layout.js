export default function BooksLayout({children}) {
  return (
    <div className="book-layout">
      <aside>
        <h2>Books</h2>
        <ul>
            <li> All Books</li>
            <li> Fiction</li>
            <li> Non-Fiction</li>
            <li> Science Fiction</li>
            <li> Fantasy</li>
            </ul>
      </aside>
      <main>{children}</main>
    </div>
  );
}
