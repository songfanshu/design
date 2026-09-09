(()=>{
  const header=document.getElementById('siteHeader');
  const nav=document.querySelector('.main-nav');
  const toggle=document.querySelector('.menu-toggle');
  const main=document.querySelector('main');
  const links=[...document.querySelectorAll('.main-nav a')];
  const sections=[...document.querySelectorAll('main > section')];
  let current=0;

  // 全站横向分页：每个 section 占一整屏，支持滚轮、键盘和触摸左右切换。
  const horizontalStyle=document.createElement('style');
  horizontalStyle.textContent=`
    html{scroll-behavior:auto;overflow:hidden}
    body{overflow:hidden}
    main{display:flex;flex-direction:row;width:100vw;min-width:100vw;height:100vh;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;scroll-behavior:smooth}
    main>section{flex:0 0 100vw;width:100vw;max-width:none;height:100vh;min-height:100vh;overflow-y:auto;overflow-x:hidden;scroll-snap-align:start;scroll-margin-top:0;padding-top:110px;padding-bottom:80px}
    main>.hero{padding-top:150px}
    main>.map-section{padding-bottom:100px}
    body.horizontal-ready footer{display:none}
    @media(max-width:800px){
      main>section{padding-left:24px;padding-right:24px}
      main>.hero{padding-top:125px}
      .section-head{align-items:flex-start;flex-direction:column;gap:18px}
      .research-grid,.people-grid{grid-template-columns:1fr}
      .visual-feature,.intro-layout,.team-lead{grid-template-columns:1fr}
      .metrics,.visual-strip{grid-template-columns:repeat(2,1fr)}
    }
    .student-roster{margin-top:55px;border-top:1px solid var(--line);padding-top:30px}
    .student-roster-head{display:flex;justify-content:space-between;align-items:baseline;gap:20px;margin-bottom:22px}
    .student-roster-title{font-size:20px;font-weight:500;margin:0}
    .student-roster-sub{font-size:9px;letter-spacing:.16em;color:var(--green)}
    .student-roster-group{margin-top:24px}
    .student-roster-label{display:block;font-size:9px;letter-spacing:.2em;color:var(--green);margin-bottom:12px}
    .student-roster-list{display:flex;flex-wrap:wrap;gap:9px}
    .student-roster-list span{padding:8px 13px;background:#f7f7f3;border:1px solid #deded9;font-size:11px;color:#444}
  `;
  document.head.appendChild(horizontalStyle);
  document.body.classList.add('horizontal-ready');

  // 将学生名单加入团队页面，避免覆盖现有教师信息。
  const team=document.getElementById('team');
  if(team && !team.querySelector('.student-roster')){
    const roster=document.createElement('div');
    roster.className='student-roster';
    roster.innerHTML=`
      <div class="student-roster-head">
        <h3 class="student-roster-title">博士生 / 硕士生</h3>
        <span class="student-roster-sub">GRADUATE STUDENTS</span>
      </div>
      <div class="student-roster-group">
        <span class="student-roster-label">博士</span>
        <div class="student-roster-list">
          <span>胡杰</span><span>徐烨松</span><span>张金秋</span><span>曾舫</span><span>康子和</span>
        </div>
      </div>
      <div class="student-roster-group">
        <span class="student-roster-label">硕士</span>
        <div class="student-roster-list">
          <span>焦培城</span><span>熊宇涛</span><span>于明珂</span><span>杨松松</span><span>何志豪</span><span>蒋茂才</span><span>严威</span><span>谭子康</span><span>赵梓妍</span>
        </div>
      </div>`;
    const grid=team.querySelector('.people-grid');
    if(grid) grid.insertAdjacentElement('afterend',roster);
    else team.appendChild(roster);
  }

  toggle?.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
  });

  const goTo=(index)=>{
    if(!sections.length)return;
    current=(index+sections.length)%sections.length;
    sections[current].scrollIntoView({behavior:'smooth',block:'nearest',inline:'start'});
  };

  links.forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded','false');
    const id=a.getAttribute('href')?.replace('#','');
    const target=sections.findIndex(s=>s.id===id);
    if(target>=0)goTo(target);
  }));

  document.addEventListener('keydown',(e)=>{
    if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
    if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();goTo(current+1)}
    if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();goTo(current-1)}
    if(e.key==='Home'){e.preventDefault();goTo(0)}
    if(e.key==='End'){e.preventDefault();goTo(sections.length-1)}
  });

  let startX=0,startY=0;
  document.addEventListener('touchstart',(e)=>{
    startX=e.changedTouches[0].screenX;
    startY=e.changedTouches[0].screenY;
  },{passive:true});

  document.addEventListener('touchend',(e)=>{
    const dx=e.changedTouches[0].screenX-startX;
    const dy=e.changedTouches[0].screenY-startY;
    if(Math.abs(dx)>60 && Math.abs(dx)>Math.abs(dy)*1.2)goTo(dx<0?current+1:current-1);
  },{passive:true});

  main?.addEventListener('scroll',()=>{
    const width=window.innerWidth||1;
    const next=Math.round(main.scrollLeft/width);
    if(next!==current && next>=0 && next<sections.length)current=next;
  },{passive:true});

  window.addEventListener('resize',()=>{
    if(sections[current])sections[current].scrollIntoView({behavior:'auto',block:'nearest',inline:'start'});
  });

  window.addEventListener('scroll',()=>{
    header?.classList.toggle('scrolled',scrollY>30);
  },{passive:true});

  const reveal=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting)e.target.classList.add('visible');
    });
  },{root:main,threshold:.12});

  document.querySelectorAll('.section,.research-card,.person,.publication,.news-grid article').forEach(el=>{
    el.classList.add('reveal');
    reveal.observe(el);
  });
})();