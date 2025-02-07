import{r as f,j as s,u as S}from"./index-DWVpCRxj.js";import{H as N}from"./Head-D3mEvp2m.js";import{a as T,d as O,e as F,C as R,H,L as M}from"./Loader-1hJs2f6B.js";const A="/react-3d-dev-portfolio-1/assets/fox-W5Giziuq.glb",B=({currentAnimation:e,...t})=>{const r=f.useRef(null),{nodes:a,materials:o,animations:i}=T(A),{actions:l}=O(i,r);return f.useEffect(()=>{Object.values(l).forEach(m=>{m!=null&&m.stop()}),l[e]&&l[e].play()},[l,e]),s.jsx("group",{ref:r,...t,dispose:null,children:s.jsxs("group",{name:"Sketchfab_Scene",children:[s.jsx("primitive",{object:a.GLTF_created_0_rootJoint}),s.jsx("skinnedMesh",{name:"Object_7",geometry:a.Object_7.geometry,material:o.PaletteMaterial001,skeleton:a.Object_7.skeleton}),s.jsx("skinnedMesh",{name:"Object_8",geometry:a.Object_8.geometry,material:o.PaletteMaterial001,skeleton:a.Object_8.skeleton}),s.jsx("skinnedMesh",{name:"Object_9",geometry:a.Object_9.geometry,material:o.PaletteMaterial001,skeleton:a.Object_9.skeleton}),s.jsx("skinnedMesh",{name:"Object_10",geometry:a.Object_10.geometry,material:o.PaletteMaterial001,skeleton:a.Object_10.skeleton}),s.jsx("skinnedMesh",{name:"Object_11",geometry:a.Object_11.geometry,material:o.PaletteMaterial001,skeleton:a.Object_11.skeleton})]})})};class b{constructor(t=0,r="Network Error"){this.status=t,this.text=r}}const E=()=>{if(!(typeof localStorage>"u"))return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}},n={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:E()},p=e=>e?typeof e=="string"?{publicKey:e}:e.toString()==="[object Object]"?e:{}:{},q=(e,t="https://api.emailjs.com")=>{if(!e)return;const r=p(e);n.publicKey=r.publicKey,n.blockHeadless=r.blockHeadless,n.storageProvider=r.storageProvider,n.blockList=r.blockList,n.limitRate=r.limitRate,n.origin=r.origin||t},g=async(e,t,r={})=>{const a=await fetch(n.origin+e,{method:"POST",headers:r,body:t}),o=await a.text(),i=new b(a.status,o);if(a.ok)return i;throw i},x=(e,t,r)=>{if(!e||typeof e!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||typeof t!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!r||typeof r!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},V=e=>{if(e&&e.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},j=e=>e.webdriver||!e.languages||e.languages.length===0,y=()=>new b(451,"Unavailable For Headless Browser"),K=(e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if(typeof t!="string")throw"The BlockList watchVariable has to be a string"},C=e=>{var t;return!((t=e.list)!=null&&t.length)||!e.watchVariable},G=(e,t)=>e instanceof FormData?e.get(t):e[t],w=(e,t)=>{if(C(e))return!1;K(e.list,e.watchVariable);const r=G(t,e.watchVariable);return typeof r!="string"?!1:e.list.includes(r)},k=()=>new b(403,"Forbidden"),J=(e,t)=>{if(typeof e!="number"||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&typeof t!="string")throw"The LimitRate ID has to be a non-empty string"},D=async(e,t,r)=>{const a=Number(await r.get(e)||0);return t-Date.now()+a},v=async(e,t,r)=>{if(!t.throttle||!r)return!1;J(t.throttle,t.id);const a=t.id||e;return await D(a,t.throttle,r)>0?!0:(await r.set(a,Date.now().toString()),!1)},_=()=>new b(429,"Too Many Requests"),W=async(e,t,r,a)=>{const o=p(a),i=o.publicKey||n.publicKey,l=o.blockHeadless||n.blockHeadless,m=o.storageProvider||n.storageProvider,c={...n.blockList,...o.blockList},d={...n.limitRate,...o.limitRate};return l&&j(navigator)?Promise.reject(y()):(x(i,e,t),V(r),r&&w(c,r)?Promise.reject(k()):await v(location.pathname,d,m)?Promise.reject(_()):g("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:i,service_id:e,template_id:t,template_params:r}),{"Content-type":"application/json"}))},z=e=>{if(!e||e.nodeName!=="FORM")throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},I=e=>typeof e=="string"?document.querySelector(e):e,$=async(e,t,r,a)=>{const o=p(a),i=o.publicKey||n.publicKey,l=o.blockHeadless||n.blockHeadless,m=n.storageProvider||o.storageProvider,c={...n.blockList,...o.blockList},d={...n.limitRate,...o.limitRate};if(l&&j(navigator))return Promise.reject(y());const u=I(r);x(i,e,t),z(u);const h=new FormData(u);return w(c,h)?Promise.reject(k()):await v(location.pathname,d,m)?Promise.reject(_()):(h.append("lib_version","4.4.1"),h.append("service_id",e),h.append("template_id",t),h.append("user_id",i),g("/api/v1.0/email/send-form",h))},Q={init:q,send:W,sendForm:$,EmailJSResponseStatus:b},U=({type:e,text:t})=>s.jsx("div",{className:"fixed top-10 right-0 left-0 z-20 flex items-center justify-center",children:s.jsxs("div",{className:`p-2 ${e==="danger"?"bg-red-800":"bg-blue-800"} flex items-center leading-none text-indigo-100 lg:inline-flex lg:rounded-full`,role:"alert",children:[s.jsx("p",{className:`flex rounded-full ${e==="danger"?"bg-red-500":"bg-blue-500"} mr-3 px-2 py-1 text-xs font-semibold uppercase`,children:e==="danger"?"Failed":"Success"}),s.jsx("p",{className:"mr-2 text-left",children:t})]})}),X=()=>{const[e,t]=f.useState({show:!1,text:"",type:"danger"});return{alert:e,showAlert:({text:o,type:i="danger"})=>t({show:!0,text:o,type:i}),hideAlert:()=>t({show:!1,text:"",type:"danger"})}},Y=()=>{const e=S(),{alert:t,showAlert:r,hideAlert:a}=X(),o=f.useRef(null),[i,l]=f.useState(!1),[m,c]=f.useState("idle"),d=()=>c("walk"),u=()=>c("idle"),h=L=>{L.preventDefault(),l(!0),c("hit"),o.current!=null&&Q.sendForm("service_4m0lkw7","template_w786r8p",o.current,"ZwQtxkqbnXNGtKg09").then(()=>{l(!1),r({text:"Thank you for your message 😃",type:"success"}),setTimeout(()=>{a(),c("idle"),e(0)},3e3)},P=>{l(!1),console.error(P),c("idle"),r({text:"I didn't receive your message 😢",type:"danger"}),setTimeout(()=>{a()},3e3)})};return s.jsxs(s.Fragment,{children:[s.jsx(N,{title:"Contact"}),s.jsxs("section",{className:"max-container relative flex flex-col lg:flex-row",children:[t.show&&s.jsx(U,{type:t.type,text:t.text}),s.jsxs("div",{className:"flex min-w-[50%] flex-1 flex-col",children:[s.jsx("h1",{className:"head-text",children:"Get in Touch"}),s.jsxs("form",{ref:o,onSubmit:h,className:"mt-14 flex w-full flex-col gap-7",children:[s.jsxs("label",{className:"text-black-500 font-semibold",children:["Name",s.jsx("input",{type:"text",name:"user_name",className:"input",placeholder:"John",required:!0,onFocus:d,onBlur:u})]}),s.jsxs("label",{className:"text-black-500 font-semibold",children:["Email",s.jsx("input",{type:"email",name:"user_email",className:"input",placeholder:"John@gmail.com",required:!0,onFocus:d,onBlur:u})]}),s.jsxs("label",{className:"text-black-500 font-semibold",children:["Your Message",s.jsx("textarea",{name:"message",rows:4,className:"textarea",placeholder:"Write your thoughts here...",required:!0,onFocus:d,onBlur:u})]}),s.jsx("button",{type:"submit",disabled:i,className:F("btn",{"cursor-pointer":!i,"cursor-not-allowed":i}),onFocus:d,onBlur:u,children:i?"Sending...":"Submit"})]})]}),s.jsx("div",{className:"h-[350px] w-full md:h-[550px] lg:h-auto lg:w-1/2",children:s.jsxs(R,{camera:{position:[0,0,5],fov:75,near:.1,far:1e3},children:[s.jsx("directionalLight",{position:[0,0,1],intensity:2.5}),s.jsx("ambientLight",{intensity:1}),s.jsx("pointLight",{position:[5,10,0],intensity:2}),s.jsx("spotLight",{position:[10,10,10],angle:.15,penumbra:1,intensity:2}),s.jsx(f.Suspense,{fallback:s.jsx(H,{children:s.jsx(M,{})}),children:s.jsx(B,{currentAnimation:m,position:[.5,.35,0],rotation:[12.629,-.6,0],scale:[.5,.5,.5]})})]})})]})]})};Y.displayName="ContactPage";export{Y as Component};
