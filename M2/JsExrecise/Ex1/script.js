const products = [{id: 1, name: "Laptop", price: 25000, quantitiy: 1,category: "Laptop"},
     {id: 2, name: "Camera", price: 25900, quantitiy: 1,category: "Camera"},
    {id: 3, name: "HeadPhones", price: 1000 , quantitiy: 1,category: "HeadPhones"},
    {id: 4, name: "Tv", price: 45000, quantitiy: 1,category: "Tv"}]
let cart =[];

const productConatiner = document.getElementById("products");



function displayProducts(productTodisplay = products){
    productConatiner.innerHTML= "";
    productTodisplay.forEach(function(product){
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
     <button onclick ="increaseItem(${product.id})"> + </button>
     <p> ${product.quantitiy}  </p>
     <p> SubTotal : ${product.price*product.quantitiy}</p>
     <button onclick ="decreaseItem(${product.id})"> - </button>
     
     <button onclick ="removeFromCart(${index})"> Remove </button>
     </div>`;
    });
    
    calculateTotal();
}

function increaseItem(productId){
    const product =cart.find(function(item){
        return  item.id ===productId;
    })
    product.quantitiy++;
    localStorage.setItem("cart",JSON.stringify(cart));
    displayCart();
    calculateTotal();
}
function decreaseItem(productId){
    const product =cart.find(function(item){
        return item.id ===productId
    });
    if(product.quantitiy >1){
        product.quantitiy--;
    } else{
        cart =cart.filter(function(item){
            return item.id !== productId;
        });
    }
localStorage.setItem("cart", JSON.stringify(cart));
displayCart();
calculateTotal();
}

function removeFromCart(index){
    cart.splice(index, 1);
    displayCart();
}
function calculateTotal(){
const total = cart.reduce(function(sum ,product){
  return sum + (product.price * product.quantitiy);
}, 0);
document.getElementById("total").textContent = total;
}

 
 const savedCart = localStorage.getItem("cart");
    if(savedCart){
        cart =JSON.parse(savedCart);
    } else{
    }
    
    displayCart();


    const darkModeBtn = document.getElementById("darkModeBtn");
     darkModeBtn.addEventListener("click",function(){
        document.body.classList.toggle("dark");
        if(document.body.classList.contains("dark")){
            darkModeBtn.textContent = " Light Mode";
        } else{
            darkModeBtn.textContent = "Dark Mode"
        }
    });

  const searchInput = document.getElementById("search");
   searchInput.addEventListener("input",function(){
   const searchText = searchInput.value.toLowerCase();
   const filterProducts =products.filter(function(product){
    return product.name.toLowerCase().includes(searchText);
   });
   displayProducts(filterProducts);
   });
function filterByCategory(category){
    if (category ==="All"){
        displayProducts();
    } else{
        const filteredProducts =products.filter(function (product){
         return product.category === category;
        });
        displayProducts(filteredProducts);
    }
}