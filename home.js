/**
 * Course home — highlight sidebar link for the unit in view.
 */
(function () {
  const units = document.querySelectorAll('.course-unit[id^="unit-"]');
  const links = document.querySelectorAll('.course-sidebar__nav a[href^="#"]');
  if (!units.length || !links.length) return;

  const byId = new Map();
  links.forEach((a) => {
    const id = a.getAttribute('href');
    if (id && id.startsWith('#')) byId.set(id.slice(1), a);
  });

  function setActive(id) {
    links.forEach((a) => a.classList.remove('is-active'));
    const link = byId.get(id);
    if (link) link.classList.add('is-active');
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: '-20% 0px -55% 0px', threshold: 0 }
  );

  units.forEach((u) => io.observe(u));

  const first = document.getElementById('unit-1');
  if (first) setActive('unit-1');
})();
