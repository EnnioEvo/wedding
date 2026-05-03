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
      navLink("Regali", "#regali"),
      navLink("La tua conferma", "#rsvp"),
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

    forceImage(hero.querySelector(".overflow-hero---b-left .image-hero---b"), "lovio_files/pictures/photos/left.jpeg");
    forceImage(hero.querySelector(".overflow-hero---b-right .image-hero---b"), "lovio_files/pictures/photos/right.jpeg");
    forceImage(hero.querySelector(".overflow-hero---b:not(.overflow-hero---b-left):not(.overflow-hero---b-right) .image-hero---b"), "lovio_files/pictures/photos/central.jpeg");
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
          '<p class="wedding-lead">Sabato 3 ottobre 2026.<br> La cerimonia sarà alle 11:00 presso la Chiesa Santa Caterina di Palermo. <br> Dalle 13:00 festeggeremo insieme a Baglio della Luna, Partinico.</p>',
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
        '<div class="scissors-mark" aria-hidden="true">✂</div>',
        '<div class="cut-line"></div>',
        '<img class="wax-seal" src="lovio_files/pictures/seal.png" alt="" loading="lazy">',
        '<div class="cut-line"></div>',
      '</div>',
    '</section>',
    '<section id="storia" class="section wedding-section reveal-on-scroll">',
      '<div class="content">',
        '<div class="block-heading margin">',
          '<div class="wedding-eyebrow">La nostra storia</div>',
          '<h2 class="heading">Un cammino verso il sì</h2>',
    '<p class="wedding-lead">I luoghi, i cambiamenti e i ricordi che ci hanno accompagnati fino a questo giorno.</p>',
        '</div>',
      '</div>',
    '</section>',
    storyFeature("01", "L'inizio", "Il nostro inizio", "Da un primo incontro semplice è nato qualcosa che, giorno dopo giorno, ha trovato spazio nella vita di entrambi.", "pictures/photos/01_inizio.jpeg", false, "lovio_files/610c8b9392065e16f1e8152e_flower_5.png", "flower---a"),
    storyFeature("02", "La vita in Sicilia", "Un rapporto a (poca) distanza", "Tra treni e autostrade, viaggiavamo tra Termini e Palermo per stare assieme: famiglia, amici e piccoli momenti diventati ricordi.", "pictures/photos/02_la_vita_in_sicilia.jpeg", true, "lovio_files/610b43d611194a874e2d3f7f_flower_2.png", "flower---b"),
    storyFeature("03", "Le vacanze insieme", "Strade nuove, stesso passo", "Viaggiare ci ha insegnato a guardarci nella stessa direzione, tra partenze, ritorni e foto che raccontano più di mille parole.", "pictures/photos/03_le_vacanze_assieme.jpeg", false, "lovio_files/610c8b9392065e16f1e8152e_flower_5.png", "flower---a"),
    storyFeature("04", "Il trasferimento a Roma", "Una nuova città", "Roma è stata una scelta importante: un cambiamento condiviso, una nuova routine e un altro pezzo della nostra storia.", "pictures/photos/04_il_trasferimento_a_roma.jpeg", true, "lovio_files/610b43d611194a874e2d3f7f_flower_2.png", "flower---b"),
    storyFeature("05","Un nuovo quotidiano", "I nostri primi mobili Ikea",  "Abbiamo imparato a condividere la semplicità della vita quotidiana.", "pictures/photos/05_i_nostri_primi_mobili_ikea.jpeg", false, "lovio_files/610c8b9392065e16f1e8152e_flower_5.png", "flower---a"),
    storyFeature("06","Il nostro presente", "La vita a Roma",  "Tra lavoro, casa e progetti, Roma è diventata il posto da cui guardare al futuro e prepararci al nostro sì.", "pictures/photos/06_la_vita_a_roma.jpeg", true, "lovio_files/610c8b9392065e16f1e8152e_flower_5.png", "flower---a"),
    storyFeature("07", "Ha detto sì", "La proposta", "La decisione di passare il resto della nostra vita insieme.", "pictures/photos/07d_la_proposta.jpeg", false, "lovio_files/610c8b9392065e16f1e8152e_flower_5.png", "flower---a"),
    '<section id="dettagli" class="section wedding-section alt reveal-on-scroll">',
      '<div class="content">',
        '<div class="block-heading margin">',
          '<div class="wedding-eyebrow">Dettagli del matrimonio</div>',
          '<h2 class="heading">Tutto quello che serve sapere</h2>',
        '</div>',
        '<div class="details-grid">',
          detailCard("Data e orari", "Sabato 3 ottobre 2026<br>Cerimonia alle 11:00<br>Ricevimento dalle 13:00 alle 19:00"),
    // detailCard("Cerimonia", "Chiesa Santa Caterina di Palermo<br>Un momento raccolto per iniziare insieme la giornata."),
    // detailCard("Ricevimento", "Baglio della Luna, Partinico<br>Pranzo, brindisi e festa fino al tramonto."),
    // detailCard("Dress code", "Elegante da cerimonia. Scegliete colori e tessuti comodi per una giornata siciliana di inizio ottobre."),
    // '<div class="wedding-card"><h3 class="wedding-card-title">Programma</h3><ol class="schedule-list"><li>11:00 - Cerimonia</li><li>13:00 - Arrivo a Baglio della Luna</li><li>13:30 - Pranzo e festeggiamenti</li><li>19:00 - Saluti finali</li></ol></div>',
    '<div class="wedding-card map-card"><h3 class="wedding-card-title">Cerimonia</h3><p class="wedding-card-text">Chiesa Santa Caterina di Palermo<br>Un momento raccolto per iniziare insieme la giornata.</p><div class="map-placeholder">Placeholder mappa</div></div>',
    '<div class="wedding-card map-card"><h3 class="wedding-card-title">Ricevimento</h3><p class="wedding-card-text">Baglio della Luna, Partinico<br>Pranzo, brindisi e festa fino al tramonto.</p><div class="map-placeholder">Placeholder mappa</div></div>',

    '</div>',
      '</div>',
    '</section>',
    '<section id="galleria" class="section wedding-section reveal-on-scroll">',
      '<div class="content">',
        '<div class="block-heading margin">',
          '<div class="wedding-eyebrow">Galleria fotografica</div>',
          '<h2 class="heading">Momenti e luoghi</h2>',
          // '<p class="wedding-lead">Immagini temporanee da sostituire con scatti della coppia, della cerimonia e della location.</p>',
        '</div>',
        '<div class="gallery-grid" data-gallery-dir="lovio_files/pictures/photos/gallery/" data-gallery-fallback="WhatsApp Image 2026-05-03 at 15.03.38.jpeg|WhatsApp Image 2026-05-03 at 15.03.39.jpeg|WhatsApp Image 2026-05-03 at 15.03.41b.jpeg|WhatsApp Image 2026-05-03 at 15.03.43.jpeg|WhatsApp Image 2026-05-03 at 15.03.46b.jpeg|WhatsApp Image 2026-05-03 at 15.03.46c.jpeg"></div>',
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
    '<section id="rsvp" class="section wedding-section alt reveal-on-scroll">',
      '<div class="content">',
        '<div class="block-heading margin">',
          '<div class="wedding-eyebrow">La tua conferma</div>',
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
    '<footer class="section-footer wedding-footer reveal-on-scroll">',
      '<div class="content">',
        '<div class="border-footer"></div>',
        '<div class="footer-initials">E + M</div>',
        '<div class="footer-date">3 ottobre 2026</div>',
        '<div class="footer-love">Made with love</div>',
      '</div>',
    '</footer>'
  ].join(""));

  function forceImage(node, src) {
    if (!node) return;
    node.setAttribute("src", src);
    node.removeAttribute("srcset");
    node.removeAttribute("sizes");
    node.setAttribute("loading", "eager");
    node.style.opacity = "1";
  }

  function storyFeature(number, eyebrow, title, text, image, imageFirst, flowerSrc, flowerClass) {
    var textBlock = [
      '<div class="block-text">',
      '<img src="lovio_files/610b3993bc98ff5499b83f82_subtitle.png" loading="lazy" alt="" width="62" class="image-subtitle">',
      '<div class="subtitle">Capitolo ' + number + '<br></div>',
      '<h2 class="heading">' + title + '</h2>',
      '<p class="paragraph"><strong>' + eyebrow + '.</strong> ' + text + '</p>',
      '</div>'
    ].join("");
    var imageBlock = [
      '<div class="block-image wedding-story-image">',
      '<div class="overflow-image">',
      '<img class="image" src="lovio_files/' + image + '" alt="' + title + '" loading="lazy">',
      '</div>',
      '<img src="' + flowerSrc + '" loading="eager" alt="" class="' + flowerClass + '">',
      '</div>'
    ].join("");
    return [
      '<section class="section wedding-story-section reveal-on-scroll">',
      '<div class="content">',
      '<div class="w-layout-grid grid-2-columns">',
      imageFirst ? imageBlock : textBlock,
      imageFirst ? textBlock : imageBlock,
      '</div>',
      '</div>',
      '</section>'
    ].join("");
  }

  function detailCard(title, text) {
    return '<div class="wedding-card"><h3 class="wedding-card-title">' + title + '</h3><p class="wedding-card-text">' + text + '</p></div>';
  }

  function formField(label, name, type, placeholder, required) {
    return '<div class="form-field"><label for="' + name + '">' + label + '</label><input id="' + name + '" name="' + name + '" type="' + type + '" placeholder="' + placeholder + '"' + (required ? " required" : "") + "></div>";
  }
})();
