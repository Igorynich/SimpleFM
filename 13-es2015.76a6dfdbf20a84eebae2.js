(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{v1Df:function(c,e,n){"use strict";n.r(e),n.d(e,"NewJobModule",function(){return g});var t=n("ofXK"),o=n("tyNb"),i=n("woNW"),r=n("SqtC"),a=n("lJxs"),f=n("fXoL"),b=n("kt0X"),s=n("qLOZ"),d=n("r4Kj"),l=n("Wp6s"),u=n("bTqV");const h=[{path:"",component:(()=>{class c{constructor(c,e,n,t){this.store=c,this.router=e,this.jobService=n,this.config=t,this.ROUTES=r.a}ngOnInit(){this.offeringClub=this.jobService.findNewJobOfferingCLub(),this.offeringClubLeaguePosition$=this.store.select(i.J,{leaguesNameEn:this.offeringClub.leagueNameEn}).pipe(Object(a.a)(c=>c.findIndex(c=>c.club.nameEn===this.offeringClub.nameEn)))}acceptOffer(){this.jobService.newJobTaken(this.offeringClub),this.router.navigate([this.ROUTES.OFFICE]).catch(c=>{console.error(c)})}declineOffer(){this.router.navigate([this.ROUTES.OFFICE]).catch(c=>{console.error(c)})}}return c.\u0275fac=function(e){return new(e||c)(f.Xb(b.b),f.Xb(o.d),f.Xb(s.a),f.Xb(d.a))},c.\u0275cmp=f.Rb({type:c,selectors:[["app-new-job-main-page"]],decls:17,vars:5,consts:function(){let c,e,n;return c=$localize`:␟8bfbf1e5e392c56354cd3c8b368a3eef99ec61c5␟2835954836499608524:${"\ufffd0\ufffd"}:INTERPOLATION: (${"\ufffd1\ufffd"}:INTERPOLATION_1: место в ${"\ufffd2\ufffd"}:INTERPOLATION_2:) - приглашает вас занять место главного тренера`,e=$localize`:␟98b3a51faa3011073fbdb88c6c46f62994256e04␟2434108098513980733:Принять предложение`,n=$localize`:␟fa10c0d00e105304aab29550268d75ced93d2f7b␟3665511248151987906:Отклонить предложение`,[[1,"row","new-job-main-container"],[1,"col"],[1,"new-job-card--main","h-100"],[1,"row","h-100"],[1,"col","d-flex","flex-column"],[1,"row","justify-content-center","my-auto"],[1,"col","text-center","white"],c,[1,"row","new-job-buttons"],["mat-raised-button","","color","primary",3,"click"],e,["mat-raised-button","","color","accent",3,"click"],n]},template:function(c,e){1&c&&(f.dc(0,"div",0),f.dc(1,"div",1),f.dc(2,"mat-card",2),f.dc(3,"div",3),f.dc(4,"div",4),f.dc(5,"div",5),f.dc(6,"div",6),f.dc(7,"h3"),f.hc(8,7),f.wc(9,"async"),f.cc(),f.cc(),f.cc(),f.dc(10,"div",8),f.dc(11,"div",1),f.dc(12,"button",9),f.rc("click",function(){return e.acceptOffer()}),f.hc(13,10),f.cc(),f.cc(),f.dc(14,"div",1),f.dc(15,"button",11),f.rc("click",function(){return e.declineOffer()}),f.hc(16,12),f.cc(),f.cc(),f.cc(),f.cc(),f.cc(),f.cc(),f.cc(),f.cc()),2&c&&(f.Lb(9),f.lc(e.offeringClub[e.config.name])(f.xc(9,3,e.offeringClubLeaguePosition$))(e.offeringClub[e.config.leagueName]),f.ic(8))},directives:[l.a,u.a],pipes:[t.b],styles:[".new-job-main-container[_ngcontent-%COMP%]{height:95%}.new-job-card--main[_ngcontent-%COMP%]{margin:25px;background-color:#000;opacity:1%}.white[_ngcontent-%COMP%]{color:#fff}.new-job-buttons[_ngcontent-%COMP%]{margin-top:auto}"]}),c})()}];let g=(()=>{class c{}return c.\u0275fac=function(e){return new(e||c)},c.\u0275mod=f.Vb({type:c}),c.\u0275inj=f.Ub({imports:[[t.c,o.e.forChild(h),u.b,l.b]]}),c})()}}]);