(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{"syE+":function(e,c,t){"use strict";t.r(c),t.d(c,"TablesModule",function(){return We});var a=t("ofXK"),l=t("tyNb"),n=t("mrSG"),s=t("woNW"),i=t("vkgz"),o=t("IzEk"),d=t("/uUt"),r=t("JX91"),u=t("eIep"),b=t("lJxs"),m=t("itXk"),f=t("JgKa"),p=t("kHgy"),h=t("3Pt+"),g=t("fXoL"),y=t("kt0X"),w=t("r4Kj"),v=t("wZkO"),T=t("ZOsW"),C=t("0IaG"),$=t("MutI"),x=t("bTqV");function R(e,c){if(1&e&&(g.dc(0,"span"),g.Tc(1),g.wc(2,"async"),g.wc(3,"async"),g.cc()),2&e){const e=g.vc().$implicit,c=g.vc();g.Lb(1),g.Wc("",g.xc(2,2,c.stats$).get(e.nameEn).goals,"+",g.xc(3,4,c.stats$).get(e.nameEn).assists,"")}}function L(e,c){if(1&e&&(g.dc(0,"span"),g.Tc(1),g.wc(2,"async"),g.cc()),2&e){const e=g.vc().$implicit,c=g.vc();g.Lb(1),g.Uc(g.xc(2,1,c.stats$).get(e.nameEn).conceded)}}function O(e,c){if(1&e&&(g.dc(0,"mat-list-item",9),g.dc(1,"div"),g.dc(2,"div",3),g.dc(3,"div",10),g.dc(4,"div",6),g.Tc(5),g.cc(),g.dc(6,"div",11),g.Tc(7),g.cc(),g.dc(8,"div",12),g.Tc(9),g.cc(),g.dc(10,"div",6),g.Tc(11),g.wc(12,"async"),g.cc(),g.dc(13,"div",6),g.Rc(14,R,4,6,"span",13),g.Rc(15,L,3,3,"span",13),g.cc(),g.cc(),g.cc(),g.cc(),g.cc()),2&e){const e=c.$implicit,t=g.vc();g.Lb(1),g.Ob("row w-100 pos-",e.position.toLowerCase(),""),g.Lb(4),g.Vc(" ",e.position," "),g.Lb(2),g.Vc(" ",e[t.config.name]," "),g.Lb(2),g.Vc(" ",e.power," "),g.Lb(2),g.Vc(" ",g.xc(12,9,t.stats$).get(e.nameEn).games," "),g.Lb(3),g.Bc("ngIf","GK"!==e.position),g.Lb(1),g.Bc("ngIf","GK"===e.position)}}let I=(()=>{class e{constructor(e,c,t,a){this.store=e,this.dialogRef=c,this.data=t,this.config=a}ngOnInit(){this.players$=this.store.select(s.O,{clubsName:this.data.clubName}),this.stats$=this.store.select(s.q,{clubsName:this.data.clubName}).pipe(Object(u.a)(e=>this.store.select(s.w,{clubsNameEn:e.nameEn})))}}return e.\u0275fac=function(c){return new(c||e)(g.Xb(y.b),g.Xb(C.e),g.Xb(C.a),g.Xb(w.a))},e.\u0275cmp=g.Rb({type:e,selectors:[["app-players-list-dialog"]],decls:13,vars:5,consts:function(){let e;return e=$localize`:␟ea4823e92c81e6c593190b6a7beda216d54e2d7b␟5813922920209429185:Закрыть`,[[1,"row","justify-content-center"],[1,"col","text-center"],[1,"row"],[1,"col"],["role","list"],["role","listitem","class","list-item",4,"ngFor","ngForOf"],[1,"col-1"],["mat-raised-button","","color","primary",3,"mat-dialog-close"],e,["role","listitem",1,"list-item"],[1,"row","w-100"],[1,"col-7"],[1,"col-2"],[4,"ngIf"]]},template:function(e,c){1&e&&(g.dc(0,"div",0),g.dc(1,"div",1),g.dc(2,"h4"),g.Tc(3),g.cc(),g.cc(),g.cc(),g.dc(4,"div",2),g.dc(5,"div",3),g.dc(6,"mat-list",4),g.Rc(7,O,16,11,"mat-list-item",5),g.wc(8,"async"),g.cc(),g.cc(),g.cc(),g.dc(9,"div",0),g.dc(10,"div",6),g.dc(11,"button",7),g.hc(12,8),g.cc(),g.cc(),g.cc()),2&e&&(g.Lb(3),g.Uc(c.data.clubName),g.Lb(4),g.Bc("ngForOf",g.xc(8,3,c.players$)),g.Lb(4),g.Bc("mat-dialog-close",null))},directives:[$.a,a.n,x.a,C.c,$.b,a.o],pipes:[a.b],styles:[".list-item[_ngcontent-%COMP%] {\n  \n}\n\n  .mat-list-item {\n  height: 25px !important;\n}"]}),e})();var E=t("+0xr"),B=t("Qu3c");function k(e,c){1&e&&(g.dc(0,"mat-header-cell",27),g.hc(1,28),g.cc())}const S=function(e){return{"my-club":e}};function M(e,c){if(1&e&&(g.dc(0,"mat-cell",29),g.wc(1,"async"),g.Tc(2),g.cc()),2&e){const e=c.$implicit,t=c.index,a=g.vc();g.Bc("ngClass",g.Ec(4,S,a.isMyClubsTableRecord(e,g.xc(1,2,a.curClub$)))),g.Lb(2),g.Vc(" ",t+1," ")}}function z(e,c){1&e&&(g.dc(0,"mat-header-cell",30),g.hc(1,31),g.cc())}function P(e,c){if(1&e){const e=g.ec();g.dc(0,"mat-cell",32),g.wc(1,"async"),g.dc(2,"span",33),g.rc("click",function(){g.Lc(e);const t=c.$implicit;return g.vc().showClubsRoster(t.club.nameEn)}),g.Tc(3),g.cc(),g.cc()}if(2&e){const e=c.$implicit,t=g.vc();g.Bc("ngClass",g.Ec(4,S,t.isMyClubsTableRecord(e,g.xc(1,2,t.curClub$)))),g.Lb(3),g.Vc(" ",e.club[t.config.name]," ")}}function D(e,c){1&e&&(g.dc(0,"mat-header-cell",34),g.hc(1,35),g.cc())}function N(e,c){if(1&e&&(g.dc(0,"mat-cell",29),g.wc(1,"async"),g.Tc(2),g.cc()),2&e){const e=c.$implicit,t=g.vc();g.Bc("ngClass",g.Ec(4,S,t.isMyClubsTableRecord(e,g.xc(1,2,t.curClub$)))),g.Lb(2),g.Vc(" ",e.games," ")}}function j(e,c){1&e&&(g.dc(0,"mat-header-cell",36),g.hc(1,37),g.cc())}function V(e,c){if(1&e&&(g.dc(0,"mat-cell",29),g.wc(1,"async"),g.Tc(2),g.cc()),2&e){const e=c.$implicit,t=g.vc();g.Bc("ngClass",g.Ec(4,S,t.isMyClubsTableRecord(e,g.xc(1,2,t.curClub$)))),g.Lb(2),g.Vc(" ",e.wins," ")}}function W(e,c){1&e&&(g.dc(0,"mat-header-cell",38),g.hc(1,39),g.cc())}function F(e,c){if(1&e&&(g.dc(0,"mat-cell",29),g.wc(1,"async"),g.Tc(2),g.cc()),2&e){const e=c.$implicit,t=g.vc();g.Bc("ngClass",g.Ec(4,S,t.isMyClubsTableRecord(e,g.xc(1,2,t.curClub$)))),g.Lb(2),g.Vc(" ",e.draws," ")}}function H(e,c){1&e&&(g.dc(0,"mat-header-cell",40),g.hc(1,41),g.cc())}function X(e,c){if(1&e&&(g.dc(0,"mat-cell",29),g.wc(1,"async"),g.Tc(2),g.cc()),2&e){const e=c.$implicit,t=g.vc();g.Bc("ngClass",g.Ec(4,S,t.isMyClubsTableRecord(e,g.xc(1,2,t.curClub$)))),g.Lb(2),g.Vc(" ",e.loses," ")}}function _(e,c){1&e&&(g.dc(0,"mat-header-cell",42),g.hc(1,43),g.cc())}function Y(e,c){if(1&e&&(g.dc(0,"mat-cell",29),g.wc(1,"async"),g.Tc(2),g.cc()),2&e){const e=c.$implicit,t=g.vc();g.Bc("ngClass",g.Ec(4,S,t.isMyClubsTableRecord(e,g.xc(1,2,t.curClub$)))),g.Lb(2),g.Vc(" ",e.gf," ")}}function G(e,c){1&e&&(g.dc(0,"mat-header-cell",44),g.hc(1,45),g.cc())}function U(e,c){if(1&e&&(g.dc(0,"mat-cell",29),g.wc(1,"async"),g.Tc(2),g.cc()),2&e){const e=c.$implicit,t=g.vc();g.Bc("ngClass",g.Ec(4,S,t.isMyClubsTableRecord(e,g.xc(1,2,t.curClub$)))),g.Lb(2),g.Vc(" ",e.ga," ")}}function A(e,c){1&e&&(g.dc(0,"mat-header-cell",46),g.hc(1,47),g.cc())}function J(e,c){if(1&e&&(g.dc(0,"mat-cell",29),g.wc(1,"async"),g.Tc(2),g.cc()),2&e){const e=c.$implicit,t=g.vc();g.Bc("ngClass",g.Ec(4,S,t.isMyClubsTableRecord(e,g.xc(1,2,t.curClub$)))),g.Lb(2),g.Vc(" ",e.gd," ")}}function K(e,c){1&e&&(g.dc(0,"mat-header-cell",48),g.hc(1,49),g.cc())}function q(e,c){if(1&e&&(g.dc(0,"mat-cell",29),g.wc(1,"async"),g.Tc(2),g.cc()),2&e){const e=c.$implicit,t=g.vc();g.Bc("ngClass",g.Ec(4,S,t.isMyClubsTableRecord(e,g.xc(1,2,t.curClub$)))),g.Lb(2),g.Vc(" ",e.points," ")}}function Z(e,c){1&e&&g.Yb(0,"mat-header-row")}function Q(e,c){1&e&&g.Yb(0,"mat-row")}let ee=(()=>{class e{constructor(e,c,t){this.store=e,this.dialog=c,this.config=t,this.displayedColumns=["position","clubName","games","wins","draws","loses","gf","ga","gd","points"]}ngOnInit(){this.curClub$=this.store.select(s.z)}isMyClubsTableRecord(e,c){return e.club.nameEn===c.nameEn}showClubsRoster(e){this.dialog.open(I,{width:"500px",data:{clubName:e}})}}return e.\u0275fac=function(c){return new(c||e)(g.Xb(y.b),g.Xb(C.b),g.Xb(w.a))},e.\u0275cmp=g.Rb({type:e,selectors:[["app-league-table"]],inputs:{table:"table"},decls:35,vars:3,consts:function(){let e,c,t,a,l,n,s,i,o,d,r,u,b,m,f,p,h,g,y,w;return e=$localize`:␟fc652470a1e17fa38f28a935d8638a1e73ea306a␟148988469506348082:Позиция`,c=$localize`:␟9492386c180338fa3d613aa99de099eb9561e4a3␟8559933169631320991:Клуб`,t=$localize`:␟1b2c430c4f62afb973f694556a9b8bf8b51851f4␟8902958474064583602:Игр`,a=$localize`:␟5d4c6531ae30cf6fb1c0fbdcca35b3a3be1f3744␟4019496847890615221:Выиграно`,l=$localize`:␟b79e8da10ebee3211d3669709082cd7352c3a331␟7129491944534011927:Ничьи`,n=$localize`:␟1f2975803a991c83b97a9e260126884316d06ced␟3741883421207541276:Поражения`,s=$localize`:␟217169cee3b3603bf53347bff4345f76d1842f68␟7413361372189980782:Забитые мячи`,i=$localize`:␟7373bae9491635f553c7a6c3eb8219e8fe88b883␟5523078462615948413:Пропущенные мячи`,o=$localize`:␟ed8c3d1682676c519d5a93b753fb7283e78cacbf␟2984366332711056980:Разница мячей`,d=$localize`:␟79c574970dfcd5f9cff6a8067b317ce5f3f16051␟5195002767749826705:Очки`,r=$localize`:table header␟ae12345a9b07549d40dc010a19b70bed19e5d5bb␟4468103540398151050: Поз`,u=$localize`:table header␟1def93b6db13cc5a94b40352d8c8429f7c31ce44␟8000971869281050668: Клуб`,b=$localize`:table header␟0157717d03ad08c7df433fee45f7fe6ab19511c8␟6178966414623279771: И`,m=$localize`:table header␟7e98f714ffb9d3d7547a778128e5709e6de2ed24␟8855998668231512193: В`,f=$localize`:table header␟7831c7fbd43be3ca89c9387e09d4f1a6a1eddee4␟92116837520280265: Н`,p=$localize`:table header␟a99ae0a9158003177bd0be9ecf7c976cd085519a␟4660370548398670142: П`,h=$localize`:table header␟568dfc93c4b52cb92bdd722111e02b951d9487db␟1270862271706706118: ЗМ`,g=$localize`:table header␟91ede02147c89e04219f2f092a0277a76322b262␟2082022650480052501: ПМ`,y=$localize`:table header␟35d9e6bf726179f60c1de1a56a150d52d7c79a68␟5131767773981320453: РМ`,w=$localize`:table header␟f04544fb80b7132bcacd4c22eeb3fad3ece74472␟6823300020342367214: О`,[[1,"row","h-100","m-0"],[1,"col","h-100"],[1,"w-100","overflow-auto",3,"dataSource"],["matColumnDef","position"],["class","w-5","matTooltip",e,"matTooltipPosition","before",4,"matHeaderCellDef"],["class","w-5",3,"ngClass",4,"matCellDef"],["matColumnDef","clubName"],["class","w-25","matTooltip",c,"matTooltipPosition","before",4,"matHeaderCellDef"],["class","w-25",3,"ngClass",4,"matCellDef"],["matColumnDef","games"],["class","w-5","matTooltip",t,"matTooltipPosition","before",4,"matHeaderCellDef"],["matColumnDef","wins"],["class","w-5","matTooltip",a,"matTooltipPosition","before",4,"matHeaderCellDef"],["matColumnDef","draws"],["class","w-5","matTooltip",l,"matTooltipPosition","before",4,"matHeaderCellDef"],["matColumnDef","loses"],["class","w-5","matTooltip",n,"matTooltipPosition","before",4,"matHeaderCellDef"],["matColumnDef","gf"],["class","w-5","matTooltip",s,"matTooltipPosition","before",4,"matHeaderCellDef"],["matColumnDef","ga"],["class","w-5","matTooltip",i,"matTooltipPosition","before",4,"matHeaderCellDef"],["matColumnDef","gd"],["class","w-5","matTooltip",o,"matTooltipPosition","before",4,"matHeaderCellDef"],["matColumnDef","points"],["class","w-5","matTooltip",d,"matTooltipPosition","before",4,"matHeaderCellDef"],[4,"matHeaderRowDef"],[4,"matRowDef","matRowDefColumns"],["matTooltip",e,"matTooltipPosition","before",1,"w-5"],r,[1,"w-5",3,"ngClass"],["matTooltip",c,"matTooltipPosition","before",1,"w-25"],u,[1,"w-25",3,"ngClass"],[1,"hover",3,"click"],["matTooltip",t,"matTooltipPosition","before",1,"w-5"],b,["matTooltip",a,"matTooltipPosition","before",1,"w-5"],m,["matTooltip",l,"matTooltipPosition","before",1,"w-5"],f,["matTooltip",n,"matTooltipPosition","before",1,"w-5"],p,["matTooltip",s,"matTooltipPosition","before",1,"w-5"],h,["matTooltip",i,"matTooltipPosition","before",1,"w-5"],g,["matTooltip",o,"matTooltipPosition","before",1,"w-5"],y,["matTooltip",d,"matTooltipPosition","before",1,"w-5"],w]},template:function(e,c){1&e&&(g.dc(0,"div",0),g.dc(1,"div",1),g.dc(2,"mat-table",2),g.dc(3,"div",3),g.Rc(4,k,2,0,"mat-header-cell",4),g.Rc(5,M,3,6,"mat-cell",5),g.cc(),g.dc(6,"div",6),g.Rc(7,z,2,0,"mat-header-cell",7),g.Rc(8,P,4,6,"mat-cell",8),g.cc(),g.dc(9,"div",9),g.Rc(10,D,2,0,"mat-header-cell",10),g.Rc(11,N,3,6,"mat-cell",5),g.cc(),g.dc(12,"div",11),g.Rc(13,j,2,0,"mat-header-cell",12),g.Rc(14,V,3,6,"mat-cell",5),g.cc(),g.dc(15,"div",13),g.Rc(16,W,2,0,"mat-header-cell",14),g.Rc(17,F,3,6,"mat-cell",5),g.cc(),g.dc(18,"div",15),g.Rc(19,H,2,0,"mat-header-cell",16),g.Rc(20,X,3,6,"mat-cell",5),g.cc(),g.dc(21,"div",17),g.Rc(22,_,2,0,"mat-header-cell",18),g.Rc(23,Y,3,6,"mat-cell",5),g.cc(),g.dc(24,"div",19),g.Rc(25,G,2,0,"mat-header-cell",20),g.Rc(26,U,3,6,"mat-cell",5),g.cc(),g.dc(27,"div",21),g.Rc(28,A,2,0,"mat-header-cell",22),g.Rc(29,J,3,6,"mat-cell",5),g.cc(),g.dc(30,"div",23),g.Rc(31,K,2,0,"mat-header-cell",24),g.Rc(32,q,3,6,"mat-cell",5),g.cc(),g.Rc(33,Z,1,0,"mat-header-row",25),g.Rc(34,Q,1,0,"mat-row",26),g.cc(),g.cc(),g.cc()),2&e&&(g.Lb(2),g.Bc("dataSource",c.table),g.Lb(31),g.Bc("matHeaderRowDef",c.displayedColumns),g.Lb(1),g.Bc("matRowDefColumns",c.displayedColumns))},directives:[E.j,E.c,E.e,E.b,E.g,E.i,E.d,B.a,E.a,a.m,E.f,E.h],pipes:[a.b],styles:[""],changeDetection:0}),e})();const ce=function(e){return{selected:e}};function te(e,c){if(1&e){const e=g.ec();g.dc(0,"div",2),g.jc(1,3),g.rc("click",function(){g.Lc(e);const t=c.index;return g.vc().tourClick(t)}),g.dc(2,"span",4),g.Tc(3),g.cc(),g.cc()}if(2&e){const e=c.index,t=g.vc();g.lc(e+1),g.ic(1),g.Lb(2),g.Bc("ngClass",g.Ec(3,ce,e===t.selectedWeek)),g.Lb(1),g.Vc(" ",e+1," ")}}let ae=(()=>{class e{constructor(){this.selectedWeek=0,this.weekSelected=new g.r}ngOnInit(){}tourClick(e){this.weekSelected.emit(e)}}return e.\u0275fac=function(c){return new(c||e)},e.\u0275cmp=g.Rb({type:e,selectors:[["app-schedule-tours-list"]],inputs:{schedule:"schedule",selectedWeek:"selectedWeek"},outputs:{weekSelected:"weekSelected"},decls:2,vars:1,consts:function(){let e;return e=$localize`:␟bef6ff1b7b364653a953e5f30cb32869182fc92e␟3501396635565810161:${"\ufffd0\ufffd"}:INTERPOLATION: тур`,[[1,"row","m-0"],["class","col text-center hover p-0.5",3,"matTooltip","click",4,"ngFor","ngForOf"],[1,"col","text-center","hover","p-0.5",3,"click",6,"matTooltip"],["matTooltip",e],[1,"text-xs",3,"ngClass"]]},template:function(e,c){1&e&&(g.dc(0,"div",0),g.Rc(1,te,4,5,"div",1),g.cc()),2&e&&(g.Lb(1),g.Bc("ngForOf",c.schedule))},directives:[a.n,B.a,a.m],styles:[".selected[_ngcontent-%COMP%] {\n  border-bottom: black solid thin;\n}"],changeDetection:0}),e})();var le=t("relc");function ne(e,c){if(1&e&&(g.dc(0,"span",6),g.Tc(1),g.wc(2,"async"),g.cc()),2&e){const e=g.vc();g.Bc("appMatchTooltip",e.match1ToMatch(e.match)),g.Lb(1),g.Vc(" ",g.xc(2,2,e.matchStats$).result," ")}}function se(e,c){1&e&&(g.dc(0,"span"),g.Tc(1,"-"),g.cc())}const ie=function(e){return{"my-club":e}};let oe=(()=>{class e{constructor(e,c){this.store=e,this.config=c}ngOnInit(){this.curClub$=this.store.select(s.z),this.matchStats$=this.store.select(s.M,{matchId:this.match.id})}isMyClub$(e){return{home:this.curClub$.pipe(Object(b.a)(c=>{var t;return c.nameEn===(null===(t=e.home)||void 0===t?void 0:t.nameEn)})),away:this.curClub$.pipe(Object(b.a)(c=>{var t;return c.nameEn===(null===(t=e.away)||void 0===t?void 0:t.nameEn)}))}}match1ToMatch(e){return Object.assign(Object.assign({},e),{homeNameEn:e.home.nameEn,awayNameEn:e.away.nameEn})}}return e.\u0275fac=function(c){return new(c||e)(g.Xb(y.b),g.Xb(w.a))},e.\u0275cmp=g.Rb({type:e,selectors:[["app-schedule-match-item"]],inputs:{match:"match"},decls:12,vars:18,consts:[[1,"row","m-0"],[1,"col","text-right",3,"ngClass"],[1,"flex","flex-initial","text-center"],[3,"appMatchTooltip",4,"ngIf"],[4,"ngIf"],[1,"col","text-left",3,"ngClass"],[3,"appMatchTooltip"]],template:function(e,c){if(1&e&&(g.dc(0,"div",0),g.dc(1,"div",1),g.wc(2,"async"),g.Tc(3),g.cc(),g.dc(4,"div",2),g.Rc(5,ne,3,4,"span",3),g.wc(6,"async"),g.Rc(7,se,2,0,"span",4),g.wc(8,"async"),g.cc(),g.dc(9,"div",5),g.wc(10,"async"),g.Tc(11),g.cc(),g.cc()),2&e){let e=null,t=null;g.Lb(1),g.Bc("ngClass",g.Ec(14,ie,g.xc(2,6,c.isMyClub$(c.match).home))),g.Lb(2),g.Vc(" ",c.match.home[c.config.name]," "),g.Lb(2),g.Bc("ngIf",null==(e=g.xc(6,8,c.matchStats$))?null:e.result),g.Lb(2),g.Bc("ngIf",!(null!=(t=g.xc(8,10,c.matchStats$))&&t.result)),g.Lb(2),g.Bc("ngClass",g.Ec(16,ie,g.xc(10,12,c.isMyClub$(c.match).away))),g.Lb(2),g.Vc(" ",c.match.away[c.config.name]," ")}},directives:[a.m,a.o,le.a],pipes:[a.b],styles:[""],changeDetection:0}),e})();function de(e,c){1&e&&g.Yb(0,"app-schedule-match-item",3),2&e&&g.Bc("match",c.$implicit)}let re=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(c){return new(c||e)},e.\u0275cmp=g.Rb({type:e,selectors:[["app-schedule-tour-matches-list"]],inputs:{schedule:"schedule",tour:"tour",week:"week"},decls:3,vars:3,consts:function(){let e;return e=$localize`:␟8980f366dfa01518ba580b43060f508b0d135651␟3828441708653466803:${"\ufffd0\ufffd"}:INTERPOLATION: тур(неделя ${"\ufffd1\ufffd"}:INTERPOLATION_1:)`,[[1,"text-center","underline"],e,[3,"match",4,"ngFor","ngForOf"],[3,"match"]]},template:function(e,c){1&e&&(g.dc(0,"h3",0),g.hc(1,1),g.cc(),g.Rc(2,de,1,1,"app-schedule-match-item",2)),2&e&&(g.Lb(1),g.lc(c.tour)(c.week),g.ic(1),g.Lb(1),g.Bc("ngForOf",c.schedule))},directives:[a.n,oe],styles:[""],changeDetection:0}),e})();const ue=function(e){return{"my-club":e}};let be=(()=>{class e{constructor(e,c){this.store=e,this.config=c}ngOnInit(){switch(this.curClub$=this.store.select(s.z),this.type){case"goals":this.displayProp="goals";break;case"assists":this.displayProp="assists";break;case"g+a":this.displayProp="g+a"}}}return e.\u0275fac=function(c){return new(c||e)(g.Xb(y.b),g.Xb(w.a))},e.\u0275cmp=g.Rb({type:e,selectors:[["app-player-list-item"]],inputs:{index:"index",playerRecord:"playerRecord",type:"type"},decls:10,vars:9,consts:[[1,"row","w-100",3,"ngClass"],[1,"col-1"],[1,"col-3"]],template:function(e,c){1&e&&(g.dc(0,"div",0),g.wc(1,"async"),g.dc(2,"div",1),g.Tc(3),g.cc(),g.dc(4,"div",2),g.Tc(5),g.cc(),g.dc(6,"div",2),g.Tc(7),g.cc(),g.dc(8,"div",1),g.Tc(9),g.cc(),g.cc()),2&e&&(g.Bc("ngClass",g.Ec(7,ue,c.playerRecord.key.clubNameEn===g.xc(1,5,c.curClub$).nameEn)),g.Lb(3),g.Vc(" ",c.index+1," "),g.Lb(2),g.Vc(" ",c.playerRecord.key[c.config.name]," "),g.Lb(2),g.Vc(" ",c.playerRecord.key[c.config.clubName]," "),g.Lb(2),g.Vc(" ",c.playerRecord.value[c.displayProp]," "))},directives:[a.m],pipes:[a.b],styles:[""],changeDetection:0}),e})();var me=t("f0Cb");function fe(e,c){1&e&&g.Yb(0,"mat-divider")}const pe=function(e){return{hidden:e}};function he(e,c){if(1&e&&(g.dc(0,"mat-list-item",2),g.Yb(1,"app-player-list-item",3),g.Rc(2,fe,1,0,"mat-divider",1),g.cc()),2&e){const e=c.$implicit,t=c.index,a=g.vc();g.Bc("ngClass",g.Ec(5,pe,t>=10)),g.Lb(1),g.Bc("playerRecord",e)("type",a.type)("index",t),g.Lb(1),g.Bc("ngIf",0===t)}}function ge(e,c){1&e&&(g.dc(0,"p"),g.hc(1,4),g.cc())}let ye=(()=>{class e{constructor(){}ngOnInit(){switch(this.type){case"goals":this.compareFunc=this.compareByGoals;break;case"assists":this.compareFunc=this.compareByAssists;break;case"g+a":this.compareFunc=this.compareByGP}}compareByGoals(e,c){return(c.value.goals||0)-(e.value.goals||0)}compareByAssists(e,c){return(c.value.assists||0)-(e.value.assists||0)}compareByGP(e,c){return(c.value["g+a"]||0)-(e.value["g+a"]||0)}}return e.\u0275fac=function(c){return new(c||e)},e.\u0275cmp=g.Rb({type:e,selectors:[["app-player-list"]],inputs:{playersStats:"playersStats",type:"type"},decls:4,vars:5,consts:function(){let e;return e=$localize`:␟0a30f5eaec3079ca6be6aad4406670e07fe4ba7a␟3412209302020705240:Нет записей`,[["class","list-item-length",3,"ngClass",4,"ngFor","ngForOf"],[4,"ngIf"],[1,"list-item-length",3,"ngClass"],[1,"w-100",3,"playerRecord","type","index"],e]},template:function(e,c){1&e&&(g.dc(0,"mat-list"),g.Rc(1,he,3,7,"mat-list-item",0),g.wc(2,"keyvalue"),g.cc(),g.Rc(3,ge,2,0,"p",1)),2&e&&(g.Lb(1),g.Bc("ngForOf",g.yc(2,2,c.playersStats,c.compareFunc)),g.Lb(2),g.Bc("ngIf",!(null!=c.playersStats&&c.playersStats.size)))},directives:[$.a,a.n,a.o,$.b,a.m,be,me.a],pipes:[a.i],styles:[".hidden[_ngcontent-%COMP%] {\n  display: none !important;\n}\n\n.list-item-length[_ngcontent-%COMP%] {\n  height: 2.5rem !important;\n}"],changeDetection:0}),e})();var we=t("DFWg");function ve(e,c){if(1&e&&(g.bc(0),g.Tc(1),g.ac()),2&e){const e=g.vc();g.Lb(1),g.Uc(e.match.home[e.config.name])}}function Te(e,c){1&e&&(g.bc(0),g.Tc(1,"---"),g.ac())}function Ce(e,c){if(1&e&&(g.dc(0,"div",11),g.Tc(1),g.wc(2,"async"),g.cc()),2&e){const e=g.vc();g.Bc("appMatchTooltip",e.match1ToMatch(e.match)),g.Lb(1),g.Uc(g.xc(2,2,e.matchStats$).result)}}function $e(e,c){1&e&&(g.dc(0,"div",12),g.hc(1,13),g.cc())}function xe(e,c){if(1&e&&(g.bc(0),g.Tc(1),g.ac()),2&e){const e=g.vc();g.Lb(1),g.Uc(e.match.away[e.config.name])}}function Re(e,c){1&e&&(g.bc(0),g.Tc(1,"---"),g.ac())}const Le=function(e){return{"height.rem":e}},Oe=function(e){return{"height.rem":e,border:"2px dashed black"}},Ie=function(e){return{"my-club":e}};let Ee=(()=>{class e{constructor(e,c){this.store=e,this.config=c,this.roundIndex=0,this.matchIndex=0,this.BASE_WIDTH_REM=6}ngOnInit(){this.curClub$=this.store.select(s.z),this.matchStats$=this.store.select(s.M,{matchId:this.match.id})}match1ToMatch(e){return Object.assign(Object.assign({},e),{homeNameEn:e.home.nameEn,awayNameEn:e.away.nameEn})}isMyClub$(e){return{home:this.curClub$.pipe(Object(b.a)(c=>{var t;return c.nameEn===(null===(t=e.home)||void 0===t?void 0:t.nameEn)})),away:this.curClub$.pipe(Object(b.a)(c=>{var t;return c.nameEn===(null===(t=e.away)||void 0===t?void 0:t.nameEn)}))}}getHeightInRem(){return this.BASE_WIDTH_REM*Math.pow(2,this.roundIndex)}getMatchHeader(){switch(this.numOfRounds-this.roundIndex){case 1:return $localize`Финал`;case 2:return $localize`Полуфинал Матч ${this.matchIndex+1}`;case 3:return $localize`1/4 финала Матч ${this.matchIndex+1}`;default:return $localize`Раунд ${this.roundIndex+1} Матч ${this.matchIndex+1}`}}}return e.\u0275fac=function(c){return new(c||e)(g.Xb(y.b),g.Xb(w.a))},e.\u0275cmp=g.Rb({type:e,selectors:[["app-cup-match-item"]],inputs:{match:"match",roundIndex:"roundIndex",numOfRounds:"numOfRounds",matchIndex:"matchIndex"},decls:20,vars:27,consts:function(){let e;return e=$localize`:␟2e091b83436366dd8d7164f4e2cfc08788cd6885␟6103660248765214268: против `,[[1,"flex","flex-auto","w-42","text-xs","left-border",3,"ngStyle"],[1,"col","flex","w-100"],[1,"row","self-center","w-100",3,"ngStyle"],[1,"col-12","text-center","underline","p-0"],[1,"flex","col-12","justify-self-center","text-center"],[1,"self-center","w-100",3,"ngClass"],[4,"ngIf"],[1,"flex","col-12","text-center","align-middle"],["class","self-center w-100",3,"appMatchTooltip",4,"ngIf"],["class","self-center w-100",4,"ngIf"],[1,"flex","col-12","text-center"],[1,"self-center","w-100",3,"appMatchTooltip"],[1,"self-center","w-100"],e]},template:function(e,c){if(1&e&&(g.dc(0,"div",0),g.dc(1,"div",1),g.dc(2,"div",2),g.dc(3,"div",3),g.Tc(4),g.cc(),g.dc(5,"div",4),g.dc(6,"div",5),g.wc(7,"async"),g.Rc(8,ve,2,1,"ng-container",6),g.Rc(9,Te,2,0,"ng-container",6),g.cc(),g.cc(),g.dc(10,"div",7),g.Rc(11,Ce,3,4,"div",8),g.wc(12,"async"),g.Rc(13,$e,2,0,"div",9),g.wc(14,"async"),g.cc(),g.dc(15,"div",10),g.dc(16,"div",5),g.wc(17,"async"),g.Rc(18,xe,2,1,"ng-container",6),g.Rc(19,Re,2,0,"ng-container",6),g.cc(),g.cc(),g.cc(),g.cc(),g.cc()),2&e){let e=null,t=null;g.Bc("ngStyle",g.Ec(19,Le,c.getHeightInRem())),g.Lb(2),g.Bc("ngStyle",g.Ec(21,Oe,c.BASE_WIDTH_REM)),g.Lb(2),g.Vc(" ",c.getMatchHeader()," "),g.Lb(2),g.Bc("ngClass",g.Ec(23,Ie,g.xc(7,11,c.isMyClub$(c.match).home))),g.Lb(2),g.Bc("ngIf",c.match.home),g.Lb(1),g.Bc("ngIf",!c.match.home),g.Lb(2),g.Bc("ngIf",null==(e=g.xc(12,13,c.matchStats$))?null:e.result),g.Lb(2),g.Bc("ngIf",!(null!=(t=g.xc(14,15,c.matchStats$))&&t.result)),g.Lb(3),g.Bc("ngClass",g.Ec(25,Ie,g.xc(17,17,c.isMyClub$(c.match).away))),g.Lb(2),g.Bc("ngIf",c.match.away),g.Lb(1),g.Bc("ngIf",!c.match.away)}},directives:[a.p,a.m,a.o,le.a],pipes:[a.b],styles:[".left-border[_ngcontent-%COMP%] {\n}\n\n[_nghost-%COMP%] {\n  \n}"],changeDetection:0}),e})();function Be(e,c){if(1&e&&g.Yb(0,"app-cup-match-item",9),2&e){const e=c.$implicit,t=c.index,a=g.vc().index,l=g.vc();g.Bc("match",e)("roundIndex",a)("numOfRounds",l.cupSchedule.length)("matchIndex",t)}}function ke(e,c){if(1&e&&(g.dc(0,"div",4),g.dc(1,"p",5),g.hc(2,6),g.cc(),g.dc(3,"div",7),g.Rc(4,Be,1,4,"app-cup-match-item",8),g.cc(),g.cc()),2&e){const e=c.$implicit,t=c.index,a=g.vc();g.Lb(2),g.lc(a.cupRoundToWeek(t+1)),g.ic(2),g.Lb(2),g.Bc("ngForOf",e)}}let Se=(()=>{class e{constructor(){}ngOnInit(){}cupRoundToWeek(e){return e*we.c+1}}return e.\u0275fac=function(c){return new(c||e)},e.\u0275cmp=g.Rb({type:e,selectors:[["app-cup-table"]],inputs:{cupSchedule:"cupSchedule"},decls:4,vars:1,consts:function(){let e;return e=$localize`:␟9b9c648d9b217f727e6c4dde27f647b8011ee87c␟3939263104481309874:Неделя ${"\ufffd0\ufffd"}:INTERPOLATION:`,[[1,"row","mr-0"],[1,"col"],[1,"flex","flex-row"],["class","flex-auto",4,"ngFor","ngForOf"],[1,"flex-auto"],[1,"w-100","text-center"],e,[1,"flex","flex-col"],[3,"match","roundIndex","numOfRounds","matchIndex",4,"ngFor","ngForOf"],[3,"match","roundIndex","numOfRounds","matchIndex"]]},template:function(e,c){1&e&&(g.dc(0,"div",0),g.dc(1,"div",1),g.dc(2,"div",2),g.Rc(3,ke,5,2,"div",3),g.cc(),g.cc(),g.cc()),2&e&&(g.Lb(3),g.Bc("ngForOf",c.cupSchedule))},directives:[a.n,Ee],styles:[".main-container[_ngcontent-%COMP%] {\n  height: 52vh;\n}"],changeDetection:0}),e})(),Me=(()=>{let e=class{constructor(e,c){this.store=e,this.config=c,this.selectedWeek={num:0,schedule:null},this.leagueOrCupTab=0}ngOnInit(){this.selectedLeagueName=new h.c(void 0),this.curClub$=this.store.select(s.z).pipe(Object(i.a)(e=>{var c;(null===(c=this.selectedLeagueName)||void 0===c?void 0:c.value)||this.selectedLeagueName.setValue(e.leagueNameEn)})),this.curClub$.pipe(Object(o.a)(1)).subscribe(),this.allLeagues$=this.store.select(s.j),this._curWeekSub=Object(m.a)([this.store.select(s.E),this.store.select(s.i)]).pipe(Object(o.a)(1)).subscribe(([e,c])=>{this.selectedWeek.num=Object(p.c)(e-1,c)});const e=this.selectedLeagueName.valueChanges.pipe(Object(d.a)(),Object(r.a)(this.selectedLeagueName.value));this.schedule$=e.pipe(Object(u.a)(e=>this.store.select(s.H,{leaguesNameEn:e}).pipe(Object(i.a)(e=>{this.schedule=e,this.selectedWeek.schedule=e[this.selectedWeek.num],console.log("League Schedule",e)})))),this.cupSchedule$=e.pipe(Object(u.a)(e=>this.store.select(s.y,{leaguesNameEn:e}))),this.table$=e.pipe(Object(u.a)(e=>(console.log("Table$ selectedLeagueNameEn",e),this.store.select(s.J,{leaguesNameEn:e})))),this.leaguePlayersStats$=e.pipe(Object(u.a)(e=>this.store.select(s.m,{leagueName:e}).pipe(Object(b.a)(e=>e))))}ngOnDestroy(){}setWeekTo(e){this.selectedWeek={num:e,schedule:this.schedule[e]}}leagueTourToWeek(e){let c;return this.store.select(s.i).pipe(Object(o.a)(1)).subscribe(e=>c=e),Object(p.f)(e,c)}};return e.\u0275fac=function(c){return new(c||e)(g.Xb(y.b),g.Xb(w.a))},e.\u0275cmp=g.Rb({type:e,selectors:[["app-tables-main-page"]],decls:25,vars:34,consts:function(){let e,c,t,a,l,n,s,i;return e=$localize`:tab label␟7f72f4406f2a8a2b85a92d367281ea379e695eb2␟5410712001254857371:Лига`,c=$localize`:␟7843dbeda4b8fe3b0518a105fca4904bd9f4c104␟4039890346541368034:Выбранная лига`,t=$localize`:tab label␟eaad0ba951de5d4ef3fae81728bbbff073345d96␟3745591848636020769:Таблица`,a=$localize`:tab label␟919389a90c66090275b6dce8b0c8025970ee9b58␟2816664627423286433:Расписание`,l=$localize`:tab label␟e8d1288ae017d3d5b406259ea8ec2087bf2ada63␟7986774214808291378:Голеадоры`,n=$localize`:tab label␟dd08ff53c5c3c1dc4b1f709dafa27ed00ab7aaca␟8349369691301488306:Ассистенты`,s=$localize`:tab label␟59e207c5a632198089524f021010e10495bf4262␟2022851040029931405:Г+П`,i=$localize`:tab label␟6b9c6c25ad0c34378b42338aa31083673ba4c224␟4200425096870885831:Кубок`,[[1,"tables-schedule-body"],["mat-align-tabs","start",3,"selectedIndex","selectedIndexChange"],["label",e,1,"h-100"],["bindValue","nameEn","placeholder",c,1,"w-25",3,"items","formControl","bindLabel","virtualScroll","selectOnTab","clearable"],["mat-align-tabs","center"],["label",t],[3,"table"],["label",a],[3,"schedule","selectedWeek","weekSelected"],[3,"tour","week","schedule"],["label",l],[3,"playersStats","type"],["label",n],["label",s],["label",i,1,"overflow-auto","h-100","w-100"],[1,"overflow-auto","h-100","w-100",3,"cupSchedule"]]},template:function(e,c){1&e&&(g.dc(0,"div",0),g.dc(1,"mat-tab-group",1),g.rc("selectedIndexChange",function(e){return c.leagueOrCupTab=e}),g.dc(2,"mat-tab",2),g.Yb(3,"ng-select",3),g.wc(4,"async"),g.dc(5,"mat-tab-group",4),g.dc(6,"mat-tab",5),g.Yb(7,"app-league-table",6),g.wc(8,"async"),g.cc(),g.dc(9,"mat-tab",7),g.dc(10,"app-schedule-tours-list",8),g.rc("weekSelected",function(e){return c.setWeekTo(e)}),g.wc(11,"async"),g.cc(),g.Yb(12,"app-schedule-tour-matches-list",9),g.cc(),g.dc(13,"mat-tab",10),g.Yb(14,"app-player-list",11),g.wc(15,"async"),g.cc(),g.dc(16,"mat-tab",12),g.Yb(17,"app-player-list",11),g.wc(18,"async"),g.cc(),g.dc(19,"mat-tab",13),g.Yb(20,"app-player-list",11),g.wc(21,"async"),g.cc(),g.cc(),g.cc(),g.dc(22,"mat-tab",14),g.Yb(23,"app-cup-table",15),g.wc(24,"async"),g.cc(),g.cc(),g.cc()),2&e&&(g.Lb(1),g.Bc("selectedIndex",c.leagueOrCupTab),g.Lb(2),g.Cc("bindLabel",c.config.name),g.Bc("items",g.xc(4,20,c.allLeagues$))("formControl",c.selectedLeagueName)("virtualScroll",!0)("selectOnTab",!0)("clearable",!1),g.Lb(4),g.Bc("table",g.xc(8,22,c.table$)),g.Lb(3),g.Bc("schedule",g.xc(11,24,c.schedule$))("selectedWeek",c.selectedWeek.num),g.Lb(2),g.Bc("tour",c.selectedWeek.num+1)("week",c.leagueTourToWeek(c.selectedWeek.num)+1)("schedule",c.selectedWeek.schedule),g.Lb(2),g.Bc("playersStats",g.xc(15,26,c.leaguePlayersStats$))("type","goals"),g.Lb(3),g.Bc("playersStats",g.xc(18,28,c.leaguePlayersStats$))("type","assists"),g.Lb(3),g.Bc("playersStats",g.xc(21,30,c.leaguePlayersStats$))("type","g+a"),g.Lb(3),g.Bc("cupSchedule",g.xc(24,32,c.cupSchedule$)))},directives:[v.c,v.a,T.a,h.j,h.d,ee,ae,re,ye,Se],pipes:[a.b],styles:[".tables-schedule-body[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\n  .mat-tab-body-content {\n  \n}\n\n  .mat-cell {\n  flex: auto;   \n}\n\n  .mat-header-cell {\n  flex: auto;   \n}\n\n.selected[_ngcontent-%COMP%] {\n  border-bottom: black solid thin;\n}\n\n.hidden[_ngcontent-%COMP%] {\n  display: none !important;\n}"]}),e=Object(n.c)([Object(f.a)()],e),e})();var ze=t("PCNd"),Pe=t("kmnG"),De=t("d3UM");t("R0Ic"),t("XNiG");let Ne=(()=>{class e{}return e.\u0275fac=function(c){return new(c||e)},e.\u0275mod=g.Vb({type:e}),e.\u0275inj=g.Ub({imports:[[a.c]]}),e})(),je=(()=>{class e{}return e.\u0275fac=function(c){return new(c||e)},e.\u0275mod=g.Vb({type:e}),e.\u0275inj=g.Ub({imports:[[a.c],Ne]}),e})();const Ve=[{path:"",component:Me}];let We=(()=>{class e{}return e.\u0275fac=function(c){return new(c||e)},e.\u0275mod=g.Vb({type:e}),e.\u0275inj=g.Ub({imports:[[a.c,l.e.forChild(Ve),ze.a,me.b,v.e,E.l,$.c,Pe.d,De.b,h.n,T.b,je,B.b]]}),e})()}}]);