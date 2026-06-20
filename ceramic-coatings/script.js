(function() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeBtn = mobileMenu.querySelector('.mobile-close');
        const body = document.body;

        function openMenu() {
          mobileMenu.classList.add('open');
          mobileMenu.setAttribute('aria-hidden', 'false');
          hamburger.setAttribute('aria-expanded', 'true');
          body.style.overflow = 'hidden';
        }
        function closeMenu() {
          mobileMenu.classList.remove('open');
          mobileMenu.setAttribute('aria-hidden', 'true');
          hamburger.setAttribute('aria-expanded', 'false');
          body.style.overflow = '';
        }
        hamburger.addEventListener('click', () => {
          if (mobileMenu.classList.contains('open')) {
            closeMenu();
          } else {
            openMenu();
          }
        });
        closeBtn.addEventListener('click', closeMenu);

        // Accessibility toggles for dropdown on desktop nav
        // Update aria-expanded on hover/focus for dropdown links
        document.querySelectorAll('.nav-dropdown > a').forEach(link => {
          link.addEventListener('mouseenter', () => {
            link.setAttribute('aria-expanded', 'true');
          });
          link.addEventListener('mouseleave', () => {
            link.setAttribute('aria-expanded', 'false');
          });
          link.addEventListener('focus', () => {
            link.setAttribute('aria-expanded', 'true');
          });
          link.addEventListener('blur', () => {
            link.setAttribute('aria-expanded', 'false');
          });
        });
      })();

(function(){
        const chatWidget = document.getElementById('chat-widget');
        const chatPanel = document.getElementById('chat-panel');
        let expanded = false;

        function toggleChat() {
          expanded = !expanded;
          chatWidget.setAttribute('aria-pressed', expanded ? 'true' : 'false');
          chatPanel.setAttribute('aria-hidden', !expanded ? 'true' : 'false');
          if(expanded){
            chatPanel.classList.add('show');
          } else {
            chatPanel.classList.remove('show');
          }
        }
        chatWidget.addEventListener('click', toggleChat);
        chatWidget.addEventListener('keydown', (e) => {
          if(e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleChat();
          }
        });
      })();