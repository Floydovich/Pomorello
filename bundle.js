!function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){e.exports=r(1)},function(e,t,r){"use strict";function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.r(t);class n{static info(e){n.level>=1&&n.log(e)}static debug(e){n.level>=2&&n.log(e)}static trace(e){n.level>=3&&n.log(e)}}async function i(e,t,r){return n.trace("Starting new set"),e.set("card","shared",{POMORELLO_ACTIVE:!0,POMORELLO_BREAK:!1,POMORELLO_START:Date.now(),POMORELLO_SET_LENGTH:t,POMORELLO_BREAK_LENGTH:r})}function o(e,t){return e.refresh?{refresh:e.refresh,...t}:t}function s(e){n.debug(`Displaying empty badge for card ${e.name}`);return o(e,{text:"No Pomodoro Active",color:"yellow"})}function c(e){n.debug(`Displaying break badge for card ${e.name}`);const t={text:`Resting: ${e.timeStr()}`,color:"blue"};return o(e,t)}a(n,"level",2),a(n,"log",console.log);class l{constructor(e=10){n.trace(`Constructing new card with refresh ${e}`),this.is_active=!1,this.is_break=!1,this.start_ms=0,this.set_length=15e5,this.break_length=3e5,this.name="?",this.refresh=e}async fetch(e){n.trace("Fetching data");const t=e.card("name");let r=await e.getAll();r=r.card.shared||{},n.trace("Got data"),this.is_active=r.POMORELLO_ACTIVE||this.is_active,this.is_break=r.POMORELLO_BREAK||this.is_break,this.start_ms=r.POMORELLO_START||this.start_ms,this.set_length=r.POMORELLO_SET_LENGTH||this.set_length,this.break_length=r.POMORELLO_BREAK_LENGTH||this.break_length,this.name=(await t).name,n.info(JSON.stringify(this,null,2))}async sync(e){return n.trace(`Syncing card ${this.name}`),e.set("card","shared",{POMORELLO_ACTIVE:this.is_active,POMORELLO_BREAK:this.is_break,POMORELLO_START:this.start_ms,POMORELLO_SET_LENGTH:this.set_length,POMORELLO_BREAK_LENGTH:this.break_length})}age(){return n.trace(`Computing age for card ${this.name}`),Date.now()-this.start_ms}timeStr(){let e;n.trace(`Formatting time for card ${this.name}`),this.is_active?e=this.set_length:this.is_break&&(e=this.break_length);const t=e-this.age();let r=Math.floor(t/1e3);return this.refresh&&(r=this.refresh*Math.ceil(r/this.refresh)),n.trace(`Formatting time for card ${this.name}: ${r} seconds`),`${(Math.floor(r/60)%60).toFixed(0).padStart(2,"0")}:${(r%60).toFixed(0).padStart(2,"0")}`}}function d(e,t){n.trace("Showing dropdown powerup menu"),e.popup({title:"Start a Pomodoro",items:[{text:"Plain 25/5",callback:(e,t)=>i(e,15e5,3e5)},{text:"Debug 1/0.5",callback:(e,t)=>i(e,6e4,3e4)}]})}window.TrelloPowerUp.initialize({"card-buttons":async(e,t)=>[{text:"Pomorello",callback:d}],"card-badges":async(e,t)=>(n.trace("Loading card-badges"),[{dynamic:async()=>{const t=new l;n.debug("State initialized"),await t.fetch(e),n.info(`State retrieved for card ${t.name}`);const r=t.age();return t.is_active?(n.trace("Pomodoro active"),r>t.set_length?(n.trace("Pomodoro expired"),await async function(e,t){return n.trace(`Pomodoro for card ${t.name} finished.`),e.alert({message:`Pomodoro for card ${t.name} complete.\nTime to take a break!`,duration:10,display:"success"}),t.is_active=!1,t.is_break=!0,t.start=Date.now(),t.sync(e)}(e,t),c(t)):(n.trace("Pomodoro in progress"),function(e){n.debug(`Displaying status badge for card ${e.name}`);const t={text:`Pomodoro Active: ${e.timeStr()}`,color:"green"};return o(e,t)}(t))):t.is_break?(n.trace("Break active"),r>t.break_length?(n.trace("Break expired"),await async function(e,t){return n.trace(`Break for card ${t.name} finished.`),e.alert({message:`Break for card ${t.name} has ended!`,duration:10,display:"success"}),t.is_active=!1,t.is_break=!1,t.sync(e)}(e,t),s(t)):(n.trace("Break in progress"),c(t))):(n.trace("No Pomodoro active"),s(t))}}])})}]);