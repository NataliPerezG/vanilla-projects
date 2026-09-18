import "./style.css";

const URL_BASE = "https://pokeapi.co/api/v2/pokemon/";
const length = 200;

const callPokeApi = async () => {
  const allTypes = new Set();

  const urls = Array.from({ length }, (_, i) => URL_BASE + (i + 1));
  const promises = urls.map(async (url) => {
    const resp = await fetch(url);
    return resp.json();
  });
  const pokemonsData = await Promise.all(promises);

  const types = getTypes(pokemonsData, allTypes);
  drawCategories(types);

  drawCards(pokemonsData);

  changeCategory(pokemonsData);
};

function getTypes(data, typeSet) {
  data.forEach(({ types }) => {
    types.forEach((type) => typeSet.add(type.type.name));
  });
  return [...typeSet];
}

function drawCategories(categories) {
  const nav = document.querySelector(".categories");

  categories.forEach((category) => {
    const li = document.createElement("li");
    li.classList.add("li-item");

    const button = document.createElement("button");
    button.classList.add("btn", category);
    button.id = category;
    button.textContent = category;

    li.append(button);
    nav.append(li);
  });
}

function drawCards(data) {
  const container = document.querySelector(".cards");
  container.innerHTML = "";

  const template = document.querySelector("#card-template").content;

  data.forEach((pokemon) => {
    const clone = template.cloneNode(true);

    const id = pokemon.id;
    const textId = id.toString().padStart(3, "0");

    clone.querySelector("h2").textContent = `#${textId}`;
    clone
      .querySelector("img")
      .setAttribute("src", pokemon.sprites.front_default);
    clone.querySelector(".id-pok").textContent = `#${textId}`;
    clone.querySelector(".name-pok").textContent = pokemon.name;

    const categories = clone.querySelector(".categories");
    pokemon.types.forEach((tipe) => {
      const p = document.createElement("p");
      p.textContent = tipe.type.name;
      categories.append(p);
    });

    clone.querySelector(".weight").textContent = `WEIGHT: ${pokemon.weight}`;
    clone.querySelector(".height").textContent = `HEIGHT: ${pokemon.height}`;
    container.append(clone);
  });
}

function changeCategory(data) {
  const categories = document.querySelector(".categories");
  categories.addEventListener("click", (e) => {
    if (e.target.localName != "button") return;

    const buttonId = e.target.id;

    if (buttonId === "all") {
      drawCards(data);
      return;
    }

    const filteredPokemons = data.filter((pok) =>
      pok.types.some((t) => t.type.name === buttonId),
    );

    drawCards(filteredPokemons);
  });
}

callPokeApi();
