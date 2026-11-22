(function () {
  'use strict';

  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e;
    window.dispatchEvent(new CustomEvent('kawan-e9-install-ready', { detail: { prompt: e } }));
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {});
    });
  }

  window.KawanE9PWA = {
    async triggerInstall() {
      if (!deferredPrompt) return { status: 'unavailable' };
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      deferredPrompt = null;
      return { status: choice.outcome };
    },
    isReady() {
      return Boolean(deferredPrompt);
    }
  };
})();
