(() => {
'use strict';
const notice = /For\s+demonstration\s+and\s+testing\s+purposes\s+only\.\s*Please\s+do\s+not\s+enter\s+any\s+sensitive\s+data\./;
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
  if (++passes === 20) clearInterval(startupCheck);
}, 250);
})();
