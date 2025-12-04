

async function fetchDados() {
  const cardsData = await fetch('https://projeto-meurole.onrender.com/lugares').then(response => response.json());



  const container = document.getElementById("cards-container")


  cardsData.forEach((card, index) => {
    const imgUrl = `https://projeto-meurole.onrender.com/uploads/${card.img}`;

    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    console.log(imgUrl)

    cardEl.innerHTML = `
    <div class="carousel" id="carousel-${index}">
      <img src="/uploads/${card.img}" />
      <button class="carousel-btn prev" onclick="changeSlide(${index}, -1)">&#10094;</button>
      <button class="carousel-btn next" onclick="changeSlide(${index}, 1)">&#10095;</button>

    </div>
    <div class="card-body">
      <h4>${card.nome}</h4>
      <p>${card.categoria}</p>
      <p>${card.telefone}</p>
    </div>
  `;

    container.appendChild(cardEl);

  });
}


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

fetchDados()