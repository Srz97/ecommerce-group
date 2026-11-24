const params = new URLSearchParams(window.location.search);
const id = params.get("id") ?? "8";

console.log(id);

async function getProduct() {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await response.json();

  const details = document.getElementById("product-details");

  details.innerHTML = `
  <h1>${product.title}</h1>
  <img src="${product.thumbnail}" alt="${product.title}">
  <p>Pris: ${product.price} $</p>
    <p>${product.description}</p>
  <button type="button" id="favorite-button">Spara som favorit</button>
`;
    const favoriteButton = document.getElementById("favorite-button");
    favoriteButton.addEventListener("click", () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") ?? "[]");

  if (!favorites.includes(id)) {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
    favoriteButton.textContent = "Sparad som favorit ✓";
    console.log(favorites);
  });
}

getProduct();

