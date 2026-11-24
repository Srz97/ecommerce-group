// two js only because trying with fetch and error ..still working on it
//for the search, sort and filter part, the card for products


const productContainer = document.getElementById("products");

const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

let allProducts = [];

async function getProducts(){
try{
        productContainer.innerHTML =
        "<p class='loading'>Laddar produkter...</p>";

    const response = await fetch("https://dummyjson.com/products?limit=100");

    const data = await response.json();
    allProducts = data.products;
    displayProducts(allProducts);

}

catch(error){
    productContainer.innerHTML =
    "<p>Kunde inte hämta produkter.</p>";
    console.error(error);
    }

}

function displayProducts(products){
    productContainer.innerHTML = "";

    if(products.length === 0){
    productContainer.innerHTML =
    "<p>Inga produkter hittades.</p>";

return;

}
//the card
products.forEach(product=>{
    productContainer.innerHTML += `
    <div class="card">
    <img src="${product.thumbnail}"alt="${product.title}">

    <h3>${product.title}</h3>
    <p>${product.description}</p>
    <p class="price">${product.price}$</p>

    <button type="button" class="cart-button" data-id="${product.id}">
      Lägg i varukorg <span aria-hidden="true">🛒</span>
    </button>

    <button type="button" class="favorite-button" data-id="${product.id}">
      Spara som favorit <span aria-hidden="true">♡</span>
    </button>

    <a class="details" href="product.html?id=${product.id}">Visa detaljer</a>
    </div>
    `;

});

}

searchInput.addEventListener("input", ()=>{

    const searchValue =
    searchInput.value.toLowerCase();

    let filteredProducts =
    allProducts.filter(product =>
    product.title.toLowerCase().includes(searchValue)
    );

    sortProducts(filteredProducts);

});


sortSelect.addEventListener("change", ()=>{
    let filteredProducts =
        allProducts.filter(product =>
            product.title.toLowerCase().includes(
            searchInput.value.toLowerCase()
        )

);

sortProducts(filteredProducts);

});

function sortProducts(products){

    let sorted = [...products];
        if(sortSelect.value === "asc"){

            sorted.sort((a,b)=>a.price-b.price
        );

}

        if(sortSelect.value === "desc"){
        sorted.sort((a,b)=>b.price-a.price
        );
    }
        displayProducts(sorted);

}

getProducts();

productContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".favorite-button");

  if (!button) {
    return;
  }

  const id = button.dataset.id;
  const favorites = JSON.parse(localStorage.getItem("favorites") ?? "[]");

  if (!favorites.includes(id)) {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  button.textContent = "Sparad som favorit ✓";
});

productContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".cart-button");

  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);
  const product = allProducts.find(product => product.id === id);

  if (!product) {
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");

  const existingProduct = cart.find(item => Number(item.id) === id);

  if (existingProduct) {
    existingProduct.quantity = Number(existingProduct.quantity ?? 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  button.textContent = "Tillagd i varukorgen ✓";
});