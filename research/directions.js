const box=document.querySelector('.rd-lightbox');
if(box){
  const content=box.querySelector('.rd-lightbox-content');
  document.querySelectorAll('.rd-figure>a').forEach(trigger=>trigger.addEventListener('click',event=>{
    const img=trigger.querySelector('img');
    if(!box.showModal||!img)return;
    event.preventDefault();const copy=img.cloneNode(true);copy.removeAttribute('loading');content.replaceChildren(copy);box.showModal();
  }));
  box.querySelector('.rd-lightbox-close').addEventListener('click',()=>box.close());
  box.addEventListener('click',event=>{if(event.target===box)box.close();});
  box.addEventListener('close',()=>content.replaceChildren());
}
