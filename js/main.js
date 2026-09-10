// js/main.js - Logica UI, Galleria Foto Reali (IRL) e Studio 3D

const IRL_DATA = {
    'arl': {
        title: 'Armadio Ripartilinea TIM (ARL)',
        badge: 'ARL Rame',
        badgeColor: 'bg-red-500/20 text-red-400 border-red-500/40',
        image: 'images/arl_irl.jpg',
        location: 'Toscana (Territorio Collesalvetti)',
        summary: "L'iconico armadio ripartilinea in rame Telecom Italia con tettuccio rosso scanalato, punto nodale per la distribuzione secondaria verso le chiostrine.",
        fieldGuide: "Carrozzeria metallica/vetroresina grigia con aerazioni orizzontali, tettuccio rosso impermeabile curvo e quasi sempre affiancato da colonnina e-distribuzione grigia a zoccolo rialzato.",
        networkRole: "Durante la posa FTTH di FiberCop, l'ARLO ottico viene posato adiacente all'ARL rame per intercettare i cavi di raccordo e le canalizzazioni stradali esistenti senza dover riasfaltare l'intera carreggiata.",
        capacity: '200 - 800 coppie rame',
        placement: 'Marciapiede / Banchina stradale',
        thumbnails: [
            { src: 'images/arl_irl.jpg', label: 'Vista Frontale con Colonnina' },
            { src: 'images/tombino_telecom.jpg', label: 'Tombino Telecom Ghisa' }
        ]
    },
    'arlo': {
        title: 'Armadio Ripartilinea Ottico FiberCop (ARLO)',
        badge: 'ARLO Fibra',
        badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
        image: 'images/arlo_irl.jpg',
        location: 'Toscana (Territorio Collesalvetti)',
        summary: "Armadio ottico passivo compatto di FiberCop dedicato alla connettività FTTH ad altissima velocità.",
        fieldGuide: "Design moderno grigio chiaro con basamento scuro, logo blu-verde FiberCop stampato sul portello, adesivo giallo di avviso radiazione laser invisibile (Classe 1M) e doppie serrature a cilindro sagomato.",
        networkRole: "Contiene lo splitter di primo livello 1:4 e gli splitter secondari 1:16. Da qui partono i cavi secondari che raggiungono i ROE/PTE nei condomini o sulle facciate degli edifici.",
        capacity: 'Fino a 384 fibre connettorizzate',
        placement: 'A fianco del vecchio ARL rame',
        thumbnails: [
            { src: 'images/arlo_irl.jpg', label: 'Armadio ARLO in Contesto Urbano' },
            { src: 'images/fiber_cable.jpg', label: 'Fascio Cavi Ottici Multi-fibra' }
        ]
    },
    'centrale': {
        title: 'Centrale Telecom & Rack OLT XGS-PON',
        badge: 'Centrale OLT',
        badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
        image: 'images/centrale_irl.jpg',
        location: 'Centrale Telecom Italia (Sede OLT Collesalvetti)',
        summary: "Il cuore pulsante dell'infrastruttura di rete: ospita gli Optical Line Terminal (OLT) che trasmettono i dati su laser gigabit e 10 Gigabit.",
        fieldGuide: "Edificio tecnico Telecom con antenne e locali ad atmosfera controllata. All'interno si trovano rack standard 19\" con apparati Nokia o Huawei e permutatori ottici ODF con canaline aeree gialle.",
        networkRole: "Genera i fasci laser a lunghezze d'onda separate (1310/1490nm per GPON standard e 1270/1577nm per XGS-PON simmetrico 10 Gbps) collegando direttamente la dorsale IP nazionale.",
        capacity: 'Decine di migliaia di linee FTTH attive',
        placement: 'Edificio Centrale Comunale / Frazione',
        thumbnails: [
            { src: 'images/centrale_irl.jpg', label: 'Rack 19" OLT con Cablaggio ODF' },
            { src: 'images/telecom_rack.jpg', label: 'Sala Apparati TLC' }
        ]
    },
    'pozzetto': {
        title: 'Infrastruttura di Posa: Mini-trincea & Pozzetto',
        badge: 'Scavo & Posa',
        badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
        image: 'images/minitrincea_irl.jpg',
        location: 'Cantiere Stradale (Toscana)',
        summary: "Metodologia a basso impatto per la posa rapida della fibra ottica nelle strade cittadine.",
        fieldGuide: "Taglio longitudinale preciso di circa 10 cm nell'asfalto, con all'interno i microtubi in plastica rigida (fender) dai colori vivaci (arancio, blu, verde, giallo). Raccordato a chiusini in ghisa Telecom o FiberCop.",
        networkRole: "I microtubi fungono da autostrada protetta per il soffiaggio pneumatico dei cavi in fibra ottica. Nei pozzetti, le muffole stagne a campana sigillano le saldature a fusione dall'acqua e dall'umidità.",
        capacity: 'Fascio 7 o 14 microtubi (12/10mm)',
        placement: 'Carreggiata asfalto & Marciapiedi',
        thumbnails: [
            { src: 'images/minitrincea_irl.jpg', label: 'Mini-trincea con Microtubi e Chiusino' },
            { src: 'images/tombino_telecom.jpg', label: 'Tombino Ghisa Telecom Firenze' },
            { src: 'images/fiber_cable.jpg', label: 'Dettaglio Sezione Cavo Fibra' }
        ]
    }
};

let currentModelKey = 'arl';
let isIrlView = false;

document.addEventListener("DOMContentLoaded", () => {
    
    // Inizializza Mappa Leaflet
    if (typeof initMap === 'function') {
        initMap();
    }
    
    // Gestione Mute / Audio
    const soundBtn = document.getElementById('btn-toggle-sound');
    if (soundBtn) {
        soundBtn.addEventListener('click', (e) => {
            const isMuted = window.cyberAudio.toggleMute();
            e.currentTarget.innerHTML = isMuted 
                ? '<i data-lucide="volume-x" class="w-5 h-5 text-slate-500"></i>'
                : '<i data-lucide="volume-2" class="w-5 h-5 text-cyber-neon"></i>';
            lucide.createIcons();
        });
    }

    // Modale 3D & IRL
    const modal3D = document.getElementById('modal-3d');
    const openBtn = document.getElementById('btn-open-3d');
    const closeBtn = document.getElementById('btn-close-3d');
    
    if (openBtn && modal3D) {
        openBtn.addEventListener('click', () => {
            window.cyberAudio.playModalOpen();
            modal3D.classList.remove('hidden');
            modal3D.classList.add('flex');
            if (!window.threeInitialized) {
                window.init3D();
                window.threeInitialized = true;
            }
            updateIrlView();
        });
    }
    
    if (closeBtn && modal3D) {
        closeBtn.addEventListener('click', () => {
            window.cyberAudio.playClick();
            modal3D.classList.add('hidden');
            modal3D.classList.remove('flex');
        });
    }

    // Switcher View Mode: [3D] vs [Foto IRL]
    const btnMode3D = document.getElementById('view-mode-3d');
    const btnModeIrl = document.getElementById('view-mode-irl');
    const canvasContainer = document.getElementById('canvas-container');
    const irlContainer = document.getElementById('irl-container');
    const controls3d = document.getElementById('controls-3d-panel');
    const controlsIrl = document.getElementById('controls-irl-panel');

    function setViewMode(mode) {
        isIrlView = (mode === 'irl');
        window.cyberAudio.playClick();

        if (isIrlView) {
            btnModeIrl.classList.add('active', 'text-cyber-neon', 'bg-cyber-neon/20', 'border-cyber-neon/40');
            btnModeIrl.classList.remove('text-slate-400', 'border-transparent');
            
            btnMode3D.classList.remove('active', 'text-cyber-neon', 'bg-cyber-neon/20', 'border-cyber-neon/40');
            btnMode3D.classList.add('text-slate-400', 'border-transparent');

            canvasContainer.classList.add('hidden');
            irlContainer.classList.remove('hidden');
            irlContainer.classList.add('flex');

            if (controls3d) controls3d.classList.add('hidden');
            if (controlsIrl) controlsIrl.classList.remove('hidden');
            updateIrlView();
        } else {
            btnMode3D.classList.add('active', 'text-cyber-neon', 'bg-cyber-neon/20', 'border-cyber-neon/40');
            btnMode3D.classList.remove('text-slate-400', 'border-transparent');

            btnModeIrl.classList.remove('active', 'text-cyber-neon', 'bg-cyber-neon/20', 'border-cyber-neon/40');
            btnModeIrl.classList.add('text-slate-400', 'border-transparent');

            canvasContainer.classList.remove('hidden');
            irlContainer.classList.add('hidden');
            irlContainer.classList.remove('flex');

            if (controls3d) controls3d.classList.remove('hidden');
            if (controlsIrl) controlsIrl.classList.add('hidden');

            if (window.onWindowResize) window.onWindowResize();
        }
    }

    if (btnMode3D) btnMode3D.addEventListener('click', () => setViewMode('3d'));
    if (btnModeIrl) btnModeIrl.addEventListener('click', () => setViewMode('irl'));

    const btnSwitchTo3D = document.getElementById('irl-switch-to-3d');
    if (btnSwitchTo3D) btnSwitchTo3D.addEventListener('click', () => setViewMode('3d'));

    // Switcher Apparati dalla Sidebar
    document.querySelectorAll('.model-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            window.cyberAudio.playClick();
            document.querySelectorAll('.model-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            currentModelKey = e.currentTarget.dataset.model;
            
            // Aggiorna 3D
            if (currentModelKey === 'arl') window.buildARL();
            if (currentModelKey === 'arlo') window.buildARLO();
            if (currentModelKey === 'centrale') window.buildCentrale();
            if (currentModelKey === 'pozzetto') window.buildPozzetto();

            // Aggiorna Foto IRL
            updateIrlView();
        });
    });

    // Aggiornamento dinamico della galleria fotografica IRL
    function updateIrlView() {
        const item = IRL_DATA[currentModelKey];
        if (!item) return;

        const mainImg = document.getElementById('irl-main-img');
        const badge = document.getElementById('irl-badge');
        const title = document.getElementById('irl-title');
        const summary = document.getElementById('irl-summary');
        const fieldGuide = document.getElementById('irl-field-guide');
        const networkRole = document.getElementById('irl-network-role');
        const capacity = document.getElementById('irl-capacity');
        const placement = document.getElementById('irl-placement');
        const imgBadge = document.getElementById('irl-img-badge');
        const thumbsCont = document.getElementById('irl-thumbnails');

        if (mainImg) mainImg.src = item.image;
        if (badge) {
            badge.innerText = item.badge;
            badge.className = `text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${item.badgeColor}`;
        }
        if (title) title.innerText = item.title;
        if (summary) summary.innerText = item.summary;
        if (fieldGuide) fieldGuide.innerText = item.fieldGuide;
        if (networkRole) networkRole.innerText = item.networkRole;
        if (capacity) capacity.innerText = item.capacity;
        if (placement) placement.innerText = item.placement;
        if (imgBadge) imgBadge.innerText = item.location;

        if (thumbsCont) {
            thumbsCont.innerHTML = '';
            item.thumbnails.forEach((thumb, idx) => {
                const card = document.createElement('div');
                card.className = `cursor-pointer rounded-lg overflow-hidden border ${idx === 0 ? 'border-cyber-neon ring-1 ring-cyber-neon' : 'border-white/20'} bg-black/40 hover:opacity-100 transition-all opacity-80`;
                card.innerHTML = `
                    <img src="${thumb.src}" alt="${thumb.label}" class="w-full h-16 object-cover">
                    <span class="block text-[10px] text-slate-300 p-1 truncate text-center">${thumb.label}</span>
                `;
                card.onclick = () => {
                    window.cyberAudio.playHover();
                    if (mainImg) mainImg.src = thumb.src;
                    thumbsCont.querySelectorAll('div').forEach(d => {
                        d.classList.remove('border-cyber-neon', 'ring-1', 'ring-cyber-neon');
                        d.classList.add('border-white/20');
                    });
                    card.classList.add('border-cyber-neon', 'ring-1', 'ring-cyber-neon');
                    card.classList.remove('border-white/20');
                };
                thumbsCont.appendChild(card);
            });
        }
    }

    // Controlli 3D
    const explodeBtn = document.getElementById('btn-3d-explode');
    if (explodeBtn) {
        explodeBtn.addEventListener('click', () => {
            window.toggleExplode();
        });
    }
    
    const wireframeBtn = document.getElementById('btn-3d-wireframe');
    if (wireframeBtn) {
        wireframeBtn.addEventListener('click', () => {
            window.toggleWireframe();
        });
    }
    
    // Modale Cantieri & Ordinanze Albo Pretorio
    const btnOpenCantieri = document.getElementById('btn-open-cantieri');
    const btnCloseCantieri = document.getElementById('btn-close-cantieri');
    const modalCantieri = document.getElementById('modal-cantieri');

    if (btnOpenCantieri && modalCantieri) {
        btnOpenCantieri.addEventListener('click', () => {
            window.cyberAudio.playClick();
            modalCantieri.classList.remove('hidden');
            modalCantieri.classList.add('flex');
            if (window.initCantieriTracker) window.initCantieriTracker();
        });
    }

    if (btnCloseCantieri && modalCantieri) {
        btnCloseCantieri.addEventListener('click', () => {
            window.cyberAudio.playClick();
            modalCantieri.classList.add('hidden');
            modalCantieri.classList.remove('flex');
        });
    }

    if (window.initCantieriTracker) {
        window.initCantieriTracker();
    }

    // Apertura da popup mappa
    window.open3DModel = (category) => {
        const openModalBtn = document.getElementById('btn-open-3d');
        if (openModalBtn) openModalBtn.click();
        
        let targetModel = 'arl';
        if (category === 'arlo') targetModel = 'arlo';
        if (category.includes('centrale')) targetModel = 'centrale';
        if (category === 'cantiere' || category.includes('tratta') || category === 'infrastruttura') targetModel = 'pozzetto';
        
        const targetBtn = document.querySelector(`.model-btn[data-model="${targetModel}"]`);
        if (targetBtn) targetBtn.click();
    };
});
