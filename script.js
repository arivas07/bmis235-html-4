/* Author: Arnie Rivas (arivas-oregelflore) - BMIS 235 HTML-4 Path 3 */
/* Shared graph engine: draws an SVG from cfg.build(sliderValue); clicking a part shows how it is derived. */
var NS="http://www.w3.org/2000/svg";
function mk(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
function r2(n){return +n.toFixed(2);}
function ol(a){return "<ol><li>"+a.join("</li><li>")+"</li></ol>";}
function line(x0,x1,f,n){var o=[],i,x;n=n||40;for(i=0;i<=n;i++){x=x0+(x1-x0)*i/n;o.push([x,f(x)]);}return o;}
function initGraph(cfg){
 var W=600,H=420,L=62,R=24,T=18,B=58,svg=document.getElementById("graph"),panel=document.getElementById("explain"),
 sl=document.getElementById("slider"),out=document.getElementById("sliderOut"),sum=document.getElementById("summary"),sel=null,cur=null;
 function show(){
  var it=null;
  if(sel&&cur)cur.items.forEach(function(i){if(i.id===sel)it=i;});
  panel.innerHTML=it?"<h3>"+it.title+"</h3>"+it.text:"<p class='hint'>Click (or tab to and press Enter on) any curve, point or shaded area to see how it is calculated.</p>";
 }
 function choose(id){
  sel=id;
  svg.querySelectorAll(".item").forEach(function(g){g.classList.toggle("on",g.getAttribute("data-id")===id);});
  show();
 }
 function draw(){
  var v=sl?+sl.value:0,g=cur=cfg.build(v),i;
  if(out)out.textContent=cfg.fmt?cfg.fmt(v):v;
  sum.innerHTML=g.summary;
  svg.innerHTML="";
  var X=function(x){return L+x/g.xmax*(W-L-R);},Y=function(y){return H-B-y/g.ymax*(H-T-B);};
  var P=function(p){return p.map(function(q){return X(q[0])+","+Y(q[1]);}).join(" ");};
  for(i=0;i<=5;i++){
   var xv=g.xmax*i/5,yv=g.ymax*i/5;
   mk("line",{x1:X(xv),x2:X(xv),y1:Y(0),y2:Y(g.ymax),"class":"grid"},svg);
   mk("line",{x1:X(0),x2:X(g.xmax),y1:Y(yv),y2:Y(yv),"class":"grid"},svg);
   mk("text",{x:X(xv),y:Y(0)+18,"class":"tick","text-anchor":"middle"},svg).textContent=r2(xv);
   mk("text",{x:X(0)-8,y:Y(yv)+4,"class":"tick","text-anchor":"end"},svg).textContent=r2(yv);
  }
  mk("line",{x1:X(0),x2:X(g.xmax),y1:Y(0),y2:Y(0),"class":"axis"},svg);
  mk("line",{x1:X(0),x2:X(0),y1:Y(0),y2:Y(g.ymax),"class":"axis"},svg);
  mk("text",{x:(L+W-R)/2,y:H-10,"class":"alab","text-anchor":"middle"},svg).textContent=g.xl;
  mk("text",{x:16,y:(T+H-B)/2,"class":"alab","text-anchor":"middle",transform:"rotate(-90 16 "+(T+H-B)/2+")"},svg).textContent=g.yl;
  var rank={area:0,guide:1,curve:2,point:3};
  g.items.slice().sort(function(a,b){return rank[a.kind]-rank[b.kind];}).forEach(function(it){
   if(it.kind==="guide"){mk("polyline",{points:P(it.pts),"class":"guide"},svg);return;}
   var G=mk("g",{"class":"item k-"+it.k+(it.id===sel?" on":""),"data-id":it.id,tabindex:0,role:"button","aria-label":it.title},svg),lx,ly,an="start",p=it.pts;
   if(it.kind==="area"){
    mk("polygon",{points:P(p),"class":"area"},G);
    lx=X(p.reduce(function(s,q){return s+q[0];},0)/p.length);ly=Y(p.reduce(function(s,q){return s+q[1];},0)/p.length);an="middle";
   }else if(it.kind==="curve"){
    mk("polyline",{points:P(p),"class":"curve"},G);mk("polyline",{points:P(p),"class":"hit"},G);
    lx=X(p[p.length-1][0])-4;ly=Y(p[p.length-1][1])-9;an="end";
   }else{
    mk("circle",{cx:X(it.x),cy:Y(it.y),"class":"pt"},G);lx=X(it.x)+12;ly=Y(it.y)-12;
   }
   if(it.lab)mk("text",{x:lx,y:ly,"class":"lbl","text-anchor":an},G).textContent=it.lab;
   G.addEventListener("click",function(){choose(it.id);});
   G.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();choose(it.id);}});
  });
  show();
 }
 if(sl)sl.addEventListener("input",draw);
 draw();
}
