let blob=0,link=0,use=0,uuid,val,IT=0,agg=0;
const t=e=>document.getElementById(e),
prg=t('n'),fs=t('fs'),
_h=JSON.parse(localStorage.getItem('h'))||[],
show=x=>alert(IT),
onc=f=>{
var _FN,SW=x=>f.startsWith(x),mc='.mcpack',ver=t('ver').value;
if(SW('aggverse')){
_FN='AggVerse-v.mcworld';
agg=1;
}
else if(SW('torch'))_FN='Torch-v'+mc;
else if(SW('mobbattle'))_FN='MobBattle-BP-v'+mc;
else if(SW('grenade'))_FN='Ｇｒｅｎａｄｅ－ＢＰ－ｖ'+mc;
else if(SW('instantre')||SW('redstone'))_FN='Redstone-BP-v'+mc;
else if(SW('darkland'))_FN='DarkLand-RP-v'+mc;
else if(SW('wasteland'))_FN='WasteLand-BP-v'+mc;
else if(SW('glowshot'))_FN='Glow-Shot-v'+mc;
else if(SW('bettercomb'))_FN='BetterCombat-BP-v'+mc;
else _FN=f.split('/')[0]+mc;
if(!_FN.includes('.mcworld'))agg=0;
t('fn').value=agg?_FN.replace('v.mcworld','v'+ver+'.mcworld'):SW('grenade')?_FN.replace(mc,[...ver].map(d=>String.fromCharCode(0xFF10+parseInt(d))).join('')+mc):_FN.replace('v'+mc,'v'+ver+mc);
},obf=(mem=null)=>{
val=Number(t('v').value);
if(mem===null)return"";
if(Array.isArray(mem))return JSON.stringify(obfArr(mem)).replaceAll('\\\\u','\\u');
if(typeof mem=='object')return JSON.stringify(obfObj(mem)).replaceAll('\\\\u','\\u');
},getOf=ty=>{
if(typeof ty=='string')return'str';
if(Array.isArray(ty))return'arr';
if(typeof ty=='object'&&ty!=null)return'obj';
return typeof ty;
},shf=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a;
},obfStr=str=>{
let res=[];
for(let i=0;i<str.length;i++){
if(str[i]=='\\'){res.push(str[i++],str[i]);continue;}
if((crypto.getRandomValues(new Uint32Array(1))[0]/4294967295)<val)res.push(str[i]);
else res.push('\\u'+str.charCodeAt(i).toString(16).padStart(4,'0'));
}
return res.join('');
},obfArr=arr=>{
let res=[];
for(const item of arr){
switch(getOf(item)){
case'str':res.push(obfStr(item));break;
case'obj':res.push(obfObj(item));break;
case'arr':res.push(obfArr(item));break;
default:res.push(item);
}
}
return res;
},obfObj=obj=>{
let res={};
for(const prop of shf(Object.keys(obj))){
if(!obj.hasOwnProperty(prop)||typeof obj[prop]=='function')continue;
const key=obfStr(prop);
switch(getOf(obj[prop])){
case'str':res[key]=obfStr(obj[prop]);break;
case'obj':res[key]=obfObj(obj[prop]);break;
case'arr':res[key]=obfArr(obj[prop]);break;
default:res[key]=obj[prop];
}
}
return res;
},regex=/loot_tables|scripts|functions|textures|\.png|\.tga|texts|trades|sounds|spawn_rules/,
reg3=/"minecraft:block":\s*\{[\s\S]*\}|"particle_effect":\s*\{[\s\S]*\}|"minecraft:feature_rules":\s*\{[\s\S]*\}|"minecraft:geometry":\s*\[[\s\S]*\]|"animations":\s*\{[\s\S]*\}/,
reg4=/[?*:\\|"<>]+/g,
OPT={compression:"DEFLATE",compressionOptions:{level:0}},
shH=()=>{
var _hs='';
_h.forEach(x=>_hs+=x+'\n');
alert('History:\n'+_hs);
}
async function s(){
if(use)return;
const f=t('f').files;
if(!f.length){
alert('Select files.');
return;}
use=1;
const Path=agg?p=>p:p=>p.replace(/\/[^?*:\\|"<>/]+$/i,'/'+crypto.randomUUID().replace('-','').slice(0,12)+'.json');
const fn=t('fn').value,zip=new JSZip();
_h.unshift(fn);localStorage.setItem('h',JSON.stringify(_h));
for(IT=0;IT<f.length;IT++){
if(IT%20==0)await new Promise(r=>setTimeout(r,0));
const fi=f[IT];
let path=fi.webkitRelativePath;
const sl=path.split('/');
path=path.slice(sl[0].length+1);
if(!fi.name.endsWith('.json')){
zip.file(path,fi,OPT);continue;}
try{
let txt=await fi.text();
if(sl.length>2&&!regex.test(path))path=Path(path);
if(!reg3.test(txt))txt=obf(JSON.parse(txt));
zip.file(path.replace(reg4,'_'),txt,OPT);
}catch(e){fs.innerHTML+='<hr><strong>'+path+'</strong>: '+String(e).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');zip.file(path,fi,OPT);}
}
blob=await zip.generateAsync({type:'blob',mimeType:'application/octet-stream',compression:'DEFLATE',compressionOptions:{level:0}});
link=document.createElement('a');
link.download=fn;
link.textContent='Download if not downloaded '+fn;
link.href=URL.createObjectURL(blob);
document.body.appendChild(link);
link.click();
use=0;
}
function st(){
if(blob!==0)URL.revokeObjectURL(blob);
if(link!==0)document.body.removeChild(link);
use=agg=0;
}
window.onerror=e=>alert(e);
