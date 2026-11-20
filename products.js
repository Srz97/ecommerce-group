//fetch API,CRUD,DOM

const featuredList = document.getElementById("featured-list")
let productContainer = document.getElementById("products");

console.log(productContainer)

async function getFeaturedProducts() {
   try{
    const response = await fetch("https://dummyjson.com/products?limit=4");
    const data = await response.json();
        displayProducts(data.products);

      featuredList.innerHTML ="";

        data.products.forEach(product => {
        featuredList.innerHTML += `
        <div class="card">
        <img src="${product.thumbnail}">
        <h3>${product.title}</h3>
        <p>${product.price}$</p>
        </div>
        `;

//getting crazy here still not working
    }
);

        productContainer.innerHTML = "";
        
        data.products.forEach(product=>{
        productContainer.innerHTML += `
        <div class="card">
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.price}$</p>
        </div>
        `;

    });
}

//when error 

catch(error){
    productContainer.innerHTML =
        "<p>Kunde inte hämta produkter.</p>";

    console.error(error);

}}

getFeaturedProducts();

//get all category
async function getProducts() {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
        displayProducts(data.products);
}

// show the catalog 

function displayProducts(products) {
    productContainer.innerHTML = "";

    products.forEach(product => {
        productContainer.innerHTML += `

    <div class="product-card">
    <img src="${product.thumbnail}">
    <h3>${product.title}</h3>
    <p>${product.price}$</p>
    <button>Favorit</button>
    <button>Lägg i varukorg</button>
    <a href="product.html?id=${product.id}">Läs mer</a>
    </div>`;

    });

}

//before fetch 
//container.innerHTML ="<p>Laddar produkter...</p>";

//after fetch 
//container.innerHTML = "";``

