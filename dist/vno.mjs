import e from"fs";import t from"path";import s from"node-watch";const o=e.promises;async function r(e,{ext:s,ignores:i=[],includes:c=[]},n,l=""){try{const a=t.resolve(e,l);if((await o.stat(a)).isDirectory()){const f=await o.readdir(a);for(const p of f){const f=t.resolve(a,p),g=await o.stat(f);if(g.isDirectory())i.map((s=>t.resolve(e,s))).includes(f)||(c&&c.length>0?c.map((s=>t.resolve(e,s))).includes(f)&&await r(e,{ext:s,ignores:i,includes:c},n,l?l+"/"+p:p):await r(e,{ext:s,ignores:i,includes:c},n,l?l+"/"+p:p));else if(g.isFile()){const e=t.parse(f).ext.substring(1);(!s||f.endsWith(`.${s}`)||s.split(",").includes(e))&&await n(f)}}}}catch(e){console.error(e)}}async function i(e){try{(await o.stat(e)).isDirectory()||await o.mkdir(e)}catch(t){await o.mkdir(e)}}var c={error:e=>{console.log("[31m%s[0m",e)},success:e=>{console.log("[32m%s[0m",e)},primary:e=>{console.log("[34m%s[0m",e)},info:e=>{console.log("[2m%s[0m",e)},log:e=>{console.log(e)},reg:e=>{const t=e.matchAll(/\$([^\$]*\$\#[0-9a-fA-F]{3,8})/);console.log(t)},dict:e=>{if("object"==typeof e)for(let t in e)console.log("[34m%s[0m",`${t}: ${"string"==typeof e[t]?`'${e[t]}'`:e[t]}     `);else console.log(e)}};const n=e.promises;let l;async function a(e){const{watch:o,hot:f,ignores:p,includes:g,ext:m,rules:w,target:d,cssSplit:u}=e;c.primary("vnocss编译中......");const y=t.resolve(process.cwd(),d),$=t.parse(y);await i($.dir);let h="";return await r(t.resolve(process.cwd(),o),{ext:m,ignores:p,includes:g},(async function(e){let s="";const r=(await n.readFile(e)).toString(),c=[...r.matchAll(/class="([^"]*)"/g),...r.matchAll(/class='([^']*)'/g)];let l=[];for(let e of c)l=[...new Set([...l,...e[1].trim().split(/\s+/)])];for(let e of l)for(let t in w){let o=w[t];const r=new RegExp(`^${t}$`);if(!r.test(e))continue;const i=e.match(r);let c="";if("string"==typeof o){const e=[...o.matchAll(/\$val\[(\d+)\]/g)];for(let t of e){const e=+t[1];o=o.replace(t[0],i[e])}c=`.${i[0]}{${o}}`}else"function"==typeof o&&(c=`.${i[0]}{${o(i)}}`);s.indexOf(c)<0&&(s+=c),h.indexOf(c)<0&&(h+=c)}const a=t.parse(e);if(u&&s){const e=a.dir.replace(t.resolve(process.cwd(),o),""),r=t.resolve($.dir,"."+e,a.name+"_css.css");await i(t.parse(r).dir),await n.writeFile(r,s)}})),h&&await n.writeFile(y,h),c.success("vnocss编译成功"),f&&function(e){const{watch:o,hot:r,ignores:i,includes:n,ext:f,rules:p,target:g,cssSplit:m}=e;l&&l.close(),l=s(t.resolve(process.cwd(),o),{recursive:!0,filter(e,t){if(Array.isArray(i))for(let s of i)if(new RegExp(`\\/${s}`).test(e))return t;if(Array.isArray(n)&&n.length>0){for(let t of n)if(new RegExp(`\\/${t}`).test(e)){let t=!1;for(let s of f.split(","))if(new RegExp(`\\.${s}`).test(e)){t=!0;break}return t}return t}let s=!1;for(let t of f.split(","))if(new RegExp(`\\.${t}`).test(e)){s=!0;break}return s}},(function(t,s){a(e)})),c.primary("监听文件中...")}(e),!0}export{a as default};
