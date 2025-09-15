async function loadRecipes() {
  const response = await fetch("recepeItems.json");
  return await response.json();
}

function getModeIcon(mode) {
  switch (mode.toLowerCase()) {
    case "ober-/unterhitze": return `<i class="fas fa-heat fa-lg text-danger"></i> Ober-/Unterhitze`;
    case "umluft": return `<i class="fas fa-fan fa-lg text-primary"></i> Umluft`;
    case "grill": return `<i class="fas fa-fire fa-lg text-warning"></i> Grill`;
    case "mikrowelle": return `<i class="fas fa-bolt fa-lg text-success"></i> Mikrowelle`;
    default: return `<i class="fas fa-utensils fa-lg text-secondary"></i> ${mode}`;
  }
}

function renderRecipes(recipes) {
  const list = document.getElementById("recipe-list");
  list.innerHTML = "";

  recipes.forEach((r, i) => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    col.innerHTML = `
      <div class="card h-100 shadow-sm" data-bs-toggle="modal" data-bs-target="#recipeModal" data-index="${i}">
        <div class="card-body">
          <h5 class="card-title">${r.name}</h5>
          <p class="card-text text-truncate">${r.zubereitung}</p>
        </div>
        <div class="card-footer text-muted">
          ${getModeIcon(r.backmodus)}
        </div>
      </div>
    `;

    list.appendChild(col);
  });

  // Event-Listener für Modal
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      const index = card.getAttribute("data-index");
      openModal(recipes[index]);
    });
  });
}

function openModal(recipe) {
  document.getElementById("recipeModalLabel").textContent = recipe.name;
  document.getElementById("modalIngredients").innerHTML = recipe.zutaten.map(z => `<li>${z}</li>`).join("");
  document.getElementById("modalInstructions").textContent = recipe.zubereitung;
  document.getElementById("modalMode").innerHTML = getModeIcon(recipe.backmodus);
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
