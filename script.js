async function loadRecipes() {
  const response = await fetch("recepeItems.json");
  const data = await response.json();
  return data;
}

function getModeIcon(mode) {
  switch(mode.toLowerCase()) {
    case "ober-/unterhitze": return "🔥";
    case "umluft": return "💨";
    case "grill": return "🥩";
    default: return "🍳";
  }
}

function renderRecipes(recipes) {
  const grid = document.getElementById("recipe-grid");
  grid.innerHTML = "";

  recipes.forEach((r, index) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${r.bild}" alt="${r.name}">
      <div class="info">
        <h2>${r.name}</h2>
        <div class="mode">${getModeIcon(r.modus)} ${r.modus}</div>
      </div>
    `;
    card.addEventListener("click", () => openModal(r));
    grid.appendChild(card);
  });
}

function openModal(recipe) {
  const modal = document.getElementById("recipe-modal");
  const body = document.getElementById("modal-body");

  body.innerHTML = `
    <h2>${recipe.name}</h2>
    <img src="${recipe.bild}" style="width:100%;border-radius:8px;margin:10px 0;">
    <p><strong>Backmodus:</strong> ${getModeIcon(recipe.modus)} ${recipe.modus}</p>
    <h3>Zutaten:</h3>
    <ul>${recipe.zutaten.map(z => `<li>${z}</li>`).join("")}</ul>
    <h3>Zubereitung:</h3>
    <p>${recipe.zubereitung}</p>
  `;

  modal.style.display = "block";
}

function initModal() {
  const modal = document.getElementById("recipe-modal");
  const closeBtn = document.querySelector(".close");

  closeBtn.onclick = () => modal.style.display = "none";
  window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };
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

  initModal();
}

init();
