!function(){var e,t,c,n,a,r,i;function o(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var c=0;c<t.length;c++){var n=t[c];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{iydT:function(l,u,m){"use strict";m.r(u),m.d(u,"HomeModule",function(){return R});var f=m("ofXK"),b=m("tyNb"),v=m("3Pt+"),h=m("SqtC"),p=m("npY+"),g=m("fXoL"),G=m("qfBg"),N=m("Z2Br"),k=m("n90K"),w=m("kt0X"),y=m("ThKZ"),O=m("r4Kj"),L=m("Wp6s"),I=m("kmnG"),T=m("qFsG"),j=m("bTqV"),E=m("NFeN");function S(e,t){if(1&e){var c=g.ec();g.dc(0,"div",0),g.dc(1,"div",19),g.dc(2,"h5",20),g.hc(3,21),g.cc(),g.dc(4,"div",22),g.dc(5,"div",23),g.dc(6,"button",24),g.rc("click",function(){return g.Lc(c),g.vc().loadSavedGame()}),g.hc(7,25),g.cc(),g.cc(),g.dc(8,"div",26),g.rc("click",function(){return g.Lc(c),g.vc().deleteSavedGame()}),g.dc(9,"button",27),g.dc(10,"mat-icon"),g.Tc(11,"delete"),g.cc(),g.cc(),g.cc(),g.cc(),g.cc(),g.cc()}if(2&e){var n=g.vc();g.Lb(7),g.lc(n.savedGameData.userName)(n.savedGameData.club[n.config.name])(n.savedGameData.season+1)(n.savedGameData.week+1),g.ic(7)}}var x,z,X=[{path:"",component:(x=function(){function e(t,c,n,a,r,i,o,d){s(this,e),this.router=t,this.userService=c,this.fs=n,this.fb=a,this.storage=r,this.store=i,this.snack=o,this.config=d,this.isGoogleLogin=!1}var t,c,n;return t=e,(c=[{key:"ngOnInit",value:function(){this.userName=new v.c("",[v.p.required,v.p.maxLength(20)]),this.savedGame=this.storage.getStore(),console.warn("savedGame",this.savedGame),this.savedGame&&(this.savedGameData={club:this.savedGame.currentClub,season:this.savedGame.currentSeason,week:this.savedGame.currentWeek,userName:this.savedGame.userName})}},{key:"submitName",value:function(){console.log(this.userName.value),this.userName.valid&&(this.userService.userName=this.userName.value,this.router.navigate([h.a.OFFICE]).catch(function(e){console.error("Navigation fail by ",e)}))}},{key:"login",value:function(){var e=this;this.fs.login().subscribe(function(t){console.log("GOOGLE LOGIN",t),e.userService.userName=t.user.displayName,e.router.navigate([h.a.OFFICE]).catch(function(e){console.error("Navigation fail by ",e)})},function(e){console.error("GOOGLE LOGIN ERROR",e)})}},{key:"printUser",value:function(e){console.log(e)}},{key:"printError",value:function(e){console.error(e)}},{key:"deleteSavedGame",value:function(){this.storage.clearStorage(),this.savedGame=null,this.savedGameData=null}},{key:"loadSavedGame",value:function(){this.store.dispatch(Object(p.E)({data:this.savedGame}))}}])&&d(t.prototype,c),n&&d(t,n),e}(),x.\u0275fac=function(e){return new(e||x)(g.Xb(b.d),g.Xb(G.a),g.Xb(N.a),g.Xb(v.b),g.Xb(k.a),g.Xb(w.b),g.Xb(y.a),g.Xb(O.a))},x.\u0275cmp=g.Rb({type:x,selectors:[["app-home"]],decls:23,vars:4,consts:function(){return[[1,"row","justify-content-center"],[1,"col-8"],[1,"enter-name-card"],[1,"col-12"],[1,"enter-name-header","text-center"],$localize(e||(e=o([":\u241fe36df2c2fdb955a44c01110b4712bc23688595dd\u241f3171643889337205031: \u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 SimpleFM. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0432\u043e\u0435 \u0438\u043c\u044f, \u0447\u0442\u043e\u0431\u044b \u043d\u0430\u0447\u0430\u0442\u044c \u0438\u0433\u0440\u0443: "]))),[1,"col-5"],["hintLabel",$localize(t||(t=o([":\u241f0a4ac72026a956f31e306d0645df627096ab19a1\u241f9132469146353739697:\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 20 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"]))),1,"enter-name-ff","w-100","mt-5"],["matInput","","maxlength","20","placeholder",$localize(c||(c=o([":\u241f4304ee204fdbe7003cc21f292ce09eeb969907bb\u241f122628350067133961:\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f"]))),"autocomplete","off","autofocus","",3,"formControl","keyup.enter"],["input",""],["align","end"],[1,"row","justify-content-center","mt-5"],[1,"col-4"],["mat-flat-button","",1,"w-100",3,"disabled","click"],$localize(n||(n=o([":\u241fec5c686db7ae554a0f01990b8051946518ba044a\u241f6053197044714598829: \u041d\u0430\u0447\u0430\u0442\u044c \u0438\u0433\u0440\u0443! "]))),[1,"row","justify-content-end","mt-5"],[1,"hover",3,"click"],$localize(a||(a=o([":\u241f48d996e090967f1b6d769b6fbe2a732ef20ce8df\u241f532738625071220127:\u0412\u043e\u0439\u0442\u0438 \u0441 \u0443\u0447\u0435\u0442\u043a\u043e\u0439 Google"]))),["class","row justify-content-center",4,"ngIf"],[1,"col-6"],[1,"text-center"],$localize(r||(r=o([":\u241f0797a343adbefbc3598367015ed563a86abc6eb3\u241f3206619847177920240:\u0418\u043b\u0438 \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c \u043f\u0440\u043e\u0448\u043b\u0443\u044e \u0438\u0433\u0440\u0443?"]))),[1,"row"],[1,"col-11"],["mat-flat-button","",1,"w-100","text-center",3,"click"],$localize(i||(i=o([":\u241f8d78053e148d7c62ee9867350932082643814911\u241f1300578539918265893: ",":INTERPOLATION:(",":INTERPOLATION_1:) - \u0441\u0435\u0437\u043e\u043d ",":INTERPOLATION_2:, \u043d\u0435\u0434\u0435\u043b\u044f ",":INTERPOLATION_3: "])),"\ufffd0\ufffd","\ufffd1\ufffd","\ufffd2\ufffd","\ufffd3\ufffd"),[1,"col-1",3,"click"],["mat-mini-fab",""]]},template:function(e,t){if(1&e&&(g.dc(0,"div",0),g.dc(1,"div",1),g.dc(2,"mat-card",2),g.dc(3,"div",0),g.dc(4,"div",3),g.dc(5,"h2",4),g.hc(6,5),g.cc(),g.cc(),g.cc(),g.dc(7,"div",0),g.dc(8,"div",6),g.dc(9,"mat-form-field",7),g.dc(10,"input",8,9),g.rc("keyup.enter",function(){return t.submitName()}),g.cc(),g.dc(12,"mat-hint",10),g.Tc(13),g.cc(),g.cc(),g.cc(),g.cc(),g.dc(14,"div",11),g.dc(15,"div",12),g.dc(16,"button",13),g.rc("click",function(){return t.submitName()}),g.hc(17,14),g.cc(),g.cc(),g.cc(),g.dc(18,"div",15),g.dc(19,"div",12),g.dc(20,"span",16),g.rc("click",function(){return t.login()}),g.hc(21,17),g.cc(),g.cc(),g.cc(),g.Rc(22,S,12,4,"div",18),g.cc(),g.cc(),g.cc()),2&e){var c=g.Jc(11);g.Lb(10),g.Bc("formControl",t.userName),g.Lb(3),g.Vc("",(null==c.value?null:c.value.length)||0,"/20"),g.Lb(3),g.Bc("disabled",t.userName.invalid),g.Lb(6),g.Bc("ngIf",!!t.savedGameData)}},directives:[L.a,I.b,T.a,v.a,v.g,v.j,v.d,I.e,j.a,f.o,E.a],styles:["/* some auth styles \\/*/\n\n/*.mat-tab-label {\r\n  height: 25px !important;\r\n}\r\n.mat-card {\r\n  margin: 1rem !important;\r\n  margin-top: 0.5rem !important;\r\n  margin-bottom: 0.5rem !important;\r\n  padding-bottom: 10px !important;\r\n  padding-top: 10px !important;\r\n}\r\n.mat-card-title {\r\n  font-size: 16px !important;\r\n}\r\n.mat-card-content, .mat-card-subtitle {\r\n  font-size: 12px !important;\r\n}\r\n.space-top {\r\n  margin-top: 0.5rem !important;\r\n}\r\n.mat-raised-button, .mat-button {\r\n  line-height: 26px !important;\r\n}\r\n.signed-in-container .account-circle {\r\n  width: 3rem !important;\r\n  height: 3rem !important;\r\n}*/\n\n.enter-name-card {\n  position: relative;\n  top: 30vh;\n  height: 50vh;\n  background-color: navajowhite;\n}\r\n"],encapsulation:2}),x)}],R=((z=function e(){s(this,e)}).\u0275fac=function(e){return new(e||z)},z.\u0275mod=g.Vb({type:z}),z.\u0275inj=g.Ub({imports:[[f.c,b.e.forChild(X),L.b,I.d,T.b,v.n,j.b,E.b]]}),z)}}])}();