/**
 * Stars.js — Procedural animated starfield background
 * Renders twinkling stars on a canvas behind the content
 */

export class Stars {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.shootingStars = [];
    this.animId = null;

    this._resize();
    this._generate();
    window.addEventListener('resize', () => {
      this._resize();
      this._generate();
    });
  }

  _resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  _generate() {
    const count = Math.floor((this.canvas.width * this.canvas.height) / 4000);
    this.stars = Array.from({ length: count }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      r: Math.random() * 1.5 + 0.2,
      alpha: Math.random() * 0.8 + 0.2,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      speed: Math.random() * 0.005 + 0.002,
      color: this._randomStarColor()
    }));
  }

  _randomStarColor() {
    const colors = ['#ffffff', '#fffde7', '#e3f2fd', '#fce4ec', '#e8eaf6'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  start() {
    this._loop();
    // Spawn shooting stars periodically
    this._shootingStarTimer = setInterval(() => this._spawnShootingStar(), 4000);
  }

  stop() {
    if (this.animId) cancelAnimationFrame(this.animId);
    clearInterval(this._shootingStarTimer);
  }

  _spawnShootingStar() {
    // Only add sometimes for variety
    if (Math.random() > 0.5) return;
    this.shootingStars.push({
      x: Math.random() * this.canvas.width * 0.6,
      y: Math.random() * this.canvas.height * 0.4,
      len: Math.random() * 80 + 40,
      speed: Math.random() * 8 + 5,
      alpha: 1,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3
    });
  }

  _loop() {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    this.stars.forEach(star => {
      star.alpha += star.speed * star.alphaDir;
      if (star.alpha >= 1) { star.alpha = 1; star.alphaDir = -1; }
      if (star.alpha <= 0.1) { star.alpha = 0.1; star.alphaDir = 1; }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.globalAlpha = star.alpha;
      ctx.fill();
    });

    // Draw shooting stars
    ctx.globalAlpha = 1;
    this.shootingStars = this.shootingStars.filter(s => s.alpha > 0);
    this.shootingStars.forEach(s => {
      const ex = s.x + Math.cos(s.angle) * s.len;
      const ey = s.y + Math.sin(s.angle) * s.len;
      
      const grad = ctx.createLinearGradient(s.x, s.y, ex, ey);
      grad.addColorStop(0, `rgba(255,255,255,0)`);
      grad.addColorStop(1, `rgba(255,255,255,${s.alpha})`);
      
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.alpha -= 0.02;
    });

    this.animId = requestAnimationFrame(() => this._loop());
  }
}
