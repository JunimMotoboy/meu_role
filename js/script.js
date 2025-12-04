
async function fetchDados() {
  const cardsData = await fetch('https://projeto-meurole.onrender.com/lugares')
      .then(response => response.json());

  const container = document.getElementById("cards-container");

  cardsData.forEach((card, index) => {
    const imgUrl = `https://projeto-meurole.onrender.com/uploads/${card.img}`;

    const cardEl = document.createElement("div");
    cardEl.classList.add("card");

    cardEl.innerHTML = `
      <div class="carousel" id="carousel-${index}">
        <img src="${imgUrl}" class="active" />
        <button class="carousel-btn prev" onclick="changeSlide(${index}, -1)">&#10094;</button>
        <button class="carousel-btn next" onclick="changeSlide(${index}, 1)">&#10095;</button>
      </div>

      <div class="card-body">
        <h4>${card.nome}</h4>
        <p>${card.categoria}</p>
        <button class="btn-open-modal" data-index="${index}">Ver mais</button>
      </div>
    `;

    container.appendChild(cardEl);

   
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.id = `modal-${index}`;

    modal.innerHTML = `
      <div class="modal-content">
        <span class="close" data-index="${index}">&times;</span>
        <h2>${card.nome}</h2>
        <p>${card.categoria}</p>
        <img src="${imgUrl}" style="width: 100%; border-radius: 10px" />
        <p>${"Endereço: " + card.endereco}</p>
        <p>${card.descricao}</p>
      </div>
    `;

    document.body.appendChild(modal);
  });

  
  ativarEventosModal();
  
}


function ativarEventosModal() {
  const openBtns = document.querySelectorAll(".btn-open-modal");
  const closeBtns = document.querySelectorAll(".close");

  openBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const i = btn.getAttribute("data-index");
      document.getElementById(`modal-${i}`).style.display = "flex";
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const i = btn.getAttribute("data-index");
      document.getElementById(`modal-${i}`).style.display = "none";
    });
  });

  window.addEventListener("click", e => {
    document.querySelectorAll(".modal").forEach(modal => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
}

fetchDados();


// Script modal
const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".close");


openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});


closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


