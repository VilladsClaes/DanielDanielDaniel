<?php
/* ----------------------------------------------------------
   Kontaktformular → e-mail til Daniel
   Virker på almindelige danske webhoteller med PHP mail().
   ---------------------------------------------------------- */

// ======== RET DISSE ========
$MODTAGER = 'kontakt@example.dk';          // hvor henvendelser skal sendes hen
$AFSENDER = 'noreply@' . preg_replace('/^www\./', '', $_SERVER['HTTP_HOST'] ?? 'example.dk'); // skal være på dit eget domæne
$EMNE_PREFIX = 'Henvendelse fra hjemmesiden';
// ===========================

$wantsJson = (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false)
          || (($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'fetch');

function svar($ok, $fejl = '') {
    global $wantsJson;
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        if (!$ok) http_response_code(400);
        echo json_encode(['ok' => $ok, 'error' => $fejl], JSON_UNESCAPED_UNICODE);
    } else {
        header('Location: ' . ($ok ? 'tak.html' : 'index.html?fejl=1#kontakt'), true, 303);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html', true, 303);
    exit;
}

// Honeypot: bots udfylder ofte skjulte felter – lad som om alt gik godt
if (!empty($_POST['website'])) svar(true);

function felt($navn, $max = 200) {
    $v = trim((string)($_POST[$navn] ?? ''));
    $v = str_replace(["\r", "\0"], '', $v);
    return mb_substr($v, 0, $max, 'UTF-8');
}
function enkeltlinje($v) { return preg_replace('/[\n\t]+/', ' ', $v); }

$navn        = enkeltlinje(felt('navn', 120));
$email       = enkeltlinje(felt('email', 160));
$telefon     = enkeltlinje(felt('telefon', 40));
$type        = enkeltlinje(felt('type', 80));
$sted        = enkeltlinje(felt('sted', 120));
$henvendelse = enkeltlinje(felt('henvendelse', 40));
$besked      = felt('besked', 5000);
$samtykke    = felt('samtykke', 5);

if ($navn === '')                                   svar(false, 'Navn mangler');
if (!filter_var($email, FILTER_VALIDATE_EMAIL))     svar(false, 'Ugyldig e-mail');
if (mb_strlen($besked, 'UTF-8') < 10)               svar(false, 'Beskrivelsen er for kort');
if ($samtykke !== 'ja')                             svar(false, 'Samtykke mangler');

$emne = $EMNE_PREFIX . ': ' . ($henvendelse ?: 'Henvendelse') . ' – ' . $navn;

$tekst  = "Ny henvendelse fra hjemmesiden\n";
$tekst .= str_repeat('-', 40) . "\n";
$tekst .= "Navn:        $navn\n";
$tekst .= "E-mail:      $email\n";
$tekst .= "Telefon:     " . ($telefon ?: '–') . "\n";
$tekst .= "Henvendelse: " . ($henvendelse ?: '–') . "\n";
$tekst .= "Bygning:     " . ($type ?: '–') . "\n";
$tekst .= "Sted:        " . ($sted ?: '–') . "\n";
$tekst .= str_repeat('-', 40) . "\n\n";
$tekst .= $besked . "\n\n";
$tekst .= str_repeat('-', 40) . "\n";
$tekst .= "Sendt " . date('d-m-Y H:i') . ". Svar direkte på denne mail for at skrive til kunden.\n";

$headers = [
    'From: =?UTF-8?B?' . base64_encode('Hjemmesiden') . "?= <$AFSENDER>",
    "Reply-To: $email",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: PHP',
];

$sendt = @mail(
    $MODTAGER,
    '=?UTF-8?B?' . base64_encode($emne) . '?=',
    $tekst,
    implode("\r\n", $headers),
    '-f' . $AFSENDER
);

svar($sendt, $sendt ? '' : 'Serveren kunne ikke sende mailen');
