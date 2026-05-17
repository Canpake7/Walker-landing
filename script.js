const counters = document.querySelectorAll("[data-count]");

const formatNumber = (value) => new Intl.NumberFormat("en-US").format(value);

const animateCounter = (element) => {
  const target = Number(element.dataset.count || 0);
  const duration = 1200;
  const startedAt = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = formatNumber(Math.round(target * eased));

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 },
);

counters.forEach((counter) => observer.observe(counter));

const form = document.querySelector(".signup-form");
const status = document.querySelector(".form-status");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const email = String(data.get("email") || "").trim();

  if (!email) {
    status.textContent = "Add an email and Walker can keep you posted.";
    return;
  }

  status.textContent = "Thanks. This static page is ready for a real signup endpoint.";
  form.reset();
});
