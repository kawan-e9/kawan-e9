/**
 * Kawan-e9 Core Utilities
 * Menjaga keamanan penyimpanan lokal, sanitasi tampilan, tautan keluar, dan indikator offline.
 */
(function (global) {
  'use strict';

  const APP_META = {
    name: 'Kawan-e9',
    version: '1.0.0',
    lastUpdated: '2026-11-22'
  };

  // 1. Penyimpanan lokal aman (tahan Incognito / kuota penuh)
  const SafeStorage = {
    get(key, fallback = null) {
      try {
        const raw = window.localStorage.getItem(key);
        return raw !== null ? JSON.parse(raw) : fallback;
      } catch (err) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (err) {
        return false;
      }
    },
    remove(key) {
      try {
        window.localStorage.removeItem(key);
        return true;
      } catch (err) {
        return false;
      }
    }
  };

  // 2. Sanitasi teks untuk mencegah injeksi HTML/XSS
  function escapeHTML(input) {
    const str = String(input ?? '');
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // 3. Pengaman otomatis untuk seluruh tautan eksternal
  function hardenExternalLinks(root = document) {
    const links = root.querySelectorAll('a[href]');
    links.forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (/^https?:\/\//i.test(href)) {
        try {
          const url = new URL(href);
          if (url.origin !== window.location.origin) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
          }
        } catch (e) {
          link.removeAttribute('href');
        }
      }
    });
  }

  // 4. Banner indikator koneksi offline/online otomatis
  function initNetworkBanner() {
    const banner = document.createElement('div');
    banner.id = 'kawan-e9-net-banner';
    banner.setAttribute('role', 'status');
    banner.setAttribute('aria-live', 'polite');
    Object.assign(banner.style, {
      position: 'fixed',
      bottom: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#0d182a',
      color: '#e2f8f3',
      border: '1px solid rgba(94, 234, 212, 0.35)',
      padding: '10px 16px',
      borderRadius: '999px',
      fontSize: '13px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.28)',
      zIndex: '9999',
      display: 'none',
      maxWidth: '90vw',
      textAlign: 'center'
    });

    function syncStatus() {
      if (!navigator.onLine) {
        banner.textContent = 'Mode Offline — Data tersimpan lokal tetap bisa diakses.';
        banner.style.display = 'block';
      } else {
        banner.style.display = 'none';
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(banner);
      hardenExternalLinks(document);
      syncStatus();
    });

    window.addEventListener('online', syncStatus);
    window.addEventListener('offline', syncStatus);
  }

  // 5. Registrasi Service Worker PWA
  function registerPWA(swPath = './sw.js') {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register(swPath).catch(() => {
          // Abaikan diam-diam jika dibuka langsung lewat file://
        });
      });
    }
  }

  initNetworkBanner();
  registerPWA();

  global.KawanE9 = {
    meta: APP_META,
    storage: SafeStorage,
    escapeHTML,
    hardenExternalLinks,
    registerPWA
  };
})(window);
