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
  /* Collaborative innovation: paper figures stay completely still. */
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
  a[href],a[href] img,.rd-overview-board .rd-study h2{transition:none!important}
}
`;
(document.head || document.documentElement).appendChild(interactionStyle);
const notice = /For\s+demonstration\s+and\s+testing\s+purposes\s+only\.\s*Please\s+do\s+not\s+enter\s+any\s+sensitive\s+data\./i;
const noticeContainers = '[role="alert"],[class*="banner" i],[class*="notice" i],[class*="disclaimer" i],[class*="toast" i]';
const hidden = new WeakSet();

function parent(element) {
  return element.parentElement || element.getRootNode()?.host || null;
}

function hideContainer(element) {
  if (!element || hidden.has(element)) return;
  let container = element.closest?.(noticeContainers) || element;
  let current = container;
  while (current && !current.matches?.('html,body,main,header,footer,section,#pages')) {
    const style = getComputedStyle(current);
    const label = current.id + ' ' + (current.getAttribute?.('class') || '');
    if (style.position === 'fixed' || /(?:banner|notice|disclaimer|toast)/i.test(label)) {
      container = current;
    }
    current = parent(current);
  }
  if (hidden.has(container)) return;
  hidden.add(container);
  container.setAttribute?.('aria-hidden', 'true');
  container.style?.setProperty('display', 'none', 'important');
  container.style?.setProperty('visibility', 'hidden', 'important');
  container.style?.setProperty('pointer-events', 'none', 'important');
}

function inspect(root) {
  if (!root) return;
  if (root.nodeType === Node.TEXT_NODE) {
    if (notice.test(root.data || '')) hideContainer(root.parentElement);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;

  if (root.matches?.(noticeContainers) && notice.test(root.textContent || '')) hideContainer(root);
  root.querySelectorAll?.(noticeContainers).forEach(element => {
    if (notice.test(element.textContent || '')) hideContainer(element);
  });

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let text;
  while ((text = walker.nextNode())) {
    if (notice.test(text.data || '')) hideContainer(text.parentElement);
  }
}

function inspectExistingShadowRoots() {
  document.querySelectorAll('*').forEach(element => {
    if (element.shadowRoot) inspect(element.shadowRoot);
  });
}

function start() {
  inspect(document);
  inspectExistingShadowRoots();

  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'characterData') {
        inspect(record.target);
      } else {
        record.addedNodes.forEach(inspect);
      }
    }
  });
  observer.observe(document.documentElement, {subtree:true, childList:true, characterData:true});
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, {once:true});
} else {
  start();
}
})();