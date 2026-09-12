(()=>{
'use strict';

// Laboratory page removed from the public site.
const laboratoryPage=document.getElementById('laboratory');
if(laboratoryPage)laboratoryPage.remove();
document.querySelectorAll('a[href="#laboratory"]').forEach(link=>link.remove());
document.querySelectorAll('style[id^="laboratory"]').forEach(style=>style.remove());
if(location.hash==='#laboratory')history.replaceState(null,'','#home');

// Load the preserved site logic after the laboratory section has been removed,
// so page switching, dots, keyboard navigation and swipe gestures no longer
// include the deleted page.
const script=document.createElement('script');
script.src='js/main-original.js?v=remove-laboratory-1';
script.async=false;
document.body.appendChild(script);
})();
