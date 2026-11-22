// kawan-e9 core helper module
window.KawanE9Core = {
  appName: 'kawan-e9',
  version: '1.5.0',
  isStandalone: function () {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  }
};
