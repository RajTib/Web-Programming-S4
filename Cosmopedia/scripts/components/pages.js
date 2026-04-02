/**
 * pages.js — Page rendering functions for each route
 * Each function returns HTML string and optional init callback
 */

import { PLANETS, getPlanetById } from '../data/planets.js';
import { AudioPlayer } from './AudioPlayer.js';
import { SolarSystem } from './SolarSystem.js';
import { storage } from '../utils/storage.js';
import { fetchAPOD } from '../utils/nasaApi.js';

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
export function renderHome(router) {
  return {
    html: `
      <div class="page page--home">
        <!-- Hero -->
        <section class="hero" data-parallax>
          <div class="hero__content">
            <div class="hero__eyebrow">
              <span class="eyebrow-dot"></span>
              Solar System Encyclopedia
            </div>
            <h1 class="hero__title">
              Explore the <br>
              <span class="gradient-text">Cosmos</span>
            </h1>
            <p class="hero__subtitle">
              Journey through our solar system. Discover facts, listen to narrations, 
              compare planets, and explore the universe like never before.
            </p>
            <div class="hero__actions">
              <button class="btn btn--primary" onclick="window.router.navigate('/explore')">
                🚀 Start Exploring
              </button>
              <button class="btn btn--outline" onclick="window.router.navigate('/solar-system')">
                🪐 Solar System View
              </button>
            </div>
          </div>
          <div class="hero__visual">
            <div class="hero__planet-orbit">
              <div class="orbit-ring orbit-ring--1"></div>
              <div class="orbit-ring orbit-ring--2"></div>
              <div class="orbit-ring orbit-ring--3"></div>
              <div class="hero__sun">☀️</div>
            </div>
          </div>
        </section>

        <!-- Planet Grid -->
        <section class="section" id="planets-section">
          <div class="section__header">
            <h2 class="section__title">The Eight Planets</h2>
            <p class="section__subtitle">Click any planet to explore in detail</p>
          </div>
          
          <!-- Search & Filter -->
          <div class="filter-bar">
            <div class="search-wrapper">
              <span class="search-icon">🔍</span>
              <input 
                type="text" 
                id="planetSearch" 
                class="search-input" 
                placeholder="Search planets..."
                autocomplete="off"
              >
            </div>
            <div class="filter-pills">
              <button class="filter-pill active" data-filter="all">All</button>
              <button class="filter-pill" data-filter="rocky">🪨 Rocky</button>
              <button class="filter-pill" data-filter="gas_giant">💨 Gas Giants</button>
              <button class="filter-pill" data-filter="ice_giant">❄️ Ice Giants</button>
            </div>
          </div>
          
          <div class="planets-grid" id="planetsGrid">
            ${PLANETS.map(p => renderPlanetCard(p)).join('')}
          </div>
        </section>

        <!-- APOD Section -->
        <section class="section section--dark" id="apod-section">
          <div class="section__header">
            <h2 class="section__title">🌌 NASA: Astronomy Picture of the Day</h2>
            <p class="section__subtitle">Live from the cosmos</p>
          </div>
          <div id="apodContainer" class="apod-container">
            <div class="apod-loading">
              <div class="spinner"></div>
              <span>Fetching from NASA...</span>
            </div>
          </div>
        </section>

        <!-- Quick Stats -->
        <section class="section">
          <div class="stats-bar">
            <div class="stat-item">
              <span class="stat-number">8</span>
              <span class="stat-label">Planets</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">290+</span>
              <span class="stat-label">Known Moons</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">4.6B</span>
              <span class="stat-label">Years Old</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">∞</span>
              <span class="stat-label">Wonders</span>
            </div>
          </div>
        </section>
      </div>
    `,
    async init() {
      // Search functionality
      const searchInput = document.getElementById('planetSearch');
      const grid = document.getElementById('planetsGrid');
      let activeFilter = 'all';

      function filterPlanets() {
        const query = searchInput.value.toLowerCase();
        const cards = grid.querySelectorAll('.planet-card');
        cards.forEach(card => {
          const name = card.dataset.name.toLowerCase();
          const type = card.dataset.type;
          const matchesSearch = name.includes(query);
          const matchesFilter = activeFilter === 'all' || type === activeFilter;
          card.classList.toggle('hidden', !(matchesSearch && matchesFilter));
        });
      }

      searchInput?.addEventListener('input', filterPlanets);

      document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          activeFilter = pill.dataset.filter;
          filterPlanets();
        });
      });

      // Scroll-triggered card animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.planet-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 60}ms`;
        observer.observe(card);
      });

      // Load NASA APOD
      try {
        const apod = await fetchAPOD();
        const container = document.getElementById('apodContainer');
        if (container && apod) {
          container.innerHTML = renderAPOD(apod);
        } else if (container) {
          container.innerHTML = `<p class="apod-error">NASA API unavailable. Check back soon.</p>`;
        }
      } catch {}
    }
  };
}

function renderPlanetCard(planet) {
  const isFav = storage.isFavorite(planet.id);
  const isVisited = storage.getVisited().includes(planet.id);
  return `
    <div class="planet-card animate-in" 
         data-name="${planet.name}" 
         data-type="${planet.type}"
         data-id="${planet.id}"
         style="--planet-color: ${planet.color}; --planet-glow: ${planet.glowColor}">
      <div class="planet-card__inner" onclick="window.router.navigate('/planet/${planet.id}')">
        <div class="planet-card__image-wrap">
          <div class="planet-card__planet" 
               style="background-image: url('${planet.image}')">
          </div>
          ${isVisited ? '<span class="visited-badge">Visited</span>' : ''}
        </div>
        <div class="planet-card__body">
          <h3 class="planet-card__name">${planet.name}</h3>
          <p class="planet-card__tagline">${planet.tagline}</p>
          <div class="planet-card__type">${planet.type.replace('_', ' ')}</div>
          <div class="planet-card__mini-facts">
            <span>🌡️ ${planet.stats.temperature.split(' ')[0]}</span>
            <span>🌙 ${planet.stats.moons}</span>
            <span>📏 ${planet.stats.diameter}</span>
          </div>
        </div>
      </div>
      <button class="planet-card__fav ${isFav ? 'is-fav' : ''}" 
              onclick="event.stopPropagation(); toggleFav('${planet.id}', this)"
              title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
        ${isFav ? '★' : '☆'}
      </button>
    </div>
  `;
}

function renderAPOD(apod) {
  const isVideo = apod.media_type === 'video';
  return `
    <div class="apod-card">
      ${isVideo
        ? `<div class="apod-video-wrapper"><iframe src="${apod.url}" frameborder="0" allowfullscreen></iframe></div>`
        : `<img src="${apod.url}" alt="${apod.title}" class="apod-image" loading="lazy">`
      }
      <div class="apod-info">
        <div class="apod-date">${apod.date}</div>
        <h3 class="apod-title">${apod.title}</h3>
        <p class="apod-explanation">${apod.explanation?.substring(0, 280)}...</p>
        ${apod.copyright ? `<span class="apod-credit">© ${apod.copyright}</span>` : ''}
      </div>
    </div>
  `;
}

// ─── PLANET PAGE ─────────────────────────────────────────────────────────────
export function renderPlanetPage(planetId, router) {
  const planet = getPlanetById(planetId);
  if (!planet) {
    return {
      html: `<div class="page error-page"><h2>Planet not found</h2><button class="btn btn--primary" onclick="window.router.navigate('/')">← Home</button></div>`,
      init: () => {}
    };
  }

  storage.markVisited(planet.id);
  const isFav = storage.isFavorite(planet.id);

  // Previous/Next planet navigation
  const idx = PLANETS.indexOf(planet);
  const prev = PLANETS[idx - 1];
  const next = PLANETS[idx + 1];

  return {
    html: `
      <div class="page page--planet" style="--planet-color: ${planet.color}; --planet-glow: ${planet.glowColor}">
        <!-- Back navigation -->
        <div class="planet-nav-bar">
          <button class="btn btn--ghost" onclick="window.router.navigate('/')">← Back to Solar System</button>
          <div class="planet-nav-arrows">
            ${prev ? `<button class="btn btn--ghost" onclick="window.router.navigate('/planet/${prev.id}')">← ${prev.name}</button>` : ''}
            ${next ? `<button class="btn btn--ghost" onclick="window.router.navigate('/planet/${next.id}')">${next.name} →</button>` : ''}
          </div>
        </div>

        <!-- Planet Hero -->
        <section class="planet-hero">
          <div class="planet-hero__left">
            <div class="planet-hero__eyebrow">${planet.type.replace('_', ' ').toUpperCase()} PLANET</div>
            <h1 class="planet-hero__title">${planet.name}</h1>
            <p class="planet-hero__tagline">${planet.tagline}</p>
            <p class="planet-hero__desc">${planet.description}</p>
            
            <div class="planet-hero__actions">
              <button class="btn btn--primary" onclick="document.getElementById('audioSection').scrollIntoView({behavior:'smooth'})">
                🔊 Listen to Narration
              </button>
              <button class="btn btn--outline fav-btn ${isFav ? 'is-fav' : ''}" 
                      id="favBtnHero"
                      onclick="toggleFavHero('${planet.id}')">
                ${isFav ? '★ Favorited' : '☆ Add to Favorites'}
              </button>
            </div>

            <div class="fun-fact-box">
              <span class="fun-fact-icon">💡</span>
              <p><strong>Fun Fact:</strong> ${planet.funFact}</p>
            </div>
          </div>

          <div class="planet-hero__right">
            <div class="planet-display" style="background-image: url('${planet.image}')">
              <div class="planet-display__glow"></div>
            </div>
          </div>
        </section>

        <!-- Stats Grid -->
        <section class="section">
          <h2 class="section__title">Planetary Statistics</h2>
          <div class="stats-grid">
            ${Object.entries(planet.stats).map(([key, val]) => `
              <div class="stat-card">
                <div class="stat-card__label">${formatStatLabel(key)}</div>
                <div class="stat-card__value">${val}</div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Facts -->
        <section class="section section--dark">
          <h2 class="section__title">Key Facts</h2>
          <div class="facts-list">
            ${planet.facts.map((fact, i) => `
              <div class="fact-item animate-in" style="animation-delay: ${i * 80}ms">
                <span class="fact-number">0${i + 1}</span>
                <p class="fact-text">${fact}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Moons -->
        ${planet.moons.length > 0 ? `
        <section class="section">
          <h2 class="section__title">🌙 Known Moons (${planet.stats.moons})</h2>
          <div class="moons-list">
            ${planet.moons.map(m => `<span class="moon-tag">${m}</span>`).join('')}
          </div>
        </section>
        ` : ''}

        <!-- Audio Player -->
        <section class="section section--dark" id="audioSection">
          <h2 class="section__title">🔊 Audio Narration</h2>
          <div id="audioPlayerContainer"></div>
        </section>

        <!-- Compare CTA -->
        <section class="section compare-cta">
          <div class="compare-cta__inner">
            <h2>Want to compare ${planet.name} with other planets?</h2>
            <button class="btn btn--primary" onclick="window.router.navigate('/compare?a=${planet.id}')">
              ⚖️ Open Comparison Tool
            </button>
          </div>
        </section>
      </div>
    `,
    init() {
      // Init audio player
      const container = document.getElementById('audioPlayerContainer');
      if (container && planet.audio) {
        window._currentAudioPlayer = new AudioPlayer(container, {
          src: planet.audio,
          title: `${planet.name} — Audio Narration`,
          planetColor: planet.color
        });
      }

      // Animate facts on scroll
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.1 });
      document.querySelectorAll('.fact-item').forEach(el => observer.observe(el));
    }
  };
}

// ─── SOLAR SYSTEM PAGE ───────────────────────────────────────────────────────
export function renderSolarSystemPage(router) {
  return {
    html: `
      <div class="page page--solar">
        <div class="section__header" style="padding-top: 2rem;">
          <h2 class="section__title">Interactive Solar System</h2>
          <p class="section__subtitle">Click on any planet to explore it</p>
        </div>
        <div class="solar-canvas-wrap">
          <canvas id="solarCanvas"></canvas>
        </div>
        <div id="solarTooltip" class="solar-tooltip hidden"></div>
      </div>
    `,
    init() {
      const canvas = document.getElementById('solarCanvas');
      if (canvas) {
        const ss = new SolarSystem(canvas, (id) => {
          window.router.navigate(`/planet/${id}`);
        });
        ss.start();
        window._solarSystem = ss;
      }
    }
  };
}

// ─── COMPARE PAGE ─────────────────────────────────────────────────────────────
export function renderComparePage(preselect) {
  const keys = ['diameter', 'moons', 'gravity', 'orbitalPeriod', 'temperature', 'atmosphere', 'type', 'rings'];

  return {
    html: `
      <div class="page page--compare">
        <div class="section__header" style="padding-top: 2rem">
          <h2 class="section__title">⚖️ Planet Comparison Tool</h2>
          <p class="section__subtitle">Select two planets to compare their properties</p>
        </div>

        <div class="compare-selectors">
          <div class="compare-selector">
            <label>Planet A</label>
            <select id="planetA" class="planet-select">
              <option value="">— Choose Planet —</option>
              ${PLANETS.map(p => `<option value="${p.id}" ${preselect === p.id ? 'selected' : ''}>${p.name}</option>`).join('')}
            </select>
          </div>
          <div class="compare-vs">VS</div>
          <div class="compare-selector">
            <label>Planet B</label>
            <select id="planetB" class="planet-select">
              <option value="">— Choose Planet —</option>
              ${PLANETS.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <div id="compareResult" class="compare-result"></div>
      </div>
    `,
    init() {
      const selA = document.getElementById('planetA');
      const selB = document.getElementById('planetB');
      const result = document.getElementById('compareResult');

      function updateComparison() {
        const a = getPlanetById(selA.value);
        const b = getPlanetById(selB.value);
        if (!a || !b) { result.innerHTML = ''; return; }

        result.innerHTML = `
          <div class="compare-cards">
            <div class="compare-planet" style="--planet-color: ${a.color}">
              <div class="compare-planet__img" style="background-image: url('${a.image}')"></div>
              <h3>${a.name}</h3>
            </div>
            <div class="compare-planet" style="--planet-color: ${b.color}">
              <div class="compare-planet__img" style="background-image: url('${b.image}')"></div>
              <h3>${b.name}</h3>
            </div>
          </div>
          <div class="compare-table">
            ${keys.map(key => {
              const valA = a.stats[key] ?? '—';
              const valB = b.stats[key] ?? '—';
              return `
                <div class="compare-row">
                  <div class="compare-cell compare-cell--a" style="color: ${a.color}">${valA}</div>
                  <div class="compare-cell compare-cell--label">${formatStatLabel(key)}</div>
                  <div class="compare-cell compare-cell--b" style="color: ${b.color}">${valB}</div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      selA.addEventListener('change', updateComparison);
      selB.addEventListener('change', updateComparison);
      if (preselect) updateComparison();
    }
  };
}

// ─── FAVORITES PAGE ───────────────────────────────────────────────────────────
export function renderFavoritesPage() {
  const favIds = storage.getFavorites();
  const favPlanets = PLANETS.filter(p => favIds.includes(p.id));

  return {
    html: `
      <div class="page page--favorites">
        <div class="section__header" style="padding-top: 2rem">
          <h2 class="section__title">★ Your Favorites</h2>
          <p class="section__subtitle">${favPlanets.length ? `${favPlanets.length} planet${favPlanets.length > 1 ? 's' : ''} bookmarked` : 'No favorites yet'}</p>
        </div>
        ${favPlanets.length ? `
          <div class="planets-grid">
            ${favPlanets.map(p => renderPlanetCard(p)).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state__icon">🔭</div>
            <p>Start exploring planets and bookmark your favorites!</p>
            <button class="btn btn--primary" onclick="window.router.navigate('/')">Explore Planets</button>
          </div>
        `}
      </div>
    `,
    init() {
      // Animate cards in
      document.querySelectorAll('.planet-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 80}ms`;
        setTimeout(() => card.classList.add('visible'), 10);
      });
    }
  };
}

// ─── EXPLORE PAGE ─────────────────────────────────────────────────────────────
export function renderExplorePage() {
  return {
    html: `
      <div class="page page--explore">
        <div class="section__header" style="padding-top: 2rem">
          <h2 class="section__title">🚀 Explore All Planets</h2>
          <p class="section__subtitle">Your complete guide to the solar system</p>
        </div>
        <div class="explore-list">
          ${PLANETS.map((p, i) => `
            <div class="explore-item animate-in" style="--planet-color: ${p.color}; animation-delay: ${i * 60}ms"
                 onclick="window.router.navigate('/planet/${p.id}')">
              <div class="explore-item__num">${String(i + 1).padStart(2, '0')}</div>
              <div class="explore-item__img" style="background-image: url('${p.image}')"></div>
              <div class="explore-item__info">
                <h3>${p.name}</h3>
                <p>${p.tagline}</p>
                <div class="explore-item__tags">
                  <span class="tag">${p.type.replace('_', ' ')}</span>
                  <span class="tag">${p.stats.moons} moons</span>
                  <span class="tag">${p.stats.diameter}</span>
                </div>
              </div>
              <div class="explore-item__arrow">→</div>
            </div>
          `).join('')}
        </div>
      </div>
    `,
    init() {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.05 });
      document.querySelectorAll('.explore-item').forEach(el => observer.observe(el));
    }
  };
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function formatStatLabel(key) {
  const labels = {
    distanceFromSun: 'Distance from Sun',
    orbitalPeriod: 'Orbital Period',
    rotationPeriod: 'Rotation Period',
    diameter: 'Diameter',
    moons: 'Number of Moons',
    gravity: 'Gravity',
    temperature: 'Temperature',
    atmosphere: 'Atmosphere',
    type: 'Planet Type',
    rings: 'Ring System'
  };
  return labels[key] || key;
}
