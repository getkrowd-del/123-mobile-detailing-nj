// Mobile toggle
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileCloseBtn = mobileMenu.querySelector('.mobile-menu-close-btn');
            mobileBtn.addEventListener('click', () => {
                const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
                mobileBtn.setAttribute('aria-expanded', !expanded);
                mobileMenu.setAttribute('aria-hidden', expanded);
                mobileMenu.classList.toggle('active');
            });
            mobileCloseBtn.addEventListener('click', () => {
                mobileBtn.setAttribute('aria-expanded', false);
                mobileMenu.setAttribute('aria-hidden', true);
                mobileMenu.classList.remove('active');
                // Collapse submenus on close
                document.querySelectorAll('.mobile-dropdown-toggle').forEach(btn => {
                    btn.setAttribute('aria-expanded', false);
                    const submenu = document.getElementById(btn.getAttribute('aria-controls'));
                    submenu.hidden = true;
                    submenu.classList.remove('active');
                    btn.classList.remove('expanded');
                });
            });

            // Mobile submenu toggle
            document.querySelectorAll('.mobile-dropdown-toggle').forEach(button => {
                button.addEventListener('click', () => {
                    const expanded = button.getAttribute('aria-expanded') === 'true';
                    button.setAttribute('aria-expanded', !expanded);
                    const submenu = document.getElementById(button.getAttribute('aria-controls'));
                    submenu.hidden = expanded;
                    submenu.classList.toggle('active');
                    button.classList.toggle('expanded');
                });
            });

            // Update ARIA expanded on desktop dropdowns
            document.querySelectorAll('.nav-dropdown > button').forEach(btn => {
                btn.addEventListener('mouseover', () => btn.setAttribute('aria-expanded', 'true'));
                btn.addEventListener('focus', () => btn.setAttribute('aria-expanded', 'true'));
                btn.parentElement.addEventListener('mouseleave', () => btn.setAttribute('aria-expanded', 'false'));
                btn.addEventListener('blur', () => btn.setAttribute('aria-expanded', 'false'));
            });

            // Chat widget toggle
            const chatWidget = document.getElementById('chat-widget');
            const chatOverlay = document.getElementById('chat-overlay');
            const chatClose = document.getElementById('chat-close');

            function openChat() {
                chatOverlay.setAttribute('aria-hidden', 'false');
                chatOverlay.classList.add('active');
                chatWidget.setAttribute('aria-hidden', 'true');
            }
            function closeChat() {
                chatOverlay.setAttribute('aria-hidden', 'true');
                chatOverlay.classList.remove('active');
                chatWidget.setAttribute('aria-hidden', 'false');
                chatWidget.focus();
            }

            chatWidget.addEventListener('click', openChat);
            chatWidget.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openChat();
                }
            });

            chatClose.addEventListener('click', closeChat);
            chatClose.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    closeChat();
                }
            });

            chatOverlay.addEventListener('click', e => {
                if (e.target === chatOverlay) closeChat();
            });

            // Trap focus in chat overlay
            chatOverlay.addEventListener('keydown', e => {
                if (e.key === 'Tab') {
                    const focusableElements = chatOverlay.querySelectorAll('button, iframe');
                    const first = focusableElements[0];
                    const last = focusableElements[focusableElements.length - 1];
                    if (e.shiftKey) {
                        if (document.activeElement === first) {
                            e.preventDefault();
                            last.focus();
                        }
                    } else {
                        if (document.activeElement === last) {
                            e.preventDefault();
                            first.focus();
                        }
                    }
                } else if (e.key === 'Escape') {
                    closeChat();
                }
            });