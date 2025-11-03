const pages = document.querySelectorAll('.page');
let current = 0;

// Mostrar la página actual
function showPage(index) {
  pages.forEach((page, i) => {
    page.classList.remove('active');
    page.style.display = 'none';
    page.scrollTop = 0;
  });
  pages[index].classList.add('active');
  pages[index].style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Botones Anterior / Siguiente
document.getElementById('next').addEventListener('click', () => {
  if (current < pages.length - 1) {
    current++;
    showPage(current);
  }
});
document.getElementById('prev').addEventListener('click', () => {
  if (current > 0) {
    current--;
    showPage(current);
  }
});

// Inicializar primera página
showPage(current);

// === LIGHTBOX CON NAVEGACIÓN ===
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
let currentGallery = [];
let currentImgIndex = 0;

// Abrir lightbox al hacer clic en una imagen
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    const section = img.closest('.page');
    currentGallery = Array.from(section.querySelectorAll('img'));
    currentImgIndex = currentGallery.indexOf(img);
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
  });
});

// Función para mostrar imagen según índice
function showLightboxImage(index) {
  if (index < 0) index = currentGallery.length - 1;
  if (index >= currentGallery.length) index = 0;
  currentImgIndex = index;
  lightboxImg.src = currentGallery[currentImgIndex].src;
}

// Flechas de navegación (puedes añadir estos botones dentro del #lightbox en HTML)
document.querySelector('#lightbox .lightbox-prev')?.addEventListener('click', e => {
  e.stopPropagation();
  showLightboxImage(currentImgIndex - 1);
});
document.querySelector('#lightbox .lightbox-next')?.addEventListener('click', e => {
  e.stopPropagation();
  showLightboxImage(currentImgIndex + 1);
});

// Cerrar lightbox al hacer clic fuera de la imagen
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});

// === SCROLL TOP ===
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 200 ? 'flex' : 'none';
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === CLICK EN TÍTULO PARA VOLVER A PORTADA ===
const headerTitle = document.querySelector('.mag-header h1');
if (headerTitle) {
  headerTitle.addEventListener('click', () => {
    current = 0;
    showPage(current);
  });
}

// === BOTÓN "INICIO" DEL NAV ===
const goToHome = document.getElementById('go-to-home');
if (goToHome) {
  goToHome.addEventListener('click', (e) => {
    e.preventDefault();
    current = 0;
    showPage(current);
  });
}

// === FUNCIONES DE NAVEGACIÓN DE PÁGINAS ===
function goToPage(index) {
  if (index < 0) index = 0;
  if (index >= pages.length) index = pages.length - 1;
  current = index;
  showPage(current);

  // Cerrar dropdown si está abierto
  const menu = document.getElementById('dropdownMenu');
  if (menu) menu.style.display = "none";
}

// === MENÚ DESPLEGABLE ===
function toggleDropdown() {
  const menu = document.getElementById('dropdownMenu');
  if (!menu) return;
  menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function (e) {
  const menu = document.getElementById('dropdownMenu');
  const button = document.querySelector('.dropbtn');
  if (menu && button && !button.contains(e.target) && !menu.contains(e.target)) {
    menu.style.display = 'none';
  }
});

// Cerrar menú automáticamente al cambiar de sección
document.querySelectorAll('.dropdown-content a').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('dropdownMenu');
    if (menu) menu.style.display = 'none';
  });
});
