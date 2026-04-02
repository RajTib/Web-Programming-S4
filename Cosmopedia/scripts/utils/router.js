/**
 * router.js — Lightweight hash-based SPA router
 * Manages page transitions without full page reloads
 */

export class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this._init();
  }

  /**
   * Register a route handler
   * @param {string} path - Route path (e.g., '/', '/planet/mercury')
   * @param {Function} handler - Function called when route matches
   */
  on(path, handler) {
    this.routes.set(path, handler);
    return this; // chainable
  }

  /**
   * Navigate to a new route
   * @param {string} path
   */
  navigate(path) {
    window.location.hash = path;
  }

  /**
   * Initialize router and listen for hash changes
   */
  _init() {
    window.addEventListener('hashchange', () => this._resolve());
    window.addEventListener('load', () => this._resolve());
  }

  /**
   * Match current hash to a route and call its handler
   */
  _resolve() {
    const hash = window.location.hash.replace('#', '') || '/';
    
    // Try exact match first
    if (this.routes.has(hash)) {
      this._invoke(hash, hash);
      return;
    }

    // Try dynamic segment matching (e.g., /planet/:id)
    for (const [route, handler] of this.routes) {
      const pattern = this._routeToRegex(route);
      const match = hash.match(pattern);
      if (match) {
        this._invoke(route, hash, match.groups || {});
        return;
      }
    }

    // 404 fallback
    if (this.routes.has('*')) {
      this.routes.get('*')({});
    }
  }

  _invoke(route, hash, params = {}) {
    this.currentRoute = hash;
    document.dispatchEvent(new CustomEvent('routechange', { detail: { route: hash, params } }));
    this.routes.get(route)(params);
  }

  /**
   * Convert route string with :params to regex
   */
  _routeToRegex(route) {
    const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const withParams = escaped.replace(/:([a-zA-Z]+)/g, '(?<$1>[^/]+)');
    return new RegExp(`^${withParams}$`);
  }
}
