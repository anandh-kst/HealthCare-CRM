export const storage = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem(key)); }
    catch { return null; }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (err) { console.error('[storage.set]', err); }
  },
  remove: (key) => localStorage.removeItem(key),
  clear:  ()    => localStorage.clear(),
};
