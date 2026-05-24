# Repository Notes

Landing page statica per il matrimonio di Ennio e Miriam, basata su un export
Webflow "Lovio" usato come base visuale, con contenuti e comportamento custom in
file locali. Il progetto deve restare minimale: niente build step, niente
framework, niente backend.

## Regole operative

- Leggi prima di modificare: la repo e' piccola, ma mantiene CSS/vendor Webflow.
- Fai modifiche chirurgiche. Evita refactor generali dell'export Webflow legacy.
- I contenuti principali stanno in `lovio_files/wedding-content.js`.
- Il rendering della pagina sta in `lovio_files/wedding-render.js`.
- Il comportamento runtime sta in `lovio_files/wedding.js`.
- Lo stile custom sta in `lovio_files/wedding.css`.
- Gli asset usati dalla pagina stanno in `assets/`; `lovio_files/` contiene anche
  asset/vendor legacy dell'export.
- Prima di dichiarare concluso, servi la cartella e verifica almeno hero,
  sezioni, mobile e console.

## Mappa rapida

- `index.html`
  - Entry point statico.
  - Contiene solo head, navbar shell, `<main data-wedding-page>` e script.
  - Include, in ordine:
    - `lovio_files/lovio.webflow.39528b056.css`
    - `lovio_files/wedding.css`
    - `lovio_files/wedding-content.js`
    - `lovio_files/wedding-render.js`
    - `lovio_files/jquery-3.5.1.min.dc5e7f18c8.js`
    - `lovio_files/webflow.cc3e285b5.js`
    - `lovio_files/wedding.js`
  - Modificalo solo se devi cambiare asset/script globali, meta fallback o shell
    HTML.

- `lovio_files/wedding-content.js`
  - File piu' importante per modificare testi e contenuti.
  - Espone `window.WEDDING_CONTENT`.
  - Contiene meta, nav, hero, save the date, capitoli storia, luoghi, dettagli,
    regali/IBAN, RSVP, galleria e asset decorativi.
  - Aggiorna qui il fallback della galleria quando aggiungi immagini che devono
    funzionare anche su GitHub Pages senza directory listing.

- `lovio_files/wedding-render.js`
  - Legge `window.WEDDING_CONTENT` e monta la pagina dentro
    `[data-wedding-page]`.
  - Imposta title/meta, ricostruisce la navigazione e genera le sezioni:
    `#home`, `#save-the-date`, `#storia`, `#luoghi`, `#dettagli`, `#regali`,
    `#rsvp`, `#galleria` e footer.
  - Tienilo come renderer semplice. Evita di metterci logica runtime o testi
    lunghi.

- `lovio_files/wedding.js`
  - Countdown tramite `[data-countdown]` e `[data-target-date]`.
  - Submit RSVP solo in anteprima: previene submit, mostra messaggio, resetta form.
  - Copia IBAN/intestatario con Clipboard API + fallback.
  - Chiude il menu mobile Webflow quando si clicca un link nav.
  - Scroll iniziale su hash.
  - Render galleria da directory listing se disponibile, con fallback da
    `data-gallery-fallback`.
  - Reveal-on-scroll con `IntersectionObserver`.

- `lovio_files/wedding.css`
  - Override visuali custom della landing.
  - Palette principale in `:root`.
  - Nasconde cart Webflow e badge.
  - Organizzato per sezioni: base, nav/hero, sezioni condivise, save the date,
    storia/luoghi, dettagli/mappe, galleria, RSVP, regali, footer/reveal,
    responsive.
  - Contiene media query per `991px`, `767px`, `479px`.

- `assets/`
  - Asset usati dalla pagina pubblica.
  - Struttura:
    - `assets/images/hero/`
    - `assets/images/story/`
    - `assets/images/venues/`
    - `assets/images/gallery/`
    - `assets/images/decor/`
    - `assets/icons/`
  - Quando aggiungi una foto alla galleria, preferisci un nome file leggibile
    senza spazi e aggiorna `wedding-content.js`.

- `lovio_files/lovio.webflow.39528b056.css`
  - CSS Webflow originale. Evita modifiche salvo necessita' forte.

- `lovio_files/webflow.cc3e285b5.js`, `jquery-*.js`, `webfont.js`, `css.css`
  - Vendor/Webflow/fonts. Trattali come generati.

- `lovio_files/pictures/` e altri asset `lovio_files/*`
  - Asset legacy dell'export e copie storiche. Non usarli per nuovi riferimenti
    se l'asset esiste gia' in `assets/`.

- `CNAME`
  - Dominio GitHub Pages/custom domain.

## Come lavorare localmente

Questa e' una pagina statica. Per controllarla con fetch della galleria e senza
problemi di path, servi la root:

```bash
python3 -m http.server 8000
```

Poi apri `http://localhost:8000/`. Se la porta e' occupata, usa una porta libera,
per esempio:

```bash
python3 -m http.server 8001
```

## Cose da sapere prima di cambiare contenuti

- La data visibile nei contenuti e' `17 Ottobre 2026`.
- Il target countdown e' `2026-10-17T11:00:00+02:00` in
  `lovio_files/wedding-content.js`.
- Il ricevimento e' mostrato come Baglio della Luna, Partinico, ma l'indirizzo
  testuale e' `Via La Ghiaia, 7, 54021 Bagnone MS`. Verificare prima di
  correggere.
- L'RSVP non persiste dati: e' una conferma locale/anteprima.
- La galleria prova a leggere il listing della directory; su GitHub Pages spesso
  potrebbe non esserci listing, quindi il fallback in `wedding-content.js` e'
  importante.

## Verifica consigliata

- `python3 -m http.server 8000`
- Controllo manuale desktop e mobile.
- Console browser senza errori JS.
- Hero, countdown, mappe, copia IBAN, form RSVP e galleria funzionanti.
- Controllo sintassi JS:

```bash
node --check lovio_files/wedding-content.js
node --check lovio_files/wedding-render.js
node --check lovio_files/wedding.js
```
