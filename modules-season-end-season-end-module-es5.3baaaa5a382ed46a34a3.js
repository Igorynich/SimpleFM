!function(){var c,e,a,n,t,l,i,r,s,o,u,b,d,f,m,p,y,h,C,g,v,$,S,O,w,L,T,N,R,x,E,I,j;function z(c){return function(c){if(Array.isArray(c))return M(c)}(c)||function(c){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(c))return Array.from(c)}(c)||D(c)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function F(c,e){return e||(e=c.slice(0)),Object.freeze(Object.defineProperties(c,{raw:{value:Object.freeze(e)}}))}function A(c,e){return function(c){if(Array.isArray(c))return c}(c)||function(c,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(c)))return;var a=[],n=!0,t=!1,l=void 0;try{for(var i,r=c[Symbol.iterator]();!(n=(i=r.next()).done)&&(a.push(i.value),!e||a.length!==e);n=!0);}catch(s){t=!0,l=s}finally{try{n||null==r.return||r.return()}finally{if(t)throw l}}return a}(c,e)||D(c,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function D(c,e){if(c){if("string"==typeof c)return M(c,e);var a=Object.prototype.toString.call(c).slice(8,-1);return"Object"===a&&c.constructor&&(a=c.constructor.name),"Map"===a||"Set"===a?Array.from(c):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?M(c,e):void 0}}function M(c,e){(null==e||e>c.length)&&(e=c.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=c[a];return n}function P(c,e){if(!(c instanceof e))throw new TypeError("Cannot call a class as a function")}function k(c,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(c,n.key,n)}}function U(c,e,a){return e&&k(c.prototype,e),a&&k(c,a),c}(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{KO76:function(D,M,k){"use strict";k.r(M),k.d(M,"SeasonEndModule",function(){return ge});var W=k("ofXK"),_=k("SqtC"),q=k("fXoL"),X=k("f9qZ"),Y=k("tyNb"),G=k("Wp6s"),H=k("wZkO"),J=k("IzEk"),K=k("eIep"),V=k("lJxs"),Z=k("woNW"),B=k("LvDl"),Q=k("kt0X"),cc=k("r4Kj"),ec=k("qfBg"),ac=k("+0xr");function nc(c,e){1&c&&(q.dc(0,"mat-header-cell",20),q.hc(1,21),q.cc())}var tc=function(c){return{"my-club":c}};function lc(c,e){if(1&c&&(q.dc(0,"mat-cell",22),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=e.index,t=q.wc();q.Cc("ngClass",q.Fc(4,tc,t.isMyClubsTableRecord(a,q.yc(1,2,t.curClub$)))),q.Lb(2),q.Wc(" ",n+1," ")}}function ic(c,e){1&c&&(q.dc(0,"mat-header-cell",20),q.hc(1,23),q.cc())}function rc(c,e){if(1&c&&(q.dc(0,"mat-cell",22),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc();q.Cc("ngClass",q.Fc(4,tc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.club[n.config.name]," ")}}function sc(c,e){1&c&&(q.dc(0,"mat-header-cell",20),q.hc(1,24),q.cc())}function oc(c,e){if(1&c&&(q.dc(0,"mat-cell",22),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc();q.Cc("ngClass",q.Fc(4,tc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.games," ")}}function uc(c,e){1&c&&(q.dc(0,"mat-header-cell",20),q.hc(1,25),q.cc())}function bc(c,e){if(1&c&&(q.dc(0,"mat-cell",22),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc();q.Cc("ngClass",q.Fc(4,tc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.wins," ")}}function dc(c,e){1&c&&(q.dc(0,"mat-header-cell",20),q.hc(1,26),q.cc())}function fc(c,e){if(1&c&&(q.dc(0,"mat-cell",22),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc();q.Cc("ngClass",q.Fc(4,tc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.draws," ")}}function mc(c,e){1&c&&(q.dc(0,"mat-header-cell",20),q.hc(1,27),q.cc())}function pc(c,e){if(1&c&&(q.dc(0,"mat-cell",22),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc();q.Cc("ngClass",q.Fc(4,tc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.loses," ")}}function yc(c,e){1&c&&(q.dc(0,"mat-header-cell",20),q.hc(1,28),q.cc())}function hc(c,e){if(1&c&&(q.dc(0,"mat-cell",22),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc();q.Cc("ngClass",q.Fc(4,tc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.gf," ")}}function Cc(c,e){1&c&&(q.dc(0,"mat-header-cell",20),q.hc(1,29),q.cc())}function gc(c,e){if(1&c&&(q.dc(0,"mat-cell",22),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc();q.Cc("ngClass",q.Fc(4,tc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.ga," ")}}function vc(c,e){1&c&&(q.dc(0,"mat-header-cell",20),q.hc(1,30),q.cc())}function $c(c,e){if(1&c&&(q.dc(0,"mat-cell",22),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc();q.Cc("ngClass",q.Fc(4,tc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.gd," ")}}function Sc(c,e){1&c&&(q.dc(0,"mat-header-cell",20),q.hc(1,31),q.cc())}function Oc(c,e){if(1&c&&(q.dc(0,"mat-cell",22),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc();q.Cc("ngClass",q.Fc(4,tc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.points," ")}}function wc(c,e){1&c&&q.Yb(0,"mat-header-row")}function Lc(c,e){1&c&&q.Yb(0,"mat-row")}function Tc(c,e){if(1&c&&(q.dc(0,"div",0),q.dc(1,"div",1),q.hc(2,32),q.xc(3,"async"),q.cc(),q.cc()),2&c){var a=q.wc();q.Lb(3),q.lc(q.yc(3,2,a.curClub$)[a.config.name])(a.userService.userName),q.ic(2)}}function Nc(c,e){if(1&c&&(q.dc(0,"div",0),q.dc(1,"div",1),q.hc(2,33),q.xc(3,"async"),q.xc(4,"async"),q.cc(),q.cc()),2&c){var a=q.wc();q.Lb(4),q.lc(q.yc(3,3,a.curClub$)[a.config.name])(a.userService.userName)(q.yc(4,5,a.playersCupResult$).eliminated),q.ic(2)}}var Rc,xc=((Rc=function(){function c(e,a,n){P(this,c),this.store=e,this.config=a,this.userService=n,this.displayedColumns1=["position","clubName","games","wins","draws","loses","gf","ga","gd","points"]}return U(c,[{key:"ngOnInit",value:function(){var c=this;this.curClub$=this.store.select(Z.z).pipe(Object(J.a)(1)),this.playersLeague$=this.curClub$.pipe(Object(K.a)(function(e){return c.store.select(Z.l,{leaguesNameEn:e.leagueNameEn}).pipe(Object(J.a)(1))})),this.playersLeagueTable$=this.curClub$.pipe(Object(K.a)(function(e){return c.store.select(Z.J,{leaguesNameEn:e.leagueNameEn}).pipe(Object(J.a)(1))})),this.playersCupPrizeMoney$=this.curClub$.pipe(Object(K.a)(function(e){return c.store.select(Z.G,{clubsNameEn:e.nameEn}).pipe(Object(J.a)(1))}),Object(V.a)(function(c){var e=c[Object(B.last)(Object.keys(c))].find(function(c){return c.description.includes("\u043a\u0443\u0431\u043a")||c.description.includes("the Cup")});return(null==e?void 0:e.income)||0})),this.playersLeaguePrizeMoney$=this.curClub$.pipe(Object(K.a)(function(e){return c.store.select(Z.G,{clubsNameEn:e.nameEn}).pipe(Object(J.a)(1),Object(V.a)(function(c){return[c,e]}))}),Object(V.a)(function(c){var e=A(c,2),a=e[0],n=e[1];return a[Object(B.last)(Object.keys(a))].find(function(c){return c.description.includes(n.leagueNameRu)||c.description.includes(n.leagueNameEn)}).income})),this.playersCupResult$=this.curClub$.pipe(Object(K.a)(function(e){return c.store.select(Z.h,{clubsNameEn:e.nameEn}).pipe(Object(J.a)(1))}))}},{key:"isMyClubsTableRecord",value:function(c,e){return c.club.nameEn===e.nameEn}}]),c}()).\u0275fac=function(c){return new(c||Rc)(q.Xb(Q.b),q.Xb(cc.a),q.Xb(ec.a))},Rc.\u0275cmp=q.Rb({type:Rc,selectors:[["app-players-season-results"]],decls:53,vars:24,consts:function(){return[[1,"row"],[1,"col"],[1,"w-50",3,"dataSource"],["matColumnDef","position"],["class","",4,"matHeaderCellDef"],["class","",3,"ngClass",4,"matCellDef"],["matColumnDef","clubName"],["matColumnDef","games"],["matColumnDef","wins"],["matColumnDef","draws"],["matColumnDef","loses"],["matColumnDef","gf"],["matColumnDef","ga"],["matColumnDef","gd"],["matColumnDef","points"],[4,"matHeaderRowDef"],[4,"matRowDef","matRowDefColumns"],$localize(c||(c=F([":\u241f3dae6f2bd7bfc9630705ba1b7656f7b2a3bd5668\u241f8550976096100342168: \u041f\u0440\u0438\u0437\u043e\u0432\u044b\u0435 \u0437\u0430 \u0432\u044b\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u0435 \u0432 \u043b\u0438\u0433\u0435 \u0441\u043e\u0441\u0442\u0430\u0432\u0438\u043b\u0438 ",":INTERPOLATION: "])),"\ufffd0\ufffd"),["class","row",4,"ngIf"],$localize(e||(e=F([":\u241f55ee9be300a04a5e231a67be7d5a892fb2624785\u241f5978658733573101230: \u041f\u0440\u0438\u0437\u043e\u0432\u044b\u0435 \u0437\u0430 \u0432\u044b\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u0435 \u0432 \u043a\u0443\u0431\u043a\u0435 \u0441\u043e\u0441\u0442\u0430\u0432\u0438\u043b\u0438 ",":INTERPOLATION: "])),"\ufffd0\ufffd"),[1,""],$localize(a||(a=F([":table header\u241fae12345a9b07549d40dc010a19b70bed19e5d5bb\u241f4468103540398151050: \u041f\u043e\u0437"]))),[1,"",3,"ngClass"],$localize(n||(n=F([":table header\u241f1def93b6db13cc5a94b40352d8c8429f7c31ce44\u241f8000971869281050668: \u041a\u043b\u0443\u0431"]))),$localize(t||(t=F([":table header\u241f0157717d03ad08c7df433fee45f7fe6ab19511c8\u241f6178966414623279771: \u0418"]))),$localize(l||(l=F([":table header\u241f7e98f714ffb9d3d7547a778128e5709e6de2ed24\u241f8855998668231512193: \u0412"]))),$localize(i||(i=F([":table header\u241f7831c7fbd43be3ca89c9387e09d4f1a6a1eddee4\u241f92116837520280265: \u041d"]))),$localize(r||(r=F([":table header\u241fa99ae0a9158003177bd0be9ecf7c976cd085519a\u241f4660370548398670142: \u041f"]))),$localize(s||(s=F([":table header\u241f568dfc93c4b52cb92bdd722111e02b951d9487db\u241f1270862271706706118: \u0417\u041c"]))),$localize(o||(o=F([":table header\u241f91ede02147c89e04219f2f092a0277a76322b262\u241f2082022650480052501: \u041f\u041c"]))),$localize(u||(u=F([":table header\u241f35d9e6bf726179f60c1de1a56a150d52d7c79a68\u241f5131767773981320453: \u0420\u041c"]))),$localize(b||(b=F([":table header\u241ff04544fb80b7132bcacd4c22eeb3fad3ece74472\u241f6823300020342367214: \u041e"]))),$localize(d||(d=F([":\u241fbbe9aca9a00a3d14c3fee9602fc05a8963bb1749\u241f1056322591103881854: ",":INTERPOLATION: \u043f\u043e\u0434 \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0441\u0442\u0432\u043e\u043c ",":INTERPOLATION_1: \u0432\u044b\u0438\u0433\u0440\u0430\u043b \u041a\u0443\u0431\u043e\u043a! "])),"\ufffd0\ufffd","\ufffd1\ufffd"),$localize(f||(f=F([":\u241fe7703712db29be1a9c417ad9bb4f63de8c53c6f7\u241f4679106768507382282: ",":INTERPOLATION: \u043f\u043e\u0434 \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0441\u0442\u0432\u043e\u043c ",":INTERPOLATION_1: \u0434\u043e\u0431\u0440\u0430\u043b\u0441\u044f \u0434\u043e ",":INTERPOLATION_2: \u0440\u0430\u0443\u043d\u0434\u0430 \u043a\u0443\u0431\u043a\u0430! "])),"\ufffd0\ufffd","\ufffd1\ufffd","\ufffd2\ufffd")]},template:function(c,e){1&c&&(q.dc(0,"div",0),q.dc(1,"div",1),q.dc(2,"h4"),q.Uc(3),q.xc(4,"async"),q.cc(),q.dc(5,"mat-table",2),q.xc(6,"async"),q.bc(7,3),q.Sc(8,nc,2,0,"mat-header-cell",4),q.Sc(9,lc,3,6,"mat-cell",5),q.ac(),q.bc(10,6),q.Sc(11,ic,2,0,"mat-header-cell",4),q.Sc(12,rc,3,6,"mat-cell",5),q.ac(),q.bc(13,7),q.Sc(14,sc,2,0,"mat-header-cell",4),q.Sc(15,oc,3,6,"mat-cell",5),q.ac(),q.bc(16,8),q.Sc(17,uc,2,0,"mat-header-cell",4),q.Sc(18,bc,3,6,"mat-cell",5),q.ac(),q.bc(19,9),q.Sc(20,dc,2,0,"mat-header-cell",4),q.Sc(21,fc,3,6,"mat-cell",5),q.ac(),q.bc(22,10),q.Sc(23,mc,2,0,"mat-header-cell",4),q.Sc(24,pc,3,6,"mat-cell",5),q.ac(),q.bc(25,11),q.Sc(26,yc,2,0,"mat-header-cell",4),q.Sc(27,hc,3,6,"mat-cell",5),q.ac(),q.bc(28,12),q.Sc(29,Cc,2,0,"mat-header-cell",4),q.Sc(30,gc,3,6,"mat-cell",5),q.ac(),q.bc(31,13),q.Sc(32,vc,2,0,"mat-header-cell",4),q.Sc(33,$c,3,6,"mat-cell",5),q.ac(),q.bc(34,14),q.Sc(35,Sc,2,0,"mat-header-cell",4),q.Sc(36,Oc,3,6,"mat-cell",5),q.ac(),q.Sc(37,wc,1,0,"mat-header-row",15),q.Sc(38,Lc,1,0,"mat-row",16),q.cc(),q.cc(),q.cc(),q.dc(39,"div",0),q.dc(40,"div",1),q.hc(41,17),q.xc(42,"currency"),q.xc(43,"async"),q.cc(),q.cc(),q.Sc(44,Tc,4,4,"div",18),q.xc(45,"async"),q.Sc(46,Nc,5,7,"div",18),q.xc(47,"async"),q.dc(48,"div",0),q.dc(49,"div",1),q.hc(50,19),q.xc(51,"currency"),q.xc(52,"async"),q.cc(),q.cc()),2&c&&(q.Lb(3),q.Vc(q.yc(4,8,e.playersLeague$)[e.config.name]),q.Lb(2),q.Cc("dataSource",q.yc(6,10,e.playersLeagueTable$)),q.Lb(32),q.Cc("matHeaderRowDef",e.displayedColumns1),q.Lb(1),q.Cc("matRowDefColumns",e.displayedColumns1),q.Lb(5),q.lc(q.yc(42,12,q.yc(43,14,e.playersLeaguePrizeMoney$))),q.ic(41),q.Lb(1),q.Cc("ngIf",!q.yc(45,16,e.playersCupResult$).eliminated),q.Lb(2),q.Cc("ngIf",q.yc(47,18,e.playersCupResult$).eliminated),q.Lb(6),q.lc(q.yc(51,20,q.yc(52,22,e.playersCupPrizeMoney$))),q.ic(50))},directives:[ac.j,ac.c,ac.e,ac.b,ac.g,ac.i,W.o,ac.d,ac.a,W.m,ac.f,ac.h],pipes:[W.b,W.d],styles:[""],changeDetection:0}),Rc),Ec=k("bTqV"),Ic=k("itXk"),jc=k("kHgy");function zc(c,e){1&c&&(q.dc(0,"mat-header-cell",22),q.hc(1,23),q.cc())}var Fc=function(c){return{"my-club":c}};function Ac(c,e){if(1&c&&(q.dc(0,"mat-cell",24),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=e.index,t=q.wc(2);q.Cc("ngClass",q.Fc(4,Fc,t.isMyClubsTableRecord(a,q.yc(1,2,t.curClub$)))),q.Lb(2),q.Wc(" ",n+1," ")}}function Dc(c,e){1&c&&(q.dc(0,"mat-header-cell",22),q.hc(1,25),q.cc())}function Mc(c,e){if(1&c&&(q.dc(0,"mat-cell",24),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc(2);q.Cc("ngClass",q.Fc(4,Fc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.club[n.config.name]," ")}}function Pc(c,e){1&c&&(q.dc(0,"mat-header-cell",22),q.hc(1,26),q.cc())}function kc(c,e){if(1&c&&(q.dc(0,"mat-cell",24),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc(2);q.Cc("ngClass",q.Fc(4,Fc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.games," ")}}function Uc(c,e){1&c&&(q.dc(0,"mat-header-cell",22),q.hc(1,27),q.cc())}function Wc(c,e){if(1&c&&(q.dc(0,"mat-cell",24),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc(2);q.Cc("ngClass",q.Fc(4,Fc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.wins," ")}}function _c(c,e){1&c&&(q.dc(0,"mat-header-cell",22),q.hc(1,28),q.cc())}function qc(c,e){if(1&c&&(q.dc(0,"mat-cell",24),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc(2);q.Cc("ngClass",q.Fc(4,Fc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.draws," ")}}function Xc(c,e){1&c&&(q.dc(0,"mat-header-cell",22),q.hc(1,29),q.cc())}function Yc(c,e){if(1&c&&(q.dc(0,"mat-cell",24),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc(2);q.Cc("ngClass",q.Fc(4,Fc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.loses," ")}}function Gc(c,e){1&c&&(q.dc(0,"mat-header-cell",22),q.hc(1,30),q.cc())}function Hc(c,e){if(1&c&&(q.dc(0,"mat-cell",24),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc(2);q.Cc("ngClass",q.Fc(4,Fc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.gf," ")}}function Jc(c,e){1&c&&(q.dc(0,"mat-header-cell",22),q.hc(1,31),q.cc())}function Kc(c,e){if(1&c&&(q.dc(0,"mat-cell",24),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc(2);q.Cc("ngClass",q.Fc(4,Fc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.ga," ")}}function Vc(c,e){1&c&&(q.dc(0,"mat-header-cell",22),q.hc(1,32),q.cc())}function Zc(c,e){if(1&c&&(q.dc(0,"mat-cell",24),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc(2);q.Cc("ngClass",q.Fc(4,Fc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.gd," ")}}function Bc(c,e){1&c&&(q.dc(0,"mat-header-cell",22),q.hc(1,33),q.cc())}function Qc(c,e){if(1&c&&(q.dc(0,"mat-cell",24),q.xc(1,"async"),q.Uc(2),q.cc()),2&c){var a=e.$implicit,n=q.wc(2);q.Cc("ngClass",q.Fc(4,Fc,n.isMyClubsTableRecord(a,q.yc(1,2,n.curClub$)))),q.Lb(2),q.Wc(" ",a.points," ")}}function ce(c,e){1&c&&q.Yb(0,"mat-header-row")}function ee(c,e){1&c&&q.Yb(0,"mat-row")}function ae(c,e){if(1&c&&(q.nc(0,34,1),q.Yb(1,"span"),q.kc()),2&c){var a=e.$implicit;q.Lb(1),q.lc(a.nameRu),q.ic(0)}}function ne(c,e){if(1&c&&(q.dc(0,"p"),q.nc(1,34),q.Sc(2,ae,2,1,"span",35),q.xc(3,"async"),q.xc(4,"async"),q.kc(),q.cc()),2&c){var a=q.wc().index,n=q.wc();q.Lb(2),q.Cc("ngForOf",q.yc(3,2,n.bestScorersForEachLeague$)[a].goals.players),q.Lb(2),q.lc(q.yc(4,4,n.bestScorersForEachLeague$)[a].goals.q),q.ic(1)}}function te(c,e){if(1&c&&(q.nc(0,36,1),q.Yb(1,"span"),q.kc()),2&c){var a=e.$implicit;q.Lb(1),q.lc(a.nameRu),q.ic(0)}}function le(c,e){if(1&c&&(q.dc(0,"p"),q.nc(1,36),q.Sc(2,te,2,1,"span",35),q.xc(3,"async"),q.xc(4,"async"),q.kc(),q.cc()),2&c){var a=q.wc().index,n=q.wc();q.Lb(2),q.Cc("ngForOf",q.yc(3,2,n.bestScorersForEachLeague$)[a].assists.players),q.Lb(2),q.lc(q.yc(4,4,n.bestScorersForEachLeague$)[a].assists.q),q.ic(1)}}function ie(c,e){if(1&c&&(q.nc(0,37,1),q.Yb(1,"span"),q.xc(2,"async"),q.kc()),2&c){var a=e.$implicit,n=e.index,t=q.wc(2).index,l=q.wc();q.Lb(2),q.lc(a.nameRu)(q.yc(2,2,l.bestScorersForEachLeague$)[t].ga.sum[n]),q.ic(0)}}function re(c,e){if(1&c&&(q.dc(0,"p"),q.nc(1,37),q.Sc(2,ie,3,4,"span",35),q.xc(3,"async"),q.xc(4,"async"),q.kc(),q.cc()),2&c){var a=q.wc().index,n=q.wc();q.Lb(2),q.Cc("ngForOf",q.yc(3,2,n.bestScorersForEachLeague$)[a].ga.players),q.Lb(2),q.lc(q.yc(4,4,n.bestScorersForEachLeague$)[a].ga.q),q.ic(1)}}function se(c,e){if(1&c&&(q.dc(0,"div",5),q.dc(1,"h4"),q.Uc(2),q.xc(3,"async"),q.cc(),q.dc(4,"mat-table",6),q.bc(5,7),q.Sc(6,zc,2,0,"mat-header-cell",8),q.Sc(7,Ac,3,6,"mat-cell",9),q.ac(),q.bc(8,10),q.Sc(9,Dc,2,0,"mat-header-cell",8),q.Sc(10,Mc,3,6,"mat-cell",9),q.ac(),q.bc(11,11),q.Sc(12,Pc,2,0,"mat-header-cell",8),q.Sc(13,kc,3,6,"mat-cell",9),q.ac(),q.bc(14,12),q.Sc(15,Uc,2,0,"mat-header-cell",8),q.Sc(16,Wc,3,6,"mat-cell",9),q.ac(),q.bc(17,13),q.Sc(18,_c,2,0,"mat-header-cell",8),q.Sc(19,qc,3,6,"mat-cell",9),q.ac(),q.bc(20,14),q.Sc(21,Xc,2,0,"mat-header-cell",8),q.Sc(22,Yc,3,6,"mat-cell",9),q.ac(),q.bc(23,15),q.Sc(24,Gc,2,0,"mat-header-cell",8),q.Sc(25,Hc,3,6,"mat-cell",9),q.ac(),q.bc(26,16),q.Sc(27,Jc,2,0,"mat-header-cell",8),q.Sc(28,Kc,3,6,"mat-cell",9),q.ac(),q.bc(29,17),q.Sc(30,Vc,2,0,"mat-header-cell",8),q.Sc(31,Zc,3,6,"mat-cell",9),q.ac(),q.bc(32,18),q.Sc(33,Bc,2,0,"mat-header-cell",8),q.Sc(34,Qc,3,6,"mat-cell",9),q.ac(),q.Sc(35,ce,1,0,"mat-header-row",19),q.Sc(36,ee,1,0,"mat-row",20),q.cc(),q.Sc(37,ne,5,6,"p",21),q.xc(38,"async"),q.Sc(39,le,5,6,"p",21),q.xc(40,"async"),q.Sc(41,re,5,6,"p",21),q.xc(42,"async"),q.cc()),2&c){var a=e.$implicit,n=e.index,t=q.wc();q.Lb(2),q.Vc(q.yc(3,7,t.allLeagues$)[n][t.config.name]),q.Lb(2),q.Cc("dataSource",a),q.Lb(31),q.Cc("matHeaderRowDef",t.displayedColumns2),q.Lb(1),q.Cc("matRowDefColumns",t.displayedColumns2),q.Lb(1),q.Cc("ngIf",q.yc(38,9,t.bestScorersForEachLeague$)),q.Lb(2),q.Cc("ngIf",q.yc(40,11,t.bestScorersForEachLeague$)),q.Lb(2),q.Cc("ngIf",q.yc(42,13,t.bestScorersForEachLeague$))}}var oe,ue=((oe=function(){function c(e,a){P(this,c),this.store=e,this.config=a,this.displayedColumns2=["position","clubName","points"]}return U(c,[{key:"ngOnInit",value:function(){var c=this;this.curClub$=this.store.select(Z.z).pipe(Object(J.a)(1)),this.leagueWinner$=this.store.select(Z.j).pipe(Object(J.a)(1),Object(K.a)(function(e){var a=e.find(function(c){return 1===c.tier});return c.store.select(Z.J,{leaguesNameEn:a.nameEn}).pipe(Object(J.a)(1))}),Object(K.a)(function(e){return c.store.select(Z.q,{clubsName:e[0].club.nameEn}).pipe(Object(J.a)(1))})),this.cupWinner$=this.store.select(Z.x,{countryNameEn:null}).pipe(Object(J.a)(1),Object(K.a)(function(e){var a=Object(B.last)(e)[0];return Object(Ic.a)([c.store.select(Z.K,{matchId:a.matchId}),c.store.select(Z.M,{matchId:a.matchId})]).pipe(Object(J.a)(1))}),Object(K.a)(function(e){var a=A(e,2),n=a[0],t=a[1],l=Object(jc.b)(t.result);return c.store.select(Z.q,{clubsName:"home"===l?n.homeNameEn:n.awayNameEn}).pipe(Object(J.a)(1))})),this.allLeagues$=this.store.select(Z.j).pipe(Object(J.a)(1)),this.allLeagueTables$=this.allLeagues$.pipe(Object(K.a)(function(e){var a=e.map(function(e){return c.store.select(Z.J,{leaguesNameEn:e.nameEn})});return Object(Ic.a)(a).pipe(Object(J.a)(1))})),this.bestScorersForEachLeague$=this.allLeagues$.pipe(Object(K.a)(function(e){var a=e.map(function(e){return c.store.select(Z.m,{leagueName:e.nameEn})});return Object(Ic.a)(a).pipe(Object(J.a)(1))}),Object(V.a)(function(c){var e=[];return c.forEach(function(c){var a=z(c.entries()).sort(function(c,e){return(e[1].goals||0)-(c[1].goals||0)}),n=a[0]&&a[0][1].goals,t=a.filter(function(c){var e=A(c,2);return e[0],e[1].goals===n}).map(function(c){var e=A(c,2),a=e[0];return e[1],a}),l={q:n,players:t},i=z(c.entries()).sort(function(c,e){return(e[1].assists||0)-(c[1].assists||0)}),r=i[0]&&i[0][1].assists,s=i.filter(function(c){var e=A(c,2);return e[0],e[1].assists===r}).map(function(c){var e=A(c,2),a=e[0];return e[1],a}),o={q:r,players:s},u=z(c.entries()).sort(function(c,e){return(e[1]["g+a"]||0)-(c[1]["g+a"]||0)}),b=u[0]&&u[0][1]["g+a"],d=u.filter(function(c){var e=A(c,2);return e[0],e[1]["g+a"]===b}),f=d.map(function(c){var e=A(c,2),a=e[0];return e[1],a}),m=d.map(function(c){var e=A(c,2),a=(e[0],e[1]);return"".concat(a.goals,"+").concat(a.assists)});e.push({goals:l,assists:o,ga:{q:b,players:f,sum:m}})}),e}))}},{key:"isMyClubsTableRecord",value:function(c,e){return c.club.nameEn===e.nameEn}}]),c}()).\u0275fac=function(c){return new(c||oe)(q.Xb(Q.b),q.Xb(cc.a))},oe.\u0275cmp=q.Rb({type:oe,selectors:[["app-championship-season-results"]],decls:13,vars:9,consts:function(){return[[1,"row"],[1,"col"],$localize(m||(m=F([":\u241fefe386e9a5070557e0f20ea80b375b8bab0e3be3\u241f172323901019110455:\u041f\u043e\u0431\u0435\u0434\u0438\u0442\u0435\u043b\u044c \u043b\u0438\u0433\u0438: ",":INTERPOLATION:"])),"\ufffd0\ufffd"),$localize(p||(p=F([":\u241f04d9633e47daa03a886955217201b59f08bbdbf8\u241f5231595178690776433:\u041f\u043e\u0431\u0435\u0434\u0438\u0442\u0435\u043b\u044c \u043a\u0443\u0431\u043a\u0430: ",":INTERPOLATION:"])),"\ufffd0\ufffd"),["class","col-3",4,"ngFor","ngForOf"],[1,"col-3"],[1,"",3,"dataSource"],["matColumnDef","position"],["class","",4,"matHeaderCellDef"],["class","",3,"ngClass",4,"matCellDef"],["matColumnDef","clubName"],["matColumnDef","games"],["matColumnDef","wins"],["matColumnDef","draws"],["matColumnDef","loses"],["matColumnDef","gf"],["matColumnDef","ga"],["matColumnDef","gd"],["matColumnDef","points"],[4,"matHeaderRowDef"],[4,"matRowDef","matRowDefColumns"],[4,"ngIf"],[1,""],$localize(y||(y=F([":\u241fae12345a9b07549d40dc010a19b70bed19e5d5bb\u241f4468103540398151050: \u041f\u043e\u0437"]))),[1,"",3,"ngClass"],$localize(h||(h=F([":\u241f1def93b6db13cc5a94b40352d8c8429f7c31ce44\u241f8000971869281050668: \u041a\u043b\u0443\u0431"]))),$localize(C||(C=F([":\u241f0157717d03ad08c7df433fee45f7fe6ab19511c8\u241f6178966414623279771: \u0418"]))),$localize(g||(g=F([":\u241f7e98f714ffb9d3d7547a778128e5709e6de2ed24\u241f8855998668231512193: \u0412"]))),$localize(v||(v=F([":\u241f7831c7fbd43be3ca89c9387e09d4f1a6a1eddee4\u241f92116837520280265: \u041d"]))),$localize($||($=F([":\u241fa99ae0a9158003177bd0be9ecf7c976cd085519a\u241f4660370548398670142: \u041f"]))),$localize(S||(S=F([":\u241f568dfc93c4b52cb92bdd722111e02b951d9487db\u241f1270862271706706118: \u0417\u041c"]))),$localize(O||(O=F([":\u241f91ede02147c89e04219f2f092a0277a76322b262\u241f2082022650480052501: \u041f\u041c"]))),$localize(w||(w=F([":\u241f35d9e6bf726179f60c1de1a56a150d52d7c79a68\u241f5131767773981320453: \u0420\u041c"]))),$localize(L||(L=F([":\u241ff04544fb80b7132bcacd4c22eeb3fad3ece74472\u241f6823300020342367214: \u041e"]))),$localize(T||(T=F([":\u241f6e97cbb668dfa65d54c1905532915555fbcb4f40\u241f5070772552857907574: \u0411\u043e\u043c\u0431\u0430\u0440\u0434\u0438\u0440\u044b: ",":START_TAG_SPAN:",":INTERPOLATION: ",":CLOSE_TAG_SPAN: - ",":INTERPOLATION_1: \u0433\u043e\u043b\u043e\u0432 "])),"\ufffd*2:1\ufffd\ufffd#1:1\ufffd","\ufffd0:1\ufffd","\ufffd/#1:1\ufffd\ufffd/*2:1\ufffd","\ufffd0\ufffd"),[4,"ngFor","ngForOf"],$localize(N||(N=F([":\u241faacd09779bf0f4cd49a48856bc0b0275b49134dc\u241f8899584860178579052: \u0410\u0441\u0441\u0438\u0441\u0442\u0435\u043d\u0442\u044b: ",":START_TAG_SPAN:",":INTERPOLATION: ",":CLOSE_TAG_SPAN: - ",":INTERPOLATION_1: \u043f\u0430\u0441\u043e\u0432 "])),"\ufffd*2:1\ufffd\ufffd#1:1\ufffd","\ufffd0:1\ufffd","\ufffd/#1:1\ufffd\ufffd/*2:1\ufffd","\ufffd0\ufffd"),$localize(R||(R=F([":\u241fa19ffab92a6a448ce2fdbd83ea13cf4ec94eb57f\u241f2860756684307600868: \u0413+\u041f: ",":START_TAG_SPAN:",":INTERPOLATION:(",":INTERPOLATION_1:) ",":CLOSE_TAG_SPAN: - ",":INTERPOLATION_2: \u0431\u0430\u043b\u043e\u0432 "])),"\ufffd*2:1\ufffd\ufffd#1:1\ufffd","\ufffd0:1\ufffd","\ufffd1:1\ufffd","\ufffd/#1:1\ufffd\ufffd/*2:1\ufffd","\ufffd0\ufffd")]},template:function(c,e){1&c&&(q.dc(0,"div",0),q.dc(1,"div",1),q.dc(2,"h3"),q.hc(3,2),q.xc(4,"async"),q.cc(),q.cc(),q.cc(),q.dc(5,"div",0),q.dc(6,"div",1),q.dc(7,"h3"),q.hc(8,3),q.xc(9,"async"),q.cc(),q.cc(),q.cc(),q.dc(10,"div",0),q.Sc(11,se,43,15,"div",4),q.xc(12,"async"),q.cc()),2&c&&(q.Lb(4),q.lc(q.yc(4,3,e.leagueWinner$)[e.config.name]),q.ic(3),q.Lb(5),q.lc(q.yc(9,5,e.cupWinner$)[e.config.name]),q.ic(8),q.Lb(2),q.Cc("ngForOf",q.yc(12,7,e.allLeagueTables$)))},directives:[W.n,ac.j,ac.c,ac.e,ac.b,ac.g,ac.i,W.o,ac.d,ac.a,W.m,ac.f,ac.h],pipes:[W.b],styles:[""],changeDetection:0}),oe),be=k("zd2R");function de(c,e){1&c&&q.hc(0,15)}function fe(c,e){1&c&&q.hc(0,16)}var me,pe,ye=((me=function(){function c(e,a){P(this,c),this.seasonService=e,this.router=a,this.selectedTab=0,this.ROUTES=_.a}return U(c,[{key:"ngOnInit",value:function(){this.seasonService.endCurrentSeason()}},{key:"startNewSeason",value:function(){this.seasonService.startNewSeason(),this.router.navigate([this.ROUTES.OFFICE]).catch(function(c){console.error(c)})}}]),c}()).\u0275fac=function(c){return new(c||me)(q.Xb(X.a),q.Xb(Y.d))},me.\u0275cmp=q.Rb({type:me,selectors:[["app-season-end-main-page"]],decls:23,vars:1,consts:function(){return[[1,"row","season-end-main-container"],[1,"col"],[1,"season-end-card--main","h-100","white"],[1,"row","h-100"],[1,"col","d-flex","flex-column"],["mat-align-tabs","center",3,"selectedIndex","selectedIndexChange"],["mat-tab-label","","class","white"],[1,"row"],["mat-raised-button","","color","primary",3,"click"],$localize(x||(x=F([":\u241fe2cc399f2e6330cca61f33b3e7132a16d093b56a\u241f4559462115522719132:\u0414\u0430\u043b\u0435\u0435"]))),["mat-tab-label",""],["mat-raised-button","","color","accent",3,"click"],$localize(E||(E=F([":\u241f4b6e61a972d89dd6181cfee6cc15e1285815e182\u241f8185261373444347925:\u041a \u043d\u043e\u0432\u043e\u043c\u0443 \u0441\u0435\u0437\u043e\u043d\u0443"]))),[1,"row","justify-content-end"],[1,"col-1"],$localize(I||(I=F([":\u241f352af073b66c399b0b1893561c1c1c710d2c0bec\u241f7757104606352089609:\u0418\u0442\u043e\u0433\u0438 \u0441\u0435\u0437\u043e\u043d\u0430 \u0438\u0433\u0440\u043e\u043a\u0430"]))),$localize(j||(j=F([":\u241fb31d71ba2afe75c1072b4e66e7f1318747e1176d\u241f3940498857601155801:\u0418\u0442\u043e\u0433\u0438 \u0441\u0435\u0437\u043e\u043d\u0430 \u0447\u0435\u043c\u043f\u0438\u043e\u043d\u0430\u0442\u0430"])))]},template:function(c,e){1&c&&(q.dc(0,"div",0),q.dc(1,"div",1),q.dc(2,"mat-card",2),q.dc(3,"div",3),q.dc(4,"div",4),q.dc(5,"mat-tab-group",5),q.sc("selectedIndexChange",function(c){return e.selectedTab=c}),q.dc(6,"mat-tab"),q.Sc(7,de,1,0,"ng-template",6),q.Yb(8,"app-players-season-results"),q.dc(9,"div",7),q.dc(10,"div",1),q.dc(11,"button",8),q.sc("click",function(){return e.selectedTab=1}),q.hc(12,9),q.cc(),q.cc(),q.cc(),q.cc(),q.dc(13,"mat-tab"),q.Sc(14,fe,1,0,"ng-template",10),q.Yb(15,"app-championship-season-results"),q.dc(16,"div",7),q.dc(17,"div",1),q.dc(18,"button",11),q.sc("click",function(){return e.startNewSeason()}),q.hc(19,12),q.cc(),q.cc(),q.cc(),q.cc(),q.cc(),q.cc(),q.cc(),q.dc(20,"div",13),q.dc(21,"div",14),q.Yb(22,"app-navigate-to-office"),q.cc(),q.cc(),q.cc(),q.cc(),q.cc()),2&c&&(q.Lb(5),q.Cc("selectedIndex",e.selectedTab))},directives:[G.a,H.c,H.a,H.d,xc,Ec.b,ue,be.a],styles:[".season-end-main-container[_ngcontent-%COMP%] {\n  \n  height: 95%;\n}\n\n.season-end-card--main[_ngcontent-%COMP%] {\n  margin: 25px;\n  background-color: black;\n  \n  opacity: 95%;\n}\n\n.white[_ngcontent-%COMP%] {\n  color: white !important;\n}\n\n.mat-tab-label-content[_ngcontent-%COMP%] {\n  color: white;\n}"]}),me),he=k("PCNd"),Ce=[{path:"",component:ye}],ge=((pe=function c(){P(this,c)}).\u0275fac=function(c){return new(c||pe)},pe.\u0275mod=q.Vb({type:pe}),pe.\u0275inj=q.Ub({imports:[[W.c,Y.f.forChild(Ce),G.g,he.a,H.e,Ec.c,ac.l]]}),pe)}}])}();