!function(){var e,t;function n(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function r(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||a(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,c=!1,a=void 0;try{for(var o,s=e[Symbol.iterator]();!(r=(o=s.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(i){c=!0,a=i}finally{try{r||null==s.return||s.return()}finally{if(c)throw a}}return n}(e,t)||a(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{Y8Ci:function(a,o,i){"use strict";i.r(o),i.d(o,"ResultsModule",function(){return ee});var l,h,f,d=i("ofXK"),O=i("woNW"),b=i("itXk"),E=i("LRne"),p=i("SqtC"),S=i("npY+"),g=i("IzEk"),v=i("eIep"),I=i("JgKa"),_=i("fXoL"),m=i("kt0X"),y=i("tyNb"),A=i("lJxs"),C=i("JIr8"),N=i("zp1y"),R=i("2Vo4"),k=i("GZ7p"),T=i("kHgy"),w=((l=function(){function e(){s(this,e),this.GAIN_STEP=.1,this.POWER_STEP=.5,this.GAIN_SCALE={4:{hg:.6,ag:1.8},3:{hg:.7,ag:1.6},2:{hg:.8,ag:1.4},1:{hg:.9,ag:1.2},0:{hg:1,ag:1},"-1":{hg:1.2,ag:.9},"-2":{hg:1.4,ag:.8},"-3":{hg:1.6,ag:.7},"-4":{hg:1.8,ag:.6}},this.OK_RESULTS_STEPS={4:6,3:4,2:2,1:1,0:0,"-1":-1,"-2":-2,"-3":-4,"-4":-6},this.INDIVIDUAL_GAINS={CLEAN_SHEET:.1,GOAL:.1,ASSIST:.1,MULTIPLE_GA_MULTI:1.5},this.INDIVID_GAINS_RESULT_COEF={4:{hc:.6,ac:1.4},3:{hc:.7,ac:1.3},2:{hc:.8,ac:1.2},1:{hc:.9,ac:1.1},0:{hc:1,ac:1},"-1":{hc:1.1,ac:.9},"-2":{hc:1.2,ac:.8},"-3":{hc:1.3,ac:.7},"-4":{hc:1.4,ac:.6}},this.INDIVIDUAL_LOSSES={THREE_CONCEDED:.25,FOUR_CONCEDED:.4,FIVE_CONCEDED:.6,BIG_LOSS:.05,NO_GOALS_SCORED:.25},this.INDIVID_LOSSES_RESULT_COEF={4:{hc:.2,ac:1.8},3:{hc:.4,ac:1.6},2:{hc:.6,ac:1.4},1:{hc:.8,ac:1.2},0:{hc:1,ac:1},"-1":{hc:1.2,ac:.8},"-2":{hc:1.4,ac:.6},"-3":{hc:1.6,ac:.4},"-4":{hc:1.8,ac:.2}}}return u(e,[{key:"generateGainsAndLosses",value:function(e,t,n,a,o,s){var i=Object(T.a)(e),u=Object(T.a)(t),l=e.filter(function(e,t){return t<11}),h=t.filter(function(e,t){return t<11}),f=(i.gk+i.d+i.m+i.f-(u.gk+u.d+u.m+u.f))/11,d=c(Object(T.h)(n),2),O=d[0],b=d[1],E=this.limitTo(O-b),p=this.OK_RESULTS_STEPS[E],S=Math.floor(f/this.POWER_STEP),g=this.limitTo(S-p);console.warn("".concat(a.homeNameEn," - ").concat(a.awayNameEn," POWER DIFF = ").concat(f),g);var v=this.GAIN_SCALE[g],I=this.INDIVID_GAINS_RESULT_COEF[g],_=[],m=[];return _.push.apply(_,r(this.assignRegularGains(l,v.hg))),m.push.apply(m,r(this.assignRegularLosses(l,v.hg))),_.push.apply(_,r(this.assignIndividualGains(l,o,b,I.hc))),m.push.apply(m,r(this.assignIndividualLosses(l,o,O,b,I.hc))),_.push.apply(_,r(this.assignRegularGains(h,v.ag))),m.push.apply(m,r(this.assignRegularLosses(h,v.ag))),_.push.apply(_,r(this.assignIndividualGains(h,s,O,I.ac))),m.push.apply(m,r(this.assignIndividualLosses(h,s,b,O,I.ac))),{gains:_,losses:m}}},{key:"assignRegularGains",value:function(e,t){for(var n=[],r=t-Math.floor(t),c=Math.floor(t)+(this.isRollSuccess(r)?1:0),a=0;a<c;a++){var o=Object(k.e)(0,e.length-1);n.push(o)}return n.map(function(t){return e[t]})}},{key:"assignIndividualGains",value:function(e,t,n,r){var c=this,a=[],o=(null==t?void 0:t.goals)?Object.values(t.goals):[],s=(null==t?void 0:t.assists)?Object.values(t.assists):[],i=e.filter(function(e){return"GK"===e.position||"D"===e.position});return this.scorersToMap(o).forEach(function(e,t){for(var n=c.INDIVIDUAL_GAINS.GOAL*e*r,s=2;s<=e;s++)n*=c.INDIVIDUAL_GAINS.MULTIPLE_GA_MULTI;for(var i=1;i<=Math.floor(n);i++)a.push(o.find(function(e){return e.nameEn===t}));var u=n-Math.floor(n);c.isRollSuccess(u)&&a.push(o.find(function(e){return e.nameEn===t}))}),this.scorersToMap(s).forEach(function(e,t){for(var n=c.INDIVIDUAL_GAINS.ASSIST*e*r,o=2;o<=e;o++)n*=c.INDIVIDUAL_GAINS.MULTIPLE_GA_MULTI;for(var i=1;i<=Math.floor(n);i++)a.push(s.find(function(e){return(null==e?void 0:e.nameEn)===t}));var u=n-Math.floor(n);c.isRollSuccess(u)&&a.push(s.find(function(e){return(null==e?void 0:e.nameEn)===t}))}),0===n&&i.forEach(function(e){for(var t=c.INDIVIDUAL_GAINS.CLEAN_SHEET*r,n=1;n<=Math.floor(t);n++)a.push(e);var o=t-Math.floor(t);c.isRollSuccess(o)&&a.push(e)}),a}},{key:"assignRegularLosses",value:function(e,t){return[]}},{key:"assignIndividualLosses",value:function(e,t,n,r,c){var a=this,o=[];return 3!==r&&4!==r&&5!==r||e.filter(function(e){return"GK"===e.position||"D"===e.position}).forEach(function(e){var t;switch(r){case 3:t=a.INDIVIDUAL_LOSSES.THREE_CONCEDED;break;case 4:t=a.INDIVIDUAL_LOSSES.FOUR_CONCEDED;break;case 5:t=a.INDIVIDUAL_LOSSES.FIVE_CONCEDED}for(var n=t*c,s=1;s<=Math.floor(n);s++)o.push(e);var i=n-Math.floor(n);a.isRollSuccess(i)&&o.push(e)}),n-r<=-3&&e.forEach(function(e){for(var t=a.INDIVIDUAL_LOSSES.BIG_LOSS*c,n=1;n<=Math.floor(t);n++)o.push(e);var r=t-Math.floor(t);a.isRollSuccess(r)&&o.push(e)}),0===n&&e.filter(function(e){return"M"===e.position||"F"===e.position}).forEach(function(e){for(var t=a.INDIVIDUAL_LOSSES.NO_GOALS_SCORED*c,n=1;n<=Math.floor(t);n++)o.push(e);var r=t-Math.floor(t);a.isRollSuccess(r)&&o.push(e)}),o}},{key:"scorersToMap",value:function(e){var t=new Map;return e.forEach(function(e){e&&(t.get(e.nameEn)?t.set(e.nameEn,t.get(e.nameEn)+1):t.set(e.nameEn,1))}),t}},{key:"isRollSuccess",value:function(e){return!(e>1||e<0)&&Object(k.e)(1,100)<=100*e}},{key:"limitTo",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4;return e>t?e=t:e<0-t&&(e=0-t),e}}]),e}()).\u0275fac=function(e){return new(e||l)},l.\u0275prov=_.Tb({token:l,factory:l.\u0275fac,providedIn:"root"}),l),j=i("LvDl"),L=((h=function(){function e(t){s(this,e),this.store=t,this.LEAGUE_POS_DIF_COEF={10:.6,9:.7,8:.8,7:.9,6:.9,5:.9,4:1,3:1,2:1,1:1,"-1":1.1,"-2":1.2,"-3":1.3,"-4":1.4,"-5":1.5,"-6":1.6,"-7":1.7,"-8":1.8,"-9":1.9,"-10":2},this.HOME_LEAGUE_POS_COEF={1:2,2:2,3:2,4:1.9,5:1.8,6:1.7,7:1.6,8:1.5,9:1.4,10:1.3,11:1.2,12:1.1,13:1,14:.9,15:.8,16:.7,17:.6,18:.5},this.POWER_DIF_COEF={44:.5,38:.6,33:.7,27:.8,22:.9,16:1,11:1.1,6:1.2,"-6":1.3,"-11":1.4,"-16":1.5,"-22":1.6,"-27":1.7,"-33":1.8,"-38":1.9,"-44":2},this.SEASON_START_POWER_POSITIONS_DIF_COEF={30:.5,20:.6,15:.7,10:.8,7:.9,4:1,"-4":1.1,"-7":1.2,"-10":1.4,"-15":1.6,"-20":1.8,"-30":2}}return u(e,[{key:"generateAttendance",value:function(e,t,n,r){var a,o,s=this;this.store.select(O.r,{clubsNameEn:r.homeNameEn}).pipe(Object(g.a)(1)).subscribe(function(e){a=e}),this.store.select(O.r,{clubsNameEn:r.awayNameEn}).pipe(Object(g.a)(1)).subscribe(function(e){o=e});var i=a.stadium,u=Object(j.round)(a.stadium/2,0);return this.store.select(O.J,{leaguesNameEn:a.leagueNameEn}).pipe(Object(N.a)(this.store.select(O.s,{leaguesNameEn:a.leagueNameEn})),Object(g.a)(1)).subscribe(function(n){var l=c(n,2),h=l[0],f=l[1],d=h.findIndex(function(e){return a.nameEn===e.club.nameEn}),O=h.findIndex(function(e){return o.nameEn===e.club.nameEn}),b=f.find(function(e){return e.club.nameEn===r.homeNameEn}),E=f.find(function(e){return e.club.nameEn===r.awayNameEn}),p=f.findIndex(function(e){return e.club.nameEn===r.homeNameEn}),S=f.findIndex(function(e){return e.club.nameEn===r.awayNameEn}),g=Object(k.c)(d-O,10);console.log("posDif: real - rounded",d-O,g);var v=s.LEAGUE_POS_DIF_COEF[g],I=s.HOME_LEAGUE_POS_COEF[Object(k.c)(d||1,18)],_=s.HOME_LEAGUE_POS_COEF[Object(k.c)(O||1,18)];console.log("Curernt match Powers",e,t);var m=e-t,y=s.POWER_DIF_COEF[Object(k.b)(m,Object.keys(s.POWER_DIF_COEF))];console.log("Start season PowerObjs",b,E),console.log("Start season Power positions",p,S);var A=p-S,C=s.SEASON_START_POWER_POSITIONS_DIF_COEF[Object(k.b)(A,Object.keys(s.SEASON_START_POWER_POSITIONS_DIF_COEF))];console.log("Coefs: ".concat(u," * ").concat(v," * ").concat(I," * ").concat(_,"\n         * ").concat(y," * ").concat(C)),(i=u*v*I*_*y*C)>a.stadium&&(i=a.stadium),console.warn("".concat(r.homeNameEn," - ").concat(r.awayNameEn," Attendance"),i)}),Object(j.round)(i,0)}}]),e}()).\u0275fac=function(e){return new(e||h)(_.oc(m.b))},h.\u0275prov=_.Tb({token:h,factory:h.\u0275fac,providedIn:"root"}),h),D=i("w0zp"),M=((f=function(){function e(t,n,r,c){s(this,e),this.store=t,this.gainsService=n,this.attendanceService=r,this.financeService=c,this.lul$=new R.a([]),this.inProgress=!1,this.BASE_NUMBER_OF_SHOTS=10,this.BASE_SHOTS_CONVERSION_PCT=10,this.SHOTS_MULTI_POWER=2,this.GOAL_CHANCE_MODIFIER={GK:0,D:1,M:2,F:4},this.ASSIST_CHANCE_MODIFIER={GK:1,D:10,M:50,F:30},this.NO_ASSIST_CHANCE_PCT=20}return u(e,[{key:"generateWeekResults",value:function(){var e=this;return this.store.select(O.F).pipe(Object(g.a)(1),Object(A.a)(function(t){if(console.warn("Current Week Schedule",t),!e.inProgress){var n=[];t.forEach(function(e){n.push.apply(n,r(e.matches))}),e.generateResultsForWholeWeek(n)}return e.inProgress=!1,t}),Object(C.a)(function(e){return console.error("Caught this shit",e),Object(E.a)([])}))}},{key:"generateResultsForWholeWeek",value:function(e){var t=this;console.log("Generating res for whole week ",e),this.inProgress=!0;var n=[];e.forEach(function(e){n.push(t.generateResult(e))})}},{key:"generateResult",value:function(e){var t,n=this,r=e.homeNameEn,a=e.awayNameEn;return Object(I.b)(this._selectSub),this._selectSub=this.store.select(O.P,{clubsNameEn:r}).pipe(Object(N.a)(this.store.select(O.P,{clubsNameEn:a})),Object(g.a)(1)).subscribe(function(r){var a=c(r,2),o=a[0],s=a[1],i=Object(T.a)(o,!0),u=Object(T.a)(s);t=n.calculateResult(i,u,e),n.generateMatchStats(o,s,t,e),n.generateAttendancesAndIncome(o,s,t,e)}),t}},{key:"calculateResult",value:function(e,t,n){for(var r=t.f+t.m,c=e.gk+e.d,a=Math.pow((e.f+e.m)/(t.gk+t.d),this.SHOTS_MULTI_POWER),o=Math.pow(r/c,this.SHOTS_MULTI_POWER),s=this.BASE_NUMBER_OF_SHOTS*a,i=this.BASE_NUMBER_OF_SHOTS*o,u=0,l=0,h=1,f=1;h<=s||f<=i;){if(h<=s){var d=u-l,O=d>0?Math.pow(d,1.6):1;Object(k.e)(O,100)<=this.BASE_SHOTS_CONVERSION_PCT&&u++,h++}if(f<=i){var b=l-u,E=b>0?Math.pow(b,1.6):1;Object(k.e)(E,100)<=this.BASE_SHOTS_CONVERSION_PCT&&l++,f++}}var p="",S="";if(n.isCupMatch&&u===l){var g=Object(k.e)(0,1);switch(Object(k.e)(0,1)){case 0:0===g?u++:l++,0===g?p="e":S="e";break;case 1:0===g?p="p":S="p"}}return"".concat(u).concat(p," - ").concat(l).concat(S)}},{key:"generateMatchStats",value:function(e,t,n,r){var a=c(Object(T.h)(n),2),o=a[0],s=a[1],i=n.includes("e")?"e":"",u=this.generateGoalScorers(o,e,o>s?i:""),l=this.generateGoalScorers(s,t,o<s?i:"");this.store.dispatch(Object(S.d)({matchId:r.id,goals:{homeRoster:e.filter(function(e,t){return t<11}),awayRoster:t.filter(function(e,t){return t<11}),homeGoals:u.goals,homeAssists:u.assists,awayGoals:l.goals,awayAssists:l.assists},result:n}));var h=this.gainsService.generateGainsAndLosses(e,t,n,r,u,l),f=h.gains,d=h.losses;this.store.dispatch(Object(S.c)({matchId:r.id,gains:f,losses:d}))}},{key:"generateGoalScorers",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";if(e){for(var r=this.getGoalChanceWeights(t),c=r.reduce(function(e,t){return e+t},0),a={},o={},s=1;s<=e;s++){var i=Object(k.e)(1,90);s===e&&"e"===n&&(i=Object(k.e)(90,120));for(var u=Object(k.e)(1,c),l=void 0,h=0,f=0;f<r.length;f++)if((h+=r[f])>u){a[i]=t[f],l=f;break}var d=this.getAssistChanceWeights(t,l),O=d.reduce(function(e,t){return e+t},0),b=Object(k.e)(1,O),E=0;if(Object(k.e)(1,100)>this.NO_ASSIST_CHANCE_PCT){for(var p=0;p<d.length;p++)if((E+=d[p])>b){o[i]=t[p];break}}else o[i]=null}return{goals:a,assists:o}}return{goals:{},assists:null}}},{key:"generateAttendancesAndIncome",value:function(e,t,n,r){var c=this,a=e.filter(function(e,t){return t<11}).reduce(function(e,t){return e+t.power},0),o=t.filter(function(e,t){return t<11}).reduce(function(e,t){return e+t.power},0),s=this.attendanceService.generateAttendance(a,o,n,r);this.store.dispatch(Object(S.a)({matchId:r.id,attendance:s})),this.store.select(O.r,{clubsNameEn:r.homeNameEn}).pipe(Object(g.a)(1)).subscribe(function(e){var t=c.financeService.generateMatchIncome(s,e);c.store.dispatch(Object(S.b)({clubNameEn:r.homeNameEn,description:"match day income",income:t,expense:null}))})}},{key:"getGoalChanceWeights",value:function(e){var t=this,n=Object(T.d)(e),c={gk:n.gk.map(function(e){return e.power*t.GOAL_CHANCE_MODIFIER.GK*10}),d:n.d.map(function(e){return e.power*t.GOAL_CHANCE_MODIFIER.D*10}),m:n.m.map(function(e){return e.power*t.GOAL_CHANCE_MODIFIER.M*10}),f:n.f.map(function(e){return e.power*t.GOAL_CHANCE_MODIFIER.F*10})};return[].concat(r(c.gk),r(c.d),r(c.m),r(c.f))}},{key:"getAssistChanceWeights",value:function(e,t){var n=this,c=Object(T.d)(e);return[].concat(r(c.gk.map(function(e){return e.power*n.ASSIST_CHANCE_MODIFIER.GK*10})),r(c.d.map(function(e){return e.power*n.ASSIST_CHANCE_MODIFIER.D*10})),r(c.m.map(function(e){return e.power*n.ASSIST_CHANCE_MODIFIER.M*10})),r(c.f.map(function(e){return e.power*n.ASSIST_CHANCE_MODIFIER.F*10}))).map(function(e,n){return n===t?0:e})}}]),e}()).\u0275fac=function(e){return new(e||f)(_.oc(m.b),_.oc(w),_.oc(L),_.oc(D.a))},f.\u0275prov=_.Tb({token:f,factory:f.\u0275fac,providedIn:"root"}),f),G=i("5Q5W"),P=i("qLOZ"),F=i("f9qZ"),U=i("n90K"),W=i("Wp6s"),H=i("r4Kj"),V=i("bTqV"),x=i("+hVe"),X=["scrollAnchor"];function B(e,t){if(1&e&&(_.dc(0,"div",18),_.dc(1,"div",19),_.Yb(2,"app-match-result",20),_.cc(),_.cc()),2&e){var n=t.$implicit;_.Lb(2),_.Bc("match",n)("showGains",!0)}}var K,J,z,$=((J=function(){function e(t,n){s(this,e),this.store=t,this.config=n,this.continue=new _.r}return u(e,[{key:"ngOnInit",value:function(){}},{key:"onContinueClick",value:function(){this.continue.emit(),this.scrollToTop()}},{key:"scrollToTop",value:function(){this.scrollAnchor.nativeElement.scrollIntoView({block:"nearest",behavior:"smooth"})}}]),e}()).\u0275fac=function(e){return new(e||J)(_.Xb(m.b),_.Xb(H.a))},J.\u0275cmp=_.Rb({type:J,selectors:[["app-results-card"]],viewQuery:function(e,t){var n;1&e&&_.Xc(X,1),2&e&&_.Ic(n=_.sc())&&(t.scrollAnchor=n.first)},inputs:{currentWeek:"currentWeek",leagueResults:"leagueResults"},outputs:{continue:"continue"},decls:20,vars:3,consts:function(){return[[1,"scroll-anchor",2,"height","1px"],["scrollAnchor",""],[1,"row","h-100","min-vh-88","main"],[1,"col","h-100"],[1,"row","justify-content-center","h-5","sticky-header","background-black"],[1,"col-2"],[1,"row"],[1,"col"],[1,"main-header","text-center"],$localize(e||(e=n([":\u241f43d103d6ee8b035f34f095a152ba66f10b700686\u241f5243003717987492103:\u041d\u0435\u0434\u0435\u043b\u044f ",":INTERPOLATION:"])),"\ufffd0\ufffd"),[1,"row","league-name","mb-3"],[1,"col","text-center"],[1,"row","justify-content-center","white","results-list"],["class","row justify-content-center mt-3",4,"ngFor","ngForOf"],[1,"row","justify-content-center","align-items-end","py-3","continue-button","background-black"],[1,"col-3"],["mat-raised-button","","color","primary",1,"w-100",3,"click"],$localize(t||(t=n([":\u241fc3c7f8da6acb9cf99cb6736da48bc3b1b78799ea\u241f1105967608388463937:\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c"]))),[1,"row","justify-content-center","mt-3"],[1,"col-8"],[3,"match","showGains"]]},template:function(e,t){1&e&&(_.Yb(0,"div",0,1),_.dc(2,"div",2),_.dc(3,"div",3),_.dc(4,"div",4),_.dc(5,"div",5),_.dc(6,"div",6),_.dc(7,"div",7),_.dc(8,"h3",8),_.hc(9,9),_.cc(),_.cc(),_.cc(),_.dc(10,"div",10),_.dc(11,"div",11),_.Tc(12),_.cc(),_.cc(),_.cc(),_.cc(),_.dc(13,"div",12),_.dc(14,"div",7),_.Rc(15,B,3,2,"div",13),_.cc(),_.cc(),_.dc(16,"div",14),_.dc(17,"div",15),_.dc(18,"button",16),_.rc("click",function(){return t.onContinueClick()}),_.hc(19,17),_.cc(),_.cc(),_.cc(),_.cc(),_.cc()),2&e&&(_.Lb(9),_.lc(t.currentWeek),_.ic(9),_.Lb(3),_.Vc(" ",t.leagueResults.tournament[t.config.name]," "),_.Lb(3),_.Bc("ngForOf",t.leagueResults.matches))},directives:[d.n,V.a,x.a],styles:[".white[_ngcontent-%COMP%]{color:#fff}.main-header[_ngcontent-%COMP%]{color:#87cefa}.league-name[_ngcontent-%COMP%]{color:#e9967a;font-size:larger}.results-list[_ngcontent-%COMP%]{min-height:80vh;height:80%}.continue-button[_ngcontent-%COMP%]{position:sticky;bottom:0}.sticky-header[_ngcontent-%COMP%]{position:sticky;top:0}.background-black[_ngcontent-%COMP%]{background-color:#040603;z-index:10000000}"],changeDetection:0}),J),q=((K=function(){function e(t,n,r,c,a,o,i,u){s(this,e),this.store=t,this.router=n,this.resultGen=r,this.transferService=c,this.jobService=a,this.route=o,this.seasonService=i,this.storage=u,this.ROUTES=p.a,this.displayedResultsIndex=0}return u(e,[{key:"ngOnInit",value:function(){var e=this;this.currentWeek$=this.store.select(O.E).pipe(Object(g.a)(1)),this._resultGenSub=Object(b.a)([this.resultGen.generateWeekResults(),this.route.queryParams]).pipe(Object(v.a)(function(t){var n=c(t,2),r=n[0],a=n[1];return e.curWeekResults=r,a.goThrough&&e.advanceThroughWeek(!0),Object(E.a)(null)})).subscribe()}},{key:"proceed",value:function(){this.curWeekResults[this.displayedResultsIndex+1]?this.displayedResultsIndex++:this.advanceThroughWeek()}},{key:"advanceThroughWeek",value:function(){var e,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];Object(I.b)(this._resultGenSub),this.store.dispatch(Object(S.G)()),this.store.dispatch(Object(S.h)()),this.storage.saveStore().subscribe(),this.store.select(O.p).pipe(Object(g.a)(1)).subscribe(function(t){return e=t}),e?(this.jobService.oneMoreWeekOnCurrentJob(),this.router.navigate([this.ROUTES.SEASON_END]).catch(function(e){console.error(e)})):(this.transferService.generateTransferList(),this.transferService.makeRandomTransfers(),!t&&this.jobService.gotNewJobOffer()?this.router.navigate([this.ROUTES.NEW_JOB]).catch(function(e){console.error(e)}):(this.jobService.oneMoreWeekOnCurrentJob(),this.router.navigate([this.ROUTES.OFFICE]).catch(function(e){console.error(e)})))}}]),e}()).\u0275fac=function(e){return new(e||K)(_.Xb(m.b),_.Xb(y.d),_.Xb(M),_.Xb(G.a),_.Xb(P.a),_.Xb(y.a),_.Xb(F.a),_.Xb(U.a))},K.\u0275cmp=_.Rb({type:K,selectors:[["app-results-main-page"]],decls:5,vars:4,consts:[[1,"row","results-main-container"],[1,"col"],[1,"result-card--main"],[3,"leagueResults","currentWeek","continue"]],template:function(e,t){1&e&&(_.dc(0,"div",0),_.dc(1,"div",1),_.dc(2,"mat-card",2),_.dc(3,"app-results-card",3),_.rc("continue",function(){return t.proceed()}),_.wc(4,"async"),_.cc(),_.cc(),_.cc(),_.cc()),2&e&&(_.Lb(3),_.Bc("leagueResults",t.curWeekResults[t.displayedResultsIndex])("currentWeek",_.xc(4,2,t.currentWeek$)))},directives:[W.a,$],pipes:[d.b],styles:[".results-main-container[_ngcontent-%COMP%]{height:100%}.result-card--main[_ngcontent-%COMP%]{margin:40px}.mat-card[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.95)!important}.main-header[_ngcontent-%COMP%]{color:#87cefa}.white[_ngcontent-%COMP%]{color:#fff}"]}),K),Y=i("Xa2L"),Z=i("PCNd"),Q=[{path:"",component:q}],ee=((z=function e(){s(this,e)}).\u0275fac=function(e){return new(e||z)},z.\u0275mod=_.Vb({type:z}),z.\u0275inj=_.Ub({imports:[[d.c,y.e.forChild(Q),W.b,Y.a,V.b,Z.a]]}),z)}}])}();