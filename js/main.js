(()=>{
'use strict';
const main=document.getElementById('pages');
const visualPage=document.getElementById('visual');
if(visualPage)visualPage.remove();
const pages=[...main.querySelectorAll(':scope > section')];
const nav=document.getElementById('mainNav');
const visualNav=nav?.querySelector('a[href="#visual"]');
if(visualNav)visualNav.remove();
const toggle=document.querySelector('.menu-toggle');
const pageIds=['home','research','publications','team','laboratory','news','contact'];
let current=0;
let campusMap=null;
if('scrollRestoration' in history)history.scrollRestoration='manual';

function show(id,push=false){
  let index=pages.findIndex(p=>p.id===id);if(index<0)index=0;
  const previous=pages[current];
  const moveFocus=push&&previous?.contains(document.activeElement);
  current=index;
  if(push)pages[index].scrollTop=0;
  pages.forEach((p,i)=>{
    const active=i===index;
    p.classList.toggle('active',active);
    p.classList.toggle('before',i<index);
    p.inert=!active;
    p.setAttribute('aria-hidden',String(!active));
  });
  if(moveFocus){pages[index].setAttribute('tabindex','-1');pages[index].focus({preventScroll:true});}
  nav.querySelectorAll('a').forEach(a=>{
    if(a.hash==='#'+pages[index].id)a.setAttribute('aria-current','page');
    else a.removeAttribute('aria-current');
  });
  updatePageDots(pages[index].id);
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded','false');
  if(id==='contact'&&campusMap)setTimeout(()=>campusMap.resize(),80);
  if(push&&location.hash!=='#'+pages[index].id)history.pushState(null,'','#'+pages[index].id);
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
#research .section-head .section-label,#publications .section-head .section-label,#laboratory .section-head .section-label,#news .section-head .section-label{display:none}
.page-dots-controller{position:fixed;right:22px;top:50%;transform:translateY(-50%);z-index:80;display:flex;flex-direction:column;align-items:center;gap:10px;padding:0;border:0;background:transparent;box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none}
.page-dot{appearance:none;-webkit-appearance:none;width:9px;height:9px;padding:0;border:0;border-radius:50%;background:rgba(24,55,46,.34);cursor:pointer;transition:transform .22s ease,background .22s ease}
.page-dot:hover{transform:scale(1.16);background:rgba(24,55,46,.58)}
.page-dot.active{background:#18372e;transform:scale(1.25)}
.page-dot:focus-visible{outline:2px solid #18372e;outline-offset:3px}
@media(max-width:650px){.page-dots-controller{right:10px;top:50%;gap:8px;padding:0}.page-dot{width:8px;height:8px}}
@media(min-width:651px){
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
body.paged #research .research-card h3{font-size:clamp(17px,min(1.35vw,2.6vh),21px);line-height:1.35;margin:6px 0;text-align:center}
body.paged #research .research-card p{font-size:clamp(13px,min(.95vw,1.85vh),15px);line-height:1.55;margin:5px 0}
body.paged #research .research-card a{font-size:14px;padding-top:8px;margin-top:auto}
}
@media(min-width:651px) and (max-height:700px){
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
}`;
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

function refineResearchSection(){
  const research=document.getElementById('research');
  if(!research)return;
  research.querySelectorAll('.paper-source').forEach(link=>{
    link.textContent=link.textContent.replace(/\s*·\s*20\d{2}(?=\s*↗)/g,'');
  });
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

function buildTeamCulturePage(){
  const news=document.getElementById('news');
  if(!news)return;
  const navLink=nav?.querySelector('a[href="#news"]');
  if(navLink)navLink.textContent='团队建设';
  news.className='news section team-building-page';
  news.innerHTML=`
    <div class="team-build-watermark" aria-hidden="true">AMBIC</div>
    <div class="team-build-orbit orbit-a" aria-hidden="true"></div>
    <div class="team-build-orbit orbit-b" aria-hidden="true"></div>
    <div class="team-build-wrap">
      <div class="team-build-intro">
        <div class="team-build-kicker">团队建设 <span>TEAM CULTURE</span></div>
        <h2>在共同成长中，<br><em>建立有温度的科研团队。</em></h2>
        <p>我们希望课题组不仅是开展科研工作的地方，也是一支彼此支持、开放交流、长期共同成长的团队。严谨做研究，真诚做伙伴。</p>
        <div class="team-build-values" aria-label="团队价值观">
          <span>严谨</span><span>开放</span><span>协作</span><span>成长</span>
        </div>
      </div>
      <div class="team-build-grid">
        <article class="team-build-card"><span class="team-build-index">01</span><div class="team-build-icon" aria-hidden="true">◎</div><h3>学术共进</h3><p>通过组会研讨、文献分享与阶段汇报，建立高质量讨论机制，在持续交流中提升科研判断力与表达能力。</p><small>GROUP MEETING · DISCUSSION</small></article>
        <article class="team-build-card"><span class="team-build-index">02</span><div class="team-build-icon" aria-hidden="true">↗</div><h3>协同创新</h3><p>鼓励材料、器件、电路与计算方向交叉协作，让不同研究背景在共同问题中形成新的思路与解决方案。</p><small>COLLABORATION · INNOVATION</small></article>
        <article class="team-build-card"><span class="team-build-index">03</span><div class="team-build-icon" aria-hidden="true">◇</div><h3>文体交流</h3><p>以轻松而有凝聚力的团队活动连接科研之外的日常，让成员在运动、交流与集体活动中建立更好的默契。</p><small>SPORTS · COMMUNITY</small></article>
        <article class="team-build-card"><span class="team-build-index">04</span><div class="team-build-icon" aria-hidden="true">＋</div><h3>共同成长</h3><p>尊重每位成员的研究节奏与发展目标，通过经验传承、互助支持和阶段复盘，让个人成长与团队进步彼此促进。</p><small>MENTORSHIP · GROWTH</small></article>
      </div>
    </div>
    <div class="team-build-footer"><span>AMBIC LABORATORY</span><strong>聚是一团火 · 散是满天星</strong><span>SUN YAT-SEN UNIVERSITY</span></div>`;

  if(document.getElementById('team-building-styles'))return;
  const style=document.createElement('style');
  style.id='team-building-styles';
  style.textContent=`
#news.team-building-page{position:relative;isolation:isolate;overflow:hidden;background:
linear-gradient(rgba(14,91,64,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(14,91,64,.035) 1px,transparent 1px),
radial-gradient(circle at 82% 16%,rgba(64,153,139,.22),transparent 29%),radial-gradient(circle at 6% 88%,rgba(77,134,170,.16),transparent 33%),
linear-gradient(135deg,#fbfdfc 0%,#f2f8f5 54%,#edf5f3 100%);background-size:46px 46px,46px 46px,auto,auto,auto;color:#17372d;padding:clamp(38px,6vh,72px) clamp(52px,7vw,108px) clamp(34px,5vh,58px)}
#news.team-building-page:before{content:"";position:absolute;inset:0;z-index:-2;background:linear-gradient(110deg,rgba(255,255,255,.94) 0%,rgba(255,255,255,.82) 42%,rgba(255,255,255,.2) 72%,transparent 100%)}
#news.team-building-page:after{content:"";position:absolute;width:520px;height:520px;border-radius:50%;right:-220px;top:-210px;border:1px solid rgba(7,91,57,.13);box-shadow:0 0 0 54px rgba(7,91,57,.028),0 0 0 108px rgba(42,125,104,.018);z-index:-1}
.team-build-watermark{position:absolute;right:4vw;bottom:-2.2vw;font-size:clamp(110px,17vw,270px);font-weight:900;letter-spacing:-.075em;color:rgba(7,91,57,.035);line-height:.8;user-select:none;z-index:-1}
.team-build-orbit{position:absolute;border:1px solid rgba(7,91,57,.13);border-radius:50%;z-index:-1}.orbit-a{width:190px;height:190px;right:19%;top:9%}.orbit-b{width:96px;height:96px;right:12%;top:32%;border-color:rgba(55,122,157,.18)}
.team-build-wrap{width:min(1380px,100%);margin:auto;display:grid;grid-template-columns:minmax(310px,.82fr) minmax(620px,1.5fr);gap:clamp(46px,6vw,100px);align-items:center;min-height:calc(100% - 38px)}
.team-build-intro{max-width:510px;position:relative;z-index:2}.team-build-kicker{display:flex;align-items:center;gap:13px;color:#075b39;font-size:13px;font-weight:800;letter-spacing:.12em}.team-build-kicker:before{content:"";width:36px;height:2px;background:#075b39}.team-build-kicker span{font-size:11px;font-weight:600;color:#6b7d75;letter-spacing:.16em}
.team-build-intro h2{font-size:clamp(38px,4.2vw,66px);line-height:1.12;letter-spacing:-.045em;margin:24px 0 22px;color:#18382e}.team-build-intro h2 em{font-style:normal;color:#075b39}.team-build-intro>p{max-width:470px;font-size:16px;line-height:1.9;color:#52675e;margin:0}
.team-build-values{display:flex;flex-wrap:wrap;gap:10px;margin-top:30px}.team-build-values span{display:inline-flex;align-items:center;justify-content:center;min-width:66px;height:34px;padding:0 16px;border:1px solid rgba(7,91,57,.2);border-radius:999px;background:rgba(255,255,255,.72);color:#285744;font-size:13px;font-weight:700;box-shadow:0 8px 22px rgba(24,55,46,.035)}
.team-build-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;position:relative;z-index:2}.team-build-card{position:relative;min-height:224px;padding:27px 26px 23px;background:rgba(255,255,255,.78);border:1px solid rgba(7,91,57,.13);border-radius:18px;box-shadow:0 18px 45px rgba(30,79,62,.07);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease}.team-build-card:hover{transform:translateY(-5px);border-color:rgba(7,91,57,.3);box-shadow:0 22px 50px rgba(30,79,62,.11)}
.team-build-index{position:absolute;top:20px;right:22px;font-size:12px;font-weight:800;letter-spacing:.12em;color:#789187}.team-build-icon{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#0b6946,#2c8d72);color:#fff;font-size:20px;box-shadow:0 10px 24px rgba(7,91,57,.18)}.team-build-card h3{font-size:22px;line-height:1.3;margin:18px 0 10px;color:#18372e}.team-build-card p{font-size:14px;line-height:1.72;color:#5b6f66;margin:0 0 16px}.team-build-card small{font-size:10px;font-weight:800;letter-spacing:.12em;color:#779087}
.team-build-footer{position:absolute;left:clamp(52px,7vw,108px);right:clamp(52px,7vw,108px);bottom:20px;display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid rgba(7,91,57,.13);font-size:10px;letter-spacing:.12em;color:#7b8f86}.team-build-footer strong{font-size:13px;letter-spacing:.08em;color:#315d4b;font-weight:700}
@media(max-width:1050px){#news.team-building-page{overflow-y:auto;padding:34px 38px 74px}.team-build-wrap{grid-template-columns:1fr;gap:30px;align-items:start}.team-build-intro{max-width:760px}.team-build-intro h2{font-size:clamp(38px,7vw,58px)}.team-build-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.team-build-footer{left:38px;right:38px}.team-build-card{min-height:0}}
@media(max-width:650px){#news.team-building-page{padding:30px 26px 92px}.team-build-intro h2{font-size:36px;margin-top:18px}.team-build-intro>p{font-size:15px;line-height:1.75}.team-build-grid{grid-template-columns:1fr}.team-build-card{padding:22px}.team-build-footer{left:26px;right:26px;display:block}.team-build-footer span{display:none}.team-build-footer strong{font-size:12px}.team-build-watermark{font-size:110px;right:-8px;bottom:16px}}
@media(min-width:1051px) and (max-height:760px){#news.team-building-page{padding-top:28px;padding-bottom:46px}.team-build-wrap{gap:52px}.team-build-intro h2{font-size:46px;margin:16px 0 14px}.team-build-intro>p{font-size:14px;line-height:1.65}.team-build-values{margin-top:18px}.team-build-card{min-height:190px;padding:20px 22px}.team-build-card h3{font-size:19px;margin:12px 0 7px}.team-build-card p{font-size:13px;line-height:1.55;margin-bottom:10px}.team-build-icon{width:36px;height:36px}.team-build-footer{bottom:12px}}
`;
  document.head.appendChild(style);
}

function installPageDots(){
  const ids=pageIds.filter(id=>pages.some(p=>p.id===id));
  if(!ids.length||document.querySelector('.page-dots-controller'))return;
  const labels={home:'首页',research:'研究方向',publications:'科研成果',team:'团队成员',laboratory:'实验室',news:'团队建设',contact:'联系我们'};
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
    campusMap=new maplibregl.Map({container:'campusVectorMap',style:'https://tiles.openfreemap.org/styles/liberty',center:[113.953099,22.800721],zoom:15.2,maxZoom:19,attributionControl:false});
    campusMap.addControl(new maplibregl.AttributionControl({compact:true}),'bottom-right');
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
refineResearchSection();
addMasterStudents();
addAlumniSection();
buildTeamCulturePage();
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
document.addEventListener('keydown',e=>{
  if(e.target.closest('input,textarea,select,[contenteditable="true"]'))return;
  if(e.key==='Escape'){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
  if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
    e.preventDefault();
    const next=Math.max(0,Math.min(pages.length-1,current+(e.key==='ArrowRight'?1:-1)));
    show(pages[next].id,true);
  }
});
let touch=null;
main.addEventListener('touchstart',e=>{if(e.touches.length!==1){touch=null;return;}touch={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
main.addEventListener('touchcancel',()=>{touch=null;},{passive:true});
main.addEventListener('touchend',e=>{
  if(!touch)return;
  const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;
  touch=null;
  if(Math.abs(dx)>80&&Math.abs(dx)>Math.abs(dy)*1.8){
    const next=Math.max(0,Math.min(pages.length-1,current+(dx<0?1:-1)));
    show(pages[next].id,true);
  }
},{passive:true});
})();