const products = [{id: 1, name: "Laptop", price: 25000},
     {id: 2, name: "Camera", price: 25900},
    {id: 3, name: "HeadPhones", price: 1000},
    {id: 4, name: "Tv", price: 45000}]
let cart =[];

const productConatiner = document.getElementById("products")
function displayProducts(){
    productConatiner.innerHTM = "";
    products.forEach(function(product){
        productConatiner.innerHTML +=`
        <div class ="pc">
        <h3>${product.name}
        </h3>
        <p> ${product.price}</p>
        <button onclick ="addToCart(${product.id})">
        Add to Cart </button>
        </div>`;

    });
}
displayProducts();

function addToCart(productId){
    const product = products.find(function(item){
        return item.id===productId;

    });
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart));
    displayCart();

}
function displayCart(){
    const cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = "  ";
    cart.forEach(function(product ,index){
     cartContainer.innerHTML += `
     <div class ="pc">
     <h3> ${product.name} </h3>
     <p> ${product.price}</p>
     
     <button onclick ="removeFromCart(${index})"> Remove </button>
     </div>`;
    });
    
    calculateTotal();
}



function removeFromCart(index){
    cart.splice(index, 1);
    displayCart();
}
function calculateTotal(){
const total = cart.reduce(function(sum ,product){
  return sum + product.price;

}, 0);
document.getElementById("total").textContent = total;
}

 
 const savedCart = localStorage.getItem("cart");
    if(savedCart){
        cart =JSON.parse(savedCart);
    } else{
    }
    
    displayCart();

    const darkModeBtn =document.getElementById("darkModeBtn");
    darkModeBtn.addEventListener("click",function(){
     document.body.classList.toggle("dark");

     if(document.body.classList.contains("dark")){
        darkModeBtn.textContent = "Light Mode";
     } else {
        darkModeBtn.textContent = "Dark Mode"
     }
    });