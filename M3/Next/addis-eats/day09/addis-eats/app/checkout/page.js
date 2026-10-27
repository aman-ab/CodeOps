import ChForm from "../components/ChForm";

export const metadata = {
  title: "Checkout",
  description: "Checkout page for Addis Eats",
};
    
export default function CheckOut(){
    return(
<div>
    <h1>
        this is checkout page
    </h1>
 <ChForm />
</div>
    );
}