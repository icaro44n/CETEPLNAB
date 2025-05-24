const secoes = document.querySelectorAll('.secao');
const lightbox = document.getElementById('lightbox');
const lightboxConteudo = document.getElementById('lightbox-conteudo');
const lightboxLegenda = document.getElementById('lightbox-legenda');
let galeriaImagens = [];
let indiceAtual = 0;

function mostrarSecao(id) {
  secoes.forEach(secao => {
    secao.classList.toggle('active', secao.id === id);
    secao.classList.toggle('hidden', secao.id !== id);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function abrirLightbox(src, alt) {
  galeriaImagens = Array.from(document.querySelectorAll('.galeria img, .galeria video source')).map(el => ({
    src: el.tagName === 'SOURCE' ? el.src : el.src,
    alt: el.parentElement.tagName === 'VIDEO' ? alt : el.alt
  }));
  indiceAtual = galeriaImagens.findIndex(img => img.src === src);
  if (indiceAtual === -1) indiceAtual = 0; // Fallback caso não encontre
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
    document.removeEventListener('keydown', handleTeclado);
  }
}

function navegarGaleria(direcao) {
  indiceAtual = (indiceAtual + direcao + galeriaImagens.length) % galeriaImagens.length;
  atualizarLightbox();
}

function handleTeclado(event) {
  if (event.key === 'ArrowLeft') navegarGaleria(-1);
  if (event.key === 'ArrowRight') navegarGaleria(1);
  if (event.key === 'Escape') fecharLightbox({ target: { id: 'fechar' } });
}

// Inicializa a galeria com a classe correta
document.querySelector('#galeria .grid').classList.add('galeria');
