'use strict';

function getLocale(opts) {
  if (!opts.locales) {
    // return;
    throw new Error('no supported locales defined');
  }

  return function locale(acceptLang) {
    var requestLocales;
    if (!acceptLang) {
      // fallback to default locale
      return opts.locales[0];
    }

    // pick out request langs from string
    requestLocales = acceptLang.split(';');
    requestLocales = requestLocales[0].split(',');
    if (!requestLocales.length) {
      // fallback to default locale
      return opts.locales[0];
    }

    // try to find an exact match
    for (var i = 0, rl = requestLocales.length; i < rl; i++) {
      var requestLocale = requestLocales[i];
      var requestLang = requestLocale.match(/([a-z]+)/);
      var requestLoc = requestLocale.match(/-([A-Z]+)/);
      var searchLocale;

      if (requestLang) {
        searchLocale = requestLang[0];
      }

      if (requestLoc) {
        searchLocale += requestLoc[0];
      }

      if (opts.locales.indexOf(searchLocale) >= 0) {
        return searchLocale;
      }
    }

    // try to find a "best" match
    for (i = 0; i < rl; i++) {
      for (var j = 0, al = opts.locales.length; j < al; j++) {
        if (requestLocales[i] === opts.locales[j].substring(0, 2)) {
          return opts.locales[j];
        }
      }
    }

    // finally fallback to default locale
    return opts.locales[0];

  };
}

module.exports = getLocale;
