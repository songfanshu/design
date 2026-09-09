(()=>{
'use strict';
const main=document.getElementById('pages');
const pages=[...main.querySelectorAll(':scope > section')];
const nav=document.getElementById('mainNav');
const toggle=document.querySelector('.menu-toggle');
let current=0;
let campusMap=null;
if('scrollRestoration' in history) history.scrollRestoration='manual';
function show(id,push=false){
 let index=pages.findIndex(p=>p.id===id); if(index<0)index=0;
 const previous=pages[current];
 const moveFocus=push&&previous?.contains(document.activeElement);
 current=index;
 if(push)pages[index].scrollTop=0;
 pages.forEach((p,i)=>{const active=i===index;p.classList.toggle('active',active);p.classList.toggle('before',i<index);p.inert=!active;p.setAttribute('aria-hidden',String(!active));});
 if(moveFocus){pages[index].setAttribute('tabindex','-1');pages[index].focus({preventScroll:true});}
 nav.querySelectorAll('a').forEach(a=>{if(a.hash==='#'+pages[index].id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');
 if(id==='contact'&&campusMap)setTimeout(()=>campusMap.resize(),80);
 if(push&&location.hash!=='#'+pages[index].id)history.pushState(null,'','#'+pages[index].id);
}
function initSharpCampusMap(){
 const frame=document.querySelector('#contact .map-frame');
 if(!frame)return;
 const old=frame.querySelector('iframe');
 if(!old)return;
 const mapEl=document.createElement('div');
 mapEl.id='campusVectorMap';
 mapEl.setAttribute('aria-label','中山大学深圳校区交互式矢量地图');
 mapEl.style.cssText='width:100%;height:420px;border:1px solid var(--line);border-radius:8px;overflow:hidden;background:#eef3ef';
 old.replaceWith(mapEl);
 const css=document.createElement('link');
 css.rel='stylesheet';css.href='https://unpkg.com/maplibre-gl@5/dist/maplibre-gl.css';
 document.head.appendChild(css);
 const script=document.createElement('script');
 script.src='https://unpkg.com/maplibre-gl@5/dist/maplibre-gl.js';
 script.onload=()=>{
   campusMap=new maplibregl.Map({container:'campusVectorMap',style:'https://tiles.openfreemap.org/styles/liberty',center:[113.953099,22.800721],zoom:15.2,maxZoom:19,attributionControl:true});
   campusMap.addControl(new maplibregl.NavigationControl({showCompass:false}),'top-right');
   const marker=document.createElement('div');
   marker.style.cssText='width:20px;height:20px;border-radius:50%;background:#075b39;border:4px solid white;box-shadow:0 2px 10px rgba(0,0,0,.35)';
   new maplibregl.Marker({element:marker,anchor:'center'}).setLngLat([113.953099,22.800721]).setPopup(new maplibregl.Popup({offset:18}).setHTML('<strong>中山大学深圳校区</strong><br>深圳市光明区公常路66号')).addTo(campusMap);
   campusMap.on('load',()=>campusMap.resize());
 };
 script.onerror=()=>{mapEl.replaceWith(old);};
 document.head.appendChild(script);
 const mq=window.matchMedia('(max-width:650px)');
 const resizeHeight=()=>{mapEl.style.height=mq.matches?'320px':'420px';if(campusMap)campusMap.resize();};
 resizeHeight();mq.addEventListener?.('change',resizeHeight);
}
document.body.classList.add('paged');
initSharpCampusMap();
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
main.addEventListener('touchstart',e=>{if(e.touches.length!==1){touch=null;return;}touch={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
main.addEventListener('touchcancel',()=>{touch=null;},{passive:true});
main.addEventListener('touchend',e=>{if(!touch)return;const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;touch=null;if(Math.abs(dx)>80&&Math.abs(dx)>Math.abs(dy)*1.8){const next=Math.max(0,Math.min(pages.length-1,current+(dx<0?1:-1)));show(pages[next].id,true);}},{passive:true});
})();