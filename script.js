const galeriaImagens = [
  { src: 'imagens/cetep1.jpg', caption: 'Laboratório de Informática' },
  { src: 'imagens/cetep2.jpg', caption: 'Feira de Ciências 2024' },
  { src: 'imagens/cetep3.jpg', caption: 'Aula de Agropecuária' },
  { src: 'imagens/cetep4.jpg', caption: 'Formatura 2024' }
];
let currentImageIndex = 0;

document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('nav ul').classList.toggle('active');
});

function abrirLightbox(index) {
  currentImageIndex = index;
  const lightbox = document.getElementById('lightbox');
  const conteudo = document.getElementById('lightbox-conteudo');
  const captionElement = document.getElementById('lightbox-caption');
  conteudo.innerHTML = `<img src="${galeriaImagens[index].src}" alt="${galeriaImagens[index].caption}">`;
  captionElement.textContent = galeriaImagens[index].caption;
  lightbox.classList.add('active');
}

function fecharLightbox(event) {
  if (event.target.id === 'lightbox' || event.target.id === 'fechar') {
    document.getElementById('lightbox').classList.remove('active');
  }
}

if (document.getElementById('lightbox')) {
  document.getElementById('prev').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galeriaImagens.length) % galeriaImagens.length;
    abrirLightbox(currentImageIndex);
  });

  document.getElementById('next').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galeriaImagens.length;
    abrirLightbox(currentImageIndex);
  });

  document.addEventListener('keydown', (e) => {
    if (document.getElementById('lightbox').classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        currentImageIndex = (currentImageIndex - 1 + galeriaImagens.length) % galeriaImagens.length;
        abrirLightbox(currentImageIndex);
      } else if (e.key === 'ArrowRight') {
        currentImageIndex = (currentImageIndex + 1) % galeriaImagens.length;
        abrirLightbox(currentImageIndex);
      } else if (e.key === 'Escape') {
        document.getElementById('lightbox').classList.remove('active');
      }
    }
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.sobre-card, .curso-item, .projeto-card, .noticia-card, .depoimento-card, .galeria-item').forEach(card => {
  observer.observe(card);
});