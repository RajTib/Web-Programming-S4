/**
 * app.js — Main application entry point
 * Bootstraps the SPA, sets up routing, global state and shared UI
 */

import { Router } from './utils/router.js';
import { Stars } from './components/Stars.js';
import { storage } from './utils/storage.js';
import {
  renderHome,
  renderPlanetPage,
  renderSolarSystemPage,
  renderComparePage,
  renderFavoritesPage,
  renderExplorePage
} from './components/pages.js';

// ─── GLOBAL STATE ─────────────────────────────────────────────────────────────
let starsInstance = null;
let activeAudioPlayer = null;

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initTheme();
  initNavbar();
  initRouter();
});

// ─── STARS BACKGROUND ─────────────────────────────────────────────────────────
function initStars() {
  const canvas = document.getElementById('starsCanvas');
  if (!canvas) return;
  starsInstance = new Stars(canvas);
  starsInstance.start();
}

// ─── THEME ────────────────────────────────────────────────────────────────────
function initTheme() {
  const saved = storage.getTheme();
  applyTheme(saved);
}

function applyTheme(theme) {
  document.body.classList.toggle('light-theme', theme === 'light');
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'light' ? '🌙' : '☀️';
}

window.toggleTheme = function () {
  const current = storage.getTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  storage.setTheme(next);
  applyTheme(next);
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function initNavbar() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('open');
    hamburger.textContent = mobileMenu?.classList.contains('open') ? '✕' : '☰';
  });

  // Close mobile menu on nav click
  mobileMenu?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.textContent = '☰';
    });
  });

  // Update active nav link on route change
  document.addEventListener('routechange', (e) => {
    const route = e.detail.route;
    updateActiveNav(route);
  });
}

function updateActiveNav(route) {
  document.querySelectorAll('.nav-link[data-route]').forEach(link => {
    const r = link.dataset.route;
    const isActive = route === r || (r !== '/' && route.startsWith(r));
    link.classList.toggle('active', isActive);
  });
}

// ─── ROUTER ───────────────────────────────────────────────────────────────────
function initRouter() {
  const router = new Router();
  window.router = router; // Expose globally for inline handlers

  router
    .on('/', () => renderPage(renderHome(router)))
    .on('/explore', () => renderPage(renderExplorePage()))
    .on('/solar-system', () => renderPage(renderSolarSystemPage(router)))
    .on('/compare', () => {
      // Parse preselect from hash query string
      const hash = window.location.hash;
      const match = hash.match(/\?a=([a-z]+)/);
      const preselect = match ? match[1] : null;
      renderPage(renderComparePage(preselect));
    })
    .on('/favorites', () => renderPage(renderFavoritesPage()))
    .on('/planet/:id', ({ id }) => renderPage(renderPlanetPage(id, router)))
    .on('*', () => renderPage(renderHome(router)));
}

// ─── PAGE RENDERING ───────────────────────────────────────────────────────────
function renderPage({ html, init }) {
  // Clean up previous audio
  if (window._currentAudioPlayer) {
    window._currentAudioPlayer.destroy?.();
    window._currentAudioPlayer = null;
  }

  // Stop previous solar system
  if (window._solarSystem) {
    window._solarSystem.stop?.();
    window._solarSystem = null;
  }

  const content = document.getElementById('content');
  if (!content) return;

  content.innerHTML = html;

  // Scroll to top on navigation
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Run page-specific initializer
  if (typeof init === 'function') {
    // Small delay so DOM is fully painted
    requestAnimationFrame(() => init());
  }
}

// ─── GLOBAL HELPERS (called from inline HTML handlers) ────────────────────────

/**
 * Toggle favorite from planet card
 */
window.toggleFav = function (planetId, btn) {
  const added = storage.toggleFavorite(planetId);
  btn.textContent = added ? '★' : '☆';
  btn.classList.toggle('is-fav', added);

  // Show toast
  showToast(added ? `⭐ ${planetId} added to favorites` : `${planetId} removed from favorites`);
};

/**
 * Toggle favorite from planet hero page
 */
window.toggleFavHero = function (planetId) {
  const added = storage.toggleFavorite(planetId);
  const btn = document.getElementById('favBtnHero');
  if (btn) {
    btn.textContent = added ? '★ Favorited' : '☆ Add to Favorites';
    btn.classList.toggle('is-fav', added);
  }
  showToast(added ? `⭐ ${planetId} added to favorites` : `${planetId} removed from favorites`);
};

/**
 * Toast notification
 */
function showToast(message) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: rgba(12,20,40,0.97);
    border: 1px solid rgba(74,158,255,0.3);
    color: #eef2ff;
    padding: 0.75rem 1.5rem;
    border-radius: 100px;
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    z-index: 9999;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 0;
    backdrop-filter: blur(20px);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
