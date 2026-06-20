(() => {
        const btnOpen = document.getElementById('mobile-menu-button');
        const btnClose = document.getElementById('mobile-menu-close');
        const overlay = document.getElementById('mobile-menu-overlay');
        btnOpen.addEventListener('click', () => {
          overlay.classList.add('open');
          btnOpen.setAttribute('aria-expanded', 'true');
        });
        btnClose.addEventListener('click', () => {
          overlay.classList.remove('open');
          btnOpen.setAttribute('aria-expanded', 'false');
        });
      })();