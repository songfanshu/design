(()=>{
'use strict';
const main=document.getElementById('pages');
const pages=[...main.querySelectorAll(':scope > section')];
const nav=document.getElementById('mainNav');
const toggle=document.querySelector('.menu-toggle');
const autoPageIds=['home','research','publications','team','visual','news','contact'];
const AUTO_SWITCH_MS=15000;
let current=0;
let campusMap=null;
let autoTimer=null;
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
 updatePageDots(pages[index].id);
 nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');
 if(id==='contact'&&campusMap)setTimeout(()=>campusMap.resize(),80);
 if(push&&location.hash!=='#'+pages[index].id)history.pushState(null,'','#'+pages[index].id);
 restartAutoSwitch();
}
function installViewportFit(){
 const style=document.createElement('style');
 style.id='viewport-fit-home-research';
 style.textContent=`
body.paged #home:before{background:linear-gradient(90deg,rgba(255,255,255,.82),rgba(255,255,255,.66) 32%,rgba(255,255,255,.08) 72%)}
body.paged #home .lab-cn,body.paged #home .lab-en,body.paged #home .mockup-description,body.paged #home .home-slogan strong,body.paged #home .home-slogan small{color:#18372e;font-weight:700}
body.paged #home .lab-cn{font-weight:900}
body.paged #home .lab-en{font-weight:700}
body.paged #home .mockup-description{font-weight:700}
#team .alumni-placeholder{min-height:112px;width:100%;border:1px dashed rgba(7,91,57,.28);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#708079;font-size:14px;letter-spacing:.08em;background:rgba(255,255,255,.34)}
.page-dots-controller{position:fixed;right:22px;top:50%;transform:translateY(-50%);z-index:80;display:flex;flex-direction:column;align-items:center;gap:10px;padding:0;border:0;background:transparent;box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none}
.page-dot{appearance:none;-webkit-appearance:none;width:9px;height:9px;padding:0;border:0;border-radius:50%;background:rgba(24,55,46,.34);cursor:pointer;transition:transform .22s ease,background .22s ease}
.page-dot:hover{transform:scale(1.16);background:rgba(24,55,46,.58)}
.page-dot.active{background:#18372e;transform:scale(1.25)}
.page-dot:focus-visible{outline:2px solid #18372e;outline-offset:3px}
@media (max-width:650px){.page-dots-controller{right:10px;top:50%;gap:8px;padding:0}.page-dot{width:8px;height:8px}}
@media (min-width:651px){
 body.paged #home{height:100%;min-height:0;overflow:hidden;padding-top:0;padding-bottom:0;gap:0;display:block}
 body.paged #home .mockup-copy{max-width:920px;padding-top:0;position:absolute;left:11.3vw;top:48%;transform:translateY(-50%);z-index:2}
 body.paged #home .lab-cn{font-size:41px;line-height:1.25;letter-spacing:.02em;margin:0 0 8px;white-space:nowrap}
 body.paged #home .lab-en{font-size:clamp(13px,min(1.15vw,2vh),18px);line-height:1.45;letter-spacing:.035em;margin:0 0 clamp(18px,3vh,30px)}
 body.paged #home .mockup-description{font-size:clamp(14px,min(1.02vw,2vh),17px);line-height:1.85;margin:0 0 14px;max-width:600px}
 body.paged #home .mockup-button{padding:10px 24px;margin-top:8px;font-weight:700}
 body.paged #home .home-slogan{position:absolute;left:11.3vw;top:calc(48% + 205px);bottom:auto;padding-top:0;max-width:680px;z-index:2}
 body.paged #home .home-slogan strong{font-size:clamp(13px,1vw,16px)}
 body.paged #home .home-slogan small{font-size:11px;margin-top:4px}
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
 body.paged #home .mockup-copy{top:47%}
 body.paged #home .home-slogan{top:calc(47% + 180px)}
 body.paged #home .lab-cn{font-size:41px}
 body.paged #home .lab-en{margin-bottom:14px}
 body.paged #home .mockup-description{line-height:1.55}
 body.paged #research{padding-top:14px;padding-bottom:14px}
 body.paged #research .section-head{margin-bottom:10px}
 body.paged #research .research-art{height:72px;margin:7px 0}
 body.paged #research .research-card{padding:14px 18px}
 body.paged #research .research-card p{line-height:1.4}
}
`;
 document.head.appendChild(style);
}
function applyCopyUpdates(){
 const home=document.getElementById('home');
 if(home){
   const headline=home.querySelector('.mockup-copy h1');
   if(headline)headline.remove();
   const cn=home.querySelector('.lab-cn');
   if(cn)cn.textContent='先进集成电路材料与类脑芯片课题组';
   const en=home.querySelector('.lab-en');
   if(en)en.textContent='Advanced IC Materials & Neuromorphic Chips Research Group';
   const pager=home.querySelector('.home-pager');
   if(pager)pager.remove();
 }
}
function addMasterStudents(){
 const list=document.querySelector('#team .roster-masters .roster-students');
 if(!list)return;
 const names=['胡松','张宇迪','孙艳姿','朱丹','程现','尹越檐','赵安欣'];
 const existing=new Set([...list.querySelectorAll('.roster-student > span:last-child')].map(el=>el.textContent.trim()));
 const avatar='<span class="roster-avatar" aria-hidden="true"><svg viewBox="0 0 80 80" fill="none"><circle cx="40" cy="28" r="13" fill="#c5ccca"/><path d="M15 71v-7a25 25 0 0 1 50 0v7" fill="#c5ccca"/></svg></span>';
 names.forEach(name=>{
   if(existing.has(name))return;
   list.insertAdjacentHTML('beforeend',`<li class="roster-student">${avatar}<span>${name}</span></li>`);
 });
}
function addAlumniSection(){
 const team=document.getElementById('team');
 if(!team||team.querySelector('.roster-alumni'))return;
 const masters=team.querySelector('.roster-masters');
 if(!masters)return;
 masters.insertAdjacentHTML('afterend','<div class="roster-row roster-alumni"><div class="roster-label"><h3>毕业生</h3><span>ALUMNI</span></div><div class="roster-members"><div class="alumni-placeholder">待添加</div></div></div>');
}
function installPageDots(){
 const ids=autoPageIds.filter(id=>pages.some(p=>p.id===id));
 if(!ids.length||document.querySelector('.page-dots-controller'))return;
 const labels={home:'首页',research:'研究方向',publications:'科研成果',team:'团队成员',visual:'科研资源',news:'动态',contact:'联系我们'};
 const controller=document.createElement('div');
 controller.className='page-dots-controller';
 controller.setAttribute('role','navigation');
 controller.setAttribute('aria-label','页面切换');
 controller.innerHTML=ids.map(id=>`<button class="page-dot" type="button" data-page="${id}" aria-label="切换到${labels[id]||id}" title="${labels[id]||id}"></button>`).join('');
 controller.addEventListener('click',e=>{
   const dot=e.target.closest('.page-dot');
   if(!dot)return;
   show(dot.dataset.page,true);
 });
 document.body.appendChild(controller);
}
function updatePageDots(id){
 document.querySelectorAll('.page-dot').forEach(dot=>{
   const active=dot.dataset.page===id;
   dot.classList.toggle('active',active);
   dot.setAttribute('aria-current',active?'page':'false');
 });
}
function restartAutoSwitch(){
 clearTimeout(autoTimer);
 autoTimer=null;
 const id=pages[current]?.id;
 if(document.hidden||!autoPageIds.includes(id))return;
 autoTimer=setTimeout(()=>{
   const index=autoPageIds.indexOf(pages[current]?.id);
   const nextId=autoPageIds[(index+1)%autoPageIds.length];
   show(nextId,true);
 },AUTO_SWITCH_MS);
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
const homePage=document.getElementById('home');
if(homePage)homePage.style.backgroundImage='url("assets/home-campus-new.jpg")';
applyCopyUpdates();
addMasterStudents();
addAlumniSection();
installViewportFit();
installPageDots();
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
document.addEventListener('visibilitychange',()=>{if(document.hidden){clearTimeout(autoTimer);autoTimer=null;}else{restartAutoSwitch();}});
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