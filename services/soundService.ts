
class SoundService {
  private ctx: AudioContext | null = null;
  private volume: number = 0.3;
  private isMuted: boolean = false;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  playClick() {
    if (this.isMuted) return;
    this.init();
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx!.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx!.currentTime + 0.1);
    
    gain.gain.setValueAtTime(this.volume, this.ctx!.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    
    osc.start();
    osc.stop(this.ctx!.currentTime + 0.1);
  }

  playHover() {
    if (this.isMuted) return;
    this.init();
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, this.ctx!.currentTime);
    osc.frequency.linearRampToValueAtTime(600, this.ctx!.currentTime + 0.05);
    
    gain.gain.setValueAtTime(this.volume * 0.2, this.ctx!.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx!.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    
    osc.start();
    osc.stop(this.ctx!.currentTime + 0.05);
  }

  playTransition() {
    if (this.isMuted) return;
    this.init();
    const osc1 = this.ctx!.createOscillator();
    const osc2 = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(200, this.ctx!.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(800, this.ctx!.currentTime + 0.3);
    
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(100, this.ctx!.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(400, this.ctx!.currentTime + 0.3);
    
    gain.gain.setValueAtTime(this.volume * 0.5, this.ctx!.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + 0.3);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx!.destination);
    
    osc1.start();
    osc2.start();
    osc1.stop(this.ctx!.currentTime + 0.3);
    osc2.stop(this.ctx!.currentTime + 0.3);
  }

  playSuccess() {
    if (this.isMuted) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.08);
      gain.gain.setValueAtTime(this.volume, this.ctx!.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + i * 0.08 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(this.ctx!.currentTime + i * 0.08);
      osc.stop(this.ctx!.currentTime + i * 0.08 + 0.3);
    });
  }
}

export const sounds = new SoundService();
