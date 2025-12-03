
const cardsData = [
  {
    titulo: "Lugar 1",
    descricao: "Descrição do lugar 1",
    imagens: ["imgs/img1.jpg", "imgs/img2.jpg", "imgs/img3.jpg"]
  },
  {
    titulo: "Lugar 2",
    descricao: "Descrição do lugar 2",
    imagens: ["imgs/img4.jpg", "imgs/img5.jpg"]
  },
  {
    titulo: "Lugar 3",
    descricao: "Descrição do lugar 3",
    imagens: ["imgs/img6.jpg", "imgs/img7.jpg", "imgs/img8.jpg"]
  }
];


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
      <p>${card.descricao}</p>
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
