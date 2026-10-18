// Shared by every page: light/dark toggle, today highlight. Loaded in <head> so the theme applies before paint.
(function(){
  var root=document.documentElement, KEY='theme';
  function stored(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function save(v){try{localStorage.setItem(KEY,v)}catch(e){}}
  function systemDark(){return window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches}
  function current(){return root.getAttribute('data-theme')||(systemDark()?'dark':'light')}
  function paintBar(){
    var m=document.querySelector('meta[name="theme-color"]:not([media])');
    if(m)m.setAttribute('content',current()==='dark'?'#0B0C0E':'#F5F3EF');
  }
  if('serviceWorker' in navigator)window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})});
  var t=stored(); if(t==='light'||t==='dark')root.setAttribute('data-theme',t);

  document.addEventListener('DOMContentLoaded',function(){
    paintBar();
    var btn=document.getElementById('theme');
    if(btn){
      var sync=function(){var d=current()==='dark';btn.textContent=d?'☀︎':'☾';btn.setAttribute('aria-label',d?'Switch to light mode':'Switch to dark mode')};
      sync();
      btn.addEventListener('click',function(){var n=current()==='dark'?'light':'dark';root.setAttribute('data-theme',n);save(n);sync();paintBar()});
    }

    // Phone tables: label each cell with its column heading so rows can stack as cards
    document.querySelectorAll('.tbl table:not(.week-tbl):not(.wait-tbl)').forEach(function(tb){
      tb.classList.add('stack');
      var heads=Array.prototype.map.call(tb.querySelectorAll('thead th'),function(th){return th.textContent.trim()});
      tb.querySelectorAll('tbody tr').forEach(function(tr){
        Array.prototype.forEach.call(tr.children,function(c,i){if(i>0&&heads[i])c.setAttribute('data-label',heads[i])});
      });
    });

    // Today: weekday cards on the skin Week tab, and the teeth week table/list
    var NAMES=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'], today=NAMES[new Date().getDay()];
    document.querySelectorAll('.week>div, .days>li').forEach(function(el){
      var h=el.querySelector('h3, b');
      if(h&&h.textContent.trim().slice(0,3)===today)el.classList.add('today');
    });
    document.querySelectorAll('table.week-tbl').forEach(function(tb){
      var col=-1;
      tb.querySelectorAll('thead th').forEach(function(th,i){if(th.textContent.trim()===today)col=i});
      if(col<0)return;
      tb.querySelectorAll('tr').forEach(function(tr){
        var i=0;
        Array.prototype.forEach.call(tr.children,function(c){
          var span=+(c.getAttribute('colspan')||1);
          if(span===1&&i===col){c.classList.add('today');if(c.tagName==='TH')c.innerHTML='<span>'+c.textContent+'</span>'}
          i+=span;
        });
      });
    });
  });
})();
