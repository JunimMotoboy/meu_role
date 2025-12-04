let todosOsLugares = [];



async function fetchDados() {
  const cardsData = await fetch('https://projeto-meurole.onrender.com/lugares')
      .then(response => response.json());

  todosOsLugares = cardsData;

  renderizarCards(cardsData); 
  ativarEventosModal();       
}




function renderizarCards(lista) {
  const container = document.getElementById("cards-container");
  container.innerHTML = ""; 

  document.querySelectorAll(".modal").forEach(m => m.remove()); 

  lista.forEach((card, index) => {
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
        <p class="adress">Endereço: ${card.endereco}</p>
        <p>${card.descricao}</p>
      </div>
    `;

    document.body.appendChild(modal);
  });
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
      if (e.target === modal) modal.style.display = "none";
    });
  });
}




function filtrar() {
  const texto = document.querySelector(".share").value.trim().toLowerCase();

  if (texto === "") {
    renderizarCards(todosOsLugares);
    ativarEventosModal();
    return;
  }

  const filtrados = todosOsLugares.filter(lugar => {
    const nome = lugar.nome.toLowerCase();
    const categoria = lugar.categoria.toLowerCase();
    const endereco = lugar.endereco.toLowerCase();

    return (
      nome.includes(texto) ||
      categoria.includes(texto) ||
      endereco.includes(texto)
    );
  });

  renderizarCards(filtrados);
  ativarEventosModal();
}



function filtrarLugares(categoria) {

  if (categoria === "todos") {
    renderizarCards(todosOsLugares);
    ativarEventosModal();
    return;
  }

  const filtrados = todosOsLugares.filter(lugar =>
    lugar.categoria.toLowerCase() === categoria.toLowerCase()
  );

  renderizarCards(filtrados);
  ativarEventosModal();
}
document.querySelector(".share").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    filtrar(); 
  }
});



fetchDados();
