/* jshint ignore:start */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.prettyjson = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// ### Module dependencies
require('colors');
var Utils = require('./utils');

exports.version = require('../package.json').version;

// ### Render function
// *Parameters:*
//
// * **`data`**: Data to render
// * **`options`**: Hash with different options to configure the parser
// * **`indentation`**: Base indentation of the parsed output
//
// *Example of options hash:*
//
//     {
//       emptyArrayMsg: '(empty)', // Rendered message on empty strings
//       keysColor: 'blue',        // Color for keys in hashes
//       dashColor: 'red',         // Color for the dashes in arrays
//       stringColor: 'grey',      // Color for strings
//       defaultIndentation: 2     // Indentation on nested objects
//     }
exports.render = function render(data, options, indentation) {
  // Default values
  indentation = indentation || 0;
  options = options || {};
  options.emptyArrayMsg = options.emptyArrayMsg || '(empty array)';
  options.keysColor = options.keysColor || 'green';
  options.dashColor = options.dashColor || 'green';
  options.numberColor = options.numberColor || 'blue';
  options.defaultIndentation = options.defaultIndentation || 2;
  options.noColor = !!options.noColor;

  options.stringColor = options.stringColor || null;

  var output = [];

  // Helper function to detect if an object can be directly serializable
  var isSerializable = function(input, onlyPrimitives) {
    if (typeof input === 'boolean' ||
        typeof input === 'number' || input === null ||
		input instanceof Date) {
      return true;
    }
    if (typeof input === 'string' && input.indexOf('\n') === -1) {
      return true;
    }

    if (options.inlineArrays && !onlyPrimitives) {
      if (Array.isArray(input) && isSerializable(input[0], true)) {
        return true;
      }
    }

    return false;
  };

  var indentLines = function(string, spaces){
    var lines = string.split('\n');
    lines = lines.map(function(line){
      return Utils.indent(spaces) + line;
    });
    return lines.join('\n');
  };

  var addColorToData = function(input) {
    if (options.noColor) {
      return input;
    }

    if (typeof input === 'string') {
      // Print strings in regular terminal color
      return options.stringColor ? input[options.stringColor] : input;
    }

    var sInput = input + '';

    if (input === true) {
      return sInput.green;
    }
    if (input === false) {
      return sInput.red;
    }
    if (input === null) {
      return sInput.grey;
    }
    if (typeof input === 'number') {
      return sInput[options.numberColor];
    }
    if (Array.isArray(input)) {
      return input.join(', ');
    }

    return sInput;
  };

  // Render a string exactly equal
  if (isSerializable(data)) {
    output.push(Utils.indent(indentation) + addColorToData(data));
  }
  else if (typeof data === 'string') {
    //unserializable string means it's multiline
    output.push(Utils.indent(indentation) + '"""');
    output.push(indentLines(data, indentation + options.defaultIndentation));
    output.push(Utils.indent(indentation) + '"""');
  }
  else if (Array.isArray(data)) {
    // If the array is empty, render the `emptyArrayMsg`
    if (data.length === 0) {
      output.push(Utils.indent(indentation) + options.emptyArrayMsg);
    } else {
      data.forEach(function(element) {
        // Prepend the dash at the begining of each array's element line
        var line = ('- ');
        if (!options.noColor) {
          line = line[options.dashColor];
        }
        line = Utils.indent(indentation) + line;

        // If the element of the array is a string, bool, number, or null
        // render it in the same line
        if (isSerializable(element)) {
          line += exports.render(element, options);
          output.push(line);

        // If the element is an array or object, render it in next line
        } else {
          output.push(line);
          output.push(exports.render(
            element, options, indentation + options.defaultIndentation
          ));
        }
      });
    }
  }
  else if (typeof data === 'object') {
    // Get the size of the longest index to align all the values
    var maxIndexLength = Utils.getMaxIndexLength(data);
    var key;
    var isError = data instanceof Error;

    Object.getOwnPropertyNames(data).forEach(function(i) {
      // Prepend the index at the beginning of the line
      key = (i + ': ');
      if (!options.noColor) {
        key = key[options.keysColor];
      }
      key = Utils.indent(indentation) + key;

      // Skip `undefined`, it's not a valid JSON value.
      if (data[i] === undefined) {
        return;
      }

      // If the value is serializable, render it in the same line
      if (isSerializable(data[i]) && (!isError || i !== 'stack')) {
        key += exports.render(data[i], options, maxIndexLength - i.length);
        output.push(key);

        // If the index is an array or object, render it in next line
      } else {
        output.push(key);
        output.push(
          exports.render(
            isError && i === 'stack' ? data[i].split('\n') : data[i],
            options,
            indentation + options.defaultIndentation
          )
        );
      }
    });
  }
  // Return all the lines as a string
  return output.join('\n');
};

// ### Render from string function
// *Parameters:*
//
// * **`data`**: Data to render as a string
// * **`options`**: Hash with different options to configure the parser
// * **`indentation`**: Base indentation of the parsed output
//
// *Example of options hash:*
//
//     {
//       emptyArrayMsg: '(empty)', // Rendered message on empty strings
//       keysColor: 'blue',        // Color for keys in hashes
//       dashColor: 'red',         // Color for the dashes in arrays
//       defaultIndentation: 2     // Indentation on nested objects
//     }
exports.renderString = function renderString(data, options, indentation) {

  var output = '';
  var parsedData;
  // If the input is not a string or if it's empty, just return an empty string
  if (typeof data !== 'string' || data === '') {
    return '';
  }

  // Remove non-JSON characters from the beginning string
  if (data[0] !== '{' && data[0] !== '[') {
    var beginingOfJson;
    if (data.indexOf('{') === -1) {
      beginingOfJson = data.indexOf('[');
    } else if (data.indexOf('[') === -1) {
      beginingOfJson = data.indexOf('{');
    } else if (data.indexOf('{') < data.indexOf('[')) {
      beginingOfJson = data.indexOf('{');
    } else {
      beginingOfJson = data.indexOf('[');
    }
    output += data.substr(0, beginingOfJson) + '\n';
    data = data.substr(beginingOfJson);
  }

  try {
    parsedData = JSON.parse(data);
  } catch (e) {
    // Return an error in case of an invalid JSON
    return 'Error:'.red + ' Not valid JSON!';
  }

  // Call the real render() method
  output += exports.render(parsedData, options, indentation);
  return output;
};

},{"../package.json":4,"./utils":2,"colors":3}],2:[function(require,module,exports){
'use strict';

/**
 * Creates a string with the same length as `numSpaces` parameter
 **/
exports.indent = function indent(numSpaces) {
  return new Array(numSpaces+1).join(' ');
};

/**
 * Gets the string length of the longer index in a hash
 **/
exports.getMaxIndexLength = function(input) {
  var maxWidth = 0;

  Object.getOwnPropertyNames(input).forEach(function(key) {
    maxWidth = Math.max(maxWidth, key.length);
  });
  return maxWidth;
};

},{}],3:[function(require,module,exports){
/*
colors.js

Copyright (c) 2010

Marak Squires
Alexis Sellier (cloudhead)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var isHeadless = false;

if (typeof module !== 'undefined') {
  isHeadless = true;
}

if (!isHeadless) {
  var exports = {};
  var module = {};
  var colors = exports;
  exports.mode = "browser";
} else {
  exports.mode = "console";
}

//
// Prototypes the string object to have additional method calls that add terminal colors
//
var addProperty = function (color, func) {
  exports[color] = function (str) {
    return func.apply(str);
  };
  String.prototype.__defineGetter__(color, func);
};

function stylize(str, style) {

  var styles;

  if (exports.mode === 'console') {
    styles = {
      //styles
      'bold'      : ['\x1B[1m',  '\x1B[22m'],
      'italic'    : ['\x1B[3m',  '\x1B[23m'],
      'underline' : ['\x1B[4m',  '\x1B[24m'],
      'inverse'   : ['\x1B[7m',  '\x1B[27m'],
      'strikethrough' : ['\x1B[9m',  '\x1B[29m'],
      //text colors
      //grayscale
      'white'     : ['\x1B[37m', '\x1B[39m'],
      'grey'      : ['\x1B[90m', '\x1B[39m'],
      'black'     : ['\x1B[30m', '\x1B[39m'],
      //colors
      'blue'      : ['\x1B[34m', '\x1B[39m'],
      'cyan'      : ['\x1B[36m', '\x1B[39m'],
      'green'     : ['\x1B[32m', '\x1B[39m'],
      'magenta'   : ['\x1B[35m', '\x1B[39m'],
      'red'       : ['\x1B[31m', '\x1B[39m'],
      'yellow'    : ['\x1B[33m', '\x1B[39m'],
      //background colors
      //grayscale
      'whiteBG'     : ['\x1B[47m', '\x1B[49m'],
      'greyBG'      : ['\x1B[49;5;8m', '\x1B[49m'],
      'blackBG'     : ['\x1B[40m', '\x1B[49m'],
      //colors
      'blueBG'      : ['\x1B[44m', '\x1B[49m'],
      'cyanBG'      : ['\x1B[46m', '\x1B[49m'],
      'greenBG'     : ['\x1B[42m', '\x1B[49m'],
      'magentaBG'   : ['\x1B[45m', '\x1B[49m'],
      'redBG'       : ['\x1B[41m', '\x1B[49m'],
      'yellowBG'    : ['\x1B[43m', '\x1B[49m']
    };
  } else if (exports.mode === 'browser') {
    styles = {
      //styles
      'bold'      : ['<b>',  '</b>'],
      'italic'    : ['<i>',  '</i>'],
      'underline' : ['<u>',  '</u>'],
      'inverse'   : ['<span style="background-color:black;color:white;">',  '</span>'],
      'strikethrough' : ['<del>',  '</del>'],
      //text colors
      //grayscale
      'white'     : ['<span style="color:white;">',   '</span>'],
      'grey'      : ['<span style="color:gray;">',    '</span>'],
      'black'     : ['<span style="color:black;">',   '</span>'],
      //colors
      'blue'      : ['<span style="color:blue;">',    '</span>'],
      'cyan'      : ['<span style="color:cyan;">',    '</span>'],
      'green'     : ['<span style="color:green;">',   '</span>'],
      'magenta'   : ['<span style="color:magenta;">', '</span>'],
      'red'       : ['<span style="color:red;">',     '</span>'],
      'yellow'    : ['<span style="color:yellow;">',  '</span>'],
      //background colors
      //grayscale
      'whiteBG'     : ['<span style="background-color:white;">',   '</span>'],
      'greyBG'      : ['<span style="background-color:gray;">',    '</span>'],
      'blackBG'     : ['<span style="background-color:black;">',   '</span>'],
      //colors
      'blueBG'      : ['<span style="background-color:blue;">',    '</span>'],
      'cyanBG'      : ['<span style="background-color:cyan;">',    '</span>'],
      'greenBG'     : ['<span style="background-color:green;">',   '</span>'],
      'magentaBG'   : ['<span style="background-color:magenta;">', '</span>'],
      'redBG'       : ['<span style="background-color:red;">',     '</span>'],
      'yellowBG'    : ['<span style="background-color:yellow;">',  '</span>']
    };
  } else if (exports.mode === 'none') {
    return str + '';
  } else {
    console.log('unsupported mode, try "browser", "console" or "none"');
  }
  return styles[style][0] + str + styles[style][1];
}

function applyTheme(theme) {

  //
  // Remark: This is a list of methods that exist
  // on String that you should not overwrite.
  //
  var stringPrototypeBlacklist = [
    '__defineGetter__', '__defineSetter__', '__lookupGetter__', '__lookupSetter__', 'charAt', 'constructor',
    'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf', 'charCodeAt',
    'indexOf', 'lastIndexof', 'length', 'localeCompare', 'match', 'replace', 'search', 'slice', 'split', 'substring',
    'toLocaleLowerCase', 'toLocaleUpperCase', 'toLowerCase', 'toUpperCase', 'trim', 'trimLeft', 'trimRight'
  ];

  Object.keys(theme).forEach(function (prop) {
    if (stringPrototypeBlacklist.indexOf(prop) !== -1) {
      console.log('warn: '.red + ('String.prototype' + prop).magenta + ' is probably something you don\'t want to override. Ignoring style name');
    }
    else {
      if (typeof(theme[prop]) === 'string') {
        addProperty(prop, function () {
          return exports[theme[prop]](this);
        });
      }
      else {
        addProperty(prop, function () {
          var ret = this;
          for (var t = 0; t < theme[prop].length; t++) {
            ret = exports[theme[prop][t]](ret);
          }
          return ret;
        });
      }
    }
  });
}


//
// Iterate through all default styles and colors
//
var x = ['bold', 'underline', 'strikethrough', 'italic', 'inverse', 'grey', 'black', 'yellow', 'red', 'green', 'blue', 'white', 'cyan', 'magenta', 'greyBG', 'blackBG', 'yellowBG', 'redBG', 'greenBG', 'blueBG', 'whiteBG', 'cyanBG', 'magentaBG'];
x.forEach(function (style) {

  // __defineGetter__ at the least works in more browsers
  // http://robertnyman.com/javascript/javascript-getters-setters.html
  // Object.defineProperty only works in Chrome
  addProperty(style, function () {
    return stylize(this, style);
  });
});

function sequencer(map) {
  return function () {
    if (!isHeadless) {
      return this.replace(/( )/, '$1');
    }
    var exploded = this.split(""), i = 0;
    exploded = exploded.map(map);
    return exploded.join("");
  };
}

var rainbowMap = (function () {
  var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta']; //RoY G BiV
  return function (letter, i, exploded) {
    if (letter === " ") {
      return letter;
    } else {
      return stylize(letter, rainbowColors[i++ % rainbowColors.length]);
    }
  };
})();

exports.themes = {};

exports.addSequencer = function (name, map) {
  addProperty(name, sequencer(map));
};

exports.addSequencer('rainbow', rainbowMap);
exports.addSequencer('zebra', function (letter, i, exploded) {
  return i % 2 === 0 ? letter : letter.inverse;
});

exports.setTheme = function (theme) {
  if (typeof theme === 'string') {
    try {
      exports.themes[theme] = require(theme);
      applyTheme(exports.themes[theme]);
      return exports.themes[theme];
    } catch (err) {
      console.log(err);
      return err;
    }
  } else {
    applyTheme(theme);
  }
};


addProperty('stripColors', function () {
  return ("" + this).replace(/\x1B\[\d+m/g, '');
});

// please no
function zalgo(text, options) {
  var soul = {
    "up" : [
      '̍', '̎', '̄', '̅',
      '̿', '̑', '̆', '̐',
      '͒', '͗', '͑', '̇',
      '̈', '̊', '͂', '̓',
      '̈', '͊', '͋', '͌',
      '̃', '̂', '̌', '͐',
      '̀', '́', '̋', '̏',
      '̒', '̓', '̔', '̽',
      '̉', 'ͣ', 'ͤ', 'ͥ',
      'ͦ', 'ͧ', 'ͨ', 'ͩ',
      'ͪ', 'ͫ', 'ͬ', 'ͭ',
      'ͮ', 'ͯ', '̾', '͛',
      '͆', '̚'
    ],
    "down" : [
      '̖', '̗', '̘', '̙',
      '̜', '̝', '̞', '̟',
      '̠', '̤', '̥', '̦',
      '̩', '̪', '̫', '̬',
      '̭', '̮', '̯', '̰',
      '̱', '̲', '̳', '̹',
      '̺', '̻', '̼', 'ͅ',
      '͇', '͈', '͉', '͍',
      '͎', '͓', '͔', '͕',
      '͖', '͙', '͚', '̣'
    ],
    "mid" : [
      '̕', '̛', '̀', '́',
      '͘', '̡', '̢', '̧',
      '̨', '̴', '̵', '̶',
      '͜', '͝', '͞',
      '͟', '͠', '͢', '̸',
      '̷', '͡', ' ҉'
    ]
  },
  all = [].concat(soul.up, soul.down, soul.mid),
  zalgo = {};

  function randomNumber(range) {
    var r = Math.floor(Math.random() * range);
    return r;
  }

  function is_char(character) {
    var bool = false;
    all.filter(function (i) {
      bool = (i === character);
    });
    return bool;
  }

  function heComes(text, options) {
    var result = '', counts, l;
    options = options || {};
    options["up"] = options["up"] || true;
    options["mid"] = options["mid"] || true;
    options["down"] = options["down"] || true;
    options["size"] = options["size"] || "maxi";
    text = text.split('');
    for (l in text) {
      if (is_char(l)) {
        continue;
      }
      result = result + text[l];
      counts = {"up" : 0, "down" : 0, "mid" : 0};
      switch (options.size) {
      case 'mini':
        counts.up = randomNumber(8);
        counts.min = randomNumber(2);
        counts.down = randomNumber(8);
        break;
      case 'maxi':
        counts.up = randomNumber(16) + 3;
        counts.min = randomNumber(4) + 1;
        counts.down = randomNumber(64) + 3;
        break;
      default:
        counts.up = randomNumber(8) + 1;
        counts.mid = randomNumber(6) / 2;
        counts.down = randomNumber(8) + 1;
        break;
      }

      var arr = ["up", "mid", "down"];
      for (var d in arr) {
        var index = arr[d];
        for (var i = 0 ; i <= counts[index]; i++) {
          if (options[index]) {
            result = result + soul[index][randomNumber(soul[index].length)];
          }
        }
      }
    }
    return result;
  }
  return heComes(text);
}


// don't summon zalgo
addProperty('zalgo', function () {
  return zalgo(this);
});

},{}],4:[function(require,module,exports){
module.exports={
  "author": {
    "name": "Rafael de Oleza",
    "email": "rafeca@gmail.com",
    "url": "https://github.com/rafeca"
  },
  "name": "prettyjson",
  "description": "Package for formatting JSON data in a coloured YAML-style, perfect for CLI output",
  "version": "1.1.2",
  "homepage": "http://rafeca.com/prettyjson",
  "keywords": [
    "json",
    "cli",
    "formatting",
    "colors"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/rafeca/prettyjson.git"
  },
  "bugs": {
    "url": "https://github.com/rafeca/prettyjson/issues"
  },
  "main": "./lib/prettyjson",
  "license": "MIT",
  "scripts": {
    "test": "npm run jshint && mocha --reporter spec",
    "testwin": "node ./node_modules/mocha/bin/mocha --reporter spec",
    "jshint": "jshint lib/*.js",
    "coverage": "istanbul cover _mocha --report lcovonly -- -R spec",
    "coveralls": "npm run coverage && cat ./coverage/lcov.info | coveralls && rm -rf ./coverage",
    "changelog": "git log $(git describe --tags --abbrev=0)..HEAD --pretty='* %s' --first-parent"
  },
  "bin": {
    "prettyjson": "./bin/prettyjson"
  },
  "engines": {
    "node": ">= 0.10.0 < 0.13.0"
  },
  "dependencies": {
    "colors": "0.6.2",
    "minimist": "1.1.0"
  },
  "devDependencies": {
    "mocha": "^1.18.2",
    "should": "^3.1.4",
    "jshint": "^2.4.4",
    "getversion": "~0.1.1",
    "istanbul": "~0.2.4",
    "coveralls": "^2.10.0",
    "mocha-lcov-reporter": "0.0.1"
  },
  "gitHead": "df5b3a2f19667f3a9ad156918f0ed2a9e616ad33",
  "_id": "prettyjson@1.1.2",
  "_shasum": "4353b88b7131797fb5520e39eba263df5863cba3",
  "_from": "prettyjson@*",
  "_npmVersion": "2.8.3",
  "_nodeVersion": "0.10.32",
  "_npmUser": {
    "name": "rafeca",
    "email": "rafeca@gmail.com"
  },
  "maintainers": [
    {
      "name": "rafeca",
      "email": "rafeca@gmail.com"
    }
  ],
  "dist": {
    "shasum": "4353b88b7131797fb5520e39eba263df5863cba3",
    "tarball": "http://registry.npmjs.org/prettyjson/-/prettyjson-1.1.2.tgz"
  },
  "directories": {},
  "_resolved": "https://registry.npmjs.org/prettyjson/-/prettyjson-1.1.2.tgz",
  "readme": "ERROR: No README data found!"
}

},{}]},{},[1])(1)
});
/* jshint ignore:end */
