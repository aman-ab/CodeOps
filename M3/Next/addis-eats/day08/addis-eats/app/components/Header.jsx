import NavBar from "./Navbar";
import SignOutButton from "./SignOutButton";

export default function Header(){
    return (
        <div>
            <SignOutButton/>
            <h1> Addis-Eats </h1>
            <NavBar/>
         </div>
    );
}