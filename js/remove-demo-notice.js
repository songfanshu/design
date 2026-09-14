(() => {
'use strict';
const notice = /For\s+demonstration\s+and\s+testing\s+purposes\s+only\.\s*Please\s+do\s+not\s+enter\s+any\s+sensitive\s+data\./g;
const observed = new WeakSet();
function clean(root) {
  if (root.nodeType === Node.TEXT_NODE) {
    if (!root.parentElement?.closest('script,style,textarea')) {
      const next = root.data.replace(notice, '');
      if (next !== root.data) root.data = next;
    }
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
})();