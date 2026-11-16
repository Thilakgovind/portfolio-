const KEY = 'thilak-voice-muted';
export const VOICE_VOLUME = 0.4;

export function readVoiceMuted(): boolean {
  try { return window.localStorage.getItem(KEY) === 'true'; }
  catch { return false; }
}

export function writeVoiceMuted(muted: boolean): void {
  try { window.localStorage.setItem(KEY, String(muted)); }
  catch { /* Voice preference still works for this page visit. */ }
  window.dispatchEvent(new Event('thilak-voice-preference'));
}
