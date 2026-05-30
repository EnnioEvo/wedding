(function () {
  var countdownRoot = document.querySelector("[data-target-date]");
  var targetDate = new Date(
    countdownRoot ? countdownRoot.getAttribute("data-target-date") : "2026-10-17T11:00:00+02:00"
  );
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

  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      var openedButton = document.querySelector(".w-nav-button.w--open");
      if (openedButton) openedButton.click();
    });
  });

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

  document.querySelectorAll("[data-copy-value]").forEach(function (button) {
    button.addEventListener("click", function () {
      copyText(button.getAttribute("data-copy-value") || "").then(function () {
        var originalLabel = button.getAttribute("aria-label") || "Copia";
        var originalTitle = button.getAttribute("title") || "Copia";
        var feedback = button.parentElement
          ? button.parentElement.querySelector("[data-copy-feedback]")
          : null;

        if (button.copyFeedbackTimeout) {
          window.clearTimeout(button.copyFeedbackTimeout);
        }

        button.setAttribute("aria-label", "Copiato");
        button.setAttribute("title", "Copiato");
        button.classList.add("is-copied");

        if (feedback) {
          feedback.textContent = "Copiato!";
          feedback.hidden = false;
        }

        button.copyFeedbackTimeout = window.setTimeout(function () {
          button.setAttribute("aria-label", originalLabel);
          button.setAttribute("title", originalTitle);
          button.classList.remove("is-copied");

          if (feedback) {
            feedback.textContent = "";
            feedback.hidden = true;
          }
        }, 1600);
      });
    });
  });

  if (window.location.hash) {
    window.setTimeout(function () {
      var target = document.querySelector(window.location.hash);
      if (target) {
        target.classList.add("is-visible");
        target.scrollIntoView({ block: "start" });
      }
    }, 150);
  }

  initMobileHoneymoonTilt();

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

  function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value).catch(function () {
        return copyTextFallback(value);
      });
    }

    return copyTextFallback(value);
  }

  function copyTextFallback(value) {
    var input = document.createElement("textarea");
    input.value = value;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    return Promise.resolve();
  }

  function initMobileHoneymoonTilt() {
    var cards = Array.prototype.slice.call(document.querySelectorAll(".gift-honeymoon-card"));
    if (!cards.length || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var mobileQuery = window.matchMedia("(max-width: 767px)");
    var observer = null;

    function resetCards() {
      cards.forEach(function (card) {
        card.classList.remove("is-mobile-tilt-ready");
        card.classList.remove("is-mobile-tilted");
      });
    }

    function enableTilt() {
      cards.forEach(function (card) {
        card.classList.add("is-mobile-tilt-ready");
      });

      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-mobile-tilted", entry.isIntersecting && entry.intersectionRatio >= 0.35);
        });
      }, { threshold: [0, 0.35] });

      cards.forEach(function (card) {
        observer.observe(card);
      });
    }

    function setTiltEnabled(isEnabled) {
      if (observer) {
        observer.disconnect();
        observer = null;
      }

      resetCards();
      if (isEnabled) enableTilt();
    }

    setTiltEnabled(mobileQuery.matches);

    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener("change", function (event) {
        setTiltEnabled(event.matches);
      });
    } else if (mobileQuery.addListener) {
      mobileQuery.addListener(function (event) {
        setTiltEnabled(event.matches);
      });
    }
  }
})();
