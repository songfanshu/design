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
  const requestedId=id;
  if(id==='research'||id==='home-research')id='home';
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
    if(a.hash==='#'+((requestedId==='research'||requestedId==='home-research')?'research':pages[index].id))a.setAttribute('aria-current','page');
    else a.removeAttribute('aria-current');
  });
  updatePageDots(pages[index].id);
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded','false');
  if(id==='contact'&&campusMap)setTimeout(()=>campusMap.resize(),80);
  if(push&&location.hash!=='#'+requestedId)history.pushState(null,'','#'+requestedId);
  if(requestedId==='research'||requestedId==='home-research')requestAnimationFrame(()=>{pages[index].scrollTop=document.getElementById('home-research')?.offsetTop||0;});
}

function installViewportFit(){}

function installPublicationsBackground(){
  let style=document.getElementById('publications-white-styles');
  if(!style){style=document.createElement('style');style.id='publications-white-styles';document.head.appendChild(style);}
  style.textContent=`
#publications{
  background-color:#f3f8f5;
  background-image:
    radial-gradient(circle at 88% 12%,rgba(44,139,108,.17),transparent 30%),
    radial-gradient(circle at 7% 84%,rgba(63,129,164,.13),transparent 31%),
    linear-gradient(135deg,#fcfefd 0%,#f4f9f6 52%,#edf6f3 100%);
  background-size:auto,auto,auto;
  background-attachment:local,local,local;
}
#publications .section-head h2{color:#173b30}
#publications .publication-list{
  background:rgba(255,255,255,.78);
  border:1px solid rgba(7,91,57,.12);
  border-radius:18px;
  padding:0 30px;
  box-shadow:0 22px 54px rgba(30,79,62,.08);
  backdrop-filter:blur(8px);
  -webkit-backdrop-filter:blur(8px);
}
#publications .publication{transition:none}
#publications .publication:hover,
#publications .publication:active,
#publications .publication:focus-within{background:transparent;transform:none}
#publications .publication a,
#publications .publication a:hover,
#publications .publication a:active,
#publications .publication a:focus{background:transparent;-webkit-tap-highlight-color:transparent}
@media(max-width:650px){
  #publications .publication-list{padding:0 16px;border-radius:12px}
}`;
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
  const contact=document.getElementById('contact');
  if(contact){
    const heading=contact.querySelector('.contact-main h2');
    if(heading)heading.innerHTML=heading.innerHTML.replaceAll('。','');
    const intro=contact.querySelector('.contact-main p');
    if(intro)intro.textContent=intro.textContent.replaceAll('。','');
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
  const existing=new Set([...list.querySelectorAll('.roster-student-name')].map(el=>el.textContent.trim()));
  const avatar='<span class="roster-avatar" aria-hidden="true"><svg viewBox="0 0 80 80" fill="none"><circle cx="40" cy="28" r="13" fill="#c5ccca"/><path d="M15 71v-7a25 25 0 0 1 50 0v7" fill="#c5ccca"/></svg></span>';
  names.forEach(name=>{
    if(existing.has(name))return;
    list.insertAdjacentHTML('beforeend',`<li class="roster-student">${avatar}<span class="roster-student-name">${name}</span></li>`);
  });
}



function addStudentProfileFields(){
  document.querySelectorAll('#team .roster-student').forEach(person=>{
    const name=person.querySelector('.roster-student-name');
    if(!name)return;
    const alumni=!!person.closest('.roster-alumni');
    let info=person.querySelector('.roster-student-info');
    if(!info){info=document.createElement('dl');info.className='roster-student-info';person.appendChild(info);}
    info.replaceChildren();
    const fields=alumni?[['毕业去向',person.dataset.destination]]:[['年级',person.dataset.enrollmentYear],['研究方向',person.dataset.researchDirection]];
    fields.forEach(([label,value])=>{
      const row=document.createElement('div'),term=document.createElement('dt'),description=document.createElement('dd');
      term.textContent=label;
      description.textContent=value?.trim()||'待补充';
      row.append(term,description);info.appendChild(row);
    });
  });
}

function applyStudentPortraits(){
  const portraits={
    '胡杰':'hu-jie.jpg','徐烨松':'xu-yesong.jpg','张金秋':'zhang-jinqiu.jpg','曾舫':'zeng-fang.jpg','康子和':'kang-zihe.jpg',
    '焦培城':'jiao-peicheng.jpg','熊宇涛':'xiong-yutao.jpg','于明珂':'yu-mingke.jpg','杨松松':'yang-songsong.jpg','何志豪':'he-zhihao.jpg',
    '蒋茂才':'jiang-maocai.jpg','严威':'yan-wei.jpg','谭子康':'tan-zikang.jpg','赵梓妍':'zhao-ziyan.jpg',
    '朱丹':'zhu-dan.jpg','孙艳姿':'sun-yanzi.jpg','尹越檐':'yin-yueyan.jpg','胡松':'hu-song.jpg','张宇迪':'zhang-yudi.jpg',
    '赵安欣':'zhao-anxin.jpg','程现':'cheng-xian.jpg','江政东':'jiang-zhengd.jpg'
  };
  document.querySelectorAll('#team .roster-student').forEach(person=>{
    const name=person.querySelector('.roster-student-name')?.textContent.trim();
    const file=portraits[name];
    const avatar=person.querySelector('.roster-avatar');
    if(!file||!avatar)return;
    avatar.innerHTML='';
    const portraitRevision=(name==='徐烨松'||name==='焦培城')?'?v=20260914-new-portraits':'';
    avatar.style.backgroundImage=`url("assets/people/students/${file}${portraitRevision}")`;
    avatar.style.backgroundSize='cover';
    avatar.style.backgroundPosition='center';
    avatar.style.backgroundRepeat='no-repeat';
    avatar.setAttribute('aria-label',name+'头像');
    avatar.removeAttribute('aria-hidden');
  });
}

function addAlumniSection(){
  const team=document.getElementById('team');
  if(!team||team.querySelector('.roster-alumni'))return;
  const masters=team.querySelector('.roster-masters');
  if(!masters)return;
  const names=['郭建苗','刘可康','罗致远','江政东'];
  const avatar='<span class="roster-avatar" aria-hidden="true"><svg viewBox="0 0 80 80" fill="none"><circle cx="40" cy="28" r="13" fill="#c5ccca"/><path d="M15 71v-7a25 25 0 0 1 50 0v7" fill="#c5ccca"/></svg></span>';
  const people=names.map(name=>`<li class="roster-student">${avatar}<span class="roster-student-name">${name}</span></li>`).join('');
  masters.insertAdjacentHTML('afterend',`<div class="roster-row roster-alumni"><div class="roster-label"><h3>毕业生</h3><span>ALUMNI</span></div><div class="roster-members"><ul class="roster-students">${people}</ul></div></div>`);
}

function buildTeamCulturePage(){
const news=document.getElementById('news');
if(!news)return;
const navLink=nav?.querySelector('a[href="#news"]');
if(navLink)navLink.textContent='团队建设';
news.className='news section team-building-page';
news.innerHTML="<div class=\"team-build-shell\"><header class=\"team-culture-heading\"><div class=\"team-culture-kicker\">团队建设 <span>TEAM CULTURE</span></div><h2>在共同成长中建立有温度的科研团队</h2></header><div class=\"team-culture-pages\"><article class=\"team-culture-panel\" aria-labelledby=\"culture-title-0\"><figure class=\"team-culture-image\"><img src=\"assets/team-academic-photo.jpg\" alt=\"学术共进\" loading=\"lazy\" decoding=\"async\"></figure><div class=\"team-culture-copy\">\n              <h3 id=\"culture-title-0\">学术共进</h3>\n              <p>通过组会研讨、文献分享与阶段汇报，建立高质量讨论机制，在持续交流中提升科研判断力与表达能力。</p>\n              <a href=\"team-culture/academic.html\">了解详情 <span aria-hidden=\"true\">→</span></a>\n            </div></article>\n<article class=\"team-culture-panel\" aria-labelledby=\"culture-title-1\"><figure class=\"team-culture-image\"><img src=\"assets/contact-neuromorphic-soft.webp\" alt=\"协同创新\" loading=\"lazy\" decoding=\"async\"></figure><div class=\"team-culture-copy\">\n              <h3 id=\"culture-title-1\">协同创新</h3>\n              <p>鼓励材料、器件、电路与计算方向交叉协作，让不同研究背景围绕共同问题形成新的思路与解决方案。</p>\n              <a href=\"team-culture/collaboration.html\">了解详情 <span aria-hidden=\"true\">→</span></a>\n            </div></article>\n<article class=\"team-culture-panel\" aria-labelledby=\"culture-title-2\"><figure class=\"team-culture-image\"><img src=\"assets/team-community-photo.png\" alt=\"文体交流\" loading=\"lazy\" decoding=\"async\"></figure><div class=\"team-culture-copy\">\n              <h3 id=\"culture-title-2\">文体交流</h3>\n              <p>以轻松而有凝聚力的团队活动连接科研之外的日常，在运动、交流与集体活动中建立默契与归属感。</p>\n              <a href=\"team-culture/community.html\">了解详情 <span aria-hidden=\"true\">→</span></a>\n            </div></article></div><div class=\"team-culture-footer\"><span>AMBIC LABORATORY</span><span>SUN YAT-SEN UNIVERSITY</span></div></div>";
let style=document.getElementById('team-building-styles');
if(!style){style=document.createElement('style');style.id='team-building-styles';document.head.appendChild(style);}
style.textContent="\nbody.paged main>#news.team-building-page{position:absolute!important;inset:0!important;padding:0!important;overflow-y:auto!important;overflow-x:hidden;background:#fff;color:#17372d;scroll-snap-type:none!important}\n#news .team-build-shell{width:100%;max-width:none;margin:0}\n#news .team-culture-heading{display:flex;justify-content:space-between;align-items:center;gap:28px;padding:28px clamp(22px,5vw,80px);border-bottom:1px solid #dce5df}\n#news .team-culture-kicker{color:#075b39;font-size:28px;line-height:1.3;font-weight:800}\n#news .team-culture-kicker span{display:block;margin-top:7px;color:#70857b;font-size:11px;letter-spacing:.16em}\n#news .team-culture-heading h2{font-size:clamp(19px,2.2vw,32px);line-height:1.5;margin:0;text-align:right;color:#264e3c}\n#news .team-culture-pages{display:block}\n#news .team-culture-panel{min-height:calc(100dvh - var(--header));display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:clamp(32px,6vw,96px);align-items:center;padding:clamp(36px,6vh,72px) clamp(22px,5vw,80px);border-bottom:1px solid #dce5df;background:#f5f9f6}\n#news .team-culture-panel:nth-child(2){background:#f8f8f4}\n#news .team-culture-panel:nth-child(3){background:#f2f7fa}\n#news .team-culture-image{margin:0;min-width:0}\n#news .team-culture-image img{width:100%;height:min(65vh,660px);object-fit:cover;object-position:center;border-radius:4px}\n#news .team-culture-panel:nth-child(2) .team-culture-image{grid-column:2;grid-row:1}\n#news .team-culture-panel:nth-child(2) .team-culture-copy{grid-column:1;grid-row:1}\n#news .team-culture-panel:nth-child(2) img{object-fit:contain;background:#fff}\n#news .team-culture-copy h3{margin:0 0 26px;font-size:clamp(34px,4vw,60px);line-height:1.2;letter-spacing:-.03em;color:#17372d}\n#news .team-culture-copy p{font-size:clamp(16px,1.3vw,20px);line-height:1.95;color:#566d60;margin:0 0 30px}\n#news .team-culture-copy a{display:inline-flex;align-items:center;gap:24px;padding:12px 0;border-bottom:1px solid #8aa797;color:#075b39;font-size:14px;font-weight:700;transition:transform .2s}\n#news .team-culture-copy a:hover{transform:translateX(5px)}\n#news .team-culture-footer{display:flex;justify-content:space-between;gap:16px;padding:24px clamp(22px,5vw,80px);color:#70857b;font-size:10px;letter-spacing:.12em}\n@media(max-width:760px){\n#news .team-culture-heading{display:block;padding-top:24px;padding-bottom:24px}\n#news .team-culture-heading h2{text-align:left;margin-top:18px;font-size:22px}\n#news .team-culture-panel{display:flex;flex-direction:column;justify-content:center;gap:28px;padding:32px 22px}\n#news .team-culture-image{width:100%}\n#news .team-culture-image img{height:40vh;min-height:240px}\n#news .team-culture-copy h3{font-size:36px;margin-bottom:18px}\n#news .team-culture-copy p{font-size:16px;margin-bottom:20px}\n}\n@media(prefers-reduced-motion:reduce){#news .team-culture-copy a{transition:none}}\n";
}

function updatePageDots(){}

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
// Homepage background is defined in CSS for the first render.
applyCopyUpdates();
refineResearchSection();
addMasterStudents();
addAlumniSection();
addStudentProfileFields();
applyStudentPortraits();
buildTeamCulturePage();
installViewportFit();
installPublicationsBackground();
initSharpCampusMap();
show(location.hash.slice(1));
requestAnimationFrame(()=>requestAnimationFrame(()=>document.body.classList.remove('page-initializing')));

document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="#"]');if(!a)return;
  const id=a.hash.slice(1);if(id!=='research'&&id!=='home-research'&&!pages.some(p=>p.id===id))return;
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
const portraitLightbox=document.createElement('div');
portraitLightbox.className='portrait-lightbox';
portraitLightbox.innerHTML='<button class="portrait-lightbox-close" type="button" aria-label="关闭原图预览">×</button><img alt="教师原图预览">';
document.body.appendChild(portraitLightbox);
const portraitPreview=portraitLightbox.querySelector('img');
const closePortrait=()=>portraitLightbox.classList.remove('is-open');
document.querySelectorAll('#team .roster-pi .roster-avatar,#team .roster-faculty .roster-person .roster-avatar,#team .roster-student .roster-avatar').forEach(avatar=>{
  avatar.addEventListener('dblclick',event=>{
    const image=(getComputedStyle(avatar).backgroundImage.match(/url\(["']?(.*?)["']?\)/)||[])[1];
    if(!image)return;
    event.preventDefault();
    event.stopPropagation();
    portraitPreview.src=image;
    portraitPreview.alt=(avatar.closest('.roster-person')?.querySelector('.roster-person-name strong')?.textContent.trim()||avatar.closest('.roster-student')?.querySelector('.roster-student-name')?.textContent.trim()||'成员')+'老师原图';
    portraitLightbox.classList.add('is-open');
  });
});
portraitLightbox.addEventListener('click',event=>{if(event.target===portraitLightbox||event.target.closest('.portrait-lightbox-close'))closePortrait();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closePortrait();});

})();