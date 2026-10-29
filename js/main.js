(()=>{
'use strict';

// Laboratory page removed from the public site.
const laboratoryPage=document.getElementById('laboratory');
if(laboratoryPage)laboratoryPage.remove();
document.querySelectorAll('a[href="#laboratory"]').forEach(link=>link.remove());
document.querySelectorAll('style[id^="laboratory"]').forEach(style=>style.remove());
if(location.hash==='#laboratory')history.replaceState(null,'','#home');

// Remove the old "课题组动态" content completely from the live page.
// Keep only the #news container because main-original.js reuses it for 团队建设.
const teamCulturePage=document.getElementById('news');
if(teamCulturePage){
  if(!teamCulturePage.querySelector('.team-build-shell')){
    teamCulturePage.innerHTML='';
    teamCulturePage.className='news section';
  }
}
const teamCultureNav=document.querySelector('#mainNav a[href="#news"]');
if(teamCultureNav)teamCultureNav.textContent='团队建设';

function createPageSignature(){
  const signature=document.createElement('div');
  signature.className='page-signature';
  signature.innerHTML='<span>AMBIC Laboratory</span><span>SUN YAT-SEN UNIVERSITY</span>';
  return signature;
}
const signatureCss='.page-signature{display:flex;justify-content:space-between;align-items:center;gap:20px;width:100%;max-width:none;box-sizing:border-box;margin:40px auto 0;padding:22px 0 0;border-top:1px solid rgba(7,91,57,.16);color:#49675a;font-family:Arial,sans-serif;font-size:12px;line-height:1.5;letter-spacing:.12em}.page-signature span:last-child{text-align:right;font-size:11px;letter-spacing:.16em}@media(max-width:560px){.page-signature{gap:12px;font-size:10px;letter-spacing:.06em}.page-signature span:last-child{font-size:9px;letter-spacing:.08em}}';
const signatureStyle=document.createElement('style');
signatureStyle.textContent=signatureCss;
document.head.append(signatureStyle);
['publications','contact'].forEach(id=>{
  const page=document.getElementById(id);
  if(page)page.append(createPageSignature());
});


// Homepage carousel: manual controls and optional automatic playback.
const heroCarousel=document.querySelector('.home-carousel');
if(heroCarousel){
  const slides=[...heroCarousel.querySelectorAll('.home-carousel-slide')];
  const dots=[...heroCarousel.querySelectorAll('[data-hero-slide]')];
  const pause=heroCarousel.querySelector('[data-hero-pause]');
  const home=document.getElementById('home');
  let index=0,timer=null,hover=false,focused=false,inView=true;
  let paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stop=()=>{if(timer!==null){clearInterval(timer);timer=null;}};
  const render=next=>{
    index=(next+slides.length)%slides.length;
    slides.forEach((slide,i)=>{
      const active=i===index;
      slide.classList.toggle('is-active',active);
      slide.inert=!active;
      slide.setAttribute('aria-hidden',String(!active));
    });
    dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===index)));
  };
  const sync=()=>{
    stop();
    pause.setAttribute('aria-pressed',String(paused));
    pause.setAttribute('aria-label',paused?'播放自动轮播':'暂停自动轮播');
    pause.textContent=paused?'播放':'暂停';
    if(!paused&&!hover&&!focused&&!document.hidden&&inView&&home.classList.contains('active')){
      timer=setInterval(()=>render(index+1),5000);
    }
  };
  const move=next=>{render(next);sync();};
  heroCarousel.querySelector('[data-hero-prev]').addEventListener('click',()=>move(index-1));
  heroCarousel.querySelector('[data-hero-next]').addEventListener('click',()=>move(index+1));
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>move(i)));
  pause.addEventListener('click',()=>{paused=!paused;sync();});
  heroCarousel.addEventListener('mouseenter',()=>{hover=true;sync();});
  heroCarousel.addEventListener('mouseleave',()=>{hover=false;sync();});
  heroCarousel.addEventListener('focusin',()=>{focused=true;sync();});
  heroCarousel.addEventListener('focusout',e=>{if(!heroCarousel.contains(e.relatedTarget)){focused=false;sync();}});
  heroCarousel.addEventListener('keydown',e=>{
    if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();e.stopPropagation();move(index+(e.key==='ArrowRight'?1:-1));}
  });
  let touch=null;
  heroCarousel.addEventListener('touchstart',e=>{touch=e.touches.length===1?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null;},{passive:true});
  heroCarousel.addEventListener('touchcancel',()=>{touch=null;},{passive:true});
  heroCarousel.addEventListener('touchend',e=>{
    if(!touch)return;
    const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;touch=null;
    if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.8){e.stopPropagation();move(index+(dx<0?1:-1));}
  },{passive:true});
  document.addEventListener('visibilitychange',sync);
  new MutationObserver(sync).observe(home,{attributes:true,attributeFilter:['class']});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();},{root:home,threshold:.15}).observe(heroCarousel);
  render(0);sync();
}

// Load the preserved site logic after obsolete sections/content have been removed.
const script=document.createElement('script');
script.src='js/main-original.js?v=20261029-team-culture-vertical-1';
script.async=false;
document.body.appendChild(script);
})();
