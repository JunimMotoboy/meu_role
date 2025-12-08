/* ====== script.js (com melhorias completas) ====== */

/* Estado */
let todosOsLugares = []
let listaFiltrada = []
let quantidadeVisivel = 6

const cardsContainer = document.getElementById('cards-container')
const skeletonContainer = document.getElementById('skeleton-container')
const shareInput = document.querySelector('.share')
const btnVerMais = document.getElementById('btn-ver-mais')
const btnVerMenos = document.getElementById('btn-ver-menos')
const verMaisContainer = document.getElementById('ver-mais-container')
const themeBtn = document.getElementById('toggle-theme')

function carregarTema() {
  const tema = localStorage.getItem('theme')
  if (tema === 'light') {
    document.body.classList.add('light')
    themeBtn.textContent = '☀️'
  } else {
    document.body.classList.remove('light')
    themeBtn.textContent = '🌙'
  }
}
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light')
  const ativo = document.body.classList.contains('light')
  localStorage.setItem('theme', ativo ? 'light' : 'dark')
  themeBtn.textContent = ativo ? '☀️' : '🌙'
})
carregarTema()

function mostrarSkeleton(qtd = 6) {
  skeletonContainer.innerHTML = ''
  cardsContainer.innerHTML = ''
  verMaisContainer.style.display = 'none'

  for (let i = 0; i < qtd; i++) {
    const s = document.createElement('div')
    s.className = 'skeleton'
    skeletonContainer.appendChild(s)
  }
}

function esconderSkeleton() {
  skeletonContainer.innerHTML = ''
}
async function fetchDados() {
  try {
    mostrarSkeleton(6)
    const resp = await fetch('https://projeto-meurole.onrender.com/lugares')
    const data = await resp.json()
    todosOsLugares = Array.isArray(data) ? data : []
    listaFiltrada = [...todosOsLugares]
    esconderSkeleton()
    renderizarCards()
    ativarEventosModal()
  } catch (err) {
    console.error('Erro ao buscar dados:', err)
    esconderSkeleton()
    cardsContainer.innerHTML =
      "<p style='color:#fff'>Erro ao carregar dados.</p>"
  }
}

const modal = document.createElement('div')
modal.className = 'modal'
modal.id = 'modal-unico'
modal.style.display = 'none'
modal.innerHTML = `
  <div class="modal-content">
    <span class="close" id="modal-close" style="cursor:pointer">&times;</span>
    <h2 id="modal-nome"></h2>
    <p id="modal-cat"></p>
    <img id="modal-img" alt="imagem" />
    <a id="modal-map" target="_blank"><p class="adress" id="modal-end"></p></a>
    <p id="modal-desc"></p>
  </div>
`
document.body.appendChild(modal)

document.getElementById('modal-close').addEventListener('click', () => {
  modal.style.display = 'none'
})
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none'
})

function renderizarCards() {
  cardsContainer.innerHTML = ''
  document.querySelectorAll('.modal').forEach((m) => {
    if (m.id !== 'modal-unico') m.remove()
  })

  const lista = listaFiltrada.slice(0, quantidadeVisivel)

  lista.forEach((item, idx) => {
    const id = item.id ?? idx
    const imgUrl = `https://projeto-meurole.onrender.com/uploads/${item.img}`

    const el = document.createElement('div')
    el.className = 'card'
    el.innerHTML = `
      <div class="carousel">
        <img src="${imgUrl}" loading="lazy" alt="${item.nome}" />
      </div>
      <div class="card-body">
        <h4>${item.nome}</h4>
        <p>${item.categoria}</p>
        <button class="btn-open-modal" data-index="${idx}">Ver mais</button>
      </div>
    `

    cardsContainer.appendChild(el)

    setTimeout(() => el.classList.add('show'), 30 * idx)
  })

  atualizarBotaoVerMais()
  ativarEventosModal()
}

function ativarEventosModal() {
  document.querySelectorAll('.btn-open-modal').forEach((btn) => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.index)
      const item = listaFiltrada[idx]
      if (!item) return

      document.getElementById('modal-nome').textContent = item.nome || ''
      document.getElementById('modal-cat').textContent = item.categoria || ''
      document.getElementById(
        'modal-img'
      ).src = `https://projeto-meurole.onrender.com/uploads/${item.img}`
      document.getElementById('modal-end').textContent =
        'Endereço: ' + (item.endereco || '')
      document.getElementById('modal-map').href =
        'https://www.google.com/maps/place/' +
        encodeURIComponent(item.endereco || '')
      document.getElementById('modal-desc').textContent = item.descricao || ''

      modal.style.display = 'flex'
    }
  })
}

shareInput.addEventListener('input', () => {
  const texto = shareInput.value.trim().toLowerCase()
  quantidadeVisivel = 6

  if (!texto) {
    listaFiltrada = [...todosOsLugares]
    renderizarCards()
    return
  }

  listaFiltrada = todosOsLugares.filter(
    (l) =>
      (l.nome || '').toLowerCase().includes(texto) ||
      (l.categoria || '').toLowerCase().includes(texto) ||
      (l.endereco || '').toLowerCase().includes(texto)
  )

  renderizarCards()
})

function filtrarLugares(categoria) {
  quantidadeVisivel = 6
  if (categoria === 'todos') {
    listaFiltrada = [...todosOsLugares]
  } else {
    listaFiltrada = todosOsLugares.filter(
      (l) => (l.categoria || '').toLowerCase() === categoria.toLowerCase()
    )
  }
  renderizarCards()
}

btnVerMais.addEventListener('click', () => {
  quantidadeVisivel += 6
  renderizarCards()
})

btnVerMenos.addEventListener('click', () => {
  quantidadeVisivel = 6
  renderizarCards()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

function atualizarBotaoVerMais() {
  if (!Array.isArray(listaFiltrada)) {
    verMaisContainer.style.display = 'none'
    return
  }

  const temMaisCards = quantidadeVisivel < listaFiltrada.length
  const temMenosCards = quantidadeVisivel > 6

  if (temMaisCards || temMenosCards) {
    verMaisContainer.style.display = 'block'
    btnVerMais.style.display = temMaisCards ? 'inline-block' : 'none'
    btnVerMenos.style.display = temMenosCards ? 'inline-block' : 'none'
  } else {
    verMaisContainer.style.display = 'none'
  }
}

fetchDados()
