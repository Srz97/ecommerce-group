// Steg 1: Skapa korten med varor (products for each product)
// Steg 2: Skapa en array med objekt som ska ha olika produkter med pris, namn och produktinfo
// Steg 3: Koppla ihop steg 1 och 2 så att informationen på arrayen hamnar på korten.
// Steg 4: Fixa en delete button till varje produktkort.
// Steg 5: Gör en gå till kassa knapp.

const products = document.querySelector("#products");
const nextBtn = document.querySelector("#nextBtn");

let productList = JSON.parse(localStorage.getItem("chart")) || [
    {productName: "computer", price: 5000, description: "Super computer that can mine bitcoin and earn yoy 5000 a minute", quantity: 20},
    {productName: "Iphone 25", price: 1000, description: "Just shake the phone and think of a place and you will be teleported", quantity: 2}, 
    {productName: "Tesla model 7", price: 20, description: "This is a car to be trusted, it can get you to the moon", quantity: 4}
    
]

function renderProducts (items) {
    products.innerHTML = "";
    items.forEach(function(product, index){

    const productItem = document.createElement("div");

    const productName = document.createElement("p");
    productName.textContent = "Product: " + product.productName;

    const price = document.createElement("p");
    price.textContent = "Price: " + product.price + "kr";

    const description = document.createElement("p");
    description.textContent = "Description: " + product.description;

    const quantityWrapper = document.createElement("div");

    const quantity = document.createElement("input");
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
    deleteBtn.textContent = "Delete";


    deleteBtn.addEventListener("click", function () {
        productList.splice(index, 1);
        renderProducts(items);
        localStorage.setItem("chart", JSON.stringify(productList));
    })

    addQuantity.addEventListener("click", function (){
        product.quantity++
        renderProducts(items);
        localStorage.setItem("chart", JSON.stringify(productList));
    })

    subtractQuantity.addEventListener("click", function (){
        if(product.quantity > 1) {
            product.quantity--
        }

        renderProducts(items)
        localStorage.setItem("chart", JSON.stringify(productList));
    })

    quantityWrapper.append(subtractQuantity, quantity, addQuantity);
    productItem.append(productName, price, description, deleteBtn, quantityWrapper);
    products.append(productItem);

})
};
renderProducts(productList);


nextBtn.addEventListener("click", function (){
    window.location.href = "index-kassa.html";
})


