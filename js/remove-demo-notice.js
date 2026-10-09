(() => {
'use strict';
const interactionStyle = document.createElement('style');
interactionStyle.id = 'global-link-hover-effects';
interactionStyle.textContent = `
/* Every link that opens another section, page, detail view or external site. */
a[href]{
  cursor:pointer;
  transition:color .2s ease,background-color .2s ease,box-shadow .2s ease,
    transform .2s ease,filter .2s ease,border-color .2s ease;
}
@media (hover:hover) and (pointer:fine){
  /* Navigation and ordinary text links only rise slightly. */
  .main-nav a[href]:hover,.rd-nav a[href]:hover,.rd-sidebar a[href]:hover,
  .paper-nav a[href]:hover,.paper-toc a[href]:hover,
  a.text-link:hover,a.profile-link:hover,a.roster-email:hover,
  .contact-info a[href]:hover{
    transform:translateY(-2px);
  }
  /* Buttons, detail links, publication rows and clickable cards lift as a unit. */
  a.mockup-button:hover,a.button:hover,a.back-bottom:hover,a.rd-paper:hover,
  .team-build-slide a[href]:hover,
  a[class*="card" i]:hover,a[class*="item" i]:hover{
    transform:translateY(-4px);
    box-shadow:0 14px 30px rgba(7,91,57,.18);
    filter:none;
  }
  /* Linked figures visibly enlarge without changing the document flow. */
  a[href] img{
    transition:transform .24s ease,box-shadow .24s ease,filter .24s ease;
  }
  a[href]:hover img{
    transform:scale(1.025);
    box-shadow:0 14px 32px rgba(7,91,57,.2);
    filter:saturate(1.04) contrast(1.02);
  }
  /* Header identity logos stay completely still on hover. */
  .home-branding a:hover img{
    transform:none;
    box-shadow:none;
    filter:none;
  }
  /* Collaborative innovation: keep paper figures still and emphasize the
     matching title on the left when its figure is hovered. */
  .collaboration-overview .slide-copy h2{
    transition:transform .2s ease;
    transform-origin:left center;
  }
  .collaboration-overview .slide:has(.slide-image:hover) .slide-copy h2{
    transform:scale(1.06)!important;
  }
  .collaboration-overview .slide-image:hover img{
    transform:none;
    box-shadow:none;
    filter:none;
  }
  /* Research overview: keep figures still and enlarge only the direction title. */
  .rd-overview-board .rd-study:hover{
    transform:none;
    box-shadow:none;
    filter:none;
  }
  .rd-overview-board .rd-study h2{
    transition:transform .2s ease;
    transform-origin:center;
  }
  .rd-overview-board .rd-study:hover h2{transform:scale(1.06)}
  .rd-overview-board .rd-study:hover img{
    transform:none;
    box-shadow:none;
    filter:none;
  }
  /* Publication rows should never gain a white or floating background panel. */
  #publications .publication:hover,
  #publications .publication:focus,
  #publications .publication:focus-visible{
    background:transparent!important;
    box-shadow:none!important;
    filter:none!important;
    outline:none!important;
  }
}
a[href]:active{transform:translateY(0) scale(.985)}
a[href]:focus-visible{
  outline:3px solid rgba(41,149,105,.72);
  outline-offset:4px;
  border-radius:6px;
}
@media (prefers-reduced-motion:reduce){
  a[href],a[href] img,.rd-overview-board .rd-study h2,
  .collaboration-overview .slide-copy h2{transition:none!important}
}
`;
(document.head || document.documentElement).appendChild(interactionStyle);
const notice = /For\s+demonstration\s+and\s+testing\s+purposes\s+only\.\s*Please\s+do\s+not\s+enter\s+any\s+sensitive\s+data\./;
const noticeContainers = '[role="alert"],[class*="banner" i],[class*="notice" i],[class*="disclaimer" i],[class*="toast" i]';
const observed = new WeakSet();
const hidden = new WeakSet();
function parent(element) {
  return element.parentElement || element.getRootNode()?.host || null;
}
function hideNotice(text) {
  let element = text.parentElement;
  if (!element || element.closest('script,style,textarea')) return;
  let container = element;
  // Keep the close control and backdrop inside the same hidden container.
  // Never select the document or the site's content/navigation containers.
  while (element && !element.matches('html,body,main,header,footer,section,#pages')) {
    const style = getComputedStyle(element);
    const label = element.id + ' ' + (element.getAttribute('class') || '');
    if (style.position === 'fixed' || /(?:banner|notice|disclaimer|toast)/i.test(label)) {
      container = element;
    }
    element = parent(element);
  }
  if (hidden.has(container)) return;
  hidden.add(container);
  container.setAttribute('aria-hidden', 'true');
  container.style.setProperty('display', 'none', 'important');
  container.style.setProperty('visibility', 'hidden', 'important');
  container.style.setProperty('pointer-events', 'none', 'important');
}
function clean(root) {
  if (root.nodeType === Node.TEXT_NODE) {
    if (notice.test(root.data)) hideNotice(root);
    return;
  }
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) clean(node);
  if (root.querySelectorAll) {
    // Only inspect likely notice containers for split text. Avoid repeatedly
    // reading textContent from every page element, which is costly on long pages.
    root.querySelectorAll(noticeContainers).forEach(element => {
      if (notice.test(element.textContent || '')) {
        hideNotice({parentElement: element});
      }
    });
    root.querySelectorAll('*').forEach(element => {
      if (element.shadowRoot) watch(element.shadowRoot);
    });
  }
}
function watch(root) {
  if (observed.has(root)) return;
  observed.add(root);
  clean(root);
  new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'characterData') clean(record.target);
      else record.addedNodes.forEach(clean);
    }
  }).observe(root, {subtree:true, childList:true, characterData:true});
}
watch(document.documentElement);
document.addEventListener('DOMContentLoaded', () => clean(document.documentElement), {once:true});
window.addEventListener('pageshow', () => clean(document.documentElement));
// Also catch shadow roots attached after their host entered the document.
let passes = 0;
const startupCheck = setInterval(() => {
  clean(document.documentElement);
  if (++passes === 8) clearInterval(startupCheck);
}, 250);
})();
