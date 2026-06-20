// Mobile menu toggle logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      mobileMenu.setAttribute('aria-hidden', 'false');
    });
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });

    // Chat widget logic: open chat iframe on click
    const chatWidget = document.getElementById('chat-widget');
    let chatIframe;
    chatWidget.addEventListener('click', () => {
      if (!chatIframe) {
        chatIframe = document.createElement('iframe');
        chatIframe.src = 'https://paymegpt.com/agents/28816726/embed';
        chatIframe.style.position = 'fixed';
        chatIframe.style.bottom = '24px';
        chatIframe.style.right = '24px';
        chatIframe.style.width = '400px';
        chatIframe.style.height = '600px';
        chatIframe.style.border = 'none';
        chatIframe.style.borderRadius = '8px';
        chatIframe.style.boxShadow = '0 12px 32px rgba(250, 204, 21, 0.5)';
        chatIframe.style.zIndex = '1000';
        document.body.appendChild(chatIframe);
      } else {
        if (chatIframe.style.display === 'none') {
          chatIframe.style.display = 'block';
        } else {
          chatIframe.style.display = 'none';
        }
      }
    });

(() => {
          const API_URL = 'https://paymegpt.com/api/public/landing-pages/5008/sheet-data';
          const container = document.getElementById('blog-cards-container');
          const loading = document.getElementById('blog-loading');
          const template = document.getElementById('blog-card-template');
          const modal = document.getElementById('blog-article-modal');
          const modalTitle = modal.querySelector('#modal-title');
          const modalCategory = modal.querySelector('#modal-category');
          const modalAuthorDate = modal.querySelector('#modal-author-date');
          const modalContent = modal.querySelector('#modal-content');
          const modalCloseBtn = modal.querySelector('#modal-close-button');

          function formatDate(dateStr) {
            if (!dateStr) return '';
            let d = new Date(dateStr);
            if (isNaN(d)) return dateStr;
            return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
          }

          function closeModal() {
            modal.classList.add('hidden');
            modalContent.innerHTML = '';
            document.body.style.overflow = '';
          }

          modalCloseBtn.addEventListener('click', closeModal);
          modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
          });

          window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
              closeModal();
            }
          });

          function createCard(article) {
            const card = template.content.firstElementChild.cloneNode(true);
            const img = card.querySelector('img');
            const category = card.querySelector('div.absolute');
            const titleEl = card.querySelector('h3');
            const summaryEl = card.querySelector('p');
            const authorEl = card.querySelector('.article-author');
            const dateEl = card.querySelector('.article-date');

            img.src = article['Image URL'] || '';
            img.alt = article.Title || 'Blog article image';
            category.textContent = article.Category || '';
            titleEl.textContent = article.Title || '';
            summaryEl.textContent = article.Summary || '';
            authorEl.textContent = article.Author || '';
            dateEl.textContent = formatDate(article.Date);

            function openArticle() {
              modalTitle.textContent = article.Title || '';
              modalCategory.textContent = article.Category || '';
              modalAuthorDate.textContent = (article.Author ? article.Author : '') + (article.Author && article.Date ? ' · ' : '') + formatDate(article.Date);
              modalContent.innerHTML = article['HTML Content'] || '';
              modal.classList.remove('hidden');
              modal.focus();
              document.body.style.overflow = 'hidden';
            }

            card.addEventListener('click', openArticle);
            card.addEventListener('keydown', e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openArticle();
              }
            });

            return card;
          }

          async function loadArticles() {
            try {
              const res = await fetch(API_URL);
              if (!res.ok) throw new Error('Failed to fetch articles');
              const json = await res.json();

              loading.remove();
              const articles = json.data.filter(a => a.Published && (a.Published.toLowerCase() === 'true'));
              if (articles.length === 0) {
                container.innerHTML = '<p class="text-gray-400 col-span-full text-center py-20 select-none">No articles available at this time.</p>';
                return;
              }

              for (const article of articles) {
                const card = createCard(article);
                container.appendChild(card);
              }
            } catch (e) {
              loading.textContent = 'Failed to load articles.';
              console.error(e);
            }
          }

          if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadArticles);
      } else {
        loadArticles();
      }
        })();

const mobileNavToggle = document.getElementById('mobile-nav-toggle');
      const mobileNavOverlay = document.getElementById('mobile-nav-overlay');

      mobileNavToggle.addEventListener('click', () => {
        const expanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
        mobileNavToggle.setAttribute('aria-expanded', !expanded);
        if (expanded) {
          mobileNavOverlay.classList.add('hidden');
          document.body.style.overflow = '';
        } else {
          mobileNavOverlay.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }
      });

(function() {
        const widget = document.getElementById('chat-widget');
        let chatIframe = null;
        widget.addEventListener('click', () => {
          if (chatIframe) return;
          chatIframe = document.createElement('iframe');
          chatIframe.src = 'https://paymegpt.com/agents/28816726/embed';
          chatIframe.style.position = 'fixed';
          chatIframe.style.bottom = '130px';
          chatIframe.style.right = '24px';
          chatIframe.style.width = '320px';
          chatIframe.style.height = '480px';
          chatIframe.style.border = 'none';
          chatIframe.style.borderRadius = '12px';
          chatIframe.style.zIndex = '10000';
          chatIframe.style.boxShadow = '0 6px 24px rgba(250, 204, 21, 0.5)';
          document.body.appendChild(chatIframe);
          // Optionally disable widget click after open or allow closing chat by extra logic
        });
        widget.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            widget.click();
          }
        });
      })();