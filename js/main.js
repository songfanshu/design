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
#team .roster-alumni{grid-column:1/-1}
#contact .contact-main .section-label{font-size:16px}
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
  const existing=new Set([...list.querySelectorAll('.roster-student > span:last-child')].map(el=>el.textContent.trim()));
  const avatar='<span class="roster-avatar" aria-hidden="true"><svg viewBox="0 0 80 80" fill="none"><circle cx="40" cy="28" r="13" fill="#c5ccca"/><path d="M15 71v-7a25 25 0 0 1 50 0v7" fill="#c5ccca"/></svg></span>';
  names.forEach(name=>{
    if(existing.has(name))return;
    list.insertAdjacentHTML('beforeend',`<li class="roster-student">${avatar}<span>${name}</span></li>`);
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
    const name=person.querySelector('span:last-child')?.textContent.trim();
    const file=portraits[name];
    const avatar=person.querySelector('.roster-avatar');
    if(!file||!avatar)return;
    avatar.innerHTML='';
    avatar.style.backgroundImage=`url("assets/people/students/${file}")`;
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
  const people=names.map(name=>`<li class="roster-student">${avatar}<span>${name}</span></li>`).join('');
  masters.insertAdjacentHTML('afterend',`<div class="roster-row roster-alumni"><div class="roster-label"><h3>毕业生</h3><span>ALUMNI</span></div><div class="roster-members"><ul class="roster-students">${people}</ul></div></div>`);
}

function buildTeamCulturePage(){
  const news=document.getElementById('news');
  if(!news)return;
  const navLink=nav?.querySelector('a[href="#news"]');
  if(navLink)navLink.textContent='团队建设';
  news.className='news section team-building-page';
  news.innerHTML=`
    <div class="team-build-shell">
      <div class="team-build-heading">
        <div>
          <div class="team-build-kicker">团队建设 <span>TEAM CULTURE</span></div>
          <h2>交流 · 协作 · 活力</h2>
        </div>
        <p>以学术交流凝聚共识，以跨方向协作推动创新，也在科研之外保持开放、积极、有温度的团队氛围。</p>
      </div>
      <div class="team-build-carousel" data-culture-carousel tabindex="0" aria-label="团队建设板块横向切换">
        <div class="team-build-track">
          <article class="team-build-slide is-active" style="--culture-image:url('assets/home-campus-clean.png')">
            <div class="team-build-slide-copy">
              <span class="team-build-number">01 / ACADEMIC</span>
              <h3>学术共进</h3>
              <p>通过组会研讨、文献分享与阶段汇报，建立高质量讨论机制，在持续交流中提升科研判断力与表达能力。</p>
              <a href="team-culture/academic.html">了解详情 <span aria-hidden="true">→</span></a>
            </div>
          </article>
          <article class="team-build-slide" style="--culture-image:url('assets/contact-neuromorphic-soft.webp')">
            <div class="team-build-slide-copy">
              <span class="team-build-number">02 / COLLABORATION</span>
              <h3>协同创新</h3>
              <p>鼓励材料、器件、电路与计算方向交叉协作，让不同研究背景围绕共同问题形成新的思路与解决方案。</p>
              <a href="team-culture/collaboration.html">了解详情 <span aria-hidden="true">→</span></a>
            </div>
          </article>
          <article class="team-build-slide" style="--culture-image:url('assets/home-campus-new.jpg')">
            <div class="team-build-slide-copy">
              <span class="team-build-number">03 / COMMUNITY</span>
              <h3>文体交流</h3>
              <p>以轻松而有凝聚力的团队活动连接科研之外的日常，在运动、交流与集体活动中建立默契与归属感。</p>
              <a href="team-culture/community.html">了解详情 <span aria-hidden="true">→</span></a>
            </div>
          </article>
        </div>
        <button class="team-build-arrow team-build-prev" type="button" aria-label="上一个团队建设板块">‹</button>
        <button class="team-build-arrow team-build-next" type="button" aria-label="下一个团队建设板块">›</button>
        <div class="team-build-tabs" role="tablist" aria-label="团队建设板块">
          <button class="is-active" type="button" role="tab" aria-selected="true" data-culture-slide="0">学术共进</button>
          <button type="button" role="tab" aria-selected="false" data-culture-slide="1">协同创新</button>
          <button type="button" role="tab" aria-selected="false" data-culture-slide="2">文体交流</button>
        </div>
      </div>
      <div class="team-build-footer"><span>AMBIC LABORATORY</span><span>SUN YAT-SEN UNIVERSITY</span></div>
    </div>`;

  let style=document.getElementById('team-building-styles');
  if(!style){style=document.createElement('style');style.id='team-building-styles';document.head.appendChild(style);}
  style.textContent=`
#news.team-building-page{position:relative;overflow-y:auto;background:linear-gradient(135deg,#f8fbf9 0%,#eef5f1 100%);padding:clamp(30px,4.6vh,50px) clamp(28px,5vw,78px) 34px;color:#17372d}
#news .team-build-shell{width:min(1380px,100%);margin:0 auto}
#news .team-build-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:42px;margin-bottom:22px}
#news .team-build-heading>div{min-width:0}
#news .team-build-kicker{display:flex;align-items:center;gap:12px;font-size:13px;font-weight:800;letter-spacing:.12em;color:#075b39}
#news .team-build-kicker:before{content:"";width:36px;height:2px;background:#075b39}
#news .team-build-kicker span{font-size:11px;font-weight:600;letter-spacing:.16em;color:#6d8177}
#news .team-build-heading h2{margin:10px 0 0;font-size:clamp(34px,3.6vw,54px);line-height:1.08;letter-spacing:-.035em;color:#17372d}
#news .team-build-heading>p{max-width:610px;margin:0 0 5px;font-size:15px;line-height:1.8;color:#5b6f66}
#news .team-build-carousel{position:relative;height:clamp(430px,62vh,650px);overflow:hidden;border-radius:28px;background:#18372e;box-shadow:0 24px 60px rgba(24,55,46,.16);outline:none}
#news .team-build-carousel:focus-visible{box-shadow:0 24px 60px rgba(24,55,46,.16),0 0 0 3px rgba(7,91,57,.28)}
#news .team-build-track{display:flex;width:100%;height:100%;transform:translate3d(0,0,0);transition:transform .58s cubic-bezier(.2,.75,.25,1);will-change:transform}
#news .team-build-slide{position:relative;flex:0 0 100%;height:100%;background-image:linear-gradient(90deg,rgba(8,31,24,.82) 0%,rgba(8,31,24,.58) 42%,rgba(8,31,24,.16) 72%,rgba(8,31,24,.08) 100%),var(--culture-image);background-size:cover;background-position:center;isolation:isolate}
#news .team-build-slide:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(4,18,14,.35),transparent 48%);z-index:-1}
#news .team-build-slide-copy{position:absolute;left:clamp(34px,5vw,72px);bottom:clamp(70px,10vh,118px);width:min(620px,66%);color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.18)}
#news .team-build-number{display:block;margin-bottom:14px;font-size:12px;font-weight:800;letter-spacing:.17em;color:rgba(255,255,255,.76)}
#news .team-build-slide h3{margin:0 0 15px;font-size:clamp(38px,4.4vw,68px);line-height:1.02;color:#fff;letter-spacing:-.04em}
#news .team-build-slide p{max-width:590px;margin:0 0 25px;font-size:clamp(15px,1.18vw,18px);line-height:1.8;color:rgba(255,255,255,.9);font-weight:500}
#news .team-build-slide a{display:inline-flex;align-items:center;gap:16px;padding:11px 20px;border:1px solid rgba(255,255,255,.5);border-radius:999px;background:rgba(255,255,255,.12);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:#fff;font-size:14px;font-weight:700;transition:background .22s ease,transform .22s ease}
#news .team-build-slide a:hover{background:rgba(255,255,255,.22);transform:translateX(3px)}
#news .team-build-arrow{position:absolute;top:50%;z-index:4;width:50px;height:50px;margin-top:-25px;border:1px solid rgba(255,255,255,.45);border-radius:50%;background:rgba(12,36,28,.28);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:#fff;font-size:36px;line-height:1;display:grid;place-items:center;cursor:pointer;transition:background .2s ease,transform .2s ease}
#news .team-build-arrow:hover{background:rgba(12,36,28,.48);transform:scale(1.04)}
#news .team-build-prev{left:20px}#news .team-build-next{right:20px}
#news .team-build-tabs{position:absolute;right:26px;bottom:24px;z-index:4;display:flex;gap:8px;padding:7px;border-radius:999px;background:rgba(8,27,21,.42);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
#news .team-build-tabs button{border:0;border-radius:999px;padding:9px 16px;background:transparent;color:rgba(255,255,255,.72);font:600 13px/1 Arial,"Microsoft YaHei",sans-serif;cursor:pointer;transition:background .2s ease,color .2s ease}
#news .team-build-tabs button.is-active{background:#fff;color:#17372d}
#news .team-build-footer{display:flex;align-items:center;justify-content:space-between;margin-top:16px;padding-top:12px;border-top:1px solid rgba(7,91,57,.13);font-size:10px;letter-spacing:.12em;color:#7b8f86}
@media(max-width:800px){#news.team-building-page{padding:26px 18px 32px}#news .team-build-heading{display:block;margin-bottom:16px}#news .team-build-heading>p{margin-top:10px;font-size:14px}#news .team-build-carousel{height:clamp(430px,64vh,580px);border-radius:20px}#news .team-build-slide{background-image:linear-gradient(0deg,rgba(7,29,22,.78) 0%,rgba(7,29,22,.44) 56%,rgba(7,29,22,.12) 100%),var(--culture-image);background-position:center}#news .team-build-slide-copy{left:24px;right:24px;bottom:92px;width:auto}#news .team-build-slide h3{font-size:42px}#news .team-build-slide p{font-size:15px;line-height:1.65}#news .team-build-arrow{width:42px;height:42px;margin-top:-21px;font-size:30px}#news .team-build-prev{left:10px}#news .team-build-next{right:10px}#news .team-build-tabs{left:50%;right:auto;bottom:18px;transform:translateX(-50%);width:max-content;max-width:calc(100% - 30px)}#news .team-build-tabs button{padding:8px 11px;font-size:12px}#news .team-build-footer span:last-child{display:none}}
@media(prefers-reduced-motion:reduce){#news .team-build-track,#news .team-build-slide a,#news .team-build-arrow{transition:none}}
`;

  const carousel=news.querySelector('[data-culture-carousel]');
  const track=carousel?.querySelector('.team-build-track');
  const slides=[...(carousel?.querySelectorAll('.team-build-slide')||[])];
  const tabs=[...(carousel?.querySelectorAll('[data-culture-slide]')||[])];
  if(!carousel||!track||!slides.length)return;
  let cultureIndex=0;
  const renderCulture=index=>{
    cultureIndex=(index+slides.length)%slides.length;
    track.style.transform=`translate3d(-${cultureIndex*100}%,0,0)`;
    slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===cultureIndex));
    tabs.forEach((tab,i)=>{const active=i===cultureIndex;tab.classList.toggle('is-active',active);tab.setAttribute('aria-selected',String(active));});
  };
  carousel.querySelector('.team-build-prev')?.addEventListener('click',event=>{event.stopPropagation();renderCulture(cultureIndex-1);});
  carousel.querySelector('.team-build-next')?.addEventListener('click',event=>{event.stopPropagation();renderCulture(cultureIndex+1);});
  tabs.forEach(tab=>tab.addEventListener('click',event=>{event.stopPropagation();renderCulture(Number(tab.dataset.cultureSlide));}));
  carousel.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
      event.preventDefault();event.stopPropagation();renderCulture(cultureIndex+(event.key==='ArrowRight'?1:-1));
    }
  });
  let cultureTouch=null;
  carousel.addEventListener('touchstart',event=>{if(event.touches.length===1)cultureTouch={x:event.touches[0].clientX,y:event.touches[0].clientY};},{passive:true});
  carousel.addEventListener('touchend',event=>{
    if(!cultureTouch)return;
    const dx=event.changedTouches[0].clientX-cultureTouch.x,dy=event.changedTouches[0].clientY-cultureTouch.y;
    cultureTouch=null;
    if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.35){event.stopPropagation();renderCulture(cultureIndex+(dx<0?1:-1));}
  },{passive:true});
  renderCulture(0);
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
applyStudentPortraits();
buildTeamCulturePage();
installViewportFit();
installPublicationsBackground();
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
    portraitPreview.alt=(avatar.closest('.roster-person')?.querySelector('.roster-person-name strong')?.textContent.trim()||avatar.closest('.roster-student')?.querySelector('span:last-child')?.textContent.trim()||'成员')+'老师原图';
    portraitLightbox.classList.add('is-open');
  });
});
portraitLightbox.addEventListener('click',event=>{if(event.target===portraitLightbox||event.target.closest('.portrait-lightbox-close'))closePortrait();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closePortrait();});

})();