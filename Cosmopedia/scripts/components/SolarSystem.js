/**
 * SolarSystem.js — Interactive canvas-based solar system visualization
 * Planets orbit the sun in real-time with click interactions
 */

export class SolarSystem {
  constructor(canvas, onPlanetClick) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onPlanetClick = onPlanetClick || (() => {});
    this.animationId = null;
    this.hoveredPlanet = null;
    this.time = 0;

    // Planet orbital configuration (scaled for visual appeal)
    this.planets = [
      { id: 'mercury', name: 'Mercury', color: '#b5a09a', radius: 5,  orbitRadius: 70,  speed: 4.15, angle: 0,   glowColor: 'rgba(181,160,154,0.4)' },
      { id: 'venus',   name: 'Venus',   color: '#e8c56a', radius: 8,  orbitRadius: 110, speed: 1.62, angle: 1.2, glowColor: 'rgba(232,197,106,0.4)' },
      { id: 'earth',   name: 'Earth',   color: '#4a9eff', radius: 9,  orbitRadius: 155, speed: 1.0,  angle: 2.5, glowColor: 'rgba(74,158,255,0.4)'  },
      { id: 'mars',    name: 'Mars',    color: '#cf4e2a', radius: 6,  orbitRadius: 200, speed: 0.53, angle: 4.0, glowColor: 'rgba(207,78,42,0.4)'   },
      { id: 'jupiter', name: 'Jupiter', color: '#c88b4a', radius: 20, orbitRadius: 275, speed: 0.084,angle: 0.8, glowColor: 'rgba(200,139,74,0.4)'  },
      { id: 'saturn',  name: 'Saturn',  color: '#e8d5a0', radius: 16, orbitRadius: 345, speed: 0.034,angle: 3.2, glowColor: 'rgba(232,213,160,0.4)' },
      { id: 'uranus',  name: 'Uranus',  color: '#7de8e8', radius: 12, orbitRadius: 405, speed: 0.012,angle: 5.0, glowColor: 'rgba(125,232,232,0.4)' },
      { id: 'neptune', name: 'Neptune', color: '#3a6fd8', radius: 11, orbitRadius: 455, speed: 0.006,angle: 1.8, glowColor: 'rgba(58,111,216,0.4)'  },
    ];

    this._resize();
    this._bindEvents();
  }

  _resize() {
    const parent = this.canvas.parentElement;
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;
    this.cx = this.canvas.width / 2;
    this.cy = this.canvas.height / 2;
    
    // Scale orbits to fit canvas
    const maxOrbit = 455;
    const available = Math.min(this.cx, this.cy) - 20;
    this.scale = available / maxOrbit;
  }

  _bindEvents() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      this.hoveredPlanet = null;

      for (const planet of this.planets) {
        const px = this.cx + Math.cos(planet.angle) * planet.orbitRadius * this.scale;
        const py = this.cy + Math.sin(planet.angle) * planet.orbitRadius * this.scale;
        const dist = Math.hypot(mx - px, my - py);
        if (dist < (planet.radius * this.scale + 8)) {
          this.hoveredPlanet = planet;
          break;
        }
      }

      this.canvas.style.cursor = this.hoveredPlanet ? 'pointer' : 'default';
    });

    this.canvas.addEventListener('click', (e) => {
      if (this.hoveredPlanet) {
        this.onPlanetClick(this.hoveredPlanet.id);
      }
    });

    window.addEventListener('resize', () => {
      this._resize();
    });
  }

  start() {
    this._loop();
  }

  stop() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }

  _loop() {
    this._draw();
    this.time += 0.01;
    // Update planet angles
    this.planets.forEach(p => {
      p.angle += p.speed * 0.005;
    });
    this.animationId = requestAnimationFrame(() => this._loop());
  }

  _draw() {
    const { ctx, cx, cy, scale } = this;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw orbit paths
    this.planets.forEach(planet => {
      ctx.beginPath();
      ctx.arc(cx, cy, planet.orbitRadius * scale, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw Sun
    const sunR = 22 * scale;
    const sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunR * 2.5);
    sunGrad.addColorStop(0, '#fff7a0');
    sunGrad.addColorStop(0.3, '#ffcc00');
    sunGrad.addColorStop(0.7, '#ff8800');
    sunGrad.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(cx, cy, sunR * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = sunGrad;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, sunR, 0, Math.PI * 2);
    ctx.fillStyle = '#ffee55';
    ctx.fill();

    // Draw planets
    this.planets.forEach(planet => {
      const px = cx + Math.cos(planet.angle) * planet.orbitRadius * scale;
      const py = cy + Math.sin(planet.angle) * planet.orbitRadius * scale;
      const r = planet.radius * scale;
      const isHovered = this.hoveredPlanet === planet;

      // Glow
      const glow = ctx.createRadialGradient(px, py, 0, px, py, r * 3);
      glow.addColorStop(0, planet.glowColor);
      glow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(px, py, r * (isHovered ? 4 : 3), 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Planet body
      const grad = ctx.createRadialGradient(px - r * 0.3, py - r * 0.3, 0, px, py, r);
      grad.addColorStop(0, planet.color + 'ff');
      grad.addColorStop(1, planet.color + '88');
      ctx.beginPath();
      ctx.arc(px, py, r * (isHovered ? 1.3 : 1), 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Saturn rings
      if (planet.id === 'saturn') {
        ctx.save();
        ctx.translate(px, py);
        ctx.scale(1, 0.35);
        ctx.beginPath();
        ctx.arc(0, 0, r * 2.2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(232,213,160,0.5)';
        ctx.lineWidth = r * 0.5;
        ctx.stroke();
        ctx.restore();
      }

      // Label on hover
      if (isHovered) {
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        const labelW = planet.name.length * 7 + 16;
        ctx.beginPath();
        ctx.roundRect(px - labelW / 2, py - r * 2 - 26, labelW, 20, 4);
        ctx.fill();
        ctx.fillStyle = planet.color;
        ctx.font = `bold ${11 * Math.max(scale, 0.7)}px 'Orbitron', sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(planet.name, px, py - r * 2 - 11);
      }
    });
  }
}
