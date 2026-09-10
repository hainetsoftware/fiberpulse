# 🌐 Collesalvetti FTTH & Telecom Infrastructure Explorer 3D
### *Open-Source Geospatial Observatory & 3D Interactive Telecommunications Showcase*
**Municipality of Collesalvetti (Tuscany, Italy)**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Leaflet](https://img.shields.io/badge/GIS-Leaflet%201.9.4-brightgreen.svg)](https://leafletjs.com/)
[![Three.js](https://img.shields.io/badge/3D%20WebGL-Three.js%20r128-black.svg)](https://threejs.org/)
[![Status](https://img.shields.io/badge/Coverage%20Audit-Complete-success.svg)](#)

---

## 📌 About The Project

This repository hosts an interactive 3D WebGL and GIS geospatial platform documenting the comprehensive optical fiber network (FTTH - Fiber To The Home) in the municipality of **Collesalvetti** (province of Livorno, Tuscany, Italy).

Originating from field research and Google Earth mapping, this platform compiles, visualizes, and audits:
- **FiberCop / TIM:** Secondary FTTH access network and street cabinets (ARL / ARLO).
- **Open Fiber / Infratel Italia:** Public broadband trunk lines (*Piano BUL*) and rural gray-area expansion (*Piano Italia a 1 Giga*).
- **National Recovery and Resilience Plan (PNRR):** Dedicated gigabit infrastructure for public schools (*TIM/FiberCop*) and regional healthcare facilities (*Fastweb*).

---

## 🌟 Features

### 1. Interactive GIS Map (Leaflet)
- **High-definition layers:** Toggle between Esri High-Resolution Satellite imagery, Cyber Dark Canvas, and OpenStreetMap Topo tiles.
- **Strict geographical boundary lock:** The map view is strictly locked within the administrative borders of the Tuscany region (`maxBoundsViscosity: 1.0`, `minZoom: 9`) to prevent irrelevant panning.
- **Animated neon traces:** Glowing vector fiber routes differentiated by operator and infrastructure tier.
- **Field inspection popups:** Containing real-world annotations (adjacent electrical pillars, Telecom manhole types, GPS coordinates, elevation, and direct Google Street View quick links).

### 2. Interactive 3D Apparatus Studio (Three.js WebGL)
Inspect 3D procedural models of Italian telecommunications equipment with 360° orbit, zoom, pan, wireframe mode, and animated internal cutaway views:
- **ARL (Copper Street Cabinet):** Telecom Italia's classic outdoor cabinet with its distinctive curved red roof, ventilation louvers, lock cylinders, concrete plinth, adjacent e-distribuzione power pillar, and hinged door revealing 10-pair IDC terminal blocks.
- **ARLO (Optical Street Cabinet):** Modern FiberCop FTTH enclosure with dual hinged doors, FiberCop branding, laser safety warning placards, 1:4 and 1:16 optical splitters, and curved yellow singlemode fiber patchcords (G.657.A2).
- **Central Office OLT:** Standard 19" 42U telecom server rack housing an active Nokia/Huawei Optical Line Terminal (OLT) with blinking cyan/green status LEDs, SFP+ 10G optical transceivers, and an Optical Distribution Frame (ODF).
- **Civil Engineering Trench & Manhole:** Cross-section of asphalt roadbed, 10 cm microtrench with exposed 7-way colored microduct bundle (*fender*), cast-iron D400 manhole cover with non-slip diamond tread, and concrete underground vault containing a dome fiber optic splice closure (OFSC).

### 3. High-Definition Real-Life (IRL) Photo Gallery
- Seamlessly toggle between **3D Model** and **Real-Life (IRL) High-Res Photography**.
- Authentic high-resolution photos captured across Tuscany showing each apparatus in real-world urban and suburban contexts.
- Field recognition guide, technical specs, capacity ratings, and network roles.

### 4. Live Telemetry HUD & Search
- Live network metrics: 12.07 km of total fiber routes mapped, active ARL/ARLO counts, and exact coverage surface in hectares.
- Quick navigation fly-to camera shortcuts for all local fractions: *Collesalvetti, Vicarello, Stagno, Guasticce, Nugola, Parrana San Martino, Parrana San Giusto*.
- Instant search filter by equipment name or fraction.

---

## 🚀 Quick Start (Local Setup)

This project has zero dependencies on Node.js, npm, or external build pipelines. It runs straight out of the box in any modern web browser.

A dedicated Python launcher script using **absolute path resolution** is included:

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/collesalvetti-ftth-explorer.git
cd collesalvetti-ftth-explorer

# 2. Run the server launcher (can be invoked from any system working directory)
python3 start_server.py
```

The script will automatically allocate an open port (starting from `8080`) and launch your default web browser at:
👉 **`http://localhost:8080`**

---

## 🌐 Instant Deployment with GitHub Pages

You can host this application completely free using **GitHub Pages**:

1. In your GitHub repository, navigate to **Settings** ➔ **Pages**.
2. Under **Build and deployment**:
   - **Source:** Select `Deploy from a branch`
   - **Branch:** Select `main` (or `master`) and directory `/ (root)`
3. Click **Save**.
4. Within minutes, your site will be live worldwide at:  
   `https://<your-username>.github.io/<your-repo-name>/`

---

## 📂 Data Assets & Formats

All geospatial survey data is provided in open standard formats under the `data/` directory:

| Filename | Format | Intended Application |
| :--- | :--- | :--- |
| `data/rete_ftth_collesalvetti.xlsx` | Microsoft Excel (.xlsx) | Spreadsheet analysis, pivot tables, data presentation |
| `data/rete_ftth_collesalvetti_excel_it.csv` | CSV (Semicolon, UTF-8 BOM) | Double-click instant opening in Italian Excel locale |
| `data/rete_ftth_collesalvetti_standard.csv` | CSV (Comma, UTF-8) | Python, R, Pandas, QGIS, ArcGIS, SQL |
| `data/network_data.json` | GeoJSON (RFC 7946) | Web mapping engines, Leaflet, Mapbox, OpenStreetMap |
| `FTTH Collesalvetti.kml` | Google Earth KML | 3D satellite visualization in Google Earth Pro / Web |

---

## 🔬 Official Data Cross-Referencing

The field survey has been audited against official national registries (**Infratel Italia**, **BUL Plan**, **FiberCop**, and **National Recovery Plan tenders**):
- **Connected Healthcare:** Matches the official Italian public tender awarded to **Fastweb** for fiber interconnects to the local RSA retirement facility and USL health clinic.
- **Connected Schools:** Matches the official tender won by **TIM / FiberCop** to connect the secondary school and "I cubi" nursery with gigabit fiber.
- **Regional Infratel Backbone:** Confirms the 6.53 km regional fiber transit route utilized by **Open Fiber (Lot 6 Tuscany - Piano Italia a 1 Giga)** to connect outlying fractions.

Detailed analysis is available in **[`report_incrocio_dati_internet_collesalvetti.md`](report_incrocio_dati_internet_collesalvetti.md)**.

---

## ⚖️ License & Acknowledgements

- **Survey Author:** Original civic telecommunications mapping created on Google Earth by a resident of Collesalvetti.
- **Open-Source Libraries:** Leaflet.js, Three.js, Tailwind CSS, Lucide Icons.
- **License:** Released under the [MIT License](LICENSE). Free for public inquiry, educational, and civic research use.
