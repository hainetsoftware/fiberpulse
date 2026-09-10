// js/three_apparati.js - Modelli 3D Procedurali Avanzati & Texturing PBR

let scene, camera, renderer, controls;
let currentGroup = null;
let isExploded = false;
let activeLeds = [];
let doorPivots = [];

// Generatori di texture procedurali ad alta definizione con HTML5 Canvas
function createLouverTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#7a818c';
    ctx.fillRect(0, 0, 256, 256);
    
    // Slats / Feritoie
    ctx.fillStyle = '#222831';
    for (let y = 30; y < 220; y += 22) {
        ctx.fillRect(30, y, 196, 10);
        // Highlight bevel
        ctx.fillStyle = '#9aa1ad';
        ctx.fillRect(30, y + 10, 196, 2);
        ctx.fillStyle = '#222831';
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

function createLaserWarningTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(0, 0, 256, 256);
    
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(128, 24);
    ctx.lineTo(236, 220);
    ctx.lineTo(20, 220);
    ctx.closePath();
    ctx.stroke();
    
    // Laser burst symbol
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(128, 140, 22, 0, Math.PI * 2);
    ctx.fill();
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(128 + Math.cos(a) * 30, 140 + Math.sin(a) * 30);
        ctx.lineTo(128 + Math.cos(a) * 55, 140 + Math.sin(a) * 55);
        ctx.stroke();
    }
    
    return new THREE.CanvasTexture(canvas);
}

function createManholeTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#2a2d32';
    ctx.fillRect(0, 0, 512, 512);
    
    // Diamond tread grip pattern
    ctx.strokeStyle = '#3e4249';
    ctx.lineWidth = 4;
    const step = 24;
    for (let x = -512; x < 1024; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + 512, 512);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x, 512);
        ctx.lineTo(x + 512, 0);
        ctx.stroke();
    }
    
    // Central Badge Box
    ctx.fillStyle = '#1c1e22';
    ctx.fillRect(96, 176, 320, 160);
    ctx.strokeStyle = '#555b66';
    ctx.lineWidth = 5;
    ctx.strokeRect(96, 176, 320, 160);
    
    // Text: TELECOM FIBRA OTTICA
    ctx.fillStyle = '#8f95a0';
    ctx.font = 'bold 26px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TELECOM ITALIA', 256, 230);
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('RETE FIBRA OTTICA', 256, 265);
    ctx.font = '16px monospace';
    ctx.fillText('UNI EN 124 - D400', 256, 298);

    return new THREE.CanvasTexture(canvas);
}

function createFiberCopLogoTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#dcdedf';
    ctx.fillRect(0, 0, 256, 128);
    
    ctx.fillStyle = '#004b97'; // Blue
    ctx.font = 'bold 42px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Fiber', 28, 75);
    
    ctx.fillStyle = '#00a850'; // Green
    ctx.fillText('Cop', 134, 75);
    
    return new THREE.CanvasTexture(canvas);
}

// Inizializzazione Three.js
function init3D() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0d14);
    scene.fog = new THREE.FogExp2(0x0a0d14, 0.04);

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(3.2, 2.2, 3.8);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2.05;

    // Illuminazione Avanzata
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.9);
    mainLight.position.set(6, 12, 8);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const cyanRim = new THREE.PointLight(0x00f0ff, 0.8, 12);
    cyanRim.position.set(-3, 2, -2);
    scene.add(cyanRim);

    const warmFill = new THREE.PointLight(0xff9944, 0.4, 8);
    warmFill.position.set(2, 0.5, 3);
    scene.add(warmFill);

    // Griglia pavimento cibernetico
    const grid = new THREE.GridHelper(12, 24, 0x00f0ff, 0x1e293b);
    grid.position.y = -0.01;
    scene.add(grid);

    buildARL();

    window.addEventListener('resize', onWindowResize, false);
    animate();
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    if (!container || !renderer || !camera) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    if (controls) controls.update();
    
    // Pulsazione LED attivi per l'OLT
    if (activeLeds.length > 0) {
        const time = Date.now() * 0.008;
        activeLeds.forEach((led, idx) => {
            const flicker = Math.sin(time + idx * 1.5) > 0.3 ? 1 : 0.2;
            led.material.opacity = flicker;
        });
    }

    if (renderer && scene && camera) renderer.render(scene, camera);
}

function clearScene() {
    if (currentGroup) {
        scene.remove(currentGroup);
    }
    currentGroup = new THREE.Group();
    scene.add(currentGroup);
    isExploded = false;
    activeLeds = [];
    doorPivots = [];
    
    const titleEl = document.getElementById('info-title');
    const descEl = document.getElementById('info-desc');
    const infoEl = document.getElementById('model-info');
    if (titleEl) titleEl.innerText = '';
    if (descEl) descEl.innerText = '';
    if (infoEl) infoEl.style.opacity = '0';
}

function updateInfo(title, desc) {
    const titleEl = document.getElementById('info-title');
    const descEl = document.getElementById('info-desc');
    const infoEl = document.getElementById('model-info');
    if (titleEl) titleEl.innerText = title;
    if (descEl) descEl.innerHTML = desc;
    if (infoEl) infoEl.style.opacity = '1';
}

// ==========================================
// 1. ARL (Armadio Ripartilinea Rame TIM)
// ==========================================
function buildARL() {
    clearScene();

    // 1. Zoccolo di fondazione in calcestruzzo
    const baseGeo = new THREE.BoxGeometry(1.6, 0.25, 0.65);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x4a4f55, roughness: 0.95 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.125;
    base.receiveShadow = true;
    currentGroup.add(base);

    // 2. Telaio centrale in vetroresina/metallo
    const bodyGeo = new THREE.BoxGeometry(1.4, 1.5, 0.5);
    const bodyMat = new THREE.MeshStandardMaterial({ 
        color: 0x7c838e, 
        roughness: 0.5, 
        metalness: 0.2,
        map: createLouverTexture()
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.0;
    body.castShadow = true;
    currentGroup.add(body);

    // 3. Tettuccio Rosso Iconico (Curvo con grondaia)
    const roofCurve = new THREE.CylinderGeometry(0.72, 0.72, 1.5, 16, 1, false, 0, Math.PI);
    const roofMat = new THREE.MeshStandardMaterial({ 
        color: 0xd61c1c, 
        roughness: 0.35, 
        metalness: 0.1 
    });
    const roof = new THREE.Mesh(roofCurve, roofMat);
    roof.rotation.z = Math.PI / 2;
    roof.rotation.x = Math.PI / 2;
    roof.position.set(0, 1.75, 0);
    roof.castShadow = true;
    currentGroup.add(roof);

    // 4. Colonnina e-distribuzione affiancata (immancabile come nelle note di Collesalvetti!)
    const enelBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.2, 0.4),
        new THREE.MeshStandardMaterial({ color: 0x3e4247 })
    );
    enelBase.position.set(1.15, 0.1, 0);
    currentGroup.add(enelBase);

    const enelBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.44, 0.9, 0.35),
        new THREE.MeshStandardMaterial({ color: 0x8a929e, roughness: 0.6 })
    );
    enelBody.position.set(1.15, 0.65, 0);
    enelBody.castShadow = true;
    currentGroup.add(enelBody);

    // Logo fulmine colonnina Enel
    const boltMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(0.12, 0.12),
        new THREE.MeshBasicMaterial({ map: createLaserWarningTexture(), transparent: true })
    );
    boltMesh.position.set(1.15, 0.75, 0.18);
    currentGroup.add(boltMesh);

    // 5. Vano interno: Strisce morsettiere rame a 10 coppie Telecom
    const internals = new THREE.Group();
    for (let col = -0.4; col <= 0.4; col += 0.28) {
        for (let row = 0.5; row <= 1.5; row += 0.11) {
            const stripGeo = new THREE.BoxGeometry(0.2, 0.05, 0.08);
            const stripMat = new THREE.MeshStandardMaterial({ color: 0xc87533, metalness: 0.6, roughness: 0.3 }); // Rame
            const strip = new THREE.Mesh(stripGeo, stripMat);
            strip.position.set(col, row, 0.15);
            internals.add(strip);

            // Morsetti e passafili
            const wireGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.08);
            const wireMat = new THREE.MeshBasicMaterial({ color: (row > 1.0) ? 0x0088ff : 0xee2222 });
            const wire = new THREE.Mesh(wireGeo, wireMat);
            wire.rotation.x = Math.PI / 2;
            wire.position.set(col + 0.08, row, 0.2);
            internals.add(wire);
        }
    }
    internals.name = "internals";
    internals.visible = false;
    currentGroup.add(internals);

    // 6. Sportello Incernierato ad apertura reale
    const doorPivot = new THREE.Group();
    doorPivot.position.set(-0.7, 1.0, 0.26); // Cerniera a sinistra

    const doorPanel = new THREE.Mesh(
        new THREE.BoxGeometry(1.38, 1.48, 0.03),
        new THREE.MeshStandardMaterial({ color: 0x6e7580, roughness: 0.45, metalness: 0.3 })
    );
    doorPanel.position.set(0.69, 0, 0);
    doorPanel.castShadow = true;

    // Serratura Telecom
    const lock = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, 0.02, 16),
        new THREE.MeshStandardMaterial({ color: 0xcca844, metalness: 0.8, roughness: 0.2 })
    );
    lock.rotation.x = Math.PI / 2;
    lock.position.set(1.28, 0, 0.02);
    doorPanel.add(lock);

    doorPivot.add(doorPanel);
    doorPivot.name = "door";
    doorPivots.push(doorPivot);
    currentGroup.add(doorPivot);

    camera.position.set(0.5, 1.6, 3.2);
    controls.target.set(0.3, 1.0, 0);

    updateInfo(
        "ARL - Armadio Ripartilinea TIM (Rame)",
        "<b>Infrastruttura:</b> Ripartilinea stradale primaria/secondaria doppini in rame.<br>" +
        "<b>Segni distintivi a Collesalvetti:</b> Iconico tettuccio rosso curvo e affiancamento costante alla colonnina e-distribuzione grigia.<br>" +
        "<b>All'interno:</b> 200 - 800 coppie di morsettiere IDC a perforazione d'isolante."
    );
}

// ==========================================
// 2. ARLO (Armadio Ottico FiberCop)
// ==========================================
function buildARLO() {
    clearScene();

    // 1. Zoccolo rinforzato scuro
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(1.15, 0.18, 0.55),
        new THREE.MeshStandardMaterial({ color: 0x32353a, roughness: 0.9 })
    );
    base.position.y = 0.09;
    base.receiveShadow = true;
    currentGroup.add(base);

    // 2. Corpo Armadio FiberCop Grigio Chiaro
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(1.08, 1.45, 0.48),
        new THREE.MeshStandardMaterial({ color: 0xdce0e5, roughness: 0.35, metalness: 0.15 })
    );
    body.position.y = 0.9;
    body.castShadow = true;
    currentGroup.add(body);

    // 3. Vano interno: Cassetti di giunzione, Splitter 1:4 e 1:16, e bretelle gialle
    const internals = new THREE.Group();
    
    // Telaio Splitter Ottici (1:4 primaria in alto, 1:16 secondaria in basso)
    for (let i = 0; i < 6; i++) {
        const tray = new THREE.Mesh(
            new THREE.BoxGeometry(0.9, 0.08, 0.35),
            new THREE.MeshStandardMaterial({ color: 0x1f2328, roughness: 0.6 })
        );
        tray.position.set(0, 1.35 - (i * 0.13), 0.05);
        internals.add(tray);

        // Connettori ottici verdi SC/APC
        for (let c = -0.36; c <= 0.36; c += 0.08) {
            const conn = new THREE.Mesh(
                new THREE.BoxGeometry(0.04, 0.04, 0.06),
                new THREE.MeshBasicMaterial({ color: 0x00cc44 }) // Verde SC/APC
            );
            conn.position.set(c, 1.35 - (i * 0.13) + 0.04, 0.2);
            internals.add(conn);
        }
    }

    // Fibre ottiche monomodali gialle realisticamente curve (G.657.A2)
    for (let f = 0; f < 10; f++) {
        const curve = new THREE.CubicBezierCurve3(
            new THREE.Vector3(-0.35 + (f * 0.07), 1.25, 0.2),
            new THREE.Vector3(-0.35 + (f * 0.07), 0.5, 0.15),
            new THREE.Vector3(0.2, 0.4, 0.18),
            new THREE.Vector3(0.3, 0.8 + (f * 0.05), 0.2)
        );
        const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.008, 6, false);
        const tubeMat = new THREE.MeshStandardMaterial({ color: 0xffdd00, roughness: 0.3 }); // Giallo monomodale
        const fiber = new THREE.Mesh(tubeGeo, tubeMat);
        internals.add(fiber);
    }

    internals.name = "internals";
    internals.visible = false;
    currentGroup.add(internals);

    // 4. Doppi sportelli incernierati con logo FiberCop e pericolo laser
    // Sportello Sinistro
    const leftPivot = new THREE.Group();
    leftPivot.position.set(-0.54, 0.9, 0.25);
    const leftDoor = new THREE.Mesh(
        new THREE.BoxGeometry(0.53, 1.42, 0.025),
        new THREE.MeshStandardMaterial({ color: 0xd6dbe0, roughness: 0.35, metalness: 0.2 })
    );
    leftDoor.position.set(0.265, 0, 0);
    leftDoor.castShadow = true;

    // Targa Logo FiberCop
    const logoMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(0.32, 0.16),
        new THREE.MeshBasicMaterial({ map: createFiberCopLogoTexture(), transparent: true })
    );
    logoMesh.position.set(0.26, 0.3, 0.015);
    leftDoor.add(logoMesh);

    // Cartello pericolo radiazione Laser
    const laserMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(0.12, 0.12),
        new THREE.MeshBasicMaterial({ map: createLaserWarningTexture(), transparent: true })
    );
    laserMesh.position.set(0.26, -0.4, 0.015);
    leftDoor.add(laserMesh);

    leftPivot.add(leftDoor);
    doorPivots.push(leftPivot);
    currentGroup.add(leftPivot);

    // Sportello Destro
    const rightPivot = new THREE.Group();
    rightPivot.position.set(0.54, 0.9, 0.25);
    const rightDoor = new THREE.Mesh(
        new THREE.BoxGeometry(0.53, 1.42, 0.025),
        new THREE.MeshStandardMaterial({ color: 0xd6dbe0, roughness: 0.35, metalness: 0.2 })
    );
    rightDoor.position.set(-0.265, 0, 0);
    rightDoor.castShadow = true;

    rightPivot.add(rightDoor);
    doorPivots.push(rightPivot);
    currentGroup.add(rightPivot);

    camera.position.set(0, 1.4, 2.8);
    controls.target.set(0, 0.9, 0);

    updateInfo(
        "ARLO - Armadio Ottico FiberCop",
        "<b>Infrastruttura:</b> Nodo ottico passivo primario/secondario FTTH.<br>" +
        "<b>Tecnologia:</b> Architettura punto-multipunto GPON e XGS-PON con splitting passivo a 2 stadi (1:4 primaria + 1:16 secondaria).<br>" +
        "<b>Dettagli:</b> Portelli incernierati con cartello di pericolo laser classe 1M e bretelle ottiche monomodali 9/125 G.657.A2."
    );
}

// ==========================================
// 3. Centrale TIM & Rack OLT (XGS-PON 10G)
// ==========================================
function buildCentrale() {
    clearScene();

    // 1. Armadio Rack Telecom standard 19" 42U
    const rackFrame = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 2.4, 1.1),
        new THREE.MeshStandardMaterial({ color: 0x14171c, metalness: 0.85, roughness: 0.3 })
    );
    rackFrame.position.y = 1.2;
    rackFrame.castShadow = true;
    currentGroup.add(rackFrame);

    // Montanti verticali forati a passi rack
    for (let side of [-0.42, 0.42]) {
        const rail = new THREE.Mesh(
            new THREE.BoxGeometry(0.04, 2.3, 0.04),
            new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.2 })
        );
        rail.position.set(side, 1.2, 0.45);
        currentGroup.add(rail);
    }

    // 2. Chassis OLT ad alta densità (Nokia 7360 / Huawei MA5800)
    const oltChassis = new THREE.Mesh(
        new THREE.BoxGeometry(0.82, 0.8, 0.85),
        new THREE.MeshStandardMaterial({ color: 0x242830, metalness: 0.6, roughness: 0.4 })
    );
    oltChassis.position.set(0, 1.25, 0.05);
    currentGroup.add(oltChassis);

    // 3. Schede di Linea Ottica XGS-PON con porte SFP+ e LED pulsanti
    for (let slot = -0.34; slot <= 0.34; slot += 0.06) {
        const card = new THREE.Mesh(
            new THREE.BoxGeometry(0.045, 0.72, 0.8),
            new THREE.MeshStandardMaterial({ color: 0x1a1d24 })
        );
        card.position.set(slot, 1.25, 0.08);
        currentGroup.add(card);

        // Porte SFP+ con LED
        for (let p = 0; p < 8; p++) {
            // Gabbia metallica SFP+
            const sfp = new THREE.Mesh(
                new THREE.BoxGeometry(0.025, 0.035, 0.02),
                new THREE.MeshStandardMaterial({ color: 0x8892a0, metalness: 0.9 })
            );
            sfp.position.set(slot, 1.55 - (p * 0.08), 0.49);
            currentGroup.add(sfp);

            // LED di attività (Verde/Ciano)
            const led = new THREE.Mesh(
                new THREE.BoxGeometry(0.01, 0.015, 0.005),
                new THREE.MeshBasicMaterial({ 
                    color: (p % 2 === 0) ? 0x00ff88 : 0x00f0ff,
                    transparent: true,
                    opacity: 0.8
                })
            );
            led.position.set(slot + 0.015, 1.55 - (p * 0.08), 0.505);
            currentGroup.add(led);
            activeLeds.push(led);
        }
    }

    // 4. ODF (Optical Distribution Frame) Permutatore Ottico
    const odf = new THREE.Mesh(
        new THREE.BoxGeometry(0.82, 0.35, 0.85),
        new THREE.MeshStandardMaterial({ color: 0x383e47, metalness: 0.4 })
    );
    odf.position.set(0, 1.9, 0.05);
    currentGroup.add(odf);

    // Fascette di cavi ottici gialli in discesa ordinata
    for (let i = -0.3; i <= 0.3; i += 0.1) {
        const dropCurve = new THREE.CubicBezierCurve3(
            new THREE.Vector3(i, 1.85, 0.48),
            new THREE.Vector3(i, 1.5, 0.52),
            new THREE.Vector3(0.38, 1.3, 0.5),
            new THREE.Vector3(0.38, 0.5, 0.4)
        );
        const tube = new THREE.Mesh(
            new THREE.TubeGeometry(dropCurve, 16, 0.012, 6, false),
            new THREE.MeshStandardMaterial({ color: 0xffcc00, roughness: 0.4 })
        );
        currentGroup.add(tube);
    }

    camera.position.set(0, 1.4, 2.4);
    controls.target.set(0, 1.25, 0);

    updateInfo(
        "Centrale OLT - Sede OLT XGS-PON 10G",
        "<b>Apparato:</b> Optical Line Terminal (OLT) di Centrale Telecom.<br>" +
        "<b>Prestazioni:</b> Moduli ottici SFP+ con lunghezze d'onda separate (1310/1490nm per GPON 2.5G e 1270/1577nm simmetrici per XGS-PON 10Gbps).<br>" +
        "<b>Funzione:</b> Genera i fasci laser che illuminano tutti gli armadi e le unità abitative del comune."
    );
}

// ==========================================
// 4. Scavo, Mini-trincea & Pozzetto con Muffola
// ==========================================
function buildPozzetto() {
    clearScene();

    // 1. Blocco stradale asfalto e sottostrato
    const asphalt = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.25, 2.4),
        new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.95 }) // Asfalto scuro
    );
    asphalt.position.y = -0.125;
    asphalt.receiveShadow = true;
    currentGroup.add(asphalt);

    const subbase = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.8, 2.4),
        new THREE.MeshStandardMaterial({ color: 0x4a3b2c, roughness: 1.0 }) // Sottofondo e terreno
    );
    subbase.position.y = -0.65;
    subbase.receiveShadow = true;
    currentGroup.add(subbase);

    // 2. Scavo in Mini-trincea (Taglio netto 10cm nell'asfalto)
    const trenchCut = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.7, 2.4),
        new THREE.MeshStandardMaterial({ color: 0x121315, roughness: 1.0 })
    );
    trenchCut.position.set(-0.65, -0.4, 0);
    currentGroup.add(trenchCut);

    // Fascio di Microtubi Colorati (Fender)
    const ductColors = [0xff6600, 0x0088ff, 0x00cc44, 0xffcc00, 0x8844cc, 0xff2244, 0xffffff];
    ductColors.forEach((col, idx) => {
        const duct = new THREE.Mesh(
            new THREE.CylinderGeometry(0.025, 0.025, 2.4, 12),
            new THREE.MeshStandardMaterial({ color: col, roughness: 0.4 })
        );
        duct.rotation.x = Math.PI / 2;
        const colIdx = idx % 2;
        const rowIdx = Math.floor(idx / 2);
        duct.position.set(-0.68 + (colIdx * 0.06), -0.6 + (rowIdx * 0.06), 0);
        currentGroup.add(duct);
    });

    // 3. Cameretta Pozzetto sotterranea in calcestruzzo
    const chamber = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.9, 1.1),
        new THREE.MeshStandardMaterial({ color: 0x5a5f66, roughness: 0.9 })
    );
    chamber.position.set(0.35, -0.5, 0);
    currentGroup.add(chamber);

    // Vuoto interno della cameretta
    const chamberVoid = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.8, 0.9),
        new THREE.MeshStandardMaterial({ color: 0x111316, roughness: 1.0 })
    );
    chamberVoid.position.set(0.35, -0.45, 0);
    currentGroup.add(chamberVoid);

    // 4. Muffola di Giunzione a Cupola (OFSC) stagna
    const muffolaGroup = new THREE.Group();
    muffolaGroup.position.set(0.35, -0.5, 0);

    const domeBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.14, 0.45, 24),
        new THREE.MeshStandardMaterial({ color: 0x1a1c1e, roughness: 0.35, metalness: 0.4 })
    );
    muffolaGroup.add(domeBody);

    const domeCap = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshStandardMaterial({ color: 0x1a1c1e, roughness: 0.35, metalness: 0.4 })
    );
    domeCap.position.y = 0.225;
    muffolaGroup.add(domeCap);

    const clampRing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.145, 0.145, 0.05, 24),
        new THREE.MeshStandardMaterial({ color: 0xb0b8c0, metalness: 0.9, roughness: 0.2 }) // Ghiera inox
    );
    clampRing.position.y = -0.15;
    muffolaGroup.add(clampRing);

    currentGroup.add(muffolaGroup);

    // 5. Chiusino in Ghisa (Tombino) con texture diamond grip e scritta Telecom
    const lid = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.05, 1.0),
        new THREE.MeshStandardMaterial({ 
            color: 0x50555e, 
            metalness: 0.7, 
            roughness: 0.4,
            map: createManholeTexture()
        })
    );
    lid.position.set(0.35, 0.025, 0);
    lid.castShadow = true;
    lid.name = "manhole_lid";
    currentGroup.add(lid);

    camera.position.set(1.6, 1.4, 2.0);
    controls.target.set(0, -0.2, 0);

    updateInfo(
        "Posa Fibra: Mini-trincea e Pozzetto con Muffola",
        "<b>Ingegneria Civile:</b> Taglio ridotto su asfalto (mini-trincea) con alloggiamento fascio microtubi colorati (fender).<br>" +
        "<b>Pozzetto e Chiusino:</b> Cameretta di derivazione in calcestruzzo con chiusino carrabile D400 in ghisa sferoidale Telecom.<br>" +
        "<b>Muffola a Cupola:</b> Giunto ottico stagno pressurizzato (OFSC) che protegge le saldature a fusione tra i cavi primari e secondari."
    );
}

// Azione: Apri / Vista Interna
function toggleExplode() {
    isExploded = !isExploded;
    window.cyberAudio.playClick();
    
    // Rotazione sportelli su cerniere
    doorPivots.forEach(pivot => {
        if (isExploded) {
            pivot.rotation.y = (pivot.position.x < 0) ? -Math.PI * 0.65 : Math.PI * 0.65;
        } else {
            pivot.rotation.y = 0;
        }
    });

    // Spostamento tombino
    if (currentGroup) {
        currentGroup.traverse(child => {
            if (child.name === "internals") {
                child.visible = isExploded;
            }
            if (child.name === "manhole_lid") {
                child.position.z = isExploded ? 0.9 : 0;
            }
        });
    }
}

function toggleWireframe() {
    window.cyberAudio.playHover();
    if (currentGroup) {
        currentGroup.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.wireframe = !child.material.wireframe;
            }
        });
    }
}

window.init3D = init3D;
window.buildARL = buildARL;
window.buildARLO = buildARLO;
window.buildCentrale = buildCentrale;
window.buildPozzetto = buildPozzetto;
window.toggleExplode = toggleExplode;
window.toggleWireframe = toggleWireframe;
