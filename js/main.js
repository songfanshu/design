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
  teamCulturePage.innerHTML='';
  teamCulturePage.className='news section';
}
const teamCultureNav=document.querySelector('#mainNav a[href="#news"]');
if(teamCultureNav)teamCultureNav.textContent='团队建设';

// Make the main Research section match the full research.html presentation:
// no preview state, no extra click, and no separate "view overview" link.
const researchPage=document.getElementById('research');
if(researchPage){
  researchPage.className='research section research-direct-poster-page';
  researchPage.innerHTML=`<div class="research-direct-poster" aria-label="研究方向">
    <img src="assets/research/ambic-research-poster.png" alt="先进集成电路材料与类脑芯片课题组研究方向总览">
  </div>`;
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
  overflow-x:hidden!important;
  overflow-y:auto!important;
  background:#fff!important;
}
#research.research-direct-poster-page .research-direct-poster{
  width:100%;
  margin:0;
  padding:0;
  background:#fff;
  overflow:hidden;
}
#research.research-direct-poster-page .research-direct-poster img{
  display:block;
  width:100%;
  height:auto;
  max-width:none;
  margin:0;
  padding:0;
  object-fit:initial;
}
`;
document.head.appendChild(researchDirectStyle);

// Load the preserved site logic after obsolete sections/content have been removed.
const script=document.createElement('script');
script.src='js/main-original.js?v=cleanup-legacy-news-1';
script.async=false;
document.body.appendChild(script);
})();
