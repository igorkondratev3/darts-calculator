import{b as n}from"./fetch-5f5bc1cf.js";const a=(e,t,o)=>{localStorage.getItem(`user${e}`)?t.login(e,JSON.parse(localStorage.getItem(`user${e}`))):o()},k=(e,t)=>{n(t.users[e].refreshToken),t.logout(e),localStorage.removeItem(`user${e}`)},g=async(e,t,o)=>{if(o&&Object.hasOwn(o,"newTokens")){t.updateTokens(e,o.newTokens.token,o.newTokens.refreshToken);const s=JSON.parse(localStorage.getItem(`user${e}`));s.token=o.newTokens.token,s.refreshToken=o.newTokens.refreshToken,localStorage.setItem(`user${e}`,JSON.stringify(s))}};export{k as a,a as l,g as u};