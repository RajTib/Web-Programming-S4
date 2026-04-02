/**
 * AudioPlayer.js — Custom audio player component
 * Replaces default browser controls with a stylish space-themed UI
 */

export class AudioPlayer {
  /**
   * @param {HTMLElement} container - Where to render the player
   * @param {Object} options - { src, title, planetColor }
   */
  constructor(container, options = {}) {
    this.container = container;
    this.src = options.src || '';
    this.title = options.title || 'Audio Narration';
    this.planetColor = options.planetColor || '#4a9eff';
    this.audio = null;
    this.isPlaying = false;
    this.isDragging = false;
    this._render();
    this._bindEvents();
  }

  _render() {
    this.container.innerHTML = `
      <div class="audio-player" style="--planet-color: ${this.planetColor}">
        <div class="audio-player__header">
          <span class="audio-player__icon">🔊</span>
          <span class="audio-player__title">${this.title}</span>
          <span class="audio-player__badge">NARRATION</span>
        </div>
        
        <audio preload="metadata" src="${this.src}"></audio>
        
        <div class="audio-player__controls">
          <button class="audio-btn audio-btn--skip" data-skip="-10" title="Rewind 10s">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/><text x="7" y="16" font-size="6" fill="currentColor">10</text></svg>
          </button>
          
          <button class="audio-btn audio-btn--play" title="Play/Pause">
            <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            <svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor" style="display:none"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          </button>
          
          <button class="audio-btn audio-btn--skip" data-skip="10" title="Forward 10s">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/><text x="7" y="16" font-size="6" fill="currentColor">10</text></svg>
          </button>
        </div>
        
        <div class="audio-player__progress-wrapper">
          <span class="audio-player__time" id="currentTime">0:00</span>
          <div class="audio-player__progress-bar" role="slider" aria-label="Seek">
            <div class="audio-player__progress-fill"></div>
            <div class="audio-player__progress-thumb"></div>
          </div>
          <span class="audio-player__time" id="totalTime">0:00</span>
        </div>
        
        <div class="audio-player__volume">
          <span class="audio-vol-icon">🔈</span>
          <input type="range" class="audio-volume-slider" min="0" max="1" step="0.05" value="0.8">
        </div>
        
        <div class="audio-player__visualizer">
          ${Array.from({length: 20}, () => `<div class="viz-bar"></div>`).join('')}
        </div>
      </div>
    `;

    this.audio = this.container.querySelector('audio');
    this.playBtn = this.container.querySelector('.audio-btn--play');
    this.playIcon = this.container.querySelector('.play-icon');
    this.pauseIcon = this.container.querySelector('.pause-icon');
    this.progressBar = this.container.querySelector('.audio-player__progress-bar');
    this.progressFill = this.container.querySelector('.audio-player__progress-fill');
    this.progressThumb = this.container.querySelector('.audio-player__progress-thumb');
    this.currentTimeEl = this.container.querySelector('#currentTime');
    this.totalTimeEl = this.container.querySelector('#totalTime');
    this.volumeSlider = this.container.querySelector('.audio-volume-slider');
    this.vizBars = this.container.querySelectorAll('.viz-bar');
    this.vizInterval = null;
  }

  _bindEvents() {
    // Play/Pause
    this.playBtn.addEventListener('click', () => this.togglePlay());

    // Skip buttons
    this.container.querySelectorAll('.audio-btn--skip').forEach(btn => {
      btn.addEventListener('click', () => {
        const skip = parseInt(btn.dataset.skip);
        this.audio.currentTime = Math.max(0, Math.min(this.audio.duration || 0, this.audio.currentTime + skip));
      });
    });

    // Progress bar click
    this.progressBar.addEventListener('click', (e) => {
      const rect = this.progressBar.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      if (this.audio.duration) {
        this.audio.currentTime = ratio * this.audio.duration;
      }
    });

    // Audio events
    this.audio.addEventListener('timeupdate', () => this._updateProgress());
    this.audio.addEventListener('loadedmetadata', () => {
      this.totalTimeEl.textContent = this._formatTime(this.audio.duration);
    });
    this.audio.addEventListener('ended', () => this._onEnded());

    // Volume
    this.volumeSlider.addEventListener('input', (e) => {
      this.audio.volume = e.target.value;
    });
    this.audio.volume = 0.8;
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      this.playIcon.style.display = '';
      this.pauseIcon.style.display = 'none';
      this.container.querySelector('.audio-player').classList.remove('is-playing');
      this._stopVisualizer();
    } else {
      this.audio.play().catch(() => {});
      this.isPlaying = true;
      this.playIcon.style.display = 'none';
      this.pauseIcon.style.display = '';
      this.container.querySelector('.audio-player').classList.add('is-playing');
      this._startVisualizer();
    }
  }

  _updateProgress() {
    const { currentTime, duration } = this.audio;
    if (!duration) return;
    const ratio = (currentTime / duration) * 100;
    this.progressFill.style.width = `${ratio}%`;
    this.progressThumb.style.left = `${ratio}%`;
    this.currentTimeEl.textContent = this._formatTime(currentTime);
  }

  _onEnded() {
    this.isPlaying = false;
    this.playIcon.style.display = '';
    this.pauseIcon.style.display = 'none';
    this.container.querySelector('.audio-player').classList.remove('is-playing');
    this._stopVisualizer();
    this.progressFill.style.width = '0%';
    this.progressThumb.style.left = '0%';
    this.audio.currentTime = 0;
  }

  _startVisualizer() {
    this.vizInterval = setInterval(() => {
      this.vizBars.forEach(bar => {
        const h = Math.random() * 24 + 4;
        bar.style.height = `${h}px`;
        bar.style.opacity = 0.4 + Math.random() * 0.6;
      });
    }, 80);
  }

  _stopVisualizer() {
    clearInterval(this.vizInterval);
    this.vizBars.forEach(bar => {
      bar.style.height = '4px';
      bar.style.opacity = '0.3';
    });
  }

  _formatTime(s) {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  destroy() {
    this._stopVisualizer();
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }
  }
}
