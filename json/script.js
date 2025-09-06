"use strict";
var blob,link=document.createElement('a'),use=0,val,agg=0,F;
link.textContent='Download';
const t=e=>document.getElementById(e),fs=t('fs'),
ER=x=>fs.innerHTML+=x,
onc=f=>{
var _FN,SW=x=>f.startsWith(x),mc='.mcpack';
if(SW('aggverse'))_FN='AggVerse.mcworld',agg=1;
else if(SW('torch'))_FN='Dynamic-Lighting';
else if(SW('mobbattle'))_FN='MobBattle-BP';
else if(SW('grenade'))_FN='Ｇｒｅｎａｄｅ－ＢＰ';
else if(SW('redstone'))_FN='Redstone-BP';
else if(SW('darkland'))_FN='DarkLand-RP';
else if(SW('wasteland'))_FN='WasteLand-BP';
else if(SW('glowshot'))_FN='Glow-Shot';
else if(SW('bettercomb'))_FN='BetterCombat-BP';
else if(SW('3dcr'))_FN='3DCrystal';
else _FN=f.split('/')[0];
if(!_FN.includes('.mcworld'))agg=0;
t('fn').value=agg?_FN:_FN+mc;
},obf=mem=>JSON.stringify(Array.isArray(mem)?obfArr(mem):obfObj(mem)).replaceAll('\\\\u','\\u'),
getOf=ty=>{
if(typeof ty=='string')return'str';
if(Array.isArray(ty))return'arr';
if(typeof ty=='object'&&ty!=null)return'obj';
},shf=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a;
},obfStr=str=>{
const res=[];
for(var i=0;i<str.length;i++)res.push(Math.random()>val?str[i]:'\\u'+str.charCodeAt(i).toString(16).padStart(4,'0'));
return res.join('');
},obfArr=arr=>{
const res=[];
for(const I of arr){
switch(getOf(I)){
case'str':res.push(obfStr(I));break;
case'obj':res.push(obfObj(I));break;
case'arr':res.push(obfArr(I));break;
default:res.push(I);
}
}
return res;
},obfObj=obj=>{
const res={};
for(const K of shf(Object.keys(obj))){
const X=obfStr(K);
switch(getOf(obj[K])){
case'str':res[X]=obfStr(obj[K]);break;
case'obj':res[X]=obfObj(obj[K]);break;
case'arr':res[X]=obfArr(obj[K]);break;
default:res[X]=obj[K];
}
}
return res;
},reg=/loot_tables|scripts|functions|textures|\.png|\.tga|texts|trades|sounds|spawn_rules/,
Reg=/"minecraft:block":\s*\{[\s\S]*\}|"particle_effect":\s*\{[\s\S]*\}|"minecraft:feature_rules":\s*\{[\s\S]*\}|"minecraft:geometry":\s*\[[\s\S]*\]|"animations":\s*\{[\s\S]*\}/,
reG=/[?*:\\|"<>]+/g,
ReG=/\/[^?*:\\|"<>/]+$/,
utf='abcdefghijklmnopqrstuvwxyz0123456789',
H=len=>{
if(typeof len!=='number')throw new Error("Argument 'len' to function H isn't a number. Got "+len);
const arr=[],bulk=crypto.getRandomValues(new Uint16Array(Math.round(len*10.5)));
var sub=[],b=0,l=Math.floor(crypto.getRandomValues(new Uint16Array(1))[0]/65535*5)+8;
for(var i=0;i<len;i++){
for(var j=0;j<l;j++){
sub.push(utf[Math.floor(bulk[b++]/65535*37)]);
if(b>=bulk.length)b=0,crypto.getRandomValues(bulk);
}
arr.push(sub.join(''));
sub=[];l=Math.floor(crypto.getRandomValues(new Uint16Array(1))[0]/65535*5)+8;
}
return arr;
},s=async()=>{
if(use)return;
F=t('f').files;
if(!F.length)return;
use=1;
val=+t('v').value;
const $=Date.now(),fn=t('fn').value,zip=new JSZip(),fl=Array.from(F),JS=fl.filter(fi=>fi.name.endsWith('.json')),nJs=fl.filter(x=>!x.name.endsWith('.json'));
await Promise.all(nJs.map(async fi=>{let $P=fi.webkitRelativePath;try{const $p=$P;$P=$P.replace(reG,'_');if($p!==$P)ER('<hr><strong style="color:#F90;"> •'+$P+'</strong>: Sanitized '+$p);zip.file($P.substring($P.indexOf('/')+1),fi);}catch(e){ER('<hr><strong style="color:red;"> •'+($P||fi.name)+'</strong>: '+String(e).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'));zip.file($P||fi.name,fi);return;}}));
const J=agg?null:H(JS.length);
await Promise.all(JS.map(async(fi,i)=>{
let path=fi.webkitRelativePath;
const sl=path.split('/');
path=path.slice(sl[0].length+1);
try{
let txt=await fi.text();
if(!Reg.test(txt))txt=obf(JSON.parse(txt));
if(sl.length>2&&!reg.test(path)&&!agg)path=path.replace(ReG,'/'+J[i]+'f.json');
const P=path;
path=path.replace(reG,'_');
if(P!==path)ER('<hr><strong style="color:#F90;"> •'+path+'</strong>: Sanitized '+P);
zip.file(path,txt);
}catch(e){ER('<hr><strong style="color:red;"> •'+path+'</strong>: '+String(e).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'));zip.file(path,fi);return;}
}));
blob=await zip.generateAsync({type:'blob',mimeType:'application/octet-stream',compression:'STORE'});
link.download=fn;
link.href=URL.createObjectURL(blob);
document.body.appendChild(link);
link.click();
const _=Date.now()-$,Q=_/F.length,W=Q/1000;
t('p').textContent=`MS: ${_-2}, S:${_/1000}, Avg:${W.toFixed(4)}`;
use=0;},st=()=>{try{
URL.revokeObjectURL(blob);
document.body.removeChild(link);
use=agg=0;
}catch(e){}
}
window.onerror=E=>ER('<hr><span style="color:#0EE;"> •'+String(E).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')+'</span>');