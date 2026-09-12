from pathlib import Path

path = Path('js/main.js')
text = path.read_text(encoding='utf-8')
marker = "  const carousel=news.querySelector('[data-culture-carousel]');"
unique = 'Team culture viewport-fit text layout v1'
if unique in text:
    raise SystemExit(0)
start = text.index('function buildTeamCulturePage(){')
end = text.index('\nfunction installPageDots()', start)
segment = text[start:end]
if marker not in segment:
    raise SystemExit('carousel marker not found in team culture function')
override = r'''  style.textContent += `
/* Team culture viewport-fit text layout v1 */
@media(min-width:801px){
  #news.team-building-page{overflow:hidden!important;padding-top:clamp(18px,2.8vh,30px)!important;padding-bottom:18px!important}
  #news .team-build-shell{height:100%!important;min-height:0!important;display:flex!important;flex-direction:column!important}
  #news .team-build-heading{flex:0 0 auto!important;align-items:flex-start!important;gap:clamp(24px,3vw,44px)!important;margin-bottom:12px!important}
  #news .team-build-heading>div{flex:1 1 auto!important;min-width:0!important}
  #news .team-build-kicker{font-size:12px!important;line-height:1.2!important}
  #news .team-build-heading h2{max-width:760px!important;margin:8px 0 0!important;font-size:clamp(30px,3vw,44px)!important;line-height:1.12!important;letter-spacing:-.025em!important}
  #news .team-build-heading>p{flex:0 1 500px!important;max-width:500px!important;margin:3px 0 0!important;font-size:14px!important;line-height:1.6!important}
  #news .team-build-carousel{flex:1 1 auto!important;min-height:0!important;height:auto!important;max-height:none!important}
  #news .team-build-footer{flex:0 0 auto!important;margin-top:8px!important;padding-top:7px!important}
}
@media(min-width:801px) and (max-height:760px){
  #news.team-building-page{padding-top:14px!important;padding-bottom:12px!important}
  #news .team-build-heading{margin-bottom:8px!important;gap:24px!important}
  #news .team-build-kicker{font-size:11px!important}
  #news .team-build-heading h2{font-size:clamp(27px,2.55vw,36px)!important;margin-top:5px!important;line-height:1.08!important}
  #news .team-build-heading>p{font-size:13px!important;line-height:1.45!important;max-width:460px!important;margin-top:0!important}
  #news .team-build-footer{margin-top:5px!important;padding-top:5px!important}
}
@media(max-width:800px){
  #news .team-build-heading h2{font-size:clamp(31px,8.5vw,42px)!important;line-height:1.12!important}
  #news .team-build-heading>p{font-size:14px!important;line-height:1.65!important}
}
`;

'''
segment = segment.replace(marker, override + marker, 1)
path.write_text(text[:start] + segment + text[end:], encoding='utf-8')
