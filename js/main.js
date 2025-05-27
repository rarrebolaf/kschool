document.addEventListener('DOMContentLoaded', () => {
  const submenuParents = document.querySelectorAll('.menu__item--has-submenu');
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const headerNav = document.querySelector('.header__nav');
  const headerRightLinks = document.querySelector('.header__right-links');
  let closeTimeout = null;

  // --- Comportamiento original desktop ---
  submenuParents.forEach(parent => {
    const submenu = parent.querySelector('.submenu');
    const submenuItems = submenu.querySelectorAll('.submenu__item');

    // Clase por cantidad de ítems (máx. 5)
    const count = Math.min(submenuItems.length, 5);
    submenu.classList.add(`submenu--${count}-items`);

    parent.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        if (closeTimeout) clearTimeout(closeTimeout);
        submenu.classList.add('submenu-open');
        parent.classList.add('submenu-open');
      }
    });

    parent.addEventListener('mouseout', (e) => {
      if (window.innerWidth <= 768) return;
      const toElement = e.relatedTarget;
      if (toElement && (parent.contains(toElement) || submenu.contains(toElement))) return;

      const rect = submenu.getBoundingClientRect();
      const mouseY = e.clientY;

      if (mouseY > rect.bottom) {
        closeTimeout = setTimeout(() => {
          submenu.classList.remove('submenu-open');
          parent.classList.remove('submenu-open');
          closeTimeout = null;
        }, 300);
      } else {
        submenu.classList.remove('submenu-open');
        parent.classList.remove('submenu-open');
      }
    });
  });

  // --- Cerrar submenús en móvil ---
  function closeAllSubmenus() {
    submenuParents.forEach(item => item.classList.remove('submenu-open'));
  }

  // --- Toggle botón menú ---
  if (menuToggle && menu && headerNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = headerNav.classList.toggle('menu--open');
      if (isOpen) {
        if (headerRightLinks) headerRightLinks.style.display = 'none';
      } else {
        if (headerRightLinks) headerRightLinks.style.display = '';
        closeAllSubmenus();
      }
    });
  }

  // --- Acordeón en móvil ---
  submenuParents.forEach(parent => {
    const link = parent.querySelector('.menu__link');
    if (!link) return;

    link.addEventListener('click', (e) => {
      if (window.innerWidth > 768) return;

      e.preventDefault();
      const isOpen = parent.classList.contains('submenu-open');

      closeAllSubmenus();

      if (!isOpen) parent.classList.add('submenu-open');
    });
  });

  // --- Al cambiar tamaño ventana ---
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      headerNav.classList.remove('menu--open');
      if (headerRightLinks) headerRightLinks.style.display = '';
      closeAllSubmenus();
    }
  });
});
