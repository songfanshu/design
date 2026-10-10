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

// Team culture carousel: remove the visible "了解详情" CTA and make the image slide itself the detail-page entry.
const teamBuildLinkStyle=document.createElement('style');
teamBuildLinkStyle.textContent=`
#news .team-build-slide-copy>a{display:none!important}
#news .team-build-slide{cursor:pointer}
#news .team-build-slide:focus-visible{outline:3px solid rgba(255,255,255,.95);outline-offset:-5px}
`;
document.head.appendChild(teamBuildLinkStyle);

const decorateTeamBuildSlides=()=>{
  document.querySelectorAll('#news .team-build-slide').forEach(slide=>{
    const detailLink=slide.querySelector('.team-build-slide-copy>a[href]');
    if(!detailLink)return;
    slide.setAttribute('role','link');
    slide.setAttribute('tabindex','0');
    const title=slide.querySelector('h3')?.textContent?.trim()||'团队建设';
    slide.setAttribute('aria-label',`查看${title}详情`);
  });
};
decorateTeamBuildSlides();

// Use event delegation because main-original.js rebuilds the team-culture carousel after this file loads.
document.addEventListener('click',event=>{
  const slide=event.target.closest?.('#news .team-build-slide');
  if(!slide)return;
  if(event.target.closest('.team-build-arrow,.team-build-tabs,.team-build-dots,button'))return;
  const detailLink=slide.querySelector('.team-build-slide-copy>a[href]');
  if(!detailLink)return;
  event.preventDefault();
  location.assign(detailLink.href);
});
document.addEventListener('keydown',event=>{
  if(event.key!=='Enter'&&event.key!==' ')return;
  const slide=event.target.closest?.('#news .team-build-slide');
  if(!slide)return;
  if(event.target.closest('button'))return;
  const detailLink=slide.querySelector('.team-build-slide-copy>a[href]');
  if(!detailLink)return;
  event.preventDefault();
  location.assign(detailLink.href);
});
if(teamCulturePage){
  new MutationObserver(decorateTeamBuildSlides).observe(teamCulturePage,{childList:true,subtree:true});
}

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

// Load the current research overview directly into the homepage section.
// The overview markup changed from the old .stage layout to .rd-poster, so keep
// this loader aligned with research.html and always leave a visible fallback.
const researchPage=document.getElementById('research');
if(researchPage&&!researchPage.querySelector('.rd-poster')){
  researchPage.className='research section research-overview research-loading';
  researchPage.setAttribute('aria-busy','true');
  researchPage.innerHTML='<div class="research-load-status" role="status">研究方向加载中…</div>';

  if(!document.querySelector('link[data-research-directions]')){
    const directionsCss=document.createElement('link');
    directionsCss.rel='stylesheet';
    directionsCss.href='research/directions.css?v=20261010-overview-fix-1';
    directionsCss.dataset.researchDirections='';
    document.head.appendChild(directionsCss);
  }

  fetch('research.html').then(response=>{
    if(!response.ok)throw new Error('Research page unavailable');
    return response.text();
  }).then(html=>{
    const source=new DOMParser().parseFromString(html,'text/html');
    const poster=source.querySelector('.rd-poster');
    if(!poster)throw new Error('Research overview missing');
    researchPage.replaceChildren(poster.cloneNode(true));
    researchPage.classList.remove('research-loading');
    researchPage.setAttribute('aria-busy','false');
  }).catch(()=>{
    researchPage.innerHTML='<div class="research-load-status research-load-error"><strong>研究方向暂时无法加载</strong><span>请刷新页面，或<a href="research.html">打开研究方向页面</a>。</span></div>';
    researchPage.classList.remove('research-loading');
    researchPage.setAttribute('aria-busy','false');
  });
}

document.querySelectorAll('#mainNav a[href="research.html"]').forEach(link=>{
  link.setAttribute('href','#research');
});

const researchOverviewStyle=document.createElement('style');
researchOverviewStyle.id='research-overview-style';
researchOverviewStyle.textContent=`
body.paged #research.research-overview{
  height:100%!important;
  min-height:0!important;
  display:block!important;
  padding:12px 16px 40px!important;
  overflow-y:auto!important;
  overflow-x:hidden!important;
  background:#fff!important;
}
#research.research-overview .rd-poster{
  width:100%;
  max-width:1468px;
  margin:0 auto;
}
#research .research-load-status{
  min-height:calc(100dvh - var(--header) - 52px);
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:10px;
  color:#52645b;
  font-size:16px;
}
#research .research-load-error strong{color:#17372d;font-size:20px}
#research .research-load-error a{color:var(--green);text-decoration:underline;text-underline-offset:4px}
@media(max-width:720px){
  body.paged #research.research-overview{padding:12px 12px 36px!important}
}
`;
document.head.appendChild(researchOverviewStyle);

// Load the preserved site logic after obsolete sections/content have been removed.
const script=document.createElement('script');
script.src='js/main-original.js?v=20260914-new-portraits';
script.async=false;
document.body.appendChild(script);
})();
