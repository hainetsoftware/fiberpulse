class CyberAudio {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.muted = localStorage.getItem('fiberpulse_muted') === 'true';
    }

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('fiberpulse_muted', this.muted);
        return this.muted;
    }

    playClick() {
        if (this.muted) return;
        this._playTone(800, 'sine', 0.05, 0.1);
        this._playTone(1200, 'square', 0.02, 0.05);
    }

    playHover() {
        if (this.muted) return;
        this._playTone(400, 'sine', 0.02, 0.05);
    }

    playFly() {
        if (this.muted) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.5);
        
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);
    }
    
    playModalOpen() {
        if (this.muted) return;
        this._playTone(300, 'triangle', 0.1, 0.1);
        setTimeout(() => this._playTone(400, 'triangle', 0.1, 0.2), 100);
        setTimeout(() => this._playTone(600, 'sine', 0.1, 0.3), 200);
    }

    _playTone(freq, type, vol, dur) {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start();
        osc.stop(this.ctx.currentTime + dur);
    }
}

window.cyberAudio = new CyberAudio();
