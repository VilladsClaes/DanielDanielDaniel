# Hjemmeside for Daniel Nygaard Rasmussen – tømrer i gammelt håndværk

## Hvem du arbejder med

Repoet ejes af Villads Claes (udvikler). **Daniel Nygaard Rasmussen** (tømrer, siden handler om ham)
arbejder også her via Claude Code på web. Daniel er ikke udvikler:

- Skriv altid på **dansk**, i almindeligt sprog uden fagudtryk fra programmering.
- Forklar kort *hvad* der ændres på siden – ikke hvordan koden ser ud.
- Tag selv de tekniske beslutninger; spørg kun om det, der handler om indhold, tekst, billeder og udseende.
- Daniel er fagekspert i bindingsværk og bygningsbevaring – hans faglige rettelser til tekster har forrang.

## Arbejdsgang – vigtigt

Hvert push til `main` udgives **straks live** på www.villadsclaes.dk/danieldanieldaniel/
(og senere Daniels eget .dk-domæne) via `.github/workflows/deploy.yml`.

- Push **aldrig** direkte til `main`. Lav ændringer på en ny branch og åbn en **pull request** mod `main`.
- Skriv PR-beskrivelsen på dansk, så Villads og Daniel kan forstå den. Medtag gerne et skærmbillede af ændringen.
- Sig til Daniel, at ændringen går live, når pull requesten er godkendt og merget.
- Rør ikke ved `.github/workflows/deploy.yml` eller GitHub-secrets, medmindre Villads beder om det.

## Opbygning

Statisk side uden build-trin: `index.html` (alle sektioner), `assets/style.css`, `assets/main.js`,
`assets/config.js` (telefon, e-mail, CVR), `kontakt.php` (sender kontaktformularen som mail), `tak.html`.

- Alle stier skal være **relative** (`assets/…`, ikke `/assets/…`) – siden ligger i en undermappe.
- Ingen eksterne scripts, skrifttyper eller trackere (GDPR). Billeder lægges i `assets/` og komprimeres (helst under 300 KB).
- Kontaktoplysninger ændres i `assets/config.js` **og** i `index.html` (søg på de gamle værdier). Modtageradressen for formularen står i `kontakt.php` (`$MODTAGER`).
- Formularen kræver PHP og kan kun testes på webhotellet.
- Test i browseren på både desktop- og mobilbredde før en PR. Respektér `prefers-reduced-motion`.

## Design

Farver er CSS-variabler i toppen af `style.css`: kalk, eg, trætjære, okker, dodenkop-rød.
Serif-overskrifter med kursive accentord i rødt, sektioner nummereret med romertal (I–VII),
tegninger som inline-SVG i streg-stil (opmålingstegning, plancher). Hold nye elementer i samme stil.

## Indhold

- Opfind aldrig kundeudtalelser, referencer, projekter, tal eller certificeringer. Brug kun det, Daniel selv oplyser.
- Faglige tekster om bindingsværk, samlinger og byggeskik skal være korrekte – er du i tvivl, så spørg Daniel.
