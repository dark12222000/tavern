`use strict`;

import tavernData from './../data/TavernData.js';

export default class Tavern {
  constructor() {
    this.name = this.generateName();
    this.wealth = this.generateWealth();
    this.menu = this.generateMenu();
    this.formatMenuAsTbody = function(){
      let output = '';
      this.menu.forEach((item) =>{
        output += `<tr><td>${item.name}</td><td>(${item.quality})</td><td>${this.priceFormatter(item.price)}</td></tr>`;
      });
      return output;
    }
  }
  generateName() {
    let getWord = _.flow(_.sample, _.capitalize);
    let nameGenerators = [function(){
      return `The ${getWord(tavernData.descriptors)} ${getWord(tavernData.animals)}`;
    }, function(){
      return `The ${getWord(tavernData.descriptors)} ${getWord(tavernData.objects)}`;
    }, function(){
      return `The ${getWord(tavernData.objects)} and ${getWord(tavernData.animals)}`;
    }];

    return _.sample(nameGenerators)();
  }
  generateWealth() {
    let wealth = _.random(0, 500);
    let levels = [
      {name: 'wretched', wealth: 100},
      {name: 'squalid', wealth: 200},
      {name: 'poor', wealth: 300},
      {name: 'modest', wealth: 400},
      {name: 'comfortable', wealth: 450},
      {name: 'wealthy', wealth: 490}
    ];
    let level =  _.find(levels, function(level){
      return level.wealth >= wealth;
    });
    if(level.name) { return level.name; } else { return 'squalid' }
  }
  generateMenu() {
    let wealthModifiers = {
      wretched: 0.2,
      squalid: 0.3,
      poor: 0.4,
      modest: 0.5,
      comfortable: 0.75,
      wealthy: 0.9
    };
    let qualityModifiers = {
      horrid: 0.2,
      poor: 0.3,
      serviceable: 0.5,
      decent: 0.7,
      fine: 1.0
    };

    let modifier = wealthModifiers[this.wealth];

    let menu = [];

    function runMenu(){
      let items = tavernData.menuItems.map(function(item){
        let chance = Math.random();
        let itemEntry = {};
        if(item.weight * modifier * chance >= 1){
          itemEntry.name = item.name;
          let qual = _.random(0, 2) * modifier;
          itemEntry.quality = _.findKey(qualityModifiers, function(modifier){
            console.log('modifier', modifier);
            return modifier >= qual;
          });
          if(!itemEntry.quality) itemEntry.quality = 'poor';
          let basePrice = item.price || 0.02;
          itemEntry.price = Number(basePrice) * Number(qualityModifiers[itemEntry.quality]);
          return itemEntry;
        }else{
          return false;
        }
      });
      return items.filter(function(item){
        return item !== false;
      });
    }

    //always have at least three items
    while(menu.length < 3){
      menu = runMenu();
    }

    return menu;
  }
  priceFormatter(price){
    let format = {
      pp: 0,
      gp: 0,
      sp: 0,
      cp: 0
    };
    format.pp = Math.floor(price / 100);
    price =- format.pp * 100;
    format.gp = Math.floor(price);
    format.sp = Math.floor((price * 10) - (format.gp * 10));
    format.cp = Math.floor( (price * 100) - ( ( format.gp * 100) + (format.sp * 10) ));
    console.log(price, format);
    if(format.pp === 0) delete format.pp;
    if(format.gp === 0) delete format.gp;
    if(format.sp === 0) delete format.sp;
    if(format.cp === 0) delete format.cp;
    var str = '';
    _.keys(format).forEach(function(key){
      str = format[key] + key;
    });
    return str;
  };
}
