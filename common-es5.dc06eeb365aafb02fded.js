!function(){var n,c,t,e,a,i;function s(n){return function(n){if(Array.isArray(n))return u(n)}(n)||function(n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(n))return Array.from(n)}(n)||r(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(n,c){return function(n){if(Array.isArray(n))return n}(n)||function(n,c){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(n)))return;var t=[],e=!0,a=!1,i=void 0;try{for(var s,o=n[Symbol.iterator]();!(e=(s=o.next()).done)&&(t.push(s.value),!c||t.length!==c);e=!0);}catch(r){a=!0,i=r}finally{try{e||null==o.return||o.return()}finally{if(a)throw i}}return t}(n,c)||r(n,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(n,c){if(n){if("string"==typeof n)return u(n,c);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?u(n,c):void 0}}function u(n,c){(null==c||c>n.length)&&(c=n.length);for(var t=0,e=new Array(c);t<c;t++)e[t]=n[t];return e}function l(n,c){return c||(c=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(c)}}))}function f(n,c){if(!(n instanceof c))throw new TypeError("Cannot call a class as a function")}function h(n,c){for(var t=0;t<c.length;t++){var e=c[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,e.key,e)}}function b(n,c,t){return c&&h(n.prototype,c),t&&h(n,t),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"+hVe":function(c,t,e){"use strict";e.d(t,"a",function(){return S});var a,i=e("woNW"),s=e("fXoL"),o=e("kt0X"),r=e("r4Kj"),u=e("ofXK"),h=e("KTMP"),d=((a=function(){function n(){f(this,n)}return b(n,[{key:"transform",value:function(n){return Object.keys(n)}}]),n}()).\u0275fac=function(n){return new(n||a)},a.\u0275pipe=s.Wb({name:"keys",type:a,pure:!0}),a),m=function(n){return{"my-club":n}};function y(n,c){if(1&n&&(s.dc(0,"div",0),s.dc(1,"div",11),s.xc(2,"async"),s.xc(3,"isMyClub"),s.xc(4,"async"),s.xc(5,"isMyClub"),s.Uc(6),s.xc(7,"async"),s.cc(),s.cc()),2&n){var t=s.wc();s.Lb(1),s.Cc("ngClass",s.Fc(12,m,s.yc(2,2,s.yc(3,4,t.match.homeNameEn))||s.yc(4,6,s.yc(5,8,t.match.awayNameEn)))),s.Lb(5),s.Wc(" ",s.yc(7,10,t.matchStats$).result," ")}}function v(n,c){if(1&n&&(s.dc(0,"div",0),s.dc(1,"div",1),s.hc(2,12),s.xc(3,"async"),s.xc(4,"async"),s.cc(),s.cc()),2&n){var t=s.wc();s.Lb(4),s.lc(s.yc(3,2,t.matchStats$).attendance)(s.yc(4,4,t.homeClub$).stadium),s.ic(2)}}function p(n,c){if(1&n&&(s.dc(0,"span"),s.Uc(1),s.xc(2,"async"),s.cc()),2&n){var t=s.wc().$implicit,e=s.wc();s.Lb(1),s.Wc("(",s.yc(2,1,e.matchStats$).homeAssists[t][e.config.name],")")}}function g(n,c){if(1&n&&(s.dc(0,"div",3),s.xc(1,"async"),s.xc(2,"isMyClub"),s.Uc(3),s.xc(4,"async"),s.Sc(5,p,3,3,"span",13),s.xc(6,"async"),s.cc()),2&n){var t=c.$implicit,e=s.wc();s.Cc("ngClass",s.Fc(12,m,s.yc(1,4,s.yc(2,6,e.match.homeNameEn)))),s.Lb(3),s.Xc(" ",t,"' ",s.yc(4,8,e.matchStats$).homeGoals[t][e.config.name]," "),s.Lb(2),s.Cc("ngIf",s.yc(6,10,e.matchStats$).homeAssists[t])}}function E(n,c){if(1&n&&(s.dc(0,"span"),s.Uc(1),s.xc(2,"async"),s.cc()),2&n){var t=s.wc().$implicit,e=s.wc();s.Lb(1),s.Wc("(",s.yc(2,1,e.matchStats$).awayAssists[t][e.config.name],")")}}function C(n,c){if(1&n&&(s.dc(0,"div",3),s.xc(1,"async"),s.xc(2,"isMyClub"),s.Uc(3),s.xc(4,"async"),s.Sc(5,E,3,3,"span",13),s.xc(6,"async"),s.cc()),2&n){var t=c.$implicit,e=s.wc();s.Cc("ngClass",s.Fc(12,m,s.yc(1,4,s.yc(2,6,e.match.awayNameEn)))),s.Lb(3),s.Xc(" ",t,"' ",s.yc(4,8,e.matchStats$).awayGoals[t][e.config.name]," "),s.Lb(2),s.Cc("ngIf",s.yc(6,10,e.matchStats$).awayAssists[t])}}function O(n,c){if(1&n&&(s.dc(0,"span"),s.Uc(1),s.cc()),2&n){var t=s.wc().$implicit,e=s.wc();s.Lb(1),s.Wc("",t[e.config.name]," ")}}function w(n,c){if(1&n&&(s.dc(0,"span"),s.Sc(1,O,2,1,"span",13),s.cc()),2&n){var t=c.$implicit,e=s.wc();s.Lb(1),s.Cc("ngIf",t.clubNameEn===e.match.homeNameEn)}}function N(n,c){if(1&n&&(s.dc(0,"span"),s.Uc(1),s.cc()),2&n){var t=s.wc().$implicit,e=s.wc();s.Lb(1),s.Wc("",t[e.config.name]," ")}}function _(n,c){if(1&n&&(s.dc(0,"span"),s.Sc(1,N,2,1,"span",13),s.cc()),2&n){var t=c.$implicit,e=s.wc();s.Lb(1),s.Cc("ngIf",t.clubNameEn===e.match.awayNameEn)}}function I(n,c){if(1&n&&(s.dc(0,"span"),s.Uc(1),s.cc()),2&n){var t=s.wc().$implicit,e=s.wc();s.Lb(1),s.Wc("",t[e.config.name]," ")}}function R(n,c){if(1&n&&(s.dc(0,"span"),s.Sc(1,I,2,1,"span",13),s.cc()),2&n){var t=c.$implicit,e=s.wc();s.Lb(1),s.Cc("ngIf",t.clubNameEn===e.match.homeNameEn)}}function L(n,c){if(1&n&&(s.dc(0,"span"),s.Uc(1),s.cc()),2&n){var t=s.wc().$implicit,e=s.wc();s.Lb(1),s.Wc("",t[e.config.name]," ")}}function x(n,c){if(1&n&&(s.dc(0,"span"),s.Sc(1,L,2,1,"span",13),s.cc()),2&n){var t=c.$implicit,e=s.wc();s.Lb(1),s.Cc("ngIf",t.clubNameEn===e.match.awayNameEn)}}var A,S=((A=function(){function n(c,t){f(this,n),this.store=c,this.config=t,this.showGains=!0}return b(n,[{key:"ngOnInit",value:function(){this.homeClub$=this.store.select(i.r,{clubsNameEn:this.match.homeNameEn}),this.awayClub$=this.store.select(i.r,{clubsNameEn:this.match.awayNameEn}),this.curClub$=this.store.select(i.z),this.matchStats$=this.store.select(i.M,{matchId:this.match.id}),this.matchGaines$=this.store.select(i.L,{matchId:this.match.id})}}]),n}()).\u0275fac=function(n){return new(n||A)(s.Xb(o.b),s.Xb(r.a))},A.\u0275cmp=s.Rb({type:A,selectors:[["app-match-result"]],inputs:{match:"match",showGains:"showGains"},decls:46,vars:62,consts:function(){return[[1,"row"],[1,"col"],[1,"col","text-center"],[3,"ngClass"],["class","row",4,"ngIf"],[1,"row","justify-content-around"],[1,"col-5","scorers",3,"ngClass"],[3,"ngClass",4,"ngFor","ngForOf"],[1,"col-5","gains"],[4,"ngFor","ngForOf"],[1,"col-5","losses"],[1,"col","text-center",3,"ngClass"],$localize(n||(n=l([":\u0437\u0440\u0438\u0442\u0435\u043b\u0435\u0439 | Att:\u241f0752c7fcaedb826f1bc35d16419cddb06f7f3ec2\u241f2280019662359459096: ",":INTERPOLATION: \u0437\u0440\u0438\u0442\u0435\u043b\u0435\u0439(",":INTERPOLATION_1:) "],[":\u0437\u0440\u0438\u0442\u0435\u043b\u0435\u0439 | Att\\:\u241f0752c7fcaedb826f1bc35d16419cddb06f7f3ec2\u241f2280019662359459096: ",":INTERPOLATION: \u0437\u0440\u0438\u0442\u0435\u043b\u0435\u0439(",":INTERPOLATION_1:) "])),"\ufffd0\ufffd","\ufffd1\ufffd"),[4,"ngIf"]]},template:function(n,c){var t,e;(1&n&&(s.dc(0,"div",0),s.dc(1,"div",1),s.dc(2,"div",0),s.dc(3,"div",2),s.dc(4,"span",3),s.xc(5,"async"),s.xc(6,"isMyClub"),s.Uc(7),s.xc(8,"async"),s.cc(),s.Uc(9," - "),s.dc(10,"span",3),s.xc(11,"async"),s.xc(12,"isMyClub"),s.Uc(13),s.xc(14,"async"),s.cc(),s.cc(),s.cc(),s.Sc(15,y,8,14,"div",4),s.xc(16,"async"),s.Sc(17,v,5,6,"div",4),s.xc(18,"async"),s.dc(19,"div",5),s.dc(20,"div",6),s.xc(21,"async"),s.xc(22,"isMyClub"),s.Sc(23,g,7,14,"div",7),s.xc(24,"keys"),s.xc(25,"async"),s.cc(),s.dc(26,"div",6),s.xc(27,"async"),s.xc(28,"isMyClub"),s.Sc(29,C,7,14,"div",7),s.xc(30,"keys"),s.xc(31,"async"),s.cc(),s.cc(),s.dc(32,"div",5),s.dc(33,"div",8),s.Sc(34,w,2,1,"span",9),s.xc(35,"async"),s.cc(),s.dc(36,"div",8),s.Sc(37,_,2,1,"span",9),s.xc(38,"async"),s.cc(),s.cc(),s.dc(39,"div",5),s.dc(40,"div",10),s.Sc(41,R,2,1,"span",9),s.xc(42,"async"),s.cc(),s.dc(43,"div",10),s.Sc(44,x,2,1,"span",9),s.xc(45,"async"),s.cc(),s.cc(),s.cc(),s.cc()),2&n)&&(s.Lb(4),s.Cc("ngClass",s.Fc(54,m,s.yc(5,14,s.yc(6,16,c.match.homeNameEn)))),s.Lb(3),s.Wc(" ",s.yc(8,18,c.homeClub$)[c.config.name]," "),s.Lb(3),s.Cc("ngClass",s.Fc(56,m,s.yc(11,20,s.yc(12,22,c.match.awayNameEn)))),s.Lb(3),s.Wc(" ",s.yc(14,24,c.awayClub$)[c.config.name]," "),s.Lb(2),s.Cc("ngIf",null==(t=s.yc(16,26,c.matchStats$))?null:t.result),s.Lb(2),s.Cc("ngIf",null==(e=s.yc(18,28,c.matchStats$))?null:e.result),s.Lb(3),s.Cc("ngClass",s.Fc(58,m,s.yc(21,30,s.yc(22,32,c.match.homeNameEn)))),s.Lb(3),s.Cc("ngForOf",s.yc(24,34,s.yc(25,36,c.matchStats$).homeGoals)),s.Lb(3),s.Cc("ngClass",s.Fc(60,m,s.yc(27,38,s.yc(28,40,c.match.homeNameEn)))),s.Lb(3),s.Cc("ngForOf",s.yc(30,42,s.yc(31,44,c.matchStats$).awayGoals)),s.Lb(5),s.Cc("ngForOf",s.yc(35,46,c.matchGaines$).gains),s.Lb(3),s.Cc("ngForOf",s.yc(38,48,c.matchGaines$).gains),s.Lb(4),s.Cc("ngForOf",s.yc(42,50,c.matchGaines$).losses),s.Lb(3),s.Cc("ngForOf",s.yc(45,52,c.matchGaines$).losses))},directives:[u.m,u.o,u.n],pipes:[u.b,h.a,d],styles:[".scorers[_ngcontent-%COMP%] {\n  font-size: small;\n}\n\n.gains[_ngcontent-%COMP%] {\n  font-size: x-small;\n  color: green;\n}\n\n.losses[_ngcontent-%COMP%] {\n  font-size: x-small;\n  color: red;\n}\n\n.my-club[_ngcontent-%COMP%] {\n  \n}"],changeDetection:0}),A)},KTMP:function(n,c,t){"use strict";t.d(c,"a",function(){return o});var e=t("lJxs"),a=t("woNW"),i=t("fXoL"),s=t("kt0X"),o=function(){var n=function(){function n(c){f(this,n),this.store=c}return b(n,[{key:"transform",value:function(n){return this.store.select(a.z).pipe(Object(e.a)(function(c){return c.nameEn===n||c.nameRu===n}))}}]),n}();return n.\u0275fac=function(c){return new(c||n)(i.Xb(s.b))},n.\u0275pipe=i.Wb({name:"isMyClub",type:n,pure:!0}),n}()},drq7:function(n,a,i){"use strict";i.d(a,"a",function(){return h});var s=i("0IaG"),o=i("fXoL"),r=i("r4Kj"),u=i("bTqV"),h=function(){var n=function(){function n(a,i){f(this,n),this.data=a,this.config=i,this.defaultHeader=$localize(c||(c=l(["\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b?"]))),this.yes={txt:$localize(t||(t=l(["\u0414\u0430"]))),value:!0},this.no={txt:$localize(e||(e=l(["\u041d\u0435\u0442"]))),value:!1}}return b(n,[{key:"ngOnInit",value:function(){}}]),n}();return n.\u0275fac=function(c){return new(c||n)(o.Xb(s.a),o.Xb(r.a))},n.\u0275cmp=o.Rb({type:n,selectors:[["app-confirmation-dialog"]],decls:9,vars:5,consts:[[1,"header"],[1,"row","justify-content-between"],[1,"col-3"],["mat-raised-button","","color","warn",1,"yes-button",3,"mat-dialog-close"],["mat-raised-button","","color","accent",1,"no-button",3,"mat-dialog-close"]],template:function(n,c){1&n&&(o.dc(0,"h3",0),o.Uc(1),o.cc(),o.dc(2,"div",1),o.dc(3,"div",2),o.dc(4,"button",3),o.Uc(5),o.cc(),o.cc(),o.dc(6,"div",2),o.dc(7,"button",4),o.Uc(8),o.cc(),o.cc(),o.cc()),2&n&&(o.Lb(1),o.Vc((null==c.data?null:c.data.header)||c.defaultHeader),o.Lb(3),o.Cc("mat-dialog-close",(null==c.data||null==c.data.yes?null:c.data.yes.value)||(null==c.yes?null:c.yes.value)),o.Lb(1),o.Wc(" ",(null==c.data||null==c.data.yes?null:c.data.yes.txt)||(null==c.yes?null:c.yes.txt)," "),o.Lb(2),o.Cc("mat-dialog-close",(null==c.data||null==c.data.no?null:c.data.no.value)||(null==c.no?null:c.no.value)),o.Lb(1),o.Wc(" ",(null==c.data||null==c.data.no?null:c.data.no.txt)||(null==c.no?null:c.no.txt)," "))},directives:[u.b,s.d],styles:[""]}),n}()},f9qZ:function(n,c,t){"use strict";t.d(c,"a",function(){return o});var e=t("npY+"),a=t("fXoL"),i=t("kt0X"),s=t("w0zp"),o=function(){var n=function(){function n(c,t){f(this,n),this.store=c,this.finService=t}return b(n,[{key:"endCurrentSeason",value:function(){console.warn("ENDING CURRENT SEASON"),this.givePrizeMoney()}},{key:"startNewSeason",value:function(){this.changePlayersPowers(),this.store.dispatch(Object(e.g)()),this.store.dispatch(Object(e.k)())}},{key:"givePrizeMoney",value:function(){this.store.dispatch(Object(e.m)())}},{key:"changePlayersPowers",value:function(){this.store.dispatch(Object(e.A)())}},{key:"makeDivisionRotations",value:function(){this.store.dispatch(Object(e.s)())}}]),n}();return n.\u0275fac=function(c){return new(c||n)(a.oc(i.b),a.oc(s.a))},n.\u0275prov=a.Tb({token:n,factory:n.\u0275fac,providedIn:"root"}),n}()},qLOZ:function(n,c,t){"use strict";t.d(c,"a",function(){return d});var e=t("woNW"),a=t("IzEk"),i=t("itXk"),r=t("GZ7p"),u=t("npY+"),l=t("fXoL"),h=t("kt0X"),d=function(){var n=function(){function n(c){f(this,n),this.store=c,this.MIN_TIME_ON_ONE_JOB=1,this.BASE_NEW_JOB_OFFER_CHANCE=50,this.NEW_JOB_OFFER_CHANCE_GROWTH_BY_ACHIEVEMENT_RANK=1,this.GET_OFFER_FROM_CLUB_CHANCE_GROWTH_BY_HIS_UNDERACHIEVEMENT_RANK=2,this.ACHIEVEMENT_RANK_TO_GET_TIER_HIGHER_JOB_OFFER=7,this.MAX_NUM_OF_HIGHER_TIER_CLUBS_TO_OFFER=3}return b(n,[{key:"gotNewJobOffer",value:function(){var n,c=this;console.error("CHECKING FOR NEW JOB"),this.store.select(e.o).pipe(Object(a.a)(1)).subscribe(function(c){n=c});var t,i=n>=this.MIN_TIME_ON_ONE_JOB;return this.store.select(e.z).pipe(Object(a.a)(1)).subscribe(function(n){c.curClub=n}),Object(r.e)(1,100)<this.BASE_NEW_JOB_OFFER_CHANCE+this.NEW_JOB_OFFER_CHANCE_GROWTH_BY_ACHIEVEMENT_RANK*this.getClubAchievementRating(this.curClub)&&(t=!0),i&&t&&console.warn("NEW JOB GRANTED"),this.getClubAchievementRating(this.curClub),i&&t}},{key:"findNewJobOfferingCLub",value:function(){var n=this,c=this.findUnderachievingClubsForAClub(this.curClub).map(function(c){return{item:c,chance:Math.abs(n.getClubAchievementRating(c))*n.GET_OFFER_FROM_CLUB_CHANCE_GROWTH_BY_HIS_UNDERACHIEVEMENT_RANK}});return Object(r.a)(c)}},{key:"getClubAchievementRating",value:function(n){var c=0;return Object(i.a)([this.store.select(e.s,{leaguesNameEn:n.leagueNameEn}),this.store.select(e.J,{leaguesNameEn:n.leagueNameEn})]).pipe(Object(a.a)(1)).subscribe(function(t){var e=o(t,2),a=e[0],i=e[1],s=a.findIndex(function(c){return c.club.nameEn===n.nameEn}),r=i.findIndex(function(c){return c.club.nameEn===n.nameEn});c=s-r}),c}},{key:"findUnderachievingClubsForAClub",value:function(n){var c,t=this,i=n.leagueNameEn;this.store.select(e.n,{leaguesNameEn:i}).pipe(Object(a.a)(1)).subscribe(function(n){c=n});var o=this.findUnderachievingClubsByLeagueNameEn(i).filter(function(c){return c.nameEn!==n.nameEn}),r=[];return c&&this.getClubAchievementRating(n)>=this.ACHIEVEMENT_RANK_TO_GET_TIER_HIGHER_JOB_OFFER&&((r=this.findUnderachievingClubsByLeagueNameEn(c.nameEn)).sort(function(n,c){return t.getClubAchievementRating(n)-t.getClubAchievementRating(c)}),r=r.filter(function(n,c){return c<t.MAX_NUM_OF_HIGHER_TIER_CLUBS_TO_OFFER})),[].concat(s(o),s(r))}},{key:"findUnderachievingClubsByLeagueNameEn",value:function(n){var c,t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return this.store.select(e.u,{leaguesNameEn:n}).pipe(Object(a.a)(1)).subscribe(function(n){c=n.filter(function(n){return t.getClubAchievementRating(n)<i})}),c}},{key:"oneMoreWeekOnCurrentJob",value:function(){this.store.dispatch(Object(u.u)())}},{key:"newJobTaken",value:function(n){this.store.dispatch(Object(u.t)({clubsNameEn:n.nameEn}))}}]),n}();return n.\u0275fac=function(c){return new(c||n)(l.oc(h.b))},n.\u0275prov=l.Tb({token:n,factory:n.\u0275fac,providedIn:"root"}),n}()},relc:function(n,c,t){"use strict";t.d(c,"a",function(){return l});var e,a,i=t("+rOU"),s=t("fXoL"),o=t("+hVe"),r=((e=function(){function n(){f(this,n)}return b(n,[{key:"ngOnInit",value:function(){}}]),n}()).\u0275fac=function(n){return new(n||e)},e.\u0275cmp=s.Rb({type:e,selectors:[["app-match-tooltip"]],decls:1,vars:2,consts:[[3,"match","showGains"]],template:function(n,c){1&n&&s.Yb(0,"app-match-result",0),2&n&&s.Cc("match",c.match)("showGains",c.showGains)},directives:[o.a],styles:["[_nghost-%COMP%] {\n  border: 2px solid #144114;\n  background-color: #ecf08f;\n  color: #1e1e1e;\n  \n  width: 500px;\n}\n\n  .my-club {\n  color: #6e8fb2;\n}"]}),e),u=t("rDax"),l=((a=function(){function n(c,t,e){f(this,n),this.overlayPositionBuilder=c,this.elementRef=t,this.overlay=e}return b(n,[{key:"ngOnInit",value:function(){var n=this.overlayPositionBuilder.flexibleConnectedTo(this.elementRef).withPositions([{originX:"center",originY:"bottom",overlayX:"center",overlayY:"top"},{originX:"center",originY:"top",overlayX:"center",overlayY:"bottom"}]);this.overlayRef=this.overlay.create({positionStrategy:n})}},{key:"show",value:function(){var n=new i.d(r),c=this.overlayRef.attach(n);c.instance.match=this.match,c.instance.showGains=this.showGains}},{key:"hide",value:function(){this.overlayRef.detach()}}]),n}()).\u0275fac=function(n){return new(n||a)(s.Xb(u.g),s.Xb(s.o),s.Xb(u.c))},a.\u0275dir=s.Sb({type:a,selectors:[["","appMatchTooltip",""]],hostBindings:function(n,c){1&n&&s.sc("mouseenter",function(){return c.show()})("mouseleave",function(){return c.hide()})},inputs:{match:["appMatchTooltip","match"],showGains:"showGains"}}),a)},zd2R:function(n,c,t){"use strict";t.d(c,"a",function(){return h});var e=t("SqtC"),s=t("fXoL"),o=t("tyNb"),r=t("bTqV"),u=t("Qu3c"),h=function(){var n=function(){function n(c){f(this,n),this.router=c}return b(n,[{key:"ngOnInit",value:function(){}},{key:"navigateToOffice",value:function(){this.router.navigate([e.a.OFFICE]).then(function(n){}).catch(function(n){console.error(n)})}},{key:"isDisabled",value:function(){return this.router.url==="/".concat(e.a.OFFICE)}}]),n}();return n.\u0275fac=function(c){return new(c||n)(s.Xb(o.d))},n.\u0275cmp=s.Rb({type:n,selectors:[["app-navigate-to-office"]],decls:4,vars:1,consts:function(){return[[1,"row"],[1,"col"],["mat-raised-button","","color","primary","matTooltip",$localize(a||(a=l([":\u241f7923ab10c3e99127072f86d8ef1eb30bc20948c8\u241f497022465090165640:\u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u0432 \u043a\u0430\u0431\u0438\u043d\u0435\u0442"]))),3,"disabled","click"],$localize(i||(i=l([":\u241f15761673e052961fb14afbac59d44ec8201f1e92\u241f3135376807559126630:\u041d\u0430\u0437\u0430\u0434"])))]},template:function(n,c){1&n&&(s.dc(0,"div",0),s.dc(1,"div",1),s.dc(2,"button",2),s.sc("click",function(){return c.navigateToOffice()}),s.hc(3,3),s.cc(),s.cc(),s.cc()),2&n&&(s.Lb(2),s.Cc("disabled",c.isDisabled()))},directives:[r.b,u.a],styles:[""]}),n}()}}])}();