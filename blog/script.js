// ===== NAV INTERACTIONS =====
    // Purpose: Handles mobile menu and dropdown menus in a compact, touch-friendly way.
    // Triggers: On navigation button clicks and outside clicks.
    (function () {
      const mobileBtn = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
      mobileBtn && mobileBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('menu-open');
        mobileMenu.classList.toggle('hidden', !isOpen);
        mobileBtn.setAttribute('aria-expanded', String(isOpen));
      });

      document.querySelectorAll('.dropdown-toggle').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const parent = btn.closest('.dropdown');
          document.querySelectorAll('.dropdown').forEach((d) => { if (d !== parent) d.classList.remove('dropdown-open'); });
          parent && parent.classList.toggle('dropdown-open');
        });
      });
      document.addEventListener('click', () => document.querySelectorAll('.dropdown').forEach((d) => d.classList.remove('dropdown-open')));
    })();

    // ===== CHAT WIDGET =====
    // Purpose: Show or hide the embedded assistant panel.
    // Triggers: Floating yellow chat button and close button.
    (function () {
      const launcher = document.getElementById('chat-launcher');
      const panel = document.getElementById('chat-panel');
      const close = document.getElementById('chat-close');
      launcher && launcher.addEventListener('click', () => panel.classList.toggle('hidden'));
      close && close.addEventListener('click', () => panel.classList.add('hidden'));
    })();

    // ===== ARTICLE MODAL =====
    // Purpose: Opens a selected blog card and displays the full HTML content from the sheet.
    // Triggers: Clicks on dynamically generated article cards.
    (function () {
      const modal = document.getElementById('article-modal');
      const closeBtn = document.getElementById('close-modal');
      const closeModal = () => modal.classList.add('hidden');
      closeBtn && closeBtn.addEventListener('click', closeModal);
      modal && modal.addEventListener('click', (e) => { if (e.target === modal || e.target === modal.firstElementChild) closeModal(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

      window.openArticleModal = function (article) {
        document.getElementById('modal-category').textContent = article.Category || 'Journal';
        document.getElementById('modal-title').textContent = article.Title || '';
        document.getElementById('modal-author').textContent = article.Author ? `By ${article.Author}` : '';
        document.getElementById('modal-date').textContent = article.Date || '';
        document.getElementById('modal-summary').textContent = article.Summary || '';
        const img = document.getElementById('modal-image');
        if (article['Image URL']) {
          img.src = article['Image URL'];
          img.alt = article.Title || 'Article image';
          img.classList.remove('hidden');
        } else {
          img.classList.add('hidden');
        }
        document.getElementById('modal-content').innerHTML = article['HTML Content'] || '<p>No full article content was provided.</p>';
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      };
    })();

    const API_URL = document.querySelector('meta[name="sheet-data-url"]')?.content;
    function loadArticles() {
      fetch(API_URL).then(r => r.json()).then(json => {
        const articles = json.data.filter(a => a.Published && a.Published.toLowerCase() === 'true'); // render cards with: a.Title, a.Summary, a['Image URL'], a.Category, a.Author, a.Date, a['HTML Content']
        const container = document.getElementById('sheet-data');
        const errorDiv = document.getElementById('menu-error');
        if (!container || !articles || articles.length === 0) {
          if (errorDiv) errorDiv.classList.remove('hidden');
          return;
        }
        const imageKeys = ['Image URL','image_url','imageUrl','Image','image','Photo','photo','Picture','picture','Thumbnail','thumbnail','Logo','logo','Img','img','Avatar','avatar'];
        container.innerHTML = articles.map(function(a, idx) {
          let imgUrl = a['Image URL'] || '';
          if (!imgUrl) {
            for (let i = 0; i < imageKeys.length; i++) { if (a[imageKeys[i]]) { imgUrl = a[imageKeys[i]]; break; } }
          }
          const imgHtml = imgUrl ? '<img src="' + imgUrl + '" alt="' + (a.Title || '') + '" loading="lazy" class="h-56 w-full object-cover" onerror="this.style.display=\'none\'">' : '<div class="flex h-56 items-center justify-center bg-white/5 text-5xl">🏁</div>';
          return '<article class="card-lift group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#18181b]" style="animation-delay:' + (idx * 0.05) + 's" data-title="' + (a.Title || '') + '">' +
            imgHtml +
            '<div class="p-5">' +
            (a.Category ? '<span class="inline-flex rounded-full bg-[#facc15]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#facc15]">' + a.Category + '</span>' : '') +
            '<h3 class="racing-title mt-4 text-xl font-black text-white group-hover:text-[#facc15]">' + (a.Title || 'Untitled Article') + '</h3>' +
            '<p class="mt-3 text-sm leading-6 text-zinc-300">' + (a.Summary || '') + '</p>' +
            '<div class="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zinc-500">' +
            '<span>' + (a.Author || '') + '</span>' +
            '<span>' + (a.Date || '') + '</span>' +
            '</div>' +
            '</div></article>';
        }).join('');

        Array.from(container.children).forEach(function(card, i) {
          card.addEventListener('click', function() { openArticleModal(articles[i]); });
        });
      })
      .catch(function(err) {
        console.error('Sheet data error:', err);
        const errorDiv = document.getElementById('menu-error');
        if (errorDiv) errorDiv.classList.remove('hidden');
      });
    }
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', loadArticles);
    } else { loadArticles();
    }