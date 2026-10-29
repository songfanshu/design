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

// Load the preserved site logic after obsolete sections/content have been removed.
const script=document.createElement('script');
script.src='js/main-original.js?v=20261029-team-culture-vertical-1';
script.async=false;
document.body.appendChild(script);
})();
