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

## Udgivelse på webhotel (subdomæne)

1. Opret subdomænet i webhotellets kontrolpanel (f.eks. `daniel.ditdomæne.dk`).
   Det får sin egen mappe, typisk `/public_html/daniel/` eller lignende.
2. Upload **alle filer** (inkl. mappen `assets/`) til subdomænets rodmappe via FTP/SFTP
   eller filhåndteringen i kontrolpanelet. `README.md` og `.git` behøver ikke komme med.
3. Slå SSL/HTTPS til for subdomænet (Let's Encrypt i kontrolpanelet).
4. Test formularen – tjek også spam-mappen første gang.

Alle stier er relative, så siden virker uanset hvilken mappe/subdomæne den ligger i.

## Lokal visning

Åbn `index.html` direkte i en browser. Formularen kræver PHP og virker derfor først på webhotellet.
