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
      navLink("Regali", "#regali"),
      navLink("La tua conferma", "#rsvp"),
      navLink("Galleria", "#galleria"),
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
      link.textContent = "Conferma la tua presenza";
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
    '<div class="wedding-eyebrow">Save the date</div>',
    '<h2 class="heading">Ci sposiamo<br>Sabato 3 ottobre 2026.</h2>',
    '<p class="wedding-lead">La cerimonia sarà alle 11:00 presso la Chiesa Santa Caterina di Palermo. <br> Dalle 13:00 festeggeremo insieme a Baglio della Luna, Partinico.</p>',
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
    storyFeature("03", "Le vacanze insieme", "Strade nuove, stesso passo", "Viaggiare ci ha insegnato a guardare nella stessa direzione, tra partenze, ritorni e foto che raccontano più di mille parole.", "pictures/photos/03_le_vacanze_assieme.jpeg", false, "lovio_files/610c8b9392065e16f1e8152e_flower_5.png", "flower---a"),
    storyFeature("04", "Il trasferimento a Roma", "Una nuova città", "Roma è stata una scelta importante: un sogno condiviso, una nuova routine e un altro pezzo della nostra storia.", "pictures/photos/04_il_trasferimento_a_roma.jpeg", true, "lovio_files/610b43d611194a874e2d3f7f_flower_2.png", "flower---b"),
    storyFeature("05", "Un nuovo quotidiano", "I nostri primi mobili Ikea", "Abbiamo imparato a condividere la semplicità della vita quotidiana.", "pictures/photos/05_i_nostri_primi_mobili_ikea.jpeg", false, "lovio_files/610c8b9392065e16f1e8152e_flower_5.png", "flower---b"),
    storyFeature("06", "Il nostro presente", "La vita a Roma", "Tra lavoro, casa e progetti, Roma è diventata il posto da cui guardare al futuro e prepararci al nostro sì.", "pictures/photos/06_la_vita_a_roma.jpeg", true, "lovio_files/610b43d611194a874e2d3f7f_flower_2.png", "flower---a"),
    storyFeature("07", "Ha detto sì", "La proposta", "La decisione di passare il resto della nostra vita insieme.", "pictures/photos/07d_la_proposta.jpeg", false, "lovio_files/610c8b9392065e16f1e8152e_flower_5.png", "flower---a"),
    '<section id="dettagli" class="section wedding-section alt reveal-on-scroll">',
    '<div class="content">',
    '<div class="block-heading margin">',
    '<div class="wedding-eyebrow">Dettagli del matrimonio</div>',
    '<h2 class="heading">Dove e quando</h2>',
    '</div>',
    '<div class="details-grid">',
    detailCard("Data e orari", "Sabato 3 ottobre 2026<br>Cerimonia alle 11:00<br>Ricevimento dalle 13:00 alle 19:00"),
    // detailCard("Cerimonia", "Chiesa Santa Caterina di Palermo<br>Un momento raccolto per iniziare insieme la giornata."),
    '<div class="wedding-card map-card"><h3 class="wedding-card-title">Cerimonia</h3><p class="wedding-card-text"> <i>La nostra promessa</i><br>Chiesa Santa Caterina di Palermo<br>P.za Bellini, 1, 90133 Palermo PA</p><div class="map-placeholder">' + mapChurchFrame() + '</div></div>',
    '<div class="wedding-card map-card"><h3 class="wedding-card-title">Ricevimento</h3><p class="wedding-card-text"> <i>Pranzo, brindisi e festa fino al tramonto.</i><br>Baglio della Luna, Partinico<br>Via La Ghiaia, 7, 54021 Bagnone MS</p><div class="map-placeholder">' + mapWeddingFrame() + '</div></div>',

    '</div>',
    '</div>',
    '</section>',
    '<section id="regali" class="section wedding-section reveal-on-scroll">',
    '<div class="content">',
    '<div class="gift-panel">',
    '<div class="wedding-eyebrow">Regali</div>',
    '<h2 class="gift-title">La vostra presenza è il regalo più grande!</h2>',
    '<p class="gift-text gift-intro">Ma se vuoi contribuire al nostro nuovo inizio assieme, stiamo sognando un viaggio di nozze esotico per il 2027 tra queste mete meravigliose:</p>',
    '<div class="gift-destinations" aria-label="Mete del viaggio di nozze">',
    giftDestination("🌴", "Thailandia"),
    giftDestination("🌺", "Indonesia"),
    giftDestination("🦙", "Perù"),
    giftDestination("🌊", "Polinesia"),
    '</div>',
    '<div class="gift-bank">',
    giftCopyRow("IBAN", "IT09 W036 6901 6002 9539 2512 690"),
    giftCopyRow("Intestatario", "Ennio Filicicchia & Maria Corsale"),
    '</div>',
    '</div>',
    '</div>',
    '</section>',
    '<section id="rsvp" class="section wedding-section alt reveal-on-scroll">',
    '<div class="content">',
    '<div class="block-heading margin">',
    '<div class="wedding-eyebrow">La tua conferma</div>',
    '<h2 class="heading">Conferma la tua presenza</h2>',
    '<p class="rsvp-deadline">Entro il 31 Ago 2026</p>',
    '</div>',
    '<div class="rsvp-panel">',
    '<form class="rsvp-form" id="wedding-rsvp-form">',
    formField("Nome e cognome", "name", "text", "Il tuo nome", true),
    '<div class="form-field"><label for="attendance">Parteciperai?</label><select id="attendance" name="attendance" required><option value="">Seleziona</option><option>✅ Sì ci sarò 😎</option><option>❌ No purtroppo non riuscirò 😞</option></select></div>',
    '<div class="form-field full"><label for="confirming-for">Per chi altri stai confermando?</label><textarea id="confirming-for" name="confirming-for" placeholder="Nomi di familiari, accompagnatori o persone incluse nella conferma"></textarea></div>',
    '<div class="form-field full"><label for="dietary">Note alimentari</label><textarea id="dietary" name="dietary" placeholder="Allergie, intolleranze o preferenze"></textarea></div>',
    '<div class="form-field full rsvp-actions"><button type="submit" class="button w-button">Invia conferma</button><p class="rsvp-success" id="rsvp-success" hidden>Grazie, la tua conferma è stata registrata in questa anteprima.</p></div>',
    '</form>',
    '</div>',
    '</div>',
    '</section>',
    '<section id="galleria" class="section wedding-section reveal-on-scroll">',
    '<div class="content">',
    '<div class="block-heading margin">',
    '<div class="wedding-eyebrow">Se sei arrivato a questo punto...</div>',
    '<h2 class="heading">Ecco altre foto bonus!</h2>',
    // '<p class="wedding-lead">Immagini temporanee da sostituire con scatti della coppia, della cerimonia e della location.</p>',
    '</div>',
    '<div class="gallery-grid" data-gallery-dir="lovio_files/pictures/photos/gallery/" data-gallery-fallback="WhatsApp Image 2026-05-03 at 15.03.38.jpeg|WhatsApp Image 2026-05-03 at 15.03.39.jpeg|WhatsApp Image 2026-05-03 at 15.03.41b.jpeg|WhatsApp Image 2026-05-03 at 15.03.43.jpeg|WhatsApp Image 2026-05-03 at 15.03.46b.jpeg|WhatsApp Image 2026-05-03 at 15.03.46c.jpeg"></div>',
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

  function giftDestination(icon, label) {
    return '<div class="gift-destination"><div class="gift-destination-icon" aria-hidden="true">' + icon + '</div><div class="gift-destination-label">' + label + '</div></div>';
  }

  function giftCopyRow(label, value) {
    return '<div class="gift-copy-row"><div><div class="gift-copy-label">' + escapeHtml(label) + '</div><div class="gift-copy-value">' + escapeHtml(value) + '</div></div><button class="gift-copy-button" type="button" data-copy-value="' + escapeHtml(value) + '" aria-label="Copia ' + escapeHtml(label) + '" title="Copia"><img src="lovio_files/copy.svg" alt="" aria-hidden="true"></button></div>';
  }

  function formField(label, name, type, placeholder, required) {
    return '<div class="form-field"><label for="' + name + '">' + label + '</label><input id="' + name + '" name="' + name + '" type="' + type + '" placeholder="' + placeholder + '"' + (required ? " required" : "") + "></div>";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function mapFrame(src) {
    return '<iframe src="' + src + '" width="300" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
  }
  function mapChurchFrame() {
    // Chiesa di Santa Caterina
    return mapFrame("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12556.28587205697!2d13.345676689877665!3d38.11527170000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1319e58b0e28c325%3A0x5037f4ed3b7411d1!2sChiesa%20e%20Monastero%20di%20Santa%20Caterina%20d&#39;Alessandria!5e0!3m2!1sit!2sit!4v1777821141426!5m2!1sit!2sit");
  }

  function mapWeddingFrame() {
    // Baglio della Luna
    return mapFrame("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2856.004552612274!2d9.987081411733085!3d44.2892952109381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d504fd2efcf30f%3A0x34dfe6055358f291!2sBaglio%20della%20Luna%20Resort!5e0!3m2!1sit!2sit!4v1777821098365!5m2!1sit!2sit");
  }
})();
