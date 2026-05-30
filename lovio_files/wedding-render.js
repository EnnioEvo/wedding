(function () {
  var content = window.WEDDING_CONTENT;
  if (!content) return;

  document.documentElement.lang = "it";
  document.title = content.meta.title;
  setMeta('meta[name="description"]', content.meta.description);
  setMeta('meta[property="og:url"]', content.meta.url);
  setMeta('meta[property="og:title"]', content.meta.title);
  setMeta('meta[property="og:description"]', content.meta.ogDescription);
  setMeta('meta[property="og:image"]', content.meta.image);
  setMeta('meta[property="og:image:secure_url"]', content.meta.image);
  setMeta('meta[property="og:image:width"]', content.meta.imageWidth);
  setMeta('meta[property="og:image:height"]', content.meta.imageHeight);
  setMeta('meta[property="og:image:alt"]', content.meta.imageAlt);
  setMeta('meta[property="twitter:title"]', content.meta.title);
  setMeta('meta[property="twitter:description"]', content.meta.ogDescription);
  setMeta('meta[name="twitter:image"]', content.meta.image);
  setMeta('meta[name="twitter:image:alt"]', content.meta.imageAlt);

  renderNavigation();
  renderPage();

  function renderNavigation() {
    var navGrid = document.querySelector("[data-wedding-nav]");
    if (!navGrid) return;

    var middle = Math.ceil(content.nav.length / 2);
    navGrid.innerHTML = [
      '<div class="wedding-nav-links">',
      content.nav.slice(0, middle).map(navLink).join(""),
      "</div>",
      '<a href="#home" class="brand w-nav-brand"><div class="wedding-logo">E + M</div></a>',
      '<div class="wedding-nav-links right">',
      content.nav.slice(middle).map(navLink).join(""),
      "</div>"
    ].join("");
  }

  function renderPage() {
    var page = document.querySelector("[data-wedding-page]");
    if (!page) return;

    page.innerHTML = [
      heroSection(),
      saveTheDateSection(),
      dividerSection(),
      introSection("storia", content.storyIntro),
      content.story.map(storyFeature).join(""),
      introSection("luoghi", content.venuesIntro, "venue-heading-section"),
      content.venues.map(venueFeature).join(""),
      detailsSection(),
      giftSection(),
      rsvpSection(),
      gallerySection(),
      footerSection()
    ].join("");
  }

  function heroSection() {
    var hero = content.hero;
    return [
      '<section id="home" class="section-hero">',
      '<div class="content">',
      '<div class="hero-top">',
      '<div class="border-top"></div>',
      '<img src="' + hero.decor.rings + '" loading="lazy" alt="" width="62" class="image-subtitle">',
      '<div class="subtitle">' + hero.date + '<br></div>',
      '<h1 class="heading-hero">' + hero.title + '</h1>',
      '<a href="' + hero.ctaHref + '" class="link">' + hero.cta + '</a>',
      '<div class="border-down"></div>',
      "</div>",
      '<div data-w-id="a933ad68-d409-e29c-15f6-c3aeaee44bf7" class="hero---b">',
      '<div class="block-hero---b">',
      heroImage("overflow-hero---b-left", hero.images.left, "Ennio e Miriam", "a2887408-48c0-80f0-2d63-b3c74e04d9c6"),
      heroImage("", hero.images.center, "Ennio e Miriam", "a5a1e781-88d4-4a93-9d22-2794f016f784"),
      heroImage("overflow-hero---b-right", hero.images.right, "Ennio e Miriam", "48f4a930-f074-5407-ace1-02f74ffeeff3"),
      '<img src="' + hero.decor.leftFlower + '" loading="eager" alt="" class="flower-hero---b1">',
      '<img src="' + hero.decor.rightFlower + '" loading="eager" alt="" class="flower-hero---b2">',
      "</div>",
      "</div>",
      "</div>",
      "</section>"
    ].join("");
  }

  function heroImage(extraClass, src, alt, dataWId) {
    return [
      '<div class="' + (extraClass || "overflow-hero---b") + '">',
      '<img data-w-id="' + dataWId + '" class="image-hero---b" src="' + src + '" alt="' + alt + '" loading="eager">',
      "</div>"
    ].join("");
  }

  function saveTheDateSection() {
    var section = content.saveTheDate;
    return [
      '<section id="save-the-date" class="section wedding-section compact reveal-on-scroll" data-target-date="' + section.targetDate + '">',
      '<div class="content">',
      '<div class="block-heading margin">',
      eyebrow(section.eyebrow),
      '<h2 class="heading">' + section.title + "</h2>",
      '<p class="wedding-lead">' + section.text + "</p>",
      "</div>",
      '<div class="countdown-grid" aria-label="Countdown al matrimonio">',
      countdownCard("days", "Giorni"),
      countdownCard("hours", "Ore"),
      countdownCard("minutes", "Minuti"),
      countdownCard("seconds", "Secondi"),
      "</div>",
      "</div>",
      "</section>"
    ].join("");
  }

  function countdownCard(key, label) {
    return [
      '<div class="countdown-card">',
      '<div class="countdown-number" data-countdown="' + key + '">0</div>',
      '<div class="countdown-label">' + label + "</div>",
      "</div>"
    ].join("");
  }

  function dividerSection() {
    return [
      '<section class="section wedding-section compact save-date-divider reveal-on-scroll" aria-label="Divisore decorativo">',
      '<div class="cut-divider">',
      '<div class="scissors-mark" aria-hidden="true">✂</div>',
      '<div class="cut-line"></div>',
      '<img class="wax-seal" src="' + content.decor.seal + '" alt="" loading="lazy">',
      '<div class="cut-line"></div>',
      "</div>",
      "</section>"
    ].join("");
  }

  function introSection(id, section, extraClass) {
    return [
      '<section id="' + id + '" class="section wedding-section ' + (extraClass || "") + ' reveal-on-scroll">',
      '<div class="content">',
      '<div class="block-heading margin">',
      eyebrow(section.eyebrow),
      '<h2 class="heading">' + escapeHtml(section.title) + "</h2>",
      '<p class="wedding-lead">' + escapeHtml(section.text) + "</p>",
      "</div>",
      "</div>",
      "</section>"
    ].join("");
  }

  function storyFeature(item, index) {
    var textBlock = [
      '<div class="block-text">',
      subtitleImage(),
      '<div class="subtitle">Capitolo ' + escapeHtml(item.number) + '<br></div>',
      '<h2 class="heading">' + escapeHtml(item.title) + "</h2>",
      '<p class="paragraph"><strong>' + escapeHtml(item.eyebrow) + ".</strong> " + escapeHtml(item.text) + "</p>",
      "</div>"
    ].join("");
    return featureSection(textBlock, imageBlock(item, index), item.imageFirst);
  }

  function venueFeature(item, index) {
    var textBlock = [
      '<div class="block-text venue-copy">',
      subtitleImage(),
      '<div class="subtitle">' + escapeHtml(item.eyebrow) + '<br></div>',
      '<h2 class="heading">' + escapeHtml(item.title) + "</h2>",
      '<p class="paragraph">' + escapeHtml(item.text) + "</p>",
      "</div>"
    ].join("");
    return featureSection(textBlock, imageBlock(item, index, "venue-image"), item.imageFirst, "venue-section");
  }

  function featureSection(textBlock, imageBlockHtml, imageFirst, sectionClass) {
    return [
      '<section class="section wedding-story-section ' + (sectionClass || "") + ' reveal-on-scroll">',
      '<div class="content">',
      '<div class="w-layout-grid grid-2-columns ' + (sectionClass ? "venue-grid" : "") + '">',
      imageFirst ? imageBlockHtml : textBlock,
      imageFirst ? textBlock : imageBlockHtml,
      "</div>",
      "</div>",
      "</section>"
    ].join("");
  }

  function imageBlock(item, index, imageClass) {
    var flowerClass = index % 2 === 0 ? "flower---a" : "flower---b";
    var flowerSrc = index % 2 === 0 ? content.decor.flowerA : content.decor.flowerB;
    return [
      '<div class="block-image wedding-story-image ' + (imageClass ? "venue-image-block" : "") + '">',
      '<div class="overflow-image">',
      '<img class="image ' + (imageClass || "") + '" src="' + item.image + '" alt="' + escapeHtml(item.title) + '" loading="lazy">',
      "</div>",
      '<img src="' + flowerSrc + '" loading="eager" alt="" class="' + flowerClass + '">',
      "</div>"
    ].join("");
  }

  function detailsSection() {
    var details = content.details;
    return [
      '<section id="dettagli" class="section wedding-section alt reveal-on-scroll">',
      '<div class="content">',
      '<div class="block-heading margin">',
      eyebrow(details.eyebrow),
      '<h2 class="heading">' + escapeHtml(details.title) + "</h2>",
      "</div>",
      '<div class="details-grid">',
      details.cards.map(detailCard).join(""),
      "</div>",
      "</div>",
      "</section>"
    ].join("");
  }

  function detailCard(card) {
    return [
      '<div class="wedding-card ' + (card.map ? "map-card" : "") + '">',
      '<h3 class="wedding-card-title">' + escapeHtml(card.title) + "</h3>",
      '<p class="wedding-card-text">' + card.html + "</p>",
      card.map ? '<div class="map-placeholder">' + mapFrame(card.map) + "</div>" : "",
      "</div>"
    ].join("");
  }

  function giftSection() {
    var gift = content.gift;
    return [
      '<section id="regali" class="section wedding-section reveal-on-scroll">',
      '<div class="content">',
      '<div class="gift-panel">',
      '<div class="wedding-eyebrow gift-eyebrow">' + allowedInlineHtml(gift.eyebrow) + "</div>",
      '<h2 class="gift-title">' + escapeHtml(gift.title) + "</h2>",
      '<p class="gift-text gift-intro">' + allowedInlineHtml(gift.text) + "</p>",
      '<p class="gift-caption">' + allowedInlineHtml(gift.caption) + "</p>",
      '<div class="gift-honeymoon" aria-label="Viaggio di nozze in Thailandia">',
      gift.honeymoonImages.map(honeymoonImage).join(""),
      "</div>",
      '<div class="gift-contribution">',
      '<h3 class="gift-contribution-title">' + escapeHtml(gift.giftTitle) + "</h3>",
      '<p class="gift-contribution-text">' + allowedInlineHtml(gift.giftText) + "</p>",
      "</div>",
      '<details class="gift-bank-details gift-bank-details-visible" open>',
      '<summary aria-hidden="true" tabindex="-1"><span>Scopri come</span></summary>',
      '<div class="gift-bank">',
      gift.bank.map(giftCopyRow).join(""),
      "</div>",
      "</details>",
      "</div>",
      "</div>",
      "</section>"
    ].join("");
  }

  function honeymoonImage(image) {
    return [
      '<figure class="gift-honeymoon-card">',
      '<img src="' + image.src + '" alt="' + escapeHtml(image.alt) + '" loading="lazy">',
      "</figure>"
    ].join("");
  }

  function giftCopyRow(row) {
    return [
      '<div class="gift-copy-row">',
      "<div>",
      '<div class="gift-copy-label">' + escapeHtml(row.label) + "</div>",
      '<div class="gift-copy-value">' + escapeHtml(row.value) + "</div>",
      "</div>",
      '<div class="gift-copy-action">',
      '<button class="gift-copy-button" type="button" data-copy-value="' + escapeHtml(row.value) + '" aria-label="Copia ' + escapeHtml(row.label) + '" title="Copia">',
      '<img src="' + content.decor.copyIcon + '" alt="" aria-hidden="true">',
      "</button>",
      '<span class="gift-copy-feedback" data-copy-feedback role="status" aria-live="polite" hidden></span>',
      "</div>",
      "</div>"
    ].join("");
  }

  function rsvpSection() {
    var rsvp = content.rsvp;
    return [
      '<section id="rsvp" class="section wedding-section alt reveal-on-scroll">',
      '<div class="content">',
      '<div class="block-heading margin">',
      eyebrow(rsvp.eyebrow),
      '<h2 class="heading">' + escapeHtml(rsvp.title) + "</h2>",
      '<p class="rsvp-deadline">' + escapeHtml(rsvp.deadline) + "</p>",
      "</div>",
      '<div class="rsvp-panel">',
      '<form class="rsvp-form" id="wedding-rsvp-form">',
      '<div class="rsvp-participant-row is-primary" data-rsvp-participant>',
      formField("Nome e cognome", "name", "text", "Es: Mario Rossi", true, "data-rsvp-name"),
      formField("Dicci anche una cosa superflua \nda sapere su di te (Opzionale)", "participant-info-1", "text", "Tipo: sbagli spesso il verso della maglietta", false, "data-rsvp-info"),
      "</div>",
      '<div class="form-field full"><label for="attendance">Parteciperai?</label><select id="attendance" name="attendance" required><option value="">Seleziona</option><option>✅ Sì ci sarò 😎</option><option>❌ No purtroppo non riuscirò 😞</option></select></div>',
      '<div class="rsvp-add-row full"><p class="rsvp-add-question">Confermi anche per qualcun altro?</p><div class="rsvp-participants" data-rsvp-participants></div><button type="button" class="rsvp-add-button" data-rsvp-add>Aggiungi un&apos;altra persona</button></div>',
      '<div class="form-field full"><label for="dietary">Note alimentari (Opzionale)</label><textarea id="dietary" name="dietary" placeholder="Facci sapere se hai allergie o intolleranze"></textarea></div>',
      '<div class="form-field full rsvp-actions"><button type="submit" class="button w-button" data-rsvp-submit>Invia conferma</button><p class="rsvp-success" id="rsvp-success" data-rsvp-success hidden>' + escapeHtml(rsvp.success) + '</p><p class="rsvp-error" id="rsvp-error" data-rsvp-error hidden>' + escapeHtml(rsvp.error) + "</p></div>",
      "</form>",
      "</div>",
      "</div>",
      "</section>"
    ].join("");
  }

  function formField(label, name, type, placeholder, required, attributes) {
    return [
      '<div class="form-field">',
      '<label for="' + name + '">' + escapeHtml(label) + "</label>",
      '<input id="' + name + '" name="' + name + '" type="' + type + '" placeholder="' + escapeHtml(placeholder) + '"' + (required ? " required" : "") + (attributes ? " " + attributes : "") + ">",
      "</div>"
    ].join("");
  }

  function gallerySection() {
    var gallery = content.gallery;
    return [
      '<section id="galleria" class="section wedding-section reveal-on-scroll">',
      '<div class="content">',
      '<div class="block-heading margin">',
      eyebrow(gallery.eyebrow),
      '<h2 class="heading">' + escapeHtml(gallery.title) + "</h2>",
      "</div>",
      '<div class="gallery-grid">',
      gallery.images.length ? gallery.images.map(galleryImage).join("") : '<p class="gallery-empty">Aggiungi immagini nella cartella gallery.</p>',
      "</div>",
      "</div>",
      "</section>"
    ].join("");
  }

  function galleryImage(file) {
    var src = content.gallery.directory + encodeURIComponent(file).replace(/%2F/g, "/");
    return [
      '<figure class="gallery-item">',
      '<img src="' + src + '" alt="' + escapeHtml(galleryAlt(file)) + '" loading="lazy">',
      "</figure>"
    ].join("");
  }

  function galleryAlt(file) {
    return file
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function footerSection() {
    return [
      '<footer class="section-footer wedding-footer reveal-on-scroll">',
      '<div class="content">',
      '<div class="border-footer"></div>',
      '<div class="footer-initials">E + M</div>',
      '<div class="footer-date">17 Ottobre 2026</div>',
      '<div class="footer-love">Made with love</div>',
      "</div>",
      "</footer>"
    ].join("");
  }

  function navLink(item) {
    return '<a href="' + item.href + '" class="nav-link w-nav-link">' + escapeHtml(item.label) + "</a>";
  }

  function eyebrow(value) {
    return '<div class="wedding-eyebrow">' + escapeHtml(value) + "</div>";
  }

  function subtitleImage() {
    return '<img src="' + content.decor.subtitle + '" loading="lazy" alt="" width="62" class="image-subtitle">';
  }

  function mapFrame(src) {
    return '<iframe src="' + src + '" width="300" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
  }

  function setMeta(selector, value) {
    var node = document.querySelector(selector);
    if (node) node.setAttribute("content", value);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function allowedInlineHtml(value) {
    return escapeHtml(value)
      .replace(/\n/g, "<br>")
      .replace(/&lt;br\s*\/?&gt;/gi, "<br>")
      .replace(/&lt;b&gt;/gi, "<b>")
      .replace(/&lt;\/b&gt;/gi, "</b>")
      .replace(/&lt;strong&gt;/gi, "<strong>")
      .replace(/&lt;\/strong&gt;/gi, "</strong>");
  }
})();
