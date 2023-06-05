import{r as s,E as R,w as k,g as K,o as c,b as f,n as T,c as I,k as U,t as C,a as g,u as J,F as O,f as q,d as v,m as M,s as P,_ as E,i as x,G as F,h as z,q as G,K as H,v as W,l as S}from"./index-a42a8121.js";import{_ as Q}from"./close-ed01941b.js";import{_ as X}from"./fetch-64dbb915.js";const A={__name:"emailInput",emits:["updateParameter"],setup(h,{emit:a}){const e=s(null);R(()=>{e.value.focus()});const l=s(""),d=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,o=s(!1),p=()=>{o.value=!1,d.test(l.value)&&(o.value=!0)},i=()=>{p(),a("updateParameter","email",o.value?l.value:"")};return(t,n)=>k((c(),f("input",{type:"email",class:T(["auth__input",{"auth__input_border-invalid":!o.value&&l.value,"auth__input_border-valid":o.value}]),placeholder:"Email",maxlength:"320",required:"","data-type":"email",ref_key:"emailInput",ref:e,"onUpdate:modelValue":n[0]||(n[0]=r=>l.value=r),onInput:i},null,34)),[[K,l.value]])}},Y={},Z={type:"text",class:"auth__input",disabled:""};function ee(h,a){return c(),f("input",Z)}const $=X(Y,[["render",ee]]);const ae=["disabled"],te={__name:"authButton",props:{type:String,player:String,authInformation:Object},emits:["changeErrorMessage","closeAuthComp"],setup(h,{emit:a}){const e=h,l=I(()=>e.type==="Вход"?Boolean(e.authInformation.email.value&&e.authInformation.password.value):e.type==="Регистрация"?Boolean(e.authInformation.name.value&&e.authInformation.email.value&&e.authInformation.password.value&&e.authInformation.repeatPassword.value):!1),d=U(),o=s(!1),p=async()=>{if(o.value=!0,a("changeErrorMessage",""),e.type==="Вход"&&t()){a("changeErrorMessage","Вход с данным адресом электронной почты уже произведен"),o.value=!1;return}let n;try{n=await i()}catch(r){console.error(r),a("changeErrorMessage","Ошибка доступа к серверу"),o.value=!1;return}Object.hasOwn(n,"error")||(d.login(e.player,n),localStorage.setItem(`user${e.player}`,JSON.stringify(n)),o.value=!1,a("closeAuthComp")),Object.hasOwn(n,"error")&&(a("changeErrorMessage",n.error),o.value=!1)},i=async()=>{const n=`https://darts-calculator-api.onrender.com/user/${e.type==="Вход"?"signin":"signup"}`,r={method:"POST",body:JSON.stringify({name:e.authInformation.name.value,email:e.authInformation.email.value,password:e.authInformation.password.value}),headers:{"Content-Type":"application/json"}},y=await fetch(n,r),_=await y.json();return!y.ok&&!Object.hasOwn(_,"error")?{error:"Неизвестная ошибка"}:_},t=()=>{var r,y;let n="";return e.player==="P2"&&(n="P1"),e.player==="P1"&&(n="P2"),((r=d.users[n])==null?void 0:r.email)===e.authInformation.email.value?!0:(((y=JSON.parse(localStorage.getItem(`user${n}`)))==null?void 0:y.email)===e.authInformation.email.value&&localStorage.removeItem(`user${n}`),!1)};return(n,r)=>(c(),f("button",{class:T(["auth__button",{auth__button_disabled:!g(l)||o.value}]),disabled:!g(l)||o.value,onClick:p},C(e.type),11,ae))}};const re={class:"auth__parameter-navigation parameter-navigation"},ne={key:0,class:"parameter-navigation__svg-area"},oe=["onClick"],ue={__name:"parameterNavigation",props:{parameterNumber:Number,authType:String,authInformation:Object},emits:["changeParameterNumber"],setup(h){const a=h;J(o=>({"10f8b784":g(e)}));const e=I(()=>a.authType==="Вход"?120:40),l=I(()=>a.authType==="Вход"?2:4),d=I(()=>[a.authType==="Вход"&&a.authInformation.email.value||a.authType==="Регистрация"&&a.authInformation.name.value,a.authType==="Вход"&&a.authInformation.password.value||a.authType==="Регистрация"&&a.authInformation.email.value,a.authInformation.password.value,a.authInformation.repeatPassword.value]);return(o,p)=>(c(),f("nav",re,[(c(!0),f(O,null,q(g(l),i=>(c(),f(O,{key:i+"button"},[i!==1?(c(),f("svg",ne,[v("line",{class:T(["parameter-navigation__line",{"parameter-navigation__line_width_1":a.authType==="Вход","parameter-navigation__line_width_2":a.authType==="Регистрация"}]),x1:"10%",y1:"50%",x2:"90%",y2:"50%"},null,2)])):M("",!0),v("button",{class:T(["parameter-navigation__button",{"parameter-navigation__current":h.parameterNumber===i,"parameter-navigation__completed":g(d)[i-1]}]),onClick:t=>o.$emit("changeParameterNumber",i)},C(i),11,oe)],64))),128))]))}};const se={class:"auth-and-error"},le=v("img",{class:"auth__icon",src:Q,alt:"закрыть"},null,-1),ie=[le],ce={class:"auth__header"},me=["disabled"],he={__name:"authComp",props:{player:String},emits:["closeAuthComp"],setup(h){const a=h,e=P({loader:()=>E(()=>import("./nameInput-6b959486.js"),["assets/nameInput-6b959486.js","assets/index-a42a8121.js","assets/index-196bc00e.css","assets/nameInput-e3b0c442.css"]),loadingComponent:$,delay:0}),l=P({loader:()=>E(()=>import("./repeatPasswordInput-66c677cc.js"),["assets/repeatPasswordInput-66c677cc.js","assets/index-a42a8121.js","assets/index-196bc00e.css","assets/nameInput-e3b0c442.css"]),loadingComponent:$,delay:0}),d=P({loader:()=>E(()=>import("./errorMessage-1f3b26be.js"),["assets/errorMessage-1f3b26be.js","assets/index-a42a8121.js","assets/index-196bc00e.css","assets/errorMessage-a1614421.css"]),loadingComponent:$,delay:0}),o=P({loader:()=>E(()=>import("./passwordInput-5c999eb6.js"),["assets/passwordInput-5c999eb6.js","assets/index-a42a8121.js","assets/index-196bc00e.css","assets/nameInput-e3b0c442.css"]),loadingComponent:$,delay:0}),p=s(""),i=u=>p.value=u,t=s(1),n=u=>t.value=u,r=s("Вход"),y=()=>{r.value==="Вход"?r.value="Регистрация":r.value="Вход",t.value=1,p.value=""},_={name:s(""),email:s(""),password:s(""),repeatPassword:s(""),updateParameter(u,m){this[u].value=m}},B=(u,m)=>{_.updateParameter(u,m),_[u].value&&(b.value=!1)},V=I(()=>{if(r.value==="Вход"){if(t.value===1)return A;if(t.value===2)return o}if(r.value==="Регистрация"){if(t.value===1)return e;if(t.value===2)return A;if(t.value===3)return o;if(t.value===4)return l}return A}),b=s(!1),j=u=>{b.value=!0,u.currentTarget.previousSibling.focus()},D=I(()=>{if(r.value==="Вход"){if(t.value===1)return"Email должен соответствовать следующему шаблону: example@example.com";if(t.value===2)return"Пароль должен состоять из не менее чем 8 символов, содержащих латинские буквы в верхнем и нижнем регистре, цифры и спецсимволы"}if(r.value==="Регистрация"){if(t.value===1)return"Поле должно быть заполнено";if(t.value===2)return"Email должен соответствовать следующему шаблону: example@example.com";if(t.value===3)return"Пароль должен состоять из не менее чем 8 символов, содержащих латинские буквы в верхнем и нижнем регистре, цифры и спецсимволы";if(t.value===4)return'Значение должно соответстовать значению, введенному в поле "Пароль"'}return"Поле должно быть заполнено"}),w=s(null),L=u=>{if(!_[u.currentTarget.dataset.type].value){b.value=!0;return}r.value==="Вход"&&(t.value===1&&t.value++,t.value===2&&w.value.children[w.value.children.length-1].focus()),r.value==="Регистрация"&&(t.value<4&&t.value++,t.value===4&&w.value.children[w.value.children.length-1].focus())};return(u,m)=>(c(),f("div",se,[v("div",{class:"auth",ref_key:"auth",ref:w},[v("button",{class:"auth__change-button",onClick:y},C(r.value==="Вход"?"Регистрация":"Вход"),1),v("button",{class:"auth__close",title:"Закрыть",onClick:m[0]||(m[0]=N=>u.$emit("closeAuthComp"))},ie),v("h3",ce,C(r.value),1),(c(),x(H,null,[(c(),x(F(g(V)),{onKeydown:z(G(L,["prevent"]),["enter"]),onUpdateParameter:B,onBlur:m[1]||(m[1]=N=>b.value=!1),password:_.password.value},null,40,["onKeydown","password"]))],1024)),v("button",{class:"auth__clue-button",onClick:j,disabled:b.value}," подсказка ",8,me),k(v("div",{class:"auth__clue"},C(g(D)),513),[[W,b.value]]),S(ue,{parameterNumber:t.value,authType:r.value,authInformation:_,onChangeParameterNumber:n},null,8,["parameterNumber","authType"]),S(te,{type:r.value,player:a.player,authInformation:_,onChangeErrorMessage:i,onCloseAuthComp:m[2]||(m[2]=N=>u.$emit("closeAuthComp"))},null,8,["type","player"])],512),p.value?(c(),x(g(d),{key:0,message:p.value},null,8,["message"])):M("",!0)]))}};export{he as default};
