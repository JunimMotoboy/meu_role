
const cardsData =await fetch('###URL##').then(response => response.json());

const container = document.getElementById("cards-container");

cardsData.forEach((card, index) => {
  const cardEl = document.createElement("div");
  cardEl.classList.add("card");


  cardEl.innerHTML = `
    <div class="carousel" id="carousel-${index}">
      ${card.imagens.map((img, i) =>
        `<img src="${img}" class="${i === 0 ? "active" : ""}">`
      ).join('')}

      <button class="carousel-btn prev" onclick="changeSlide(${index}, -1)">&#10094;</button>
      <button class="carousel-btn next" onclick="changeSlide(${index}, 1)">&#10095;</button>
    </div>

    <div class="card-body">
      <h4>${card.titulo}</h4>
      <p>${card.categoria}</p>
      <p>${card.telefone}
    </div>
  `;

  container.appendChild(cardEl);
});
function changeSlide(cardIndex, direction) {
  const carousel = document.getElementById(`carousel-${cardIndex}`);
  const images = carousel.querySelectorAll("img");

  let current = [...images].findIndex(img => img.classList.contains("active"));
  images[current].classList.remove("active");

  let next = current + direction;
  if (next < 0) next = images.length - 1;
  if (next >= images.length) next = 0;

  images[next].classList.add("active");
}
