(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"+hVe":function(t,c,a){"use strict";a.d(c,"a",function(){return O});var n=a("lJxs"),i=a("woNW"),e=a("fXoL"),s=a("kt0X"),o=a("r4Kj"),r=a("ofXK");const l=function(t){return{"my-club":t}};function m(t,c){if(1&t&&(e.dc(0,"div",0),e.dc(1,"div",11),e.wc(2,"async"),e.wc(3,"async"),e.Tc(4),e.wc(5,"async"),e.cc(),e.cc()),2&t){const t=e.vc();e.Lb(1),e.Bc("ngClass",e.Ec(8,l,e.xc(2,2,t.isMyClub$(t.match).home)||e.xc(3,4,t.isMyClub$(t.match).away))),e.Lb(3),e.Vc(" ",e.xc(5,6,t.matchStats$).result," ")}}function d(t,c){if(1&t&&(e.dc(0,"div",0),e.dc(1,"div",1),e.hc(2,12),e.wc(3,"async"),e.wc(4,"async"),e.cc(),e.cc()),2&t){const t=e.vc();e.Lb(4),e.lc(e.xc(3,2,t.matchStats$).attendance)(e.xc(4,4,t.homeClub$).stadium),e.ic(2)}}function h(t,c){if(1&t&&(e.dc(0,"span"),e.Tc(1),e.wc(2,"async"),e.cc()),2&t){const t=e.vc().$implicit,c=e.vc();e.Lb(1),e.Vc("(",e.xc(2,1,c.matchStats$).homeAssists[t][c.config.name],")")}}function u(t,c){if(1&t&&(e.dc(0,"div",3),e.wc(1,"async"),e.Tc(2),e.wc(3,"async"),e.Rc(4,h,3,3,"span",13),e.wc(5,"async"),e.cc()),2&t){const t=c.$implicit,a=e.vc();e.Bc("ngClass",e.Ec(10,l,e.xc(1,4,a.isMyClub$(a.match).home))),e.Lb(2),e.Wc(" ",t,"' ",e.xc(3,6,a.matchStats$).homeGoals[t][a.config.name]," "),e.Lb(2),e.Bc("ngIf",e.xc(5,8,a.matchStats$).homeAssists[t])}}function b(t,c){if(1&t&&(e.dc(0,"span"),e.Tc(1),e.wc(2,"async"),e.cc()),2&t){const t=e.vc().$implicit,c=e.vc();e.Lb(1),e.Vc("(",e.xc(2,1,c.matchStats$).awayAssists[t][c.config.name],")")}}function f(t,c){if(1&t&&(e.dc(0,"div",3),e.wc(1,"async"),e.Tc(2),e.wc(3,"async"),e.Rc(4,b,3,3,"span",13),e.wc(5,"async"),e.cc()),2&t){const t=c.$implicit,a=e.vc();e.Bc("ngClass",e.Ec(10,l,e.xc(1,4,a.isMyClub$(a.match).away))),e.Lb(2),e.Wc(" ",t,"' ",e.xc(3,6,a.matchStats$).awayGoals[t][a.config.name]," "),e.Lb(2),e.Bc("ngIf",e.xc(5,8,a.matchStats$).awayAssists[t])}}function p(t,c){if(1&t&&(e.dc(0,"span"),e.Tc(1),e.cc()),2&t){const t=e.vc().$implicit,c=e.vc();e.Lb(1),e.Vc("",t[c.config.name]," ")}}function g(t,c){if(1&t&&(e.dc(0,"span"),e.Rc(1,p,2,1,"span",13),e.cc()),2&t){const t=c.$implicit,a=e.vc();e.Lb(1),e.Bc("ngIf",t.clubNameEn===a.match.homeNameEn)}}function E(t,c){if(1&t&&(e.dc(0,"span"),e.Tc(1),e.cc()),2&t){const t=e.vc().$implicit,c=e.vc();e.Lb(1),e.Vc("",t[c.config.name]," ")}}function v(t,c){if(1&t&&(e.dc(0,"span"),e.Rc(1,E,2,1,"span",13),e.cc()),2&t){const t=c.$implicit,a=e.vc();e.Lb(1),e.Bc("ngIf",t.clubNameEn===a.match.awayNameEn)}}function y(t,c){if(1&t&&(e.dc(0,"span"),e.Tc(1),e.cc()),2&t){const t=e.vc().$implicit,c=e.vc();e.Lb(1),e.Vc("",t[c.config.name]," ")}}function w(t,c){if(1&t&&(e.dc(0,"span"),e.Rc(1,y,2,1,"span",13),e.cc()),2&t){const t=c.$implicit,a=e.vc();e.Lb(1),e.Bc("ngIf",t.clubNameEn===a.match.homeNameEn)}}function x(t,c){if(1&t&&(e.dc(0,"span"),e.Tc(1),e.cc()),2&t){const t=e.vc().$implicit,c=e.vc();e.Lb(1),e.Vc("",t[c.config.name]," ")}}function C(t,c){if(1&t&&(e.dc(0,"span"),e.Rc(1,x,2,1,"span",13),e.cc()),2&t){const t=c.$implicit,a=e.vc();e.Lb(1),e.Bc("ngIf",t.clubNameEn===a.match.awayNameEn)}}let O=(()=>{class t{constructor(t,c){this.store=t,this.config=c,this.showGains=!0}ngOnInit(){this.homeClub$=this.store.select(i.r,{clubsNameEn:this.match.homeNameEn}),this.awayClub$=this.store.select(i.r,{clubsNameEn:this.match.awayNameEn}),this.curClub$=this.store.select(i.z),this.matchStats$=this.store.select(i.M,{matchId:this.match.id}),this.matchGaines$=this.store.select(i.L,{matchId:this.match.id})}isMyClub$(t){return{home:this.curClub$.pipe(Object(n.a)(c=>c.nameEn===t.homeNameEn)),away:this.curClub$.pipe(Object(n.a)(c=>c.nameEn===t.awayNameEn))}}keys(t){return Object.keys(t)}}return t.\u0275fac=function(c){return new(c||t)(e.Xb(s.b),e.Xb(o.a))},t.\u0275cmp=e.Rb({type:t,selectors:[["app-match-result"]],inputs:{match:"match",showGains:"showGains"},decls:40,vars:50,consts:function(){let t;return t=$localize`:зрителей | Att\:␟0752c7fcaedb826f1bc35d16419cddb06f7f3ec2␟2280019662359459096: ${"\ufffd0\ufffd"}:INTERPOLATION: зрителей(${"\ufffd1\ufffd"}:INTERPOLATION_1:) `,[[1,"row"],[1,"col"],[1,"col","text-center"],[3,"ngClass"],["class","row",4,"ngIf"],[1,"row","justify-content-around"],[1,"col-5","scorers",3,"ngClass"],[3,"ngClass",4,"ngFor","ngForOf"],[1,"col-5","gains"],[4,"ngFor","ngForOf"],[1,"col-5","losses"],[1,"col","text-center",3,"ngClass"],t,[4,"ngIf"]]},template:function(t,c){if(1&t&&(e.dc(0,"div",0),e.dc(1,"div",1),e.dc(2,"div",0),e.dc(3,"div",2),e.dc(4,"span",3),e.wc(5,"async"),e.Tc(6),e.wc(7,"async"),e.cc(),e.Tc(8," - "),e.dc(9,"span",3),e.wc(10,"async"),e.Tc(11),e.wc(12,"async"),e.cc(),e.cc(),e.cc(),e.Rc(13,m,6,10,"div",4),e.wc(14,"async"),e.Rc(15,d,5,6,"div",4),e.wc(16,"async"),e.dc(17,"div",5),e.dc(18,"div",6),e.wc(19,"async"),e.Rc(20,u,6,12,"div",7),e.wc(21,"async"),e.cc(),e.dc(22,"div",6),e.wc(23,"async"),e.Rc(24,f,6,12,"div",7),e.wc(25,"async"),e.cc(),e.cc(),e.dc(26,"div",5),e.dc(27,"div",8),e.Rc(28,g,2,1,"span",9),e.wc(29,"async"),e.cc(),e.dc(30,"div",8),e.Rc(31,v,2,1,"span",9),e.wc(32,"async"),e.cc(),e.cc(),e.dc(33,"div",5),e.dc(34,"div",10),e.Rc(35,w,2,1,"span",9),e.wc(36,"async"),e.cc(),e.dc(37,"div",10),e.Rc(38,C,2,1,"span",9),e.wc(39,"async"),e.cc(),e.cc(),e.cc(),e.cc()),2&t){let t=null,a=null;e.Lb(4),e.Bc("ngClass",e.Ec(42,l,e.xc(5,14,c.isMyClub$(c.match).home))),e.Lb(2),e.Vc(" ",e.xc(7,16,c.homeClub$)[c.config.name]," "),e.Lb(3),e.Bc("ngClass",e.Ec(44,l,e.xc(10,18,c.isMyClub$(c.match).away))),e.Lb(2),e.Vc(" ",e.xc(12,20,c.awayClub$)[c.config.name]," "),e.Lb(2),e.Bc("ngIf",null==(t=e.xc(14,22,c.matchStats$))?null:t.result),e.Lb(2),e.Bc("ngIf",null==(a=e.xc(16,24,c.matchStats$))?null:a.result),e.Lb(3),e.Bc("ngClass",e.Ec(46,l,e.xc(19,26,c.isMyClub$(c.match).home))),e.Lb(2),e.Bc("ngForOf",c.keys(e.xc(21,28,c.matchStats$).homeGoals)),e.Lb(2),e.Bc("ngClass",e.Ec(48,l,e.xc(23,30,c.isMyClub$(c.match).away))),e.Lb(2),e.Bc("ngForOf",c.keys(e.xc(25,32,c.matchStats$).awayGoals)),e.Lb(4),e.Bc("ngForOf",e.xc(29,34,c.matchGaines$).gains),e.Lb(3),e.Bc("ngForOf",e.xc(32,36,c.matchGaines$).gains),e.Lb(4),e.Bc("ngForOf",e.xc(36,38,c.matchGaines$).losses),e.Lb(3),e.Bc("ngForOf",e.xc(39,40,c.matchGaines$).losses)}},directives:[r.m,r.o,r.n],pipes:[r.b],styles:[".scorers[_ngcontent-%COMP%] {\n  font-size: small;\n}\n\n.gains[_ngcontent-%COMP%] {\n  font-size: x-small;\n  color: green;\n}\n\n.losses[_ngcontent-%COMP%] {\n  font-size: x-small;\n  color: red;\n}\n\n.my-club[_ngcontent-%COMP%] {\n  \n}"],changeDetection:0}),t})()},Wp6s:function(t,c,a){"use strict";a.d(c,"a",function(){return r}),a.d(c,"b",function(){return l});var n=a("R1ws"),i=a("FKr1"),e=a("fXoL");const s=["*",[["mat-card-footer"]]],o=["*","mat-card-footer"];let r=(()=>{class t{constructor(t){this._animationMode=t}}return t.\u0275fac=function(c){return new(c||t)(e.Xb(n.a,8))},t.\u0275cmp=e.Rb({type:t,selectors:[["mat-card"]],hostAttrs:[1,"mat-card","mat-focus-indicator"],hostVars:2,hostBindings:function(t,c){2&t&&e.Pb("_mat-animation-noopable","NoopAnimations"===c._animationMode)},exportAs:["matCard"],ngContentSelectors:o,decls:2,vars:0,template:function(t,c){1&t&&(e.Ac(s),e.zc(0),e.zc(1,1))},styles:[".mat-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}._mat-animation-noopable.mat-card{transition:none;animation:none}.mat-card .mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card .mat-divider-horizontal{left:auto;right:0}.mat-card .mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card .mat-divider-horizontal.mat-divider-inset{margin-right:0}.cdk-high-contrast-active .mat-card{outline:solid 1px}.mat-card-actions,.mat-card-subtitle,.mat-card-content{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button,.mat-card-actions .mat-stroked-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card>:first-child,.mat-card-content>:first-child{margin-top:0}.mat-card>:last-child:not(.mat-card-footer),.mat-card-content>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions:not(.mat-card-actions-align-end) .mat-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-raised-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-stroked-button:first-child{margin-left:0;margin-right:0}.mat-card-actions-align-end .mat-button:last-child,.mat-card-actions-align-end .mat-raised-button:last-child,.mat-card-actions-align-end .mat-stroked-button:last-child{margin-left:0;margin-right:0}.mat-card-title:not(:first-child),.mat-card-subtitle:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}\n"],encapsulation:2,changeDetection:0}),t})(),l=(()=>{class t{}return t.\u0275fac=function(c){return new(c||t)},t.\u0275mod=e.Vb({type:t}),t.\u0275inj=e.Ub({imports:[[i.g],i.g]}),t})()},f9qZ:function(t,c,a){"use strict";a.d(c,"a",function(){return o});var n=a("npY+"),i=a("fXoL"),e=a("kt0X"),s=a("w0zp");let o=(()=>{class t{constructor(t,c){this.store=t,this.finService=c}endCurrentSeason(){console.warn("ENDING CURRENT SEASON"),this.givePrizeMoney()}startNewSeason(){this.changePlayersPowers(),this.store.dispatch(Object(n.g)()),this.store.dispatch(Object(n.k)())}givePrizeMoney(){this.store.dispatch(Object(n.m)())}changePlayersPowers(){this.store.dispatch(Object(n.A)())}makeDivisionRotations(){this.store.dispatch(Object(n.s)())}}return t.\u0275fac=function(c){return new(c||t)(i.oc(e.b),i.oc(s.a))},t.\u0275prov=i.Tb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},qLOZ:function(t,c,a){"use strict";a.d(c,"a",function(){return m});var n=a("woNW"),i=a("IzEk"),e=a("itXk"),s=a("GZ7p"),o=a("npY+"),r=a("fXoL"),l=a("kt0X");let m=(()=>{class t{constructor(t){this.store=t,this.MIN_TIME_ON_ONE_JOB=1,this.BASE_NEW_JOB_OFFER_CHANCE=50,this.NEW_JOB_OFFER_CHANCE_GROWTH_BY_ACHIEVEMENT_RANK=1,this.GET_OFFER_FROM_CLUB_CHANCE_GROWTH_BY_HIS_UNDERACHIEVEMENT_RANK=2,this.ACHIEVEMENT_RANK_TO_GET_TIER_HIGHER_JOB_OFFER=7,this.MAX_NUM_OF_HIGHER_TIER_CLUBS_TO_OFFER=3}gotNewJobOffer(){let t;console.error("CHECKING FOR NEW JOB"),this.store.select(n.o).pipe(Object(i.a)(1)).subscribe(c=>{t=c});const c=t>=this.MIN_TIME_ON_ONE_JOB;let a;return this.store.select(n.z).pipe(Object(i.a)(1)).subscribe(t=>{this.curClub=t}),Object(s.e)(1,100)<this.BASE_NEW_JOB_OFFER_CHANCE+this.NEW_JOB_OFFER_CHANCE_GROWTH_BY_ACHIEVEMENT_RANK*this.getClubAchievementRating(this.curClub)&&(a=!0),c&&a&&console.warn("NEW JOB GRANTED"),this.getClubAchievementRating(this.curClub),c&&a}findNewJobOfferingCLub(){const t=this.findUnderachievingClubsForAClub(this.curClub).map(t=>({item:t,chance:Math.abs(this.getClubAchievementRating(t))*this.GET_OFFER_FROM_CLUB_CHANCE_GROWTH_BY_HIS_UNDERACHIEVEMENT_RANK}));return Object(s.a)(t)}getClubAchievementRating(t){let c=0;return Object(e.a)([this.store.select(n.s,{leaguesNameEn:t.leagueNameEn}),this.store.select(n.J,{leaguesNameEn:t.leagueNameEn})]).pipe(Object(i.a)(1)).subscribe(([a,n])=>{const i=a.findIndex(c=>c.club.nameEn===t.nameEn),e=n.findIndex(c=>c.club.nameEn===t.nameEn);c=i-e}),c}findUnderachievingClubsForAClub(t){const c=t.leagueNameEn;let a;this.store.select(n.n,{leaguesNameEn:c}).pipe(Object(i.a)(1)).subscribe(t=>{a=t});const e=this.findUnderachievingClubsByLeagueNameEn(c).filter(c=>c.nameEn!==t.nameEn);let s=[];return a&&this.getClubAchievementRating(t)>=this.ACHIEVEMENT_RANK_TO_GET_TIER_HIGHER_JOB_OFFER&&(s=this.findUnderachievingClubsByLeagueNameEn(a.nameEn),s.sort((t,c)=>this.getClubAchievementRating(t)-this.getClubAchievementRating(c)),s=s.filter((t,c)=>c<this.MAX_NUM_OF_HIGHER_TIER_CLUBS_TO_OFFER)),[...e,...s]}findUnderachievingClubsByLeagueNameEn(t,c=0){let a;return this.store.select(n.u,{leaguesNameEn:t}).pipe(Object(i.a)(1)).subscribe(t=>{a=t.filter(t=>this.getClubAchievementRating(t)<c)}),a}oneMoreWeekOnCurrentJob(){this.store.dispatch(Object(o.u)())}newJobTaken(t){this.store.dispatch(Object(o.t)({clubsNameEn:t.nameEn}))}}return t.\u0275fac=function(c){return new(c||t)(r.oc(l.b))},t.\u0275prov=r.Tb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},relc:function(t,c,a){"use strict";a.d(c,"a",function(){return r});var n=a("+rOU"),i=a("fXoL"),e=a("+hVe");let s=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(c){return new(c||t)},t.\u0275cmp=i.Rb({type:t,selectors:[["app-match-tooltip"]],decls:1,vars:2,consts:[[3,"match","showGains"]],template:function(t,c){1&t&&i.Yb(0,"app-match-result",0),2&t&&i.Bc("match",c.match)("showGains",c.showGains)},directives:[e.a],styles:["[_nghost-%COMP%] {\n  border: 2px solid #144114;\n  background-color: #ecf08f;\n  color: #1e1e1e;\n  \n  width: 500px;\n}\n\n  .my-club {\n  color: #6e8fb2;\n}"]}),t})();var o=a("rDax");let r=(()=>{class t{constructor(t,c,a){this.overlayPositionBuilder=t,this.elementRef=c,this.overlay=a}ngOnInit(){const t=this.overlayPositionBuilder.flexibleConnectedTo(this.elementRef).withPositions([{originX:"center",originY:"bottom",overlayX:"center",overlayY:"top"},{originX:"center",originY:"top",overlayX:"center",overlayY:"bottom"}]);this.overlayRef=this.overlay.create({positionStrategy:t})}show(){const t=new n.d(s),c=this.overlayRef.attach(t);c.instance.match=this.match,c.instance.showGains=this.showGains}hide(){this.overlayRef.detach()}}return t.\u0275fac=function(c){return new(c||t)(i.Xb(o.g),i.Xb(i.o),i.Xb(o.c))},t.\u0275dir=i.Sb({type:t,selectors:[["","appMatchTooltip",""]],hostBindings:function(t,c){1&t&&i.rc("mouseenter",function(){return c.show()})("mouseleave",function(){return c.hide()})},inputs:{match:["appMatchTooltip","match"],showGains:"showGains"}}),t})()},zd2R:function(t,c,a){"use strict";a.d(c,"a",function(){return r});var n=a("SqtC"),i=a("fXoL"),e=a("tyNb"),s=a("bTqV"),o=a("Qu3c");let r=(()=>{class t{constructor(t){this.router=t}ngOnInit(){}navigateToOffice(){this.router.navigate([n.a.OFFICE]).then(t=>{}).catch(t=>{console.error(t)})}isDisabled(){return this.router.url===`/${n.a.OFFICE}`}}return t.\u0275fac=function(c){return new(c||t)(i.Xb(e.d))},t.\u0275cmp=i.Rb({type:t,selectors:[["app-navigate-to-office"]],decls:4,vars:1,consts:function(){let t,c;return t=$localize`:␟7923ab10c3e99127072f86d8ef1eb30bc20948c8␟497022465090165640:Вернуться в кабинет`,c=$localize`:␟15761673e052961fb14afbac59d44ec8201f1e92␟3135376807559126630:Назад`,[[1,"row"],[1,"col"],["mat-raised-button","","color","primary","matTooltip",t,3,"disabled","click"],c]},template:function(t,c){1&t&&(i.dc(0,"div",0),i.dc(1,"div",1),i.dc(2,"button",2),i.rc("click",function(){return c.navigateToOffice()}),i.hc(3,3),i.cc(),i.cc(),i.cc()),2&t&&(i.Lb(2),i.Bc("disabled",c.isDisabled()))},directives:[s.a,o.a],styles:[""]}),t})()}}]);