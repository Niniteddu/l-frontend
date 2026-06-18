/**
 * Session storage utilities for intro splash
 */

const INTRO_SEEN_SESSION_KEY = 'introSplashSeen';

/**
 * Check if user has already seen the intro in current session
 */
export function hasSeenIntroInSession(): boolean {
  try {
    return window.sessionStorage.getItem(INTRO_SEEN_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * Mark intro as seen in current session
 */
export function markIntroSeenInSession() {
  try {
    window.sessionStorage.setItem(INTRO_SEEN_SESSION_KEY, '1');
  } catch {
    // Ignore storage errors and keep default behavior.
  }
}
