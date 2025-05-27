document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const hamburger = document.querySelector('.header__hamburger');
  const headerNav = document.querySelector('.header__nav');
  const menuItemsWithSubmenu = document.querySelectorAll('.menu__item--has-submenu');
  
  // Toggle del menú principal
  hamburger.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    headerNav.classList.toggle('menu--open');
    
    // Cerrar todos los submenús al cerrar el menú principal
    if (!isExpanded) {
      closeAllSubmenus();
    }
  });

  // Función para cerrar todos los submenús
  function closeAllSubmenus() {
    menuItemsWithSubmenu.forEach(item => {
      item.classList.remove('menu__item--open');
    });
  }

  // Acordeón para submenús
  menuItemsWithSubmenu.forEach(item => {
    const link = item.querySelector('.menu__link');
    
    link.addEventListener('click', function(e) {
      // Solo aplica en mobile
      if (window.innerWidth > 992) return;
      
      e.preventDefault();
      const isOpen = item.classList.contains('menu__item--open');
      
      // Cerrar todos los submenús primero
      closeAllSubmenus();
      
      // Abrir el actual si no estaba abierto
      if (!isOpen) {
        item.classList.add('menu__item--open');
      }
    });
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', function(e) {
    if (!headerNav.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.setAttribute('aria-expanded', 'false');
      headerNav.classList.remove('menu--open');
      closeAllSubmenus();
    }
  });

  // Resetear al cambiar tamaño de pantalla
  window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
      hamburger.setAttribute('aria-expanded', 'false');
      headerNav.classList.remove('menu--open');
      closeAllSubmenus();
    }
  });
});