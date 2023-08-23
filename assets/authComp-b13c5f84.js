import{o as _,d as g,s as y,u as t,r as m,b as D,n as B,t as w,y as k,x as R,F as S,z as I,f as p,j as T,m as L,k as b,_ as P,c as O,K,h as U,i as J,L as z,e as F,v as H,g as x}from"./index-0d521d25.js";import{_ as W}from"./close-ed01941b.js";import{_ as q}from"./loadingAuth-3286095e.js";const G={},Q={type:"text",class:"auth__input",disabled:""};function X(r,e){return _(),g("input",Q)}const M=q(G,[["render",X]]),Y=(r,e,a,n,s)=>{const o=y(()=>t(r)==="Вход"?!!(a.email.value&&a.password.value):t(r)==="Регистрация"?!!(a.name.value&&a.email.value&&a.password.value&&a.repeatPassword.value):!1),u=m(!1);return{isEnabled:o,startAuth:u,auth:async()=>{if(u.value=!0,s("changeErrorMessage",""),t(r)==="Вход"&&ee(e,a,n)){s("changeErrorMessage","Вход с данным адресом электронной почты уже произведен"),u.value=!1;return}let i;try{i=await Z(t(r),a)}catch(h){console.error(h),s("changeErrorMessage","Ошибка доступа к серверу"),u.value=!1;return}Object.hasOwn(i,"error")||(n.login(e,i),localStorage.setItem(`user${e}`,JSON.stringify(i)),u.value=!1,s("closeAuthComp")),Object.hasOwn(i,"error")&&(s("changeErrorMessage",i.error),u.value=!1)}}},Z=async(r,e)=>{const a=`https://darts-calculator-api.onrender.com/user/${r==="Вход"?"signin":"signup"}`,n={method:"POST",body:JSON.stringify({name:e.name.value,email:e.email.value,password:e.password.value}),headers:{"Content-Type":"application/json"}},s=await fetch(a,n),o=await s.json();return!s.ok&&!Object.hasOwn(o,"error")?{error:"Неизвестная ошибка"}:o},ee=(r,e,a)=>{var s,o;let n="";return r==="P2"&&(n="P1"),r==="P1"&&(n="P2"),((s=a.users[n])==null?void 0:s.email)===e.email.value?!0:(((o=JSON.parse(localStorage.getItem(`user${n}`)))==null?void 0:o.email)===e.email.value&&localStorage.removeItem(`user${n}`),!1)};const ae=["disabled"],te={__name:"authButton",props:{type:String,player:String,authInformation:Object},emits:["changeErrorMessage","closeAuthComp"],setup(r,{emit:e}){const a=r,n=D(),{isEnabled:s,startAuth:o,auth:u}=Y(B(a,"type"),a.player,a.authInformation,n,e);return(l,i)=>(_(),g("button",{class:k(["auth__button",{auth__button_disabled:!t(s)||t(o)}]),disabled:!t(s)||t(o),onClick:i[0]||(i[0]=(...h)=>t(u)&&t(u)(...h))},w(a.type),11,ae))}},re=(r,e)=>{const a=y(()=>t(r)==="Вход"?120:40),n=y(()=>t(r)==="Вход"?2:4),s=y(()=>[t(r)==="Вход"&&e.email.value||t(r)==="Регистрация"&&e.name.value,t(r)==="Вход"&&e.password.value||t(r)==="Регистрация"&&e.email.value,e.password.value,e.repeatPassword.value]);return{lineWidth:a,numberOfButtons:n,isCompleted:s}};const se={class:"auth__parameter-navigation parameter-navigation"},ne={key:0,class:"parameter-navigation__svg-area"},oe=["onClick"],ue={__name:"parameterNavigation",props:{parameterNumber:Number,authType:String,authInformation:Object},emits:["changeParameterNumber"],setup(r){const e=r;R(o=>({"605d1f10":t(a)}));const{lineWidth:a,numberOfButtons:n,isCompleted:s}=re(B(e,"authType"),e.authInformation);return(o,u)=>(_(),g("nav",se,[(_(!0),g(S,null,I(t(n),l=>(_(),g(S,{key:l+"button"},[l!==1?(_(),g("svg",ne,[p("line",{class:k(["parameter-navigation__line",{"parameter-navigation__line_width_1":e.authType==="Вход","parameter-navigation__line_width_2":e.authType==="Регистрация"}]),x1:"10%",y1:"50%",x2:"90%",y2:"50%"},null,2)])):T("",!0),p("button",{class:k(["parameter-navigation__button",{"parameter-navigation__current":r.parameterNumber===l,"parameter-navigation__completed":t(s)[l-1]}]),onClick:i=>o.$emit("changeParameterNumber",l)},w(l),11,oe)],64))),128))]))}},le=r=>{const e=m(""),a=n=>e.value=n;return L(r,()=>a("")),{errorMessage:e,changeErrorMessage:a}},ie=r=>{const e=m("Вход"),a=m(1),n=y(()=>{if(e.value==="Вход"){if(a.value===1)return l;if(a.value===2)return f}if(e.value==="Регистрация"){if(a.value===1)return i;if(a.value===2)return l;if(a.value===3)return f;if(a.value===4)return h}return l}),s=()=>{e.value==="Вход"?e.value="Регистрация":e.value="Вход",o(1)},o=C=>a.value=C,u=(C,d,$,E)=>{if(!$[C.currentTarget.dataset.type].value){E();return}e.value==="Вход"&&(a.value===1&&a.value++,a.value===2&&d.children[d.children.length-1].focus()),e.value==="Регистрация"&&(a.value<4&&a.value++,a.value===4&&d.children[d.children.length-1].focus())},l=b({loader:()=>P(()=>import("./emailInput-a36499d6.js"),["assets/emailInput-a36499d6.js","assets/index-0d521d25.js","assets/index-46c032b2.css","assets/emailInput-e3b0c442.css"]),loadingComponent:r,delay:0}),i=b({loader:()=>P(()=>import("./nameInput-6232c3cb.js"),["assets/nameInput-6232c3cb.js","assets/index-0d521d25.js","assets/index-46c032b2.css","assets/emailInput-e3b0c442.css"]),loadingComponent:r,delay:0}),h=b({loader:()=>P(()=>import("./repeatPasswordInput-732c90f1.js"),["assets/repeatPasswordInput-732c90f1.js","assets/index-0d521d25.js","assets/index-46c032b2.css","assets/emailInput-e3b0c442.css"]),loadingComponent:r,delay:0}),f=b({loader:()=>P(()=>import("./passwordInput-ba96cacf.js"),["assets/passwordInput-ba96cacf.js","assets/index-0d521d25.js","assets/index-46c032b2.css","assets/emailInput-e3b0c442.css"]),loadingComponent:r,delay:0});return{header:e,parameterNumber:a,currentParameter:n,changeHeader:s,changeParameterNumber:o,checkParameter:u}},ce=(r,e)=>{const a=m(!1),n=y(()=>{if(r.value==="Вход"){if(e.value===1)return"Email должен соответствовать следующему шаблону: example@example.com";if(e.value===2)return"Пароль должен состоять из не менее чем 8 символов, содержащих латинские буквы в верхнем и нижнем регистре, цифры и спецсимволы"}if(r.value==="Регистрация"){if(e.value===1)return"Поле должно быть заполнено";if(e.value===2)return"Email должен соответствовать следующему шаблону: example@example.com";if(e.value===3)return"Пароль должен состоять из не менее чем 8 символов, содержащих латинские буквы в верхнем и нижнем регистре, цифры и спецсимволы";if(e.value===4)return'Значение должно соответстовать значению, введенному в поле "Пароль"'}return"Поле должно быть заполнено"});return{clueSeen:a,clueMessage:n,showClue:u=>{a.value=!0,u&&u.currentTarget.previousSibling.focus()},closeClue:()=>a.value=!1}},_e=r=>{const e={name:m(""),email:m(""),password:m(""),repeatPassword:m(""),updateParameter(n,s){this[n].value=s}};return{authInformation:e,updateParameter:(n,s)=>{e.updateParameter(n,s),e[n].value&&r()}}};const me={class:"auth-and-error"},pe=p("img",{class:"auth__icon",src:W,alt:"закрыть"},null,-1),de=[pe],ve={class:"auth__header"},he=["disabled"],Ce={__name:"authComp",props:{player:String},emits:["closeAuthComp"],setup(r){const e=r,a=b({loader:()=>P(()=>import("./errorMessage-98605571.js"),["assets/errorMessage-98605571.js","assets/index-0d521d25.js","assets/index-46c032b2.css","assets/errorMessage-8bc78a32.css"]),loadingComponent:M,delay:0}),n=m(null),{header:s,parameterNumber:o,currentParameter:u,changeHeader:l,changeParameterNumber:i,checkParameter:h}=ie(M),{clueSeen:f,clueMessage:C,showClue:d,closeClue:$}=ce(s,o),{errorMessage:E,changeErrorMessage:j}=le(s),{authInformation:A,updateParameter:V}=_e($);return(N,c)=>(_(),g("div",me,[p("div",{class:"auth",ref_key:"auth",ref:n},[p("button",{class:"auth__change-button",onClick:c[0]||(c[0]=(...v)=>t(l)&&t(l)(...v))},w(t(s)==="Вход"?"Регистрация":"Вход"),1),p("button",{class:"auth__close",title:"Закрыть",onClick:c[1]||(c[1]=v=>N.$emit("closeAuthComp"))},de),p("h3",ve,w(t(s)),1),(_(),O(z,null,[(_(),O(K(t(u)),{onKeydown:c[2]||(c[2]=U(J(v=>t(h)(v,n.value,t(A),t(d)),["prevent"]),["enter"])),onUpdateParameter:t(V),onBlur:c[3]||(c[3]=v=>f.value=!1),password:t(A).password.value},null,40,["onUpdateParameter","password"]))],1024)),p("button",{class:"auth__clue-button",onClick:c[4]||(c[4]=(...v)=>t(d)&&t(d)(...v)),disabled:t(f)}," подсказка ",8,he),F(p("div",{class:"auth__clue"},w(t(C)),513),[[H,t(f)]]),x(ue,{parameterNumber:t(o),authType:t(s),authInformation:t(A),onChangeParameterNumber:t(i)},null,8,["parameterNumber","authType","authInformation","onChangeParameterNumber"]),x(te,{type:t(s),player:e.player,authInformation:t(A),onChangeErrorMessage:t(j),onCloseAuthComp:c[5]||(c[5]=v=>N.$emit("closeAuthComp"))},null,8,["type","player","authInformation","onChangeErrorMessage"])],512),t(E)?(_(),O(t(a),{key:0,message:t(E)},null,8,["message"])):T("",!0)]))}};export{Ce as default};