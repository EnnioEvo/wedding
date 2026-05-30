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

  var rsvpContent = window.WEDDING_CONTENT ? window.WEDDING_CONTENT.rsvp : null;
  var emailjsConfig = rsvpContent ? rsvpContent.emailjs : null;
  var form = document.getElementById("wedding-rsvp-form");
  var success = document.getElementById("rsvp-success");
  var error = document.getElementById("rsvp-error");
  var submitButton = form ? form.querySelector("[data-rsvp-submit]") : null;
  var participantList = form ? form.querySelector("[data-rsvp-participants]") : null;
  var addParticipantButton = form ? form.querySelector("[data-rsvp-add]") : null;
  var submitLabel = submitButton ? submitButton.textContent : "";

  if (form && participantList && addParticipantButton) {
    addParticipantButton.addEventListener("click", function () {
      addParticipantRow();
    });
  }

  if (form && success && error) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      hideRsvpStatus(success);
      hideRsvpStatus(error);

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      setRsvpSubmitting(true);

      sendRsvp(form, emailjsConfig)
        .then(function () {
          success.hidden = false;
          form.reset();
          resetAdditionalParticipants();
        })
        .catch(function (sendError) {
          console.error("RSVP email send failed", sendError);
          error.hidden = false;
        })
        .finally(function () {
          setRsvpSubmitting(false);
        });
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

  function sendRsvp(formNode, config) {
    if (!config || !config.serviceId || !config.templateId || !config.publicKey) {
      return Promise.reject(new Error("Missing EmailJS RSVP configuration."));
    }

    if (!window.emailjs || typeof window.emailjs.send !== "function") {
      return Promise.reject(new Error("EmailJS browser SDK is not available."));
    }

    return window.emailjs.send(
      config.serviceId,
      config.templateId,
      {
        name: getFormValue(formNode, "name"),
        message: formatRsvpMessage(formNode)
      },
      { publicKey: config.publicKey }
    );
  }

  function addParticipantRow() {
    if (!participantList) return;

    var participantNumber = getParticipantRows(form).length + 1;
    var row = document.createElement("div");
    var nameField = createParticipantField(
      "Nome " + participantNumber,
      "participant-name-" + participantNumber,
      "Nome e cognome",
      "data-rsvp-name"
    );
    var infoField = createParticipantField(
      "Informazione inutile",
      "participant-info-" + participantNumber,
      "Tipo: ti piace mangiare gli omogeneizzati",
      "data-rsvp-info"
    );
    var removeButton = document.createElement("button");

    row.className = "rsvp-participant-row has-remove";
    row.setAttribute("data-rsvp-participant", "");

    removeButton.className = "rsvp-remove-button";
    removeButton.type = "button";
    removeButton.textContent = "Rimuovi";
    removeButton.setAttribute("data-rsvp-remove", "");
    removeButton.setAttribute("aria-label", "Rimuovi Nome " + participantNumber);
    removeButton.addEventListener("click", function () {
      row.remove();
      renumberAdditionalParticipants();
    });

    row.appendChild(nameField);
    row.appendChild(infoField);
    row.appendChild(removeButton);
    participantList.appendChild(row);
  }

  function createParticipantField(label, name, placeholder, dataAttribute) {
    var field = document.createElement("div");
    var fieldLabel = document.createElement("label");
    var input = document.createElement("input");

    field.className = "form-field";
    fieldLabel.textContent = label;
    fieldLabel.setAttribute("for", name);
    input.id = name;
    input.name = name;
    input.type = "text";
    input.placeholder = placeholder;
    input.setAttribute(dataAttribute, "");

    field.appendChild(fieldLabel);
    field.appendChild(input);
    return field;
  }

  function resetAdditionalParticipants() {
    if (!participantList) return;
    participantList.innerHTML = "";
  }

  function renumberAdditionalParticipants() {
    if (!participantList) return;

    Array.prototype.slice.call(participantList.querySelectorAll("[data-rsvp-participant]")).forEach(function (row, index) {
      var participantNumber = index + 2;
      var nameInput = row.querySelector("[data-rsvp-name]");
      var nameLabel = nameInput && nameInput.parentElement ? nameInput.parentElement.querySelector("label") : null;
      var infoInput = row.querySelector("[data-rsvp-info]");
      var infoLabel = infoInput && infoInput.parentElement ? infoInput.parentElement.querySelector("label") : null;
      var removeButton = row.querySelector("[data-rsvp-remove]");

      updateParticipantControl(nameInput, nameLabel, "participant-name-" + participantNumber, "Nome " + participantNumber);
      updateParticipantControl(infoInput, infoLabel, "participant-info-" + participantNumber, "Informazione inutile");

      if (removeButton) {
        removeButton.setAttribute("aria-label", "Rimuovi Nome " + participantNumber);
      }
    });
  }

  function updateParticipantControl(input, label, id, labelText) {
    if (!input || !label) return;
    input.id = id;
    input.name = id;
    label.setAttribute("for", id);
    label.textContent = labelText;
  }

  function formatRsvpMessage(formNode) {
    return [
      "Presenza:",
      getFormValue(formNode, "attendance"),
      "",
      "Partecipanti:",
      formatParticipants(formNode),
      "",
      "Note alimentari:",
      getFormValue(formNode, "dietary") || "Non indicate",
      "",
      "Inviato il:",
      new Date().toLocaleString("it-IT", {
        dateStyle: "short",
        timeStyle: "short"
      })
    ].join("\n");
  }

  function formatParticipants(formNode) {
    var participantIndex = 0;

    return getParticipantRows(formNode).reduce(function (lines, row, index) {
      var nameInput = row.querySelector("[data-rsvp-name]");
      var infoInput = row.querySelector("[data-rsvp-info]");
      var name = nameInput ? nameInput.value.trim() : "";
      var info = infoInput ? infoInput.value.trim() : "";

      if (index > 0 && !name && !info) return lines;

      participantIndex += 1;
      lines.push(String(participantIndex) + ". " + (name || "Nome non indicato"));
      lines.push("   Cosa inutile: " + (info || "Non indicata"));
      lines.push("");
      return lines;
    }, []).join("\n").trim();
  }

  function getParticipantRows(formNode) {
    if (!formNode) return [];
    return Array.prototype.slice.call(formNode.querySelectorAll("[data-rsvp-participant]"));
  }

  function getFormValue(formNode, name) {
    var value = new FormData(formNode).get(name);
    return value ? String(value).trim() : "";
  }

  function setRsvpSubmitting(isSubmitting) {
    if (!submitButton) return;
    submitButton.disabled = isSubmitting;
    submitButton.textContent = isSubmitting && rsvpContent && rsvpContent.sending
      ? rsvpContent.sending
      : submitLabel;
  }

  function hideRsvpStatus(node) {
    node.hidden = true;
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
