const chart = JSON.parse(localStorage.getItem("cart")) || [];

const products = document.querySelector("#products");
const completeOrder = document.querySelector("#completeOrder");
const customerForm = document.querySelector("#costumerForm");
const cardForm = document.querySelector("#cardInfo");
const sum = document.querySelector("#sum");
const total = localStorage.getItem("total");


if (total) {
    sum.textContent = "Total amount: " + Number(total).toLocaleString("sv-SE") + " kr";


}

function renderProducts (items) {
    products.innerHTML = "";

    items.forEach(function(product, index){
    const cartItem = document.createElement("div")
    cartItem.className = ("cartItem")

    const heading = document.createElement("h2")
    heading.textContent = "Chosen Products"

    const productItem = document.createElement("div");
    productItem.className = ("productCard")

    const productName = document.createElement("h2");
    productName.textContent = product.productName;

    const price = document.createElement("p");
    price.textContent = "Price: " + product.price + "kr";

    const description = document.createElement("p");
    description.textContent = "Description: " + product.description;

    productItem.append(productName, price, description);
    cartItem.append(productItem);
    products.append(cartItem)
})
};
renderProducts(chart);

completeOrder.addEventListener("click", function () {
    if (!customerForm.reportValidity()) return;
    if (!cardForm.reportValidity()) return;
    window.location.href = "index-bekraftelse.html";})

returnBtn.addEventListener("click", function (){
        window.location.href = "index-varukorg.html";
    })

