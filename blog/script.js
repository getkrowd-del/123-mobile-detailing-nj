function openMod(a){
      document.getElementById('mod-cat').textContent=a.category||'';
      document.getElementById('mod-title').textContent=a.title||'';
      document.getElementById('mod-author').textContent=a.author?'By '+a.author:'';
      document.getElementById('mod-date').textContent=a.date||'';
      document.getElementById('mod-summary').textContent=a.summary||'';
      var img=document.getElementById('mod-img');
      if(a.image_url){img.src=a.image_url;img.alt=a.title||'';img.style.display='block'}else{img.style.display='none'}
      var html=a.html_content||'';
      if(html.charAt(0)==='"')html=html.slice(1);
      if(html.charAt(html.length-1)==='"')html=html.slice(0,-1);
      document.getElementById('mod-content').innerHTML=html;
      document.getElementById('art-modal').classList.add('open');
    }
    function closeMod(){document.getElementById('art-modal').classList.remove('open')}
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMod()});

    var _b='https://api.getkrowd.com/v3/company/';
    var _c='123mobiledetailing';
    var _e='/blog.cfm?companyId=1122&apiKey=';
    var _k=['krwd_ad51f0162ffc9','e7d7337bd2bfa95d','d70d25a38c42d733','9bab67966620cb'].join('');

    fetch(_b+_c+_e+_k)
      .then(function(r){return r.json()})
      .then(function(json){
        document.getElementById('articles-loading').style.display='none';
        var arts=(json.blogs||[]).filter(function(a){return a.published});
        var c=document.getElementById('sheet-data');
        if(!arts.length){document.getElementById('articles-error').style.display='block';return}
        c.innerHTML=arts.map(function(a,i){
          var img=a.image_url||'';
          var imgH=img?'<img src="'+img+'" alt="'+(a.title||'')+'" loading="lazy" class="h-56 w-full object-cover" onerror="this.style.display=\'none\'">':'<div class="flex h-56 items-center justify-center bg-white/5 text-4xl text-zinc-600">&#128663;</div>';
          return '<article class="card-lift cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#18181b]" onclick="openMod(window.__arts['+i+'])">'+imgH+'<div class="p-5">'+(a.category?'<span class="inline-flex rounded-full bg-[#facc15]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#facc15]">'+a.category+'</span>':'')+'<h3 class="racing-title mt-4 text-xl font-black text-white">'+(a.title||'Untitled')+'</h3><p class="mt-3 text-sm leading-6 text-zinc-300">'+(a.summary||'')+'</p><div class="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zinc-500"><span>'+(a.author||'')+'</span><span>'+(a.date||'')+'</span></div></div></article>';
        }).join('');
        window.__arts=arts;
      })
      .catch(function(){
        document.getElementById('articles-loading').style.display='none';
        document.getElementById('articles-error').style.display='block';
      });