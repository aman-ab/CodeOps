import Link from 'next/link';
export default function NavBar(){

    return (
        <div>

        <nav>
            <Link href="/" >Home</Link>
            {" | "}
            <Link href="/books" >Books</Link>
            {" | "}
            <Link href ="/cart">  Cart</Link>
            {" | "}
            <Link href="/checkout">CheckOut </Link>
        </nav>
        </div>
    )
}