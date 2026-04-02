/**
 * nasaApi.js — NASA Open APIs integration
 * Uses NASA's free Astronomy Picture of the Day (APOD) API
 * API Key: DEMO_KEY is rate-limited but works without registration
 */

const NASA_API_KEY = 'DEMO_KEY'; // Free demo key, works for ~30 req/hour
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
const CACHE_KEY = 'cosmopedia_nasa_cache';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in ms

/**
 * Fetch NASA Astronomy Picture of the Day
 * Includes caching to reduce API calls
 */
export async function fetchAPOD() {
  // Check cache first
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY));
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
  } catch { /* ignore cache errors */ }

  try {
    const response = await fetch(APOD_URL);
    if (!response.ok) throw new Error(`NASA API error: ${response.status}`);
    
    const data = await response.json();
    
    // Cache the result
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
    
    return data;
  } catch (err) {
    console.warn('NASA API unavailable:', err.message);
    return null;
  }
}

/**
 * Fetch multiple APOD entries (past N days)
 */
export async function fetchAPODRange(count = 5) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - count);

  const start = startDate.toISOString().split('T')[0];
  const end = endDate.toISOString().split('T')[0];

  try {
    const url = `${APOD_URL}&start_date=${start}&end_date=${end}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`NASA API error: ${response.status}`);
    const data = await response.json();
    return Array.isArray(data) ? data.reverse() : [data];
  } catch (err) {
    console.warn('NASA API range fetch failed:', err.message);
    return [];
  }
}
