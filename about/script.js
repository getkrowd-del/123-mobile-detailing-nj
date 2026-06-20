const mobileBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileClose = document.getElementById('mobile-menu-close');
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('opacity-100');
            mobileMenu.classList.toggle('pointer-events-auto');
            mobileMenu.classList.toggle('scale-100');
            mobileMenu.classList.toggle('scale-95');
            mobileMenu.classList.toggle('opacity-0');
        });
        mobileClose.addEventListener('click', () => {
            mobileMenu.classList.remove('opacity-100');
            mobileMenu.classList.remove('pointer-events-auto');
            mobileMenu.classList.remove('scale-100');
            mobileMenu.classList.add('scale-95');
            mobileMenu.classList.add('opacity-0');
        });

        // Chat Widget toggle
        const chatWidget = document.getElementById('chat-widget');
        const chatIframe = document.getElementById('chat-iframe');
        chatWidget.addEventListener('click', () => {
            if (chatIframe.classList.contains('hidden')) {
                chatIframe.classList.remove('hidden');
                chatWidget.classList.add('hidden');
            }
        });
        chatIframe.addEventListener('mouseleave', () => {
            chatIframe.classList.add('hidden');
            chatWidget.classList.remove('hidden');
        });