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

  renderGallery();

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

  function renderGallery() {
    var grid = document.querySelector("[data-gallery-dir]");
    if (!grid) return;

    var directory = grid.getAttribute("data-gallery-dir");
    var fallback = (grid.getAttribute("data-gallery-fallback") || "")
      .split("|")
      .filter(Boolean);

    loadGalleryFiles(directory)
      .then(function (files) {
        drawGallery(grid, directory, files.length ? files : fallback);
      })
      .catch(function () {
        drawGallery(grid, directory, fallback);
      });
  }

  function loadGalleryFiles(directory) {
    return window.fetch(directory)
      .then(function (response) {
        if (!response.ok) return [];
        return response.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var directoryUrl = new URL(directory, window.location.href);
        return Array.prototype.slice.call(doc.querySelectorAll("a"))
          .map(function (link) {
            return new URL(link.getAttribute("href"), directoryUrl);
          })
          .filter(function (url) {
            return url.pathname.indexOf(directoryUrl.pathname) === 0;
          })
          .map(function (url) {
            return decodeURIComponent(url.pathname.slice(directoryUrl.pathname.length));
          })
          .filter(function (name) {
            return name && !name.includes("/") && /\.(jpe?g|png|webp|gif)$/i.test(name);
          });
      });
  }

  function drawGallery(grid, directory, files) {
    if (!files.length) {
      grid.innerHTML = '<p class="gallery-empty">Aggiungi immagini nella cartella gallery.</p>';
      return;
    }

    grid.innerHTML = files.map(function (file, index) {
      var variant = index % 5 === 0 ? "tall" : index % 4 === 0 ? "wide" : "";
      var src = directory + encodeURIComponent(file).replace(/%2F/g, "/");
      return '<figure class="gallery-item ' + variant + '"><img src="' + src + '" alt="' + galleryAlt(file) + '" loading="lazy"></figure>';
    }).join("");
  }

  function galleryAlt(file) {
    return file
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
})();
