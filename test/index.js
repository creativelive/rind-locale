'use strict';

var test = require('tape');

test('should throw an error if no supported locales defined', function(t) {
  t.plan(1);

  function getLocale(loc) {
    var locale = require('..')();
    return locale(loc);
  }
  t.throws(getLocale);
});

test('should exact match a locale string when available', function(t) {
  t.plan(1);
  var locales = ['de', 'en-US', 'ja', 'kr', 'zh-TW'];

  function getLocale(loc) {
    var locale = require('..')({
      locales: locales
    });
    return locale(loc);
  }
  var input = 'en-US,en;q=0.8';
  var match = getLocale(input);
  var expected = 'en-US';
  console.log('locales:', locales);
  console.log('input:', input);
  console.log('match:', match);
  t.equal(match, expected);
});

test('should "best" match a locale if possible', function(t) {
  t.plan(1);
  var locales = ['de', 'en-US', 'ja', 'kr', 'zh-TW'];

  function getLocale(loc) {
    var locale = require('..')({
      locales: locales
    });
    return locale(loc);
  }
  var input = 'en-UK;q=0.8';
  var match = getLocale(input);
  var expected = 'en-US';
  console.log('locales:', locales);
  console.log('input:', input);
  console.log('match:', match);
  t.equal(match, expected);
});

test('should fallback to default on no matches', function(t) {
  t.plan(1);
  var locales = ['de', 'en-US', 'ja', 'kr', 'zh-TW'];

  function getLocale(loc) {
    var locale = require('..')({
      locales: locales
    });
    return locale(loc);
  }
  var input = 'fr;q=0.8';
  var match = getLocale(input);
  var expected = locales[0];
  console.log('locales:', locales);
  console.log('input:', input);
  console.log('match:', match);
  t.equal(match, expected);
});
