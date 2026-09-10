# 🌐 Collesalvetti FTTH & Telecom Explorer 3D
### *Osservatorio Infrastrutturale e Mappatura Geospaziale della Rete FTTH nel Comune di Collesalvetti (Toscana, Italia)*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Leaflet](https://img.shields.io/badge/GIS-Leaflet%201.9.4-brightgreen.svg)](https://leafletjs.com/)
[![Three.js](https://img.shields.io/badge/3D%20WebGL-Three.js%20r128-black.svg)](https://threejs.org/)
[![Status](https://img.shields.io/badge/Coverage%20Audit-Complete-success.svg)](#)
[![Deploy with GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Ready-orange.svg)](#pubblicazione-su-github-pages--deploy-to-github-pages)

---

> 🇮🇹 **Italiano:** Piattaforma web interattiva, studio 3D e banca dati geospaziale open-source per visualizzare e documentare l'infrastruttura di telecomunicazioni in fibra ottica (**FiberCop / TIM**, **Open Fiber / Infratel**, bandi **PNRR Scuole & Sanità**) nel comune di **Collesalvetti** (LI).  
> 🇬🇧 **English:** Interactive web platform, 3D apparatus studio, and open-source geospatial telecom observatory mapping the FTTH (Fiber To The Home) rollout and infrastructure across the municipality of **Collesalvetti** (Tuscany, Italy).

---

## 📑 Indice / Table of Contents
- [Caratteristiche Principali / Key Features](#-caratteristiche-principali--key-features)
- [Architettura del Progetto / Architecture](#-architettura-del-progetto--architecture)
- [Avvio Rapido Locale / Local Quick Start](#-avvio-rapido-locale--local-quick-start)
- [Pubblicazione su GitHub Pages / Deploy to GitHub Pages](#-pubblicazione-su-github-pages--deploy-to-github-pages)
- [Dataset e Download Dati / Datasets](#-dataset-e-download-dati--datasets)
- [Incrocio Dati Nazionali / National Data Cross-Reference](#-incrocio-dati-nazionali--national-data-cross-reference)
- [English Documentation](#-english-documentation)
- [Licenza & Riconoscimenti / Credits](#-licenza--riconoscimenti--credits)

---

## 🌟 Caratteristiche Principali / Key Features

### 1. 🗺️ Mappa GIS Interattiva ad Alto Contrasto
- **Layering dinamico:** Mappa ad alta risoluzione satellitare (*Esri World Imagery*), modalità *Cyber Dark* ad alto contrasto (*Esri Dark Canvas*) e topografica *OpenStreetMap*.
- **Confinamento territoriale:** Navigazione vincolata rigorosamente ai confini regionali della Toscana (`maxBoundsViscosity: 1.0`, `minZoom: 9`).
- **Percorsi fibra al neon:** Tracciati vettoriali luminescenti differenziati per operatore e tipologia di appalto (FiberCop, Fastweb Sanità, Scuole Connesse, cantieri temporanei).
- **Popup sul campo:** Note fisiche originali censite sul territorio (colonnine Enel adiacenti, modelli di tombini in ghisa, presidi XGS-PON).

### 2. 🎮 Studio 3D Interattivo (Three.js WebGL)
- Rendering a 60 fps con illuminazione PBR, materiali realistici e controlli orbitali (rotazione a 360°, zoom e pan).
- Modelli procedurali dettagliati:
  - **ARL (Rame TIM):** Carrozzeria metallica con tettuccio rosso impermeabile scanalato, serratura, colonnina e-distribuzione affiancata e apertura reale su cerniera delle morsettiere IDC a 10 coppie.
  - **ARLO (Ottico FiberCop):** Scocca grigio chiaro con zoccolo rinforzato, logo FiberCop, cartello di pericolo laser classe 1M, doppi sportelli incernierati, splitter 1:4 / 1:16 e bretelle ottiche monomodali gialle (G.657.A2) curve in 3D.
  - **Centrale OLT (XGS-PON 10G):** Rack standard 19" 42U con telaio forato, chassis OLT Nokia/Huawei, permutatore ODF e LED di attività verde/ciano pulsanti in tempo reale.
  - **Posa, Mini-trincea & Pozzetto:** Spaccato stradale dell'asfalto e sottofondo, taglio di mini-trincea (10 cm) con fascio di microtubi colorati (*fender* a 7 vie), chiusino in ghisa carrabile D400 e cameretta sotterranea con muffola stagna a campana (OFSC).

### 3. 📸 Documentazione Fotografica Reale (IRL)
- Galleria fotografica ad altissima definizione accessibile direttamente dal visualizzatore (`[ 🎮 Modello 3D ]` vs `[ 📸 Foto Reale IRL ]`).
- Fotografie ad alta definizione scattate sul territorio toscano per ciascun apparato.
- Schede guida per il riconoscimento visivo sul campo, specifiche di capacità e ruolo nell'architettura di rete.

### 4. 🚧 Monitoraggio Cantieri & Ordinanze Albo Pretorio (Live Europe/Rome)
- **Aggiornamento Continuo Albo Pretorio:** Modulo dedicato per tracciare le ordinanze della Polizia Municipale di regolamentazione della circolazione e scavo per la posa della fibra FTTH (**Fastweb / FiberCop**).
- **Stato Dinamico in Tempo Reale:** Calcolo automatico al secondo basato sull'orario locale (`Europe/Rome`):
  - 🟡 **Attivazione Programmata / Imminente:** Conto alla rovescia dinamico (giorni, ore) prima dell'inizio dello scavo.
  - 🟢 **Cantiere Attivo Ora:** Notifica di lavori in corso durante le fasce orarie feriali (08:00 - 18:00).
  - ⚪ **Lavori Conclusi:** Archiviazione storica dei ripristini del manto stradale.
- **Vie Coinvolte & Prescrizioni:** Dettaglio per ogni singola via interessata da divieti di sosta con rimozione forzata o sensi unici alternati regolati da semaforo/movieri.
- **Archivio Atti Ufficiali:** Download diretto dei file PDF originali dell'Albo Pretorio.

### 5. 📊 Cruscotto di Telemetria e Statistiche in Tempo Reale
- Calcolo automatico della metratura lineare tracciata (**13,50 km** di cavi e trincee, con l'inclusione del nuovo cantiere di Stagno).
- **Snapshot 2 Espansione Stagno:** Incremento dell'area coperta a Stagno da 28,65 a **37,17 ettari** (la percentuale coperta sale al **80,3%**).
- Ripartizione apparati e navigazione aerea istantanea per frazione: *Collesalvetti, Vicarello, Stagno, Guasticce, Nugola, Parrana San Martino, Parrana San Giusto*.
- Barra di ricerca e filtro in tempo reale per apparato, categoria e frazione.

---

## 🏛️ Architettura del Progetto / Architecture

```
adventurous-turing/
├── index.html                                  # Portale Web Single-Page (GIS + 3D + HUD)
├── start_server.py                             # Launcher server HTTP Python con percorsi assoluti
├── FTTH Collesalvetti.kml                      # Rilievo originale geospaziale KML (Google Earth)
├── css/
│   └── app.css                                 # Stili Cyber Dark, glassmorphism e animazioni neon
├── js/
│   ├── data.js                                 # Database GeoJSON precompilato (49 feature censite)
│   ├── cantieri_tracker.js                     # Monitoraggio live ordinanze Albo Pretorio (Europe/Rome)
│   ├── map.js                                  # Controller Leaflet, layer Esri e confini Toscana
│   ├── three_apparati.js                       # Motore Three.js e modelli 3D procedurali
│   ├── telemetry.js                            # Calcolo statistiche, filtri e navigazione frazioni
│   ├── audio.js                                # Sintetizzatore sonoro cibernetico (Web Audio API)
│   └── main.js                                 # Coordinamento UI, modali e galleria foto IRL
├── ordinanze/                                  # Atti ufficiali e ordinanze Albo Pretorio Comune
│   ├── ordinanza_102_2026_stagno_cantiere2.pdf  # Posa FTTH FiberCop Stagno (del 10/09/2026)
│   ├── ordinanza_95_2026_collesalvetti_cantiere1.pdf # Posa FTTH FiberCop Collesalvetti Centro
│   └── ordinanza_75_2026_stagno_ripristino.pdf # Ripristini definitivi manto stradale Stagno
├── images/                                     # Fotografie ad alta definizione degli apparati reali
│   ├── arl_irl.jpg                             # ARL con tettuccio rosso e colonnina Enel
│   ├── arlo_irl.jpg                            # Armadio ottico FiberCop sul marciapiede
│   ├── centrale_irl.jpg                        # Rack 19" OLT e cablaggio ODF
│   ├── minitrincea_irl.jpg                     # Taglio mini-trincea con fascio microtubi
│   └── tombino_telecom.jpg                     # Chiusino in ghisa Telecom Italia Firenze
├── data/                                       # Banche dati esportate in molteplici formati
│   ├── network_data.json                       # GeoJSON completo con metadati e coordinate
│   ├── rete_ftth_collesalvetti.xlsx            # Foglio di calcolo nativo Microsoft Excel
│   ├── rete_ftth_collesalvetti_excel_it.csv    # CSV formattato per Excel italiano (; e UTF-8 BOM)
│   └── rete_ftth_collesalvetti_standard.csv    # CSV standard (virgola) per GIS / Data Science
├── scripts/
│   ├── kml_to_geojson.py                       # Parser KML, calcolo distanze Haversine e superfici
│   └── export_sheets.py                        # Esportatore automatico CSV e OpenXML XLSX nativo
├── dossier_audit_e_sopralluoghi_collesalvetti.md # Checklist da campo e analisi dei gaps numerici
└── report_incrocio_dati_internet_collesalvetti.md # Analisi comparata con Infratel, BUL e PNRR
```

---

## 🚀 Avvio Rapido Locale / Local Quick Start

Il progetto è autonomo e non richiede `npm`, `node` né build complesse. Include uno script dedicato che avvia un server HTTP locale utilizzando **percorsi assoluti**:

```bash
# 1. Clona il repository
git clone https://github.com/<tuo-username>/collesalvetti-ftth-explorer.git
cd collesalvetti-ftth-explorer

# 2. Avvia il server con lo script Python (funziona da qualsiasi directory)
python3 start_server.py
```

Lo script troverà automaticamente la prima porta disponibile (partendo da `8080`) e aprirà il browser all'indirizzo:
👉 **`http://localhost:8080`**

*(In alternativa puoi avviare manualmente con: `python3 -m http.server 8080`)*

---

## 🌍 Pubblicazione su GitHub Pages / Deploy to GitHub Pages

Il portale è ottimizzato al 100% per **GitHub Pages** a costo zero:

1. Vai sul tuo repository GitHub: `Settings` ➔ `Pages`.
2. Nella sezione **Build and deployment**:
   - **Source:** seleziona `Deploy from a branch`
   - **Branch:** seleziona `main` (o `master`) e cartella `/ (root)`
3. Clicca su **Save**.
4. In meno di un minuto, il tuo sito sarà pubblico e visualizzabile in tutto il mondo all'indirizzo:  
   `https://<tuo-username>.github.io/<nome-repo>/`

---

## 📊 Dataset e Download Dati / Datasets

Tutti i dati rilevati sono esportati e scaricabili liberamente per finalità di studio, urbanistica e documentazione territoriale:

| File | Formato | Destinazione d'Uso |
| :--- | :--- | :--- |
| **[rete_ftth_collesalvetti.xlsx](data/rete_ftth_collesalvetti.xlsx)** | Microsoft Excel (.xlsx) | Tabelle, filtri e grafici avanzati |
| **[rete_ftth_collesalvetti_excel_it.csv](data/rete_ftth_collesalvetti_excel_it.csv)** | CSV (; UTF-8 BOM) | Apertura diretta con doppio clic in Excel (IT) |
| **[rete_ftth_collesalvetti_standard.csv](data/rete_ftth_collesalvetti_standard.csv)** | CSV (, UTF-8) | QGIS, ArcGIS, Pandas, Python, R |
| **[network_data.json](data/network_data.json)** | GeoJSON (RFC 7946) | Software GIS, Leaflet, Mapbox, OpenStreetMap |
| **[FTTH Collesalvetti.kml](FTTH%20Collesalvetti.kml)** | KML (Google Earth) | Visualizzazione 3D satellitare in Google Earth |

---

## 🔎 Incrocio Dati Nazionali / National Data Cross-Reference

L'analisi incrociata con le banche dati ufficiali (**Infratel Italia**, **Piano BUL**, **FiberCop/TIM**, **Open Fiber** e **Bandi PNRR**) conferma con precisione i rilievi effettuati:
- **Sanità Connessa:** Confermata l'aggiudicazione del Lotto Toscana a **Fastweb**, corrispondente allo scavo di 348 m verso RSA S. Caterina e USL.
- **Scuole Connesse:** Confermata la vittoria del bando da parte di **TIM**, che ha posato i chiusini a marchio **FiberCop** davanti all'asilo e alle scuole medie.
- **Dorsale Infratel:** La tratta tracciata di 6,53 km costituisce la direttrice pubblica strategica di collegamento verso le frazioni assegnata a **Open Fiber (Lotto 6 Toscana Piano Italia a 1 Giga)**.
- Per il report completo, consulta il documento **[`report_incrocio_dati_internet_collesalvetti.md`](report_incrocio_dati_internet_collesalvetti.md)**.

---

# 🇬🇧 English Documentation

## Project Overview
**Collesalvetti FTTH & Telecom Explorer 3D** is an open-source civic crowdsourced mapping and visualization project created to document and audit the fiber-optic telecommunications infrastructure across the municipality of **Collesalvetti** (Livorno, Tuscany, Italy).

The platform tracks the real-world deployment of:
- **FiberCop (TIM Group):** Commercial FTTH rollout on urban copper cabinets (ARL / ARLO).
- **Open Fiber (Infratel BUL / Piano Italia 1 Giga):** Publicly funded broadband network for rural areas, outlying fractions, and industrial clusters.
- **National Recovery and Resilience Plan (PNRR):** Specialized fiber links for healthcare facilities (*Fastweb*) and public schools (*TIM / FiberCop*).

## Key Components
1. **Interactive GIS Web Map:**
   - Powered by Leaflet with Esri World Dark Gray Canvas and High-Resolution Satellite imagery.
   - Spatial lock and bounce boundaries strictly restricted to the Tuscany geographical bounds (`maxBoundsViscosity: 1.0`).
   - Neon glowing line paths for fiber routes with custom interactive SVG markers.
2. **3D Apparatus Studio:**
   - Procedural PBR models created with Three.js showing external enclosures, internal copper terminal blocks, optical splitters, 19" OLT server racks with live blinking LEDs, and road cross-sections with microduct bundles.
3. **High-Definition Real-Life (IRL) Photo Gallery:**
   - Authentic photographic documentation captured across Tuscany with field identification guidelines and technical data.
4. **Live Municipal Ordinance & Works Tracker (`Europe/Rome`):**
   - Real-time tracker parsing municipal traffic and excavation decrees published on the Collesalvetti Albo Pretorio for FiberCop / Fastweb FTTH deployments.
   - Dynamic time-zone based countdowns (*Scheduled / Imminent*, *Active Now during working hours*, *Completed*).
   - Exact affected street breakdown and one-click access to official municipal PDF decrees.
5. **Data Exports & Snapshot 2 Stagno Expansion:**
   - Expanded coverage polygon in Stagno (from 28.65 ha to 37.17 ha, 80.3% coverage).
   - Clean GeoJSON, native XLSX spreadsheet, and CSV tables ready for GIS software (QGIS, ArcGIS).

## Running Locally
```bash
git clone https://github.com/<your-username>/collesalvetti-ftth-explorer.git
cd collesalvetti-ftth-explorer
python3 start_server.py
```
Visit `http://localhost:8080` in your web browser.

---

## 📜 Licenza & Riconoscimenti / Credits

- **Autore Mappatura:** Progetto originale di censimento e rilievo territoriale geospaziale su Google Earth a cura di un cittadino residente nel Comune di Collesalvetti.
- **Dati Istituzionali di Confronto:** Ministero delle Imprese e del Made in Italy (MIMIT), Infratel Italia S.p.A., Piano Strategico Banda Ultra Larga, FiberCop S.p.A., Open Fiber S.p.A.
- **Librerie Utilizzate:** Leaflet.js, Three.js, Tailwind CSS, Lucide Icons.
- **Licenza:** Questo progetto è distribuito sotto licenza Open Source MIT. Libero per consultazione, divulgazione civica e ricerca.
