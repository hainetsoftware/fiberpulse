// js/osint_tracker.js - Modulo OSINT Intelligence & AI Surveillance Feed
// Monitoraggio investigativo della rete wholesale FiberCop e cantieri Collesalvetti

let OSINT_REPORTS = [];

async function loadOsintReports() {
    try {
        const res = await fetch('data/osint_briefings.json');
        if (res.ok) {
            OSINT_REPORTS = await res.json();
        }
    } catch (e) {
        console.warn('Fallback local OSINT reports', e);
    }

    renderOsintFeed();
}

function renderOsintFeed() {
    const cont = document.getElementById('osint-reports-list');
    const badgeCount = document.getElementById('osint-badge-count');
    if (badgeCount) badgeCount.innerText = OSINT_REPORTS.length + ' Dossier';
    if (!cont) return;

    cont.innerHTML = '';

    OSINT_REPORTS.forEach(rpt => {
        const card = document.createElement('div');
        card.className = 'glass-panel border border-cyber-border/60 hover:border-cyber-neon/60 rounded-xl p-5 mb-5 transition-all shadow-xl';

        let findingsHtml = rpt.punti_chiave.map(p => 
            '<li class="flex items-start gap-2 text-xs text-slate-200"><span class="text-cyber-neon font-bold mt-0.5">⚡</span><span class="leading-relaxed">' + p + '</span></li>'
        ).join('');

        let discHtml = rpt.discrepanze_rilevate.map(d => 
            '<div class="p-3 bg-black/40 border border-white/10 rounded-lg text-xs mb-2">' +
                '<div class="flex items-center justify-between gap-2 mb-1">' +
                    '<b class="text-white">' + d.ambito + '</b>' +
                    '<span class="px-2 py-0.5 rounded text-[10px] font-bold ' + (d.criticita === 'Alta' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30') + '">Criticità: ' + d.criticita + '</span>' +
                '</div>' +
                '<div class="text-slate-400 mb-0.5"><b>Dichiarato:</b> ' + d.dichiarato + '</div>' +
                '<div class="text-cyber-neon"><b>Riscontro OSINT:</b> ' + d.riscontro_campo + '</div>' +
            '</div>'
        ).join('');

        let targetsHtml = rpt.entita_target.map(t => 
            '<span class="text-[11px] bg-white/5 border border-white/15 px-2 py-0.5 rounded text-slate-300">🎯 ' + t + '</span>'
        ).join(' ');

        let raccomandazioniHtml = rpt.raccomandazioni_prossimi_rilievi.map(r => 
            '<li class="flex items-start gap-2 text-xs text-amber-300"><span class="font-bold">🔍</span><span>' + r + '</span></li>'
        ).join('');

        card.innerHTML = 
            '<div class="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 mb-3">' +
                '<div class="flex items-center gap-2">' +
                    '<span class="px-2 py-0.5 bg-cyber-neon/20 border border-cyber-neon/40 text-cyber-neon text-[10px] font-mono font-bold rounded uppercase tracking-wider">' + rpt.protocollo + '</span>' +
                    '<span class="text-xs text-slate-400 font-mono">' + rpt.data + ' - ' + rpt.ora_emissione + '</span>' +
                '</div>' +
                '<div class="flex items-center gap-2">' +
                    '<span class="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded font-mono font-bold">AFFIDABILITÀ: ' + rpt.affidabilita + ' (' + rpt.livello_confidenza + '%)</span>' +
                '</div>' +
            '</div>' +
            '<div class="text-[10px] uppercase font-mono text-slate-400 mb-1">' + rpt.classificazione + '</div>' +
            '<h3 class="text-xl font-['Rajdhani'] font-bold text-white mb-2">' + rpt.titolo + '</h3>' +
            '<div class="flex flex-wrap gap-1.5 mb-4">' + targetsHtml + '</div>' +
            '<div class="p-3.5 bg-black/40 border border-cyber-border/40 rounded-xl mb-4 text-xs text-slate-300 leading-relaxed">' +
                '<b class="text-cyber-neon uppercase tracking-wider block text-[10px] mb-1">Sintesi Esecutiva AI:</b>' +
                rpt.sintesi_esecutiva +
            '</div>' +
            '<div class="mb-4">' +
                '<h4 class="text-xs uppercase font-bold text-slate-300 mb-2 flex items-center gap-1.5"><span class="text-cyber-neon">▶</span> Evidenze di Rete & Punti Chiave Rilevati</h4>' +
                '<ul class="space-y-2 bg-white/5 p-3 rounded-lg border border-white/5">' + findingsHtml + '</ul>' +
            '</div>' +
            '<div class="mb-4">' +
                '<h4 class="text-xs uppercase font-bold text-slate-300 mb-2 flex items-center gap-1.5"><span class="text-amber-400">▶</span> Matrice di Discrepanza (Dichiarazioni vs Riscontro sul Campo)</h4>' +
                '<div class="space-y-1">' + discHtml + '</div>' +
            '</div>' +
            '<div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">' +
                '<div class="p-3 bg-black/30 rounded-lg border border-white/10 text-xs">' +
                    '<div class="text-[10px] uppercase text-slate-400 font-bold mb-1">Catena Appalti & Esecuzione</div>' +
                    '<div><b>Titolare:</b> <span class="text-white">' + rpt.catena_operatori.titolare_infrastruttura + '</span></div>' +
                    '<div><b>Richiedente Scavi:</b> <span class="text-cyber-neon">' + rpt.catena_operatori.richiedente_autorizzazioni + '</span></div>' +
                    '<div><b>Tecnologia:</b> <span class="text-slate-300">' + rpt.catena_operatori.tecnologia_posa + '</span></div>' +
                '</div>' +
                '<div class="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs">' +
                    '<div class="text-[10px] uppercase text-amber-400 font-bold mb-1">Obiettivi Prossima Ricognizione</div>' +
                    '<ul class="space-y-1.5">' + raccomandazioniHtml + '</ul>' +
                '</div>' +
            '</div>' +
            '<div class="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-slate-400">' +
                '<div>Analista OSINT: <b class="text-slate-200">' + rpt.autore + '</b></div>' +
                '<button onclick="window.print()" class="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-semibold flex items-center gap-1 transition-all">🖨️ Stampa Dossier</button>' +
            '</div>';

        cont.appendChild(card);
    });
}

window.initOsintTracker = loadOsintReports;
