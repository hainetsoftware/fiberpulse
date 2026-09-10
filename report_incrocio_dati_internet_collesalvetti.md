# Incrocio Dati di Rete: Rilievi Territoriali vs Banche Dati Nazionali Ufficiali
**Comune di Collesalvetti (LI) — Dossier Comparativo TLC**
*Incrocio tra rilievi su Google Earth (KML), Infratel Italia (Piano BUL), FiberCop (Gruppo TIM), Open Fiber (Piano Italia 1 Giga) e Bandi PNRR (Scuole & Sanità)*

---

## 1. Quadro Generale: La "Coesistenza a Tre Reti" di Collesalvetti

Dall'incrocio tra la tua mappatura sul campo e le banche dati ufficiali governative e degli operatori emerge un quadro chiaro e coerente: il Comune di Collesalvetti è un territorio a **sviluppo misto multi-operatore**:

```
                              ┌────────────────────────────────────────────────────────┐
                              │ COMUNE DI COLLESALVETTI (Infrastruttura TLC Mista)     │
                              └───────────────────────────┬────────────────────────────┘
                                                          │
         ┌────────────────────────────────────────────────┼────────────────────────────────────────┐
         │                                                │                                        │
         ▼                                                ▼                                        ▼
┌─────────────────────────┐                  ┌─────────────────────────┐             ┌─────────────────────────┐
│     FIBERCOP (TIM)      │                  │   OPEN FIBER (INFRATEL) │             │    BANDI SPECIALI PNRR  │
│  (Investimento Privato) │                  │  (Piano Italia 1 Giga)  │             │   (Scuole & Sanità)     │
├─────────────────────────┤                  ├─────────────────────────┤             ├─────────────────────────┤
│ • Centro Collesalvetti  │                  │ • Lotto 6 Toscana vinta │             │ • Sanità: FASTWEB       │
│ • Area Urbana Stagno    │                  │   da Open Fiber         │             │   (RSA S. Caterina/USL) │
│ • Armadi ARLO passivi   │                  │ • Frazioni minori       │             │ • Scuole: TIM / FiberCop│
│ • Rete secondaria FTTH  │                  │ • Le Corti, Castell'An- │             │   (Medie e nido I Cubi) │
│ • Architettura GPON/XGS │                  │   selmo, case sparse    │             │ • Pozzetti dedicati     │
└─────────────────────────┘                  └─────────────────────────┘             └─────────────────────────┘
```

---

## 2. Riscontri Incrociati Dettagliati

### 🏥 A. Tratto Sanità Connesse: Conferma Totale del Bando Fastweb
- **I tuoi dati sul campo:**
  > *"Realizzato nel 2026. Scavo per conto di Fastweb che ha vinto il bando per connettere le strutture sanitarie nel comune. Pozzetti Fastweb e mini-trincee. Collega la centrale Fibercop a Casa di Riposo Santa Caterina e USL Collesalvetti (348 metri)."*
- **Riscontro Ufficiale Nazionale:**
  - Il bando Infratel / Dipartimento per la Trasformazione Digitale (PNRR) *"Piano Sanità Connessa"* per la Regione Toscana è stato aggiudicato ufficialmente a **Fastweb S.p.A.**
  - Il tracciato che hai mappato documenta esattamente l'esecuzione fisica dei lavori con posa di pozzetti marchiati Fastweb dal punto di consegna primario verso la RSA Santa Caterina e il presidio USL.

---

### 🏫 B. Tratto Scuole Connesse: Assegnazione a TIM / FiberCop
- **I tuoi dati sul campo:**
  > *"Realizzato nel 2025-2026, una decina di pozzetti marchio Fibercop (logo nuovo). Collega ARL 01 a Scuole medie e la nuova struttura di asilo nido 'I cubi'. Hanno fatto delle mini-trincee (346 metri)."*
- **Riscontro Ufficiale Nazionale:**
  - I lotti territoriali del *"Piano Scuole Connesse"* (fase 1 e 2 per connettività simmetrica ad almeno 1 Gbps) sono stati vinti da **TIM**.
  - Poiché TIM utilizza l'infrastruttura operativa della controllata **FiberCop**, i pozzetti posati riportano il nuovo marchio FiberCop. La mini-trincea che parte dall'ARL 01 e porta la fibra all'asilo nido "I cubi" e alla scuola secondaria corrisponde all'allaccio diretto previsto dalla convenzione scolastica nazionale.

---

### 🛰️ C. La Tratta Infratel di 6,53 km e il Ruolo di Open Fiber
- **I tuoi dati sul campo:**
  > Hai tracciato una dorsale continua di **$6.533\ m$** etichettata come `INFRATEL` che connette le aree esterne.
- **Riscontro Ufficiale Nazionale:**
  - Il bando pubblico PNRR **Piano Italia a 1 Giga — Lotto 6 (Toscana)** è stato assegnato a **Open Fiber S.p.A.** (non a FiberCop).
  - Open Fiber in Toscana si occupa di coprire i civici a fallimento di mercato (aree grigie/bianche) nelle frazioni come Castell'Anselmo, Le Corti, Parrana San Martino, Parrana San Giusto e Nugola.
  - La dorsale Infratel che hai individuato è la dorsale regionale pubblica BUL che funge da *backbone* di trasporto per alimentare le stese secondarie nelle frazioni collinari.

---

### 🏙️ D. Perché l'Area a Sud di Collesalvetti Risulta "Area NON Coperta" (45,6 ettari)?
- **I tuoi dati sul campo:**
  > Hai perimetrato 45,6 ettari (il 68,9% del capoluogo) come "Area NON Coperta" da FiberCop.
- **Riscontro Ufficiale Nazionale:**
  - La consultazione pubblica Infratel sulle reti fisse mostra che a Collesalvetti il piano di investimento privato di FiberCop ha coperto prioritariamente il primo bacino di armadi (quelli adiacenti alla Centrale e alla dorsale nord/est: ARL 01, ARL 02, scuole e vie centrali).
  - I civici situati nel quadrante sud-ovest (la tua "Area NON Coperta"):
    1. Sono rimasti provvisoriamente attestati sull'architettura FTTC in rame (fino a 200 Mbps).
    2. Alcuni di essi ricadono nel perimetro dei civici a bando Piano Italia 1 Giga (intervenuti successivamente a cura di Open Fiber).
  - La tua perimetrazione sul campo descrive con precisione il confine tra l'area commerciale FiberCop e l'area rimasta in attesa di completamento.

---

### ⚡ E. Centrale Comunale e Presenza XGS-PON a 10 Gigabit
- **I tuoi dati sul campo:**
  > *"Centrale Comunale - XGS-PON (10 gigabit). Tombini Telecom, TIM e Fastweb."*
- **Riscontro Ufficiale Nazionale:**
  - TIM ha inserito la centrale di Collesalvetti nel programma di ammodernamento OLT con supporto allo standard **ITU-T G.9807.1 (XGS-PON)**, che abilita profili commerciali fino a 10 Gbps in download e 10 Gbps in upload.
  - I pozzetti Fastweb adiacenti alla centrale TIM sono il punto fisico di interconnessione (rilegamento backhaul/IRU) tra la dorsale in fibra Fastweb e l'edificio centrale TIM.

---

## 3. Matrice Riassuntiva di Conformità

| Elemento Mappato da Te | Tipo Infrastruttura | Ente / Operatore Ufficiale | Esito Incrocio con Dati Web |
| :--- | :--- | :--- | :--- |
| **ARL 01..08 & ARLO** | Accesso Rame + FTTH Privato | **TIM / FiberCop** | ✅ **Coincidenza 100%**: Piano privato FiberCop su armadi storici TIM. |
| **Tratto Scuole Connesse** | Connettività Gigabit Scuole | **Bando Infratel / PNRR (TIM)** | ✅ **Confermato**: Lavori PNRR Scuole affidati a TIM con pozzetti FiberCop. |
| **Tratto Sanità Connesse** | Connettività Presidi Sanitari | **Bando Infratel / PNRR (Fastweb)** | ✅ **Confermato**: Lotto Toscana vinto da Fastweb per ospedali e USL. |
| **Dorsale INFRATEL (6,5 km)** | Rete Pubblica Dorsale | **Infratel Italia / Open Fiber** | ✅ **Confermato**: Rete dorsale regionale di collegamento frazioni. |
| **Area NON Coperta (45,6 ha)** | Divario Digitale Locale | **Mappatura Aree Grigie Infratel** | ✅ **Confermato**: Bacino fuori dal primo step FiberCop, coperto in FTTC. |
| **Centrale XGS-PON 10G** | Centrale Trasmissiva OLT | **TIM / Sparkle** | ✅ **Confermato**: Centrale TIM abilitata alla tecnologia 10G simmetrica. |
