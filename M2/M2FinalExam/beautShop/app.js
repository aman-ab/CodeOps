const state = {
  products: [],
  wishlist: JSON.parse(localStorage.getItem("myFavorites")) || [],
  search: ""
};

const API = "https://dummyjson.com/products";

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const favoritesContainer = document.getElementById("favorites-list");

function displayProducts(products) {
  if (products.length === 0) {
    productsContainer.innerHTML = "<p>No products match your search.</p>";
    return;
  }

  productsContainer.innerHTML = products.map((product) => {
    // Check if product is already saved
    const isSaved = state.wishlist.some(item => item.id === product.id);

    return `
      <div class="product-card">
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.category}</p>
        <p>$${product.price}</p>
        <p>Rating: ${product.rating}</p>
        <!-- Toggle button logic: changes function and text based on save state -->
        <button class="x ${isSaved ? 'remove-mode' : ''}"
                onclick="${isSaved ? `removeFromFavorites(${product.id})` : `addToFavorites(${product.id})`}">
          ${isSaved ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    `;
  }).join("");
}

window.addToFavorites = function(id) {
  const productToAdd = state.products.find(p => p.id === id);

  if (!state.wishlist.some(item => item.id === id)) {
    state.wishlist.push(productToAdd);
    localStorage.setItem("myFavorites", JSON.stringify(state.wishlist));

    const currentFilteredProducts = state.products.filter(p => p.title.toLowerCase().includes(state.search));
    displayProducts(currentFilteredProducts);
    displayFavorites();
  }
};

window.removeFromFavorites = function(id) {
  state.wishlist = state.wishlist.filter(item => item.id !== id);
  localStorage.setItem("myFavorites", JSON.stringify(state.wishlist));

  const currentFilteredProducts = state.products.filter(p => p.title.toLowerCase().includes(state.search));
  displayProducts(currentFilteredProducts);
  displayFavorites();
};

function displayFavorites() {
  if (!favoritesContainer) return;

  if (state.wishlist.length === 0) {
    favoritesContainer.innerHTML = "<p>Favorites product list page</p>";
    return;
  }

  favoritesContainer.innerHTML = state.wishlist.map((item) => `
    <div class="favorite-item">

      <img src="${item.thumbnail}" alt="${item.title}">

      <div>
        <h4>${item.title}</h4>
        <p>$${item.price}</p>
      </div>

      <button onclick="removeFromFavorites(${item.id})">
        Remove
      </button>

    </div>
  `).join("");
}

async function getProducts() {
  try {
    const response = await fetch(API);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    state.products = data.products;

    displayProducts(state.products);
    displayFavorites();
  } catch (error) {
    productsContainer.innerHTML = "<p>Failed to load products.</p>";
  }
}

searchInput.addEventListener("input", () => {
  state.search = searchInput.value.toLowerCase();

  const filteredProducts = state.products.filter((product) => {
    return product.title.toLowerCase().includes(state.search);
  });

  displayProducts(filteredProducts);
});

getProducts();
