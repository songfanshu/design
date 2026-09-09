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
function installViewportFit(){
 const style=document.createElement('style');
 style.id='viewport-fit-home-research';
 style.textContent=`
@media (min-width:651px){
 body.paged #home{height:100%;min-height:0;overflow:hidden;padding-top:clamp(22px,4.2vh,52px);padding-bottom:18px;gap:clamp(10px,1.8vh,20px)}
 body.paged #home .mockup-copy h1{font-size:clamp(38px,min(4.45vw,7.2vh),68px);line-height:1.12;margin-bottom:clamp(8px,1.5vh,16px)}
 body.paged #home .lab-cn{font-size:clamp(17px,min(1.55vw,2.8vh),24px);line-height:1.4}
 body.paged #home .lab-en{font-size:clamp(13px,min(1.2vw,2.1vh),18px);line-height:1.35;margin-bottom:clamp(8px,1.5vh,16px)}
 body.paged #home .mockup-description{font-size:clamp(14px,min(1.05vw,2.2vh),17px);line-height:1.65;margin:8px 0}
 body.paged #home .mockup-button{padding:9px 22px;margin-top:6px}
 body.paged #home .home-slogan{padding-top:8px}
 body.paged #home .home-slogan strong{font-size:clamp(13px,1vw,16px)}
 body.paged #home .home-slogan small{font-size:11px;margin-top:3px}
 body.paged #home .home-pager{padding:5px 13px}
 body.paged #research{height:100%;overflow:hidden;padding-top:clamp(20px,3.5vh,38px);padding-bottom:clamp(18px,3vh,32px);display:flex;flex-direction:column}
 body.paged #research .section-head{margin-bottom:clamp(14px,2.6vh,28px);flex:0 0 auto}
 body.paged #research .section-head h2{font-size:clamp(28px,min(2.7vw,4.8vh),44px);margin:4px 0 8px;line-height:1.15}
 body.paged #research .section-head p{font-size:clamp(13px,min(1vw,1.9vh),16px);margin-bottom:4px}
 body.paged #research .section-label{font-size:12px}
 body.paged #research .research-grid{flex:1;min-height:0;align-items:stretch;gap:clamp(14px,1.7vw,24px)}
 body.paged #research .research-card{min-height:0;padding:clamp(16px,2.3vh,26px);overflow:hidden}
 body.paged #research .research-art{height:clamp(78px,16vh,126px);margin:clamp(8px,1.5vh,16px) 0}
 body.paged #research .research-card h3{font-size:clamp(17px,min(1.35vw,2.6vh),21px);line-height:1.35;margin:6px 0}
 body.paged #research .research-card p{font-size:clamp(13px,min(.95vw,1.85vh),15px);line-height:1.55;margin:5px 0}
 body.paged #research .research-card a{font-size:14px;padding-top:8px;margin-top:auto}
}
@media (min-width:651px) and (max-height:700px){
 body.paged #home{padding-top:16px;gap:8px}
 body.paged #home .mockup-copy h1{font-size:clamp(34px,6.2vh,50px)}
 body.paged #home .mockup-description{line-height:1.45}
 body.paged #research{padding-top:14px;padding-bottom:14px}
 body.paged #research .section-head{margin-bottom:10px}
 body.paged #research .research-art{height:72px;margin:7px 0}
 body.paged #research .research-card{padding:14px 18px}
 body.paged #research .research-card p{line-height:1.4}
}
`;
 document.head.appendChild(style);
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
installViewportFit();
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