!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("dotless",[],t):"object"==typeof exports?exports.dotless=t():n.dotless=t()}("undefined"!=typeof self?self:this,function(){return function(n){var t={};function e(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return n[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}return e.m=n,e.c=t,e.d=function(n,t,o){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:o})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var r in n)e.d(o,r,function(t){return n[t]}.bind(null,r));return o},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=0)}([function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.range=function*(n,t,e=1){let o=n;if(0===e)return;const r=e>0?1:-1;for(;(t-o)*r>=0;)yield o,o+=e},t.map=function(n){return function*(t){for(const e of t)yield n(e)}},t.mapMany=function(n){return function*(t){for(const e of t)yield*n(e)}},t.mapWithLast=function(n,t){return function*(e){let o=t;for(const t of e)o=n(o,t),yield o}},t.filter=function(n){return function*(t){for(const e of t)n(e)&&(yield e)}},t.reduce=function(n,t){return e=>{let o=t,r=0;for(const t of e)o=n(o,t,r++);return o}},t.any=function(n=(n=>!0)){return t=>{for(const e of t)if(n(e))return!0;return!1}},t.first=function(n=(n=>!0)){return t=>{for(const e of t)if(n(e))return e;return null}},t.take=function(n){return function*(t){let e=0;if(!(n<1))for(const o of t)if(yield o,++e===n)break}},t.findPairs=function(n,t=!1){return function*(e){for(let o=0;o<e.length;o++)for(let r=t?0:o+1;r<e.length;r++)r!==o&&n(e[o],e[r])&&(yield[e[o],e[r],o,r])}},t.toArray=Array.from,t.query=function(...n){return n.reduce((n,t)=>t(n))},t.ascendingBy=function(n=(n=>n)){return(t,e)=>{const o=n instanceof Function?n(t):t[n],r=n instanceof Function?n(e):e[n];return o>r?1:o===r?0:-1}},t.descendingBy=function(n=(n=>n)){return(t,e)=>{const o=n instanceof Function?n(t):t[n],r=n instanceof Function?n(e):e[n];return o>r?-1:o===r?0:1}},t.sort=function(...n){const t=(t,e)=>{let o=0;for(const r of n)if(0!==(o=r(t,e)))return o;return o};return n=>n.sort(t)},t.matchesToArray=function(n,t,e=(n=>n)){let o=t.exec(n);const r=[];for(;null!==o;)o.index===t.lastIndex&&t.lastIndex++,r.push(e(o)),o=t.exec(n);return r},t.groupBy=function(n){return t=>{const e={};for(const o of t){const t=(n instanceof Function?n(o):o[n]).toString();e[t]=void 0===e[t]?[]:e[t],e[t].push(o)}return e}},t.countBy=function(n=(n=>n.toString())){return t=>{const e={};for(const o of t){const t=(n instanceof Function?n(o):o[n]).toString();e[t]=(void 0===e[t]?0:e[t])+1}return e}},t.cycle=function*(n){for(;;)yield*n},t.count=function(n=(n=>!0)){return t=>{let e=0;for(const o of t)n(o)&&(e+=1);return e}},t.each=function(n){return function*(t){for(const e of t)n(e),yield e}},t.iterate=function*(n,t){let e=t;for(yield e;;)e=n(e),yield e}}])});