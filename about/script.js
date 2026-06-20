const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));

        const chatBtn = document.getElementById('custom-chat-btn');
        const chatPanel = document.getElementById('chat-panel');
        const chatIframe = document.getElementById('chat-iframe');
        const teaser = document.getElementById('chat-teaser');
        let chatLoaded = false, chatOpen = false;

        chatBtn.addEventListener('click', () => {
            chatOpen = !chatOpen;
            if (chatOpen) {
                if (!chatLoaded) { chatIframe.src = 'https://paymegpt.com/agents/28816726/embed'; chatLoaded = true; }
                chatPanel.classList.add('open');
                teaser.classList.remove('visible'); teaser.classList.add('hidden');
                chatBtn.classList.remove('chat-bounce');
            } else {
                chatPanel.classList.remove('open');
            }
        });

        document.addEventListener('click', e => {
            if (chatOpen && !chatPanel.contains(e.target) && e.target !== chatBtn && !chatBtn.contains(e.target)) {
                chatPanel.classList.remove('open'); chatOpen = false;
            }
        });
        setTimeout(() => teaser.classList.add('visible'), 3000);
        document.getElementById('teaser-close-btn').addEventListener('click', () => { teaser.classList.remove('visible'); teaser.classList.add('hidden'); });