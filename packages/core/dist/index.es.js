function T(t,e,n=!1){var r;let o="string"!=typeof e?null==(r=null==e?void 0:e.selector)?void 0:r.value:"";if(o){if(o=o.replaceAll("_"," "),o.startsWith("&")){const e=null==o?void 0:o.replace("&",":scope");return n?t.querySelector(e):t.querySelectorAll(e)}return o}return t}function $(t){return!(null===t||"object"!=typeof t||Array.isArray(t)||t instanceof HTMLElement)}function W(t,...e){if(!e.length)return t;const n=e.shift();if($(t)&&$(n))for(const e in n)"__proto__"===e||"constructor"===e||"prototype"===e||($(n[e])?(t[e]||Object.assign(t,{[e]:{}}),W(t[e],n[e])):Object.assign(t,{[e]:n[e]}));return e.length?W(t,...e):t}function x(t){const e=t.match(/^\[([^\]]+)]:(.*)/);return e?{content:e[1],restOfString:e[2]}:null}function V(t,e,n){if("string"!=typeof t)return t;const r=t.replace(/^\[|]$/g,"").replaceAll("_"," ");return r.startsWith("&")?T(e,t,["trigger"].includes(n)):"true"===r||"false"===r?"true"===r:isNaN(Number(r))?r:r.includes(".")?parseFloat(r):parseInt(r,10)}function N(t,e=!1,n){const r={};return t.split(" ").forEach((t=>{var o;const i=x(t);i&&(t=i.restOfString,r.selector={},r.selector.value=i.content);const l=t.split(":").filter((t=>!t.includes("@"))),[s,a]=l;if(!a&&e){const e=t.split("-"),o=e[0],i=e[1];if(!o||!i)return;return void(r[o]=V(i,n,o))}if("tl"===s&&a.startsWith("["))return void(r.tl={value:null==(o=x(a+":"))?void 0:o.content});if(!a)return;const c=a.split("|");r[s]||(r[s]={}),c.forEach((t=>{if(!t)return;let[e,o]=t.split(/-(.+)/);o=V(o,n,e);const i=e.split(".");let l=r[s];i.forEach(((t,e)=>{e===i.length-1?l[t]=o:(l[t]||(l[t]={}),l=l[t])}))}))})),r}function F(t,e,n){const r=t.match(/(?:@(\w+):)?tl(?:\/(\w+))?/);if(r){const t=r[1],o={id:r[2]??"",breakpoint:n};if(t){if(null==e||!e[t])return null;o.breakpoint=e[t]??n}return o}return null}function I(t,e,n){const r={};return t.split(" ").forEach((t=>{const o=t.match(/@(\w+):/);if(!o)return r[n]||(r[n]=[]),void r[n].push(t);const i=o[1],l=null==e?void 0:e[i];l&&(r[l]||(r[l]=[]),r[l].push(t.replace(o[0],"")))})),r}function P(t){var e,n;if(!t||null==(n=null==(e=null==t?void 0:t.lib)?void 0:e.gsap)||!n.core)throw new Error("GSAP not found");const{lib:{gsap:{core:r}},...o}=t,i=W({dataAttribute:"data-animate",element:document,breakpoints:{default:"(min-width: 1px)"}},o),l=i.breakpoints.default,s=i.breakpoints;let a=[],c=[],u=new Map;const f=t=>(t.getAttribute(p())||"").trim(),d=(t=i.element)=>t.querySelectorAll(p(!0)),p=(t=!1)=>`${t?"[":""}${i.dataAttribute}${t?"]":""}`;function m(){const t=[],e=d(),n=t=>"tl"===t||t.includes("tl/")||t.endsWith(":tl");e.forEach((e=>{const o=f(e),a=o.split(" ");if(a.some((t=>n(t)))){const u=F(o,s,l),f=[];[...d(e),...null!=u&&u.id?document.querySelectorAll(`[${i.dataAttribute}*="tl:${u.id}"]`):[]].forEach((t=>{f.push(t)}));const p=N(a.filter((t=>!n(t))).join(" "),!0,e);return t.push(e),void c.push({id:(null==u?void 0:u.id)||Math.random().toString(36).substring(2,15),data:p,breakpoint:(null==u?void 0:u.breakpoint)||l,elements:f,timeline:r.timeline(p)})}})),e.forEach((e=>{var n;if(t.includes(e))return;const r=null==(n=c.find((t=>t.elements.some((t=>t===e))&&t.breakpoint)))?void 0:n.breakpoint;a.push(...Object.entries(I(f(e),s,l)).map((([t,n])=>({breakpoint:t??r,element:e,data:N(n.join(" "),!1,e)}))))})),a.forEach((t=>{u.has(t.element)||u.set(t.element,{});const e={[t.breakpoint]:t.data};u.set(t.element,{...u.get(t.element),...e})}))}function h(){v(),m();const t=r.matchMedia();t.add(Object.fromEntries(Object.values({[l]:l,...s||{}}).map((t=>[t,t]))),(t=>{u.forEach(((e,n)=>{var o;let i={};Object.entries(e).forEach((([e,n])=>{var r;null!=(r=t.conditions)&&r[e]&&(i=W(i,n))}));const l=null==(o=c.find((({elements:t})=>t.includes(n))))?void 0:o.timeline;((t,e,n)=>{var o;const i=e.tl?null==(o=Object.values(e.tl))?void 0:o[0]:void 0;if(e.to&&e.from)n?n.fromTo(T(t,e),e.from,e.to,i):r.fromTo(T(t,e),e.from,e.to);else if(e.to||e.from){const o=e.to?"to":"from";n?n[o](T(t,e),e[o],i):r[o](T(t,e),e[o])}})(n,i,l)}))}))}function v(){a=[],c=[],u=new Map}function b(){c.forEach((({timeline:t})=>{t.kill()})),u.forEach(((t,e)=>{r.killTweensOf(e)})),v()}return h(),{start:h,kill:b,restart:function(){b(),m(),h()},data:{state:i,breakpoints:s,elements:a,timelines:c,animations:u}}}export{P as default};