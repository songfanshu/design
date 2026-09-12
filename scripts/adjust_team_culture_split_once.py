from pathlib import Path

path = Path('js/main.js')
text = path.read_text(encoding='utf-8')
start = text.index('function buildTeamCulturePage(){')
end = text.index('\nfunction installPageDots()', start)
replacement = r'''function buildTeamCulturePage(){
  const news=document.getElementById('news');
  if(!news)return;
  const navLink=nav?.querySelector('a[href="#news"]');
  if(navLink)navLink.textContent='团队建设';
  news.className='news section team-building-page';
  news.innerHTML=`
    <div class="team-build-shell">
      <div class="team-build-intro">
        <div class="team-build-kicker">团队建设 <span>TEAM CULTURE</span></div>
        <h2>在共同成长中，<br><em>建立有温度的科研团队。</em></h2>
        <p>我们希望课题组不仅是开展科研工作的地方，也是一支彼此支持、开放交流、长期共同成长的团队。严谨做研究，真诚做伙伴。</p>
        <div class="team-build-values" aria-label="团队价值观">
          <span>严谨</span><span>开放</span><span>协作</span><span>成长</span>
        </div>
      </div>
      <div class="team-build-carousel" data-culture-carousel tabindex="0" aria-label="团队建设板块横向切换">
        <div class="team-build-track">
          <article class="team-build-slide is-active" style="--culture-image:url('assets/home-campus-clean.png')">
            <div class="team-build-slide-copy">
              <span class="team-build-number">01 / ACADEMIC</span>
              <h3>学术共进</h3>
              <p>通过组会研讨、文献分享与阶段汇报，建立高质量讨论机制，在持续交流中提升科研判断力与表达能力。</p>
              <a href="team-culture/academic.html">了解详情 <span aria-hidden="true">→</span></a>
            </div>
          </article>
          <article class="team-build-slide" style="--culture-image:url('assets/contact-neuromorphic-soft.webp')">
            <div class="team-build-slide-copy">
              <span class="team-build-number">02 / COLLABORATION</span>
              <h3>协同创新</h3>
              <p>鼓励材料、器件、电路与计算方向交叉协作，让不同研究背景围绕共同问题形成新的思路与解决方案。</p>
              <a href="team-culture/collaboration.html">了解详情 <span aria-hidden="true">→</span></a>
            </div>
          </article>
          <article class="team-build-slide" style="--culture-image:url('assets/home-campus-new.jpg')">
            <div class="team-build-slide-copy">
              <span class="team-build-number">03 / COMMUNITY</span>
              <h3>文体交流</h3>
              <p>以轻松而有凝聚力的团队活动连接科研之外的日常，在运动、交流与集体活动中建立默契与归属感。</p>
              <a href="team-culture/community.html">了解详情 <span aria-hidden="true">→</span></a>
            </div>
          </article>
        </div>
        <button class="team-build-arrow team-build-prev" type="button" aria-label="上一个团队建设板块">‹</button>
        <button class="team-build-arrow team-build-next" type="button" aria-label="下一个团队建设板块">›</button>
        <div class="team-build-tabs" role="tablist" aria-label="团队建设板块">
          <button class="is-active" type="button" role="tab" aria-selected="true" data-culture-slide="0">学术共进</button>
          <button type="button" role="tab" aria-selected="false" data-culture-slide="1">协同创新</button>
          <button type="button" role="tab" aria-selected="false" data-culture-slide="2">文体交流</button>
        </div>
      </div>
    </div>`;

  let style=document.getElementById('team-building-styles');
  if(!style){style=document.createElement('style');style.id='team-building-styles';document.head.appendChild(style);}
  style.textContent=`
#news.team-building-page{position:relative;overflow-y:auto;background:radial-gradient(circle at 86% 12%,rgba(55,126,103,.12),transparent 31%),linear-gradient(135deg,#fbfdfc 0%,#eef5f1 100%);padding:clamp(32px,5vh,58px) clamp(34px,5vw,82px) 36px;color:#17372d}
#news .team-build-shell{width:min(1400px,100%);min-height:calc(100% - 8px);margin:0 auto;display:grid;grid-template-columns:minmax(330px,.82fr) minmax(0,1.58fr);gap:clamp(38px,5vw,82px);align-items:center}
#news .team-build-intro{max-width:510px;position:relative;z-index:2}
#news .team-build-kicker{display:flex;align-items:center;gap:13px;color:#075b39;font-size:13px;font-weight:800;letter-spacing:.12em}
#news .team-build-kicker:before{content:"";width:36px;height:2px;background:#075b39}
#news .team-build-kicker span{font-size:11px;font-weight:600;color:#6b7d75;letter-spacing:.16em}
#news .team-build-intro h2{font-size:clamp(40px,4.1vw,64px);line-height:1.12;letter-spacing:-.045em;margin:24px 0 22px;color:#18382e}
#news .team-build-intro h2 em{font-style:normal;color:#075b39}
#news .team-build-intro>p{max-width:470px;font-size:16px;line-height:1.9;color:#52675e;margin:0}
#news .team-build-values{display:flex;flex-wrap:wrap;gap:10px;margin-top:30px}
#news .team-build-values span{display:inline-flex;align-items:center;justify-content:center;min-width:66px;height:34px;padding:0 16px;border:1px solid rgba(7,91,57,.18);border-radius:999px;background:rgba(255,255,255,.72);color:#285744;font-size:13px;font-weight:700;box-shadow:0 8px 22px rgba(24,55,46,.035)}
#news .team-build-carousel{position:relative;height:clamp(430px,62vh,620px);overflow:hidden;border-radius:26px;background:#18372e;box-shadow:0 24px 60px rgba(24,55,46,.16);outline:none}
#news .team-build-carousel:focus-visible{box-shadow:0 24px 60px rgba(24,55,46,.16),0 0 0 3px rgba(7,91,57,.25)}
#news .team-build-track{display:flex;width:100%;height:100%;transform:translate3d(0,0,0);transition:transform .58s cubic-bezier(.2,.75,.25,1);will-change:transform}
#news .team-build-slide{position:relative;flex:0 0 100%;height:100%;background-image:linear-gradient(90deg,rgba(8,31,24,.76) 0%,rgba(8,31,24,.48) 42%,rgba(8,31,24,.12) 74%,rgba(8,31,24,.04) 100%),var(--culture-image);background-size:cover;background-position:center;isolation:isolate}
#news .team-build-slide:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(4,18,14,.34),transparent 48%);z-index:-1}
#news .team-build-slide-copy{position:absolute;left:clamp(34px,4.5vw,64px);bottom:clamp(76px,10vh,112px);width:min(560px,70%);color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.18)}
#news .team-build-number{display:block;margin-bottom:14px;font-size:12px;font-weight:800;letter-spacing:.17em;color:rgba(255,255,255,.76)}
#news .team-build-slide h3{margin:0 0 15px;font-size:clamp(38px,4vw,62px);line-height:1.02;color:#fff;letter-spacing:-.04em}
#news .team-build-slide p{max-width:540px;margin:0 0 24px;font-size:clamp(15px,1.08vw,17px);line-height:1.78;color:rgba(255,255,255,.9);font-weight:500}
#news .team-build-slide a{display:inline-flex;align-items:center;gap:16px;padding:11px 20px;border:1px solid rgba(255,255,255,.5);border-radius:999px;background:rgba(255,255,255,.12);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:#fff;font-size:14px;font-weight:700;transition:background .22s ease,transform .22s ease}
#news .team-build-slide a:hover{background:rgba(255,255,255,.22);transform:translateX(3px)}
#news .team-build-arrow{position:absolute;top:50%;z-index:4;width:48px;height:48px;margin-top:-24px;border:1px solid rgba(255,255,255,.45);border-radius:50%;background:rgba(12,36,28,.28);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:#fff;font-size:34px;line-height:1;display:grid;place-items:center;cursor:pointer;transition:background .2s ease,transform .2s ease}
#news .team-build-arrow:hover{background:rgba(12,36,28,.48);transform:scale(1.04)}
#news .team-build-prev{left:18px}#news .team-build-next{right:18px}
#news .team-build-tabs{position:absolute;right:22px;bottom:20px;z-index:4;display:flex;gap:8px;padding:7px;border-radius:999px;background:rgba(8,27,21,.42);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
#news .team-build-tabs button{border:0;border-radius:999px;padding:9px 14px;background:transparent;color:rgba(255,255,255,.72);font:600 13px/1 Arial,"Microsoft YaHei",sans-serif;cursor:pointer;transition:background .2s ease,color .2s ease}
#news .team-build-tabs button.is-active{background:#fff;color:#17372d}
@media(max-width:1050px){#news.team-building-page{padding:30px 30px 42px}#news .team-build-shell{grid-template-columns:1fr;align-items:start;gap:26px}#news .team-build-intro{max-width:780px}#news .team-build-intro h2{font-size:clamp(38px,7vw,56px)}#news .team-build-carousel{height:520px}}
@media(max-width:650px){#news.team-building-page{padding:26px 18px 34px}#news .team-build-intro h2{font-size:36px;margin:18px 0 16px}#news .team-build-intro>p{font-size:15px;line-height:1.75}#news .team-build-values{margin-top:20px}#news .team-build-carousel{height:clamp(420px,62vh,540px);border-radius:20px}#news .team-build-slide{background-image:linear-gradient(0deg,rgba(7,29,22,.78) 0%,rgba(7,29,22,.44) 58%,rgba(7,29,22,.12) 100%),var(--culture-image)}#news .team-build-slide-copy{left:24px;right:24px;bottom:88px;width:auto}#news .team-build-slide h3{font-size:40px}#news .team-build-slide p{font-size:15px;line-height:1.65}#news .team-build-arrow{width:42px;height:42px;margin-top:-21px;font-size:30px}#news .team-build-prev{left:10px}#news .team-build-next{right:10px}#news .team-build-tabs{left:50%;right:auto;bottom:16px;transform:translateX(-50%);width:max-content;max-width:calc(100% - 26px)}#news .team-build-tabs button{padding:8px 10px;font-size:12px}}
@media(min-width:1051px) and (max-height:760px){#news.team-building-page{padding-top:24px;padding-bottom:24px}#news .team-build-shell{gap:42px}#news .team-build-intro h2{font-size:46px;margin:16px 0 14px}#news .team-build-intro>p{font-size:14px;line-height:1.65}#news .team-build-values{margin-top:18px}#news .team-build-carousel{height:480px}}
@media(prefers-reduced-motion:reduce){#news .team-build-track,#news .team-build-slide a,#news .team-build-arrow{transition:none}}
`;

  const carousel=news.querySelector('[data-culture-carousel]');
  const track=carousel?.querySelector('.team-build-track');
  const slides=[...(carousel?.querySelectorAll('.team-build-slide')||[])];
  const tabs=[...(carousel?.querySelectorAll('[data-culture-slide]')||[])];
  if(!carousel||!track||!slides.length)return;
  let cultureIndex=0;
  const renderCulture=index=>{
    cultureIndex=(index+slides.length)%slides.length;
    track.style.transform=`translate3d(-${cultureIndex*100}%,0,0)`;
    slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===cultureIndex));
    tabs.forEach((tab,i)=>{const active=i===cultureIndex;tab.classList.toggle('is-active',active);tab.setAttribute('aria-selected',String(active));});
  };
  carousel.querySelector('.team-build-prev')?.addEventListener('click',event=>{event.stopPropagation();renderCulture(cultureIndex-1);});
  carousel.querySelector('.team-build-next')?.addEventListener('click',event=>{event.stopPropagation();renderCulture(cultureIndex+1);});
  tabs.forEach(tab=>tab.addEventListener('click',event=>{event.stopPropagation();renderCulture(Number(tab.dataset.cultureSlide));}));
  carousel.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
      event.preventDefault();event.stopPropagation();renderCulture(cultureIndex+(event.key==='ArrowRight'?1:-1));
    }
  });
  let cultureTouch=null;
  carousel.addEventListener('touchstart',event=>{if(event.touches.length===1)cultureTouch={x:event.touches[0].clientX,y:event.touches[0].clientY};},{passive:true});
  carousel.addEventListener('touchend',event=>{
    if(!cultureTouch)return;
    const dx=event.changedTouches[0].clientX-cultureTouch.x,dy=event.changedTouches[0].clientY-cultureTouch.y;
    cultureTouch=null;
    if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.35){event.stopPropagation();renderCulture(cultureIndex+(dx<0?1:-1));}
  },{passive:true});
  renderCulture(0);
}
'''
path.write_text(text[:start] + replacement + text[end:], encoding='utf-8')
