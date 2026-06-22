function initBlog() {
      var mb=document.getElementById('mobile-menu-button'),mm=document.getElementById('mobile-menu');
      if(mb&&mm){mb.addEventListener('click',function(){mm.classList.toggle('hidden')})}

      var cl=document.getElementById('chat-launcher'),cp=document.getElementById('chat-panel'),cc=document.getElementById('chat-close');
      if(cl&&cp){cl.addEventListener('click',function(){cp.classList.toggle('hidden')})}
      if(cc&&cp){cc.addEventListener('click',function(){cp.classList.add('hidden')})}

      var modal=document.getElementById('article-modal'),mcb=document.getElementById('close-modal');
      function closeModal(){modal.classList.add('hidden');modal.classList.remove('flex')}
      if(mcb){mcb.addEventListener('click',closeModal)}
      if(modal){modal.addEventListener('click',function(e){if(e.target===modal||e.target===modal.firstElementChild)closeModal()})}
      document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal()});

      function openModal(a){
        document.getElementById('modal-category').textContent=a.category||'';
        document.getElementById('modal-title').textContent=a.title||'';
        document.getElementById('modal-author').textContent=a.author?'By '+a.author:'';
        document.getElementById('modal-date').textContent=a.date||'';
        document.getElementById('modal-summary').textContent=a.summary||'';
        var img=document.getElementById('modal-image');
        if(a.image_url){img.src=a.image_url;img.alt=a.title||'';img.classList.remove('hidden')}else{img.classList.add('hidden')}
        var html=a.html_content||'';
        if(html.charAt(0)==='"')html=html.slice(1);
        if(html.charAt(html.length-1)==='"')html=html.slice(0,-1);
        document.getElementById('modal-content').innerHTML=html;
        modal.classList.remove('hidden');modal.classList.add('flex');
      }

      var _b='https://api.getkrowd.com/v3/company/';
      var _c='123mobiledetailing';
      var _e='/blog.cfm?companyId=1122&apiKey=';
      var _k=['krwd_ad51f0162ffc9','e7d7337bd2bfa95d','d70d25a38c42d733','9bab67966620cb'].join('');
      var API=_b+_c+_e+_k;

      fetch(API)
        .then(function(r){return r.json()})
        .then(function(json){
          document.getElementById('articles-loading').style.display='none';
          var articles=(json.blogs||[]).filter(function(a){return a.published});
          var c=document.getElementById('sheet-data');
          if(!articles.length){document.getElementById('articles-error').classList.remove('hidden');return}
          c.innerHTML=articles.map(function(a,i){
            var img=a.image_url||'';
            var imgH=img?'<img src="'+img+'" alt="'+(a.title||'')+'" loading="lazy" class="h-56 w-full object-cover" onerror="this.style.display=\'none\'">':'<div class="flex h-56 items-center justify-center bg-white/5 text-4xl text-zinc-600">&#128663;</div>';
            return '<article class="card-lift cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#18181b]" data-idx="'+i+'">'+imgH+'<div class="p-5">'+(a.category?'<span class="inline-flex rounded-full bg-[#facc15]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#facc15]">'+a.category+'</span>':'')+'<h3 class="racing-title mt-4 text-xl font-black text-white">'+(a.title||'Untitled')+'</h3><p class="mt-3 text-sm leading-6 text-zinc-300">'+(a.summary||'')+'</p><div class="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zinc-500"><span>'+(a.author||'')+'</span><span>'+(a.date||'')+'</span></div></div></article>';
          }).join('');
          Array.from(c.querySelectorAll('article')).forEach(function(card){
            card.addEventListener('click',function(){openModal(articles[parseInt(card.dataset.idx)])});
          });
        })
        .catch(function(e){
          console.error(e);
          document.getElementById('articles-loading').style.display='none';
          document.getElementById('articles-error').classList.remove('hidden');
        });
    }

    if(document.readyState==='loading'){
      document.addEventListener('DOMContentLoaded',initBlog);
    } else {
      initBlog();
    }