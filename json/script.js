const t=e=>document.getElementById(e),
prg=t('n'),fs=t('fs'),
obf=(mem=null)=>{
const val=Math.abs(t('v').value);
if(mem===null)return"";
if(Array.isArray(mem))return JSON.stringify(obfArr(mem)).replaceAll('\\\\u','\\u');
if(typeof mem=='object')return JSON.stringify(obfObj(mem)).replaceAll('\\\\u','\\u');
},getOf=ty=>{
if(typeof ty=='string')return'str';
else if(Array.isArray(ty))return'arr';
else if(typeof ty=='object'&&ty!=null)return'obj';
else return typeof ty;
},shf=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a;
},obfStr=str=>{
let res='';
for(let i=0;i<str.length;i++){
if(str[i]=='\\'){res+=str[i++];res+=str[i];continue;}
if(Math.random()<val)res+=str[i];
else res+='\\u'+str.charCodeAt(i).toString(16).padStart(4,'0');
}
return res;
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
};
const regex=/loot_tables|scripts|functions|textures|\.png|\.tga|texts|trades/,reg2=/^[\s\S]+\/[^/]+$/,reg3=/"minecraft:block":\s*\{[\s\S]*\}|"particle_effect":\s*\{[\s\S]*\}|"minecraft:feature_rules":\s*\{[\s\S]*\}/,reg4=/[?*:\\|"<>]/g,Path=p=>p.replace(/\/[a-z0-9._@~§]+$/i,'/'+crypto.randomUUID().replace('-','').slice(0,12)+'.json');
let blob=0,link=0,use=0,thres=20;
async function s(){
if(use)return;
const f=t('f').files;
if(!f.length){
alert('Select files.');
return;
}
use=1;
const zip=new JSZip();
for(let it=0;it<f.length;it++){
const fi=f[it];
let path=fi.webkitRelativePath;
if(!fi.name.endsWith('.json')){
zip.file(path,fi);continue;}
try{
let txt=await fi.text();
if(path.split('/').length>2||reg2.test(path)||!regex.test(path))path=Path(path);
if(!reg3.test(txt))txt=obf(JSON5.parse(txt));
zip.file(path.replace(reg4,'_'),txt);
if(it>=thres){
prg.textContent=it;
thres+=20;
await new Promise(r=>setTimeout(r,0));
}
}catch(e){fs.innerHTML+='<hr><strong>'+fi.name+'</strong>'+String(e).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');}
}
blob=await zip.generateAsync({type:'blob'});
link=document.createElement('a');
const spl=f[0].webkitRelativePath.split('/')[0]+'.zip';
link.download=spl;
link.textContent='Download if not downloaded '+spl;
link.href=URL.createObjectURL(blob);
document.body.appendChild(link);
link.click();
use=0;
}
function st(){
if(blob!==0)URL.revokeObjectURL(blob);
if(link!==0)document.body.removeChild(link);
use=0;
}
