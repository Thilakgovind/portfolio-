/**
 * YELLIZ YUTHIKA | CLINICAL PSYCHOLOGY & RESEARCH DESKTOP OS
 * Universal Drag & Drop System, Window Manager, Certifications Filter & Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Initialize System
  initClock();
  initUniversalDragAndDrop();
  initDock();

  // Open the About window by default after subtle delay (just like Inspiration Image 3!)
  setTimeout(() => {
    openWindow('about');
  }, 450);
});

/* ==========================================================================
   1. LIVE SYSTEM CLOCK
   ========================================================================== */
function initClock() {
  const clockEl = document.getElementById('systemClock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = days[now.getDay()];
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    clockEl.textContent = `${day} ${hours}:${minutes} ${ampm}`;
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   2. WINDOW MANAGER & Z-INDEX STACKING
   ========================================================================== */
let topZIndex = 200;
const windowMap = {
  about: 'windowAbout',
  experience: 'windowExperience',
  education: 'windowEducation',
  events: 'windowEvents',
  certifications: 'windowCertifications',
  skills: 'windowSkills',
  hobbies: 'windowHobbies',
  leadership: 'windowLeadership',
  gallery: 'windowGallery',
  contact: 'windowContact'
};

function bringToFront(winEl) {
  topZIndex++;
  winEl.style.zIndex = topZIndex;
}

function openWindow(name) {
  const winId = windowMap[name];
  if (!winId) return;
  const winEl = document.getElementById(winId);
  if (!winEl) return;

  playSystemChime('open');
  winEl.style.display = 'flex';
  bringToFront(winEl);

  // Update dock dot
  const dot = document.getElementById(`dot-${name}`);
  if (dot) dot.classList.add('active');

  if (window.lucide) window.lucide.createIcons();
}

function closeWindow(name) {
  const winId = windowMap[name];
  if (!winId) return;
  const winEl = document.getElementById(winId);
  if (!winEl) return;

  playSystemChime('close');
  winEl.style.display = 'none';

  // Update dock dot
  const dot = document.getElementById(`dot-${name}`);
  if (dot) dot.classList.remove('active');
}

function minimizeWindow(name) {
  closeWindow(name);
  showToast(`Window minimized to Dock`);
}

function maximizeWindow(name) {
  const winId = windowMap[name];
  if (!winId) return;
  const winEl = document.getElementById(winId);
  if (!winEl) return;

  winEl.classList.toggle('window-maximized');
  playSystemChime('click');
}

function minimizeAllWindows() {
  playSystemChime('close');
  Object.keys(windowMap).forEach(key => {
    const el = document.getElementById(windowMap[key]);
    if (el) el.style.display = 'none';
    const dot = document.getElementById(`dot-${key}`);
    if (dot) dot.classList.remove('active');
  });
  showToast('Desktop view');
}

/* ==========================================================================
   3. UNIVERSAL DRAG & DROP SYSTEM (Everything is Movable!)
   ========================================================================== */
function initUniversalDragAndDrop() {
  const desktopScreen = document.getElementById('desktopScreen');

  // --- A. DRAGGABLE DESKTOP ITEMS (Folders, Cards, Speaker Widget) ---
  const movableItems = document.querySelectorAll('.movable-desktop-item');

  movableItems.forEach(item => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    let hasMoved = false;

    item.addEventListener('pointerdown', (e) => {
      // Don't drag if clicking buttons inside the widget
      if (e.target.closest('button') || e.target.closest('a')) return;

      isDragging = true;
      hasMoved = false;
      startX = e.clientX;
      startY = e.clientY;

      topZIndex++;
      item.style.zIndex = topZIndex;

      const rect = item.getBoundingClientRect();
      const parentRect = desktopScreen.getBoundingClientRect();
      initialLeft = rect.left - parentRect.left;
      initialTop = rect.top - parentRect.top;

      item.setPointerCapture(e.pointerId);
    });

    item.addEventListener('pointermove', (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        hasMoved = true;
        item.classList.add('is-dragging');

        const newLeft = initialLeft + deltaX;
        const newTop = initialTop + deltaY;

        item.style.left = `${newLeft}px`;
        item.style.top = `${newTop}px`;
        item.style.right = 'auto';
        item.style.bottom = 'auto';
      }
    });

    item.addEventListener('pointerup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      item.classList.remove('is-dragging');

      try {
        item.releasePointerCapture(e.pointerId);
      } catch (err) {}

      // If clicked without moving, open the target window!
      if (!hasMoved) {
        const target = item.dataset.target;
        if (target) {
          openWindow(target);
        }
      } else {
        playSystemChime('click');
      }
    });
  });

  // --- B. DRAGGABLE WINDOWS ---
  const windows = document.querySelectorAll('.movable-window');

  windows.forEach(win => {
    win.addEventListener('pointerdown', () => bringToFront(win));

    const handle = win.querySelector('[data-drag-handle="true"]');
    if (!handle) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    handle.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.traffic-lights') || e.target.closest('.tag-pill')) return;
      if (win.classList.contains('window-maximized')) return;

      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialLeft = win.offsetLeft;
      initialTop = win.offsetTop;

      bringToFront(win);
      handle.setPointerCapture(e.pointerId);
    });

    handle.addEventListener('pointermove', (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newLeft = initialLeft + deltaX;
      let newTop = initialTop + deltaY;

      newTop = Math.max(34, newTop);

      win.style.left = `${newLeft}px`;
      win.style.top = `${newTop}px`;
    });

    handle.addEventListener('pointerup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      try {
        handle.releasePointerCapture(e.pointerId);
      } catch (err) {}
    });
  });
}

/* ==========================================================================
   4. RESET DESKTOP LAYOUT
   ========================================================================== */
function resetDesktopLayout() {
  const initialPositions = {
    'item-about': { top: '8%', left: '6%', right: 'auto', bottom: 'auto' },
    'item-experience': { top: '7%', left: '24%', right: 'auto', bottom: 'auto' },
    'item-education': { top: '7%', left: '40%', right: 'auto', bottom: 'auto' },
    'item-skills': { top: '7%', left: '56%', right: 'auto', bottom: 'auto' },
    'item-hobbies': { top: '7%', left: '72%', right: 'auto', bottom: 'auto' },
    'item-events': { top: '48%', left: '5%', right: 'auto', bottom: 'auto' },
    'item-certifications': { bottom: '14%', left: '6%', top: 'auto', right: 'auto' },
    'item-leadership': { top: '48%', right: '6%', left: 'auto', bottom: 'auto' },
    'item-gallery': { bottom: '14%', right: '7%', top: 'auto', left: 'auto' },
    'item-contact': { top: '8%', right: '7%', bottom: 'auto', left: 'auto' },
    'item-widget': { top: '14%', right: '18%', bottom: 'auto', left: 'auto' }
  };

  Object.keys(initialPositions).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const pos = initialPositions[id];
      el.style.top = pos.top;
      el.style.left = pos.left;
      el.style.right = pos.right;
      el.style.bottom = pos.bottom;
      el.style.zIndex = '20';
    }
  });

  playSystemChime('open');
  showToast('Desktop layout reset');
}

/* ==========================================================================
   5. CERTIFICATIONS FILTER TABS
   ========================================================================== */
function filterCerts(category) {
  const tabs = document.querySelectorAll('.cert-tab');
  tabs.forEach(t => t.classList.remove('active'));

  // Active clicked tab
  const clicked = event.target;
  if (clicked) clicked.classList.add('active');

  const cards = document.querySelectorAll('.cert-card-row');
  cards.forEach(card => {
    if (category === 'all') {
      card.style.display = 'flex';
    } else {
      if (card.dataset.category === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    }
  });

  playSystemChime('click');
}

/* ==========================================================================
   6. DOCK INTERACTIONS
   ========================================================================== */
function initDock() {
  const dockItems = document.querySelectorAll('.dock-item');
  dockItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      if (!action) return;

      if (action === 'minimize-all') {
        minimizeAllWindows();
      } else if (action === 'reset-layout') {
        resetDesktopLayout();
      } else if (action === 'instagram') {
        window.open('https://www.instagram.com/palapathraonandi?exln=ZmNueTQ0ZmI5OWQz', '_blank');
      } else if (action === 'linkedin') {
        window.open('https://www.linkedin.com/in/yelliz-yuthika-761441408?utm_source=share_via&utm_content=profile&utm_medium=member_ios', '_blank');
      } else {
        openWindow(action);
      }
    });
  });
}

/* ==========================================================================
   7. THEME / WALLPAPER MODE SWITCHER
   ========================================================================== */
const themes = [
  { id: 'theme-editorial', label: 'Editorial B&W (Inspiration)' },
  { id: 'theme-vibrant', label: 'Stage Live Color' },
  { id: 'theme-cyber', label: 'Studio Cyber-Lilac' },
  { id: 'theme-dark', label: 'Minimal Studio Dark' }
];
let currentThemeIndex = 0;

function cycleWallpaperTheme() {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  const current = themes[currentThemeIndex];

  document.body.className = current.id;
  
  const textEl = document.getElementById('themeModeText');
  if (textEl) {
    textEl.textContent = current.label.split(' ')[0] + ' Mode';
  }

  playSystemChime('click');
  showToast(`Wallpaper aesthetic: ${current.label}`);
}

/* ==========================================================================
   8. WEB AUDIO SYNTHESIZER FOR SYSTEM SOUNDS
   ========================================================================== */
let audioCtx = null;
let soundFXEnabled = true;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function toggleSoundFX() {
  soundFXEnabled = !soundFXEnabled;
  const icon = document.getElementById('soundIcon');
  if (icon) {
    if (soundFXEnabled) {
      icon.setAttribute('data-lucide', 'volume-2');
      showToast('System sounds enabled');
    } else {
      icon.setAttribute('data-lucide', 'volume-x');
      showToast('System sounds muted');
    }
    if (window.lucide) window.lucide.createIcons();
  }
}

function playSystemChime(type = 'click') {
  if (!soundFXEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  if (type === 'open') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.start(now);
    osc.stop(now + 0.18);
  } else if (type === 'close') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.12);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc.start(now);
    osc.stop(now + 0.14);
  } else {
    // click
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.start(now);
    osc.stop(now + 0.05);
  }
}

/* ==========================================================================
   9. CONTACT, CLIPBOARD & VCARD (.VCF) GENERATOR
   ========================================================================== */
function copyToClipboard(text, message = 'Copied to clipboard!') {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message);
      playSystemChime('click');
    });
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast(message);
  }
}

function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('senderName').value;

  // Confetti celebration
  if (window.confetti) {
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  const feedback = document.getElementById('formFeedback');
  if (feedback) {
    feedback.textContent = `Thank you, ${name}! Your note has been delivered.`;
  }

  showToast(`Message sent to Yelliz Yuthika!`);
  playSystemChime('open');

  document.getElementById('contactForm').reset();
}

function downloadVCard() {
  const vcardData = `BEGIN:VCARD
VERSION:3.0
N:Yuthika;Yelliz;;;
FN:Yelliz Yuthika
ORG:SRM Medical College Hospital and Research Centre
TITLE:Clinical Psychology Undergraduate | Human Behaviour & Mental Health
TEL;TYPE=CELL,VOICE:+918667407733
EMAIL;TYPE=PREF,INTERNET:yuthika1012@gmail.com
URL;TYPE=Instagram:https://www.instagram.com/palapathraonandi
URL;TYPE=LinkedIn:https://www.linkedin.com/in/yelliz-yuthika-761441408
NOTE:BSc Clinical Psychology at SRM Medical College. 13 Verified Certifications in ABA, TAT, SFBT, and Research Methodology. TEJAS RYLA Leader.
END:VCARD`;

  const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Yelliz_Yuthika.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Saved contact: Yelliz Yuthika (.vcf)');
}

/* ==========================================================================
   10. IMAGE ZOOM LIGHTBOX
   ========================================================================== */
function zoomImage(src, caption) {
  const modal = document.getElementById('imageZoomModal');
  const img = document.getElementById('zoomedImg');
  const cap = document.getElementById('zoomCaption');

  if (!modal || !img) return;

  img.src = src;
  if (cap) cap.textContent = caption || '';
  modal.classList.add('active');
  playSystemChime('open');
}

function closeZoomModal() {
  const modal = document.getElementById('imageZoomModal');
  if (modal) {
    modal.classList.remove('active');
    playSystemChime('close');
  }
}

/* ==========================================================================
   11. TOAST NOTIFICATIONS
   ========================================================================== */
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const text = document.getElementById('toastText');
  if (!toast || !text) return;

  text.textContent = message;
  toast.classList.add('active');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('active');
  }, 3200);
}

// Global hotkeys (Escape to close active modal)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeZoomModal();
  }
});
