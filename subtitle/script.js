let mode=0;
const sw=()=>{
const meta=document.querySelector('meta[name="color-scheme"]');
if(meta.getAttribute('content')=='dark only')meta.setAttribute('content','light only');
else meta.setAttribute('content','dark only');
console.log(meta,meta.getAttribute('content'));
};function $(i){return document.getElementById(i)}
function cW(w,m){const c=[],t='';let x=t;
for(let v of w){
if((x+' '+v).trim().length<=m)
x=(x+' '+v).trim();
else{if(x)c.push(x);x=v;}
}
if(x)c.push(x);return c;}
function applyS(){
const o=$('o');
o.style.color=$('txt').value;
o.style.textShadow='0 0 10px '+$('glow').value;
o.style.outline='2px solid '+$('out').value;
document.body.style.backgroundColor=$('bg').value;}
function getDelay(c,s){
const l=c.trim().slice(-1);
if(l===','||l==='،')return s*2;
if(['।','|','.','!','?'].includes(l))
return s*3;
return s;}
function startSub(){
applyS();
const t=$('i').value.trim(),d=+$('d').value,
s=+$('s').value,m=+$('max').value;
if(!t||isNaN(d)||isNaN(s)||isNaN(m)||m<=0){
$('o').textContent='Invalid input!';return;}
const w=t.split(/\s+/),ch=cW(w,m);
$('o').textContent='Starting...';
setTimeout(()=>{
let i=0;
function next(){
if(i>=ch.length){
$('o').textContent='Done!';return;}
$('o').textContent=ch[i++];
setTimeout(next,getDelay(ch[i-1],s));}
next();
},d);}
