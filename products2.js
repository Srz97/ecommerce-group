// two js only because trying with fetch and error ..still working on it
//for the search, sort and filter part, the card for products



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

    <a class="details" href="cart.html?id=${product.id}">Lägg i varukorg <span>🛒<span></a>
    <a class="details" href="favorites.html?id=${product.id}"> Favoriter <span>❤️<span></a>
    <a class="details" href="product.html?id=${product.id}"> Visa detaljer </a>
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