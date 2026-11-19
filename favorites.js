const favorites = JSON.parse(localStorage.getItem("favorites") ?? "[]");
const list = document.getElementById("favorites-list");

async function showFavorites() {
  if (favorites.length === 0) {
    list.textContent = "Du har inga sparade favoriter än.";
    return;
  }

  for (const id of favorites) {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const product = await response.json();

    const card = document.createElement("article");

    card.innerHTML = `
      <h2><a></a></h2>
      <img alt="">
      <button type="button">Ta bort</button>
    `;

    const link = card.querySelector("a");
    link.textContent = product.title;
    link.href = `product.html?id=${id}`;

    const image = card.querySelector("img");
    image.src = product.thumbnail;
    image.alt = product.title;

    card.querySelector("button").addEventListener("click", () => {
      const updatedFavorites = favorites.filter(favoriteId => favoriteId !== id);

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      window.location.reload();
    });

    list.append(card);
  }
}

showFavorites();