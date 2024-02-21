function _(t,e,n=!1){var l;let i="string"!=typeof e?null==(l=null==e?void 0:e.selector)?void 0:l.value:"";if(i){if(i=i.replaceAll("_"," "),i.startsWith("&")){const e=null==i?void 0:i.replace("&",":scope");return n?t.querySelector(e):t.querySelectorAll(e)}return i}return t}function I(t){return!(null===t||"object"!=typeof t||Array.isArray(t)||t instanceof HTMLElement)}function x(t,...e){if(!e.length)return t;const n=e.shift();if(I(t)&&I(n))for(const e in n)"__proto__"===e||"constructor"===e||"prototype"===e||(I(n[e])?(t[e]||Object.assign(t,{[e]:{}}),x(t[e],n[e])):Object.assign(t,{[e]:n[e]}));return e.length?x(t,...e):t}function J(t){const e=t.match(/^\[([^\]]+)]:(.*)/);return e?{content:e[1],restOfString:e[2]}:null}function z(t,e,n){if("string"!=typeof t)return t;const l=t.replace(/^\[|]$/g,"").replaceAll("_"," ");return l.startsWith("&")?_(e,t,["trigger"].includes(n)):"true"===l||"false"===l?"true"===l:isNaN(Number(l))?l:l.includes(".")?parseFloat(l):parseInt(l,10)}function B(t,e=!1,n){const l={};return t.split(" ").forEach((t=>{var i;const r=J(t);r&&(t=r.restOfString,l.selector={},l.selector.value=r.content);const s=t.split(":").filter((t=>!t.includes("@"))),[a,o]=s;if(!o&&e){const e=t.split("-"),i=e[0],r=e[1];if(!i||!r)return;return void(l[i]=z(r,n,i))}if("tl"===a&&o.startsWith("["))return void(l.tl={value:null==(i=J(o+":"))?void 0:i.content});if(!o)return;const c=o.split("|");l[a]||(l[a]={}),c.forEach((t=>{if(!t)return;let[e,i]=t.split(/-(.+)/);i=z(i,n,e);const r=e.split(".");let s=l[a];r.forEach(((t,e)=>{e===r.length-1?s[t]=i:(s[t]||(s[t]={}),s=s[t])}))}))})),l}function U(t,e,n){const l=t.match(/(?:@(\w+):)?tl(?:\/(\w+))?/);if(l){const t=l[1],i={id:l[2]??"",breakpoint:n};if(t){if(null==e||!e[t])return null;i.breakpoint=e[t]??n}return i}return null}function X(t,e,n){const l={};return t.split(" ").forEach((t=>{const i=t.match(/@(\w+):/);if(!i)return l[n]||(l[n]=[]),void l[n].push(t);const r=i[1],s=null==e?void 0:e[r];s&&(l[s]||(l[s]=[]),l[s].push(t.replace(i[0],"")))})),l}function Y(t,e){let n=null;return function(...l){null!==n&&clearTimeout(n),n=window.setTimeout((()=>{t(...l)}),e)}}function Z(t){var e,n,l;if(!t||null==(n=null==(e=null==t?void 0:t.lib)?void 0:e.gsap)||!n.core)throw new Error("GSAP not found");const{lib:{gsap:{core:i}},...r}=t,s=x({breakpoints:{default:"(min-width: 1px)"},dataAttribute:"data-animate",element:document,watch:!1},r);let a=0;const o=null==(l=s.breakpoints)?void 0:l.default,c=s.breakpoints,u=[],f=(t=!1)=>`${t?"[":""}${s.dataAttribute}${t?"]":""}`,d=t=>{const e=t.getAttribute(f())||"";let n="";return null!=s&&s.className&&(n=(t.getAttribute("class")||"").split(" ").filter((t=>t.includes(s.className))).map((t=>t.replace(`${null==s?void 0:s.className}-`,""))).join(" ")),`${e} ${n}`.trim()},m=(t=s.element)=>Array.from(t.querySelectorAll(`${f(!0)}${s.className?`, [class^="${s.className}"], [class*="${s.className}"]`:""}`)),p=()=>(a++,`${Math.random().toString(36).substring(2,15)}-${a}`),b=t=>"tl"===t||t.includes("tl/")||t.endsWith(":tl"),h=t=>u.find((e=>e.elements.has(t))),v=t=>u.find((e=>e.id===t)),g=t=>{const e=t.id,n=u.findIndex((t=>t.id===e));e&&-1!==n?u[n]={...t,timeline:u[n].timeline}:u.push(t)};const E=Y((function(t){const e=h(t);if(null==e||!e.timeline){let e="";if(Object.values(N(t)).forEach((t=>{e||t.tl&&(e=Object.keys(t.tl)[0])})),!e)return void y([t],p());const n=v(e),l=[null==n?void 0:n.timelineElement,...(null==n?void 0:n.elements.keys())||[],t];return null==n||n.timeline.progress(0).clear(),void y(l,e)}y([...Array.from(e.elements.keys()),...null!=e&&e.timelineElement?[null==e?void 0:e.timelineElement]:[]],(null==e?void 0:e.id)||"")}),"object"==typeof s.watch&&s.watch.debounceTime||500);function N(t){const e=[...Object.entries(X(d(t),c,o)).map((([e,n])=>({breakpoint:e,element:t,data:B(n.join(" "),!1,t)})))],n={};return e.forEach((t=>{null!=n&&n[t.breakpoint]||(n[t.breakpoint]={}),n[t.breakpoint]=t.data})),n}function A(t=m(),e=""){const n=[];t.forEach((t=>{d(t).split(" ").some((t=>b(t)))&&(n.push(...function(t,e=""){const n=[],l=d(t),r=l.split(" ");if(r.some((t=>b(t)))){const a=U(l,c,o),u=new Map;[...m(t),...null!=a&&a.id?document.querySelectorAll(`[${s.dataAttribute}*="tl:${a.id}"]${s.className?`, [class^="${s.className}-tl:${a.id}"], [class*="${s.className}-tl:${a.id}"]`:""}`):[]].forEach((e=>{e!==t&&(u.set(e,N(e)),n.push(e))}));const f=B(r.filter((t=>!b(t))).join(" "),!0,t),d=(null==a?void 0:a.breakpoint)||o;g({breakpoint:d,data:f,elements:u,id:e||(null==a?void 0:a.id)||p(),timelineElement:t,timeline:i.timeline({...f,paused:!0})})}return n}(t)),n.push(t))})),t.forEach((t=>{var l;if(n.includes(t))return;const r=null==(l=u.find((e=>{var n;return(null==(n=e.elements)?void 0:n.has(t))&&e.breakpoint})))?void 0:l.breakpoint,s=h(t),a=new Map;(!s||""!==e)&&(a.set(t,N(t)),g({breakpoint:r||o,data:{},elements:a,id:e||(null==s?void 0:s.id)||p(),timelineElement:t,timeline:i.timeline({paused:!0})}))}))}function y(t=m(),e=""){A(t,e),i.matchMedia().add(Object.fromEntries(Object.values({[o]:o,...c||{}}).map((t=>[t,t]))),(t=>{if(e){const t=v(e);t&&t.timeline.progress(0).clear()}(e?[u.find((t=>t.id===e))]:u).reduce(((t,e)=>new Map([...t,...e.elements])),new Map).forEach(((e,n)=>{let l={};Object.entries(e).forEach((([e,n])=>{var i;null!=(i=t.conditions)&&i[e]&&(l=x(l,n))}));const r=h(n);r&&(r.elements.forEach(((t,e)=>{i.set(e,{clearProps:"all"}),Object.values(t).forEach((t=>{t.selector&&i.set(_(e,t),{clearProps:"all"})}))})),function(t,e,n){var l;const i=e.tl?null==(l=Object.values(e.tl))?void 0:l[0]:void 0;if(e.to&&e.from)n.fromTo(_(t,e),e.from,e.to,i);else if(e.to||e.from){const l=e.to?"to":"from";n[l](_(t,e),e[l],i)}}(n,l,r.timeline),r.timeline.restart())}))}))}return y(),s.watch&&function(){const t=s.element,e=new MutationObserver((function(t){t.forEach((function(t){var e,n;const l="attributes"===t.type&&t.attributeName===s.dataAttribute,i=s.className&&"class"===t.attributeName&&(null==(e=t.target.getAttribute("class"))?void 0:e.includes(s.className));if(!l&&!i&&"childList"!==t.type)return;"childList"===t.type&&t.addedNodes.forEach((t=>{var e;if(t.nodeType===Node.ELEMENT_NODE){const n=t;if(s.className&&null!=(e=n.getAttribute("class"))&&e.includes(s.className)||n.hasAttribute(s.dataAttribute))E(n);else{const t=function(t){let e=t.parentElement;for(;e;){if(e.hasAttribute(s.dataAttribute)||Array.from(e.classList).some((t=>t.startsWith(s.className||"")))&&s.watch)return e;e=e.parentElement}return null}(n);t&&E(t)}}}));const r=N(t.target),a=null==(n=u.find((e=>e.elements.has(t.target))))?void 0:n.elements.get(t.target);JSON.stringify(r)!==JSON.stringify(a)&&(!a||!r||E(t.target))}))})),n={attributes:!0,attributeFilter:[s.dataAttribute,...s.className?["class"]:[]],subtree:!0,childList:!0};e.observe(t,n)}(),{breakpoints:c,state:s,timelines:u}}export{Z as default};