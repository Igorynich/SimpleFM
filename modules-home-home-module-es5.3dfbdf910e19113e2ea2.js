!function(){var e,t,c,a,n,r,i,o;function s(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var c=0;c<t.length;c++){var a=t[c];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{iydT:function(u,m,f){"use strict";f.r(m),f.d(m,"HomeModule",function(){return C});var b=f("ofXK"),v=f("tyNb"),h=f("3Pt+"),p=f("SqtC"),g=f("npY+"),N=f("fXoL"),G=f("qfBg"),k=f("Z2Br"),w=f("n90K"),y=f("kt0X"),O=f("ThKZ"),L=f("r4Kj"),I=f("Wp6s"),T=f("kmnG"),j=f("qFsG"),S=f("bTqV"),z=f("NFeN");function x(e,t){if(1&e){var c=N.ec();N.dc(0,"div",0),N.dc(1,"div",19),N.dc(2,"h5",20),N.hc(3,21),N.cc(),N.dc(4,"div",22),N.dc(5,"div",23),N.dc(6,"button",24),N.rc("click",function(){return N.Lc(c),N.vc().loadSavedGame()}),N.hc(7,25),N.cc(),N.cc(),N.dc(8,"div",26),N.rc("click",function(){return N.Lc(c),N.vc().deleteSavedGame()}),N.dc(9,"button",27),N.dc(10,"mat-icon"),N.Tc(11,"delete"),N.cc(),N.cc(),N.cc(),N.cc(),N.cc(),N.cc()}if(2&e){var a=N.vc();N.Lb(7),N.lc(a.savedGameData.userName)(a.savedGameData.club[a.config.name])(a.savedGameData.season+1)(a.savedGameData.week+1),N.ic(7)}}var E,X,R=[{path:"",component:(E=function(){function t(e,c,a,n,r,i,o,s){d(this,t),this.router=e,this.userService=c,this.fs=a,this.fb=n,this.storage=r,this.store=i,this.snack=o,this.config=s,this.isGoogleLogin=!1}var c,a,n;return c=t,(a=[{key:"ngOnInit",value:function(){this.userName=new h.c("",[h.p.required,h.p.maxLength(20)]),this.savedGame=this.storage.getStore(),console.warn("savedGame",this.savedGame),this.savedGame&&(this.savedGameData={club:this.savedGame.currentClub,season:this.savedGame.currentSeason,week:this.savedGame.currentWeek,userName:this.savedGame.userName})}},{key:"submitName",value:function(){console.log(this.userName.value),this.userName.valid&&(this.userService.userName=this.userName.value,this.router.navigate([p.a.OFFICE]).catch(function(e){console.error("Navigation fail by ",e)}))}},{key:"login",value:function(){var e=this;this.fs.login().subscribe(function(t){console.log("GOOGLE LOGIN",t),e.userService.userName=t.user.displayName,e.router.navigate([p.a.OFFICE]).catch(function(e){console.error("Navigation fail by ",e)})},function(e){console.error("GOOGLE LOGIN ERROR",e)})}},{key:"printUser",value:function(e){console.log(e)}},{key:"printError",value:function(e){console.error(e)}},{key:"deleteSavedGame",value:function(){this.storage.clearStorage(),this.savedGame=null,this.savedGameData=null}},{key:"loadSavedGame",value:function(){this.store.dispatch(Object(g.p)({data:this.savedGame})),this.userName.setValue(this.savedGame.userName),this.snack.createSnackBar($localize(e||(e=s(["\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d\u043e"])))),this.submitName()}}])&&l(c.prototype,a),n&&l(c,n),t}(),E.\u0275fac=function(e){return new(e||E)(N.Xb(v.d),N.Xb(G.a),N.Xb(k.a),N.Xb(h.b),N.Xb(w.a),N.Xb(y.b),N.Xb(O.a),N.Xb(L.a))},E.\u0275cmp=N.Rb({type:E,selectors:[["app-home"]],decls:23,vars:4,consts:function(){return[[1,"row","justify-content-center"],[1,"col-8"],[1,"enter-name-card"],[1,"col-12"],[1,"enter-name-header","text-center"],$localize(t||(t=s([":\u241fe36df2c2fdb955a44c01110b4712bc23688595dd\u241f3171643889337205031: \u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 SimpleFM. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0432\u043e\u0435 \u0438\u043c\u044f, \u0447\u0442\u043e\u0431\u044b \u043d\u0430\u0447\u0430\u0442\u044c \u0438\u0433\u0440\u0443: "]))),[1,"col-5"],["hintLabel",$localize(c||(c=s([":\u241f0a4ac72026a956f31e306d0645df627096ab19a1\u241f9132469146353739697:\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 20 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"]))),1,"enter-name-ff","w-100","mt-5"],["matInput","","maxlength","20","placeholder",$localize(a||(a=s([":\u241f4304ee204fdbe7003cc21f292ce09eeb969907bb\u241f122628350067133961:\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f"]))),"autocomplete","off","autofocus","",3,"formControl","keyup.enter"],["input",""],["align","end"],[1,"row","justify-content-center","mt-5"],[1,"col-4"],["mat-flat-button","",1,"w-100",3,"disabled","click"],$localize(n||(n=s([":\u241fec5c686db7ae554a0f01990b8051946518ba044a\u241f6053197044714598829: \u041d\u0430\u0447\u0430\u0442\u044c \u0438\u0433\u0440\u0443! "]))),[1,"row","justify-content-end","mt-5"],[1,"hover",3,"click"],$localize(r||(r=s([":\u241f48d996e090967f1b6d769b6fbe2a732ef20ce8df\u241f532738625071220127:\u0412\u043e\u0439\u0442\u0438 \u0441 \u0443\u0447\u0435\u0442\u043a\u043e\u0439 Google"]))),["class","row justify-content-center",4,"ngIf"],[1,"col-6"],[1,"text-center"],$localize(i||(i=s([":\u241f0797a343adbefbc3598367015ed563a86abc6eb3\u241f3206619847177920240:\u0418\u043b\u0438 \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c \u043f\u0440\u043e\u0448\u043b\u0443\u044e \u0438\u0433\u0440\u0443?"]))),[1,"row"],[1,"col-11"],["mat-flat-button","",1,"w-100","text-center",3,"click"],$localize(o||(o=s([":\u241f8d78053e148d7c62ee9867350932082643814911\u241f1300578539918265893: ",":INTERPOLATION:(",":INTERPOLATION_1:) - \u0441\u0435\u0437\u043e\u043d ",":INTERPOLATION_2:, \u043d\u0435\u0434\u0435\u043b\u044f ",":INTERPOLATION_3: "])),"\ufffd0\ufffd","\ufffd1\ufffd","\ufffd2\ufffd","\ufffd3\ufffd"),[1,"col-1",3,"click"],["mat-mini-fab",""]]},template:function(e,t){if(1&e&&(N.dc(0,"div",0),N.dc(1,"div",1),N.dc(2,"mat-card",2),N.dc(3,"div",0),N.dc(4,"div",3),N.dc(5,"h2",4),N.hc(6,5),N.cc(),N.cc(),N.cc(),N.dc(7,"div",0),N.dc(8,"div",6),N.dc(9,"mat-form-field",7),N.dc(10,"input",8,9),N.rc("keyup.enter",function(){return t.submitName()}),N.cc(),N.dc(12,"mat-hint",10),N.Tc(13),N.cc(),N.cc(),N.cc(),N.cc(),N.dc(14,"div",11),N.dc(15,"div",12),N.dc(16,"button",13),N.rc("click",function(){return t.submitName()}),N.hc(17,14),N.cc(),N.cc(),N.cc(),N.dc(18,"div",15),N.dc(19,"div",12),N.dc(20,"span",16),N.rc("click",function(){return t.login()}),N.hc(21,17),N.cc(),N.cc(),N.cc(),N.Rc(22,x,12,4,"div",18),N.cc(),N.cc(),N.cc()),2&e){var c=N.Jc(11);N.Lb(10),N.Bc("formControl",t.userName),N.Lb(3),N.Vc("",(null==c.value?null:c.value.length)||0,"/20"),N.Lb(3),N.Bc("disabled",t.userName.invalid),N.Lb(6),N.Bc("ngIf",!!t.savedGameData)}},directives:[I.a,T.b,j.a,h.a,h.g,h.j,h.d,T.e,S.a,b.o,z.a],styles:["/* some auth styles \\/*/\n\n/*.mat-tab-label {\r\n  height: 25px !important;\r\n}\r\n.mat-card {\r\n  margin: 1rem !important;\r\n  margin-top: 0.5rem !important;\r\n  margin-bottom: 0.5rem !important;\r\n  padding-bottom: 10px !important;\r\n  padding-top: 10px !important;\r\n}\r\n.mat-card-title {\r\n  font-size: 16px !important;\r\n}\r\n.mat-card-content, .mat-card-subtitle {\r\n  font-size: 12px !important;\r\n}\r\n.space-top {\r\n  margin-top: 0.5rem !important;\r\n}\r\n.mat-raised-button, .mat-button {\r\n  line-height: 26px !important;\r\n}\r\n.signed-in-container .account-circle {\r\n  width: 3rem !important;\r\n  height: 3rem !important;\r\n}*/\n\n.enter-name-card {\n  position: relative;\n  top: 30vh;\n  height: 50vh;\n  background-color: navajowhite;\n}\r\n"],encapsulation:2}),E)}],C=((X=function e(){d(this,e)}).\u0275fac=function(e){return new(e||X)},X.\u0275mod=N.Vb({type:X}),X.\u0275inj=N.Ub({imports:[[b.c,v.e.forChild(R),I.b,T.d,j.b,h.n,S.b,z.b]]}),X)}}])}();