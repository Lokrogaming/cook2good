async function loadRecipes() {
  const response = await fetch("rezepte.json");
  const data = await response.json();
  return data;
}

function renderRecipes(recipes) {
  const list = document.getElementById("recipe-list");
  list.innerHTML = "";

  recipes.forEach(r => {
    const div = document.createElement("div");
    div.className = "recipe";

    div.innerHTML = `
      <h2>${r.name}</h2>
      <h4>Zutaten:</h4>
      <ul>${r.zutaten.map(z => `<li>${z}</li>`).join("")}</ul>
      <h4>Zubereitung:</h4>
      <p>${r.zubereitung}</p>
    `;

    list.appendChild(div);
  });
}

async function init() {
  const recipes = await loadRecipes();
  renderRecipes(recipes);

  document.getElementById("search").addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = recipes.filter(r =>
      r.name.toLowerCase().includes(term) ||
      r.zutaten.some(z => z.toLowerCase().includes(term))
    );
    renderRecipes(filtered);
  });
}

init();
