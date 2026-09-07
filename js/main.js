(()=>{
  const header=document.getElementById('siteHeader');
  const nav=document.querySelector('.main-nav');
  const toggle=document.querySelector('.menu-toggle');
  const links=[...document.querySelectorAll('.main-nav a')];
  const sections=[...document.querySelectorAll('main > section')];
  let current=0;

  toggle?.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
  });

  const goTo=(index)=>{
    if(!sections.length)return;
    current=(index+sections.length)%sections.length;
    sections[current].scrollIntoView({behavior:'smooth',block:'nearest',inline:'start'});
  };

  links.forEach((a,i)=>a.addEventListener('click',()=>{
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded','false');
    const id=a.getAttribute('href')?.replace('#','');
    const target=sections.findIndex(s=>s.id===id);
    if(target>=0){current=target;}
  }));

  document.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowRight')goTo(current+1);
    if(e.key==='ArrowLeft')goTo(current-1);
  });

  let startX=0;
  document.addEventListener('touchstart',(e)=>{
    startX=e.changedTouches[0].screenX;
  },{passive:true});

  document.addEventListener('touchend',(e)=>{
    const dx=e.changedTouches[0].screenX-startX;
    if(Math.abs(dx)>60){
      goTo(dx<0?current+1:current-1);
    }
  },{passive:true});

  window.addEventListener('scroll',()=>{
    header?.classList.toggle('scrolled',scrollY>30);
  },{passive:true});

  const reveal=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting)e.target.classList.add('visible');
    });
  },{threshold:.12});

  document.querySelectorAll('.section,.research-card,.person,.publication,.news-grid article').forEach(el=>{
    el.classList.add('reveal');
    reveal.observe(el);
  });
})();