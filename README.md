# rind-locale [![](https://travis-ci.org/creativelive/rind-locale.svg)](https://travis-ci.org/creativelive/rind-locale)

Find a locale match for a string of locale(s) in an array of [supported] locales

## Usage

```
var locale = require('..')({
  // first locale is also the final fallback default
  locales: ['de', 'en-US', 'ja', 'kr', 'zh-TW']
})

console.log(locale('ja'));      // ja
console.log(locale('ja,en'));   // ja
console.log(locale('en-UK'));   // en-US
console.log(locale('klingon')); // de
```
