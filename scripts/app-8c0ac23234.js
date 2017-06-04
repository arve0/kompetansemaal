!function(){"use strict";angular.module("kompetansemaal",["ngAria","ui.router","ODataResources","angular-clipboard","ui.bootstrap"])}(),function(){"use strict";function e(e,t,a,n){function r(e){var t=n(u+"odata/"+e+"/:id",{},{odata:{cache:!0,isArray:!0,transformResponse:d}});return t.search=function(e){var n=[];for(var r in e){var o=new a.Func("tolower",r),l=new a.Value(e[r].toLowerCase()),i=new a.Predicate(new a.Func("substringof",l,o),!0);n.push(i)}var s=a.Predicate.or(n);return t.odata().filter("Status","http://data.udir.no/kl06/status_publisert").filter(s).transformUrl(function(e){return e+"&lang=nob"})},t}function o(a){return t.get(u+a+"?lang=nob",{cache:!0}).then(function(e){var t=l(e.data);return t=i(t)})["catch"](function(t){e.error("XHR Failed for udir.\n"+angular.toJson(t,!0))})}function l(e){for(var t in e)p(e[t])?e[t]=c(e[t]):angular.isObject(e[t])&&(e[t]=l(e[t]));return e}function i(e){for(var t in e){var a=s(t);a!==t&&(e[a]=e[t],delete e[t]),angular.isObject(e[a])&&i(e[a])}return e}function s(e){var t=new RegExp("-","gi");return e.replace(t,"")}function p(e){return angular.isArray(e)&&0!==e.length&&angular.isObject(e[0])&&2===Object.keys(e[0]).length&&"noekkel"in e[0]&&"verdi"in e[0]}function c(t){for(var a="http://psi.oasis-open.org/iso/639/#",n={},r=0,o=t.length;o>r;++r)if("noekkel"in t[r]&&"verdi"in t[r]){Object.keys(t[r]).length>2&&(e.warn("Got object with more than two keys."),e.warn(t[r]));var l=t[r].noekkel;0===l.search(a)&&(l=l.substring(a.length,l.length)),l in n&&e.warn("Several instances of "+t[r].noekkel),n[l]=t[r].verdi}else e.error('Expected "noekkel" and "verdi" keys on object.'),e.error(t[r]);return n}function d(e){var t;try{t=angular.fromJson(e)}catch(a){return{error:{msg:"Not JSON"+a},data:e}}return"d"in t&&(t="results"in t.d?t.d.results:t.d),t}var u="http://data.udir.no/kl06/",g={baseUrl:u,getREST:o,odataResource:r};return g}e.$inject=["$log","$http","$odata","$odataresource"],angular.module("kompetansemaal").factory("udir",e)}(),function(){"use strict";function e(e,t){if(!angular.isArray(e))return e;for(var a="http://data.udir.no/kl06/",n=0;n<e.length;n++){var r=e[n];if(a+t===r.spraak)return r.verdi}return e[0].verdi}function t(t,a){var n=e(t[0],a),r=e(t[1],a);return n===r}function a(e,a){return!t(e,a)}angular.module("kompetansemaal").filter("isEqual",function(){return t}).filter("isNotEqual",function(){return a}).filter("pickLanguage",function(){return e})}(),function(){"use strict";function e(){var e={restrict:"A",templateUrl:"app/components/tableRow/tableRow.html",scope:{header:"@th",data:"=td"}};return e}angular.module("kompetansemaal").directive("tableRow",e)}(),function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.prettyjson=e()}}(function(){return function e(t,a,n){function r(l,i){if(!a[l]){if(!t[l]){var s="function"==typeof require&&require;if(!i&&s)return s(l,!0);if(o)return o(l,!0);var p=new Error("Cannot find module '"+l+"'");throw p.code="MODULE_NOT_FOUND",p}var c=a[l]={exports:{}};t[l][0].call(c.exports,function(e){var a=t[l][1][e];return r(a?a:e)},c,c.exports,e,t,a,n)}return a[l].exports}for(var o="function"==typeof require&&require,l=0;l<n.length;l++)r(n[l]);return r}({1:[function(e,t,a){"use strict";e("colors");var n=e("./utils");a.version=e("../package.json").version,a.render=function(e,t,r){r=r||0,t=t||{},t.emptyArrayMsg=t.emptyArrayMsg||"(empty array)",t.keysColor=t.keysColor||"green",t.dashColor=t.dashColor||"green",t.numberColor=t.numberColor||"blue",t.defaultIndentation=t.defaultIndentation||2,t.noColor=!!t.noColor,t.stringColor=t.stringColor||null;var o=[],l=function(e,a){return"boolean"==typeof e||"number"==typeof e||null===e||e instanceof Date?!0:"string"==typeof e&&-1===e.indexOf("\n")?!0:t.inlineArrays&&!a&&Array.isArray(e)&&l(e[0],!0)?!0:!1},i=function(e,t){var a=e.split("\n");return a=a.map(function(e){return n.indent(t)+e}),a.join("\n")},s=function(e){if(t.noColor)return e;if("string"==typeof e)return t.stringColor?e[t.stringColor]:e;var a=e+"";return e===!0?a.green:e===!1?a.red:null===e?a.grey:"number"==typeof e?a[t.numberColor]:Array.isArray(e)?e.join(", "):a};if(l(e))o.push(n.indent(r)+s(e));else if("string"==typeof e)o.push(n.indent(r)+'"""'),o.push(i(e,r+t.defaultIndentation)),o.push(n.indent(r)+'"""');else if(Array.isArray(e))0===e.length?o.push(n.indent(r)+t.emptyArrayMsg):e.forEach(function(e){var i="- ";t.noColor||(i=i[t.dashColor]),i=n.indent(r)+i,l(e)?(i+=a.render(e,t),o.push(i)):(o.push(i),o.push(a.render(e,t,r+t.defaultIndentation)))});else if("object"==typeof e){var p,c=n.getMaxIndexLength(e),d=e instanceof Error;Object.getOwnPropertyNames(e).forEach(function(i){p=i+": ",t.noColor||(p=p[t.keysColor]),p=n.indent(r)+p,void 0!==e[i]&&(!l(e[i])||d&&"stack"===i?(o.push(p),o.push(a.render(d&&"stack"===i?e[i].split("\n"):e[i],t,r+t.defaultIndentation))):(p+=a.render(e[i],t,c-i.length),o.push(p)))})}return o.join("\n")},a.renderString=function(e,t,n){var r,o="";if("string"!=typeof e||""===e)return"";if("{"!==e[0]&&"["!==e[0]){var l;l=-1===e.indexOf("{")?e.indexOf("["):-1===e.indexOf("[")?e.indexOf("{"):e.indexOf("{")<e.indexOf("[")?e.indexOf("{"):e.indexOf("["),o+=e.substr(0,l)+"\n",e=e.substr(l)}try{r=JSON.parse(e)}catch(i){return"Error:".red+" Not valid JSON!"}return o+=a.render(r,t,n)}},{"../package.json":4,"./utils":2,colors:3}],2:[function(e,t,a){"use strict";a.indent=function(e){return new Array(e+1).join(" ")},a.getMaxIndexLength=function(e){var t=0;return Object.getOwnPropertyNames(e).forEach(function(e){t=Math.max(t,e.length)}),t}},{}],3:[function(e,t,a){function n(e,t){var n;if("console"===a.mode)n={bold:["[1m","[22m"],italic:["[3m","[23m"],underline:["[4m","[24m"],inverse:["[7m","[27m"],strikethrough:["[9m","[29m"],white:["[37m","[39m"],grey:["[90m","[39m"],black:["[30m","[39m"],blue:["[34m","[39m"],cyan:["[36m","[39m"],green:["[32m","[39m"],magenta:["[35m","[39m"],red:["[31m","[39m"],yellow:["[33m","[39m"],whiteBG:["[47m","[49m"],greyBG:["[49;5;8m","[49m"],blackBG:["[40m","[49m"],blueBG:["[44m","[49m"],cyanBG:["[46m","[49m"],greenBG:["[42m","[49m"],magentaBG:["[45m","[49m"],redBG:["[41m","[49m"],yellowBG:["[43m","[49m"]};else if("browser"===a.mode)n={bold:["<b>","</b>"],italic:["<i>","</i>"],underline:["<u>","</u>"],inverse:['<span style="background-color:black;color:white;">',"</span>"],strikethrough:["<del>","</del>"],white:['<span style="color:white;">',"</span>"],grey:['<span style="color:gray;">',"</span>"],black:['<span style="color:black;">',"</span>"],blue:['<span style="color:blue;">',"</span>"],cyan:['<span style="color:cyan;">',"</span>"],green:['<span style="color:green;">',"</span>"],magenta:['<span style="color:magenta;">',"</span>"],red:['<span style="color:red;">',"</span>"],yellow:['<span style="color:yellow;">',"</span>"],whiteBG:['<span style="background-color:white;">',"</span>"],greyBG:['<span style="background-color:gray;">',"</span>"],blackBG:['<span style="background-color:black;">',"</span>"],blueBG:['<span style="background-color:blue;">',"</span>"],cyanBG:['<span style="background-color:cyan;">',"</span>"],greenBG:['<span style="background-color:green;">',"</span>"],magentaBG:['<span style="background-color:magenta;">',"</span>"],redBG:['<span style="background-color:red;">',"</span>"],yellowBG:['<span style="background-color:yellow;">',"</span>"]};else{if("none"===a.mode)return e+"";console.log('unsupported mode, try "browser", "console" or "none"')}return n[t][0]+e+n[t][1]}function r(e){var t=["__defineGetter__","__defineSetter__","__lookupGetter__","__lookupSetter__","charAt","constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf","charCodeAt","indexOf","lastIndexof","length","localeCompare","match","replace","search","slice","split","substring","toLocaleLowerCase","toLocaleUpperCase","toLowerCase","toUpperCase","trim","trimLeft","trimRight"];Object.keys(e).forEach(function(n){-1!==t.indexOf(n)?console.log("warn: ".red+("String.prototype"+n).magenta+" is probably something you don't want to override. Ignoring style name"):"string"==typeof e[n]?s(n,function(){return a[e[n]](this)}):s(n,function(){for(var t=this,r=0;r<e[n].length;r++)t=a[e[n][r]](t);return t})})}function o(e){return function(){if(!i)return this.replace(/( )/,"$1");var t=this.split("");return t=t.map(e),t.join("")}}function l(e,t){function a(e){var t=Math.floor(Math.random()*e);return t}function n(e){var t=!1;return l.filter(function(a){t=a===e}),t}function r(e,t){var r,l,i="";t=t||{},t.up=t.up||!0,t.mid=t.mid||!0,t.down=t.down||!0,t.size=t.size||"maxi",e=e.split("");for(l in e)if(!n(l)){switch(i+=e[l],r={up:0,down:0,mid:0},t.size){case"mini":r.up=a(8),r.min=a(2),r.down=a(8);break;case"maxi":r.up=a(16)+3,r.min=a(4)+1,r.down=a(64)+3;break;default:r.up=a(8)+1,r.mid=a(6)/2,r.down=a(8)+1}var s=["up","mid","down"];for(var p in s)for(var c=s[p],d=0;d<=r[c];d++)t[c]&&(i+=o[c][a(o[c].length)])}return i}var o={up:["̍","̎","̄","̅","̿","̑","̆","̐","͒","͗","͑","̇","̈","̊","͂","̓","̈","͊","͋","͌","̃","̂","̌","͐","̀","́","̋","̏","̒","̓","̔","̽","̉","ͣ","ͤ","ͥ","ͦ","ͧ","ͨ","ͩ","ͪ","ͫ","ͬ","ͭ","ͮ","ͯ","̾","͛","͆","̚"],down:["̖","̗","̘","̙","̜","̝","̞","̟","̠","̤","̥","̦","̩","̪","̫","̬","̭","̮","̯","̰","̱","̲","̳","̹","̺","̻","̼","ͅ","͇","͈","͉","͍","͎","͓","͔","͕","͖","͙","͚","̣"],mid:["̕","̛","̀","́","͘","̡","̢","̧","̨","̴","̵","̶","͜","͝","͞","͟","͠","͢","̸","̷","͡"," ҉"]},l=[].concat(o.up,o.down,o.mid);return r(e)}/*
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
var i=!1;if("undefined"!=typeof t&&(i=!0),i)a.mode="console";else{var a={},t={};a.mode="browser"}var s=function(e,t){a[e]=function(e){return t.apply(e)},String.prototype.__defineGetter__(e,t)},p=["bold","underline","strikethrough","italic","inverse","grey","black","yellow","red","green","blue","white","cyan","magenta","greyBG","blackBG","yellowBG","redBG","greenBG","blueBG","whiteBG","cyanBG","magentaBG"];p.forEach(function(e){s(e,function(){return n(this,e)})});var c=function(){var e=["red","yellow","green","blue","magenta"];return function(t,a,r){return" "===t?t:n(t,e[a++%e.length])}}();a.themes={},a.addSequencer=function(e,t){s(e,o(t))},a.addSequencer("rainbow",c),a.addSequencer("zebra",function(e,t,a){return t%2===0?e:e.inverse}),a.setTheme=function(t){if("string"==typeof t)try{return a.themes[t]=e(t),r(a.themes[t]),a.themes[t]}catch(n){return console.log(n),n}else r(t)},s("stripColors",function(){return(""+this).replace(/\x1B\[\d+m/g,"")}),s("zalgo",function(){return l(this)})},{}],4:[function(e,t,a){t.exports={author:{name:"Rafael de Oleza",email:"rafeca@gmail.com",url:"https://github.com/rafeca"},name:"prettyjson",description:"Package for formatting JSON data in a coloured YAML-style, perfect for CLI output",version:"1.1.2",homepage:"http://rafeca.com/prettyjson",keywords:["json","cli","formatting","colors"],repository:{type:"git",url:"git+https://github.com/rafeca/prettyjson.git"},bugs:{url:"https://github.com/rafeca/prettyjson/issues"},main:"./lib/prettyjson",license:"MIT",scripts:{test:"npm run jshint && mocha --reporter spec",testwin:"node ./node_modules/mocha/bin/mocha --reporter spec",jshint:"jshint lib/*.js",coverage:"istanbul cover _mocha --report lcovonly -- -R spec",coveralls:"npm run coverage && cat ./coverage/lcov.info | coveralls && rm -rf ./coverage",changelog:"git log $(git describe --tags --abbrev=0)..HEAD --pretty='* %s' --first-parent"},bin:{prettyjson:"./bin/prettyjson"},engines:{node:">= 0.10.0 < 0.13.0"},dependencies:{colors:"0.6.2",minimist:"1.1.0"},devDependencies:{mocha:"^1.18.2",should:"^3.1.4",jshint:"^2.4.4",getversion:"~0.1.1",istanbul:"~0.2.4",coveralls:"^2.10.0","mocha-lcov-reporter":"0.0.1"},gitHead:"df5b3a2f19667f3a9ad156918f0ed2a9e616ad33",_id:"prettyjson@1.1.2",_shasum:"4353b88b7131797fb5520e39eba263df5863cba3",_from:"prettyjson@*",_npmVersion:"2.8.3",_nodeVersion:"0.10.32",_npmUser:{name:"rafeca",email:"rafeca@gmail.com"},maintainers:[{name:"rafeca",email:"rafeca@gmail.com"}],dist:{shasum:"4353b88b7131797fb5520e39eba263df5863cba3",tarball:"http://registry.npmjs.org/prettyjson/-/prettyjson-1.1.2.tgz"},directories:{},_resolved:"https://registry.npmjs.org/prettyjson/-/prettyjson-1.1.2.tgz",readme:"ERROR: No README data found!"}},{}]},{},[1])(1)}),function(){"use strict";angular.module("kompetansemaal").filter("prettyjson",function(){return function(e){if(!angular.isObject)return e;var t={};for(var a in e)0!=a.search(/^\$/)&&(t[a]=e[a]);return window.prettyjson.render(t,{noColor:!0})}})}(),function(){"use strict";function e(){function e(e){e.isCollapsed=!0}var t={restrict:"E",templateUrl:"app/components/navbar/navbar.html",controller:e};return t}angular.module("kompetansemaal").directive("navbar",e)}(),function(){"use strict";function e(e){return function(t,a){if(t&&a){var n=new RegExp(a,"gi");t=t.replace(n,'<span class="highlightedText">$&</span>')}return e.trustAsHtml(t)}}e.$inject=["$sce"],angular.module("kompetansemaal").filter("highlightText",e)}(),function(){"use strict";function e(e){function t(t,a,n){function r(){t.tooltip.show=!1}var o;o=/iPhone|iPad/i.test(navigator.userAgent)?"No copy support on iOS.":/Mac/i.test(navigator.userAgent)?"Press ⌘-C to copy.":"Press Ctrl-C to copy.",t.tooltip={msg:"Kopiert!",show:!1},t.copied=function(){t.tooltip.show=!0,t.$apply(),e(r,1e3)},t.error=function(n){a[0].getElementsByTagName("input")[0].select(),t.tooltip.msg=o,t.tooltip.show=!0,t.$apply(),e(r,2e3)}}var a={restrict:"E",templateUrl:"app/components/copy/copy.html",scope:{text:"="},link:t};return a}e.$inject=["$timeout"],angular.module("kompetansemaal").directive("copy",e)}(),function(){"use strict";function e(e,t,a){var n=this;e.oppgaver.get(function(e,r){r&&a.error(r),n.oppgaver=e,t.$apply()})}e.$inject=["dpd","$scope","$log"],angular.module("kompetansemaal").controller("OppgaverController",e)}(),function(){"use strict";function e(){var e={search:{tooltip:!1},laereplaner:[],fag:[],kompetansemaal:[]};return e}angular.module("kompetansemaal").factory("mainState",e)}(),function(){"use strict";function e(e,t,a){var n=this;n.state=a;var r=a,o=e.odataResource("Læreplan"),l=e.odataResource("Fagkode"),i=e.odataResource("Kompetansemål");t.$watch("main.state.search.query",function(e,t){if("undefined"!=typeof e&&e!==t){if(e.length<2)return r.search.tooltip=!0,r.laereplaner=[],r.fag=[],void(r.kompetansemaal=[]);r.search.tooltip=!1;var a={Tittel:e,Kode:e},n=["Tittel","Kode"];r.laereplaner=o.search(a).select(n).query(),r.fag=l.search(a).select(n).query(),r.kompetansemaal=i.search(a).select(n).query()}}),n.nothingFound=function(){return r.search.query&&!r.laereplaner.length&&!r.fag.length&&!r.kompetansemaal.length}}e.$inject=["udir","$scope","mainState"],angular.module("kompetansemaal").controller("MainController",e)}(),function(){"use strict";function e(e,t){var a=this;a.params=e,a.data=t.getREST(a.params.id).then(function(e){a.data=e})}function t(e,t){return e.filter(function(e){return e.tilhoererhovedomraade.kode===t})}e.$inject=["$stateParams","udir"],angular.module("kompetansemaal").controller("LaereplanController",e).filter("kmFilter",function(){return t})}(),function(){"use strict";function e(e,t){var a=this;a.params=e,a.data=t.getREST(a.params.id).then(function(e){a.data=e})}e.$inject=["$stateParams","udir"],angular.module("kompetansemaal").controller("KompetansemaalController",e)}(),function(){"use strict";function e(e,t){var a=this;a.params=e,a.data=t.getREST(a.params.id).then(function(e){a.data=e})}e.$inject=["$stateParams","udir"],angular.module("kompetansemaal").controller("KodeController",e)}(),function(){"use strict";function e(e,t,a,n){function r(e){t.getREST(e.kode).then(function(t){return"laereplanreferanse"in t?void(e.laereplanreferanse=t.laereplanreferanse):void n.error("Referanse til læreplan ikke funnet for "+e.kode)})}var o=this;o.state=a,o.params=e,o.data=t.getREST(o.params.id).then(function(e){o.data=e;for(var t=0,a=o.data.opplaeringsfag.length;a>t;++t)r(o.data.opplaeringsfag[t])})}e.$inject=["$stateParams","udir","mainState","$log"],angular.module("kompetansemaal").controller("FagController",e)}(),function(){"use strict";function e(e){e.debug("runBlock end")}e.$inject=["$log"],angular.module("kompetansemaal").run(e)}(),function(){"use strict";function e(e,t){e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).state("laereplan",{url:"/laereplan/:id",templateUrl:"app/laereplan/laereplan.html",controller:"LaereplanController",controllerAs:"lp"}).state("fag",{url:"/fag/:id",templateUrl:"app/fag/fag.html",controller:"FagController",controllerAs:"fag"}).state("kompetansemaal",{url:"/kompetansemaal/:id",templateUrl:"app/kompetansemaal/kompetansemaal.html",controller:"KompetansemaalController",controllerAs:"km"}).state("oppgaver",{url:"/oppgaver",templateUrl:"app/oppgaver/oppgaver.html",controller:"OppgaverController",controllerAs:"oppg"}).state("kode",{url:"/kode/:id",templateUrl:"app/kode/kode.html",controller:"KodeController",controllerAs:"kode"}),t.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("kompetansemaal").config(e)}(),function(){var e=e||{};angular.module("kompetansemaal").constant("dpd",e)}(),function(){"use strict";function e(e,t){e.debugEnabled(!0)}e.$inject=["$logProvider","$httpProvider"],angular.module("kompetansemaal").config(e)}(),angular.module("kompetansemaal").run(["$templateCache",function(e){e.put("app/fag/fag.html",'<navbar></navbar><div class="container"><div><table class="table table-striped table-nonfluid"><tr><th>Kode</th><td><copy text="fag.data.kode"></copy></td></tr><tr table-row="" th="Tittel" td="fag.data.tittel | pickLanguage:nob"></tr><tr table-row="" th="Kortform" td="fag.data.kortform | pickLanguage:nob" ng-if="fag.data.kortform.nob && ([fag.data.tittel, fag.data.kortform] | isNotEqual)"></tr><tr><th>Læreplan<span ng-if="fag.data.opplaeringsfag.length > 1">er</span></th><td><a ng-if="fag.data.opplaeringsfag.length == 1" href="#/laereplan/{{fag.data.opplaeringsfag[0].laereplanreferanse[0].kode}}">{{fag.data.opplaeringsfag[0].laereplanreferanse[0].kode}}</a><li ng-if="fag.data.opplaeringsfag.length > 1" ng-repeat="ofag in fag.data.opplaeringsfag"><a href="#/laereplan/{{ofag.laereplanreferanse[0].kode}}">{{ofag.laereplanreferanse[0].kode}}</a></li></td></tr><tr table-row="" th="Sist endret" td="fag.data.sistendret | pickLanguage:nob"></tr><tr table-row="" th="Fagtype" td="fag.data.fagtype.tittel"></tr><tr table-row="" th="Opplæringsnivå" td="fag.data.opplaeringsnivaa.tittel | pickLanguage:nob"></tr><tr table-row="" th="Omfang totalt" td="fag.data.omfangtotalt" ng-if="fag.data.omfangtotalt"></tr><tr table-row="" th="Omfang vitnemål" td="fag.data.omfangvitnemaal" ng-if="fag.data.omfangvitnemaal"></tr><tr table-row="" th="Omfang totalt" td="fag.data.omfangbrutto" ng-if="fag.data.omfangbrutto"></tr><tr table-row="" th="Omfang kompetansemaalsett" td="fag.data.omfangkompetansemaalsett" ng-if="fag.data.omfangkompetansemaalsett"></tr><tr table-row="" th="Første semester" td="fag.data.naargisdetundervisning.foerstesemester.beskrivelse | pickLanguage:nob" ng-if="fag.data.naargisdetundervisning.foerstesemester"></tr><tr table-row="" th="Første semester" td="fag.data.naargisdetundervisning.sistesemester.beskrivelse | pickLanguage:nob" ng-if="fag.data.naargisdetundervisning.sistesemester"></tr><tr table-row="" th="Eksamensordning" td="fag.data.vurderingelevlaerling.typeeksamensordning.beskrivelse | pickLanguage:nob" ng-if="fag.data.vurderingelevlaerling.typeeksamensordning"></tr><tr table-row="" th="Data-url" td="fag.data.urldata"></tr></table></div></div>'),e.put("app/kode/kode.html",'<navbar></navbar><div class="container"><div><pre>{{kode.data | prettyjson}}</pre></div></div>'),e.put("app/laereplan/laereplan.html",'<navbar></navbar><div class="container"><div><div ng-repeat="kms in lp.data.kompetansemaalkapittel.kompetansemaalsett"><h2>{{kms.etterfag[0].tittel | pickLanguage:nob}}</h2><div ng-repeat="omr in kms.hovedomraaderikontekstavkompetansemaalsett"><h3>{{omr.hovedomraadeverdierunderkompetansemaalsett.tittel | pickLanguage:nob}}</h3><table class="table table-striped table-nonfluid"><tr><th>ID</th><th>Kompetansemål</th></tr><tr ng-repeat="maal in kms.kompetansemaal | kmFilter:omr.kode"><td><copy text="maal.kode"></copy></td><td>{{maal.tittel}}</td></tr></table></div></div></div></div>'),e.put("app/kompetansemaal/kompetansemaal.html",'<navbar></navbar><div class="container"><div><table class="table table-striped"><tr><th>Kode</th><td><copy text="km.data.kode"></copy></td></tr><tr table-row="" th="Tittel" td="km.data.tittel | pickLanguage:nob"></tr><tr ng-if="km.data.laereplanreferanser.length == 1"><th>Læreplan</th><td><a ng-repeat="lp in km.data.laereplanreferanser" href="#/laereplan/{{lp.kode}}">{{lp.tittel}} ({{lp.kode}})</a></td></tr><tr ng-if="km.data.laereplanreferanser.length > 1"><th>Læreplaner</th><td><li ng-repeat="lp in km.data.laereplanreferanser"><a href="#/laereplan/{{lp.kode}}">{{lp.tittel}} ({{lp.kode}})</a></li></td></tr><tr table-row="" th="Sist endret" td="km.data.sistendret"></tr><tr table-row="" th="Data-url" td="km.data.urldata"></tr></table></div></div>'),e.put("app/main/main.html",'<navbar></navbar><div class="container"><div id="main"><div class="form-inline search"><input type="text" placeholder="Søk" class="form-control" ng-model="main.state.search.query" ng-model-options="{debounce: 200}" tooltip="2 eller flere bokstaver" tooltip-trigger="none" tooltip-is-open="main.state.search.tooltip" ng-focus="main.state.search.tooltip = (main.state.search.query)?false:true" ng-blur="main.state.search.tooltip = false"></div><div class="alert alert-info" role="alert" ng-if="main.nothingFound()">Fant ingen læreplaner, fag eller kompetansemål med søket <i>{{main.state.search.query}}</i>.</div><div class="col-lg-4" ng-if="main.state.laereplaner.length"><table class="table table-striped"><tr><th>Læreplan<span ng-if="main.state.laereplaner.length > 1">er</span> <span class="badge">{{main.state.laereplaner.length}}</span></th></tr><tr ng-repeat="lp in main.state.laereplaner | orderBy:\'Kode\'"><td><a href="#/laereplan/{{lp.Kode}}" ng-bind-html="lp.Tittel +\' (\'+ lp.Kode +\')\' | highlightText:main.state.search.query"></a></td></tr></table></div><div class="col-lg-4" ng-if="main.state.fag.length"><table class="table table-striped"><tr><th>Fag <span class="badge">{{main.state.fag.length}}</span></th></tr><tr ng-repeat="fag in main.state.fag | orderBy:\'Kode\'"><td><a href="#/fag/{{fag.Kode}}" ng-bind-html="fag.Tittel +\' (\'+ fag.Kode +\')\' | highlightText:main.state.search.query"></a></td></tr></table></div><div class="col-lg-4" ng-if="main.state.kompetansemaal.length"><table class="table table-striped"><tr><th>Kompetansemål <span class="badge">{{main.state.kompetansemaal.length}}</span></th></tr><tr ng-repeat="maal in main.state.kompetansemaal | orderBy:\'Kode\'"><td><a href="#/kompetansemaal/{{maal.Kode}}" ng-bind-html="maal.Tittel +\' (\'+ maal.Kode +\')\' | highlightText:main.state.search.query"></a></td></tr></table></div></div></div>'),e.put("app/oppgaver/oppgaver.html",'<navbar></navbar><div class="container"><div><pre>{{oppg.oppgaver | prettyjson}}</pre></div></div>'),e.put("app/components/copy/copy.html",'<div class="form-inline input-group copy" tooltip="{{tooltip.msg}}" tooltip-trigger="none" tooltip-is-open="tooltip.show"><span clipboard="" text="text" on-copied="copied()" on-error="error(err)" class="input-group-btn"><button class="btn btn-default"><span class="glyphicon glyphicon-copy"></span></button></span> <input type="text" class="form-control" ng-value="text"></div>'),e.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-default navbar-static-top"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="#/"><span class="glyphicon glyphicon-home"></span> Hjem</a> <button type="button" class="navbar-toggle collapsed" aria-expanded="false" ng-click="isCollapsed = !isCollapsed"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button></div><div class="collapse navbar-collapse" collapse="isCollapsed"><ul class="nav navbar-nav"><li><a href="#/oppgaver">Oppgaver</a></li><li><a href="http://github.com/arve0/kompetansemaal">Bidra?</a></li></ul></div></div></nav>'),e.put("app/components/tableRow/tableRow.html","<th>{{header}}</th><td>{{data}}</td>")}]);
//# sourceMappingURL=../maps/scripts/app-8c0ac23234.js.map