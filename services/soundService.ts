
class SoundService {
  private ctx: AudioContext | null = null;
  private volume: number = 0.15; // Slightly lower default volume for a more professional feel
  private isMuted: boolean = false;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  // A clean, metallic "clink" for button clicks
  playClick() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx!.currentTime;
    
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    const filter = this.ctx!.createBiquadFilter();
    
    // High frequency sine for the "ping"
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
    
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1000, now);
    
    gain.gain.setValueAtTime(this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx!.destination);
    
    osc.start();
    osc.stop(now + 0.08);
  }

  // A subtle "digital tick" for hovering
  playHover() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx!.currentTime;
    
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2400, now);
    
    gain.gain.setValueAtTime(this.volume * 0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
    
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    
    osc.start();
    osc.stop(now + 0.02);
  }

  // A synthesized "swipe" or "scan" for view transitions
  playTransition() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx!.currentTime;
    const duration = 0.4;
    
    const osc = this.ctx!.createOscillator();
    const noise = this.ctx!.createBufferSource();
    const filter = this.ctx!.createBiquadFilter();
    const gain = this.ctx!.createGain();
    
    // Create a tiny noise buffer for a "whoosh" texture
    const bufferSize = this.ctx!.sampleRate * duration;
    const buffer = this.ctx!.createBuffer(1, bufferSize, this.ctx!.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noise.buffer = buffer;

    osc.type = 'square'; // Industrial buzz
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + duration);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, now);
    filter.frequency.exponentialRampToValueAtTime(50, now + duration);
    filter.Q.setValueAtTime(10, now);
    
    gain.gain.setValueAtTime(this.volume * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    osc.connect(filter);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx!.destination);
    
    osc.start();
    noise.start();
    osc.stop(now + duration);
    noise.stop(now + duration);
  }

  // A sophisticated "system ready" arpeggio
  playSuccess() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx!.currentTime;
    const frequencies = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5 (Major triad)
    
    frequencies.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 2, now + i * 0.06);
      
      gain.gain.setValueAtTime(0, now + i * 0.06);
      gain.gain.linearRampToValueAtTime(this.volume * 0.4, now + i * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx!.destination);
      
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.25);
    });
  }

  async playPCM(base64Audio: string, sampleRate: number = 24000) {
    if (this.isMuted) return;
    this.init();

    try {
      const binaryString = atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const dataInt16 = new Int16Array(bytes.buffer);
      const numChannels = 1;
      const frameCount = dataInt16.length / numChannels;

      const buffer = this.ctx!.createBuffer(numChannels, frameCount, sampleRate);
      const channelData = buffer.getChannelData(0);

      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i] / 32768.0;
      }

      const source = this.ctx!.createBufferSource();
      source.buffer = buffer;
      source.connect(this.ctx!.destination);
      source.start();
    } catch (e) {
      console.error("Error playing PCM audio", e);
    }
  }
}

export const sounds = new SoundService();
