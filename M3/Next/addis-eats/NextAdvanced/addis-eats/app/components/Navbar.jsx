import Link from "next/link";       
export default function NavBar(){
    return(
        <div>
            <nav>
                
                <Link href="/dashboard">dashboard</Link>{" | "}
                <Link href="/">Home</Link> {" | "}
                <Link href="/dishes">Dishes</Link>{" | "}
                <Link href="/cart">Cart</Link>{" | "}
                <Link href="/checkout">CheckOut</Link>{ " |"}
                <Link href="/order">Orders</Link>{" | "}
                <Link href="/kitchen">Kitchen</Link>
            </nav>
        </div>
    );
}