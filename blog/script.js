(function(){
      var mb=document.getElementById('mobile-menu-button'),mm=document.getElementById('mobile-menu');
      if(mb&&mm){mb.addEventListener('click',function(){mm.classList.toggle('hidden')})}
      var cl=document.getElementById('chat-launcher'),cp=document.getElementById('chat-panel'),cc=document.getElementById('chat-close');
      if(cl&&cp){cl.addEventListener('click',function(){cp.classList.toggle('hidden')})}
      if(cc&&cp){cc.addEventListener('click',function(){cp.classList.add('hidden')})}
      var modal=document.getElementById('article-modal'),mcb=document.getElementById('close-modal');
      function closeModal(){if(modal){modal.classList.add('hidden');modal.classList.remove('flex')}}
      if(mcb){mcb.addEventListener('click',closeModal)}
      if(modal){modal.addEventListener('click',function(e){if(e.target===modal||e.target===modal.firstElementChild)closeModal()})}
      document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal()});
      window.openArticleModal=function(a){
        document.getElementById('modal-category').textContent=a.Category||'';
        document.getElementById('modal-title').textContent=a.Title||'';
        document.getElementById('modal-author').textContent=a.Author?'By '+a.Author:'';
        document.getElementById('modal-date').textContent=a.Date||'';
        document.getElementById('modal-summary').textContent=a.Summary||'';
        var img=document.getElementById('modal-image');
        if(a['Image URL']){img.src=a['Image URL'];img.alt=a.Title||'';img.classList.remove('hidden')}else{img.classList.add('hidden')}
        document.getElementById('modal-content').innerHTML=a['HTML Content']||'';
        modal.classList.remove('hidden');modal.classList.add('flex');
      };
      var API=document.querySelector('meta[name="sheet-data-url"]');
      var url=API?API.content:null;
      if(!url)return;
      fetch(url).then(function(r){return r.json()}).then(function(json){
        var articles=json.data.filter(function(a){return a.Published&&a.Published.toLowerCase()==='true'});
        var c=document.getElementById('sheet-data'),err=document.getElementById('menu-error');
        if(!c||!articles||articles.length===0){if(err)err.classList.remove('hidden');return}
        c.innerHTML=articles.map(function(a){
          var img=a['Image URL']||'';
          var imgH=img?'<img src="'+img+'" alt="'+(a.Title||'')+'" loading="lazy" class="h-56 w-full object-cover" onerror="this.style.display=\'none\'">':'<div class="flex h-56 items-center justify-center bg-white/5 text-4xl text-zinc-600">&#128663;</div>';
          return '<article class="card-lift cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#18181b]">'+imgH+'<div class="p-5">'+(a.Category?'<span class="inline-flex rounded-full bg-[#facc15]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#facc15]">'+a.Category+'</span>':'')+'<h3 class="racing-title mt-4 text-xl font-black text-white">'+(a.Title||'Untitled')+'</h3><p class="mt-3 text-sm leading-6 text-zinc-300">'+(a.Summary||'')+'</p><div class="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zinc-500"><span>'+(a.Author||'')+'</span><span>'+(a.Date||'')+'</span></div></div></article>';
        }).join('');
        Array.from(c.children).forEach(function(card,i){card.addEventListener('click',function(){openArticleModal(articles[i])})});
      }).catch(function(){var err=document.getElementById('menu-error');if(err)err.classList.remove('hidden')});
    })();