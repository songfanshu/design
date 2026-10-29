// Research figures are static illustrations; image enlargement is disabled.
document.querySelectorAll('.rd-figure > a').forEach(link => {
  link.removeAttribute('href');
  link.removeAttribute('target');
  link.setAttribute('tabindex', '-1');
  link.setAttribute('aria-disabled', 'true');
});
document.querySelectorAll('.rd-lightbox').forEach(dialog => dialog.remove());
