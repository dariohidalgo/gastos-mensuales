import{o as ec}from"./idb-BXWtuYvb.js";var Zs={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wo=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},nc=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],u=n[e++],l=n[e++],h=((s&7)<<18|(o&63)<<12|(u&63)<<6|l&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],u=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|u&63)}}return t.join("")},Ho={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],u=s+1<n.length,l=u?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,m=o>>2,w=(o&3)<<4|l>>4;let R=(l&15)<<2|f>>6,S=f&63;h||(S=64,u||(R=64)),r.push(e[m],e[w],e[R],e[S])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Wo(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):nc(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],l=s<n.length?e[n.charAt(s)]:0;++s;const f=s<n.length?e[n.charAt(s)]:64;++s;const w=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||l==null||f==null||w==null)throw new rc;const R=o<<2|l>>4;if(r.push(R),f!==64){const S=l<<4&240|f>>2;if(r.push(S),w!==64){const b=f<<6&192|w;r.push(b)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class rc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ic=function(n){const t=Wo(n);return Ho.encodeByteArray(t,!0)},Qn=function(n){return ic(n).replace(/\./g,"")},sc=function(n){try{return Ho.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ac=()=>oc().__FIREBASE_DEFAULTS__,uc=()=>{if(typeof process>"u"||typeof Zs>"u")return;const n=Zs.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},cc=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&sc(n[1]);return t&&JSON.parse(t)},ar=()=>{try{return ac()||uc()||cc()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},lc=n=>{var t,e;return(e=(t=ar())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[n]},hc=n=>{const t=lc(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},Qo=()=>{var n;return(n=ar())===null||n===void 0?void 0:n.config},Cf=n=>{var t;return(t=ar())===null||t===void 0?void 0:t[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fc(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const u=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Qn(JSON.stringify(e)),Qn(JSON.stringify(u)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vi(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function bf(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(vi())}function pc(){var n;const t=(n=ar())===null||n===void 0?void 0:n.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Df(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Nf(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function kf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Of(){const n=vi();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function mc(){return!pc()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function gc(){try{return typeof indexedDB=="object"}catch{return!1}}function _c(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yc="FirebaseError";class Ae extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=yc,Object.setPrototypeOf(this,Ae.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Xo.prototype.create)}}class Xo{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],u=o?Ec(o,r):"Error",l=`${this.serviceName}: ${u} (${s}).`;return new Ae(s,l,r)}}function Ec(n,t){return n.replace(vc,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const vc=/\{\$([^}]+)}/g;function xf(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}function ti(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],u=t[s];if(to(o)&&to(u)){if(!ti(o,u))return!1}else if(o!==u)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function to(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mf(n){const t=[];for(const[e,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(s))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function Lf(n,t){const e=new Tc(n,t);return e.subscribe.bind(e)}class Tc{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,r){let s;if(t===void 0&&e===void 0&&r===void 0)throw new Error("Missing Observer.");Ic(t,["next","error","complete"])?s=t:s={next:t,error:e,complete:r},s.next===void 0&&(s.next=Wr),s.error===void 0&&(s.error=Wr),s.complete===void 0&&(s.complete=Wr);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),o}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ic(n,t){if(typeof n!="object"||n===null)return!1;for(const e of t)if(e in n&&typeof n[e]=="function")return!0;return!1}function Wr(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(n){return n&&n._delegate?n._delegate:n}class nn{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ee="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wc{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new dc;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(e=t==null?void 0:t.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Rc(t))try{this.getOrInitializeService({instanceIdentifier:ee})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=ee){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=ee){return this.instances.has(t)}getOptions(t=ee){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,u]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);r===l&&u.resolve(s)}return s}onInit(t,e){var r;const s=this.normalizeInstanceIdentifier(e),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(s,o);const u=this.instances.get(s);return u&&t(u,s),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Ac(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=ee){return this.component?this.component.multipleInstances?t:ee:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ac(n){return n===ee?void 0:n}function Rc(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pc{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new wc(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(q||(q={}));const Vc={debug:q.DEBUG,verbose:q.VERBOSE,info:q.INFO,warn:q.WARN,error:q.ERROR,silent:q.SILENT},Sc=q.INFO,Cc={[q.DEBUG]:"log",[q.VERBOSE]:"log",[q.INFO]:"info",[q.WARN]:"warn",[q.ERROR]:"error"},bc=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=Cc[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Yo{constructor(t){this.name=t,this._logLevel=Sc,this._logHandler=bc,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in q))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Vc[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,q.DEBUG,...t),this._logHandler(this,q.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,q.VERBOSE,...t),this._logHandler(this,q.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,q.INFO,...t),this._logHandler(this,q.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,q.WARN,...t),this._logHandler(this,q.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,q.ERROR,...t),this._logHandler(this,q.ERROR,...t)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Nc(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function Nc(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const ei="@firebase/app",eo="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt=new Yo("@firebase/app"),kc="@firebase/app-compat",Oc="@firebase/analytics-compat",xc="@firebase/analytics",Mc="@firebase/app-check-compat",Lc="@firebase/app-check",Fc="@firebase/auth",Uc="@firebase/auth-compat",Bc="@firebase/database",qc="@firebase/data-connect",jc="@firebase/database-compat",$c="@firebase/functions",zc="@firebase/functions-compat",Gc="@firebase/installations",Kc="@firebase/installations-compat",Wc="@firebase/messaging",Hc="@firebase/messaging-compat",Qc="@firebase/performance",Xc="@firebase/performance-compat",Yc="@firebase/remote-config",Jc="@firebase/remote-config-compat",Zc="@firebase/storage",tl="@firebase/storage-compat",el="@firebase/firestore",nl="@firebase/vertexai-preview",rl="@firebase/firestore-compat",il="firebase",sl="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ni="[DEFAULT]",ol={[ei]:"fire-core",[kc]:"fire-core-compat",[xc]:"fire-analytics",[Oc]:"fire-analytics-compat",[Lc]:"fire-app-check",[Mc]:"fire-app-check-compat",[Fc]:"fire-auth",[Uc]:"fire-auth-compat",[Bc]:"fire-rtdb",[qc]:"fire-data-connect",[jc]:"fire-rtdb-compat",[$c]:"fire-fn",[zc]:"fire-fn-compat",[Gc]:"fire-iid",[Kc]:"fire-iid-compat",[Wc]:"fire-fcm",[Hc]:"fire-fcm-compat",[Qc]:"fire-perf",[Xc]:"fire-perf-compat",[Yc]:"fire-rc",[Jc]:"fire-rc-compat",[Zc]:"fire-gcs",[tl]:"fire-gcs-compat",[el]:"fire-fst",[rl]:"fire-fst-compat",[nl]:"fire-vertex","fire-js":"fire-js",[il]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xn=new Map,al=new Map,ri=new Map;function no(n,t){try{n.container.addComponent(t)}catch(e){xt.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Yn(n){const t=n.name;if(ri.has(t))return xt.debug(`There were multiple attempts to register component ${t}.`),!1;ri.set(t,n);for(const e of Xn.values())no(e,n);for(const e of al.values())no(e,n);return!0}function ul(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function Ff(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cl={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},$t=new Xo("app","Firebase",cl);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ll{constructor(t,e,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new nn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw $t.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hl=sl;function dl(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r=Object.assign({name:ni,automaticDataCollectionEnabled:!1},t),s=r.name;if(typeof s!="string"||!s)throw $t.create("bad-app-name",{appName:String(s)});if(e||(e=Qo()),!e)throw $t.create("no-options");const o=Xn.get(s);if(o){if(ti(e,o.options)&&ti(r,o.config))return o;throw $t.create("duplicate-app",{appName:s})}const u=new Pc(s);for(const h of ri.values())u.addComponent(h);const l=new ll(e,r,u);return Xn.set(s,l),l}function fl(n=ni){const t=Xn.get(n);if(!t&&n===ni&&Qo())return dl();if(!t)throw $t.create("no-app",{appName:n});return t}function Ye(n,t,e){var r;let s=(r=ol[n])!==null&&r!==void 0?r:n;e&&(s+=`-${e}`);const o=s.match(/\s|\//),u=t.match(/\s|\//);if(o||u){const l=[`Unable to register library "${s}" with version "${t}":`];o&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&u&&l.push("and"),u&&l.push(`version name "${t}" contains illegal characters (whitespace or "/")`),xt.warn(l.join(" "));return}Yn(new nn(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pl="firebase-heartbeat-database",ml=1,rn="firebase-heartbeat-store";let Hr=null;function Jo(){return Hr||(Hr=ec(pl,ml,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(rn)}catch(e){console.warn(e)}}}}).catch(n=>{throw $t.create("idb-open",{originalErrorMessage:n.message})})),Hr}async function gl(n){try{const e=(await Jo()).transaction(rn),r=await e.objectStore(rn).get(Zo(n));return await e.done,r}catch(t){if(t instanceof Ae)xt.warn(t.message);else{const e=$t.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});xt.warn(e.message)}}}async function ro(n,t){try{const r=(await Jo()).transaction(rn,"readwrite");await r.objectStore(rn).put(t,Zo(n)),await r.done}catch(e){if(e instanceof Ae)xt.warn(e.message);else{const r=$t.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});xt.warn(r.message)}}}function Zo(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _l=1024,yl=30*24*60*60*1e3;class El{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Tl(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=io();return((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(u=>u.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(u=>{const l=new Date(u.date).valueOf();return Date.now()-l<=yl}),this._storage.overwrite(this._heartbeatsCache))}catch(r){xt.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=io(),{heartbeatsToSend:r,unsentEntries:s}=vl(this._heartbeatsCache.heartbeats),o=Qn(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return xt.warn(e),""}}}function io(){return new Date().toISOString().substring(0,10)}function vl(n,t=_l){const e=[];let r=n.slice();for(const s of n){const o=e.find(u=>u.agent===s.agent);if(o){if(o.dates.push(s.date),so(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),so(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class Tl{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return gc()?_c().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await gl(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return ro(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return ro(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function so(n){return Qn(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Il(n){Yn(new nn("platform-logger",t=>new Dc(t),"PRIVATE")),Yn(new nn("heartbeat",t=>new El(t),"PRIVATE")),Ye(ei,eo,n),Ye(ei,eo,"esm2017"),Ye("fire-js","")}Il("");var oo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var re,ta;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(v,p){function _(){}_.prototype=p.prototype,v.D=p.prototype,v.prototype=new _,v.prototype.constructor=v,v.C=function(y,E,I){for(var g=Array(arguments.length-2),Nt=2;Nt<arguments.length;Nt++)g[Nt-2]=arguments[Nt];return p.prototype[E].apply(y,g)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,e),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(v,p,_){_||(_=0);var y=Array(16);if(typeof p=="string")for(var E=0;16>E;++E)y[E]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(E=0;16>E;++E)y[E]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=v.g[0],_=v.g[1],E=v.g[2];var I=v.g[3],g=p+(I^_&(E^I))+y[0]+3614090360&4294967295;p=_+(g<<7&4294967295|g>>>25),g=I+(E^p&(_^E))+y[1]+3905402710&4294967295,I=p+(g<<12&4294967295|g>>>20),g=E+(_^I&(p^_))+y[2]+606105819&4294967295,E=I+(g<<17&4294967295|g>>>15),g=_+(p^E&(I^p))+y[3]+3250441966&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(I^_&(E^I))+y[4]+4118548399&4294967295,p=_+(g<<7&4294967295|g>>>25),g=I+(E^p&(_^E))+y[5]+1200080426&4294967295,I=p+(g<<12&4294967295|g>>>20),g=E+(_^I&(p^_))+y[6]+2821735955&4294967295,E=I+(g<<17&4294967295|g>>>15),g=_+(p^E&(I^p))+y[7]+4249261313&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(I^_&(E^I))+y[8]+1770035416&4294967295,p=_+(g<<7&4294967295|g>>>25),g=I+(E^p&(_^E))+y[9]+2336552879&4294967295,I=p+(g<<12&4294967295|g>>>20),g=E+(_^I&(p^_))+y[10]+4294925233&4294967295,E=I+(g<<17&4294967295|g>>>15),g=_+(p^E&(I^p))+y[11]+2304563134&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(I^_&(E^I))+y[12]+1804603682&4294967295,p=_+(g<<7&4294967295|g>>>25),g=I+(E^p&(_^E))+y[13]+4254626195&4294967295,I=p+(g<<12&4294967295|g>>>20),g=E+(_^I&(p^_))+y[14]+2792965006&4294967295,E=I+(g<<17&4294967295|g>>>15),g=_+(p^E&(I^p))+y[15]+1236535329&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(E^I&(_^E))+y[1]+4129170786&4294967295,p=_+(g<<5&4294967295|g>>>27),g=I+(_^E&(p^_))+y[6]+3225465664&4294967295,I=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(I^p))+y[11]+643717713&4294967295,E=I+(g<<14&4294967295|g>>>18),g=_+(I^p&(E^I))+y[0]+3921069994&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^I&(_^E))+y[5]+3593408605&4294967295,p=_+(g<<5&4294967295|g>>>27),g=I+(_^E&(p^_))+y[10]+38016083&4294967295,I=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(I^p))+y[15]+3634488961&4294967295,E=I+(g<<14&4294967295|g>>>18),g=_+(I^p&(E^I))+y[4]+3889429448&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^I&(_^E))+y[9]+568446438&4294967295,p=_+(g<<5&4294967295|g>>>27),g=I+(_^E&(p^_))+y[14]+3275163606&4294967295,I=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(I^p))+y[3]+4107603335&4294967295,E=I+(g<<14&4294967295|g>>>18),g=_+(I^p&(E^I))+y[8]+1163531501&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^I&(_^E))+y[13]+2850285829&4294967295,p=_+(g<<5&4294967295|g>>>27),g=I+(_^E&(p^_))+y[2]+4243563512&4294967295,I=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(I^p))+y[7]+1735328473&4294967295,E=I+(g<<14&4294967295|g>>>18),g=_+(I^p&(E^I))+y[12]+2368359562&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(_^E^I)+y[5]+4294588738&4294967295,p=_+(g<<4&4294967295|g>>>28),g=I+(p^_^E)+y[8]+2272392833&4294967295,I=p+(g<<11&4294967295|g>>>21),g=E+(I^p^_)+y[11]+1839030562&4294967295,E=I+(g<<16&4294967295|g>>>16),g=_+(E^I^p)+y[14]+4259657740&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^I)+y[1]+2763975236&4294967295,p=_+(g<<4&4294967295|g>>>28),g=I+(p^_^E)+y[4]+1272893353&4294967295,I=p+(g<<11&4294967295|g>>>21),g=E+(I^p^_)+y[7]+4139469664&4294967295,E=I+(g<<16&4294967295|g>>>16),g=_+(E^I^p)+y[10]+3200236656&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^I)+y[13]+681279174&4294967295,p=_+(g<<4&4294967295|g>>>28),g=I+(p^_^E)+y[0]+3936430074&4294967295,I=p+(g<<11&4294967295|g>>>21),g=E+(I^p^_)+y[3]+3572445317&4294967295,E=I+(g<<16&4294967295|g>>>16),g=_+(E^I^p)+y[6]+76029189&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^I)+y[9]+3654602809&4294967295,p=_+(g<<4&4294967295|g>>>28),g=I+(p^_^E)+y[12]+3873151461&4294967295,I=p+(g<<11&4294967295|g>>>21),g=E+(I^p^_)+y[15]+530742520&4294967295,E=I+(g<<16&4294967295|g>>>16),g=_+(E^I^p)+y[2]+3299628645&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(E^(_|~I))+y[0]+4096336452&4294967295,p=_+(g<<6&4294967295|g>>>26),g=I+(_^(p|~E))+y[7]+1126891415&4294967295,I=p+(g<<10&4294967295|g>>>22),g=E+(p^(I|~_))+y[14]+2878612391&4294967295,E=I+(g<<15&4294967295|g>>>17),g=_+(I^(E|~p))+y[5]+4237533241&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~I))+y[12]+1700485571&4294967295,p=_+(g<<6&4294967295|g>>>26),g=I+(_^(p|~E))+y[3]+2399980690&4294967295,I=p+(g<<10&4294967295|g>>>22),g=E+(p^(I|~_))+y[10]+4293915773&4294967295,E=I+(g<<15&4294967295|g>>>17),g=_+(I^(E|~p))+y[1]+2240044497&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~I))+y[8]+1873313359&4294967295,p=_+(g<<6&4294967295|g>>>26),g=I+(_^(p|~E))+y[15]+4264355552&4294967295,I=p+(g<<10&4294967295|g>>>22),g=E+(p^(I|~_))+y[6]+2734768916&4294967295,E=I+(g<<15&4294967295|g>>>17),g=_+(I^(E|~p))+y[13]+1309151649&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~I))+y[4]+4149444226&4294967295,p=_+(g<<6&4294967295|g>>>26),g=I+(_^(p|~E))+y[11]+3174756917&4294967295,I=p+(g<<10&4294967295|g>>>22),g=E+(p^(I|~_))+y[2]+718787259&4294967295,E=I+(g<<15&4294967295|g>>>17),g=_+(I^(E|~p))+y[9]+3951481745&4294967295,v.g[0]=v.g[0]+p&4294967295,v.g[1]=v.g[1]+(E+(g<<21&4294967295|g>>>11))&4294967295,v.g[2]=v.g[2]+E&4294967295,v.g[3]=v.g[3]+I&4294967295}r.prototype.u=function(v,p){p===void 0&&(p=v.length);for(var _=p-this.blockSize,y=this.B,E=this.h,I=0;I<p;){if(E==0)for(;I<=_;)s(this,v,I),I+=this.blockSize;if(typeof v=="string"){for(;I<p;)if(y[E++]=v.charCodeAt(I++),E==this.blockSize){s(this,y),E=0;break}}else for(;I<p;)if(y[E++]=v[I++],E==this.blockSize){s(this,y),E=0;break}}this.h=E,this.o+=p},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var p=1;p<v.length-8;++p)v[p]=0;var _=8*this.o;for(p=v.length-8;p<v.length;++p)v[p]=_&255,_/=256;for(this.u(v),v=Array(16),p=_=0;4>p;++p)for(var y=0;32>y;y+=8)v[_++]=this.g[p]>>>y&255;return v};function o(v,p){var _=l;return Object.prototype.hasOwnProperty.call(_,v)?_[v]:_[v]=p(v)}function u(v,p){this.h=p;for(var _=[],y=!0,E=v.length-1;0<=E;E--){var I=v[E]|0;y&&I==p||(_[E]=I,y=!1)}this.g=_}var l={};function h(v){return-128<=v&&128>v?o(v,function(p){return new u([p|0],0>p?-1:0)}):new u([v|0],0>v?-1:0)}function f(v){if(isNaN(v)||!isFinite(v))return w;if(0>v)return D(f(-v));for(var p=[],_=1,y=0;v>=_;y++)p[y]=v/_|0,_*=4294967296;return new u(p,0)}function m(v,p){if(v.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(v.charAt(0)=="-")return D(m(v.substring(1),p));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=f(Math.pow(p,8)),y=w,E=0;E<v.length;E+=8){var I=Math.min(8,v.length-E),g=parseInt(v.substring(E,E+I),p);8>I?(I=f(Math.pow(p,I)),y=y.j(I).add(f(g))):(y=y.j(_),y=y.add(f(g)))}return y}var w=h(0),R=h(1),S=h(16777216);n=u.prototype,n.m=function(){if(O(this))return-D(this).m();for(var v=0,p=1,_=0;_<this.g.length;_++){var y=this.i(_);v+=(0<=y?y:4294967296+y)*p,p*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(b(this))return"0";if(O(this))return"-"+D(this).toString(v);for(var p=f(Math.pow(v,6)),_=this,y="";;){var E=rt(_,p).g;_=G(_,E.j(p));var I=((0<_.g.length?_.g[0]:_.h)>>>0).toString(v);if(_=E,b(_))return I+y;for(;6>I.length;)I="0"+I;y=I+y}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function b(v){if(v.h!=0)return!1;for(var p=0;p<v.g.length;p++)if(v.g[p]!=0)return!1;return!0}function O(v){return v.h==-1}n.l=function(v){return v=G(this,v),O(v)?-1:b(v)?0:1};function D(v){for(var p=v.g.length,_=[],y=0;y<p;y++)_[y]=~v.g[y];return new u(_,~v.h).add(R)}n.abs=function(){return O(this)?D(this):this},n.add=function(v){for(var p=Math.max(this.g.length,v.g.length),_=[],y=0,E=0;E<=p;E++){var I=y+(this.i(E)&65535)+(v.i(E)&65535),g=(I>>>16)+(this.i(E)>>>16)+(v.i(E)>>>16);y=g>>>16,I&=65535,g&=65535,_[E]=g<<16|I}return new u(_,_[_.length-1]&-2147483648?-1:0)};function G(v,p){return v.add(D(p))}n.j=function(v){if(b(this)||b(v))return w;if(O(this))return O(v)?D(this).j(D(v)):D(D(this).j(v));if(O(v))return D(this.j(D(v)));if(0>this.l(S)&&0>v.l(S))return f(this.m()*v.m());for(var p=this.g.length+v.g.length,_=[],y=0;y<2*p;y++)_[y]=0;for(y=0;y<this.g.length;y++)for(var E=0;E<v.g.length;E++){var I=this.i(y)>>>16,g=this.i(y)&65535,Nt=v.i(E)>>>16,be=v.i(E)&65535;_[2*y+2*E]+=g*be,K(_,2*y+2*E),_[2*y+2*E+1]+=I*be,K(_,2*y+2*E+1),_[2*y+2*E+1]+=g*Nt,K(_,2*y+2*E+1),_[2*y+2*E+2]+=I*Nt,K(_,2*y+2*E+2)}for(y=0;y<p;y++)_[y]=_[2*y+1]<<16|_[2*y];for(y=p;y<2*p;y++)_[y]=0;return new u(_,0)};function K(v,p){for(;(v[p]&65535)!=v[p];)v[p+1]+=v[p]>>>16,v[p]&=65535,p++}function H(v,p){this.g=v,this.h=p}function rt(v,p){if(b(p))throw Error("division by zero");if(b(v))return new H(w,w);if(O(v))return p=rt(D(v),p),new H(D(p.g),D(p.h));if(O(p))return p=rt(v,D(p)),new H(D(p.g),p.h);if(30<v.g.length){if(O(v)||O(p))throw Error("slowDivide_ only works with positive integers.");for(var _=R,y=p;0>=y.l(v);)_=Dt(_),y=Dt(y);var E=st(_,1),I=st(y,1);for(y=st(y,2),_=st(_,2);!b(y);){var g=I.add(y);0>=g.l(v)&&(E=E.add(_),I=g),y=st(y,1),_=st(_,1)}return p=G(v,E.j(p)),new H(E,p)}for(E=w;0<=v.l(p);){for(_=Math.max(1,Math.floor(v.m()/p.m())),y=Math.ceil(Math.log(_)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),I=f(_),g=I.j(p);O(g)||0<g.l(v);)_-=y,I=f(_),g=I.j(p);b(I)&&(I=R),E=E.add(I),v=G(v,g)}return new H(E,v)}n.A=function(v){return rt(this,v).h},n.and=function(v){for(var p=Math.max(this.g.length,v.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)&v.i(y);return new u(_,this.h&v.h)},n.or=function(v){for(var p=Math.max(this.g.length,v.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)|v.i(y);return new u(_,this.h|v.h)},n.xor=function(v){for(var p=Math.max(this.g.length,v.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)^v.i(y);return new u(_,this.h^v.h)};function Dt(v){for(var p=v.g.length+1,_=[],y=0;y<p;y++)_[y]=v.i(y)<<1|v.i(y-1)>>>31;return new u(_,v.h)}function st(v,p){var _=p>>5;p%=32;for(var y=v.g.length-_,E=[],I=0;I<y;I++)E[I]=0<p?v.i(I+_)>>>p|v.i(I+_+1)<<32-p:v.i(I+_);return new u(E,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,ta=r,u.prototype.add=u.prototype.add,u.prototype.multiply=u.prototype.j,u.prototype.modulo=u.prototype.A,u.prototype.compare=u.prototype.l,u.prototype.toNumber=u.prototype.m,u.prototype.toString=u.prototype.toString,u.prototype.getBits=u.prototype.i,u.fromNumber=f,u.fromString=m,re=u}).apply(typeof oo<"u"?oo:typeof self<"u"?self:typeof window<"u"?window:{});var Un=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ea,He,na,zn,ii,ra,ia,sa;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,a,c){return i==Array.prototype||i==Object.prototype||(i[a]=c.value),i};function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof Un=="object"&&Un];for(var a=0;a<i.length;++a){var c=i[a];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=e(this);function s(i,a){if(a)t:{var c=r;i=i.split(".");for(var d=0;d<i.length-1;d++){var T=i[d];if(!(T in c))break t;c=c[T]}i=i[i.length-1],d=c[i],a=a(d),a!=d&&a!=null&&t(c,i,{configurable:!0,writable:!0,value:a})}}function o(i,a){i instanceof String&&(i+="");var c=0,d=!1,T={next:function(){if(!d&&c<i.length){var A=c++;return{value:a(A,i[A]),done:!1}}return d=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}s("Array.prototype.values",function(i){return i||function(){return o(this,function(a,c){return c})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var u=u||{},l=this||self;function h(i){var a=typeof i;return a=a!="object"?a:i?Array.isArray(i)?"array":a:"null",a=="array"||a=="object"&&typeof i.length=="number"}function f(i){var a=typeof i;return a=="object"&&i!=null||a=="function"}function m(i,a,c){return i.call.apply(i.bind,arguments)}function w(i,a,c){if(!i)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,d),i.apply(a,T)}}return function(){return i.apply(a,arguments)}}function R(i,a,c){return R=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:w,R.apply(null,arguments)}function S(i,a){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();return d.push.apply(d,arguments),i.apply(this,d)}}function b(i,a){function c(){}c.prototype=a.prototype,i.aa=a.prototype,i.prototype=new c,i.prototype.constructor=i,i.Qb=function(d,T,A){for(var C=Array(arguments.length-2),W=2;W<arguments.length;W++)C[W-2]=arguments[W];return a.prototype[T].apply(d,C)}}function O(i){const a=i.length;if(0<a){const c=Array(a);for(let d=0;d<a;d++)c[d]=i[d];return c}return[]}function D(i,a){for(let c=1;c<arguments.length;c++){const d=arguments[c];if(h(d)){const T=i.length||0,A=d.length||0;i.length=T+A;for(let C=0;C<A;C++)i[T+C]=d[C]}else i.push(d)}}class G{constructor(a,c){this.i=a,this.j=c,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function K(i){return/^[\s\xa0]*$/.test(i)}function H(){var i=l.navigator;return i&&(i=i.userAgent)?i:""}function rt(i){return rt[" "](i),i}rt[" "]=function(){};var Dt=H().indexOf("Gecko")!=-1&&!(H().toLowerCase().indexOf("webkit")!=-1&&H().indexOf("Edge")==-1)&&!(H().indexOf("Trident")!=-1||H().indexOf("MSIE")!=-1)&&H().indexOf("Edge")==-1;function st(i,a,c){for(const d in i)a.call(c,i[d],d,i)}function v(i,a){for(const c in i)a.call(void 0,i[c],c,i)}function p(i){const a={};for(const c in i)a[c]=i[c];return a}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(i,a){let c,d;for(let T=1;T<arguments.length;T++){d=arguments[T];for(c in d)i[c]=d[c];for(let A=0;A<_.length;A++)c=_[A],Object.prototype.hasOwnProperty.call(d,c)&&(i[c]=d[c])}}function E(i){var a=1;i=i.split(":");const c=[];for(;0<a&&i.length;)c.push(i.shift()),a--;return i.length&&c.push(i.join(":")),c}function I(i){l.setTimeout(()=>{throw i},0)}function g(){var i=wr;let a=null;return i.g&&(a=i.g,i.g=i.g.next,i.g||(i.h=null),a.next=null),a}class Nt{constructor(){this.h=this.g=null}add(a,c){const d=be.get();d.set(a,c),this.h?this.h.next=d:this.g=d,this.h=d}}var be=new G(()=>new vu,i=>i.reset());class vu{constructor(){this.next=this.g=this.h=null}set(a,c){this.h=a,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let De,Ne=!1,wr=new Nt,Zi=()=>{const i=l.Promise.resolve(void 0);De=()=>{i.then(Tu)}};var Tu=()=>{for(var i;i=g();){try{i.h.call(i.g)}catch(c){I(c)}var a=be;a.j(i),100>a.h&&(a.h++,i.next=a.g,a.g=i)}Ne=!1};function Ft(){this.s=this.s,this.C=this.C}Ft.prototype.s=!1,Ft.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ft.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ht(i,a){this.type=i,this.g=this.target=a,this.defaultPrevented=!1}ht.prototype.h=function(){this.defaultPrevented=!0};var Iu=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var i=!1,a=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const c=()=>{};l.addEventListener("test",c,a),l.removeEventListener("test",c,a)}catch{}return i}();function ke(i,a){if(ht.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var c=this.type=i.type,d=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=a,a=i.relatedTarget){if(Dt){t:{try{rt(a.nodeName);var T=!0;break t}catch{}T=!1}T||(a=null)}}else c=="mouseover"?a=i.fromElement:c=="mouseout"&&(a=i.toElement);this.relatedTarget=a,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:wu[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&ke.aa.h.call(this)}}b(ke,ht);var wu={2:"touch",3:"pen",4:"mouse"};ke.prototype.h=function(){ke.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var vn="closure_listenable_"+(1e6*Math.random()|0),Au=0;function Ru(i,a,c,d,T){this.listener=i,this.proxy=null,this.src=a,this.type=c,this.capture=!!d,this.ha=T,this.key=++Au,this.da=this.fa=!1}function Tn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function In(i){this.src=i,this.g={},this.h=0}In.prototype.add=function(i,a,c,d,T){var A=i.toString();i=this.g[A],i||(i=this.g[A]=[],this.h++);var C=Rr(i,a,d,T);return-1<C?(a=i[C],c||(a.fa=!1)):(a=new Ru(a,this.src,A,!!d,T),a.fa=c,i.push(a)),a};function Ar(i,a){var c=a.type;if(c in i.g){var d=i.g[c],T=Array.prototype.indexOf.call(d,a,void 0),A;(A=0<=T)&&Array.prototype.splice.call(d,T,1),A&&(Tn(a),i.g[c].length==0&&(delete i.g[c],i.h--))}}function Rr(i,a,c,d){for(var T=0;T<i.length;++T){var A=i[T];if(!A.da&&A.listener==a&&A.capture==!!c&&A.ha==d)return T}return-1}var Pr="closure_lm_"+(1e6*Math.random()|0),Vr={};function ts(i,a,c,d,T){if(Array.isArray(a)){for(var A=0;A<a.length;A++)ts(i,a[A],c,d,T);return null}return c=rs(c),i&&i[vn]?i.K(a,c,f(d)?!!d.capture:!!d,T):Pu(i,a,c,!1,d,T)}function Pu(i,a,c,d,T,A){if(!a)throw Error("Invalid event type");var C=f(T)?!!T.capture:!!T,W=Cr(i);if(W||(i[Pr]=W=new In(i)),c=W.add(a,c,d,C,A),c.proxy)return c;if(d=Vu(),c.proxy=d,d.src=i,d.listener=c,i.addEventListener)Iu||(T=C),T===void 0&&(T=!1),i.addEventListener(a.toString(),d,T);else if(i.attachEvent)i.attachEvent(ns(a.toString()),d);else if(i.addListener&&i.removeListener)i.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return c}function Vu(){function i(c){return a.call(i.src,i.listener,c)}const a=Su;return i}function es(i,a,c,d,T){if(Array.isArray(a))for(var A=0;A<a.length;A++)es(i,a[A],c,d,T);else d=f(d)?!!d.capture:!!d,c=rs(c),i&&i[vn]?(i=i.i,a=String(a).toString(),a in i.g&&(A=i.g[a],c=Rr(A,c,d,T),-1<c&&(Tn(A[c]),Array.prototype.splice.call(A,c,1),A.length==0&&(delete i.g[a],i.h--)))):i&&(i=Cr(i))&&(a=i.g[a.toString()],i=-1,a&&(i=Rr(a,c,d,T)),(c=-1<i?a[i]:null)&&Sr(c))}function Sr(i){if(typeof i!="number"&&i&&!i.da){var a=i.src;if(a&&a[vn])Ar(a.i,i);else{var c=i.type,d=i.proxy;a.removeEventListener?a.removeEventListener(c,d,i.capture):a.detachEvent?a.detachEvent(ns(c),d):a.addListener&&a.removeListener&&a.removeListener(d),(c=Cr(a))?(Ar(c,i),c.h==0&&(c.src=null,a[Pr]=null)):Tn(i)}}}function ns(i){return i in Vr?Vr[i]:Vr[i]="on"+i}function Su(i,a){if(i.da)i=!0;else{a=new ke(a,this);var c=i.listener,d=i.ha||i.src;i.fa&&Sr(i),i=c.call(d,a)}return i}function Cr(i){return i=i[Pr],i instanceof In?i:null}var br="__closure_events_fn_"+(1e9*Math.random()>>>0);function rs(i){return typeof i=="function"?i:(i[br]||(i[br]=function(a){return i.handleEvent(a)}),i[br])}function dt(){Ft.call(this),this.i=new In(this),this.M=this,this.F=null}b(dt,Ft),dt.prototype[vn]=!0,dt.prototype.removeEventListener=function(i,a,c,d){es(this,i,a,c,d)};function yt(i,a){var c,d=i.F;if(d)for(c=[];d;d=d.F)c.push(d);if(i=i.M,d=a.type||a,typeof a=="string")a=new ht(a,i);else if(a instanceof ht)a.target=a.target||i;else{var T=a;a=new ht(d,i),y(a,T)}if(T=!0,c)for(var A=c.length-1;0<=A;A--){var C=a.g=c[A];T=wn(C,d,!0,a)&&T}if(C=a.g=i,T=wn(C,d,!0,a)&&T,T=wn(C,d,!1,a)&&T,c)for(A=0;A<c.length;A++)C=a.g=c[A],T=wn(C,d,!1,a)&&T}dt.prototype.N=function(){if(dt.aa.N.call(this),this.i){var i=this.i,a;for(a in i.g){for(var c=i.g[a],d=0;d<c.length;d++)Tn(c[d]);delete i.g[a],i.h--}}this.F=null},dt.prototype.K=function(i,a,c,d){return this.i.add(String(i),a,!1,c,d)},dt.prototype.L=function(i,a,c,d){return this.i.add(String(i),a,!0,c,d)};function wn(i,a,c,d){if(a=i.i.g[String(a)],!a)return!0;a=a.concat();for(var T=!0,A=0;A<a.length;++A){var C=a[A];if(C&&!C.da&&C.capture==c){var W=C.listener,ot=C.ha||C.src;C.fa&&Ar(i.i,C),T=W.call(ot,d)!==!1&&T}}return T&&!d.defaultPrevented}function is(i,a,c){if(typeof i=="function")c&&(i=R(i,c));else if(i&&typeof i.handleEvent=="function")i=R(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:l.setTimeout(i,a||0)}function ss(i){i.g=is(()=>{i.g=null,i.i&&(i.i=!1,ss(i))},i.l);const a=i.h;i.h=null,i.m.apply(null,a)}class Cu extends Ft{constructor(a,c){super(),this.m=a,this.l=c,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:ss(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Oe(i){Ft.call(this),this.h=i,this.g={}}b(Oe,Ft);var os=[];function as(i){st(i.g,function(a,c){this.g.hasOwnProperty(c)&&Sr(a)},i),i.g={}}Oe.prototype.N=function(){Oe.aa.N.call(this),as(this)},Oe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Dr=l.JSON.stringify,bu=l.JSON.parse,Du=class{stringify(i){return l.JSON.stringify(i,void 0)}parse(i){return l.JSON.parse(i,void 0)}};function Nr(){}Nr.prototype.h=null;function us(i){return i.h||(i.h=i.i())}function cs(){}var xe={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function kr(){ht.call(this,"d")}b(kr,ht);function Or(){ht.call(this,"c")}b(Or,ht);var Yt={},ls=null;function An(){return ls=ls||new dt}Yt.La="serverreachability";function hs(i){ht.call(this,Yt.La,i)}b(hs,ht);function Me(i){const a=An();yt(a,new hs(a))}Yt.STAT_EVENT="statevent";function ds(i,a){ht.call(this,Yt.STAT_EVENT,i),this.stat=a}b(ds,ht);function Et(i){const a=An();yt(a,new ds(a,i))}Yt.Ma="timingevent";function fs(i,a){ht.call(this,Yt.Ma,i),this.size=a}b(fs,ht);function Le(i,a){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){i()},a)}function Fe(){this.g=!0}Fe.prototype.xa=function(){this.g=!1};function Nu(i,a,c,d,T,A){i.info(function(){if(i.g)if(A)for(var C="",W=A.split("&"),ot=0;ot<W.length;ot++){var j=W[ot].split("=");if(1<j.length){var ft=j[0];j=j[1];var pt=ft.split("_");C=2<=pt.length&&pt[1]=="type"?C+(ft+"="+j+"&"):C+(ft+"=redacted&")}}else C=null;else C=A;return"XMLHTTP REQ ("+d+") [attempt "+T+"]: "+a+`
`+c+`
`+C})}function ku(i,a,c,d,T,A,C){i.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+T+"]: "+a+`
`+c+`
`+A+" "+C})}function ce(i,a,c,d){i.info(function(){return"XMLHTTP TEXT ("+a+"): "+xu(i,c)+(d?" "+d:"")})}function Ou(i,a){i.info(function(){return"TIMEOUT: "+a})}Fe.prototype.info=function(){};function xu(i,a){if(!i.g)return a;if(!a)return null;try{var c=JSON.parse(a);if(c){for(i=0;i<c.length;i++)if(Array.isArray(c[i])){var d=c[i];if(!(2>d.length)){var T=d[1];if(Array.isArray(T)&&!(1>T.length)){var A=T[0];if(A!="noop"&&A!="stop"&&A!="close")for(var C=1;C<T.length;C++)T[C]=""}}}}return Dr(c)}catch{return a}}var Rn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},ps={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},xr;function Pn(){}b(Pn,Nr),Pn.prototype.g=function(){return new XMLHttpRequest},Pn.prototype.i=function(){return{}},xr=new Pn;function Ut(i,a,c,d){this.j=i,this.i=a,this.l=c,this.R=d||1,this.U=new Oe(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new ms}function ms(){this.i=null,this.g="",this.h=!1}var gs={},Mr={};function Lr(i,a,c){i.L=1,i.v=bn(kt(a)),i.m=c,i.P=!0,_s(i,null)}function _s(i,a){i.F=Date.now(),Vn(i),i.A=kt(i.v);var c=i.A,d=i.R;Array.isArray(d)||(d=[String(d)]),Ds(c.i,"t",d),i.C=0,c=i.j.J,i.h=new ms,i.g=Qs(i.j,c?a:null,!i.m),0<i.O&&(i.M=new Cu(R(i.Y,i,i.g),i.O)),a=i.U,c=i.g,d=i.ca;var T="readystatechange";Array.isArray(T)||(T&&(os[0]=T.toString()),T=os);for(var A=0;A<T.length;A++){var C=ts(c,T[A],d||a.handleEvent,!1,a.h||a);if(!C)break;a.g[C.key]=C}a=i.H?p(i.H):{},i.m?(i.u||(i.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,a)):(i.u="GET",i.g.ea(i.A,i.u,null,a)),Me(),Nu(i.i,i.u,i.A,i.l,i.R,i.m)}Ut.prototype.ca=function(i){i=i.target;const a=this.M;a&&Ot(i)==3?a.j():this.Y(i)},Ut.prototype.Y=function(i){try{if(i==this.g)t:{const pt=Ot(this.g);var a=this.g.Ba();const de=this.g.Z();if(!(3>pt)&&(pt!=3||this.g&&(this.h.h||this.g.oa()||Fs(this.g)))){this.J||pt!=4||a==7||(a==8||0>=de?Me(3):Me(2)),Fr(this);var c=this.g.Z();this.X=c;e:if(ys(this)){var d=Fs(this.g);i="";var T=d.length,A=Ot(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Jt(this),Ue(this);var C="";break e}this.h.i=new l.TextDecoder}for(a=0;a<T;a++)this.h.h=!0,i+=this.h.i.decode(d[a],{stream:!(A&&a==T-1)});d.length=0,this.h.g+=i,this.C=0,C=this.h.g}else C=this.g.oa();if(this.o=c==200,ku(this.i,this.u,this.A,this.l,this.R,pt,c),this.o){if(this.T&&!this.K){e:{if(this.g){var W,ot=this.g;if((W=ot.g?ot.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!K(W)){var j=W;break e}}j=null}if(c=j)ce(this.i,this.l,c,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ur(this,c);else{this.o=!1,this.s=3,Et(12),Jt(this),Ue(this);break t}}if(this.P){c=!0;let Rt;for(;!this.J&&this.C<C.length;)if(Rt=Mu(this,C),Rt==Mr){pt==4&&(this.s=4,Et(14),c=!1),ce(this.i,this.l,null,"[Incomplete Response]");break}else if(Rt==gs){this.s=4,Et(15),ce(this.i,this.l,C,"[Invalid Chunk]"),c=!1;break}else ce(this.i,this.l,Rt,null),Ur(this,Rt);if(ys(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),pt!=4||C.length!=0||this.h.h||(this.s=1,Et(16),c=!1),this.o=this.o&&c,!c)ce(this.i,this.l,C,"[Invalid Chunked Response]"),Jt(this),Ue(this);else if(0<C.length&&!this.W){this.W=!0;var ft=this.j;ft.g==this&&ft.ba&&!ft.M&&(ft.j.info("Great, no buffering proxy detected. Bytes received: "+C.length),Gr(ft),ft.M=!0,Et(11))}}else ce(this.i,this.l,C,null),Ur(this,C);pt==4&&Jt(this),this.o&&!this.J&&(pt==4?Gs(this.j,this):(this.o=!1,Vn(this)))}else Zu(this.g),c==400&&0<C.indexOf("Unknown SID")?(this.s=3,Et(12)):(this.s=0,Et(13)),Jt(this),Ue(this)}}}catch{}finally{}};function ys(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function Mu(i,a){var c=i.C,d=a.indexOf(`
`,c);return d==-1?Mr:(c=Number(a.substring(c,d)),isNaN(c)?gs:(d+=1,d+c>a.length?Mr:(a=a.slice(d,d+c),i.C=d+c,a)))}Ut.prototype.cancel=function(){this.J=!0,Jt(this)};function Vn(i){i.S=Date.now()+i.I,Es(i,i.I)}function Es(i,a){if(i.B!=null)throw Error("WatchDog timer not null");i.B=Le(R(i.ba,i),a)}function Fr(i){i.B&&(l.clearTimeout(i.B),i.B=null)}Ut.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(Ou(this.i,this.A),this.L!=2&&(Me(),Et(17)),Jt(this),this.s=2,Ue(this)):Es(this,this.S-i)};function Ue(i){i.j.G==0||i.J||Gs(i.j,i)}function Jt(i){Fr(i);var a=i.M;a&&typeof a.ma=="function"&&a.ma(),i.M=null,as(i.U),i.g&&(a=i.g,i.g=null,a.abort(),a.ma())}function Ur(i,a){try{var c=i.j;if(c.G!=0&&(c.g==i||Br(c.h,i))){if(!i.K&&Br(c.h,i)&&c.G==3){try{var d=c.Da.g.parse(a)}catch{d=null}if(Array.isArray(d)&&d.length==3){var T=d;if(T[0]==0){t:if(!c.u){if(c.g)if(c.g.F+3e3<i.F)Mn(c),On(c);else break t;zr(c),Et(18)}}else c.za=T[1],0<c.za-c.T&&37500>T[2]&&c.F&&c.v==0&&!c.C&&(c.C=Le(R(c.Za,c),6e3));if(1>=Is(c.h)&&c.ca){try{c.ca()}catch{}c.ca=void 0}}else te(c,11)}else if((i.K||c.g==i)&&Mn(c),!K(a))for(T=c.Da.g.parse(a),a=0;a<T.length;a++){let j=T[a];if(c.T=j[0],j=j[1],c.G==2)if(j[0]=="c"){c.K=j[1],c.ia=j[2];const ft=j[3];ft!=null&&(c.la=ft,c.j.info("VER="+c.la));const pt=j[4];pt!=null&&(c.Aa=pt,c.j.info("SVER="+c.Aa));const de=j[5];de!=null&&typeof de=="number"&&0<de&&(d=1.5*de,c.L=d,c.j.info("backChannelRequestTimeoutMs_="+d)),d=c;const Rt=i.g;if(Rt){const Fn=Rt.g?Rt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Fn){var A=d.h;A.g||Fn.indexOf("spdy")==-1&&Fn.indexOf("quic")==-1&&Fn.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(qr(A,A.h),A.h=null))}if(d.D){const Kr=Rt.g?Rt.g.getResponseHeader("X-HTTP-Session-Id"):null;Kr&&(d.ya=Kr,Q(d.I,d.D,Kr))}}c.G=3,c.l&&c.l.ua(),c.ba&&(c.R=Date.now()-i.F,c.j.info("Handshake RTT: "+c.R+"ms")),d=c;var C=i;if(d.qa=Hs(d,d.J?d.ia:null,d.W),C.K){ws(d.h,C);var W=C,ot=d.L;ot&&(W.I=ot),W.B&&(Fr(W),Vn(W)),d.g=C}else $s(d);0<c.i.length&&xn(c)}else j[0]!="stop"&&j[0]!="close"||te(c,7);else c.G==3&&(j[0]=="stop"||j[0]=="close"?j[0]=="stop"?te(c,7):$r(c):j[0]!="noop"&&c.l&&c.l.ta(j),c.v=0)}}Me(4)}catch{}}var Lu=class{constructor(i,a){this.g=i,this.map=a}};function vs(i){this.l=i||10,l.PerformanceNavigationTiming?(i=l.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ts(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Is(i){return i.h?1:i.g?i.g.size:0}function Br(i,a){return i.h?i.h==a:i.g?i.g.has(a):!1}function qr(i,a){i.g?i.g.add(a):i.h=a}function ws(i,a){i.h&&i.h==a?i.h=null:i.g&&i.g.has(a)&&i.g.delete(a)}vs.prototype.cancel=function(){if(this.i=As(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function As(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let a=i.i;for(const c of i.g.values())a=a.concat(c.D);return a}return O(i.i)}function Fu(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(h(i)){for(var a=[],c=i.length,d=0;d<c;d++)a.push(i[d]);return a}a=[],c=0;for(d in i)a[c++]=i[d];return a}function Uu(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(h(i)||typeof i=="string"){var a=[];i=i.length;for(var c=0;c<i;c++)a.push(c);return a}a=[],c=0;for(const d in i)a[c++]=d;return a}}}function Rs(i,a){if(i.forEach&&typeof i.forEach=="function")i.forEach(a,void 0);else if(h(i)||typeof i=="string")Array.prototype.forEach.call(i,a,void 0);else for(var c=Uu(i),d=Fu(i),T=d.length,A=0;A<T;A++)a.call(void 0,d[A],c&&c[A],i)}var Ps=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Bu(i,a){if(i){i=i.split("&");for(var c=0;c<i.length;c++){var d=i[c].indexOf("="),T=null;if(0<=d){var A=i[c].substring(0,d);T=i[c].substring(d+1)}else A=i[c];a(A,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function Zt(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof Zt){this.h=i.h,Sn(this,i.j),this.o=i.o,this.g=i.g,Cn(this,i.s),this.l=i.l;var a=i.i,c=new je;c.i=a.i,a.g&&(c.g=new Map(a.g),c.h=a.h),Vs(this,c),this.m=i.m}else i&&(a=String(i).match(Ps))?(this.h=!1,Sn(this,a[1]||"",!0),this.o=Be(a[2]||""),this.g=Be(a[3]||"",!0),Cn(this,a[4]),this.l=Be(a[5]||"",!0),Vs(this,a[6]||"",!0),this.m=Be(a[7]||"")):(this.h=!1,this.i=new je(null,this.h))}Zt.prototype.toString=function(){var i=[],a=this.j;a&&i.push(qe(a,Ss,!0),":");var c=this.g;return(c||a=="file")&&(i.push("//"),(a=this.o)&&i.push(qe(a,Ss,!0),"@"),i.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.s,c!=null&&i.push(":",String(c))),(c=this.l)&&(this.g&&c.charAt(0)!="/"&&i.push("/"),i.push(qe(c,c.charAt(0)=="/"?$u:ju,!0))),(c=this.i.toString())&&i.push("?",c),(c=this.m)&&i.push("#",qe(c,Gu)),i.join("")};function kt(i){return new Zt(i)}function Sn(i,a,c){i.j=c?Be(a,!0):a,i.j&&(i.j=i.j.replace(/:$/,""))}function Cn(i,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);i.s=a}else i.s=null}function Vs(i,a,c){a instanceof je?(i.i=a,Ku(i.i,i.h)):(c||(a=qe(a,zu)),i.i=new je(a,i.h))}function Q(i,a,c){i.i.set(a,c)}function bn(i){return Q(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function Be(i,a){return i?a?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function qe(i,a,c){return typeof i=="string"?(i=encodeURI(i).replace(a,qu),c&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function qu(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Ss=/[#\/\?@]/g,ju=/[#\?:]/g,$u=/[#\?]/g,zu=/[#\?@]/g,Gu=/#/g;function je(i,a){this.h=this.g=null,this.i=i||null,this.j=!!a}function Bt(i){i.g||(i.g=new Map,i.h=0,i.i&&Bu(i.i,function(a,c){i.add(decodeURIComponent(a.replace(/\+/g," ")),c)}))}n=je.prototype,n.add=function(i,a){Bt(this),this.i=null,i=le(this,i);var c=this.g.get(i);return c||this.g.set(i,c=[]),c.push(a),this.h+=1,this};function Cs(i,a){Bt(i),a=le(i,a),i.g.has(a)&&(i.i=null,i.h-=i.g.get(a).length,i.g.delete(a))}function bs(i,a){return Bt(i),a=le(i,a),i.g.has(a)}n.forEach=function(i,a){Bt(this),this.g.forEach(function(c,d){c.forEach(function(T){i.call(a,T,d,this)},this)},this)},n.na=function(){Bt(this);const i=Array.from(this.g.values()),a=Array.from(this.g.keys()),c=[];for(let d=0;d<a.length;d++){const T=i[d];for(let A=0;A<T.length;A++)c.push(a[d])}return c},n.V=function(i){Bt(this);let a=[];if(typeof i=="string")bs(this,i)&&(a=a.concat(this.g.get(le(this,i))));else{i=Array.from(this.g.values());for(let c=0;c<i.length;c++)a=a.concat(i[c])}return a},n.set=function(i,a){return Bt(this),this.i=null,i=le(this,i),bs(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[a]),this.h+=1,this},n.get=function(i,a){return i?(i=this.V(i),0<i.length?String(i[0]):a):a};function Ds(i,a,c){Cs(i,a),0<c.length&&(i.i=null,i.g.set(le(i,a),O(c)),i.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],a=Array.from(this.g.keys());for(var c=0;c<a.length;c++){var d=a[c];const A=encodeURIComponent(String(d)),C=this.V(d);for(d=0;d<C.length;d++){var T=A;C[d]!==""&&(T+="="+encodeURIComponent(String(C[d]))),i.push(T)}}return this.i=i.join("&")};function le(i,a){return a=String(a),i.j&&(a=a.toLowerCase()),a}function Ku(i,a){a&&!i.j&&(Bt(i),i.i=null,i.g.forEach(function(c,d){var T=d.toLowerCase();d!=T&&(Cs(this,d),Ds(this,T,c))},i)),i.j=a}function Wu(i,a){const c=new Fe;if(l.Image){const d=new Image;d.onload=S(qt,c,"TestLoadImage: loaded",!0,a,d),d.onerror=S(qt,c,"TestLoadImage: error",!1,a,d),d.onabort=S(qt,c,"TestLoadImage: abort",!1,a,d),d.ontimeout=S(qt,c,"TestLoadImage: timeout",!1,a,d),l.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=i}else a(!1)}function Hu(i,a){const c=new Fe,d=new AbortController,T=setTimeout(()=>{d.abort(),qt(c,"TestPingServer: timeout",!1,a)},1e4);fetch(i,{signal:d.signal}).then(A=>{clearTimeout(T),A.ok?qt(c,"TestPingServer: ok",!0,a):qt(c,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(T),qt(c,"TestPingServer: error",!1,a)})}function qt(i,a,c,d,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),d(c)}catch{}}function Qu(){this.g=new Du}function Xu(i,a,c){const d=c||"";try{Rs(i,function(T,A){let C=T;f(T)&&(C=Dr(T)),a.push(d+A+"="+encodeURIComponent(C))})}catch(T){throw a.push(d+"type="+encodeURIComponent("_badmap")),T}}function Dn(i){this.l=i.Ub||null,this.j=i.eb||!1}b(Dn,Nr),Dn.prototype.g=function(){return new Nn(this.l,this.j)},Dn.prototype.i=function(i){return function(){return i}}({});function Nn(i,a){dt.call(this),this.D=i,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}b(Nn,dt),n=Nn.prototype,n.open=function(i,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=a,this.readyState=1,ze(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(a.body=i),(this.D||l).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,$e(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,ze(this)),this.g&&(this.readyState=3,ze(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ns(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ns(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var a=i.value?i.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!i.done}))&&(this.response=this.responseText+=a)}i.done?$e(this):ze(this),this.readyState==3&&Ns(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,$e(this))},n.Qa=function(i){this.g&&(this.response=i,$e(this))},n.ga=function(){this.g&&$e(this)};function $e(i){i.readyState=4,i.l=null,i.j=null,i.v=null,ze(i)}n.setRequestHeader=function(i,a){this.u.append(i,a)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],a=this.h.entries();for(var c=a.next();!c.done;)c=c.value,i.push(c[0]+": "+c[1]),c=a.next();return i.join(`\r
`)};function ze(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Nn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function ks(i){let a="";return st(i,function(c,d){a+=d,a+=":",a+=c,a+=`\r
`}),a}function jr(i,a,c){t:{for(d in c){var d=!1;break t}d=!0}d||(c=ks(c),typeof i=="string"?c!=null&&encodeURIComponent(String(c)):Q(i,a,c))}function J(i){dt.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}b(J,dt);var Yu=/^https?$/i,Ju=["POST","PUT"];n=J.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,a,c,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);a=a?a.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():xr.g(),this.v=this.o?us(this.o):us(xr),this.g.onreadystatechange=R(this.Ea,this);try{this.B=!0,this.g.open(a,String(i),!0),this.B=!1}catch(A){Os(this,A);return}if(i=c||"",c=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var T in d)c.set(T,d[T]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const A of d.keys())c.set(A,d.get(A));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(c.keys()).find(A=>A.toLowerCase()=="content-type"),T=l.FormData&&i instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Ju,a,void 0))||d||T||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,C]of c)this.g.setRequestHeader(A,C);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ls(this),this.u=!0,this.g.send(i),this.u=!1}catch(A){Os(this,A)}};function Os(i,a){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=a,i.m=5,xs(i),kn(i)}function xs(i){i.A||(i.A=!0,yt(i,"complete"),yt(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,yt(this,"complete"),yt(this,"abort"),kn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),kn(this,!0)),J.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Ms(this):this.bb())},n.bb=function(){Ms(this)};function Ms(i){if(i.h&&typeof u<"u"&&(!i.v[1]||Ot(i)!=4||i.Z()!=2)){if(i.u&&Ot(i)==4)is(i.Ea,0,i);else if(yt(i,"readystatechange"),Ot(i)==4){i.h=!1;try{const C=i.Z();t:switch(C){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break t;default:a=!1}var c;if(!(c=a)){var d;if(d=C===0){var T=String(i.D).match(Ps)[1]||null;!T&&l.self&&l.self.location&&(T=l.self.location.protocol.slice(0,-1)),d=!Yu.test(T?T.toLowerCase():"")}c=d}if(c)yt(i,"complete"),yt(i,"success");else{i.m=6;try{var A=2<Ot(i)?i.g.statusText:""}catch{A=""}i.l=A+" ["+i.Z()+"]",xs(i)}}finally{kn(i)}}}}function kn(i,a){if(i.g){Ls(i);const c=i.g,d=i.v[0]?()=>{}:null;i.g=null,i.v=null,a||yt(i,"ready");try{c.onreadystatechange=d}catch{}}}function Ls(i){i.I&&(l.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function Ot(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<Ot(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var a=this.g.responseText;return i&&a.indexOf(i)==0&&(a=a.substring(i.length)),bu(a)}};function Fs(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Zu(i){const a={};i=(i.g&&2<=Ot(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<i.length;d++){if(K(i[d]))continue;var c=E(i[d]);const T=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const A=a[T]||[];a[T]=A,A.push(c)}v(a,function(d){return d.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ge(i,a,c){return c&&c.internalChannelParams&&c.internalChannelParams[i]||a}function Us(i){this.Aa=0,this.i=[],this.j=new Fe,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ge("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ge("baseRetryDelayMs",5e3,i),this.cb=Ge("retryDelaySeedMs",1e4,i),this.Wa=Ge("forwardChannelMaxRetries",2,i),this.wa=Ge("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new vs(i&&i.concurrentRequestLimit),this.Da=new Qu,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Us.prototype,n.la=8,n.G=1,n.connect=function(i,a,c,d){Et(0),this.W=i,this.H=a||{},c&&d!==void 0&&(this.H.OSID=c,this.H.OAID=d),this.F=this.X,this.I=Hs(this,null,this.W),xn(this)};function $r(i){if(Bs(i),i.G==3){var a=i.U++,c=kt(i.I);if(Q(c,"SID",i.K),Q(c,"RID",a),Q(c,"TYPE","terminate"),Ke(i,c),a=new Ut(i,i.j,a),a.L=2,a.v=bn(kt(c)),c=!1,l.navigator&&l.navigator.sendBeacon)try{c=l.navigator.sendBeacon(a.v.toString(),"")}catch{}!c&&l.Image&&(new Image().src=a.v,c=!0),c||(a.g=Qs(a.j,null),a.g.ea(a.v)),a.F=Date.now(),Vn(a)}Ws(i)}function On(i){i.g&&(Gr(i),i.g.cancel(),i.g=null)}function Bs(i){On(i),i.u&&(l.clearTimeout(i.u),i.u=null),Mn(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&l.clearTimeout(i.s),i.s=null)}function xn(i){if(!Ts(i.h)&&!i.s){i.s=!0;var a=i.Ga;De||Zi(),Ne||(De(),Ne=!0),wr.add(a,i),i.B=0}}function tc(i,a){return Is(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=a.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=Le(R(i.Ga,i,a),Ks(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const T=new Ut(this,this.j,i);let A=this.o;if(this.S&&(A?(A=p(A),y(A,this.S)):A=this.S),this.m!==null||this.O||(T.H=A,A=null),this.P)t:{for(var a=0,c=0;c<this.i.length;c++){e:{var d=this.i[c];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(a+=d,4096<a){a=c;break t}if(a===4096||c===this.i.length-1){a=c+1;break t}}a=1e3}else a=1e3;a=js(this,T,a),c=kt(this.I),Q(c,"RID",i),Q(c,"CVER",22),this.D&&Q(c,"X-HTTP-Session-Id",this.D),Ke(this,c),A&&(this.O?a="headers="+encodeURIComponent(String(ks(A)))+"&"+a:this.m&&jr(c,this.m,A)),qr(this.h,T),this.Ua&&Q(c,"TYPE","init"),this.P?(Q(c,"$req",a),Q(c,"SID","null"),T.T=!0,Lr(T,c,null)):Lr(T,c,a),this.G=2}}else this.G==3&&(i?qs(this,i):this.i.length==0||Ts(this.h)||qs(this))};function qs(i,a){var c;a?c=a.l:c=i.U++;const d=kt(i.I);Q(d,"SID",i.K),Q(d,"RID",c),Q(d,"AID",i.T),Ke(i,d),i.m&&i.o&&jr(d,i.m,i.o),c=new Ut(i,i.j,c,i.B+1),i.m===null&&(c.H=i.o),a&&(i.i=a.D.concat(i.i)),a=js(i,c,1e3),c.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),qr(i.h,c),Lr(c,d,a)}function Ke(i,a){i.H&&st(i.H,function(c,d){Q(a,d,c)}),i.l&&Rs({},function(c,d){Q(a,d,c)})}function js(i,a,c){c=Math.min(i.i.length,c);var d=i.l?R(i.l.Na,i.l,i):null;t:{var T=i.i;let A=-1;for(;;){const C=["count="+c];A==-1?0<c?(A=T[0].g,C.push("ofs="+A)):A=0:C.push("ofs="+A);let W=!0;for(let ot=0;ot<c;ot++){let j=T[ot].g;const ft=T[ot].map;if(j-=A,0>j)A=Math.max(0,T[ot].g-100),W=!1;else try{Xu(ft,C,"req"+j+"_")}catch{d&&d(ft)}}if(W){d=C.join("&");break t}}}return i=i.i.splice(0,c),a.D=i,d}function $s(i){if(!i.g&&!i.u){i.Y=1;var a=i.Fa;De||Zi(),Ne||(De(),Ne=!0),wr.add(a,i),i.v=0}}function zr(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=Le(R(i.Fa,i),Ks(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,zs(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=Le(R(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Et(10),On(this),zs(this))};function Gr(i){i.A!=null&&(l.clearTimeout(i.A),i.A=null)}function zs(i){i.g=new Ut(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var a=kt(i.qa);Q(a,"RID","rpc"),Q(a,"SID",i.K),Q(a,"AID",i.T),Q(a,"CI",i.F?"0":"1"),!i.F&&i.ja&&Q(a,"TO",i.ja),Q(a,"TYPE","xmlhttp"),Ke(i,a),i.m&&i.o&&jr(a,i.m,i.o),i.L&&(i.g.I=i.L);var c=i.g;i=i.ia,c.L=1,c.v=bn(kt(a)),c.m=null,c.P=!0,_s(c,i)}n.Za=function(){this.C!=null&&(this.C=null,On(this),zr(this),Et(19))};function Mn(i){i.C!=null&&(l.clearTimeout(i.C),i.C=null)}function Gs(i,a){var c=null;if(i.g==a){Mn(i),Gr(i),i.g=null;var d=2}else if(Br(i.h,a))c=a.D,ws(i.h,a),d=1;else return;if(i.G!=0){if(a.o)if(d==1){c=a.m?a.m.length:0,a=Date.now()-a.F;var T=i.B;d=An(),yt(d,new fs(d,c)),xn(i)}else $s(i);else if(T=a.s,T==3||T==0&&0<a.X||!(d==1&&tc(i,a)||d==2&&zr(i)))switch(c&&0<c.length&&(a=i.h,a.i=a.i.concat(c)),T){case 1:te(i,5);break;case 4:te(i,10);break;case 3:te(i,6);break;default:te(i,2)}}}function Ks(i,a){let c=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(c*=2),c*a}function te(i,a){if(i.j.info("Error code "+a),a==2){var c=R(i.fb,i),d=i.Xa;const T=!d;d=new Zt(d||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Sn(d,"https"),bn(d),T?Wu(d.toString(),c):Hu(d.toString(),c)}else Et(2);i.G=0,i.l&&i.l.sa(a),Ws(i),Bs(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),Et(2)):(this.j.info("Failed to ping google.com"),Et(1))};function Ws(i){if(i.G=0,i.ka=[],i.l){const a=As(i.h);(a.length!=0||i.i.length!=0)&&(D(i.ka,a),D(i.ka,i.i),i.h.i.length=0,O(i.i),i.i.length=0),i.l.ra()}}function Hs(i,a,c){var d=c instanceof Zt?kt(c):new Zt(c);if(d.g!="")a&&(d.g=a+"."+d.g),Cn(d,d.s);else{var T=l.location;d=T.protocol,a=a?a+"."+T.hostname:T.hostname,T=+T.port;var A=new Zt(null);d&&Sn(A,d),a&&(A.g=a),T&&Cn(A,T),c&&(A.l=c),d=A}return c=i.D,a=i.ya,c&&a&&Q(d,c,a),Q(d,"VER",i.la),Ke(i,d),d}function Qs(i,a,c){if(a&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=i.Ca&&!i.pa?new J(new Dn({eb:c})):new J(i.pa),a.Ha(i.J),a}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Xs(){}n=Xs.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Ln(){}Ln.prototype.g=function(i,a){return new It(i,a)};function It(i,a){dt.call(this),this.g=new Us(a),this.l=i,this.h=a&&a.messageUrlParams||null,i=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(i?i["X-WebChannel-Content-Type"]=a.messageContentType:i={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(i?i["X-WebChannel-Client-Profile"]=a.va:i={"X-WebChannel-Client-Profile":a.va}),this.g.S=i,(i=a&&a.Sb)&&!K(i)&&(this.g.m=i),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!K(a)&&(this.g.D=a,i=this.h,i!==null&&a in i&&(i=this.h,a in i&&delete i[a])),this.j=new he(this)}b(It,dt),It.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},It.prototype.close=function(){$r(this.g)},It.prototype.o=function(i){var a=this.g;if(typeof i=="string"){var c={};c.__data__=i,i=c}else this.u&&(c={},c.__data__=Dr(i),i=c);a.i.push(new Lu(a.Ya++,i)),a.G==3&&xn(a)},It.prototype.N=function(){this.g.l=null,delete this.j,$r(this.g),delete this.g,It.aa.N.call(this)};function Ys(i){kr.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var a=i.__sm__;if(a){t:{for(const c in a){i=c;break t}i=void 0}(this.i=i)&&(i=this.i,a=a!==null&&i in a?a[i]:void 0),this.data=a}else this.data=i}b(Ys,kr);function Js(){Or.call(this),this.status=1}b(Js,Or);function he(i){this.g=i}b(he,Xs),he.prototype.ua=function(){yt(this.g,"a")},he.prototype.ta=function(i){yt(this.g,new Ys(i))},he.prototype.sa=function(i){yt(this.g,new Js)},he.prototype.ra=function(){yt(this.g,"b")},Ln.prototype.createWebChannel=Ln.prototype.g,It.prototype.send=It.prototype.o,It.prototype.open=It.prototype.m,It.prototype.close=It.prototype.close,sa=function(){return new Ln},ia=function(){return An()},ra=Yt,ii={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Rn.NO_ERROR=0,Rn.TIMEOUT=8,Rn.HTTP_ERROR=6,zn=Rn,ps.COMPLETE="complete",na=ps,cs.EventType=xe,xe.OPEN="a",xe.CLOSE="b",xe.ERROR="c",xe.MESSAGE="d",dt.prototype.listen=dt.prototype.K,He=cs,J.prototype.listenOnce=J.prototype.L,J.prototype.getLastError=J.prototype.Ka,J.prototype.getLastErrorCode=J.prototype.Ba,J.prototype.getStatus=J.prototype.Z,J.prototype.getResponseJson=J.prototype.Oa,J.prototype.getResponseText=J.prototype.oa,J.prototype.send=J.prototype.ea,J.prototype.setWithCredentials=J.prototype.Ha,ea=J}).apply(typeof Un<"u"?Un:typeof self<"u"?self:typeof window<"u"?window:{});const ao="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}gt.UNAUTHENTICATED=new gt(null),gt.GOOGLE_CREDENTIALS=new gt("google-credentials-uid"),gt.FIRST_PARTY=new gt("first-party-uid"),gt.MOCK_USER=new gt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Re="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ie=new Yo("@firebase/firestore");function We(){return ie.logLevel}function k(n,...t){if(ie.logLevel<=q.DEBUG){const e=t.map(Ti);ie.debug(`Firestore (${Re}): ${n}`,...e)}}function Mt(n,...t){if(ie.logLevel<=q.ERROR){const e=t.map(Ti);ie.error(`Firestore (${Re}): ${n}`,...e)}}function _e(n,...t){if(ie.logLevel<=q.WARN){const e=t.map(Ti);ie.warn(`Firestore (${Re}): ${n}`,...e)}}function Ti(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(n="Unexpected state"){const t=`FIRESTORE (${Re}) INTERNAL ASSERTION FAILED: `+n;throw Mt(t),new Error(t)}function z(n,t){n||M()}function F(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends Ae{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class wl{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(gt.UNAUTHENTICATED))}shutdown(){}}class Al{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Rl{constructor(t){this.t=t,this.currentUser=gt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){z(this.o===void 0);let r=this.i;const s=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new zt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new zt,t.enqueueRetryable(()=>s(this.currentUser))};const u=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},l=h=>{k("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),u())};this.t.onInit(h=>l(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?l(h):(k("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new zt)}},0),u()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(k("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(z(typeof r.accessToken=="string"),new oa(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return z(t===null||typeof t=="string"),new gt(t)}}class Pl{constructor(t,e,r){this.l=t,this.h=e,this.P=r,this.type="FirstParty",this.user=gt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const t=this.T();return t&&this.I.set("Authorization",t),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Vl{constructor(t,e,r){this.l=t,this.h=e,this.P=r}getToken(){return Promise.resolve(new Pl(this.l,this.h,this.P))}start(t,e){t.enqueueRetryable(()=>e(gt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Sl{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Cl{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,e){z(this.o===void 0);const r=o=>{o.error!=null&&k("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const u=o.token!==this.R;return this.R=o.token,k("FirebaseAppCheckTokenProvider",`Received ${u?"new":"existing"} token.`),u?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};const s=o=>{k("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?s(o):k("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(z(typeof e.token=="string"),this.R=e.token,new Sl(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bl(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let r="";for(;r.length<20;){const s=bl(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%t.length))}return r}}function $(n,t){return n<t?-1:n>t?1:0}function ye(n,t,e){return n.length===t.length&&n.every((r,s)=>e(r,t[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return nt.fromMillis(Date.now())}static fromDate(t){return nt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor(1e6*(t-1e3*e));return new nt(e,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?$(this.nanoseconds,t.nanoseconds):$(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(t){this.timestamp=t}static fromTimestamp(t){return new L(t)}static min(){return new L(new nt(0,0))}static max(){return new L(new nt(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(t,e,r){e===void 0?e=0:e>t.length&&M(),r===void 0?r=t.length-e:r>t.length-e&&M(),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return sn.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof sn?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=t.get(s),u=e.get(s);if(o<u)return-1;if(o>u)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class X extends sn{construct(t,e,r){return new X(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new N(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(s=>s.length>0))}return new X(e)}static emptyPath(){return new X([])}}const Dl=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ut extends sn{construct(t,e,r){return new ut(t,e,r)}static isValidIdentifier(t){return Dl.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ut.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ut(["__name__"])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let u=!1;for(;s<t.length;){const l=t[s];if(l==="\\"){if(s+1===t.length)throw new N(P.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new N(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,s+=2}else l==="`"?(u=!u,s++):l!=="."||u?(r+=l,s++):(o(),s++)}if(o(),u)throw new N(P.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ut(e)}static emptyPath(){return new ut([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(t){this.path=t}static fromPath(t){return new x(X.fromString(t))}static fromName(t){return new x(X.fromString(t).popFirst(5))}static empty(){return new x(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&X.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return X.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new x(new X(t.slice()))}}function Nl(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=L.fromTimestamp(r===1e9?new nt(e+1,0):new nt(e,r));return new Kt(s,x.empty(),t)}function kl(n){return new Kt(n.readTime,n.key,-1)}class Kt{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new Kt(L.min(),x.empty(),-1)}static max(){return new Kt(L.max(),x.empty(),-1)}}function Ol(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=x.comparator(n.documentKey,t.documentKey),e!==0?e:$(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xl="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ml{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hn(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==xl)throw n;k("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&M(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new V((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof V?e:V.resolve(e)}catch(e){return V.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):V.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):V.reject(e)}static resolve(t){return new V((e,r)=>{e(t)})}static reject(t){return new V((e,r)=>{r(t)})}static waitFor(t){return new V((e,r)=>{let s=0,o=0,u=!1;t.forEach(l=>{++s,l.next(()=>{++o,u&&o===s&&e()},h=>r(h))}),u=!0,o===s&&e()})}static or(t){let e=V.resolve(!1);for(const r of t)e=e.next(s=>s?V.resolve(s):r());return e}static forEach(t,e){const r=[];return t.forEach((s,o)=>{r.push(e.call(this,s,o))}),this.waitFor(r)}static mapArray(t,e){return new V((r,s)=>{const o=t.length,u=new Array(o);let l=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next(m=>{u[f]=m,++l,l===o&&r(u)},m=>s(m))}})}static doWhile(t,e){return new V((r,s)=>{const o=()=>{t()===!0?e().next(()=>{o()},s):r()};o()})}}function Ll(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function dn(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ie(r),this.se=r=>e.writeSequenceNumber(r))}ie(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.se&&this.se(t),t}}Ii.oe=-1;function ur(n){return n==null}function Jn(n){return n===0&&1/n==-1/0}function Fl(n){return typeof n=="number"&&Number.isInteger(n)&&!Jn(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uo(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function ae(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function ua(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(t,e){this.comparator=t,this.root=e||at.EMPTY}insert(t,e){return new Y(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,at.BLACK,null,null))}remove(t){return new Y(this.comparator,this.root.remove(t,this.comparator).copy(null,null,at.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Bn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Bn(this.root,t,this.comparator,!1)}getReverseIterator(){return new Bn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Bn(this.root,t,this.comparator,!0)}}class Bn{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class at{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??at.RED,this.left=s??at.EMPTY,this.right=o??at.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new at(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return at.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return at.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,at.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,at.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw M();const t=this.left.check();if(t!==this.right.check())throw M();return t+(this.isRed()?0:1)}}at.EMPTY=null,at.RED=!0,at.BLACK=!1;at.EMPTY=new class{constructor(){this.size=0}get key(){throw M()}get value(){throw M()}get color(){throw M()}get left(){throw M()}get right(){throw M()}copy(t,e,r,s,o){return this}insert(t,e,r){return new at(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(t){this.comparator=t,this.data=new Y(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new co(this.data.getIterator())}getIteratorFrom(t){return new co(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof ct)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new ct(this.comparator);return e.data=t,e}}class co{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(t){this.fields=t,t.sort(ut.comparator)}static empty(){return new wt([])}unionWith(t){let e=new ct(ut.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new wt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return ye(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new ca("Invalid base64 string: "+o):o}}(t);return new lt(e)}static fromUint8Array(t){const e=function(s){let o="";for(let u=0;u<s.length;++u)o+=String.fromCharCode(s[u]);return o}(t);return new lt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return $(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}lt.EMPTY_BYTE_STRING=new lt("");const Ul=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Wt(n){if(z(!!n),typeof n=="string"){let t=0;const e=Ul.exec(n);if(z(!!e),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:Z(n.seconds),nanos:Z(n.nanos)}}function Z(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function se(n){return typeof n=="string"?lt.fromBase64String(n):lt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wi(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="server_timestamp"}function Ai(n){const t=n.mapValue.fields.__previous_value__;return wi(t)?Ai(t):t}function on(n){const t=Wt(n.mapValue.fields.__local_write_time__.timestampValue);return new nt(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(t,e,r,s,o,u,l,h,f){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=u,this.autoDetectLongPolling=l,this.longPollingOptions=h,this.useFetchStreams=f}}class an{constructor(t,e){this.projectId=t,this.database=e||"(default)"}static empty(){return new an("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof an&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qn={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function oe(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?wi(n)?4:jl(n)?9007199254740991:ql(n)?10:11:M()}function bt(n,t){if(n===t)return!0;const e=oe(n);if(e!==oe(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return on(n).isEqual(on(t));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const u=Wt(s.timestampValue),l=Wt(o.timestampValue);return u.seconds===l.seconds&&u.nanos===l.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(s,o){return se(s.bytesValue).isEqual(se(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(s,o){return Z(s.geoPointValue.latitude)===Z(o.geoPointValue.latitude)&&Z(s.geoPointValue.longitude)===Z(o.geoPointValue.longitude)}(n,t);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return Z(s.integerValue)===Z(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const u=Z(s.doubleValue),l=Z(o.doubleValue);return u===l?Jn(u)===Jn(l):isNaN(u)&&isNaN(l)}return!1}(n,t);case 9:return ye(n.arrayValue.values||[],t.arrayValue.values||[],bt);case 10:case 11:return function(s,o){const u=s.mapValue.fields||{},l=o.mapValue.fields||{};if(uo(u)!==uo(l))return!1;for(const h in u)if(u.hasOwnProperty(h)&&(l[h]===void 0||!bt(u[h],l[h])))return!1;return!0}(n,t);default:return M()}}function un(n,t){return(n.values||[]).find(e=>bt(e,t))!==void 0}function Ee(n,t){if(n===t)return 0;const e=oe(n),r=oe(t);if(e!==r)return $(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return $(n.booleanValue,t.booleanValue);case 2:return function(o,u){const l=Z(o.integerValue||o.doubleValue),h=Z(u.integerValue||u.doubleValue);return l<h?-1:l>h?1:l===h?0:isNaN(l)?isNaN(h)?0:-1:1}(n,t);case 3:return lo(n.timestampValue,t.timestampValue);case 4:return lo(on(n),on(t));case 5:return $(n.stringValue,t.stringValue);case 6:return function(o,u){const l=se(o),h=se(u);return l.compareTo(h)}(n.bytesValue,t.bytesValue);case 7:return function(o,u){const l=o.split("/"),h=u.split("/");for(let f=0;f<l.length&&f<h.length;f++){const m=$(l[f],h[f]);if(m!==0)return m}return $(l.length,h.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,u){const l=$(Z(o.latitude),Z(u.latitude));return l!==0?l:$(Z(o.longitude),Z(u.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return ho(n.arrayValue,t.arrayValue);case 10:return function(o,u){var l,h,f,m;const w=o.fields||{},R=u.fields||{},S=(l=w.value)===null||l===void 0?void 0:l.arrayValue,b=(h=R.value)===null||h===void 0?void 0:h.arrayValue,O=$(((f=S==null?void 0:S.values)===null||f===void 0?void 0:f.length)||0,((m=b==null?void 0:b.values)===null||m===void 0?void 0:m.length)||0);return O!==0?O:ho(S,b)}(n.mapValue,t.mapValue);case 11:return function(o,u){if(o===qn.mapValue&&u===qn.mapValue)return 0;if(o===qn.mapValue)return 1;if(u===qn.mapValue)return-1;const l=o.fields||{},h=Object.keys(l),f=u.fields||{},m=Object.keys(f);h.sort(),m.sort();for(let w=0;w<h.length&&w<m.length;++w){const R=$(h[w],m[w]);if(R!==0)return R;const S=Ee(l[h[w]],f[m[w]]);if(S!==0)return S}return $(h.length,m.length)}(n.mapValue,t.mapValue);default:throw M()}}function lo(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return $(n,t);const e=Wt(n),r=Wt(t),s=$(e.seconds,r.seconds);return s!==0?s:$(e.nanos,r.nanos)}function ho(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=Ee(e[s],r[s]);if(o)return o}return $(e.length,r.length)}function ve(n){return si(n)}function si(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const r=Wt(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return se(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return x.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=si(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const u of r)o?o=!1:s+=",",s+=`${u}:${si(e.fields[u])}`;return s+"}"}(n.mapValue):M()}function fo(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function oi(n){return!!n&&"integerValue"in n}function Ri(n){return!!n&&"arrayValue"in n}function po(n){return!!n&&"nullValue"in n}function mo(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Gn(n){return!!n&&"mapValue"in n}function ql(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="__vector__"}function Je(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return ae(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=Je(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Je(n.arrayValue.values[e]);return t}return Object.assign({},n)}function jl(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(t){this.value=t}static empty(){return new vt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!Gn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Je(e)}setAll(t){let e=ut.emptyPath(),r={},s=[];t.forEach((u,l)=>{if(!e.isImmediateParentOf(l)){const h=this.getFieldsMap(e);this.applyChanges(h,r,s),r={},s=[],e=l.popLast()}u?r[l.lastSegment()]=Je(u):s.push(l.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());Gn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return bt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];Gn(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){ae(e,(s,o)=>t[s]=o);for(const s of r)delete t[s]}clone(){return new vt(Je(this.value))}}function la(n){const t=[];return ae(n.fields,(e,r)=>{const s=new ut([e]);if(Gn(r)){const o=la(r.mapValue).fields;if(o.length===0)t.push(s);else for(const u of o)t.push(s.child(u))}else t.push(s)}),new wt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(t,e,r,s,o,u,l){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=u,this.documentState=l}static newInvalidDocument(t){return new _t(t,0,L.min(),L.min(),L.min(),vt.empty(),0)}static newFoundDocument(t,e,r,s){return new _t(t,1,e,L.min(),r,s,0)}static newNoDocument(t,e){return new _t(t,2,e,L.min(),L.min(),vt.empty(),0)}static newUnknownDocument(t,e){return new _t(t,3,e,L.min(),L.min(),vt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(L.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=vt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=vt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=L.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof _t&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new _t(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(t,e){this.position=t,this.inclusive=e}}function go(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],u=n.position[s];if(o.field.isKeyField()?r=x.comparator(x.fromName(u.referenceValue),e.key):r=Ee(u,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function _o(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!bt(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(t,e="asc"){this.field=t,this.dir=e}}function $l(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{}class et extends ha{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Gl(t,e,r):e==="array-contains"?new Hl(t,r):e==="in"?new Ql(t,r):e==="not-in"?new Xl(t,r):e==="array-contains-any"?new Yl(t,r):new et(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new Kl(t,r):new Wl(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&this.matchesComparison(Ee(e,this.value)):e!==null&&oe(this.value)===oe(e)&&this.matchesComparison(Ee(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return M()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Vt extends ha{constructor(t,e){super(),this.filters=t,this.op=e,this.ae=null}static create(t,e){return new Vt(t,e)}matches(t){return da(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function da(n){return n.op==="and"}function fa(n){return zl(n)&&da(n)}function zl(n){for(const t of n.filters)if(t instanceof Vt)return!1;return!0}function ai(n){if(n instanceof et)return n.field.canonicalString()+n.op.toString()+ve(n.value);if(fa(n))return n.filters.map(t=>ai(t)).join(",");{const t=n.filters.map(e=>ai(e)).join(",");return`${n.op}(${t})`}}function pa(n,t){return n instanceof et?function(r,s){return s instanceof et&&r.op===s.op&&r.field.isEqual(s.field)&&bt(r.value,s.value)}(n,t):n instanceof Vt?function(r,s){return s instanceof Vt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,u,l)=>o&&pa(u,s.filters[l]),!0):!1}(n,t):void M()}function ma(n){return n instanceof et?function(e){return`${e.field.canonicalString()} ${e.op} ${ve(e.value)}`}(n):n instanceof Vt?function(e){return e.op.toString()+" {"+e.getFilters().map(ma).join(" ,")+"}"}(n):"Filter"}class Gl extends et{constructor(t,e,r){super(t,e,r),this.key=x.fromName(r.referenceValue)}matches(t){const e=x.comparator(t.key,this.key);return this.matchesComparison(e)}}class Kl extends et{constructor(t,e){super(t,"in",e),this.keys=ga("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Wl extends et{constructor(t,e){super(t,"not-in",e),this.keys=ga("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function ga(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(r=>x.fromName(r.referenceValue))}class Hl extends et{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Ri(e)&&un(e.arrayValue,this.value)}}class Ql extends et{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&un(this.value.arrayValue,e)}}class Xl extends et{constructor(t,e){super(t,"not-in",e)}matches(t){if(un(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&!un(this.value.arrayValue,e)}}class Yl extends et{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Ri(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>un(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{constructor(t,e=null,r=[],s=[],o=null,u=null,l=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=u,this.endAt=l,this.ue=null}}function yo(n,t=null,e=[],r=[],s=null,o=null,u=null){return new Jl(n,t,e,r,s,o,u)}function Pi(n){const t=F(n);if(t.ue===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>ai(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),ur(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>ve(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>ve(r)).join(",")),t.ue=e}return t.ue}function Vi(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!$l(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!pa(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!_o(n.startAt,t.startAt)&&_o(n.endAt,t.endAt)}function ui(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(t,e=null,r=[],s=[],o=null,u="F",l=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=u,this.startAt=l,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Zl(n,t,e,r,s,o,u,l){return new fn(n,t,e,r,s,o,u,l)}function _a(n){return new fn(n)}function Eo(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function ya(n){return n.collectionGroup!==null}function Ze(n){const t=F(n);if(t.ce===null){t.ce=[];const e=new Set;for(const o of t.explicitOrderBy)t.ce.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(u){let l=new ct(ut.comparator);return u.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(l=l.add(f.field))})}),l})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.ce.push(new tr(o,r))}),e.has(ut.keyField().canonicalString())||t.ce.push(new tr(ut.keyField(),r))}return t.ce}function St(n){const t=F(n);return t.le||(t.le=th(t,Ze(n))),t.le}function th(n,t){if(n.limitType==="F")return yo(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new tr(s.field,o)});const e=n.endAt?new Zn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Zn(n.startAt.position,n.startAt.inclusive):null;return yo(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function ci(n,t){const e=n.filters.concat([t]);return new fn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function li(n,t,e){return new fn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function cr(n,t){return Vi(St(n),St(t))&&n.limitType===t.limitType}function Ea(n){return`${Pi(St(n))}|lt:${n.limitType}`}function fe(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(s=>ma(s)).join(", ")}]`),ur(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(s=>function(u){return`${u.field.canonicalString()} (${u.dir})`}(s)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(s=>ve(s)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(s=>ve(s)).join(",")),`Target(${r})`}(St(n))}; limitType=${n.limitType})`}function lr(n,t){return t.isFoundDocument()&&function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):x.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,s){for(const o of Ze(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0}(n,t)&&function(r,s){return!(r.startAt&&!function(u,l,h){const f=go(u,l,h);return u.inclusive?f<=0:f<0}(r.startAt,Ze(r),s)||r.endAt&&!function(u,l,h){const f=go(u,l,h);return u.inclusive?f>=0:f>0}(r.endAt,Ze(r),s))}(n,t)}function eh(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function va(n){return(t,e)=>{let r=!1;for(const s of Ze(n)){const o=nh(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function nh(n,t,e){const r=n.field.isKeyField()?x.comparator(t.key,e.key):function(o,u,l){const h=u.data.field(o),f=l.data.field(o);return h!==null&&f!==null?Ee(h,f):M()}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return M()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){ae(this.inner,(e,r)=>{for(const[s,o]of r)t(s,o)})}isEmpty(){return ua(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rh=new Y(x.comparator);function Lt(){return rh}const Ta=new Y(x.comparator);function Qe(...n){let t=Ta;for(const e of n)t=t.insert(e.key,e);return t}function Ia(n){let t=Ta;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function ne(){return tn()}function wa(){return tn()}function tn(){return new Pe(n=>n.toString(),(n,t)=>n.isEqual(t))}const ih=new Y(x.comparator),sh=new ct(x.comparator);function U(...n){let t=sh;for(const e of n)t=t.add(e);return t}const oh=new ct($);function ah(){return oh}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Si(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Jn(t)?"-0":t}}function Aa(n){return{integerValue:""+n}}function uh(n,t){return Fl(t)?Aa(t):Si(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(){this._=void 0}}function ch(n,t,e){return n instanceof er?function(s,o){const u={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&wi(o)&&(o=Ai(o)),o&&(u.fields.__previous_value__=o),{mapValue:u}}(e,t):n instanceof cn?Pa(n,t):n instanceof ln?Va(n,t):function(s,o){const u=Ra(s,o),l=vo(u)+vo(s.Pe);return oi(u)&&oi(s.Pe)?Aa(l):Si(s.serializer,l)}(n,t)}function lh(n,t,e){return n instanceof cn?Pa(n,t):n instanceof ln?Va(n,t):e}function Ra(n,t){return n instanceof nr?function(r){return oi(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}class er extends hr{}class cn extends hr{constructor(t){super(),this.elements=t}}function Pa(n,t){const e=Sa(t);for(const r of n.elements)e.some(s=>bt(s,r))||e.push(r);return{arrayValue:{values:e}}}class ln extends hr{constructor(t){super(),this.elements=t}}function Va(n,t){let e=Sa(t);for(const r of n.elements)e=e.filter(s=>!bt(s,r));return{arrayValue:{values:e}}}class nr extends hr{constructor(t,e){super(),this.serializer=t,this.Pe=e}}function vo(n){return Z(n.integerValue||n.doubleValue)}function Sa(n){return Ri(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function hh(n,t){return n.field.isEqual(t.field)&&function(r,s){return r instanceof cn&&s instanceof cn||r instanceof ln&&s instanceof ln?ye(r.elements,s.elements,bt):r instanceof nr&&s instanceof nr?bt(r.Pe,s.Pe):r instanceof er&&s instanceof er}(n.transform,t.transform)}class dh{constructor(t,e){this.version=t,this.transformResults=e}}class Tt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Tt}static exists(t){return new Tt(void 0,t)}static updateTime(t){return new Tt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Kn(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class dr{}function Ca(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new fr(n.key,Tt.none()):new pn(n.key,n.data,Tt.none());{const e=n.data,r=vt.empty();let s=new ct(ut.comparator);for(let o of t.fields)if(!s.has(o)){let u=e.field(o);u===null&&o.length>1&&(o=o.popLast(),u=e.field(o)),u===null?r.delete(o):r.set(o,u),s=s.add(o)}return new Xt(n.key,r,new wt(s.toArray()),Tt.none())}}function fh(n,t,e){n instanceof pn?function(s,o,u){const l=s.value.clone(),h=Io(s.fieldTransforms,o,u.transformResults);l.setAll(h),o.convertToFoundDocument(u.version,l).setHasCommittedMutations()}(n,t,e):n instanceof Xt?function(s,o,u){if(!Kn(s.precondition,o))return void o.convertToUnknownDocument(u.version);const l=Io(s.fieldTransforms,o,u.transformResults),h=o.data;h.setAll(ba(s)),h.setAll(l),o.convertToFoundDocument(u.version,h).setHasCommittedMutations()}(n,t,e):function(s,o,u){o.convertToNoDocument(u.version).setHasCommittedMutations()}(0,t,e)}function en(n,t,e,r){return n instanceof pn?function(o,u,l,h){if(!Kn(o.precondition,u))return l;const f=o.value.clone(),m=wo(o.fieldTransforms,h,u);return f.setAll(m),u.convertToFoundDocument(u.version,f).setHasLocalMutations(),null}(n,t,e,r):n instanceof Xt?function(o,u,l,h){if(!Kn(o.precondition,u))return l;const f=wo(o.fieldTransforms,h,u),m=u.data;return m.setAll(ba(o)),m.setAll(f),u.convertToFoundDocument(u.version,m).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(w=>w.field))}(n,t,e,r):function(o,u,l){return Kn(o.precondition,u)?(u.convertToNoDocument(u.version).setHasLocalMutations(),null):l}(n,t,e)}function ph(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),o=Ra(r.transform,s||null);o!=null&&(e===null&&(e=vt.empty()),e.set(r.field,o))}return e||null}function To(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ye(r,s,(o,u)=>hh(o,u))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class pn extends dr{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Xt extends dr{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function ba(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}}),t}function Io(n,t,e){const r=new Map;z(n.length===e.length);for(let s=0;s<e.length;s++){const o=n[s],u=o.transform,l=t.data.field(o.field);r.set(o.field,lh(u,l,e[s]))}return r}function wo(n,t,e){const r=new Map;for(const s of n){const o=s.transform,u=e.data.field(s.field);r.set(s.field,ch(o,u,t))}return r}class fr extends dr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class mh extends dr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&fh(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=en(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=en(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=wa();return this.mutations.forEach(s=>{const o=t.get(s.key),u=o.overlayedDocument;let l=this.applyToLocalView(u,o.mutatedFields);l=e.has(s.key)?null:l;const h=Ca(u,l);h!==null&&r.set(s.key,h),u.isValidDocument()||u.convertToNoDocument(L.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),U())}isEqual(t){return this.batchId===t.batchId&&ye(this.mutations,t.mutations,(e,r)=>To(e,r))&&ye(this.baseMutations,t.baseMutations,(e,r)=>To(e,r))}}class Ci{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){z(t.mutations.length===r.length);let s=function(){return ih}();const o=t.mutations;for(let u=0;u<o.length;u++)s=s.insert(o[u].key,r[u].version);return new Ci(t,e,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _h{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yh{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tt,B;function Eh(n){switch(n){default:return M();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function Da(n){if(n===void 0)return Mt("GRPC error has no .code"),P.UNKNOWN;switch(n){case tt.OK:return P.OK;case tt.CANCELLED:return P.CANCELLED;case tt.UNKNOWN:return P.UNKNOWN;case tt.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case tt.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case tt.INTERNAL:return P.INTERNAL;case tt.UNAVAILABLE:return P.UNAVAILABLE;case tt.UNAUTHENTICATED:return P.UNAUTHENTICATED;case tt.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case tt.NOT_FOUND:return P.NOT_FOUND;case tt.ALREADY_EXISTS:return P.ALREADY_EXISTS;case tt.PERMISSION_DENIED:return P.PERMISSION_DENIED;case tt.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case tt.ABORTED:return P.ABORTED;case tt.OUT_OF_RANGE:return P.OUT_OF_RANGE;case tt.UNIMPLEMENTED:return P.UNIMPLEMENTED;case tt.DATA_LOSS:return P.DATA_LOSS;default:return M()}}(B=tt||(tt={}))[B.OK=0]="OK",B[B.CANCELLED=1]="CANCELLED",B[B.UNKNOWN=2]="UNKNOWN",B[B.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",B[B.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",B[B.NOT_FOUND=5]="NOT_FOUND",B[B.ALREADY_EXISTS=6]="ALREADY_EXISTS",B[B.PERMISSION_DENIED=7]="PERMISSION_DENIED",B[B.UNAUTHENTICATED=16]="UNAUTHENTICATED",B[B.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",B[B.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",B[B.ABORTED=10]="ABORTED",B[B.OUT_OF_RANGE=11]="OUT_OF_RANGE",B[B.UNIMPLEMENTED=12]="UNIMPLEMENTED",B[B.INTERNAL=13]="INTERNAL",B[B.UNAVAILABLE=14]="UNAVAILABLE",B[B.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vh(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Th=new re([4294967295,4294967295],0);function Ao(n){const t=vh().encode(n),e=new ta;return e.update(t),new Uint8Array(e.digest())}function Ro(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new re([e,r],0),new re([s,o],0)]}class bi{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new Xe(`Invalid padding: ${e}`);if(r<0)throw new Xe(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new Xe(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new Xe(`Invalid padding when bitmap length is 0: ${e}`);this.Ie=8*t.length-e,this.Te=re.fromNumber(this.Ie)}Ee(t,e,r){let s=t.add(e.multiply(re.fromNumber(r)));return s.compare(Th)===1&&(s=new re([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}mightContain(t){if(this.Ie===0)return!1;const e=Ao(t),[r,s]=Ro(e);for(let o=0;o<this.hashCount;o++){const u=this.Ee(r,s,o);if(!this.de(u))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),u=new bi(o,s,e);return r.forEach(l=>u.insert(l)),u}insert(t){if(this.Ie===0)return;const e=Ao(t),[r,s]=Ro(e);for(let o=0;o<this.hashCount;o++){const u=this.Ee(r,s,o);this.Ae(u)}}Ae(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class Xe extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(t,e,r,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,mn.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new pr(L.min(),s,new Y($),Lt(),U())}}class mn{constructor(t,e,r,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new mn(r,e,U(),U(),U())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{constructor(t,e,r,s){this.Re=t,this.removedTargetIds=e,this.key=r,this.Ve=s}}class Na{constructor(t,e){this.targetId=t,this.me=e}}class ka{constructor(t,e,r=lt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class Po{constructor(){this.fe=0,this.ge=So(),this.pe=lt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(t){t.approximateByteSize()>0&&(this.we=!0,this.pe=t)}ve(){let t=U(),e=U(),r=U();return this.ge.forEach((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:M()}}),new mn(this.pe,this.ye,t,e,r)}Ce(){this.we=!1,this.ge=So()}Fe(t,e){this.we=!0,this.ge=this.ge.insert(t,e)}Me(t){this.we=!0,this.ge=this.ge.remove(t)}xe(){this.fe+=1}Oe(){this.fe-=1,z(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Ih{constructor(t){this.Le=t,this.Be=new Map,this.ke=Lt(),this.qe=Vo(),this.Qe=new Y($)}Ke(t){for(const e of t.Re)t.Ve&&t.Ve.isFoundDocument()?this.$e(e,t.Ve):this.Ue(e,t.key,t.Ve);for(const e of t.removedTargetIds)this.Ue(e,t.key,t.Ve)}We(t){this.forEachTarget(t,e=>{const r=this.Ge(e);switch(t.state){case 0:this.ze(e)&&r.De(t.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(t.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(e);break;case 3:this.ze(e)&&(r.Ne(),r.De(t.resumeToken));break;case 4:this.ze(e)&&(this.je(e),r.De(t.resumeToken));break;default:M()}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Be.forEach((r,s)=>{this.ze(s)&&e(s)})}He(t){const e=t.targetId,r=t.me.count,s=this.Je(e);if(s){const o=s.target;if(ui(o))if(r===0){const u=new x(o.path);this.Ue(e,u,_t.newNoDocument(u,L.min()))}else z(r===1);else{const u=this.Ye(e);if(u!==r){const l=this.Ze(t),h=l?this.Xe(l,t,u):1;if(h!==0){this.je(e);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(e,f)}}}}}Ze(t){const e=t.me.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=e;let u,l;try{u=se(r).toUint8Array()}catch(h){if(h instanceof ca)return _e("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{l=new bi(u,s,o)}catch(h){return _e(h instanceof Xe?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return l.Ie===0?null:l}Xe(t,e,r){return e.me.count===r-this.nt(t,e.targetId)?0:2}nt(t,e){const r=this.Le.getRemoteKeysForTarget(e);let s=0;return r.forEach(o=>{const u=this.Le.tt(),l=`projects/${u.projectId}/databases/${u.database}/documents/${o.path.canonicalString()}`;t.mightContain(l)||(this.Ue(e,o,null),s++)}),s}rt(t){const e=new Map;this.Be.forEach((o,u)=>{const l=this.Je(u);if(l){if(o.current&&ui(l.target)){const h=new x(l.target.path);this.ke.get(h)!==null||this.it(u,h)||this.Ue(u,h,_t.newNoDocument(h,t))}o.be&&(e.set(u,o.ve()),o.Ce())}});let r=U();this.qe.forEach((o,u)=>{let l=!0;u.forEachWhile(h=>{const f=this.Je(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(o))}),this.ke.forEach((o,u)=>u.setReadTime(t));const s=new pr(t,e,this.Qe,this.ke,r);return this.ke=Lt(),this.qe=Vo(),this.Qe=new Y($),s}$e(t,e){if(!this.ze(t))return;const r=this.it(t,e.key)?2:0;this.Ge(t).Fe(e.key,r),this.ke=this.ke.insert(e.key,e),this.qe=this.qe.insert(e.key,this.st(e.key).add(t))}Ue(t,e,r){if(!this.ze(t))return;const s=this.Ge(t);this.it(t,e)?s.Fe(e,1):s.Me(e),this.qe=this.qe.insert(e,this.st(e).delete(t)),r&&(this.ke=this.ke.insert(e,r))}removeTarget(t){this.Be.delete(t)}Ye(t){const e=this.Ge(t).ve();return this.Le.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}xe(t){this.Ge(t).xe()}Ge(t){let e=this.Be.get(t);return e||(e=new Po,this.Be.set(t,e)),e}st(t){let e=this.qe.get(t);return e||(e=new ct($),this.qe=this.qe.insert(t,e)),e}ze(t){const e=this.Je(t)!==null;return e||k("WatchChangeAggregator","Detected inactive target",t),e}Je(t){const e=this.Be.get(t);return e&&e.Se?null:this.Le.ot(t)}je(t){this.Be.set(t,new Po),this.Le.getRemoteKeysForTarget(t).forEach(e=>{this.Ue(t,e,null)})}it(t,e){return this.Le.getRemoteKeysForTarget(t).has(e)}}function Vo(){return new Y(x.comparator)}function So(){return new Y(x.comparator)}const wh={asc:"ASCENDING",desc:"DESCENDING"},Ah={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Rh={and:"AND",or:"OR"};class Ph{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function hi(n,t){return n.useProto3Json||ur(t)?t:{value:t}}function rr(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Oa(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Vh(n,t){return rr(n,t.toTimestamp())}function Ct(n){return z(!!n),L.fromTimestamp(function(e){const r=Wt(e);return new nt(r.seconds,r.nanos)}(n))}function Di(n,t){return di(n,t).canonicalString()}function di(n,t){const e=function(s){return new X(["projects",s.projectId,"databases",s.database])}(n).child("documents");return t===void 0?e:e.child(t)}function xa(n){const t=X.fromString(n);return z(Ba(t)),t}function fi(n,t){return Di(n.databaseId,t.path)}function Qr(n,t){const e=xa(t);if(e.get(1)!==n.databaseId.projectId)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new x(La(e))}function Ma(n,t){return Di(n.databaseId,t)}function Sh(n){const t=xa(n);return t.length===4?X.emptyPath():La(t)}function pi(n){return new X(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function La(n){return z(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Co(n,t,e){return{name:fi(n,t),fields:e.value.mapValue.fields}}function Ch(n,t){let e;if("targetChange"in t){t.targetChange;const r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:M()}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=function(f,m){return f.useProto3Json?(z(m===void 0||typeof m=="string"),lt.fromBase64String(m||"")):(z(m===void 0||m instanceof Buffer||m instanceof Uint8Array),lt.fromUint8Array(m||new Uint8Array))}(n,t.targetChange.resumeToken),u=t.targetChange.cause,l=u&&function(f){const m=f.code===void 0?P.UNKNOWN:Da(f.code);return new N(m,f.message||"")}(u);e=new ka(r,s,o,l||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=Qr(n,r.document.name),o=Ct(r.document.updateTime),u=r.document.createTime?Ct(r.document.createTime):L.min(),l=new vt({mapValue:{fields:r.document.fields}}),h=_t.newFoundDocument(s,o,u,l),f=r.targetIds||[],m=r.removedTargetIds||[];e=new Wn(f,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=Qr(n,r.document),o=r.readTime?Ct(r.readTime):L.min(),u=_t.newNoDocument(s,o),l=r.removedTargetIds||[];e=new Wn([],l,u.key,u)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=Qr(n,r.document),o=r.removedTargetIds||[];e=new Wn([],o,s,null)}else{if(!("filter"in t))return M();{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,u=new yh(s,o),l=r.targetId;e=new Na(l,u)}}return e}function bh(n,t){let e;if(t instanceof pn)e={update:Co(n,t.key,t.value)};else if(t instanceof fr)e={delete:fi(n,t.key)};else if(t instanceof Xt)e={update:Co(n,t.key,t.data),updateMask:Uh(t.fieldMask)};else{if(!(t instanceof mh))return M();e={verify:fi(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(r=>function(o,u){const l=u.transform;if(l instanceof er)return{fieldPath:u.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof cn)return{fieldPath:u.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof ln)return{fieldPath:u.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof nr)return{fieldPath:u.field.canonicalString(),increment:l.Pe};throw M()}(0,r))),t.precondition.isNone||(e.currentDocument=function(s,o){return o.updateTime!==void 0?{updateTime:Vh(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:M()}(n,t.precondition)),e}function Dh(n,t){return n&&n.length>0?(z(t!==void 0),n.map(e=>function(s,o){let u=s.updateTime?Ct(s.updateTime):Ct(o);return u.isEqual(L.min())&&(u=Ct(o)),new dh(u,s.transformResults||[])}(e,t))):[]}function Nh(n,t){return{documents:[Ma(n,t.path)]}}function kh(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=Ma(n,s);const o=function(f){if(f.length!==0)return Ua(Vt.create(f,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const u=function(f){if(f.length!==0)return f.map(m=>function(R){return{field:pe(R.field),direction:Mh(R.dir)}}(m))}(t.orderBy);u&&(e.structuredQuery.orderBy=u);const l=hi(n,t.limit);return l!==null&&(e.structuredQuery.limit=l),t.startAt&&(e.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(t.endAt)),{_t:e,parent:s}}function Oh(n){let t=Sh(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){z(r===1);const m=e.from[0];m.allDescendants?s=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=function(w){const R=Fa(w);return R instanceof Vt&&fa(R)?R.getFilters():[R]}(e.where));let u=[];e.orderBy&&(u=function(w){return w.map(R=>function(b){return new tr(me(b.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(b.direction))}(R))}(e.orderBy));let l=null;e.limit&&(l=function(w){let R;return R=typeof w=="object"?w.value:w,ur(R)?null:R}(e.limit));let h=null;e.startAt&&(h=function(w){const R=!!w.before,S=w.values||[];return new Zn(S,R)}(e.startAt));let f=null;return e.endAt&&(f=function(w){const R=!w.before,S=w.values||[];return new Zn(S,R)}(e.endAt)),Zl(t,s,u,o,l,"F",h,f)}function xh(n,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M()}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Fa(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=me(e.unaryFilter.field);return et.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=me(e.unaryFilter.field);return et.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=me(e.unaryFilter.field);return et.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const u=me(e.unaryFilter.field);return et.create(u,"!=",{nullValue:"NULL_VALUE"});default:return M()}}(n):n.fieldFilter!==void 0?function(e){return et.create(me(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return M()}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Vt.create(e.compositeFilter.filters.map(r=>Fa(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M()}}(e.compositeFilter.op))}(n):M()}function Mh(n){return wh[n]}function Lh(n){return Ah[n]}function Fh(n){return Rh[n]}function pe(n){return{fieldPath:n.canonicalString()}}function me(n){return ut.fromServerFormat(n.fieldPath)}function Ua(n){return n instanceof et?function(e){if(e.op==="=="){if(mo(e.value))return{unaryFilter:{field:pe(e.field),op:"IS_NAN"}};if(po(e.value))return{unaryFilter:{field:pe(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(mo(e.value))return{unaryFilter:{field:pe(e.field),op:"IS_NOT_NAN"}};if(po(e.value))return{unaryFilter:{field:pe(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:pe(e.field),op:Lh(e.op),value:e.value}}}(n):n instanceof Vt?function(e){const r=e.getFilters().map(s=>Ua(s));return r.length===1?r[0]:{compositeFilter:{op:Fh(e.op),filters:r}}}(n):M()}function Uh(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Ba(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(t,e,r,s,o=L.min(),u=L.min(),l=lt.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=u,this.resumeToken=l,this.expectedCount=h}withSequenceNumber(t){return new jt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new jt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bh{constructor(t){this.ct=t}}function qh(n){const t=Oh({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?li(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jh{constructor(){this.un=new $h}addToCollectionParentIndex(t,e){return this.un.add(e),V.resolve()}getCollectionParents(t,e){return V.resolve(this.un.getEntries(e))}addFieldIndex(t,e){return V.resolve()}deleteFieldIndex(t,e){return V.resolve()}deleteAllFieldIndexes(t){return V.resolve()}createTargetIndexes(t,e){return V.resolve()}getDocumentsMatchingTarget(t,e){return V.resolve(null)}getIndexType(t,e){return V.resolve(0)}getFieldIndexes(t,e){return V.resolve([])}getNextCollectionGroupToUpdate(t){return V.resolve(null)}getMinOffset(t,e){return V.resolve(Kt.min())}getMinOffsetFromCollectionGroup(t,e){return V.resolve(Kt.min())}updateCollectionGroup(t,e,r){return V.resolve()}updateIndexEntries(t,e){return V.resolve()}}class $h{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new ct(X.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new ct(X.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(t){this.Ln=t}next(){return this.Ln+=2,this.Ln}static Bn(){return new Te(0)}static kn(){return new Te(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zh{constructor(){this.changes=new Pe(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,_t.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?V.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gh{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(r=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(r!==null&&en(r.mutation,s,wt.empty(),nt.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,U()).next(()=>r))}getLocalViewOfDocuments(t,e,r=U()){const s=ne();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,r).next(o=>{let u=Qe();return o.forEach((l,h)=>{u=u.insert(l,h.overlayedDocument)}),u}))}getOverlayedDocuments(t,e){const r=ne();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,U()))}populateOverlays(t,e,r){const s=[];return r.forEach(o=>{e.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(t,s).next(o=>{o.forEach((u,l)=>{e.set(u,l)})})}computeViews(t,e,r,s){let o=Lt();const u=tn(),l=function(){return tn()}();return e.forEach((h,f)=>{const m=r.get(f.key);s.has(f.key)&&(m===void 0||m.mutation instanceof Xt)?o=o.insert(f.key,f):m!==void 0?(u.set(f.key,m.mutation.getFieldMask()),en(m.mutation,f,m.mutation.getFieldMask(),nt.now())):u.set(f.key,wt.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((f,m)=>u.set(f,m)),e.forEach((f,m)=>{var w;return l.set(f,new Gh(m,(w=u.get(f))!==null&&w!==void 0?w:null))}),l))}recalculateAndSaveOverlays(t,e){const r=tn();let s=new Y((u,l)=>u-l),o=U();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(u=>{for(const l of u)l.keys().forEach(h=>{const f=e.get(h);if(f===null)return;let m=r.get(h)||wt.empty();m=l.applyToLocalView(f,m),r.set(h,m);const w=(s.get(l.batchId)||U()).add(h);s=s.insert(l.batchId,w)})}).next(()=>{const u=[],l=s.getReverseIterator();for(;l.hasNext();){const h=l.getNext(),f=h.key,m=h.value,w=wa();m.forEach(R=>{if(!o.has(R)){const S=Ca(e.get(R),r.get(R));S!==null&&w.set(R,S),o=o.add(R)}}),u.push(this.documentOverlayCache.saveOverlays(t,f,w))}return V.waitFor(u)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,s){return function(u){return x.isDocumentKey(u.path)&&u.collectionGroup===null&&u.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):ya(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next(o=>{const u=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):V.resolve(ne());let l=-1,h=o;return u.next(f=>V.forEach(f,(m,w)=>(l<w.largestBatchId&&(l=w.largestBatchId),o.get(m)?V.resolve():this.remoteDocumentCache.getEntry(t,m).next(R=>{h=h.insert(m,R)}))).next(()=>this.populateOverlays(t,f,o)).next(()=>this.computeViews(t,h,f,U())).next(m=>({batchId:l,changes:Ia(m)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new x(e)).next(r=>{let s=Qe();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let u=Qe();return this.indexManager.getCollectionParents(t,o).next(l=>V.forEach(l,h=>{const f=function(w,R){return new fn(R,null,w.explicitOrderBy.slice(),w.filters.slice(),w.limit,w.limitType,w.startAt,w.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,r,s).next(m=>{m.forEach((w,R)=>{u=u.insert(w,R)})})}).next(()=>u))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(u=>(o=u,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s))).next(u=>{o.forEach((h,f)=>{const m=f.getKey();u.get(m)===null&&(u=u.insert(m,_t.newInvalidDocument(m)))});let l=Qe();return u.forEach((h,f)=>{const m=o.get(h);m!==void 0&&en(m.mutation,f,wt.empty(),nt.now()),lr(e,f)&&(l=l.insert(h,f))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wh{constructor(t){this.serializer=t,this.hr=new Map,this.Pr=new Map}getBundleMetadata(t,e){return V.resolve(this.hr.get(e))}saveBundleMetadata(t,e){return this.hr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:Ct(s.createTime)}}(e)),V.resolve()}getNamedQuery(t,e){return V.resolve(this.Pr.get(e))}saveNamedQuery(t,e){return this.Pr.set(e.name,function(s){return{name:s.name,query:qh(s.bundledQuery),readTime:Ct(s.readTime)}}(e)),V.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{constructor(){this.overlays=new Y(x.comparator),this.Ir=new Map}getOverlay(t,e){return V.resolve(this.overlays.get(e))}getOverlays(t,e){const r=ne();return V.forEach(e,s=>this.getOverlay(t,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((s,o)=>{this.ht(t,e,o)}),V.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(r)),V.resolve()}getOverlaysForCollection(t,e,r){const s=ne(),o=e.length+1,u=new x(e.child("")),l=this.overlays.getIteratorFrom(u);for(;l.hasNext();){const h=l.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return V.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new Y((f,m)=>f-m);const u=this.overlays.getIterator();for(;u.hasNext();){const f=u.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>r){let m=o.get(f.largestBatchId);m===null&&(m=ne(),o=o.insert(f.largestBatchId,m)),m.set(f.getKey(),f)}}const l=ne(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,m)=>l.set(f,m)),!(l.size()>=s)););return V.resolve(l)}ht(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const u=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,u)}this.overlays=this.overlays.insert(r.key,new _h(e,r));let o=this.Ir.get(e);o===void 0&&(o=U(),this.Ir.set(e,o)),this.Ir.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qh{constructor(){this.sessionToken=lt.EMPTY_BYTE_STRING}getSessionToken(t){return V.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,V.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni{constructor(){this.Tr=new ct(it.Er),this.dr=new ct(it.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(t,e){const r=new it(t,e);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.Vr(new it(t,e))}mr(t,e){t.forEach(r=>this.removeReference(r,e))}gr(t){const e=new x(new X([])),r=new it(e,t),s=new it(e,t+1),o=[];return this.dr.forEachInRange([r,s],u=>{this.Vr(u),o.push(u.key)}),o}pr(){this.Tr.forEach(t=>this.Vr(t))}Vr(t){this.Tr=this.Tr.delete(t),this.dr=this.dr.delete(t)}yr(t){const e=new x(new X([])),r=new it(e,t),s=new it(e,t+1);let o=U();return this.dr.forEachInRange([r,s],u=>{o=o.add(u.key)}),o}containsKey(t){const e=new it(t,0),r=this.Tr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class it{constructor(t,e){this.key=t,this.wr=e}static Er(t,e){return x.comparator(t.key,e.key)||$(t.wr,e.wr)}static Ar(t,e){return $(t.wr,e.wr)||x.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Sr=1,this.br=new ct(it.Er)}checkEmpty(t){return V.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const u=new gh(o,e,r,s);this.mutationQueue.push(u);for(const l of s)this.br=this.br.add(new it(l.key,o)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return V.resolve(u)}lookupMutationBatch(t,e){return V.resolve(this.Dr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.vr(r),o=s<0?0:s;return V.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return V.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(t){return V.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new it(e,0),s=new it(e,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([r,s],u=>{const l=this.Dr(u.wr);o.push(l)}),V.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new ct($);return e.forEach(s=>{const o=new it(s,0),u=new it(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,u],l=>{r=r.add(l.wr)})}),V.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;x.isDocumentKey(o)||(o=o.child(""));const u=new it(new x(o),0);let l=new ct($);return this.br.forEachWhile(h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(l=l.add(h.wr)),!0)},u),V.resolve(this.Cr(l))}Cr(t){const e=[];return t.forEach(r=>{const s=this.Dr(r);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){z(this.Fr(e.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return V.forEach(e.mutations,s=>{const o=new it(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.br=r})}On(t){}containsKey(t,e){const r=new it(e,0),s=this.br.firstAfterOrEqual(r);return V.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,V.resolve()}Fr(t,e){return this.vr(t)}vr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Dr(t){const e=this.vr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yh{constructor(t){this.Mr=t,this.docs=function(){return new Y(x.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,u=this.Mr(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:u}),this.size+=u-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return V.resolve(r?r.document.mutableCopy():_t.newInvalidDocument(e))}getEntries(t,e){let r=Lt();return e.forEach(s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():_t.newInvalidDocument(s))}),V.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=Lt();const u=e.path,l=new x(u.child("")),h=this.docs.getIteratorFrom(l);for(;h.hasNext();){const{key:f,value:{document:m}}=h.getNext();if(!u.isPrefixOf(f.path))break;f.path.length>u.length+1||Ol(kl(m),r)<=0||(s.has(m.key)||lr(e,m))&&(o=o.insert(m.key,m.mutableCopy()))}return V.resolve(o)}getAllFromCollectionGroup(t,e,r,s){M()}Or(t,e){return V.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new Jh(this)}getSize(t){return V.resolve(this.size)}}class Jh extends zh{constructor(t){super(),this.cr=t}applyChanges(t){const e=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?e.push(this.cr.addEntry(t,s)):this.cr.removeEntry(r)}),V.waitFor(e)}getFromCache(t,e){return this.cr.getEntry(t,e)}getAllFromCache(t,e){return this.cr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zh{constructor(t){this.persistence=t,this.Nr=new Pe(e=>Pi(e),Vi),this.lastRemoteSnapshotVersion=L.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Ni,this.targetCount=0,this.kr=Te.Bn()}forEachTarget(t,e){return this.Nr.forEach((r,s)=>e(s)),V.resolve()}getLastRemoteSnapshotVersion(t){return V.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return V.resolve(this.Lr)}allocateTargetId(t){return this.highestTargetId=this.kr.next(),V.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.Lr&&(this.Lr=e),V.resolve()}Kn(t){this.Nr.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.kr=new Te(e),this.highestTargetId=e),t.sequenceNumber>this.Lr&&(this.Lr=t.sequenceNumber)}addTargetData(t,e){return this.Kn(e),this.targetCount+=1,V.resolve()}updateTargetData(t,e){return this.Kn(e),V.resolve()}removeTargetData(t,e){return this.Nr.delete(e.target),this.Br.gr(e.targetId),this.targetCount-=1,V.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.Nr.forEach((u,l)=>{l.sequenceNumber<=e&&r.get(l.targetId)===null&&(this.Nr.delete(u),o.push(this.removeMatchingKeysForTargetId(t,l.targetId)),s++)}),V.waitFor(o).next(()=>s)}getTargetCount(t){return V.resolve(this.targetCount)}getTargetData(t,e){const r=this.Nr.get(e)||null;return V.resolve(r)}addMatchingKeys(t,e,r){return this.Br.Rr(e,r),V.resolve()}removeMatchingKeys(t,e,r){this.Br.mr(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach(u=>{o.push(s.markPotentiallyOrphaned(t,u))}),V.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.Br.gr(e),V.resolve()}getMatchingKeysForTargetId(t,e){const r=this.Br.yr(e);return V.resolve(r)}containsKey(t,e){return V.resolve(this.Br.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class td{constructor(t,e){this.qr={},this.overlays={},this.Qr=new Ii(0),this.Kr=!1,this.Kr=!0,this.$r=new Qh,this.referenceDelegate=t(this),this.Ur=new Zh(this),this.indexManager=new jh,this.remoteDocumentCache=function(s){return new Yh(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new Bh(e),this.Gr=new Wh(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Hh,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.qr[t.toKey()];return r||(r=new Xh(e,this.referenceDelegate),this.qr[t.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(t,e,r){k("MemoryPersistence","Starting transaction:",t);const s=new ed(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(o=>this.referenceDelegate.jr(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Hr(t,e){return V.or(Object.values(this.qr).map(r=>()=>r.containsKey(t,e)))}}class ed extends Ml{constructor(t){super(),this.currentSequenceNumber=t}}class ki{constructor(t){this.persistence=t,this.Jr=new Ni,this.Yr=null}static Zr(t){return new ki(t)}get Xr(){if(this.Yr)return this.Yr;throw M()}addReference(t,e,r){return this.Jr.addReference(r,e),this.Xr.delete(r.toString()),V.resolve()}removeReference(t,e,r){return this.Jr.removeReference(r,e),this.Xr.add(r.toString()),V.resolve()}markPotentiallyOrphaned(t,e){return this.Xr.add(e.toString()),V.resolve()}removeTarget(t,e){this.Jr.gr(e.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(o=>this.Xr.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}zr(){this.Yr=new Set}jr(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return V.forEach(this.Xr,r=>{const s=x.fromPath(r);return this.ei(t,s).next(o=>{o||e.removeEntry(s,L.min())})}).next(()=>(this.Yr=null,e.apply(t)))}updateLimboDocument(t,e){return this.ei(t,e).next(r=>{r?this.Xr.delete(e.toString()):this.Xr.add(e.toString())})}Wr(t){return 0}ei(t,e){return V.or([()=>V.resolve(this.Jr.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Hr(t,e)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.$i=r,this.Ui=s}static Wi(t,e){let r=U(),s=U();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new Oi(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return mc()?8:Ll(vi())>0?6:4}()}initialize(t,e){this.Ji=t,this.indexManager=e,this.Gi=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.Yi(t,e).next(u=>{o.result=u}).next(()=>{if(!o.result)return this.Zi(t,e,s,r).next(u=>{o.result=u})}).next(()=>{if(o.result)return;const u=new nd;return this.Xi(t,e,u).next(l=>{if(o.result=l,this.zi)return this.es(t,e,u,l.size)})}).next(()=>o.result)}es(t,e,r,s){return r.documentReadCount<this.ji?(We()<=q.DEBUG&&k("QueryEngine","SDK will not create cache indexes for query:",fe(e),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),V.resolve()):(We()<=q.DEBUG&&k("QueryEngine","Query:",fe(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(We()<=q.DEBUG&&k("QueryEngine","The SDK decides to create cache indexes for query:",fe(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,St(e))):V.resolve())}Yi(t,e){if(Eo(e))return V.resolve(null);let r=St(e);return this.indexManager.getIndexType(t,r).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=li(e,null,"F"),r=St(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{const u=U(...o);return this.Ji.getDocuments(t,u).next(l=>this.indexManager.getMinOffset(t,r).next(h=>{const f=this.ts(e,l);return this.ns(e,f,u,h.readTime)?this.Yi(t,li(e,null,"F")):this.rs(t,f,e,h)}))})))}Zi(t,e,r,s){return Eo(e)||s.isEqual(L.min())?V.resolve(null):this.Ji.getDocuments(t,r).next(o=>{const u=this.ts(e,o);return this.ns(e,u,r,s)?V.resolve(null):(We()<=q.DEBUG&&k("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),fe(e)),this.rs(t,u,e,Nl(s,-1)).next(l=>l))})}ts(t,e){let r=new ct(va(t));return e.forEach((s,o)=>{lr(t,o)&&(r=r.add(o))}),r}ns(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}Xi(t,e,r){return We()<=q.DEBUG&&k("QueryEngine","Using full collection scan to execute query:",fe(e)),this.Ji.getDocumentsMatchingQuery(t,e,Kt.min(),r)}rs(t,e,r,s){return this.Ji.getDocumentsMatchingQuery(t,r,s).next(o=>(e.forEach(u=>{o=o.insert(u.key,u)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(t,e,r,s){this.persistence=t,this.ss=e,this.serializer=s,this.os=new Y($),this._s=new Pe(o=>Pi(o),Vi),this.us=new Map,this.cs=t.getRemoteDocumentCache(),this.Ur=t.getTargetCache(),this.Gr=t.getBundleCache(),this.ls(r)}ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Kh(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.os))}}function sd(n,t,e,r){return new id(n,t,e,r)}async function qa(n,t){const e=F(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,e.ls(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{const u=[],l=[];let h=U();for(const f of s){u.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}for(const f of o){l.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(r,h).next(f=>({hs:f,removedBatchIds:u,addedBatchIds:l}))})})}function od(n,t){const e=F(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=t.batch.keys(),o=e.cs.newChangeBuffer({trackRemovals:!0});return function(l,h,f,m){const w=f.batch,R=w.keys();let S=V.resolve();return R.forEach(b=>{S=S.next(()=>m.getEntry(h,b)).next(O=>{const D=f.docVersions.get(b);z(D!==null),O.version.compareTo(D)<0&&(w.applyToRemoteDocument(O,f),O.isValidDocument()&&(O.setReadTime(f.commitVersion),m.addEntry(O)))})}),S.next(()=>l.mutationQueue.removeMutationBatch(h,w))}(e,r,t,o).next(()=>o.apply(r)).next(()=>e.mutationQueue.performConsistencyCheck(r)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let h=U();for(let f=0;f<l.mutationResults.length;++f)l.mutationResults[f].transformResults.length>0&&(h=h.add(l.batch.mutations[f].key));return h}(t))).next(()=>e.localDocuments.getDocuments(r,s))})}function ja(n){const t=F(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Ur.getLastRemoteSnapshotVersion(e))}function ad(n,t){const e=F(n),r=t.snapshotVersion;let s=e.os;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const u=e.cs.newChangeBuffer({trackRemovals:!0});s=e.os;const l=[];t.targetChanges.forEach((m,w)=>{const R=s.get(w);if(!R)return;l.push(e.Ur.removeMatchingKeys(o,m.removedDocuments,w).next(()=>e.Ur.addMatchingKeys(o,m.addedDocuments,w)));let S=R.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(w)!==null?S=S.withResumeToken(lt.EMPTY_BYTE_STRING,L.min()).withLastLimboFreeSnapshotVersion(L.min()):m.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(m.resumeToken,r)),s=s.insert(w,S),function(O,D,G){return O.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=3e8?!0:G.addedDocuments.size+G.modifiedDocuments.size+G.removedDocuments.size>0}(R,S,m)&&l.push(e.Ur.updateTargetData(o,S))});let h=Lt(),f=U();if(t.documentUpdates.forEach(m=>{t.resolvedLimboDocuments.has(m)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))}),l.push(ud(o,u,t.documentUpdates).next(m=>{h=m.Ps,f=m.Is})),!r.isEqual(L.min())){const m=e.Ur.getLastRemoteSnapshotVersion(o).next(w=>e.Ur.setTargetsMetadata(o,o.currentSequenceNumber,r));l.push(m)}return V.waitFor(l).next(()=>u.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,f)).next(()=>h)}).then(o=>(e.os=s,o))}function ud(n,t,e){let r=U(),s=U();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let u=Lt();return e.forEach((l,h)=>{const f=o.get(l);h.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(l)),h.isNoDocument()&&h.version.isEqual(L.min())?(t.removeEntry(l,h.readTime),u=u.insert(l,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),u=u.insert(l,h)):k("LocalStore","Ignoring outdated watch update for ",l,". Current version:",f.version," Watch version:",h.version)}),{Ps:u,Is:s}})}function cd(n,t){const e=F(n);return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}function ld(n,t){const e=F(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return e.Ur.getTargetData(r,t).next(o=>o?(s=o,V.resolve(s)):e.Ur.allocateTargetId(r).next(u=>(s=new jt(t,u,"TargetPurposeListen",r.currentSequenceNumber),e.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=e.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.os=e.os.insert(r.targetId,r),e._s.set(t,r.targetId)),r})}async function mi(n,t,e){const r=F(n),s=r.os.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,u=>r.persistence.referenceDelegate.removeTarget(u,s))}catch(u){if(!dn(u))throw u;k("LocalStore",`Failed to update sequence numbers for target ${t}: ${u}`)}r.os=r.os.remove(t),r._s.delete(s.target)}function bo(n,t,e){const r=F(n);let s=L.min(),o=U();return r.persistence.runTransaction("Execute query","readwrite",u=>function(h,f,m){const w=F(h),R=w._s.get(m);return R!==void 0?V.resolve(w.os.get(R)):w.Ur.getTargetData(f,m)}(r,u,St(t)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(u,l.targetId).next(h=>{o=h})}).next(()=>r.ss.getDocumentsMatchingQuery(u,t,e?s:L.min(),e?o:U())).next(l=>(hd(r,eh(t),l),{documents:l,Ts:o})))}function hd(n,t,e){let r=n.us.get(t)||L.min();e.forEach((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.us.set(t,r)}class Do{constructor(){this.activeTargetIds=ah()}fs(t){this.activeTargetIds=this.activeTargetIds.add(t)}gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Vs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class dd{constructor(){this.so=new Do,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.so.fs(t),this.oo[t]||"not-current"}updateQueryState(t,e,r){this.oo[t]=e}removeLocalQueryTarget(t){this.so.gs(t)}isLocalQueryTarget(t){return this.so.activeTargetIds.has(t)}clearQueryState(t){delete this.oo[t]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(t){return this.so.activeTargetIds.has(t)}start(){return this.so=new Do,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{_o(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(t){this.ho.push(t)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){k("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.ho)t(0)}lo(){k("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.ho)t(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jn=null;function Xr(){return jn===null?jn=function(){return 268435456+Math.round(2147483648*Math.random())}():jn++,"0x"+jn.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pd={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class md{constructor(t){this.Io=t.Io,this.To=t.To}Eo(t){this.Ao=t}Ro(t){this.Vo=t}mo(t){this.fo=t}onMessage(t){this.po=t}close(){this.To()}send(t){this.Io(t)}yo(){this.Ao()}wo(){this.Vo()}So(t){this.fo(t)}bo(t){this.po(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt="WebChannelConnection";class gd extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const r=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+e.host,this.vo=`projects/${s}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${o}`}get Fo(){return!1}Mo(e,r,s,o,u){const l=Xr(),h=this.xo(e,r.toUriEncodedString());k("RestConnection",`Sending RPC '${e}' ${l}:`,h,s);const f={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(f,o,u),this.No(e,h,f,s).then(m=>(k("RestConnection",`Received RPC '${e}' ${l}: `,m),m),m=>{throw _e("RestConnection",`RPC '${e}' ${l} failed with error: `,m,"url: ",h,"request:",s),m})}Lo(e,r,s,o,u,l){return this.Mo(e,r,s,o,u)}Oo(e,r,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Re}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((o,u)=>e[u]=o),s&&s.headers.forEach((o,u)=>e[u]=o)}xo(e,r){const s=pd[e];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}No(t,e,r,s){const o=Xr();return new Promise((u,l)=>{const h=new ea;h.setWithCredentials(!0),h.listenOnce(na.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case zn.NO_ERROR:const m=h.getResponseJson();k(mt,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(m)),u(m);break;case zn.TIMEOUT:k(mt,`RPC '${t}' ${o} timed out`),l(new N(P.DEADLINE_EXCEEDED,"Request time out"));break;case zn.HTTP_ERROR:const w=h.getStatus();if(k(mt,`RPC '${t}' ${o} failed with status:`,w,"response text:",h.getResponseText()),w>0){let R=h.getResponseJson();Array.isArray(R)&&(R=R[0]);const S=R==null?void 0:R.error;if(S&&S.status&&S.message){const b=function(D){const G=D.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(G)>=0?G:P.UNKNOWN}(S.status);l(new N(b,S.message))}else l(new N(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new N(P.UNAVAILABLE,"Connection failed."));break;default:M()}}finally{k(mt,`RPC '${t}' ${o} completed.`)}});const f=JSON.stringify(s);k(mt,`RPC '${t}' ${o} sending request:`,s),h.send(e,"POST",f,r,15)})}Bo(t,e,r){const s=Xr(),o=[this.Do,"/","google.firestore.v1.Firestore","/",t,"/channel"],u=sa(),l=ia(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Oo(h.initMessageHeaders,e,r),h.encodeInitMessageHeaders=!0;const m=o.join("");k(mt,`Creating RPC '${t}' stream ${s}: ${m}`,h);const w=u.createWebChannel(m,h);let R=!1,S=!1;const b=new md({Io:D=>{S?k(mt,`Not sending because RPC '${t}' stream ${s} is closed:`,D):(R||(k(mt,`Opening RPC '${t}' stream ${s} transport.`),w.open(),R=!0),k(mt,`RPC '${t}' stream ${s} sending:`,D),w.send(D))},To:()=>w.close()}),O=(D,G,K)=>{D.listen(G,H=>{try{K(H)}catch(rt){setTimeout(()=>{throw rt},0)}})};return O(w,He.EventType.OPEN,()=>{S||(k(mt,`RPC '${t}' stream ${s} transport opened.`),b.yo())}),O(w,He.EventType.CLOSE,()=>{S||(S=!0,k(mt,`RPC '${t}' stream ${s} transport closed`),b.So())}),O(w,He.EventType.ERROR,D=>{S||(S=!0,_e(mt,`RPC '${t}' stream ${s} transport errored:`,D),b.So(new N(P.UNAVAILABLE,"The operation could not be completed")))}),O(w,He.EventType.MESSAGE,D=>{var G;if(!S){const K=D.data[0];z(!!K);const H=K,rt=H.error||((G=H[0])===null||G===void 0?void 0:G.error);if(rt){k(mt,`RPC '${t}' stream ${s} received error:`,rt);const Dt=rt.status;let st=function(_){const y=tt[_];if(y!==void 0)return Da(y)}(Dt),v=rt.message;st===void 0&&(st=P.INTERNAL,v="Unknown error status: "+Dt+" with message "+rt.message),S=!0,b.So(new N(st,v)),w.close()}else k(mt,`RPC '${t}' stream ${s} received:`,K),b.bo(K)}}),O(l,ra.STAT_EVENT,D=>{D.stat===ii.PROXY?k(mt,`RPC '${t}' stream ${s} detected buffering proxy`):D.stat===ii.NOPROXY&&k(mt,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{b.wo()},0),b}}function Yr(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mr(n){return new Ph(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a{constructor(t,e,r=1e3,s=1.5,o=6e4){this.ui=t,this.timerId=e,this.ko=r,this.qo=s,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(t){this.cancel();const e=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,e-r);s>0&&k("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),t())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class za{constructor(t,e,r,s,o,u,l,h){this.ui=t,this.Ho=r,this.Jo=s,this.connection=o,this.authCredentialsProvider=u,this.appCheckCredentialsProvider=l,this.listener=h,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new $a(t,e)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(t){this.u_(),this.stream.send(t)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(t,e){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,t!==4?this.t_.reset():e&&e.code===P.RESOURCE_EXHAUSTED?(Mt(e.toString()),Mt("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):e&&e.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.mo(e)}l_(){}auth(){this.state=1;const t=this.h_(this.Yo),e=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===e&&this.P_(r,s)},r=>{t(()=>{const s=new N(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(t,e){const r=this.h_(this.Yo);this.stream=this.T_(t,e),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(t){return k("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}h_(t){return e=>{this.ui.enqueueAndForget(()=>this.Yo===t?e():(k("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class _d extends za{constructor(t,e,r,s,o,u){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,u),this.serializer=o}T_(t,e){return this.connection.Bo("Listen",t,e)}E_(t){return this.onNext(t)}onNext(t){this.t_.reset();const e=Ch(this.serializer,t),r=function(o){if(!("targetChange"in o))return L.min();const u=o.targetChange;return u.targetIds&&u.targetIds.length?L.min():u.readTime?Ct(u.readTime):L.min()}(t);return this.listener.d_(e,r)}A_(t){const e={};e.database=pi(this.serializer),e.addTarget=function(o,u){let l;const h=u.target;if(l=ui(h)?{documents:Nh(o,h)}:{query:kh(o,h)._t},l.targetId=u.targetId,u.resumeToken.approximateByteSize()>0){l.resumeToken=Oa(o,u.resumeToken);const f=hi(o,u.expectedCount);f!==null&&(l.expectedCount=f)}else if(u.snapshotVersion.compareTo(L.min())>0){l.readTime=rr(o,u.snapshotVersion.toTimestamp());const f=hi(o,u.expectedCount);f!==null&&(l.expectedCount=f)}return l}(this.serializer,t);const r=xh(this.serializer,t);r&&(e.labels=r),this.a_(e)}R_(t){const e={};e.database=pi(this.serializer),e.removeTarget=t,this.a_(e)}}class yd extends za{constructor(t,e,r,s,o,u){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,u),this.serializer=o}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(t,e){return this.connection.Bo("Write",t,e)}E_(t){return z(!!t.streamToken),this.lastStreamToken=t.streamToken,z(!t.writeResults||t.writeResults.length===0),this.listener.f_()}onNext(t){z(!!t.streamToken),this.lastStreamToken=t.streamToken,this.t_.reset();const e=Dh(t.writeResults,t.commitTime),r=Ct(t.commitTime);return this.listener.g_(r,e)}p_(){const t={};t.database=pi(this.serializer),this.a_(t)}m_(t){const e={streamToken:this.lastStreamToken,writes:t.map(r=>bh(this.serializer,r))};this.a_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ed extends class{}{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(t,e,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,u])=>this.connection.Mo(t,di(e,r),s,o,u)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new N(P.UNKNOWN,o.toString())})}Lo(t,e,r,s,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([u,l])=>this.connection.Lo(t,di(e,r),s,u,l,o)).catch(u=>{throw u.name==="FirebaseError"?(u.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),u):new N(P.UNKNOWN,u.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class vd{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(t){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.C_("Offline")))}set(t){this.x_(),this.S_=0,t==="Online"&&(this.D_=!1),this.C_(t)}C_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}F_(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Mt(e),this.D_=!1):k("OnlineStateTracker",e)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Td{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(u=>{r.enqueueAndForget(async()=>{ue(this)&&(k("RemoteStore","Restarting streams for network reachability change."),await async function(h){const f=F(h);f.L_.add(4),await gn(f),f.q_.set("Unknown"),f.L_.delete(4),await gr(f)}(this))})}),this.q_=new vd(r,s)}}async function gr(n){if(ue(n))for(const t of n.B_)await t(!0)}async function gn(n){for(const t of n.B_)await t(!1)}function Ga(n,t){const e=F(n);e.N_.has(t.targetId)||(e.N_.set(t.targetId,t),Fi(e)?Li(e):Ve(e).r_()&&Mi(e,t))}function xi(n,t){const e=F(n),r=Ve(e);e.N_.delete(t),r.r_()&&Ka(e,t),e.N_.size===0&&(r.r_()?r.o_():ue(e)&&e.q_.set("Unknown"))}function Mi(n,t){if(n.Q_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(L.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Ve(n).A_(t)}function Ka(n,t){n.Q_.xe(t),Ve(n).R_(t)}function Li(n){n.Q_=new Ih({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),ot:t=>n.N_.get(t)||null,tt:()=>n.datastore.serializer.databaseId}),Ve(n).start(),n.q_.v_()}function Fi(n){return ue(n)&&!Ve(n).n_()&&n.N_.size>0}function ue(n){return F(n).L_.size===0}function Wa(n){n.Q_=void 0}async function Id(n){n.q_.set("Online")}async function wd(n){n.N_.forEach((t,e)=>{Mi(n,t)})}async function Ad(n,t){Wa(n),Fi(n)?(n.q_.M_(t),Li(n)):n.q_.set("Unknown")}async function Rd(n,t,e){if(n.q_.set("Online"),t instanceof ka&&t.state===2&&t.cause)try{await async function(s,o){const u=o.cause;for(const l of o.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,u),s.N_.delete(l),s.Q_.removeTarget(l))}(n,t)}catch(r){k("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),r),await ir(n,r)}else if(t instanceof Wn?n.Q_.Ke(t):t instanceof Na?n.Q_.He(t):n.Q_.We(t),!e.isEqual(L.min()))try{const r=await ja(n.localStore);e.compareTo(r)>=0&&await function(o,u){const l=o.Q_.rt(u);return l.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const m=o.N_.get(f);m&&o.N_.set(f,m.withResumeToken(h.resumeToken,u))}}),l.targetMismatches.forEach((h,f)=>{const m=o.N_.get(h);if(!m)return;o.N_.set(h,m.withResumeToken(lt.EMPTY_BYTE_STRING,m.snapshotVersion)),Ka(o,h);const w=new jt(m.target,h,f,m.sequenceNumber);Mi(o,w)}),o.remoteSyncer.applyRemoteEvent(l)}(n,e)}catch(r){k("RemoteStore","Failed to raise snapshot:",r),await ir(n,r)}}async function ir(n,t,e){if(!dn(t))throw t;n.L_.add(1),await gn(n),n.q_.set("Offline"),e||(e=()=>ja(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{k("RemoteStore","Retrying IndexedDB access"),await e(),n.L_.delete(1),await gr(n)})}function Ha(n,t){return t().catch(e=>ir(n,e,t))}async function _r(n){const t=F(n),e=Ht(t);let r=t.O_.length>0?t.O_[t.O_.length-1].batchId:-1;for(;Pd(t);)try{const s=await cd(t.localStore,r);if(s===null){t.O_.length===0&&e.o_();break}r=s.batchId,Vd(t,s)}catch(s){await ir(t,s)}Qa(t)&&Xa(t)}function Pd(n){return ue(n)&&n.O_.length<10}function Vd(n,t){n.O_.push(t);const e=Ht(n);e.r_()&&e.V_&&e.m_(t.mutations)}function Qa(n){return ue(n)&&!Ht(n).n_()&&n.O_.length>0}function Xa(n){Ht(n).start()}async function Sd(n){Ht(n).p_()}async function Cd(n){const t=Ht(n);for(const e of n.O_)t.m_(e.mutations)}async function bd(n,t,e){const r=n.O_.shift(),s=Ci.from(r,t,e);await Ha(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await _r(n)}async function Dd(n,t){t&&Ht(n).V_&&await async function(r,s){if(function(u){return Eh(u)&&u!==P.ABORTED}(s.code)){const o=r.O_.shift();Ht(r).s_(),await Ha(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s)),await _r(r)}}(n,t),Qa(n)&&Xa(n)}async function ko(n,t){const e=F(n);e.asyncQueue.verifyOperationInProgress(),k("RemoteStore","RemoteStore received new credentials");const r=ue(e);e.L_.add(3),await gn(e),r&&e.q_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.L_.delete(3),await gr(e)}async function Nd(n,t){const e=F(n);t?(e.L_.delete(2),await gr(e)):t||(e.L_.add(2),await gn(e),e.q_.set("Unknown"))}function Ve(n){return n.K_||(n.K_=function(e,r,s){const o=F(e);return o.w_(),new _d(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Eo:Id.bind(null,n),Ro:wd.bind(null,n),mo:Ad.bind(null,n),d_:Rd.bind(null,n)}),n.B_.push(async t=>{t?(n.K_.s_(),Fi(n)?Li(n):n.q_.set("Unknown")):(await n.K_.stop(),Wa(n))})),n.K_}function Ht(n){return n.U_||(n.U_=function(e,r,s){const o=F(e);return o.w_(),new yd(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:Sd.bind(null,n),mo:Dd.bind(null,n),f_:Cd.bind(null,n),g_:bd.bind(null,n)}),n.B_.push(async t=>{t?(n.U_.s_(),await _r(n)):(await n.U_.stop(),n.O_.length>0&&(k("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ui{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new zt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(u=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const u=Date.now()+r,l=new Ui(t,e,u,s,o);return l.start(r),l}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(P.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Bi(n,t){if(Mt("AsyncQueue",`${t}: ${n}`),dn(n))return new N(P.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(t){this.comparator=t?(e,r)=>t(e,r)||x.comparator(e.key,r.key):(e,r)=>x.comparator(e.key,r.key),this.keyedMap=Qe(),this.sortedSet=new Y(this.comparator)}static emptySet(t){return new ge(t.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof ge)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new ge;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(){this.W_=new Y(x.comparator)}track(t){const e=t.doc.key,r=this.W_.get(e);r?t.type!==0&&r.type===3?this.W_=this.W_.insert(e,t):t.type===3&&r.type!==1?this.W_=this.W_.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.W_=this.W_.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.W_=this.W_.remove(e):t.type===1&&r.type===2?this.W_=this.W_.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):M():this.W_=this.W_.insert(e,t)}G_(){const t=[];return this.W_.inorderTraversal((e,r)=>{t.push(r)}),t}}class Ie{constructor(t,e,r,s,o,u,l,h,f){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=u,this.syncStateChanged=l,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,r,s,o){const u=[];return e.forEach(l=>{u.push({type:0,doc:l})}),new Ie(t,e,ge.emptySet(e),u,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&cr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kd{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(t=>t.J_())}}class Od{constructor(){this.queries=xo(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(e,r){const s=F(e),o=s.queries;s.queries=xo(),o.forEach((u,l)=>{for(const h of l.j_)h.onError(r)})})(this,new N(P.ABORTED,"Firestore shutting down"))}}function xo(){return new Pe(n=>Ea(n),cr)}async function xd(n,t){const e=F(n);let r=3;const s=t.query;let o=e.queries.get(s);o?!o.H_()&&t.J_()&&(r=2):(o=new kd,r=t.J_()?0:1);try{switch(r){case 0:o.z_=await e.onListen(s,!0);break;case 1:o.z_=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(u){const l=Bi(u,`Initialization of query '${fe(t.query)}' failed`);return void t.onError(l)}e.queries.set(s,o),o.j_.push(t),t.Z_(e.onlineState),o.z_&&t.X_(o.z_)&&qi(e)}async function Md(n,t){const e=F(n),r=t.query;let s=3;const o=e.queries.get(r);if(o){const u=o.j_.indexOf(t);u>=0&&(o.j_.splice(u,1),o.j_.length===0?s=t.J_()?0:1:!o.H_()&&t.J_()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function Ld(n,t){const e=F(n);let r=!1;for(const s of t){const o=s.query,u=e.queries.get(o);if(u){for(const l of u.j_)l.X_(s)&&(r=!0);u.z_=s}}r&&qi(e)}function Fd(n,t,e){const r=F(n),s=r.queries.get(t);if(s)for(const o of s.j_)o.onError(e);r.queries.delete(t)}function qi(n){n.Y_.forEach(t=>{t.next()})}var gi,Mo;(Mo=gi||(gi={})).ea="default",Mo.Cache="cache";class Ud{constructor(t,e,r){this.query=t,this.ta=e,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new Ie(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.na?this.ia(t)&&(this.ta.next(t),e=!0):this.sa(t,this.onlineState)&&(this.oa(t),e=!0),this.ra=t,e}onError(t){this.ta.error(t)}Z_(t){this.onlineState=t;let e=!1;return this.ra&&!this.na&&this.sa(this.ra,t)&&(this.oa(this.ra),e=!0),e}sa(t,e){if(!t.fromCache||!this.J_())return!0;const r=e!=="Offline";return(!this.options._a||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}ia(t){if(t.docChanges.length>0)return!0;const e=this.ra&&this.ra.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}oa(t){t=Ie.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.na=!0,this.ta.next(t)}J_(){return this.options.source!==gi.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ya{constructor(t){this.key=t}}class Ja{constructor(t){this.key=t}}class Bd{constructor(t,e){this.query=t,this.Ta=e,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=U(),this.mutatedKeys=U(),this.Aa=va(t),this.Ra=new ge(this.Aa)}get Va(){return this.Ta}ma(t,e){const r=e?e.fa:new Oo,s=e?e.Ra:this.Ra;let o=e?e.mutatedKeys:this.mutatedKeys,u=s,l=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,f=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((m,w)=>{const R=s.get(m),S=lr(this.query,w)?w:null,b=!!R&&this.mutatedKeys.has(R.key),O=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let D=!1;R&&S?R.data.isEqual(S.data)?b!==O&&(r.track({type:3,doc:S}),D=!0):this.ga(R,S)||(r.track({type:2,doc:S}),D=!0,(h&&this.Aa(S,h)>0||f&&this.Aa(S,f)<0)&&(l=!0)):!R&&S?(r.track({type:0,doc:S}),D=!0):R&&!S&&(r.track({type:1,doc:R}),D=!0,(h||f)&&(l=!0)),D&&(S?(u=u.add(S),o=O?o.add(m):o.delete(m)):(u=u.delete(m),o=o.delete(m)))}),this.query.limit!==null)for(;u.size>this.query.limit;){const m=this.query.limitType==="F"?u.last():u.first();u=u.delete(m.key),o=o.delete(m.key),r.track({type:1,doc:m})}return{Ra:u,fa:r,ns:l,mutatedKeys:o}}ga(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const o=this.Ra;this.Ra=t.Ra,this.mutatedKeys=t.mutatedKeys;const u=t.fa.G_();u.sort((m,w)=>function(S,b){const O=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M()}};return O(S)-O(b)}(m.type,w.type)||this.Aa(m.doc,w.doc)),this.pa(r),s=s!=null&&s;const l=e&&!s?this.ya():[],h=this.da.size===0&&this.current&&!s?1:0,f=h!==this.Ea;return this.Ea=h,u.length!==0||f?{snapshot:new Ie(this.query,t.Ra,o,u,t.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Oo,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(t){return!this.Ta.has(t)&&!!this.Ra.has(t)&&!this.Ra.get(t).hasLocalMutations}pa(t){t&&(t.addedDocuments.forEach(e=>this.Ta=this.Ta.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ta=this.Ta.delete(e)),this.current=t.current)}ya(){if(!this.current)return[];const t=this.da;this.da=U(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const e=[];return t.forEach(r=>{this.da.has(r)||e.push(new Ja(r))}),this.da.forEach(r=>{t.has(r)||e.push(new Ya(r))}),e}ba(t){this.Ta=t.Ts,this.da=U();const e=this.ma(t.documents);return this.applyChanges(e,!0)}Da(){return Ie.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class qd{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class jd{constructor(t){this.key=t,this.va=!1}}class $d{constructor(t,e,r,s,o,u){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=u,this.Ca={},this.Fa=new Pe(l=>Ea(l),cr),this.Ma=new Map,this.xa=new Set,this.Oa=new Y(x.comparator),this.Na=new Map,this.La=new Ni,this.Ba={},this.ka=new Map,this.qa=Te.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function zd(n,t,e=!0){const r=iu(n);let s;const o=r.Fa.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.Da()):s=await Za(r,t,e,!0),s}async function Gd(n,t){const e=iu(n);await Za(e,t,!0,!1)}async function Za(n,t,e,r){const s=await ld(n.localStore,St(t)),o=s.targetId,u=n.sharedClientState.addLocalQueryTarget(o,e);let l;return r&&(l=await Kd(n,t,o,u==="current",s.resumeToken)),n.isPrimaryClient&&e&&Ga(n.remoteStore,s),l}async function Kd(n,t,e,r,s){n.Ka=(w,R,S)=>async function(O,D,G,K){let H=D.view.ma(G);H.ns&&(H=await bo(O.localStore,D.query,!1).then(({documents:v})=>D.view.ma(v,H)));const rt=K&&K.targetChanges.get(D.targetId),Dt=K&&K.targetMismatches.get(D.targetId)!=null,st=D.view.applyChanges(H,O.isPrimaryClient,rt,Dt);return Fo(O,D.targetId,st.wa),st.snapshot}(n,w,R,S);const o=await bo(n.localStore,t,!0),u=new Bd(t,o.Ts),l=u.ma(o.documents),h=mn.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),f=u.applyChanges(l,n.isPrimaryClient,h);Fo(n,e,f.wa);const m=new qd(t,e,u);return n.Fa.set(t,m),n.Ma.has(e)?n.Ma.get(e).push(t):n.Ma.set(e,[t]),f.snapshot}async function Wd(n,t,e){const r=F(n),s=r.Fa.get(t),o=r.Ma.get(s.targetId);if(o.length>1)return r.Ma.set(s.targetId,o.filter(u=>!cr(u,t))),void r.Fa.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await mi(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),e&&xi(r.remoteStore,s.targetId),_i(r,s.targetId)}).catch(hn)):(_i(r,s.targetId),await mi(r.localStore,s.targetId,!0))}async function Hd(n,t){const e=F(n),r=e.Fa.get(t),s=e.Ma.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),xi(e.remoteStore,r.targetId))}async function Qd(n,t,e){const r=nf(n);try{const s=await function(u,l){const h=F(u),f=nt.now(),m=l.reduce((S,b)=>S.add(b.key),U());let w,R;return h.persistence.runTransaction("Locally write mutations","readwrite",S=>{let b=Lt(),O=U();return h.cs.getEntries(S,m).next(D=>{b=D,b.forEach((G,K)=>{K.isValidDocument()||(O=O.add(G))})}).next(()=>h.localDocuments.getOverlayedDocuments(S,b)).next(D=>{w=D;const G=[];for(const K of l){const H=ph(K,w.get(K.key).overlayedDocument);H!=null&&G.push(new Xt(K.key,H,la(H.value.mapValue),Tt.exists(!0)))}return h.mutationQueue.addMutationBatch(S,f,G,l)}).next(D=>{R=D;const G=D.applyToLocalDocumentSet(w,O);return h.documentOverlayCache.saveOverlays(S,D.batchId,G)})}).then(()=>({batchId:R.batchId,changes:Ia(w)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),function(u,l,h){let f=u.Ba[u.currentUser.toKey()];f||(f=new Y($)),f=f.insert(l,h),u.Ba[u.currentUser.toKey()]=f}(r,s.batchId,e),await _n(r,s.changes),await _r(r.remoteStore)}catch(s){const o=Bi(s,"Failed to persist write");e.reject(o)}}async function tu(n,t){const e=F(n);try{const r=await ad(e.localStore,t);t.targetChanges.forEach((s,o)=>{const u=e.Na.get(o);u&&(z(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?u.va=!0:s.modifiedDocuments.size>0?z(u.va):s.removedDocuments.size>0&&(z(u.va),u.va=!1))}),await _n(e,r,t)}catch(r){await hn(r)}}function Lo(n,t,e){const r=F(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Fa.forEach((o,u)=>{const l=u.view.Z_(t);l.snapshot&&s.push(l.snapshot)}),function(u,l){const h=F(u);h.onlineState=l;let f=!1;h.queries.forEach((m,w)=>{for(const R of w.j_)R.Z_(l)&&(f=!0)}),f&&qi(h)}(r.eventManager,t),s.length&&r.Ca.d_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Xd(n,t,e){const r=F(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Na.get(t),o=s&&s.key;if(o){let u=new Y(x.comparator);u=u.insert(o,_t.newNoDocument(o,L.min()));const l=U().add(o),h=new pr(L.min(),new Map,new Y($),u,l);await tu(r,h),r.Oa=r.Oa.remove(o),r.Na.delete(t),ji(r)}else await mi(r.localStore,t,!1).then(()=>_i(r,t,e)).catch(hn)}async function Yd(n,t){const e=F(n),r=t.batch.batchId;try{const s=await od(e.localStore,t);nu(e,r,null),eu(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await _n(e,s)}catch(s){await hn(s)}}async function Jd(n,t,e){const r=F(n);try{const s=await function(u,l){const h=F(u);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let m;return h.mutationQueue.lookupMutationBatch(f,l).next(w=>(z(w!==null),m=w.keys(),h.mutationQueue.removeMutationBatch(f,w))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,m,l)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,m)).next(()=>h.localDocuments.getDocuments(f,m))})}(r.localStore,t);nu(r,t,e),eu(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await _n(r,s)}catch(s){await hn(s)}}function eu(n,t){(n.ka.get(t)||[]).forEach(e=>{e.resolve()}),n.ka.delete(t)}function nu(n,t,e){const r=F(n);let s=r.Ba[r.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),r.Ba[r.currentUser.toKey()]=s}}function _i(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Ma.get(t))n.Fa.delete(r),e&&n.Ca.$a(r,e);n.Ma.delete(t),n.isPrimaryClient&&n.La.gr(t).forEach(r=>{n.La.containsKey(r)||ru(n,r)})}function ru(n,t){n.xa.delete(t.path.canonicalString());const e=n.Oa.get(t);e!==null&&(xi(n.remoteStore,e),n.Oa=n.Oa.remove(t),n.Na.delete(e),ji(n))}function Fo(n,t,e){for(const r of e)r instanceof Ya?(n.La.addReference(r.key,t),Zd(n,r)):r instanceof Ja?(k("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,t),n.La.containsKey(r.key)||ru(n,r.key)):M()}function Zd(n,t){const e=t.key,r=e.path.canonicalString();n.Oa.get(e)||n.xa.has(r)||(k("SyncEngine","New document in limbo: "+e),n.xa.add(r),ji(n))}function ji(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const t=n.xa.values().next().value;n.xa.delete(t);const e=new x(X.fromString(t)),r=n.qa.next();n.Na.set(r,new jd(e)),n.Oa=n.Oa.insert(e,r),Ga(n.remoteStore,new jt(St(_a(e.path)),r,"TargetPurposeLimboResolution",Ii.oe))}}async function _n(n,t,e){const r=F(n),s=[],o=[],u=[];r.Fa.isEmpty()||(r.Fa.forEach((l,h)=>{u.push(r.Ka(h,t,e).then(f=>{var m;if((f||e)&&r.isPrimaryClient){const w=f?!f.fromCache:(m=e==null?void 0:e.targetChanges.get(h.targetId))===null||m===void 0?void 0:m.current;r.sharedClientState.updateQueryState(h.targetId,w?"current":"not-current")}if(f){s.push(f);const w=Oi.Wi(h.targetId,f);o.push(w)}}))}),await Promise.all(u),r.Ca.d_(s),await async function(h,f){const m=F(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",w=>V.forEach(f,R=>V.forEach(R.$i,S=>m.persistence.referenceDelegate.addReference(w,R.targetId,S)).next(()=>V.forEach(R.Ui,S=>m.persistence.referenceDelegate.removeReference(w,R.targetId,S)))))}catch(w){if(!dn(w))throw w;k("LocalStore","Failed to update sequence numbers: "+w)}for(const w of f){const R=w.targetId;if(!w.fromCache){const S=m.os.get(R),b=S.snapshotVersion,O=S.withLastLimboFreeSnapshotVersion(b);m.os=m.os.insert(R,O)}}}(r.localStore,o))}async function tf(n,t){const e=F(n);if(!e.currentUser.isEqual(t)){k("SyncEngine","User change. New user:",t.toKey());const r=await qa(e.localStore,t);e.currentUser=t,function(o,u){o.ka.forEach(l=>{l.forEach(h=>{h.reject(new N(P.CANCELLED,u))})}),o.ka.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await _n(e,r.hs)}}function ef(n,t){const e=F(n),r=e.Na.get(t);if(r&&r.va)return U().add(r.key);{let s=U();const o=e.Ma.get(t);if(!o)return s;for(const u of o){const l=e.Fa.get(u);s=s.unionWith(l.view.Va)}return s}}function iu(n){const t=F(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=tu.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=ef.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Xd.bind(null,t),t.Ca.d_=Ld.bind(null,t.eventManager),t.Ca.$a=Fd.bind(null,t.eventManager),t}function nf(n){const t=F(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Yd.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Jd.bind(null,t),t}class sr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=mr(t.databaseInfo.databaseId),this.sharedClientState=this.Wa(t),this.persistence=this.Ga(t),await this.persistence.start(),this.localStore=this.za(t),this.gcScheduler=this.ja(t,this.localStore),this.indexBackfillerScheduler=this.Ha(t,this.localStore)}ja(t,e){return null}Ha(t,e){return null}za(t){return sd(this.persistence,new rd,t.initialUser,this.serializer)}Ga(t){return new td(ki.Zr,this.serializer)}Wa(t){return new dd}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}sr.provider={build:()=>new sr};class yi{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Lo(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=tf.bind(null,this.syncEngine),await Nd(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new Od}()}createDatastore(t){const e=mr(t.databaseInfo.databaseId),r=function(o){return new gd(o)}(t.databaseInfo);return function(o,u,l,h){return new Ed(o,u,l,h)}(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,s,o,u,l){return new Td(r,s,o,u,l)}(this.localStore,this.datastore,t.asyncQueue,e=>Lo(this.syncEngine,e,0),function(){return No.D()?new No:new fd}())}createSyncEngine(t,e){return function(s,o,u,l,h,f,m){const w=new $d(s,o,u,l,h,f);return m&&(w.Qa=!0),w}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const o=F(s);k("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await gn(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}yi.provider={build:()=>new yi};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ya(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ya(this.observer.error,t):Mt("Uncaught Error in snapshot listener:",t.toString()))}Za(){this.muted=!0}Ya(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=s,this.user=gt.UNAUTHENTICATED,this.clientId=aa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async u=>{k("FirestoreClient","Received user=",u.uid),await this.authCredentialListener(u),this.user=u}),this.appCheckCredentials.start(r,u=>(k("FirestoreClient","Received new app check token=",u),this.appCheckCredentialListener(u,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new zt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Bi(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function Jr(n,t){n.asyncQueue.verifyOperationInProgress(),k("FirestoreClient","Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await qa(t.localStore,s),r=s)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function Uo(n,t){n.asyncQueue.verifyOperationInProgress();const e=await of(n);k("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>ko(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>ko(t.remoteStore,s)),n._onlineComponents=t}async function of(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){k("FirestoreClient","Using user provided OfflineComponentProvider");try{await Jr(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;_e("Error using user provided cache. Falling back to memory cache: "+e),await Jr(n,new sr)}}else k("FirestoreClient","Using default OfflineComponentProvider"),await Jr(n,new sr);return n._offlineComponents}async function su(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(k("FirestoreClient","Using user provided OnlineComponentProvider"),await Uo(n,n._uninitializedComponentsProvider._online)):(k("FirestoreClient","Using default OnlineComponentProvider"),await Uo(n,new yi))),n._onlineComponents}function af(n){return su(n).then(t=>t.syncEngine)}async function uf(n){const t=await su(n),e=t.eventManager;return e.onListen=zd.bind(null,t.syncEngine),e.onUnlisten=Wd.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Gd.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Hd.bind(null,t.syncEngine),e}function cf(n,t,e={}){const r=new zt;return n.asyncQueue.enqueueAndForget(async()=>function(o,u,l,h,f){const m=new rf({next:R=>{m.Za(),u.enqueueAndForget(()=>Md(o,w)),R.fromCache&&h.source==="server"?f.reject(new N(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):f.resolve(R)},error:R=>f.reject(R)}),w=new Ud(l,m,{includeMetadataChanges:!0,_a:!0});return xd(o,w)}(await uf(n),n.asyncQueue,t,e,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ou(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bo=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function au(n,t,e){if(!e)throw new N(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function lf(n,t,e,r){if(t===!0&&r===!0)throw new N(P.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function qo(n){if(!x.isDocumentKey(n))throw new N(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function jo(n){if(x.isDocumentKey(n))throw new N(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function yr(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":M()}function Qt(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new N(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=yr(n);throw new N(P.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(t){var e,r;if(t.host===void 0){if(t.ssl!==void 0)throw new N(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(e=t.ssl)===null||e===void 0||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new N(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}lf("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ou((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Er{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new $o({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new N(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new $o(t),t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new wl;switch(r.type){case"firstParty":return new Vl(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new N(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=Bo.get(e);r&&(k("ComponentProvider","Removing Datastore"),Bo.delete(e),r.terminate())}(this),Promise.resolve()}}function hf(n,t,e,r={}){var s;const o=(n=Qt(n,Er))._getSettings(),u=`${t}:${e}`;if(o.host!=="firestore.googleapis.com"&&o.host!==u&&_e("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:u,ssl:!1})),r.mockUserToken){let l,h;if(typeof r.mockUserToken=="string")l=r.mockUserToken,h=gt.MOCK_USER;else{l=fc(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const f=r.mockUserToken.sub||r.mockUserToken.user_id;if(!f)throw new N(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new gt(f)}n._authCredentials=new Al(new oa(l,h))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Se(this.firestore,t,this._query)}}class At{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Gt(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new At(this.firestore,t,this._key)}}class Gt extends Se{constructor(t,e,r){super(t,e,_a(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new At(this.firestore,null,new x(t))}withConverter(t){return new Gt(this.firestore,t,this._path)}}function jf(n,t,...e){if(n=Pt(n),au("collection","path",t),n instanceof Er){const r=X.fromString(t,...e);return jo(r),new Gt(n,null,r)}{if(!(n instanceof At||n instanceof Gt))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(X.fromString(t,...e));return jo(r),new Gt(n.firestore,null,r)}}function df(n,t,...e){if(n=Pt(n),arguments.length===1&&(t=aa.newId()),au("doc","path",t),n instanceof Er){const r=X.fromString(t,...e);return qo(r),new At(n,null,new x(r))}{if(!(n instanceof At||n instanceof Gt))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(X.fromString(t,...e));return qo(r),new At(n.firestore,n instanceof Gt?n.converter:null,new x(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zo{constructor(t=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new $a(this,"async_queue_retry"),this.Vu=()=>{const r=Yr();r&&k("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=t;const e=Yr();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.fu(),this.gu(t)}enterRestrictedMode(t){if(!this.Iu){this.Iu=!0,this.Au=t||!1;const e=Yr();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.Vu)}}enqueue(t){if(this.fu(),this.Iu)return new Promise(()=>{});const e=new zt;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Pu.push(t),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(t){if(!dn(t))throw t;k("AsyncQueue","Operation failed with retryable error: "+t)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(t){const e=this.mu.then(()=>(this.du=!0,t().catch(r=>{this.Eu=r,this.du=!1;const s=function(u){let l=u.message||"";return u.stack&&(l=u.stack.includes(u.message)?u.stack:u.message+`
`+u.stack),l}(r);throw Mt("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=e,e}enqueueAfterDelay(t,e,r){this.fu(),this.Ru.indexOf(t)>-1&&(e=0);const s=Ui.createAndSchedule(this,t,e,r,o=>this.yu(o));return this.Tu.push(s),s}fu(){this.Eu&&M()}verifyOperationInProgress(){}async wu(){let t;do t=this.mu,await t;while(t!==this.mu)}Su(t){for(const e of this.Tu)if(e.timerId===t)return!0;return!1}bu(t){return this.wu().then(()=>{this.Tu.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.Tu)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.wu()})}Du(t){this.Ru.push(t)}yu(t){const e=this.Tu.indexOf(t);this.Tu.splice(e,1)}}class Ce extends Er{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new zo,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new zo(t),this._firestoreClient=void 0,await t}}}function $f(n,t){const e=typeof n=="object"?n:fl(),r=typeof n=="string"?n:"(default)",s=ul(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=hc("firestore");o&&hf(s,...o)}return s}function $i(n){if(n._terminated)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||ff(n),n._firestoreClient}function ff(n){var t,e,r;const s=n._freezeSettings(),o=function(l,h,f,m){return new Bl(l,h,f,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,ou(m.experimentalLongPollingOptions),m.useFetchStreams)}(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((e=s.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new sf(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(l){const h=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(h),_online:h}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(t){this._byteString=t}static fromBase64String(t){try{return new we(lt.fromBase64String(t))}catch(e){throw new N(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new we(lt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new N(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ut(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new N(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new N(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return $(this._lat,t._lat)||$(this._long,t._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ki{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0}(this._values,t._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pf=/^__.*__$/;class mf{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new Xt(t,this.data,this.fieldMask,e,this.fieldTransforms):new pn(t,this.data,e,this.fieldTransforms)}}class uu{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new Xt(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function cu(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M()}}class Wi{constructor(t,e,r,s,o,u){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.vu(),this.fieldTransforms=o||[],this.fieldMask=u||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(t){return new Wi(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Fu({path:r,xu:!1});return s.Ou(t),s}Nu(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(t){return this.Fu({path:void 0,xu:!0})}Bu(t){return or(t,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}vu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Ou(this.path.get(t))}Ou(t){if(t.length===0)throw this.Bu("Document fields must not be empty");if(cu(this.Cu)&&pf.test(t))throw this.Bu('Document fields cannot begin and end with "__"')}}class gf{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||mr(t)}Qu(t,e,r,s=!1){return new Wi({Cu:t,methodName:e,qu:r,path:ut.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function vr(n){const t=n._freezeSettings(),e=mr(n._databaseId);return new gf(n._databaseId,!!t.ignoreUndefinedProperties,e)}function lu(n,t,e,r,s,o={}){const u=n.Qu(o.merge||o.mergeFields?2:0,t,e,s);Hi("Data must be an object, but it was:",u,r);const l=fu(r,u);let h,f;if(o.merge)h=new wt(u.fieldMask),f=u.fieldTransforms;else if(o.mergeFields){const m=[];for(const w of o.mergeFields){const R=Ei(t,w,e);if(!u.contains(R))throw new N(P.INVALID_ARGUMENT,`Field '${R}' is specified in your field mask but missing from your input data.`);mu(m,R)||m.push(R)}h=new wt(m),f=u.fieldTransforms.filter(w=>h.covers(w.field))}else h=null,f=u.fieldTransforms;return new mf(new vt(l),h,f)}class Tr extends zi{_toFieldTransform(t){if(t.Cu!==2)throw t.Cu===1?t.Bu(`${this._methodName}() can only appear at the top level of your update data`):t.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Tr}}function hu(n,t,e,r){const s=n.Qu(1,t,e);Hi("Data must be an object, but it was:",s,r);const o=[],u=vt.empty();ae(r,(h,f)=>{const m=Qi(t,h,e);f=Pt(f);const w=s.Nu(m);if(f instanceof Tr)o.push(m);else{const R=En(f,w);R!=null&&(o.push(m),u.set(m,R))}});const l=new wt(o);return new uu(u,l,s.fieldTransforms)}function du(n,t,e,r,s,o){const u=n.Qu(1,t,e),l=[Ei(t,r,e)],h=[s];if(o.length%2!=0)throw new N(P.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let R=0;R<o.length;R+=2)l.push(Ei(t,o[R])),h.push(o[R+1]);const f=[],m=vt.empty();for(let R=l.length-1;R>=0;--R)if(!mu(f,l[R])){const S=l[R];let b=h[R];b=Pt(b);const O=u.Nu(S);if(b instanceof Tr)f.push(S);else{const D=En(b,O);D!=null&&(f.push(S),m.set(S,D))}}const w=new wt(f);return new uu(m,w,u.fieldTransforms)}function _f(n,t,e,r=!1){return En(e,n.Qu(r?4:3,t))}function En(n,t){if(pu(n=Pt(n)))return Hi("Unsupported field value:",t,n),fu(n,t);if(n instanceof zi)return function(r,s){if(!cu(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.xu&&t.Cu!==4)throw t.Bu("Nested arrays are not supported");return function(r,s){const o=[];let u=0;for(const l of r){let h=En(l,s.Lu(u));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),u++}return{arrayValue:{values:o}}}(n,t)}return function(r,s){if((r=Pt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return uh(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=nt.fromDate(r);return{timestampValue:rr(s.serializer,o)}}if(r instanceof nt){const o=new nt(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:rr(s.serializer,o)}}if(r instanceof Gi)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof we)return{bytesValue:Oa(s.serializer,r._byteString)};if(r instanceof At){const o=s.databaseId,u=r.firestore._databaseId;if(!u.isEqual(o))throw s.Bu(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Di(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Ki)return function(u,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:u.toArray().map(h=>{if(typeof h!="number")throw l.Bu("VectorValues must only contain numeric values.");return Si(l.serializer,h)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${yr(r)}`)}(n,t)}function fu(n,t){const e={};return ua(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ae(n,(r,s)=>{const o=En(s,t.Mu(r));o!=null&&(e[r]=o)}),{mapValue:{fields:e}}}function pu(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof nt||n instanceof Gi||n instanceof we||n instanceof At||n instanceof zi||n instanceof Ki)}function Hi(n,t,e){if(!pu(e)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(e)){const r=yr(e);throw r==="an object"?t.Bu(n+" a custom object"):t.Bu(n+" "+r)}}function Ei(n,t,e){if((t=Pt(t))instanceof yn)return t._internalPath;if(typeof t=="string")return Qi(n,t);throw or("Field path arguments must be of type string or ",n,!1,void 0,e)}const yf=new RegExp("[~\\*/\\[\\]]");function Qi(n,t,e){if(t.search(yf)>=0)throw or(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new yn(...t.split("."))._internalPath}catch{throw or(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function or(n,t,e,r,s){const o=r&&!r.isEmpty(),u=s!==void 0;let l=`Function ${t}() called with invalid data`;e&&(l+=" (via `toFirestore()`)"),l+=". ";let h="";return(o||u)&&(h+=" (found",o&&(h+=` in field ${r}`),u&&(h+=` in document ${s}`),h+=")"),new N(P.INVALID_ARGUMENT,l+n+h)}function mu(n,t){return n.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gu{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new At(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Ef(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(_u("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Ef extends gu{data(){return super.data()}}function _u(n,t){return typeof t=="string"?Qi(n,t):t instanceof yn?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vf(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new N(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Xi{}class Tf extends Xi{}function zf(n,t,...e){let r=[];t instanceof Xi&&r.push(t),r=r.concat(e),function(o){const u=o.filter(h=>h instanceof Ji).length,l=o.filter(h=>h instanceof Yi).length;if(u>1||u>0&&l>0)throw new N(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Yi extends Tf{constructor(t,e,r){super(),this._field=t,this._op=e,this._value=r,this.type="where"}static _create(t,e,r){return new Yi(t,e,r)}_apply(t){const e=this._parse(t);return yu(t._query,e),new Se(t.firestore,t.converter,ci(t._query,e))}_parse(t){const e=vr(t.firestore);return function(o,u,l,h,f,m,w){let R;if(f.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new N(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){Ko(w,m);const S=[];for(const b of w)S.push(Go(h,o,b));R={arrayValue:{values:S}}}else R=Go(h,o,w)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||Ko(w,m),R=_f(l,u,w,m==="in"||m==="not-in");return et.create(f,m,R)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}class Ji extends Xi{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new Ji(t,e)}_parse(t){const e=this._queryConstraints.map(r=>r._parse(t)).filter(r=>r.getFilters().length>0);return e.length===1?e[0]:Vt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(s,o){let u=s;const l=o.getFlattenedFilters();for(const h of l)yu(u,h),u=ci(u,h)}(t._query,e),new Se(t.firestore,t.converter,ci(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Go(n,t,e){if(typeof(e=Pt(e))=="string"){if(e==="")throw new N(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!ya(t)&&e.indexOf("/")!==-1)throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const r=t.path.child(X.fromString(e));if(!x.isDocumentKey(r))throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return fo(n,new x(r))}if(e instanceof At)return fo(n,e._key);throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${yr(e)}.`)}function Ko(n,t){if(!Array.isArray(n)||n.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function yu(n,t){const e=function(s,o){for(const u of s)for(const l of u.getFlattenedFilters())if(o.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new N(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new N(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class If{convertValue(t,e="none"){switch(oe(t)){case 0:return null;case 1:return t.booleanValue;case 2:return Z(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(se(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw M()}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return ae(t,(s,o)=>{r[s]=this.convertValue(o,e)}),r}convertVectorValue(t){var e,r,s;const o=(s=(r=(e=t.fields)===null||e===void 0?void 0:e.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(u=>Z(u.doubleValue));return new Ki(o)}convertGeoPoint(t){return new Gi(Z(t.latitude),Z(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Ai(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(on(t));default:return null}}convertTimestamp(t){const e=Wt(t);return new nt(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=X.fromString(t);z(Ba(r));const s=new an(r.get(1),r.get(3)),o=new x(r.popFirst(5));return s.isEqual(e)||Mt(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eu(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class wf extends gu{constructor(t,e,r,s,o,u){super(t,e,r,s,u),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Hn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(_u("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}}class Hn extends wf{data(t={}){return super.data(t)}}class Af{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new $n(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(r=>{t.call(e,new Hn(this._firestore,this._userDataWriter,r.key,r,new $n(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new N(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,o){if(s._snapshot.oldDocs.isEmpty()){let u=0;return s._snapshot.docChanges.map(l=>{const h=new Hn(s._firestore,s._userDataWriter,l.doc.key,l.doc,new $n(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:h,oldIndex:-1,newIndex:u++}})}{let u=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>o||l.type!==3).map(l=>{const h=new Hn(s._firestore,s._userDataWriter,l.doc.key,l.doc,new $n(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let f=-1,m=-1;return l.type!==0&&(f=u.indexOf(l.doc.key),u=u.delete(l.doc.key)),l.type!==1&&(u=u.add(l.doc),m=u.indexOf(l.doc.key)),{type:Rf(l.type),doc:h,oldIndex:f,newIndex:m}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function Rf(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M()}}class Pf extends If{constructor(t){super(),this.firestore=t}convertBytes(t){return new we(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new At(this.firestore,null,e)}}function Gf(n){n=Qt(n,Se);const t=Qt(n.firestore,Ce),e=$i(t),r=new Pf(t);return vf(n._query),cf(e,n._query).then(s=>new Af(t,r,n,s))}function Kf(n,t,e,...r){n=Qt(n,At);const s=Qt(n.firestore,Ce),o=vr(s);let u;return u=typeof(t=Pt(t))=="string"||t instanceof yn?du(o,"updateDoc",n._key,t,e,r):hu(o,"updateDoc",n._key,t),Ir(s,[u.toMutation(n._key,Tt.exists(!0))])}function Wf(n){return Ir(Qt(n.firestore,Ce),[new fr(n._key,Tt.none())])}function Hf(n,t){const e=Qt(n.firestore,Ce),r=df(n),s=Eu(n.converter,t);return Ir(e,[lu(vr(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Tt.exists(!1))]).then(()=>r)}function Ir(n,t){return function(r,s){const o=new zt;return r.asyncQueue.enqueueAndForget(async()=>Qd(await af(r),s,o)),o.promise}($i(n),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vf{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=vr(t)}set(t,e,r){this._verifyNotCommitted();const s=Zr(t,this._firestore),o=Eu(s.converter,e,r),u=lu(this._dataReader,"WriteBatch.set",s._key,o,s.converter!==null,r);return this._mutations.push(u.toMutation(s._key,Tt.none())),this}update(t,e,r,...s){this._verifyNotCommitted();const o=Zr(t,this._firestore);let u;return u=typeof(e=Pt(e))=="string"||e instanceof yn?du(this._dataReader,"WriteBatch.update",o._key,e,r,s):hu(this._dataReader,"WriteBatch.update",o._key,e),this._mutations.push(u.toMutation(o._key,Tt.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=Zr(t,this._firestore);return this._mutations=this._mutations.concat(new fr(e._key,Tt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new N(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Zr(n,t){if((n=Pt(n)).firestore!==t)throw new N(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qf(n){return $i(n=Qt(n,Ce)),new Vf(n,t=>Ir(n,t))}(function(t,e=!0){(function(s){Re=s})(hl),Yn(new nn("firestore",(r,{instanceIdentifier:s,options:o})=>{const u=r.getProvider("app").getImmediate(),l=new Ce(new Rl(r.getProvider("auth-internal")),new Cl(r.getProvider("app-check-internal")),function(f,m){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new N(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new an(f.options.projectId,m)}(u,s),u);return o=Object.assign({useFetchStreams:e},o),l._setSettings(o),l},"PUBLIC").setMultipleInstances(!0)),Ye(ao,"4.7.3",t),Ye(ao,"4.7.3","esm2017")})();export{Kf as A,Wf as B,nn as C,Qf as D,Xo as E,Ae as F,Yo as L,hl as S,nt as T,Yn as _,kf as a,ul as b,lc as c,fl as d,Nf as e,Ff as f,Cf as g,Pt as h,bf as i,Lf as j,ti as k,q as l,vi as m,sc as n,Of as o,Df as p,Mf as q,Ye as r,xf as s,dl as t,$f as u,zf as v,jf as w,Gf as x,Hf as y,df as z};
