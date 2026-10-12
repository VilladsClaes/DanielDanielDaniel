# Daniel Nygaard Rasmussen – Tømrer i gammelt håndværk

Statisk hjemmeside (HTML/CSS/JS) med en lille PHP-fil til kontaktformularen.
Ingen build-trin, ingen eksterne afhængigheder, ingen cookies eller tracking.

## Filer

| Fil | Formål |
|---|---|
| `index.html` | Forsiden (én side med sektioner) |
| `tak.html` | Takkeside, hvis formularen sendes uden JavaScript |
| `kontakt.php` | Sender formularens indhold som e-mail |
| `assets/config.js` | Telefon, e-mail og CVR – vises automatisk på hele siden |
| `assets/style.css` | Design (kalk, eg, tjære, okker, dodenkop-rød) |
| `assets/main.js` | Menu, formular, animationer |

## Før udgivelse – ret disse

1. **`assets/config.js`** – telefonnummer, e-mail og CVR.
2. **`kontakt.php`** – `$MODTAGER` (hvor henvendelser skal hen).
   `$AFSENDER` bliver automatisk `noreply@<subdomæne>`; nogle webhoteller kræver,
   at afsenderen er en rigtig postkasse på domænet – ret den så til f.eks. `web@ditdomæne.dk`.
3. **`index.html`** – søg efter `00 00 00 00`, `kontakt@example.dk` og `00000000`
   og ret dem også her, så tallene er korrekte for søgemaskiner og for besøgende uden JavaScript.
4. **Foto** – læg et billede i `assets/daniel.jpg` og erstat `.portrait-placeholder`
   i `index.html` med `<img src="assets/daniel.jpg" alt="Daniel Nygaard Rasmussen på arbejde">`
   (der står en kommentar i koden).

## Automatisk udgivelse

Hvert push til `main` udgives automatisk til `www.villadsclaes.dk/danieldanieldaniel/`
(Simply.com) via FTPS med GitHub Actions – se `.github/workflows/deploy.yml`.
Kun ændrede filer uploades. Udgivelsen kan også startes manuelt under **Actions → Udgiv til webhotel → Run workflow**.

**Opsætning (én gang)** – på GitHub under *Settings → Secrets and variables → Actions*:

| Type | Navn | Værdi |
|---|---|---|
| Secret | `FTP_SERVER` | FTP-serveren fra Simply's kontrolpanel (f.eks. `linuxNN.unoeuro.com`) |
| Secret | `FTP_USERNAME` | FTP-brugernavn (typisk `villadsclaes.dk`) |
| Secret | `FTP_PASSWORD` | FTP-adgangskoden |
| Variable *(valgfri)* | `FTP_SERVER_DIR` | Mappen på serveren. Standard: `public_html/danieldanieldaniel/` |

`README.md`, `.github/` og `.claude/` uploades ikke.

### Eget .dk-domæne

Når Daniels domæne er oprettet, peges det ned i mappen `public_html/danieldanieldaniel/`
(hos Simply: tilføj domænet og vælg mappen som dets webroot, eller peg DNS til Simply og opret det som alias).
Slå SSL/HTTPS til for domænet. Alle stier på sitet er relative, så det virker både under
`villadsclaes.dk/danieldanieldaniel/` og på det nye domæne uden ændringer.

Test formularen efter første udgivelse – tjek også spam-mappen første gang.

## Lokal visning

Åbn `index.html` direkte i en browser. Formularen kræver PHP og virker derfor først på webhotellet.
