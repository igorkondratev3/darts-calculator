import{r as o,M as p,G as m,e as i,p as d,u,o as _,d as c,y as f,q as v}from"./index-0d521d25.js";const y=(t,s="")=>{const a=o(s);return p(()=>{t.value.focus()}),m(()=>{t.value.focus()}),a};const I={__name:"nameInput",props:{startName:String},emits:["updateParameter"],setup(t){const s=t,a=o(null),e=y(a,s.startName);return(l,n)=>i((_(),c("input",{type:"text",class:f(["auth__input",{"auth__input_border-valid":u(e)}]),placeholder:"Имя",maxlength:"15",required:"","data-type":"name",ref_key:"nameInput",ref:a,"onUpdate:modelValue":n[0]||(n[0]=r=>v(e)?e.value=r:null),onInput:n[1]||(n[1]=r=>l.$emit("updateParameter","name",u(e)))},null,34)),[[d,u(e)]])}};export{I as default};