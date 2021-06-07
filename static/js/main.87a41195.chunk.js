(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{103:function(e,c,t){"use strict";t.r(c);t(92),t(93);var a=t(0),n=t.n(a),r=t(29),s=t.n(r),i=t(66),l=t(39),j=t(68),o=t.n(j);var d=t(112),h=t(48),b=t.n(h),u=t(76),O=t(109),x=t(110),v=t(89),p=t(6),_=O.a.Option;function m(e){var c=e.onAdd,t=Object(a.useState)(u.a.Map({region:"us",server:"",char:""})),n=Object(l.a)(t,2),r=n[0],s=n[1];function i(e,c){s(r.set(e,c.target.value))}return Object(p.jsx)("div",{children:Object(p.jsxs)("form",{onSubmit:function(e){e.preventDefault(),c(r.toJS())},className:b.a.cont,children:[Object(p.jsx)("div",{className:b.a.field,children:Object(p.jsxs)(O.a,{style:{width:120},value:r.get("region"),onChange:function(e,c){s(r.set(e,c))}.bind(this,"region"),children:[Object(p.jsx)(_,{value:"us",children:"us"}),Object(p.jsx)(_,{value:"eu",children:"eu"}),Object(p.jsx)(_,{value:"tw",children:"tw"}),Object(p.jsx)(_,{value:"kr",children:"kr"}),Object(p.jsx)(_,{value:"cn",children:"cn"})]})}),Object(p.jsx)("div",{className:b.a.field,children:Object(p.jsx)(x.a,{type:"text",name:"server",value:r.get("server"),placeholder:"Server",onChange:i.bind(this,"server")})}),Object(p.jsx)("div",{className:b.a.field,children:Object(p.jsx)(x.a,{type:"text",name:"char",value:r.get("char"),placeholder:"Character",onChange:i.bind(this,"char")})}),Object(p.jsx)("div",{className:b.a.field,children:Object(p.jsx)(v.a,{type:"primary",htmlType:"submit",children:"Add"})})]})})}var f=t(82),g=t(28),y=t.n(g),N=t(83),w=t(61),S=t(71);var k={};window.charStats=k,console.log("See `charStats` to view fetched RIO data.");var A,C=t(113),D=t(108),F=t(111),I=t(107),J=N.a.div(A||(A=Object(f.a)(["\n\topacity: 0.8;\n\tmargin-top: 10px;\n\tfont-size: 0.8rem;\n"])));function H(e){var c=e.char,t=e.onDelete,n=function(e){var c=function(e){return"".concat(e.region,":").concat(e.server,":").concat(e.char)}(e),t=Object(a.useState)(k),n=Object(l.a)(t,2),r=n[0],s=n[1];return Object(a.useEffect)((function(){r[c]||(console.log("Fetching",c),fetch(function(e){return"https://raider.io/api/v1/characters/profile?region=".concat(e.region,"&realm=").concat(e.server,"&name=").concat(e.char,"&fields=mythic_plus_scores_by_season:current,mythic_plus_best_runs")}(e)).then((function(e){return e.json()})).then((function(e){k[c]=e,s(Object(S.a)(Object(S.a)({},r),{},Object(w.a)({},c,e)))})))}),[c,e,r,s]),r[c]}(c);if(!n)return null;if(n.error)return Object(p.jsxs)(D.a,{className:y.a.card,children:[Object(p.jsx)(C.a,{onClick:t,className:y.a.delete}),Object(p.jsx)("strong",{children:n.error}),Object(p.jsx)("p",{children:n.message})]});var r=n.mythic_plus_scores_by_season[0].scores,s=n.mythic_plus_best_runs,i=Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(F.a,{src:n.thumbnail_url,className:y.a.avatar}),Object(p.jsxs)("a",{href:n.profile_url,target:"_blank",rel:"noreferrer",className:y.a.avatarAnnex,children:[Object(p.jsx)("strong",{children:n.name}),Object(p.jsxs)("small",{style:{marginLeft:"10px"},children:[n.race," ",n.class]})]})]});return Object(p.jsxs)(D.a,{className:y.a.card,children:[Object(p.jsx)(D.a.Meta,{title:i}),Object(p.jsx)(C.a,{onClick:t,className:y.a.delete}),Object(p.jsx)("h3",{className:y.a.avatarAnnex,children:r.all}),r.tank?Object(p.jsxs)("span",{className:y.a.subscore,children:[Object(p.jsx)("strong",{children:"Tank"}),": ",r.tank]}):null,r.healer?Object(p.jsxs)("span",{className:y.a.subscore,children:[Object(p.jsx)("strong",{children:"Healer"}),": ",r.healer]}):null,r.dps?Object(p.jsxs)("span",{className:y.a.subscore,children:[Object(p.jsx)("strong",{children:"DPS"}),": ",r.dps]}):null,Object(p.jsx)(I.a,{}),Object(p.jsxs)("div",{className:y.a.grid,children:[Object(p.jsx)("div",{children:Object(p.jsx)("strong",{children:"Dungeon"})}),Object(p.jsx)("div",{children:Object(p.jsx)("strong",{children:"Level"})}),Object(p.jsx)("div",{children:Object(p.jsx)("strong",{children:"Score"})}),Object(p.jsx)("div",{children:Object(p.jsx)("strong",{children:"+?"})}),s.map((function(e){return Object(p.jsxs)(a.Fragment,{children:[Object(p.jsx)("div",{children:e.dungeon}),Object(p.jsx)("div",{children:e.mythic_level}),Object(p.jsx)("div",{children:e.score}),Object(p.jsx)("div",{children:e.num_keystone_upgrades})]},e.dungeon)}))]}),Object(p.jsxs)(J,{children:["Last crawled at ",new Date(n.last_crawled_at).toLocaleString()]})]})}var L=d.a.Header,M=d.a.Content;var E=function(){var e=this,c=function(e,c){var t=Object(a.useState)((function(){try{var t=window.localStorage.getItem(e);return t?JSON.parse(t):c}catch(a){return console.log(a),c}})),n=Object(l.a)(t,2),r=n[0],s=n[1];return[r,function(c){try{var t=c instanceof Function?c(r):c;s(t),window.localStorage.setItem(e,JSON.stringify(t))}catch(a){console.log(a)}}]}("chars",[]),t=Object(l.a)(c,2),n=t[0],r=t[1];function s(e){r([].concat(Object(i.a)(n.slice(0,e)),Object(i.a)(n.slice(e+1))))}return Object(p.jsx)("div",{className:o.a.app,children:Object(p.jsxs)(d.a,{children:[Object(p.jsx)(L,{children:Object(p.jsx)(m,{onAdd:function(e){r([].concat(Object(i.a)(n),[e]))}})}),Object(p.jsx)(M,{className:o.a.cards,children:n&&n.map((function(c,t){return Object(p.jsx)(H,{char:c,onDelete:s.bind(e,t)},t)}))})]})})};s.a.render(Object(p.jsx)(n.a.StrictMode,{children:Object(p.jsx)(E,{})}),document.getElementById("root"))},28:function(e,c,t){e.exports={avatarAnnex:"char_avatarAnnex__5cFg5",avatar:"char_avatar__3AKjy",card:"char_card__1gkPj",delete:"char_delete__1jfH1",subscore:"char_subscore__3Uo6v",grid:"char_grid__3x2ww"}},48:function(e,c,t){e.exports={cont:"addchar_cont__12bQ0",field:"addchar_field__3nx31"}},68:function(e,c,t){e.exports={app:"app_app__1F5XI",cards:"app_cards__2Hupy"}},92:function(e,c,t){}},[[103,1,2]]]);
//# sourceMappingURL=main.87a41195.chunk.js.map