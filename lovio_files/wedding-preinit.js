(function () {
  document.documentElement.lang = "it";
  document.documentElement.className = document.documentElement.className
    .split(/\s+/)
    .filter(function (name) {
      return !/^wf-/.test(name) && name !== "w-mod-js" && name !== "w-mod-ix";
    })
    .join(" ");

  function setMeta(selector, value) {
    var node = document.querySelector(selector);
    if (node) node.setAttribute("content", value);
  }

  document.title = "Ennio e Miriam - Matrimonio";
  setMeta('meta[name="description"]', "Ennio e Miriam celebrano il loro matrimonio il 3 ottobre 2026 a Palermo e Partinico.");
  setMeta('meta[property="og:title"]', "Ennio e Miriam - Matrimonio");
  setMeta('meta[property="og:description"]', "3 ottobre 2026: cerimonia a Palermo e ricevimento a Baglio della Luna, Partinico.");
  setMeta('meta[property="twitter:title"]', "Ennio e Miriam - Matrimonio");
  setMeta('meta[property="twitter:description"]', "3 ottobre 2026: cerimonia a Palermo e ricevimento a Baglio della Luna, Partinico.");

  document.querySelectorAll("[data-w-id], .border-nav, .dropdown-list, .dropdown-icon, .overflow-portfolio").forEach(function (node) {
    node.removeAttribute("style");
  });

  document.querySelectorAll("[aria-hidden], [aria-expanded], [aria-controls], [aria-labelledby], [aria-pressed]").forEach(function (node) {
    if (!node.closest(".w-nav")) {
      node.removeAttribute("aria-hidden");
      node.removeAttribute("aria-expanded");
      node.removeAttribute("aria-controls");
      node.removeAttribute("aria-labelledby");
      node.removeAttribute("aria-pressed");
    }
  });

  function navLink(label, href) {
    return '<a href="' + href + '" class="nav-link w-nav-link">' + label + "</a>";
  }

  var navGrid = document.querySelector(".grid-navbar");
  if (navGrid) {
    navGrid.className = "w-layout-grid grid-navbar wedding-nav-grid";
    navGrid.innerHTML = [
      '<div class="wedding-nav-links">',
      navLink("La data", "#save-the-date"),
      navLink("Storia", "#storia"),
      navLink("Dettagli", "#dettagli"),
      "</div>",
      '<a href="#home" class="brand w-nav-brand"><div class="wedding-logo">E + M</div></a>',
      '<div class="wedding-nav-links right">',
      navLink("Galleria", "#galleria"),
      navLink("RSVP", "#rsvp"),
      navLink("Regali", "#regali"),
      "</div>"
    ].join("");
  }

  var mobileBrand = document.querySelector(".brand-mobile");
  if (mobileBrand) {
    mobileBrand.setAttribute("href", "#home");
    mobileBrand.innerHTML = '<div class="wedding-logo">E + M</div>';
  }

  var hero = document.querySelector(".section-hero");
  if (hero) {
    hero.id = "home";
    var subtitle = hero.querySelector(".subtitle");
    var heading = hero.querySelector(".heading-hero");
    var link = hero.querySelector(".link");
    if (subtitle) subtitle.innerHTML = "3 ottobre 2026<br>";
    if (heading) heading.innerHTML = "Ennio e<br>Miriam";
    if (link) {
      link.textContent = "Conferma la presenza";
      link.setAttribute("href", "#rsvp");
    }
  }

  var overflow = document.querySelector(".overflow");
  if (!overflow) return;

  Array.prototype.slice.call(overflow.children).forEach(function (child) {
    if (!child.classList.contains("section-hero")) child.remove();
  });

  overflow.insertAdjacentHTML("beforeend", [
    '<section id="save-the-date" class="section wedding-section compact reveal-on-scroll">',
      '<div class="content">',
        '<div class="block-heading margin">',
          '<div class="wedding-eyebrow">Salva la data</div>',
          '<h2 class="heading">Ci sposiamo</h2>',
          '<p class="wedding-lead">Sabato 3 ottobre 2026. La cerimonia sarà alle 11:00 presso la Chiesa Santa Caterina di Palermo; dalle 13:00 festeggeremo insieme a Baglio della Luna, Partinico.</p>',
        '</div>',
        '<div class="countdown-grid" aria-label="Countdown al matrimonio">',
          '<div class="countdown-card"><div class="countdown-number" data-countdown="days">0</div><div class="countdown-label">Giorni</div></div>',
          '<div class="countdown-card"><div class="countdown-number" data-countdown="hours">0</div><div class="countdown-label">Ore</div></div>',
          '<div class="countdown-card"><div class="countdown-number" data-countdown="minutes">0</div><div class="countdown-label">Minuti</div></div>',
          '<div class="countdown-card"><div class="countdown-number" data-countdown="seconds">0</div><div class="countdown-label">Secondi</div></div>',
        '</div>',
      '</div>',
    '</section>',
    '<section class="section wedding-section compact reveal-on-scroll" aria-label="Divisore decorativo">',
      '<div class="cut-divider">',
        '<div class="cut-line"></div>',
        '<div class="cut-center"><div class="scissors-mark" aria-hidden="true">✂</div><div class="wax-seal">E M</div></div>',
        '<div class="cut-line"></div>',
      '</div>',
    '</section>',
    '<section id="storia" class="section wedding-section reveal-on-scroll">',
      '<div class="content">',
        '<div class="block-heading margin">',
          '<div class="wedding-eyebrow">La nostra storia</div>',
          '<h2 class="heading">Un cammino verso il sì</h2>',
          '<p class="wedding-lead">Piccoli capitoli da completare con i vostri ricordi, mantenendo il ritmo verticale e romantico del template originale.</p>',
        '</div>',
        '<div class="story-timeline">',
          storyCard("Capitolo 01", "Il primo incontro", "Un inizio semplice, una conversazione rimasta nel cuore e la sensazione che qualcosa di bello stesse per nascere."),
          storyCard("Capitolo 02", "I primi passi insieme", "Passeggiate, risate e quei dettagli quotidiani che hanno trasformato due strade in una direzione comune."),
          storyCard("Capitolo 03", "Il primo viaggio", "Una meta speciale, tante foto da riguardare e la certezza di saper condividere anche l'avventura."),
          storyCard("Capitolo 04", "La proposta", "Un momento intimo, emozionato e pieno di futuro: il giorno in cui il per sempre ha preso forma."),
          storyCard("Capitolo 05", "Verso il matrimonio", "Famiglia, amici, preparativi e l'attesa felice di ritrovarci tutti insieme il 3 ottobre."),
        '</div>',
      '</div>',
    '</section>',
    '<section id="dettagli" class="section wedding-section alt reveal-on-scroll">',
      '<div class="content">',
        '<div class="block-heading margin">',
          '<div class="wedding-eyebrow">Dettagli del matrimonio</div>',
          '<h2 class="heading">Tutto quello che serve sapere</h2>',
        '</div>',
        '<div class="details-grid">',
          detailCard("Data e orari", "Sabato 3 ottobre 2026<br>Cerimonia alle 11:00<br>Ricevimento dalle 13:00 alle 19:00"),
          detailCard("Cerimonia", "Chiesa Santa Caterina di Palermo<br>Un momento raccolto per iniziare insieme la giornata."),
          detailCard("Ricevimento", "Baglio della Luna, Partinico<br>Pranzo, brindisi e festa fino al tramonto."),
          detailCard("Dress code", "Elegante da cerimonia. Scegliete colori e tessuti comodi per una giornata siciliana di inizio ottobre."),
          '<div class="wedding-card"><h3 class="wedding-card-title">Programma</h3><ol class="schedule-list"><li>11:00 - Cerimonia</li><li>13:00 - Arrivo a Baglio della Luna</li><li>13:30 - Pranzo e festeggiamenti</li><li>19:00 - Saluti finali</li></ol></div>',
          '<div class="wedding-card map-card"><h3 class="wedding-card-title">Mappa</h3><p class="wedding-card-text">Qui verrà inserito l\'embed della mappa con le indicazioni per la chiesa e la location.</p><div class="map-placeholder">Placeholder mappa</div></div>',
        '</div>',
      '</div>',
    '</section>',
    '<section id="galleria" class="section wedding-section reveal-on-scroll">',
      '<div class="content">',
        '<div class="block-heading margin">',
          '<div class="wedding-eyebrow">Galleria fotografica</div>',
          '<h2 class="heading">Momenti e luoghi</h2>',
          '<p class="wedding-lead">Immagini temporanee da sostituire con scatti della coppia, della cerimonia e della location.</p>',
        '</div>',
        '<div class="gallery-grid">',
          galleryItem("610dee1a9558a9c39348d5d3_portfolio_1.jpg", "Placeholder romantico 1", "tall"),
          galleryItem("610dede8766d49ed3a2300f3_portfolio_2.jpg", "Placeholder romantico 2", "wide"),
          galleryItem("610dedc29c43a564818d5bd1_portfolio_3.jpg", "Placeholder romantico 3", "tall"),
          galleryItem("610ded65ec6be73dc143021b_portfolio_4.jpg", "Placeholder romantico 4", ""),
          galleryItem("610f06acf7ff776a6ec067c3_instagram_1.jpg", "Placeholder location 1", "wide"),
          galleryItem("610f06ad78b53c69f4cfd1b6_instagram_4.jpg", "Placeholder location 2", "tall"),
          galleryItem("610c80ecf92b9227f9cf593e_img_1.jpg", "Placeholder coppia 1", ""),
          galleryItem("610c80ec3798f1029502d222_img_3.jpg", "Placeholder coppia 2", "wide"),
        '</div>',
      '</div>',
    '</section>',
    '<section id="rsvp" class="section wedding-section alt reveal-on-scroll">',
      '<div class="content">',
        '<div class="block-heading margin">',
          '<div class="wedding-eyebrow">RSVP</div>',
          '<h2 class="heading">Conferma la presenza</h2>',
          '<p class="wedding-lead">Il form è dimostrativo: mostra una conferma in pagina e non invia ancora i dati.</p>',
        '</div>',
        '<div class="rsvp-panel">',
          '<form class="rsvp-form" id="wedding-rsvp-form">',
            formField("Nome e cognome", "name", "text", "Il tuo nome", true),
            formField("Email", "email", "email", "nome@email.com", true),
            '<div class="form-field"><label for="attendance">Parteciperai?</label><select id="attendance" name="attendance" required><option value="">Seleziona</option><option>Sì, ci sarò</option><option>No, non potrò esserci</option></select></div>',
            '<div class="form-field"><label for="plus-one">Accompagnatore</label><select id="plus-one" name="plus-one"><option>Nessun accompagnatore</option><option>Verrò con un accompagnatore</option></select></div>',
            '<div class="form-field full"><label for="dietary">Note alimentari</label><textarea id="dietary" name="dietary" placeholder="Allergie, intolleranze o preferenze"></textarea></div>',
            '<div class="form-field full rsvp-actions"><button type="submit" class="button w-button">Invia conferma</button><p class="rsvp-success" id="rsvp-success" hidden>Grazie, la tua conferma è stata registrata in questa anteprima.</p></div>',
          '</form>',
        '</div>',
      '</div>',
    '</section>',
    '<section id="regali" class="section wedding-section reveal-on-scroll">',
      '<div class="content">',
        '<div class="gift-panel">',
          '<div class="wedding-eyebrow">Regali</div>',
          '<h2 class="gift-title">Non sai cosa regalarci?</h2>',
          '<p class="gift-text">Regalaci il viaggio di nozze: Thailandia / Indonesia / Perù / Polinesia 2027 (da definire).</p>',
          '<div class="gift-route">Thailandia · Indonesia · Perù · Polinesia</div>',
        '</div>',
      '</div>',
    '</section>',
    '<footer class="section-footer wedding-footer reveal-on-scroll">',
      '<div class="content">',
        '<div class="border-footer"></div>',
        '<div class="footer-initials">E + M</div>',
        '<div class="footer-date">3 ottobre 2026</div>',
        '<div class="footer-love">Made with love</div>',
      '</div>',
    '</footer>'
  ].join(""));

  function storyCard(date, title, text) {
    return '<article class="story-card"><div class="story-date">' + date + '</div><h3 class="story-title">' + title + '</h3><p class="story-text">' + text + '</p></article>';
  }

  function detailCard(title, text) {
    return '<div class="wedding-card"><h3 class="wedding-card-title">' + title + '</h3><p class="wedding-card-text">' + text + '</p></div>';
  }

  function galleryItem(file, alt, extraClass) {
    return '<figure class="gallery-item ' + extraClass + '"><img src="lovio_files/' + file + '" alt="' + alt + '" loading="lazy"></figure>';
  }

  function formField(label, name, type, placeholder, required) {
    return '<div class="form-field"><label for="' + name + '">' + label + '</label><input id="' + name + '" name="' + name + '" type="' + type + '" placeholder="' + placeholder + '"' + (required ? " required" : "") + "></div>";
  }
})();
