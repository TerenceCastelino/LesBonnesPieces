const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

const prixMax = document.getElementById("prix-max");
prixMax.addEventListener("input", () => {
  const piecesFiltrer = pieces.filter(function (piece) {
    return piece.prix <= prixMax.value;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrer);
});
function genererPieces(pieces) {
  for (let i = 0; i < pieces.length; i++) {
    const article = pieces[i];
    const sectionFiches = document.querySelector(".fiches");
    const piecesElement = document.createElement("article");
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} ${
      article.prix < 35 ? "💲" : "💲💲💲"
    }`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "Non Disponible";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "Non Disponible";
    const disponibiliteElement = document.createElement("p");
    disponibiliteElement.innerText = `${
      article.disponiblite ? "disponible" : "Rupture de stock"
    }`;

    sectionFiches.appendChild(piecesElement);

    piecesElement.appendChild(imageElement);
    piecesElement.appendChild(nomElement);
    piecesElement.appendChild(prixElement);
    piecesElement.appendChild(categorieElement);
    piecesElement.appendChild(descriptionElement);
    piecesElement.appendChild(disponibiliteElement);
  }
}
genererPieces(pieces);
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", () => {
  const piecesOrdonnees = Array.from(pieces);
  piecesOrdonnees.sort(function (a, b) {
    return a.prix - b.prix;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesOrdonnees);
});
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", () => {
  const piecesFiltrer = pieces.filter(function (piece) {
    return piece.prix <= 35;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrer);
});

const btnDecroissant = document.querySelector(".btn-decroissant");
btnDecroissant.addEventListener("click", () => {
  const piecesOrdonnees = Array.from(pieces);
  piecesOrdonnees.sort(function (b, a) {
    return a.prix - b.prix;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesOrdonnees);
});
// __________________________________________________
const btnSansDescription = document.querySelector(".btn-sans-description");
btnSansDescription.addEventListener("click", () => {
  const piecesFiltrer = pieces.filter(function (piece) {
    return piece.description;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrer);
});
// ________________________________________________

const noms = pieces.map((piece) => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--) {
  if (pieces[i].prix > 35) {
    noms.splice(i, 1);
  }
}

const abordablesElements = document.createElement("ul");

for (let i = 0; i < noms.length; i++) {
  const nomElement = document.createElement("li");
  nomElement.innerText = noms[i];
  abordablesElements.appendChild(nomElement);
}

document.querySelector(".abordables").appendChild(abordablesElements);
// _________________________________________________________________

const prixDisponible = pieces.map((piece) => piece.prix);
const nomDisponible = pieces.map((piece) => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--) {
  if (pieces[i].disponibilite === false) {
    nomDisponible.splice(i, 1);
    prixDisponible.splice(i, 1);
  }
}
const piecesDisponibleElements = document.createElement("ul");

for (let i = 0; i < nomDisponible.length; i++) {
  const nomEtPrix = document.createElement("li");
  nomEtPrix.innerText = `${nomDisponible[i]} ${prixDisponible[i]} €`;

  piecesDisponibleElements.appendChild(nomEtPrix);
}
document.querySelector(".disponibles").appendChild(piecesDisponibleElements);
// ________________________________________________________
