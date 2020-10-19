(()=>{"use strict";class t{constructor(t,e,n,s,a){this.title=t,this.desc=e,this.date=n,this.priority=s,this.group=a,this.complete=!1}getTitle(){return this.title}getDesc(){return this.desc}getDate(){return this.date}getPriority(){return this.priority}getComplete(){return this.complete}getGroup(){return this.group}setTitle(t){this.title=t}setDesc(t){this.desc=t}setDate(t){this.date=t}setPriority(t){this.priority=t}setComplete(t){this.complete=t}setGroup(t){this.group=t}}function e(t){const e=window.localStorage;e.removeItem("tasks"),e.setItem("tasks",JSON.stringify(t))}function n(){const t=window.localStorage;let e=JSON.parse(t.getItem("tasks"));return e||(e=[]),e}function s(){const t=window.localStorage;let e=JSON.parse(t.getItem("groups"));return e||(e=["General"]),e}function a(e,n=null){const s=document.getElementById("task-title"),a=document.getElementById("task-desc"),i=document.getElementById("task-date"),c=document.getElementById("task-priority"),o=document.getElementById("task-group");let d;switch(e){case"get":d=new t(s.value,a.value,i.value,c.checked,o.value);break;case"clear":s.value="",a.value="",i.value="",c.checked=!1;break;case"set":s.value=n.title,a.value=n.desc,i.value=n.date,c.checked=n.priority,o.value=n.group}return d}function i(){const t=document.getElementById("content");for(;t.firstChild;)t.removeChild(t.firstChild)}function c(t){const e=t.target.getAttribute("tabIndex");document.getElementById("tasks"+e).classList.toggle("hide")}function o(){const t=document.getElementById("task-group"),e=[],n=s();for(;t.firstChild;)t.removeChild(t.firstChild);for(let t=0;t<n.length;t+=1){const s=document.createElement("option");s.innerText=n[t],s.value=n[t],e.push(s)}t.selectedIndex="0",t.append(...e)}function d(t){if("BUTTON"!==t.target.nodeName){const[e]=t.target.getElementsByClassName("task-desc"),[n]=t.target.getElementsByClassName("edit");e.classList.toggle("hide"),n.classList.toggle("hide")}}function l(t){const s=parseInt(t.target.tabIndex),a=n();a[s].complete=!0,e(a),i(),g(),t.target.tabIndex=0,c(t)}function r(t){const e=document.getElementById("task-form"),s=document.getElementById("content"),i=document.getElementById("group-button"),c=document.getElementById("task-button"),d=document.getElementById("edit-button"),l=parseInt(t.target.tabIndex),r=n();d.classList.toggle("hide"),c.classList.toggle("hide"),i.classList.toggle("hide"),s.classList.toggle("hide"),e.classList.toggle("hide"),a("set",r[l]),o(),d.tabIndex=l}function u(t,e){const s=document.getElementById("content"),a=document.createElement("button");a.classList.add("groups"),a.setAttribute("id",t+e),a.tabIndex=e,a.innerHTML='<i class="fa fa-chevron-down fa-1x" aria-hidden="true"></i>   '+t,a.addEventListener("click",c),s.append(a);const i=function(t,e){const s=document.createElement("div"),a=n();s.setAttribute("id","tasks"+e),s.classList.add("hide"),s.classList.add("tasks");const i=a.filter((e=>e.group===t)),c=[];if(0===i.length){const t=document.createElement("h2");t.innerText="No Tasks Assigned",t.setAttribute("class","empty"),c.push(t)}else for(let t=0;t<i.length;t+=1){const e=h(i[t]);c.push(e)}return s.append(...c),s}(t,e);s.appendChild(i)}function g(){const t=[],e=s();for(let n=0;n<e.length;n+=1)t.push(u(e[n],n))}function m(t){const s=parseInt(t.target.tabIndex),a=n();a.splice(s,1),e(a),i(),g();let o=new Event("click");o=t,o.target.tabIndex=0,c(o)}function h(t){const e=document.createElement("div"),s=n().findIndex((e=>JSON.stringify(t)===JSON.stringify(e)));e.classList.add("task-card"),t.priority&&e.classList.add("high-priority");const a=document.createElement("h1");a.classList.add("task-title"),a.textContent=t.title;const i=document.createElement("p");i.setAttribute("class","task-desc hide"),i.textContent=t.desc;const c=document.createElement("p");c.textContent=t.date;const o=document.createElement("div");o.classList.add("buttons");const u=document.createElement("button");u.setAttribute("class","action-button delete"),u.setAttribute("tabIndex",s),u.innerHTML='<i class="fa fa-trash-o fa-3x" aria-hidden="true"></i>',u.addEventListener("click",m);const g=document.createElement("button");g.setAttribute("class","action-button edit hide"),g.tabIndex=s,g.innerHTML=`<i class="fa fa-pencil fa-3x" tabindex =${s} aria-hidden="true"></i>`,g.addEventListener("click",r);const h=document.createElement("button");return h.setAttribute("class","action-button complete"),h.tabIndex=s,h.innerHTML=`<i class="fa fa-check fa-3x" tabindex =${s} aria-hidden="true"></i>`,h.addEventListener("click",l),t.complete&&(h.classList.add("hide"),e.classList.add("complete-task")),o.append(h,g,u),e.append(a,i,c,o),e.addEventListener("click",d),e}document.getElementById("task-button").addEventListener("click",(function(t){const s=document.getElementById("task-form"),c=document.getElementById("content"),d=document.getElementById("group-button"),l=t.target.getAttribute("data-state"),r=n();if("1"===l){t.target.setAttribute("data-state","0");const n=a("get");a("clear"),r.push(n),e(r),i(),g()}else t.target.setAttribute("data-state","1");o(),s.classList.toggle("hide"),c.classList.toggle("hide"),t.target.classList.toggle("full-view"),d.classList.toggle("hide")})),document.getElementById("group-button").addEventListener("click",(function(t){const e=document.getElementById("group-form"),n=document.getElementById("content"),a=document.getElementById("task-button"),c=t.target.getAttribute("data-state"),o=document.getElementById("group-name"),d=s();"1"===c?(t.target.setAttribute("data-state","0"),d.push(o.value),function(t){const e=window.localStorage;e.removeItem("groups"),e.setItem("groups",JSON.stringify(t))}(d),i(),g()):t.target.setAttribute("data-state","1"),e.classList.toggle("hide"),n.classList.toggle("hide"),t.target.classList.toggle("full-view"),a.classList.toggle("hide")})),document.getElementById("edit-button").addEventListener("click",(function(t){const s=document.getElementById("task-form"),c=document.getElementById("content"),o=document.getElementById("group-button"),d=document.getElementById("task-button"),l=parseInt(t.target.tabIndex),r=n(),u=a("get");t.target.classList.toggle("hide"),d.classList.toggle("hide"),o.classList.toggle("hide"),c.classList.toggle("hide"),s.classList.toggle("hide"),a("clear"),r[l]=u,e(r),i(),g()})),o(),g()})();