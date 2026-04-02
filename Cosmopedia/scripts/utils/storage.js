/**
 * storage.js — LocalStorage wrapper for favorites, settings, and preferences
 */

const KEYS = {
  FAVORITES: 'cosmopedia_favorites',
  THEME: 'cosmopedia_theme',
  VISITED: 'cosmopedia_visited'
};

export const storage = {
  /**
   * Favorites management
   */
  getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.FAVORITES)) || [];
    } catch { return []; }
  },

  toggleFavorite(planetId) {
    const favs = this.getFavorites();
    const idx = favs.indexOf(planetId);
    if (idx === -1) {
      favs.push(planetId);
    } else {
      favs.splice(idx, 1);
    }
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favs));
    return idx === -1; // true = added, false = removed
  },

  isFavorite(planetId) {
    return this.getFavorites().includes(planetId);
  },

  /**
   * Theme management
   */
  getTheme() {
    return localStorage.getItem(KEYS.THEME) || 'dark';
  },

  setTheme(theme) {
    localStorage.setItem(KEYS.THEME, theme);
  },

  /**
   * Visited planets tracking
   */
  markVisited(planetId) {
    const visited = this.getVisited();
    if (!visited.includes(planetId)) {
      visited.push(planetId);
      localStorage.setItem(KEYS.VISITED, JSON.stringify(visited));
    }
  },

  getVisited() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.VISITED)) || [];
    } catch { return []; }
  }
};
