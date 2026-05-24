# Repository Notes

Landing page statica per il matrimonio di Ennio e Miriam, basata su un export
Webflow "Lovio" e personalizzata in runtime con JavaScript/CSS locali.

## Regole operative

- Leggi prima di modificare: questa repo e' piccola, ma `index.html` contiene molto
  markup Webflow generato.
- Fai modifiche chirurgiche. Evita refactor generali del markup esportato.
- I contenuti principali della landing stanno in `lovio_files/wedding-preinit.js`.
- Lo stile custom sta in `lovio_files/wedding.css`.
- Il comportamento runtime custom sta in `lovio_files/wedding.js`.
- Prima di dichiarare concluso, apri la pagina in browser o servi la cartella e
  verifica almeno hero, sezioni, mobile e console.

## Mappa rapida

- `index.html`
  - Entry point statico.
  - E' in gran parte markup Webflow originale.
  - Include `lovio_files/wedding.css` nel `<head>`.
  - A fine body carica, in ordine:
    - `lovio_files/wedding-preinit.js`
    - `lovio_files/jquery-3.5.1.min.dc5e7f18c8.js`
    - `lovio_files/webflow.cc3e285b5.js`
    - `lovio_files/wedding.js`
  - Modificalo solo se devi cambiare asset/script globali, meta fallback o la
    struttura Webflow usata come base.

- `lovio_files/wedding-preinit.js`
  - File piu' importante per i contenuti.
  - Imposta lingua, title e meta description/Open Graph/Twitter.
  - Ripulisce classi/stili/attributi ARIA generati da Webflow.
  - Ricostruisce la navigazione.
  - Personalizza hero e immagini:
    - `lovio_files/pictures/photos/left.jpeg`
    - `lovio_files/pictures/photos/right.jpeg`
    - `lovio_files/pictures/photos/central.jpeg`
  - Svuota `.overflow` lasciando la hero e reinserisce tutte le sezioni custom:
    - `#save-the-date`
    - divisore decorativo
    - `#storia`
    - capitoli storia con `storyFeature(...)`
    - `#dettagli`
    - `#regali`
    - `#rsvp`
    - `#galleria`
    - footer
  - Helper interni: `forceImage`, `storyFeature`, `detailCard`,
    `giftDestination`, `giftCopyRow`, `formField`, `escapeHtml`, map iframe.

- `lovio_files/wedding.css`
  - Override visuali custom della landing.
  - Palette principale in `:root`.
  - Nasconde cart Webflow e badge.
  - Stili per logo/nav, hero override, countdown, storia, dettagli/mappe,
    regali/IBAN, RSVP, galleria, footer, reveal-on-scroll e responsive.
  - Contiene media query per `991px`, `767px`, `479px`.

- `lovio_files/wedding.js`
  - Countdown tramite `[data-countdown]`.
  - Submit RSVP solo in anteprima: previene submit, mostra messaggio, resetta form.
  - Copia IBAN/intestatario con Clipboard API + fallback.
  - Scroll iniziale su hash.
  - Render galleria da directory listing se disponibile, con fallback da
    `data-gallery-fallback`.
  - Reveal-on-scroll con `IntersectionObserver`.

- `lovio_files/lovio.webflow.39528b056.css`
  - CSS Webflow originale. Evita modifiche salvo necessita' forte.

- `lovio_files/webflow.cc3e285b5.js`, `jquery-*.js`, `webfont.js`, `css.css`
  - Vendor/Webflow/fonts. Trattali come generati.

- `lovio_files/pictures/photos/`
  - Foto principali per hero e capitoli storia.

- `lovio_files/pictures/photos/gallery/`
  - Foto bonus per la galleria. Aggiungere immagini qui e' sufficiente quando il
    server espone directory listing; altrimenti aggiorna `data-gallery-fallback`
    in `wedding-preinit.js`.

- `lovio_files/pictures/`
  - Asset decorativi (`seal`, `rings`, ecc.).

- `CNAME`
  - Dominio GitHub Pages/custom domain.

## Come lavorare localmente

Questa e' una pagina statica. Per controllarla con fetch della galleria e senza
problemi di path, servi la root:

```bash
python3 -m http.server 8000
```

Poi apri `http://localhost:8000/`.

## Cose da sapere prima di cambiare contenuti

- La data visibile nei contenuti e' `17 Ottobre 2026`.
- In `wedding-preinit.js` il ricevimento e' mostrato come Baglio della Luna,
  Partinico, ma l'indirizzo testuale e' `Via La Ghiaia, 7, 54021 Bagnone MS`.
  Verificare prima di correggere.
- L'RSVP non persiste dati: e' una conferma locale/anteprima.
- La galleria prova a leggere il listing della directory; su GitHub Pages spesso
  potrebbe non esserci listing, quindi il fallback e' importante.

## Verifica consigliata

- `python3 -m http.server 8000`
- Controllo manuale desktop e mobile.
- Console browser senza errori JS.
- Hero, countdown, mappe, copia IBAN, form RSVP e galleria funzionanti.
