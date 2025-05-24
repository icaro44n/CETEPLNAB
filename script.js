AOS.init({ duration: 800, once: true });

const secoes = document.querySelectorAll('.secao');
const navButtons = document.querySelectorAll('.nav-btn');
const lightbox = document.getElementById('lightbox');
const lightboxConteudo = document.getElementById('lightbox-conteudo');
const lightboxLegenda = document.getElementById('lightbox-legenda');
const cursoModal = document.getElementById('curso-modal');
const modalTitulo = document.getElementById('modal-titulo');
const modalDescricao = document.getElementById('modal-descricao');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
let galeriaImagens = [];
let indiceAtual = 0;
let slideshowInterval = null;

function mostrarSecao(id) {
  secoes.forEach(secao => {
    secao.classList.toggle('active', secao.id === id);
    secao.classList.toggle('hidden', secao.id !== id);
  });
  navButtons.forEach(btn => btn.classList.toggle('active', btn.onclick.toString().includes(id)));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.innerWidth < 768) navMenu.classList.add('hidden');
}

function abrirLightbox(src, alt) {
  galeriaImagens = Array.from(document.querySelectorAll('.galeria img, .galeria video source')).map(el => ({
    src: el.tagName === 'SOURCE' ? el.src : el.src,
    alt: el.parentElement.tagName === 'VIDEO' ? alt : el.alt
  }));
  indiceAtual = galeriaImagens.findIndex(img => img.src === src);
  if (indiceAtual === -1) indiceAtual = 0;
  atualizarLightbox();
  lightbox.classList.remove('hidden');
  document.addEventListener('keydown', handleTeclado);
}

function atualizarLightbox() {
  const { src, alt } = galeriaImagens[indiceAtual];
  const ehVideo = src.endsWith('.mp4');
  lightboxConteudo.innerHTML = ehVideo
    ? `<video controls autoplay class="mx-auto"><source src="${src}" type="video/mp4">Seu navegador não suporta vídeos.</video>`
    : `<img src="${src}" alt="${alt}" class="mx-auto">`;
  lightboxLegenda.textContent = alt || 'Sem descrição';
}

function fecharLightbox(event) {
  if (event.target.id === 'lightbox' || event.target.id === 'fechar') {
    lightbox.classList.add('hidden');
    lightboxConteudo.innerHTML = '';
    lightboxLegenda.textContent = '';
    pararSlideshow();
    document.removeEventListener('keydown', handleTeclado);
  }
}

function navegarGaleria(direcao) {
  indiceAtual = (indiceAtual + direcao + galeriaImagens.length) % galeriaImagens.length;
  atualizarLightbox();
}

function toggleSlideshow() {
  if (slideshowInterval) {
    pararSlideshow();
  } else {
    slideshowInterval = setInterval(() => navegarGaleria(1), 3000);
    document.getElementById('slideshow-toggle').textContent = '⏸';
  }
}

function pararSlideshow() {
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
    document.getElementById('slideshow-toggle').textContent = '▶';
  }
}

function abrirModal(titulo, descricao) {
  modalTitulo.textContent = titulo;
  modalDescricao.textContent = descricao;
  cursoModal.classList.remove('hidden');
}

function fecharModal() {
  cursoModal.classList.add('hidden');
  modalTitulo.textContent = '';
  modalDescricao.textContent = '';
}

function handleTeclado(event) {
  if (event.key === 'ArrowLeft') navegarGaleria(-1);
  if (event.key === 'ArrowRight') navegarGaleria(1);
  if (event.key === 'Escape') fecharLightbox({ target: { id: 'fechar' } });
}

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('hidden');
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Carregar tema salvo
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

// Inicializa a galeria com a classe correta
document.querySelector('#galeria .grid').classList.add('galeria');
