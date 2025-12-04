let todosOsLugares = [];
let quantidadeVisivel = 6; 




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

 
  const listaLimitada = lista.slice(0, quantidadeVisivel);

  listaLimitada.forEach((card, index) => {
    const imgUrl = `https://projeto-meurole.onrender.com/uploads/${card.img}`;

    const cardEl = document.createElement("div");
    cardEl.classList.add("card");

    cardEl.innerHTML = `
      <div class="carousel" id="carousel-${index}">
        <img src="${imgUrl}" class="active" />
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
        <a href="https://www.google.com.br/maps/place/${card.endereco}" target="_blank">
          <p class="adress">Endereço: ${card.endereco}</p>
        </a>
        <p>${card.descricao}</p>
      </div>
    `;

    document.body.appendChild(modal);
  });

  atualizarBotaoVerMais(lista);
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

  quantidadeVisivel = 6; 

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

  quantidadeVisivel = 6; 

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




document.getElementById("btn-ver-mais").addEventListener("click", () => {
  quantidadeVisivel += 6; 
  renderizarCards(todosOsLugares);
  ativarEventosModal();
});

function atualizarBotaoVerMais(lista) {
  const btnContainer = document.getElementById("ver-mais-container");

  if (quantidadeVisivel >= lista.length) {
    btnContainer.style.display = "none";
  } else {
    btnContainer.style.display = "block";
  }
}




fetchDados();
