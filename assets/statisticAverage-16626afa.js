import{o as t,d as s,f as i,a as c,t as r,j as a}from"./index-0d521d25.js";const n={class:"statistic__average statistic-average"},o=i("h4",{class:"statistic__group-header statistic__group-header_margin-bottom"}," Средний набор ",-1),v={class:"statistic-average__points"},l={key:0,class:"statistic__values"},_=i("h6",{class:"statistic__value-header"},"матч",-1),d={key:1,class:"statistic__values"},u=i("h6",{class:"statistic__value-header"},"сет",-1),g={key:2,class:"statistic__values"},h=i("h6",{class:"statistic__value-header"},"лег",-1),m={key:0,class:"statistic-average__nine-darts"},P=i("h5",{class:"statistic__parameter-header"},"9 дротиков",-1),S={key:0,class:"statistic__values"},L={key:0,class:"statistic__value-header"},k={key:1,class:"statistic__values"},y=i("h6",{class:"statistic__value-header"},"сет",-1),F={key:1,class:"statistic-average__win-legs"},G=i("h5",{class:"statistic__parameter-header"},"выигранные леги",-1),x={key:0,class:"statistic__values"},N={key:0,class:"statistic__value-header"},b={key:1,class:"statistic__values"},j=i("h6",{class:"statistic__value-header"},"сет",-1),D={key:2,class:"statistic-average__lose-legs"},B=i("h5",{class:"statistic__parameter-header"},"проигранные леги",-1),O={key:0,class:"statistic__values"},W={key:0,class:"statistic__value-header"},f={key:1,class:"statistic__values"},I=i("h6",{class:"statistic__value-header"},"сет",-1),C={__name:"statisticAverage",props:{seenGroups:Object,seenParametersGame:Object,seenParametersSet:Object,seenAveragePointsLeg:Boolean,gameStatistic:Object,setStatistic:Object,averagePointsLeg:Number,areSetsInGame:Boolean},setup(e){return(A,V)=>(t(),s("div",n,[o,i("div",v,[e.seenParametersGame.averagePoints.value?(t(),s("div",l,[_,c(" "+r(e.gameStatistic.averagePoints.value.toFixed(2)),1)])):a("",!0),e.seenParametersSet.averagePoints.value?(t(),s("div",d,[u,c(" "+r(e.setStatistic.averagePoints.value.toFixed(2)),1)])):a("",!0),e.seenAveragePointsLeg?(t(),s("div",g,[h,c(" "+r(e.averagePointsLeg.toFixed(2)),1)])):a("",!0)]),e.seenGroups.averageFirstNineDarts.value?(t(),s("div",m,[P,e.seenParametersGame.averageFirstNineDarts.value?(t(),s("div",S,[e.areSetsInGame?(t(),s("h6",L,"матч")):a("",!0),c(" "+r(e.gameStatistic.averageFirstNineDarts.value.toFixed(2)),1)])):a("",!0),e.seenParametersSet.averageFirstNineDarts.value?(t(),s("div",k,[y,c(" "+r(e.setStatistic.averageFirstNineDarts.value.toFixed(2)),1)])):a("",!0)])):a("",!0),e.seenGroups.averagePointsWinLegs.value?(t(),s("div",F,[G,e.seenParametersGame.averagePointsWinLegs.value?(t(),s("div",x,[e.areSetsInGame?(t(),s("h6",N,"матч")):a("",!0),c(" "+r(e.gameStatistic.averagePointsWinLegs.value.toFixed(2)),1)])):a("",!0),e.seenParametersSet.averagePointsWinLegs.value?(t(),s("div",b,[j,c(" "+r(e.setStatistic.averagePointsWinLegs.value.toFixed(2)),1)])):a("",!0)])):a("",!0),e.seenGroups.averagePointsLoseLegs.value?(t(),s("div",D,[B,e.seenParametersGame.averagePointsLoseLegs.value?(t(),s("div",O,[e.areSetsInGame?(t(),s("h6",W,"матч")):a("",!0),c(" "+r(e.gameStatistic.averagePointsLoseLegs.value.toFixed(2)),1)])):a("",!0),e.seenParametersSet.averagePointsLoseLegs.value?(t(),s("div",f,[I,c(" "+r(e.setStatistic.averagePointsLoseLegs.value.toFixed(2)),1)])):a("",!0)])):a("",!0)]))}};export{C as default};