!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("dotless",[],t):"object"==typeof exports?exports.dotless=t():n.dotless=t()}("undefined"!=typeof self?self:this,function(){return function(n){var t={};function e(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var o in n)e.d(r,o,function(t){return n[t]}.bind(null,o));return r},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=0)}([function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.range=function*(n,t,e=1){let r=n;if(0===e)return;const o=e>0?1:-1;for(;(t-r)*o>=0;)yield r,r+=e},t.map=function(n){return function*(t){for(const e of t)yield n(e)}},t.mapMany=function(n){return function*(t){for(const e of t)yield*n(e)}},t.filter=function(n){return function*(t){for(const e of t)n(e)&&(yield e)}},t.reduce=function(n,t){return e=>{let r=t,o=0;for(const t of e)r=n(r,t,o++);return r}},t.any=function(n=(n=>!0)){return t=>{for(const e of t)if(n(e))return!0;return!1}},t.first=function(n=(n=>!0)){return t=>{for(const e of t)if(n(e))return e;return null}},t.take=function(n){return function*(t){let e=0;if(!(n<1))for(const r of t)if(yield r,++e===n)break}},t.findPairs=function(n,t=!1){return function*(e){for(let r=0;r<e.length;r++)for(let o=t?0:r+1;o<e.length;o++)o!==r&&n(e[r],e[o])&&(yield[e[r],e[o],r,o])}},t.toArray=Array.from,t.query=function(...n){return n.reduce((n,t)=>t(n))},t.ascendingBy=function(n=(n=>n)){return(t,e)=>{const r=n instanceof Function?n(t):t[n],o=n instanceof Function?n(e):e[n];return r>o?1:r===o?0:-1}},t.descendingBy=function(n=(n=>n)){return(t,e)=>{const r=n instanceof Function?n(t):t[n],o=n instanceof Function?n(e):e[n];return r>o?-1:r===o?0:1}},t.sort=function(...n){const t=(t,e)=>{let r=0;for(const o of n)if(0!==(r=o(t,e)))return r;return r};return n=>n.sort(t)},t.matchesToArray=function(n,t,e=(n=>n)){let r=t.exec(n);const o=[];for(;null!==r;)r.index===t.lastIndex&&t.lastIndex++,o.push(e(r)),r=t.exec(n);return o},t.groupBy=function(n){return t=>{const e={};for(const r of t){const t=(n instanceof Function?n(r):r[n]).toString();e[t]=e[t]||[],e[t].push(r)}return e}},t.countBy=function(n=(n=>n.toString())){return t=>{const e={};for(const r of t){const t=(n instanceof Function?n(r):r[n]).toString();e[t]=(e[t]||0)+1}return e}}}])});