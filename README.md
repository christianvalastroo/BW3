# 🎧 Spotify Clone

Questo progetto è una replica semplificata di **Spotify** realizzata con **HTML, CSS e JavaScript**.
L'app permette di visualizzare artisti, album e brani utilizzando le **API di Deezer**.

L'obiettivo del progetto è esercitarsi con:

* chiamate API
* manipolazione del DOM
* gestione delle pagine tramite parametri URL
* creazione di una web app dinamica.

---

# 🚀 Funzionalità

• Homepage con contenuti musicali caricati tramite API
• Pagina artista con informazioni e brani popolari
• Pagina album con dettagli e tracklist
• Player grafico nella parte inferiore della pagina
• Navigazione tra pagine tramite URL parameters
• Layout responsive per mobile e desktop

---

# 🧠 Tecnologie utilizzate

HTML5
CSS3
Bootstrap 5
JavaScript (ES6)
API Deezer (StriveSchool API)

---

# 🔌 API utilizzata

Il progetto utilizza questa API:

https://striveschool-api.herokuapp.com/api/deezer/

Da qui vengono recuperati:

• artisti
• album
• brani

---

# ⚙️ Come funziona

1. La **homepage** carica i contenuti tramite `fetch()`.
2. Cliccando su un artista si apre la **pagina artista**.
3. Cliccando su un album si apre la **pagina album**.
4. I dati vengono passati tra le pagine tramite **parametri URL**.

Esempio:

album.html?albumid=12345

Il parametro viene letto nel JavaScript con:

URLSearchParams

---

# 📂 Struttura del progetto

project

home.html
artist.html
album.html

css/
home.css
album.css

js/
home.js
artist.js
album.js

assets/

---

# 💡 Obiettivo del progetto

Questo progetto è stato creato per migliorare le competenze in:

• JavaScript avanzato
• utilizzo delle API REST
• manipolazione dinamica del DOM
• gestione di una web app con più pagine

---