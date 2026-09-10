# 🛰️ OSINT Roadmap & Strategia di Intelligence TLC per FiberPulse
### *Guida metodologica e architetturale per trasformare la piattaforma in un sistema di sorveglianza e watchdog delle infrastrutture FiberCop e wholesale*

---

## 1. La Visione OSINT Applicata alle Telecomunicazioni (Layer 1)

L'acronimo **OSINT** (*Open Source Intelligence*) indica la disciplina investigativa basata sull'acquisizione, correlazione e analisi di fonti aperte e pubblicamente accessibili per produrre **conoscenza azionabile e verificata**.

Nel settore delle telecomunicazioni in fibra ottica (FTTH/FTTC), gli operatori wholesale come **FiberCop** e **Open Fiber** operano spesso attraverso comunicati stampa generici o mappe di copertura commerciali orientate al marketing, che non riflettono con precisione millimetrica la realtà del sottosuolo.
Trasformare questo sito in un **tool OSINT-like** significa dotarlo della capacità di fungere da **osservatorio civico indipendente e watchdog territoriale**:

```
FONTI APERTE GOVERNATIVE (Albo Pretorio, PNRR, Infratel, AGCOM)
                   +
RILIEVO TATTICO SUL CAMPO (Foto GPS, Matricole ARLO, Chiusini)
                   +
ANALISI DI INTELLIGENCE AI (Antigravity Surveillance Engine)
                   ▼
DOSSIER CONTINUO & RADAR DELLE ANOMALIE INFRASTRUTTURALI
```

---

## 2. Il Flusso di Lavoro per i Report Continui dell'AI (Io e Te)

Come hai giustamente previsto, il valore aggiunto non è un modello locale limitato, ma il **nostro ciclo operativo continuativo di intelligence**:

1. **Tu sei l'Agente Ricognitore sul Campo (Human Intelligence - HUMINT):**
   - Carichi un nuovo aggiornamento del file Google Earth (`Data Snapshot 3, 4, ...`).
   - Carichi nuove ordinanze scovate sull'Albo Pretorio del Comune o di comuni limitrofi.
   - Fornisci fotografie di armadi ARLO con le targhette numeriche, pozzetti o anomalie di cantiere.

2. **Io (Antigravity) sono il tuo Centro Analisi e Cartografia (All-Source Intelligence Analyst):**
   - Elaboro i file vettoriali KML calcolando i delta geospaziali (+ km di scavo, variazioni di ettari coperti).
   - Eseguo l'OCR e il parsing delle ordinanze legali estraendo date di avvio, vie e subappaltatori.
   - Redigo e compilo automaticamente il file `data/osint_briefings.json` con numerazione progressiva e standard di classificazione formale:
     - **Identificativo univoco:** (es. `INTEL-2026-09-COLLESALVETTI-001`)
     - **Indice di Confidenza NATO:** (es. `A1 - Accertato tramite atto pubblico`).
     - **Matrice di Discrepanza:** Cosa ha promesso l'operatore vs cosa abbiamo trovato sul marciapiede.
     - **Obiettivi della Prossima Ricognizione:** Coordinate precise dove recarsi per confermare i lavori.

3. **Il Sito Web è il Cruscotto Pubblico di Divulgazione (Tactical Dashboard):**
   - Chiunque visita il sito può aprire il modale **`[ 🛰️ OSINT Intel ]`**, scorrere la cronologia dei dossier, visualizzare la matrice delle discrepanze e stampare schede di audit esportabili.

---

## 3. Consigli Operativi per Potenziare il Tool

### A. Integrazione Ortofoto Aeree WMS (Regione Toscana Geoscopio)
La Regione Toscana pubblica gratuitamente tramite standard WMS le ortofoto ad altissima definizione (risoluzione al suolo 20 cm) e la Carta Tecnica Regionale (CTR).
- **Traccia di ricognizione:** Consente di esaminare dall'alto l'evoluzione della sede stradale, confrontando l'anno di rifacimento asfalti con le tracce degli scavi prima ancora che Google Maps aggiorni le sue immagini satellitari.

### B. Decodifica delle Matricole Gialle FiberCop (Reverse-Engineering Cabine)
Ogni volta che fotografi un ARLO FiberCop o una colonnina rame ARL, c'è un'etichetta gialla adesiva con numeri neri:
- **Esempio:** `58601G_04`
  - `58601G`: Codice identificativo della Centrale OLT Telecom di appartenenza (ACL).
  - `04`: Numero dell'armadio ripartilinea rame associato.
- **Valore OSINT:** Inserendo questo dato nel database, possiamo correlare esattamente ogni ARLO ai civici catastali serviti tramite gli elenchi pubblici wholesale di TIM (`Elenco CRO/ARLO`), anticipando di settimane l'apertura alla vendita sul sito FiberCop.

### C. Motore di Diffing Temporale (Time-Slider tra Snapshot)
- Consente di visualizzare in un clic cosa è stato aggiunto tra Snapshot 1 e Snapshot 2 (+1.43 km a Stagno) con colori differenti (esempio: Verde = Nuova Posa, Ciano = Rete Preesistente).

### D. Monitoraggio Bot dell'Albo Pretorio (Early Warning System)
I comuni pubblicano gli atti per 15 giorni prima di rimuoverli o archiviarli.
- Possiamo predisporre uno script Python programmabile (`scripts/monitor_albo_pretorio.py`) che controlla periodicamente la sezione Albo Pretorio del Comune di Collesalvetti (e di Livorno/Pisa) cercando parole chiave critiche:
  - `FiberCop`
  - `Fastweb`
  - `Open Fiber`
  - `manomissione suolo pubblico`
  - `fibra ottica`
  - `microtrincea`
- Non appena rileva una nuova pubblicazione, lo script ci segnala l'atto da scaricare e analizzare.

### E. Scalabilità Multi-Comune
Il codice è già predisposto per scalare su altri comuni (Livorno, Pisa, Fauglia, Cascina, Rosignano Marittimo) aggiungendo il campo `comune` al database e un menu a tendina per cambiare territorio.
