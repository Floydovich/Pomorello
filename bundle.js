!function(t){var e={};function r(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(o,n,function(e){return t[e]}.bind(null,n));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){t.exports=r(1)},function(t,e,r){"use strict";r.r(e);const o=6e4,n=6e4,a={refresh:10};function i(t,e){const r=t-e;return`${(Math.floor(r/6e4)%60).toFixed(0).padStart(2,"0")}:${(Math.floor(r/1e3)%60).toFixed(0).padStart(2,"0")}`}function c(t=!0){const e={text:"No Pomodoro Active",color:"yellow"};return t?{...a,...e}:e}function O(t,e=!0){const r={text:`Resting: ${i(n,t)}`,color:"blue"};return e?{...a,...r}:r}function u(t,e){t.popup({title:"Start a Pomodoro",items:[{text:"Plain 25/5",callback:()=>t.set("card","private",{POMORELLO_ACTIVE:!0,POMORELLO_START:Date.now()})}]})}window.TrelloPowerUp.initialize({"card-buttons":async(t,e)=>[{text:"Pomorello",callback:u}],"card-badges":async(t,e)=>[{dynamic:async()=>{const e=await t.get("card","private","POMORELLO_ACTIVE",!1),r=await t.get("card","private","POMORELLO_BREAK",!1),u=await t.get("card","private","POMORELLO_START",0),l=Date.now()-u;return console.log(e,r,u,l),e?l>o?(await async function(t){console.log("Taking a break...");const e=t.get("card","private","POMORELLO_START"),r=t.get("card","private","POMORELLO_SECONDS",0),o=t.get("card","private","POMORELLO_SETS",0),[n,a,i]=await Promise.all([e,r,o]),c=Date.now(),O=Math.ceil((c-n)/1e3)+a;return t.set("card","private",{POMORELLO_ACTIVE:!1,POMORELLO_BREAK:!0,POMORELLO_SECONDS:O,POMORELLO_SETS:i+1,POMORELLO_START:c})}(t),O(l,!0)):function(t,e=!0){const r={text:`Pomodoro Active: ${i(o,t)}`,color:"green"};return e?{...a,...r}:r}(l,!0):r?l>n?(await async function(t){return console.log("Pomodoro finished!"),t.set("card","private",{POMORELLO_ACTIVE:!1,POMORELLO_BREAK:!1,POMORELLO_START:0})}(t),c(!0)):O(l,!0):c(!0)}}]})}]);