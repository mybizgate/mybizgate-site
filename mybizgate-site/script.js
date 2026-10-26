(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var nav = document.getElementById('siteNav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));

  function setNav(open) {
    if (!nav || !navToggle) { return; }
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (nav && navToggle) {
    navToggle.addEventListener('click', function () {
      setNav(!nav.classList.contains('is-open'));
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) { setNav(false); }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        setNav(false);
        navToggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (nav.classList.contains('is-open') && !header.contains(event.target)) {
        setNav(false);
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1080) { setNav(false); }
    }, { passive: true });
  }

  function updateHeader() {
    if (header) { header.classList.toggle('is-scrolled', window.scrollY > 18); }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  function setActiveSection(id) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  var observedSections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && observedSections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { setActiveSection(entry.target.id); }
      });
    }, { rootMargin: '-35% 0px -58% 0px', threshold: 0 });

    observedSections.forEach(function (section) { sectionObserver.observe(section); });
  }

  var revealItems = document.querySelectorAll('.reveal');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reducedMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.06 });

    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  var year = document.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
