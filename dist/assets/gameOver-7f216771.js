import{r as P,k as x,o as n,b as u,a as b,n as w,m as p,F as f,d as t,t as a,s as D,_ as k,i as N,w as F,v as T,l as m}from"./index-5dc47f3f.js";import{L as j}from"./fetch-7e6a8300.js";import{_ as W,a as O,b as U}from"./GamePage-7491f9ef.js";import"./homeButton-8b356e28.js";import"./close-ed01941b.js";const G="/darts-calculator/assets/add_circle-9b48313c.svg";const A=["disabled"],B=t("img",{class:"save-icon",src:G,alt:"add"},null,-1),L=[B],E=t("img",{class:"save-icon",src:W,alt:"done"},null,-1),M=[E],C={__name:"saveStatistic",props:{player:String,gameStatistic:Object,isPercentDoubleInStat:Boolean,legNumber:Number,legsWonInGame:Number},emits:["showPopUp"],setup(e,{emit:s}){const o=e,l=P(!1),h=P(!1),_=x(),$=async g=>{var y,I;l.value=!0;const d={};for(const v in o.gameStatistic)d[v]=o.gameStatistic[v].value;o.isPercentDoubleInStat||delete d.percentDouble;const S="https://darts-calculator-api.onrender.com//statistic/set",i={method:"POST",body:JSON.stringify({refreshToken:((y=_.users[g])==null?void 0:y.refreshToken)||"",statistic:d,legs:o.legNumber,legsWon:o.legsWonInGame,legsLose:o.legNumber-o.legsWonInGame,timeZone:new Date().getTimezoneOffset()/60}),headers:{authorization:`Bearer ${(I=_.users[g])==null?void 0:I.token}`,"Content-Type":"application/json"}};let r,c;try{r=await fetch(S,i),c=await r.json()}catch(v){console.error(v),s("showPopUp","Ошибка доступа к серверу"),l.value=!1;return}if(c&&Object.hasOwn(c,"newTokens")){_.updateTokens(g,c.newTokens.token,c.newTokens.refreshToken);const v=JSON.parse(localStorage.getItem(`user${g}`));v.token=c.newTokens.token,v.refreshToken=c.newTokens.refreshToken,localStorage.setItem(`user${g}`,JSON.stringify(v))}if(c&&Object.hasOwn(c,"error")){console.error(c.error),s("showPopUp",c.error),l.value=!1;return}if(!c||!r.ok&&!Object.hasOwn(c,"error")){l.value=!1,s("showPopUp","Не удалось сохранить статистику");return}h.value=!0};return(g,d)=>(n(),u(f,null,[b(_).users[e.player]&&!h.value?(n(),u("button",{key:0,class:w(["game-statistic__save",{"game-statistic__save_left":e.player==="P1","game-statistic__save_right":e.player==="P2"}]),onClick:d[0]||(d[0]=S=>$(e.player)),title:"сохранить статистику матча",disabled:l.value},L,10,A)):p("",!0),b(_).users[e.player]&&h.value&&l.value?(n(),u("div",{key:1,class:w(["game-statistic__save game-statistic__save-done",{"game-statistic__save_left":e.player==="P1","game-statistic__save_right":e.player==="P2"}]),title:"статистика сохранена"},M,2)):p("",!0)],64))}},V=t("h4",{class:"game-statistic__header-group"},"Средний набор",-1),z={class:"game-statistic__parameters statistic-parameters"},J={class:"statistic-parameters__values"},R=t("h5",{class:"statistic-parameters__header"},"матч",-1),Z={class:"statistic-parameters__values"},q={class:"game-statistic__parameters statistic-parameters"},H={class:"statistic-parameters__values"},K=t("h5",{class:"statistic-parameters__header"},"выигранные леги",-1),Q={class:"statistic-parameters__values"},X={class:"game-statistic__parameters statistic-parameters"},Y={class:"statistic-parameters__values"},tt=t("h5",{class:"statistic-parameters__header"},"проигранные леги",-1),et={class:"statistic-parameters__values"},st={class:"game-statistic__parameters statistic-parameters"},at={class:"statistic-parameters__values"},it=t("h5",{class:"statistic-parameters__header"},"9 дротиков",-1),ot={class:"statistic-parameters__values"},rt={__name:"gameAverage",props:{gameStatisticP1:Object,gameStatisticP2:Object},setup(e){return(s,o)=>(n(),u(f,null,[V,t("div",z,[t("div",J,a(e.gameStatisticP1.averagePoints.value.toFixed(2)),1),R,t("div",Z,a(e.gameStatisticP2.averagePoints.value.toFixed(2)),1)]),t("div",q,[t("div",H,a(e.gameStatisticP1.averagePointsWinLegs.value.toFixed(2)),1),K,t("div",Q,a(e.gameStatisticP2.averagePointsWinLegs.value.toFixed(2)),1)]),t("div",X,[t("div",Y,a(e.gameStatisticP1.averagePointsLoseLegs.value.toFixed(2)),1),tt,t("div",et,a(e.gameStatisticP2.averagePointsLoseLegs.value.toFixed(2)),1)]),t("div",st,[t("div",at,a(e.gameStatisticP1.averageFirstNineDarts.value.toFixed(2)),1),it,t("div",ot,a(e.gameStatisticP2.averageFirstNineDarts.value.toFixed(2)),1)])],64))}},ct=t("h4",{class:"game-statistic__header-group"},"Очки",-1),nt={class:"game-statistic__parameters statistic-parameters"},lt={class:"statistic-parameters__values"},_t=t("h5",{class:"statistic-parameters__header"},"180",-1),mt={class:"statistic-parameters__values"},ut={class:"game-statistic__parameters statistic-parameters"},gt={class:"statistic-parameters__values"},dt=t("h5",{class:"statistic-parameters__header"},"171+",-1),vt={class:"statistic-parameters__values"},Pt={class:"game-statistic__parameters statistic-parameters"},pt={class:"statistic-parameters__values"},ht=t("h5",{class:"statistic-parameters__header"},"131+",-1),St={class:"statistic-parameters__values"},bt={class:"game-statistic__parameters statistic-parameters"},$t={class:"statistic-parameters__values"},ft=t("h5",{class:"statistic-parameters__header"},"96+",-1),yt={class:"statistic-parameters__values"},It={__name:"gamePoints",props:{gameStatisticP1:Object,gameStatisticP2:Object},setup(e){return(s,o)=>(n(),u(f,null,[ct,t("div",nt,[t("div",lt,a(e.gameStatisticP1.p180.value),1),_t,t("div",mt,a(e.gameStatisticP2.p180.value),1)]),t("div",ut,[t("div",gt,a(e.gameStatisticP1.p171.value),1),dt,t("div",vt,a(e.gameStatisticP2.p171.value),1)]),t("div",Pt,[t("div",pt,a(e.gameStatisticP1.p131.value),1),ht,t("div",St,a(e.gameStatisticP2.p131.value),1)]),t("div",bt,[t("div",$t,a(e.gameStatisticP1.p96.value),1),ft,t("div",yt,a(e.gameStatisticP2.p96.value),1)])],64))}},wt=t("h4",{class:"game-statistic__header-group"},"Закрытия",-1),Dt={key:0,class:"game-statistic__parameters statistic-parameters"},kt={class:"statistic-parameters__values"},Nt={key:0},Ot=t("h5",{class:"statistic-parameters__header"},"%",-1),Ut={class:"statistic-parameters__values"},Ct={key:0},xt={class:"game-statistic__parameters statistic-parameters"},Ft={class:"statistic-parameters__values"},Tt=t("h5",{class:"statistic-parameters__header"},"наибольшее",-1),jt={class:"statistic-parameters__values"},Wt={__name:"gameCheckout",props:{gameStatisticP1:Object,gameStatisticP2:Object,isPercentDoubleInStatP1:Boolean,isPercentDoubleInStatP2:Boolean},setup(e){return(s,o)=>(n(),u(f,null,[wt,e.isPercentDoubleInStatP1||e.isPercentDoubleInStatP2?(n(),u("div",Dt,[t("div",kt,[e.isPercentDoubleInStatP1?(n(),u("span",Nt,a(e.gameStatisticP1.percentDouble.value.toFixed(2))+" % ",1)):p("",!0)]),Ot,t("div",Ut,[e.isPercentDoubleInStatP2?(n(),u("span",Ct,a(e.gameStatisticP2.percentDouble.value.toFixed(2))+" % ",1)):p("",!0)])])):p("",!0),t("div",xt,[t("div",Ft,a(e.gameStatisticP1.highestCheckout.value),1),Tt,t("div",jt,a(e.gameStatisticP2.highestCheckout.value),1)])],64))}};const Gt={class:"dialog-content-wrapper game-over"},At={class:"game-over__content-wrapper"},Bt=t("h2",{class:"game-over__header"},"Матч окончен",-1),Lt={class:"game-over__statistic-wrapper"},Et={class:"game-over__statistic game-statistic"},Mt={class:"auth-actions-wrapper"},Vt={class:"game-statistic__player-names game-statistic-player-names"},zt={class:"game-statistic-player-names__name game-statistic-player-names__name_margin-right"},Jt={class:"game-statistic-player-names__name"},Rt={class:"game-statistic__result game-result"},Zt={class:"game-result__player-score game-result__player-score_margin-right"},qt={class:"game-result__player-score"},te={__name:"gameOver",props:{nameP1:String,nameP2:String,wonP1:Number,wonP2:Number,legsWonInGameP1:Number,legsWonInGameP2:Number,gameStatisticP1:Object,gameStatisticP2:Object,isPercentDoubleInStatP1:Boolean,isPercentDoubleInStatP2:Boolean,legNumber:Number},emits:["startNewGame"],setup(e){const s=e,o=P(!1),l=P(!1),h=D({loader:()=>k(()=>import("./authComp-d7040a2c.js"),["assets/authComp-d7040a2c.js","assets/index-5dc47f3f.js","assets/index-196bc00e.css","assets/close-ed01941b.js","assets/fetch-7e6a8300.js","assets/fetch-5382e2d8.css","assets/authComp-11494628.css"]),loadingComponent:j,delay:0}),_={P1:P(!1),P2:P(!1)},$={P1:P(""),P2:P("")},g=D({loader:()=>k(()=>import("./popUp-95e5e685.js"),["assets/popUp-95e5e685.js","assets/index-5dc47f3f.js","assets/index-196bc00e.css","assets/popUp-9c187980.css"])}),d=(S,i)=>{$[i].value=S,_[i].value=!0};return(S,i)=>(n(),u("div",Gt,[o.value?(n(),N(b(h),{key:0,onCloseAuthComp:i[0]||(i[0]=r=>o.value=!1),player:"P1"})):p("",!0),l.value?(n(),N(b(h),{key:1,onCloseAuthComp:i[1]||(i[1]=r=>l.value=!1),player:"P2"})):p("",!0),F(t("div",At,[Bt,t("div",Lt,[m(O,{class:"game-over__auth-state_top-left",player:"P1",backgroundColor:"rgb(182, 195, 197)"}),m(O,{class:"game-over__auth-state_top-right",player:"P2",backgroundColor:"rgb(182, 195, 197)"}),m(C,{player:"P1",gameStatistic:s.gameStatisticP1,isPercentDoubleInStat:s.isPercentDoubleInStatP1,legNumber:s.legNumber,legsWonInGame:e.legsWonInGameP1,onShowPopUp:i[2]||(i[2]=r=>d(r,"P1"))},null,8,["gameStatistic","isPercentDoubleInStat","legNumber","legsWonInGame"]),m(C,{player:"P2",gameStatistic:s.gameStatisticP2,isPercentDoubleInStat:s.isPercentDoubleInStatP2,legNumber:s.legNumber,legsWonInGame:e.legsWonInGameP2,onShowPopUp:i[3]||(i[3]=r=>d(r,"P2"))},null,8,["gameStatistic","isPercentDoubleInStat","legNumber","legsWonInGame"]),t("div",Et,[t("div",Mt,[m(U,{player:"P1",onOpenAuthComp:i[4]||(i[4]=r=>o.value=!0)}),m(U,{player:"P2",onOpenAuthComp:i[5]||(i[5]=r=>l.value=!0)})]),t("div",Vt,[t("div",zt,a(s.nameP1),1),t("div",Jt,a(s.nameP2),1)]),t("div",Rt,[t("div",Zt,a(s.wonP1),1),t("div",qt,a(s.wonP2),1)]),m(rt,{gameStatisticP1:s.gameStatisticP1,gameStatisticP2:s.gameStatisticP2},null,8,["gameStatisticP1","gameStatisticP2"]),m(It,{gameStatisticP1:s.gameStatisticP1,gameStatisticP2:s.gameStatisticP2},null,8,["gameStatisticP1","gameStatisticP2"]),m(Wt,{gameStatisticP1:s.gameStatisticP1,gameStatisticP2:s.gameStatisticP2,isPercentDoubleInStatP1:s.isPercentDoubleInStatP1,isPercentDoubleInStatP2:s.isPercentDoubleInStatP2},null,8,["gameStatisticP1","gameStatisticP2","isPercentDoubleInStatP1","isPercentDoubleInStatP2"])])]),t("button",{class:"base-button game-over__new-game",onClick:i[6]||(i[6]=r=>S.$emit("startNewGame"))}," Новый матч ")],512),[[T,!o.value&&!l.value]]),m(b(g),{popUpSeen:_.P1.value,popUpMessage:$.P1.value,popUpDuration:4e3,where:"left",howFar:"0px",onClosePopUp:i[7]||(i[7]=r=>_.P1.value=!1)},null,8,["popUpSeen","popUpMessage"]),m(b(g),{popUpSeen:_.P2.value,popUpMessage:$.P2.value,popUpDuration:4e3,where:"right",howFar:"0px",onClosePopUp:i[8]||(i[8]=r=>_.P2.value=!1)},null,8,["popUpSeen","popUpMessage"])]))}};export{te as default};
