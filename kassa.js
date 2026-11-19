const chart = JSON.parse(localStorage.getItem("chart")) || [];

const products = document.querySelector("#products");

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
renderProducts(chart);

