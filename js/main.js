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

// Use the live research poster so both poster columns align exactly.
const researchPage=document.getElementById('research');
if(researchPage){
  researchPage.className='research section research-direct-poster-page';
  // Render the research content in this document, without a nested page.
  researchPage.innerHTML='<div class="research-inline-poster" aria-label="课题组研究方向"></div>';
  const host=researchPage.querySelector('.research-inline-poster');
  const root=host.attachShadow({mode:'open'});
  root.innerHTML='<p style="padding:24px">研究方向加载中…</p>';
  fetch('research.html').then(response=>{
    if(!response.ok)throw new Error('Research page unavailable');
    return response.text();
  }).then(html=>{
    const source=new DOMParser().parseFromString(html,'text/html');
    const stage=source.querySelector('.stage');
    const second=source.querySelector('.second-research-poster');
    if(!stage||!second)throw new Error('Research content missing');
    root.replaceChildren();
    source.querySelectorAll('style').forEach(style=>root.append(style.cloneNode(true)));
    const base=document.createElement('style');
    base.textContent=':host{display:block;background:#fff;color:#252525;font-family:Arial,"Microsoft YaHei","PingFang SC",sans-serif;line-height:normal} .stage{margin:0 auto} .poster{padding-left:16px;padding-right:16px} .second-research-poster{max-width:none;margin-left:auto;margin-right:auto;padding-left:20px;padding-right:20px}';
    const signatureStyle=document.createElement('style');
    signatureStyle.textContent=signatureCss+' .page-signature{width:calc(100% - 40px);margin-top:20px;margin-bottom:28px}';
    root.append(base,signatureStyle,stage.cloneNode(true),second.cloneNode(true),createPageSignature());
    const poster=root.querySelector('.poster');
    const panel=root.querySelector('.stage');
    const fit=()=>{
      const scale=host.clientWidth/1500;
      poster.style.transform='scale('+scale+')';
      panel.style.width=(1500*scale)+'px';
      panel.style.height=(poster.offsetHeight*scale)+'px';
    };
    new ResizeObserver(fit).observe(host);
    fit();
  }).catch(()=>{
    root.innerHTML='<p style="padding:24px">研究方向暂时无法加载，请刷新页面或<a href="research.html">打开研究方向页面</a>。</p>';
  });
}

document.querySelectorAll('#mainNav a[href="research.html"]').forEach(link=>{
  link.setAttribute('href','#research');
});

const researchDirectStyle=document.createElement('style');
researchDirectStyle.id='research-direct-poster-style';
researchDirectStyle.textContent=`
body.paged #research.research-direct-poster-page{
  height:100%!important;
  min-height:0!important;
  display:block!important;
  padding:0!important;
  overflow:hidden!important;
  background:#fff!important;
  scrollbar-gutter:auto;
}
#research.research-direct-poster-page .research-inline-poster{
  display:block;
  width:100%;
  max-width:none;
  height:100%;
  border:0;
  margin:0 auto;
  padding:0;
  overflow:auto;
  scrollbar-width:none;
  background:#fff;
}
#research.research-direct-poster-page .research-inline-poster::-webkit-scrollbar{display:none}
`;
document.head.appendChild(researchDirectStyle);

// Load the preserved site logic after obsolete sections/content have been removed.
const script=document.createElement('script');
script.src='js/main-original.js?v=return-direct-20260913';
script.async=false;
document.body.appendChild(script);
})();
