class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeNodes: (OscillatorNode | AudioNode)[] = [];
  private isMuted: boolean = false;
  private currentPreset: string | null = null;
  private intervalId: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playPreset(preset: 'temple_bells' | 'sitar_raga' | 'courtyard_breeze' | 'river_dawn') {
    this.stop();
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.currentPreset = preset;

    if (preset === 'sitar_raga') {
      // Tanpura fundamental frequencies: Sa (136.1 Hz - cosmic om), Pa (204.1 Hz), higher Sa (272.2 Hz)
      const freqs = [136.1, 136.1 * 1.5, 136.1 * 2, 68.05];
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // LFO for subtle sitar string shimmering
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.25 + idx * 0.1, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();
        this.activeNodes.push(lfo, lfoGain);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320 + idx * 100, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), this.ctx.currentTime + 2.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        this.activeNodes.push(osc, gain, filter);
      });
    } else if (preset === 'temple_bells') {
      // Deep temple bell tone + recurring chimes
      this.triggerBell(220, 0.4);
      this.triggerBell(440, 0.2);

      // Periodically chime every 7-10 seconds
      this.intervalId = window.setInterval(() => {
        const bellPitches = [330, 440, 554, 660, 220];
        const pitch = bellPitches[Math.floor(Math.random() * bellPitches.length)];
        this.triggerBell(pitch, 0.25);
      }, 7500);
    } else if (preset === 'courtyard_breeze') {
      // Pink/Brown noise simulation for desert/palace wind
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start();
      this.activeNodes.push(noise, filter, gain);
    } else if (preset === 'river_dawn') {
      // Soft water stream + gentle morning chant harmonics
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(108, this.ctx.currentTime); // Sacred 108 Hz Om fundamental

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.07, this.ctx.currentTime + 3);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      this.activeNodes.push(osc, gain);

      this.intervalId = window.setInterval(() => {
        this.triggerChime(880, 0.08);
      }, 9000);
    }
  }

  private triggerBell(frequency: number, intensity: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    // Fundamental + metallic harmonics
    const harmonics = [1, 2.02, 2.98, 4.15];
    harmonics.forEach((h, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency * h, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime((intensity / (i + 1)) * 0.8, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8 + (1 / (i + 1)) * 2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 6.0);
    });
  }

  private triggerChime(frequency: number, intensity: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(intensity, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 3);
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.activeNodes.forEach((node) => {
      try {
        if ('stop' in node && typeof (node as OscillatorNode).stop === 'function') {
          (node as OscillatorNode).stop();
        }
        node.disconnect();
      } catch {
        // node already stopped
      }
    });
    this.activeNodes = [];
    this.currentPreset = null;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getCurrentPreset(): string | null {
    return this.currentPreset;
  }
}

export const soundEngine = new AmbientSoundEngine();
