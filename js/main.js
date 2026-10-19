// Scroll-triggered fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

// News: angeheftete Eintraege zuerst, danach nach Datum absteigend.
// Ohne JS gilt die Reihenfolge im HTML, deshalb dort schon sinnvoll sortieren.
const newsList = document.querySelector('.news-list');
if (newsList) {
  const pinned = (el) => (el.dataset.pinned === 'true' ? 1 : 0);
  Array.from(newsList.querySelectorAll(':scope > .news-item'))
    .sort((a, b) => {
      if (pinned(a) !== pinned(b)) return pinned(b) - pinned(a);
      return (b.dataset.date || '').localeCompare(a.dataset.date || '');
    })
    .forEach((el) => newsList.appendChild(el));
}

// Nav scroll state
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu toggle
const burger = document.querySelector('.nav-burger');
const links = document.querySelector('.nav-links');
if (burger) {
  burger.addEventListener('click', () => {
    links.classList.toggle('open');
  });
  // Close on link click
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// Footer-Jahr aus der Systemzeit des Besuchers; 2026 im HTML ist der Fallback,
// falls JS nicht laeuft.
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
