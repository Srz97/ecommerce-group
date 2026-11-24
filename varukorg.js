// Steg 1: Skapa korten med varor (products for each product)
// Steg 2: Skapa en array med objekt som ska ha olika produkter med pris, namn och produktinfo
// Steg 3: Koppla ihop steg 1 och 2 så att informationen på arrayen hamnar på korten.
// Steg 4: Fixa en delete button till varje produktkort.
// Steg 5: Gör en gå till kassa knapp.

//  let productList = JSON.parse(localStorage.getItem("cart")) || [
//     {productName: "Computer", price: 5000, description: "Super computer that can mine bitcoin and earn yoy 5000 a minute", quantity: 20},
//     {productName: "Iphone 25", price: 1000, description: "Just shake the phone and think of a place and you will be teleported", quantity: 2}, 
//     {productName: "Tesla model 7", price: 20, description: "This is a car to be trusted, it can get you to the moon", quantity: 4},
//     {productName: "Tesla model 7", price: 20, description: "This is a car to be trusted, it can get you to the moon", quantity: 4},
//     {productName: "Tesla model 7", price: 20, description: "This is a car to be trusted, it can get you to the moon", quantity: 4},
//     {productName: "Tesla model 7", price: 20, description: "This is a car to be trusted, it can get you to the moon", quantity: 4},
//     {productName: "Tesla model 7", price: 20, description: "This is a car to be trusted, it can get you to the moon", quantity: 4}];

const nextBtn = document.querySelector("#nextBtn");
const sum = document.querySelector("#sum");
const products = document.querySelector("#products");
const returnBtn = document.querySelector("#returnBtn");

function toCartItem(product) {
    return {
        id: product.id,
        productName: product.productName || product.title,
        price: product.price,
        description: product.description,
        image: product.image || product.thumbnail,
        quantity: product.quantity || 1
    };
}

const saved = JSON.parse(localStorage.getItem("cart")) || [];
let productList = saved.map(toCartItem);

localStorage.setItem("cart", JSON.stringify(productList));
renderProducts(productList);

function sumProduct (items) {
    let sumProduct = 0;
    items.forEach(function(product){
        sumProduct += product.quantity * product.price 

    })
    return sumProduct
    
}

function renderProducts (items) {
    products.innerHTML = "";
    if (items.length === 0) {
        const emptyChart = document.createElement("p");
        emptyChart.className = "emptyChart";
        emptyChart.textContent = "Varukorgen är tom!";

        const returnToProducts = document.createElement("a")
        returnToProducts.className = "returnToProduct"
        returnToProducts.textContent = "Kika på våra produkter"
        returnToProducts.href = "products.html"

        products.append(emptyChart, returnToProducts)

        returnBtn.hidden = true;
        nextBtn.hidden = true;
        return;
    }
    nextBtn.hidden = false;
    returnBtn.hidden = false;

    items.forEach(function(product, index){
    const cartItem = document.createElement("div")
    cartItem.className = ("cartItem")

    const productItem = document.createElement("div");
    productItem.className = ("productCard")

    const productName = document.createElement("h2");
    productName.textContent = product.productName;

    const price = document.createElement("p");
    price.textContent = "Price: " + product.price + "kr";

    const description = document.createElement("p");
    description.textContent = "Description: " + product.description;

    const quantityWrapper = document.createElement("div");
    quantityWrapper.className = ("quantity")

    const quantity = document.createElement("input");
    quantity.className = "amount";
    quantity.type = "number";
    quantity.min = 1;
    quantity.value = product.quantity;
    quantity.readOnly = true;

    const addQuantity = document.createElement("button");
    addQuantity.textContent = "+"

    const subtractQuantity = document.createElement("button");
    subtractQuantity.textContent = "-"

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("id", "skola")
    deleteBtn.textContent = "X";
    

    deleteBtn.addEventListener("click", function () {
        productList.splice(index, 1);
        renderProducts(items);
        localStorage.setItem("cart", JSON.stringify(productList));
    })

    addQuantity.addEventListener("click", function (){
        product.quantity++
        renderProducts(items);
        localStorage.setItem("cart", JSON.stringify(productList));
    })

    subtractQuantity.addEventListener("click", function (){
        if(product.quantity > 1) {
            product.quantity--
        }

        renderProducts(items)
        localStorage.setItem("cart", JSON.stringify(productList));
    })

    quantityWrapper.append(subtractQuantity, quantity, addQuantity, deleteBtn);
    productItem.append(productName, price, description);
    cartItem.append(productItem, quantityWrapper);
    products.append(cartItem)
})
    sum.textContent = "Total amount: " + sumProduct(items).toLocaleString("sv-SE") + " kr";
    localStorage.setItem("total", sumProduct(items));

};



nextBtn.addEventListener("click", function (){
    window.location.href = "index-kassa.html";
})

returnBtn.addEventListener("click", function (){
    window.location.href = "products.html";
})


