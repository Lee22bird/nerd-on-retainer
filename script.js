/* Nerd On Retainer — interactions
   1) reveal-on-scroll  2) nav shrink  3) FAQ accordion  */
(function () {
  'use strict';

  /* ---- 1. Reveal on scroll ---- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var d = e.target.getAttribute('data-reveal-delay') || 0;
          e.target.style.transitionDelay = d + 'ms';
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- 2. Nav shrink on scroll ---- */
  var nav = document.querySelector('[data-nav]');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 24) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- 3. FAQ accordion (one open at a time) ---- */
  var faq = document.querySelector('[data-faq]');
  if (faq) {
    var items = Array.prototype.slice.call(faq.querySelectorAll('.faq-item'));

    var setOpen = function (item, open) {
      var panel = item.querySelector('.faq-a');
      var sign = item.querySelector('.faq-sign');
      if (open) {
        item.classList.add('is-open');
        panel.style.maxHeight = panel.firstElementChild.offsetHeight + 'px';
        sign.textContent = '–'; /* – */
      } else {
        item.classList.remove('is-open');
        panel.style.maxHeight = '0px';
        sign.textContent = '+';
      }
    };

    items.forEach(function (item) {
      var btn = item.querySelector('.faq-q');
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        items.forEach(function (other) { if (other !== item) setOpen(other, false); });
        setOpen(item, !isOpen);
      });
    });

    /* initialise: open whichever item ships with .is-open, closed otherwise */
    items.forEach(function (item) { setOpen(item, item.classList.contains('is-open')); });
    /* keep the open panel sized correctly after resize */
    window.addEventListener('resize', function () {
      var open = faq.querySelector('.faq-item.is-open .faq-a');
      if (open) open.style.maxHeight = open.firstElementChild.offsetHeight + 'px';
    }, { passive: true });
  }
})();
