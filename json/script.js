let VI=localStorage.getItem('vi');
if(!VI){
VI=1;
localStorage.setItem('vi',1);
}else{
VI=parseInt(VI)+1;
localStorage.setItem('vi',VI)
}
if(VI<6)alert(`1. Agg Verse:
	Version: 1.21.70+
	Use: World only
	Format Name
	AggVerseV[x].mcworld
	Example:
		AggVerseV18.mcworld
2. Dynamic Lighting:
	Version: 1.16+
	Use: RP only
	Format name:
	TorchV[x].mcpack
	Example
		TorchV16.mcpack
3. Mob Battles
	Version: 1.21+
	Use: RP and BP
	Format of name:
	MobFight-[B|R]P-Vx.mcpack
	Example:
		MobFight-BP-V14.mcpack
AS OF 2025-JUN-21`);
let blob=0,link=0,use=0,uuid,val;
const t=e=>document.getElementById(e),
prg=t('n'),fs=t('fs'),
obf=(mem=null)=>{
val=Number(t('v').value);
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
},regex=/loot_tables|scripts|\.mcfunction|textures|\.png|\.tga|texts|trades/,
reg3=/"minecraft:block":\s*\{[\s\S]*\}|"particle_effect":\s*\{[\s\S]*\}|"minecraft:feature_rules":\s*\{[\s\S]*\}|"minecraft:geometry":\s*\[[\s\S]*\]|"animations":\s*\{[\s\S]*\}/,
reg4=/[?*:\\|"<>]+/g,
Path=p=>uuid?p.replace(/\/[^?*:\\|"<>/]+$/i,'/'+crypto.randomUUID().replace('-','').slice(0,12)+'.json'):p;
async function s(){
if(use)return;
const f=t('f').files;
if(!f.length){
alert('Select files.');
return;}
use=1;
uuid=t('e').checked;
const zip=new JSZip();
for(const fi of f){
let path=fi.webkitRelativePath;
const sl=path.split('/');
path=path.slice(sl[0].length+1);
if(!fi.name.endsWith('.json')){
zip.file(path,fi);continue;}
try{
let txt=await fi.text();
if(sl.length>2&&!regex.test(path))path=Path(path);
if(!reg3.test(txt))txt=obf(JSON5.parse(txt));
zip.file(path.replace(reg4,'_'),txt);
}catch(e){fs.innerHTML+='<hr><strong>'+path+'</strong>: '+String(e).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');}
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
