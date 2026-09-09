(()=>{
'use strict';
const main=document.getElementById('pages');
const pages=[...main.querySelectorAll(':scope > section')];
const nav=document.getElementById('mainNav');
const toggle=document.querySelector('.menu-toggle');
let current=0;
if('scrollRestoration' in history) history.scrollRestoration='manual';
function show(id,push=false){
 let index=pages.findIndex(p=>p.id===id); if(index<0)index=0;
 current=index;
 pages.forEach((p,i)=>{const active=i===index;p.classList.toggle('active',active);p.classList.toggle('before',i<index);p.inert=!active;p.setAttribute('aria-hidden',String(!active));});
 nav.querySelectorAll('a').forEach(a=>{if(a.hash==='#'+pages[index].id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');
 if(push&&location.hash!=='#'+pages[index].id)history.pushState(null,'','#'+pages[index].id);
}
document.body.classList.add('paged');
show(location.hash.slice(1));
document.addEventListener('click',e=>{
 const a=e.target.closest('a[href^="#"]');if(!a)return;
 const id=a.hash.slice(1);if(!pages.some(p=>p.id===id))return;
 e.preventDefault();show(id,true);
});
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
window.addEventListener('popstate',()=>show(location.hash.slice(1)));
window.addEventListener('hashchange',()=>show(location.hash.slice(1)));
window.addEventListener('pageshow',()=>show(location.hash.slice(1)));
document.addEventListener('keydown',e=>{
 if(e.target.closest('input,textarea,select,[contenteditable="true"]'))return;
 if(e.key==='Escape'){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
 if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const next=Math.max(0,Math.min(pages.length-1,current+(e.key==='ArrowRight'?1:-1)));show(pages[next].id,true);}
});
let touch=null;
main.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;touch={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
main.addEventListener('touchend',e=>{if(!touch)return;const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;touch=null;if(Math.abs(dx)>80&&Math.abs(dx)>Math.abs(dy)*1.8){const next=Math.max(0,Math.min(pages.length-1,current+(dx<0?1:-1)));show(pages[next].id,true);}},{passive:true});
})();