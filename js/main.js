(()=>{
  const header=document.getElementById('siteHeader');
  const nav=document.querySelector('.main-nav');
  const toggle=document.querySelector('.menu-toggle');
  const main=document.querySelector('main');
  const links=[...document.querySelectorAll('.main-nav a')];
  const sections=[...document.querySelectorAll('main > section')];
  let current=0;
  if('scrollRestoration' in history) history.scrollRestoration='manual';

  // 首页左上角：使用用户提供的 AMBIC 实验室 Logo，并放在 AMBIC 字样旁边。
  const logoImg=document.querySelector('.brand-logo');
  const logoWrap=document.querySelector('.brand-logo-wrap');
  const brandText=document.querySelector('.brand-text');
  if(logoImg){
    logoImg.src='data:image/webp;base64,UklGRkIPAABXRUJQVlA4IDYPAAAwPACdASqAAG0APl0kj0UjoiGZKgd8OAXEtgBg5QytLzS/X+blaP8R+O+KuqjypOcv+n+n37K/OH/Yfq17wP0p7BP6zdNTzCfs/+4Huyel//EeoB/Q/931rXoF+W/7M39s/4vpG5pd/ZO03+7/k36B/ivz/9//LjlR9M/7f0J/jP2n/K/2L9yvXP/SeEfqq9Qj8f/ln+L/Mb+0cQOAD8r/qX+38Eb/I9EfEA/l39g/63lVeD7QA/O//a9mH+q/a70E/nn+Z/+H+j+Ar+ff2f/o9kZyp73YYCXDmMAHUoOyqO8SztfEqjcOy1UuyLTeLVce+Y+9aqi9dG7c7UYhnc3rcv0KsUDQ72nW8B6fFxau+SnQjG1G9NDqIPKHVlfLDtwmK2u4Q6sFsTPEqZJbhIzQ9RFhOwWDUk9E/ud5yF5ReQm0tTg8pi1C48KSVdCO8qVmvGKkVSK8/RW0tn1phDI/w6A30KKpQ4TiakAADtI2nZV2Pk3aOC5aoR5+AH2sP1D8/XanaXNnhQ/9T2r3IMhJK4b2i5uXCj8QaeSX/hJkoA8wPu7puf/PF/vPAmmQHNlwCF2nBJUsoOWsnSoPpN3LDNj5ByS0gf9TQT71kc3D6g7ATeT0NCLq9Ble/B79kipkBK8R7ad8S1BgAP7+tCAhhY6F6wK+6UaQUPSE7KoM7DBCike1vqMs9FMjKmn2654wfB7GRp8UCaGvMfxclg9avRn2Dk7ncjK3di5+tGvU95/fS+jADLR842ZZJpzWS+3HMubZm8yek4/BU/mJoean5l7KU94YsUzFJj5Rb4G3PX8ZuSWyK2D93IAiC5D5CPzzyMMw3ys2eWk9SJ+6LrQVtMEE3LjELSoDxP2v4S2440b2W+GJVZheo4Td2yzgA8ohpxlnBQf14XzVNOo1ZONiYC7ST5VZRWxukqKbWA/Z6bq/OOZnOZfGXOa15fgbVB5Bfb4uj4dFCpOXKJ9J173LmR1n/0IA0ujhQOzpHkQi5m7rOc9uj8b4KXAyLAcczPaVODg3LbMjcWPzKsC4U9mBSvTxl18dwjOIuh/hnzeOb3P1oGaHLcDGJZzE7GRB+Kt9yiOmLbXKRmYv24P6vr2KPQGpdtjOdyoiGQfmgKz43IoTjbWLMhnxHrXvXlJNFj6AAqponj+vhJP6WX/Vm7E/OWoW7sWSF0gZYcNj80OH2fnRD6JtpGLDTkB8kkwa5LmZ3ElOdM+KH/mf0Hk9xNy4o34KNKNiRIgOCRNdtpPe/V6guJlrAns7RzL4NcJtM0YM3lp8LpE68qRkjCA98xqZARQLmr2ge3lbvhm6ep7sD7OwpIo/JhjAEGYVYXmGX3BgoaDmev2SsslNdlE1TlqJibb8RYJVLNOdhUPz/oe0adggxHJeuQgSo83UKH1cowVuq+13SRxnyMz51OT+LtazUcjC4Iz6XD6capBehTyb6bQlG8Sxe9q5TnYf1ELos2JQGnGmkN9gkcQ4epXHfKvzLmJLNgScOgfDfB104ZbKgsqLpzt3MPcAPSklR2gZm4ZBvH62YBvNuHQ1hCJUbU4PYAnsyCBswI1NOp1/hyw/hnsyxCirOxGTPJwVmF1BK16++yKuWOgdcsOMhHRCVUg+Db+JfYjWQpHjPFeidooD6ocpGBneY7saSQKYxDGDjsik0pEdlXhDpqwhUYZ7FfV+K0P6+JHCxOd8QniefPOnz6KGM29vAsZ4YOL771sOkG8ROoLwMY6DFZ8654e33dx6pUDfMN8zR2JhyRZVAlSV6UJuz7tta/7YggQpiwN59AVnIFltQvclQgs2/qWuzZ9EEs8zKUpYtn3w+qh6diO1e/cCAobrly8VQLw8z+bzkirPx8365FuA4qzdF3J44OeM8VdeAxnAKBzsfZnqW+85xLbhKJcy1N+qE4s21udu/I9z7yfGw1T6iQStUkn5C7iP1U2GLV+F9g1LzN69Sc+eNrofzuhuWewsvrhAvlFNALiHQZpZSZuyx0BHzOEzLFL3rNCkNwWMomIDiW3OqqW/g+IBy+04R3YEHVt7JOhP6jsdfxmvBUC4qr9jhmrO3DbCPBlfTeZtkYOpWDJ6Vq3jfxYV0ErTw29WzmCZdzKUVSYtWy5tWhPGq279l7qYy87GOMcb64XveLdZcubDP6Ahu4A8TRuSIlfLLrSGsDWRX5Wtse50dut6sMijgZUPb87eQuR4E3e3xQghrCqUquuOoce8x9PvYOyfmb3HIs7lvcjlAWJ5qaTo8oSFyOtHgvksWmnynampcd7lVBkODZzYNXmyuxdGXIKJ2a7LyFjub+Rp4/jlc9fdKDXCfOvRBEWPDQcK8Kjn6wBL/ZOmSwpZpdQRb0t4+4guA4DTmhN71IV6jBq67BzwytU6nJuJj3iuq5eoif3fF5LbdZFcSEV+dJrj8CKaMA+OpEaMA8qm+3eb13kkl+ip3T3mRY2NE3XEYvT5UYatMBPQmiYhsMorireu1gC1lwemHelgIrcn9hTt7yvxstrWtXac1VBdakRRfMVruQ1TxSNZROLGgY/nZy9BR9aN6TTpoYtHUT3mIfXamfRpuatytIWEUSECJg6UgADk2Shdef6MXwsyzsL3RmEwDJG6ZH6j/RZPboMyk/P3lgfGrksBOUHerxfwqZAfMUJir4VFrcq3mBzyKcsWpM0/FKywQoR/Q5kRTSd+TSa5lCNkUt5jrvFwuCXOYO1Q5d333/B9S4tIUwxZBPP2/AsL1IRj5MhJg6i0AfelM/UNpB2IgKGIg/SLUwkIlzkvrdpHfZQi2rqiV/IVDqHfg+63gGDt/UTMB3jKS/uXR7QAPpJNz0J+Oqb1EaPoMRHRfP5Ew8Y6Eo0z11Bn9Ehr/IIjtmU0OUsGmB+nxMHJdkv4FhvSmxCNTllSO5mXNk/+FoOoFYEkS9QG95zaZTXaMN6oWIHuBGpfLDwJZpmeIBftgxt0Yg9L7axMz6v+uJKNkUHvWooWZfs0W2v5K+ptn/TBN8pm5JmrbvT274Y1R4cFAopXxGEbp8686JEnW/N2eVkO/61vuhpnuPnBnQxT1FnO+mcHc05PjZ9EVDsxkVhjF8CtKxI9nSFPkiBTKSduX9/Ioz6FwF4hTTIm+s37lpo5fiE9RyLLXjgQf6NVc+F6wS6eEw+HPp1mPlx116qmojewZi6Y4b9rnN3+S45xGHdldSsKeBNIrUc64VFrAz6iEAN3PRihsKHHYhYspHB+cWaE197UlzNnw7weTJ8sBQAdU0nN8/AES39Nzl/8ehHij/ylRW1Y+3qI6tFW58l0p8lQaQgpboG0GyOYXUw+MC4HHH/tU5bT9xeoied0fV3IZEi0GLau1Zz/9D9/gVRB7m58+SyzrVx2AtNKgS5eqkOAjrjuPDj4m/kPmaBNcgpsZSPvZYXm3Lk4Bj/XrwRBkotyLk0c1tDzYf2bYiZTEzXA7KcCpSK3w1j8ZX+ntzze7FW1hTiWfLkzz8Ad/jV1n7T+8vLmT55QRsRoUaUQvyQo5xwd59AAo0Au+lMR9Xv7ppixwtA76DxnEf9olMYcfzSw//8cNy44ej+ZP9cdMvG1G9Bv8CZV8Q8e7V3C+56uC+r4kSjRCFAucRT4m8S1P1EFMSpyXpcv9YM3Vns/YKZ5mgmnVk+P4U4GBYihVP7hUHcJhx3K/XhWBHu27DMpAd/tY7VfizaTxF/iF6Hmg5tc7NUxdBzI+K0A/Sb5OD9qO99R6HqWecRY4JuLPzkiD5JbEIND6uyZKB7Wm74JFeRwjTpmdDMJx6DFKC0TfwBbFpFGN4O3LndP4oxbrLapFa9an5S96i49JjxXYRsItB6S1GFwmy90FMITV1cRHYf2a9/ITwt+RhfZAKMdDnxlrpxwsfr9w//Gh+qWCqFZ0vjAw3lLrwlyRxoDtZTYrfl9c59uV96fpSn1rMsznfjM4q86E2CubZ0p+6s0QX3VtXrrxJyQ0quxO4hkKpAoNLk1s5yb4Of2VAUeoIzmV0ANZ0RXCgsM9p0LHcLbSm31anebRhirBAxdcviJnOhETJc7K+N1OxbsGY18z6/ds2yz/Zlb5HsbAphjn/sf7Zj5y6WKlnPPctAXLDuXpizsOmSFtcD4CNPXm/+Yr5NwzirkFPjnF24cQVqqYflEkzxT8+OPKVQ+CvS1qpw6o3Ll1PfHCf2nOzS3syHEzNRMuzkG9MDUA+8OHULNsVcQByBhBKn81z+su9fuiFBa9wC1jwSupTgOw77pxNyIvJ79yqXXUzCjxSmvVvxC3NA1BEzNjuy/LuLMNQrmxJp7o84ROVSvhDYmJFq8l6nQjSar2bry9AiZk6zn7GRnLgaEiQawFlrHw2rMzttbJ4rLinxHTVCwVCpIuoeX9sepmUYKvlrKOipOFqVIWhmH/uUBrsHaKEXYrHaTjGK4aHRxOBQmuiKPLMnqrasQWnwTlqaR4Q34mx0xV+xRNqaSp43nyZVdbkFBXc2YlLcjNll6U1d+B0TYcH0FA3zh+SEQc17zXqZ4kfw4dGr0JdrZAV3BbbvOByC6/Pw7QUVeJj25GTPbf2M6J0PQoF7VAQZFsRg3XsfFE2aHU0Qhme+SDYe3T3ZkKl1P9LPczv95n4qT2DFKg3gZ+sUIkS5mtU6eJF9zQbq7Zt+ogPzzowwszapqxmaOJUjCS8/yXJzS1fjgHvBHJbTIn2Un/VFW3UjSE72Wqcg+c4a/Hf6g4Ms7U1p870U2WkW+/8dhiD3AM4hmgUSqKqlRd1oHU25IWJ1WQCZtQPiCTiLO3+7ao7inRt8oWBT5xLoLRQohddehW6kc+uNnbovF+kukH2vjLPq250Lig+bUwpoKuVPAOGZpx8md0IrrwS2Bpnx9EC101lwMsr/0icZdURz1eNmxrGdMMJxlpB5dtYLuUpiobwYU+AVb3yXnflQjKmL3Pes3NPEFP4T1dl6i+c8FYhH6CTNKBh3mTuUPFIDDG/BQmUtbq/FqTde/SjYHKqWmUstUhNT4Vik5UbeCXSSHB0QCiv4ML04ssYKX0cY5bLeUdVh+aSJ7PKZKtR9eUxBzUf7m/jFYHjs84PsHT1P1ghVf1ulr+OD1SClQ4eckIIP3xUPFlYDkOTCjpjNuvdSjnUQBDYpoO3ERkXigdWT7+T3/98M/0ga+ho0cZDnudS1d6AVohpe0vhfSiVcL9nVD8Xt44IdAOCfR68sLZYzAAAA=';
    logoImg.alt='AMBIC 实验室 Logo';
    logoImg.onerror=null;
  }
  if(logoWrap) logoWrap.querySelector('.brand-mark-fallback')?.remove();
  if(brandText && !document.querySelector('.brand-ambic-word')){
    const ambic=document.createElement('span');
    ambic.className='brand-ambic-word';
    ambic.textContent='AMBIC';
    brandText.parentNode.insertBefore(ambic,brandText);
  }

  // 全站横向分页：每个 section 占一整屏，支持键盘和触摸左右切换。
  const horizontalStyle=document.createElement('style');
  horizontalStyle.textContent=`
    html{scroll-behavior:auto;overflow:hidden}
    body{overflow:hidden}
    main{display:flex;flex-direction:row;width:100vw;min-width:100vw;height:100vh;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;scroll-behavior:smooth}
    main>section{flex:0 0 100vw;width:100vw;max-width:none;height:100vh;min-height:100vh;overflow-y:auto;overflow-x:hidden;scroll-snap-align:start;scroll-margin-top:0;padding-top:110px;padding-bottom:80px}
    main>.hero{padding-top:150px}
    main>.map-section{padding-bottom:100px}
    body.horizontal-ready footer{display:none}
    .brand{gap:10px!important}
    .brand-logo-wrap{width:54px!important;height:54px!important;flex:0 0 54px!important;overflow:visible!important}
    .brand-logo{display:block!important;width:54px!important;height:54px!important;object-fit:contain!important;object-position:center!important}
    .brand-ambic-word{font-size:14px;font-weight:700;letter-spacing:.16em;color:var(--green);white-space:nowrap;margin-right:4px}
    .brand-text{padding-left:14px;border-left:1px solid rgba(0,0,0,.12)}
    @media(max-width:800px){
      main>section{padding-left:24px;padding-right:24px}
      main>.hero{padding-top:125px}
      .section-head{align-items:flex-start;flex-direction:column;gap:18px}
      .research-grid,.people-grid{grid-template-columns:1fr}
      .visual-feature,.intro-layout,.team-lead{grid-template-columns:1fr}
      .metrics,.visual-strip{grid-template-columns:repeat(2,1fr)}
      .brand-logo-wrap{width:46px!important;height:46px!important;flex-basis:46px!important}
      .brand-logo{width:46px!important;height:46px!important}
      .brand-ambic-word{font-size:12px}
      .brand-text{display:none}
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

  // 禁止浏览器恢复旧的横向滚动位置：无锚点访问时始终显示首页。
  const resetHorizontalHome=()=>{
    if(location.hash || !main)return;
    current=0;
    main.scrollLeft=0;
    main.scrollTop=0;
  };
  resetHorizontalHome();
  requestAnimationFrame(resetHorizontalHome);
  setTimeout(resetHorizontalHome,80);
  window.addEventListener('pageshow',resetHorizontalHome);


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