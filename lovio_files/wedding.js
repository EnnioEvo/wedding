(function () {
  var targetDate = new Date("2026-10-03T11:00:00+02:00");
  var countdownNodes = {
    days: document.querySelector('[data-countdown="days"]'),
    hours: document.querySelector('[data-countdown="hours"]'),
    minutes: document.querySelector('[data-countdown="minutes"]'),
    seconds: document.querySelector('[data-countdown="seconds"]')
  };

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function updateCountdown() {
    var remaining = Math.max(0, targetDate.getTime() - Date.now());
    var totalSeconds = Math.floor(remaining / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    if (countdownNodes.days) countdownNodes.days.textContent = days;
    if (countdownNodes.hours) countdownNodes.hours.textContent = pad(hours);
    if (countdownNodes.minutes) countdownNodes.minutes.textContent = pad(minutes);
    if (countdownNodes.seconds) countdownNodes.seconds.textContent = pad(seconds);
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  var form = document.getElementById("wedding-rsvp-form");
  var success = document.getElementById("rsvp-success");
  if (form && success) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      success.hidden = false;
      form.reset();
    });
  }

  if (window.location.hash) {
    window.setTimeout(function () {
      var target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ block: "start" });
    }, 150);
  }

  var revealNodes = Array.prototype.slice.call(document.querySelectorAll(".reveal-on-scroll"));
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealNodes.forEach(function (node) {
      node.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealNodes.forEach(function (node) {
    observer.observe(node);
  });
})();
