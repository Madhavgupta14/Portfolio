(function () {
  'use strict';

  /* Cursor spotlight — follows the mouse and lightens the area around it */
  var glow = document.querySelector('.cursor-glow');
  if (glow && window.matchMedia('(hover: hover)').matches) {
    var gx = -1000, gy = -1000, gTick = false;
    var moveGlow = function () {
      glow.style.transform = 'translate3d(' + (gx - 60) + 'px,' + (gy - 60) + 'px,0)';
      gTick = false;
    };
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      gx = e.clientX;
      gy = e.clientY;
      if (!glow.classList.contains('is-active')) glow.classList.add('is-active');
      if (!gTick) { requestAnimationFrame(moveGlow); gTick = true; }
    }, { passive: true });
    document.addEventListener('mouseleave', function () { glow.classList.remove('is-active'); });
  }

  /* Scroll-to-top button */
  var scrollBtn = document.getElementById('myDIV');
  if (scrollBtn) {
    window.addEventListener(
      'scroll',
      function () {
        scrollBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
      },
      { passive: true }
    );
  }

  /* Smooth anchor scroll */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  /* Lightweight scroll reveals (replaces GSAP ScrollTrigger) */
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  document.querySelectorAll('.reveal-stagger').forEach(function (group) {
    var items = group.querySelectorAll('.reveal-item');
    items.forEach(function (item, i) {
      item.style.setProperty('--i', i);
    });
    revealObserver.observe(group);
  });
})();
