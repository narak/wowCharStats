(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{110:function(e,t,n){},137:function(e,t,n){"use strict";n.r(t);n(110),n(111);var a=n(0),c=n.n(a),r=n(34),s=n.n(r),i=n(21),l=n(93),o=n.n(l);function d(e,t){var n=Object(a.useState)((function(){try{var n=window.localStorage.getItem(e);return n?JSON.parse(n):t}catch(a){return console.log(a),t}})),c=Object(i.a)(n,2),r=c[0],s=c[1];return[r,function(t){try{var n=t instanceof Function?t(r):t;s(n),window.localStorage.setItem(e,JSON.stringify(n))}catch(a){console.log(a)}}]}var j=n(77),u=n(94),h=n.n(u),b=n(140),O=n(36),v=n(25),x=n(57),m=n.n(x),p=n(142),f=n(143),g=n(105),_=n(4),y=p.a.Option;function w(e){var t=e.onAdd,n=Object(a.useState)({region:"us",server:"",char:""}),c=Object(i.a)(n,2),r=c[0],s=c[1];function l(e,t){s(Object(v.a)(Object(v.a)({},r),{},Object(O.a)({},e,t.target.value)))}return Object(_.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t(r)},className:m.a.cont,children:[Object(_.jsx)("div",{className:m.a.field,children:Object(_.jsxs)(p.a,{style:{width:120},value:r.region,onChange:function(e,t){s(Object(v.a)(Object(v.a)({},r),{},Object(O.a)({},e,t)))}.bind(this,"region"),children:[Object(_.jsx)(y,{value:"us",children:"us"}),Object(_.jsx)(y,{value:"eu",children:"eu"}),Object(_.jsx)(y,{value:"tw",children:"tw"}),Object(_.jsx)(y,{value:"kr",children:"kr"}),Object(_.jsx)(y,{value:"cn",children:"cn"})]})}),Object(_.jsx)("div",{className:m.a.field,children:Object(_.jsx)(f.a,{type:"text",name:"server",value:r.server,placeholder:"Server",onChange:l.bind(this,"server")})}),Object(_.jsx)("div",{className:m.a.field,children:Object(_.jsx)(f.a,{type:"text",name:"char",value:r.char,placeholder:"Character",onChange:l.bind(this,"char")})}),Object(_.jsx)("div",{className:m.a.field,children:Object(_.jsx)(g.a,{type:"primary",htmlType:"submit",children:"Add"})})]})}var S=n(52),N=n(29),k=n.n(N),C=n(53),z=n(44),D=n.n(z);var T={};window.charStats=T,console.log("See `charStats` to view fetched RIO data.");var A,F=n(146),I=n(141),E=n(144),L=n(139),P=C.a.div(A||(A=Object(S.a)(["\n\topacity: 0.8;\n\tmargin-top: 10px;\n\tfont-size: 0.8rem;\n"])));function X(e){var t=e.char,n=e.onDelete,c=function(e){var t=function(e){return"".concat(e.region,":").concat(e.server,":").concat(e.char)}(e),n=Object(a.useState)(T),c=Object(i.a)(n,2),r=c[0],s=c[1];return Object(a.useEffect)((function(){r[t]||(console.log("Fetching",t),D.a.get(function(e){return"https://raider.io/api/v1/characters/profile?region=".concat(e.region,"&realm=").concat(e.server,"&name=").concat(e.char,"&fields=mythic_plus_scores_by_season:current,mythic_plus_best_runs")}(e)).then((function(e){T[t]=e.data,s(Object(v.a)(Object(v.a)({},r),{},Object(O.a)({},t,e.data)))})).catch((function(e){s(Object(v.a)(Object(v.a)({},r),{},Object(O.a)({},t,e.response.data))),console.log(e)})))}),[t,e,r,s]),r[t]}(t);if(!c)return null;if(c.error)return Object(_.jsxs)(I.a,{className:k.a.card,children:[Object(_.jsx)("strong",{children:c.error}),Object(_.jsx)("p",{children:c.message}),Object(_.jsx)(F.a,{onClick:n,className:k.a.delete})]});var r=c.mythic_plus_scores_by_season[0].scores,s=c.mythic_plus_best_runs,l=Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)(E.a,{src:c.thumbnail_url,className:k.a.avatar}),Object(_.jsxs)("a",{href:c.profile_url,target:"_blank",rel:"noreferrer",className:k.a.avatarAnnex,children:[Object(_.jsx)("strong",{children:c.name}),Object(_.jsxs)("small",{style:{marginLeft:"10px"},children:[c.race," ",c.class]})]})]});return Object(_.jsxs)(I.a,{className:k.a.card,children:[Object(_.jsx)(I.a.Meta,{title:l}),Object(_.jsx)("h3",{className:k.a.mainScore,children:r.all}),Object(_.jsx)("h3",{className:k.a.avatarAnnex,children:Object(_.jsx)(F.a,{onClick:n,className:k.a.icon})}),r.tank?Object(_.jsxs)("span",{className:k.a.subscore,children:[Object(_.jsx)("strong",{children:"Tank"}),": ",r.tank]}):null,r.healer?Object(_.jsxs)("span",{className:k.a.subscore,children:[Object(_.jsx)("strong",{children:"Healer"}),": ",r.healer]}):null,r.dps?Object(_.jsxs)("span",{className:k.a.subscore,children:[Object(_.jsx)("strong",{children:"DPS"}),": ",r.dps]}):null,Object(_.jsx)(L.a,{}),Object(_.jsxs)("div",{className:k.a.grid,children:[Object(_.jsx)("div",{children:Object(_.jsx)("strong",{children:"Dungeon"})}),Object(_.jsx)("div",{children:Object(_.jsx)("strong",{children:"Level"})}),Object(_.jsx)("div",{children:Object(_.jsx)("strong",{children:"Score"})}),Object(_.jsx)("div",{children:Object(_.jsx)("strong",{children:"+?"})}),s.map((function(e){return Object(_.jsxs)(a.Fragment,{children:[Object(_.jsx)("div",{children:e.dungeon}),Object(_.jsx)("div",{children:e.mythic_level}),Object(_.jsx)("div",{children:e.score}),Object(_.jsx)("div",{children:e.num_keystone_upgrades})]},e.dungeon)}))]}),Object(_.jsxs)(P,{children:["Last crawled at ",new Date(c.last_crawled_at).toLocaleString()]})]})}var B=b.a.Content;var J,K,R=new FormData;function G(){var e,t=d("auth_token"),n=Object(i.a)(t,2),a=n[0],c=n[1];return a||(e=c,J||(J=D()({method:"post",url:"https://www.warcraftlogs.com/oauth/token",data:R,headers:{"Content-Type":"multipart/form-data"},auth:{username:"939c7296-5335-40c4-9338-b213bfcadc92",password:"1SyEyndtXPGyQIXWPz4w4dheqOeKSKk22hBCQzUP"}})),J.then((function(t){e(t.data.access_token)})).catch((function(t){console.error(t),e(t.response.data)}))),a}R.append("grant_type","client_credentials");var H=function(e){var t=e.code;return'\n{\n  reportData {\n    report(\n      code: "'.concat(t,'"\n    ) {\n      fights(\n        killType: Kills\n      ) {\n        id\n        name\n        startTime\n        endTime\n        size\n      }\n    }\n  }\n}\n')},q=C.a.span(K||(K=Object(S.a)(["\n\tmargin-right: 1rem;\n"])));function M(e){var t,n,c,r=e.code,s=G(),l=Object(a.useState)(),o=Object(i.a)(l,2),d=o[0],j=o[1];Object(a.useEffect)((function(){var e={headers:{Authorization:"Bearer ".concat(s)}};D.a.post("https://www.warcraftlogs.com/api/v2/client",{query:H({code:r})},e).then((function(e){j(null===e||void 0===e?void 0:e.data)})).catch(console.error)}),[s,j,r]);var u=null===d||void 0===d||null===(t=d.data)||void 0===t||null===(n=t.reportData)||void 0===n||null===(c=n.report)||void 0===c?void 0:c.fights;return Object(_.jsx)("div",{children:u&&u.map((function(e){return Object(_.jsx)(q,{children:e.name},e.name)}))})}var Q,U=n(58),W=n.n(U),Z=p.a.Option;function V(e){var t=e.guild,n=e.onChange,c=Object(a.useState)(t),r=Object(i.a)(c,2),s=r[0],l=r[1];function o(e,t){l(Object(v.a)(Object(v.a)({},s),{},Object(O.a)({},e,t.target.value)))}return Object(_.jsxs)("form",{onSubmit:function(e){e.preventDefault(),n(s)},className:W.a.cont,children:[Object(_.jsx)("div",{className:W.a.field,children:Object(_.jsxs)(p.a,{style:{width:120},value:s.region,onChange:function(e,t){l(Object(v.a)(Object(v.a)({},s),{},Object(O.a)({},e,t)))}.bind(this,"region"),children:[Object(_.jsx)(Z,{value:"us",children:"us"}),Object(_.jsx)(Z,{value:"eu",children:"eu"}),Object(_.jsx)(Z,{value:"tw",children:"tw"}),Object(_.jsx)(Z,{value:"kr",children:"kr"}),Object(_.jsx)(Z,{value:"cn",children:"cn"})]})}),Object(_.jsx)("div",{className:W.a.field,children:Object(_.jsx)(f.a,{type:"text",name:"server",value:s.server,placeholder:"Server",onChange:o.bind(this,"server")})}),Object(_.jsx)("div",{className:W.a.field,children:Object(_.jsx)(f.a,{type:"text",name:"guild",value:s.guild,placeholder:"Character",onChange:o.bind(this,"guild")})}),Object(_.jsx)("div",{className:W.a.field,children:Object(_.jsx)(g.a,{type:"primary",htmlType:"submit",children:"Add"})})]})}var Y=b.a.Content,$=function(e){var t=e.guild,n=e.server,a=e.region,c=e.pageSize,r=void 0===c?5:c,s=e.page,i=void 0===s?1:s;return'\n{\n    guildData {\n        guild(\n            name: "'.concat(t,'"\n            serverSlug: "').concat(n,'"\n            serverRegion: "').concat(a,'"\n        ) {\n            attendance(\n                limit: ').concat(r,"\n                page: ").concat(i,"\n            ) {\n                total\n                last_page\n                data {\n                    code\n                    startTime\n                    zone {\n                        name\n                    }\n                }\n            }\n        }\n    }\n}")},ee=C.a.div(Q||(Q=Object(S.a)(["\n\tmargin-bottom: 2rem;\n"])));var te=n(145),ne=b.a.Header,ae={chars:function(){var e=this,t=d("chars",[]),n=Object(i.a)(t,2),a=n[0],c=n[1];function r(e){c([].concat(Object(j.a)(a.slice(0,e)),Object(j.a)(a.slice(e+1))))}return Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)(B,{style:{padding:"20px 50px"},children:Object(_.jsx)(w,{onAdd:function(e){c([].concat(Object(j.a)(a),[e]))}})}),Object(_.jsx)(B,{className:h.a.cards,children:a&&a.map((function(t,n){return Object(_.jsx)(X,{char:t,onDelete:r.bind(e,n)},n)}))})]})},guild:function(){var e=G(),t=Object(a.useState)(),n=Object(i.a)(t,2),c=n[0],r=n[1],s=d("guild",{guild:"season zero",server:"frostmourne",region:"us"}),l=Object(i.a)(s,2),o=l[0],j=l[1];Object(a.useEffect)((function(){var t={headers:{Authorization:"Bearer ".concat(e)}};D.a.post("https://www.warcraftlogs.com/api/v2/client",{query:$(o)},t).then((function(e){var t,n,a;r(null===e||void 0===e||null===(t=e.data)||void 0===t||null===(n=t.data)||void 0===n||null===(a=n.guildData)||void 0===a?void 0:a.guild)})).catch(console.error)}),[e,r,o]);var u=null===c||void 0===c?void 0:c.attendance.data,h=Object(a.useMemo)((function(){return function(e){var t={};return null===e||void 0===e||e.forEach((function(e){t[e.zone.name]=t[e.zone.name]||[],t[e.zone.name].push({startTime:e.startTime,code:e.code})})),t}(u)}),[u]);return Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)(Y,{style:{padding:"20px 50px"},children:Object(_.jsx)(V,{guild:o,onChange:j})}),Object(_.jsx)(Y,{style:{padding:"20px 50px"},children:h?Object.keys(h).map((function(e){return Object(_.jsxs)("div",{children:[Object(_.jsx)("h3",{children:e}),h[e].map((function(e,t){return console.log(e),Object(_.jsxs)(ee,{children:[new Date(e.startTime).toLocaleString()," ",Object(_.jsx)(M,{code:e.code})]},t)}))]},e)})):null})]})}};var ce=function(){var e=d("selectedTab",["chars"]),t=Object(i.a)(e,2),n=t[0],a=t[1],c=ae[n[0]];return Object(_.jsxs)(b.a,{className:o.a.app,children:[Object(_.jsx)(ne,{children:Object(_.jsxs)(te.a,{theme:"dark",mode:"horizontal",selectedKeys:n,onClick:function(e){var t=e.keyPath;a(t)},children:[Object(_.jsx)(te.a.Item,{children:"Characters"},"chars"),Object(_.jsx)(te.a.Item,{children:"Guild Logs"},"guild")]})}),Object(_.jsx)(c,{})]})};s.a.render(Object(_.jsx)(c.a.StrictMode,{children:Object(_.jsx)(ce,{})}),document.getElementById("root"))},29:function(e,t,n){e.exports={avatarAnnex:"char_avatarAnnex__2fcIu",avatar:"char_avatar__1R1Ga",card:"char_card__2sX9m",icon:"char_icon__oJvyd",mainScore:"char_mainScore__2UARt",delete:"char_delete__zoZl_",subscore:"char_subscore__ixFkk",grid:"char_grid__LR1HK"}},57:function(e,t,n){e.exports={cont:"addchar_cont__28hfQ",field:"addchar_field__2XwTS"}},58:function(e,t,n){e.exports={cont:"selectguild_cont__1rPCS",field:"selectguild_field__z7EBX"}},93:function(e,t,n){e.exports={app:"app_app__1F5XI"}},94:function(e,t,n){e.exports={cards:"chars_cards__x4dGH"}}},[[137,1,2]]]);
//# sourceMappingURL=main.ba9641c5.chunk.js.map