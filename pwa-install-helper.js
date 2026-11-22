// PWA Standalone Install Helper for kawan-e9
(function () {
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(function () {});
  }
})();
