(function(){
  var fill = document.getElementById('progressFill');
  var toTop = document.getElementById('toTop');

  function onScroll(){
    var doc = document.documentElement;
    var scrollTop = doc.scrollTop || document.body.scrollTop;
    var scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
    var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if(fill) fill.style.width = pct + '%';
    if(toTop){
      if(scrollTop > 500){ toTop.classList.add('show'); } else { toTop.classList.remove('show'); }
    }
  }
  if(toTop) toTop.addEventListener('click', function(){ window.scrollTo({top:0,behavior:'smooth'}); });
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  function centerPillInNav(nav, pill){
    if(nav.scrollWidth <= nav.clientWidth) return;
    var target = pill.offsetLeft - (nav.clientWidth - pill.clientWidth) / 2;
    nav.scrollTo({left: Math.max(0, target), behavior: 'smooth'});
  }

  function initScrollspy(nav){
    var pills = Array.prototype.slice.call(nav.querySelectorAll('.toc-pill'));
    var sections = pills.map(function(p){ return document.querySelector(p.getAttribute('href')); });
    if(!('IntersectionObserver' in window)) return;
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var idx = sections.indexOf(entry.target);
        if(idx === -1) return;
        if(entry.isIntersecting){
          pills.forEach(function(p){ p.classList.remove('active'); });
          pills[idx].classList.add('active');
          centerPillInNav(nav, pills[idx]);
        }
      });
    }, {rootMargin:'-45% 0px -50% 0px', threshold:0});
    sections.forEach(function(s){ if(s) observer.observe(s); });
  }
  Array.prototype.forEach.call(document.querySelectorAll('nav.toc[id]'), initScrollspy);
})();
