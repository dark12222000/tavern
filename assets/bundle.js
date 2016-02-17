/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Tavern = __webpack_require__(1);

	var _Tavern2 = _interopRequireDefault(_Tavern);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function addResult(tavern) {
	  $('#results').append('\n  <div class="">\n    <h3>' + tavern.name + '</h3>\n    <i>' + tavern.wealth + '</i>\n    <table class="u-full-width">\n      <thead><tr><th>Item</th><th>Quality</th><th>Price</th></tr></thead>\n      <tbody>' + tavern.formatMenuAsTbody() + '</tbody>\n    </table>\n  </div>');

	  $('#results').animate({ scrollTop: $('#results').height() + 10000 }, "slow");
	}

	function generateTavern() {
	  return addResult(new _Tavern2.default());
	}

	window.generateTavern = generateTavern;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _TavernData = __webpack_require__(2);

	var _TavernData2 = _interopRequireDefault(_TavernData);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	'use strict';
	/* jshint esnext: true */

	var Tavern = function () {
	  function Tavern() {
	    var _this = this;

	    _classCallCheck(this, Tavern);

	    this.name = this.generateName();
	    this.wealth = this.generateWealth();
	    this.menu = this.generateMenu();
	    this.formatMenuAsTbody = function () {
	      var output = '';
	      _this.menu.forEach(function (item) {
	        output += '<tr><td>' + item.name + '</td><td>(' + item.quality + ')</td><td>' + _this.priceFormatter(Number(item.price)) + '</td></tr>';
	      });
	      return output;
	    };
	  }

	  _createClass(Tavern, [{
	    key: 'generateName',
	    value: function generateName() {
	      var getWord = _.flow(_.sample, _.capitalize);
	      var nameGenerators = [function () {
	        return 'The ' + getWord(_TavernData2.default.descriptors) + ' ' + getWord(_TavernData2.default.animals);
	      }, function () {
	        return 'The ' + getWord(_TavernData2.default.descriptors) + ' ' + getWord(_TavernData2.default.objects);
	      }, function () {
	        return 'The ' + getWord(_TavernData2.default.objects) + ' and ' + getWord(_TavernData2.default.animals);
	      }];

	      return _.sample(nameGenerators)();
	    }
	  }, {
	    key: 'generateWealth',
	    value: function generateWealth() {
	      var wealth = _.random(0, 500);
	      var levels = [{ name: 'wretched', wealth: 100 }, { name: 'squalid', wealth: 200 }, { name: 'poor', wealth: 300 }, { name: 'modest', wealth: 400 }, { name: 'comfortable', wealth: 450 }, { name: 'wealthy', wealth: 490 }];
	      var level = _.find(levels, function (level) {
	        return level.wealth >= wealth;
	      });
	      if (level.name) {
	        return level.name;
	      } else {
	        return 'squalid';
	      }
	    }
	  }, {
	    key: 'generateMenu',
	    value: function generateMenu() {
	      var wealthModifiers = {
	        wretched: 0.2,
	        squalid: 0.3,
	        poor: 0.4,
	        modest: 0.5,
	        comfortable: 0.75,
	        wealthy: 0.9
	      };
	      var qualityModifiers = {
	        horrid: 0.2,
	        poor: 0.3,
	        serviceable: 0.5,
	        decent: 0.7,
	        fine: 1.0
	      };

	      var modifier = wealthModifiers[this.wealth];

	      var menu = [];

	      function runMenu() {
	        var items = _TavernData2.default.menuItems.map(function (item) {
	          var chance = Math.random();
	          var itemEntry = {};
	          if (item.weight * modifier * chance >= 1) {
	            var _ret = function () {
	              itemEntry.name = item.name;
	              var qual = _.random(0, 2) * modifier;
	              itemEntry.quality = _.findKey(qualityModifiers, function (modifier) {
	                return modifier >= qual;
	              });
	              if (!itemEntry.quality) itemEntry.quality = 'poor';
	              var basePrice = item.price || 0.02;
	              itemEntry.price = Number(basePrice) * Number(qualityModifiers[itemEntry.quality]);
	              itemEntry.price = itemEntry.price.toFixed(2);
	              if (itemEntry.price < 0.01) itemEntry.price = 0.01;
	              console.log(itemEntry);
	              return {
	                v: itemEntry
	              };
	            }();

	            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	          } else {
	            return false;
	          }
	        });
	        return items.filter(function (item) {
	          return item !== false;
	        });
	      }

	      //always have at least three items
	      while (menu.length < 3) {
	        menu = runMenu();
	      }

	      return menu;
	    }
	  }, {
	    key: 'priceFormatter',
	    value: function priceFormatter(price) {
	      var format = {
	        pp: 0,
	        gp: 0,
	        sp: 0,
	        cp: 0
	      };

	      format.cp = Math.round(price % 0.1 * 100);
	      format.sp = Math.round((price % 1).toFixed(1) * 10);
	      format.gp = Math.round(price % 10);
	      format.pp = Math.round(price / 10) * (price * 10);
	      console.log(price, format);
	      if (format.pp === 0) delete format.pp;
	      if (format.gp === 0) delete format.gp;
	      if (format.sp === 0) delete format.sp;
	      if (format.cp === 0) delete format.cp;

	      var str = '';
	      _.keys(format).forEach(function (key) {
	        str = Number(format[key]) + key;
	      });
	      return str;
	    }
	  }]);

	  return Tavern;
	}();

	exports.default = Tavern;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  animals: ["Aardwolf", "Albatross", "Alligator", "Alpaca", "Anaconda", "Angelfish", "Anglerfish", "Ant", "Anteater", "Antelope", "Antlion", "Ape", "Aphid", "Armadillo", "Asp", "***", "Baboon", "Badger", "Bandicoot", "Barnacle", "Basilisk", "Barracuda", "Bass", "Bat", "Bear", "Beaver", "Bedbug", "Bee", "Beetle", "Bird", "Bison", "Boa", "Bobcat", "Bobolink", "Bonobo", "Booby", "Bovid", "Buffalo", "Bug", "Bulldog", "Butterfly", "Buzzard", "Camel", "Canid", "Cardinal", "Caribou", "Carp", "Cat", "Caterpillar", "Catfish", "Centipede", "Cephalopod", "Chameleon", "Cheetah", "Chickadee", "Chicken", "Chihuahua", "Chimpanzee", "Chinchilla", "Chipmunk", "Clam", "Clownfish", "Cobra", "Cockroach", "Cod", "Collie", "Condor", "Constrictor", "Coral", "Cougar", "Cow", "Coyote", "Crab", "Crane", "Crawdad", "Crayfish", "Cricket", "Crocodile", "Crow", "Cuckoo", "Damselfly", "Deer", "Dingo", "Dinosaur", "Dog", "Dolphin", "Donkey", "Dormouse", "Dove", "Dragonfly", "Duck", "Eagle", "Earthworm", "Earwig", "Echidna", "Eel", "Egret", "Elephant", "Elk", "Emu", "Ermine", "Falcon", "Ferret", "Finch", "Firefly", "Fish", "Flamingo", "Flea", "Fly", "Flyingfish", "Fowl", "Fox", "Frog", "Gazelle", "Gecko", "Gerbil", "Gibbon", "Guanaco", "Guineafowl", "Giraffe", "Goat", "Goldfinch", "Goldfish", "Goose", "Gopher", "Gorilla", "Grasshopper", "Greyhound", "Grouse", "Gull", "Guppy", "Haddock", "Halibut", "Hamster", "Hare", "Harrier", "Hawk", "Hedgehog", "Heron", "Herring", "Hippopotamus", "Hookworm", "Hornet", "Horse", "Hound", "Human", "Hummingbird", "Husky", "Hyena", "Iguana", "Impala", "Insect", "Jackal", "Jaguar", "Jay", "Jellyfish", "Kangaroo", "Kingfisher", "Kite", "Kiwi", "Koala", "Koi", "Krill", "Ladybug", "Lamprey", "Lark", "Leech", "Lemming", "Lemur", "Leopard", "Leopon", "Liger", "Lion", "Lizard", "Llama", "Lobster", "Locust", "Loon", "Louse", "Lungfish", "Lynx", "Macaw", "Mackerel", "Magpie", "Mammal", "Mammoth", "Marlin", "Marmoset", "Marmot", "Marsupial", "Marten", "Mastiff", "Mastodon", "Meadowlark", "Meerkat", "Mink", "Minnow", "Mite", "Mockingbird", "Mole", "Mollusk", "Mongoose", "Monkey", "Moose", "Mosquito", "Moth", "Mouse", "Mule", "Muskox", "Mussel", "Narwhal", "Newt", "Nightingale", "Ocelot", "Octopus", "Opossum", "Orangutan", "Orca", "Ostrich", "Otter", "Owl", "Ox", "Oyster", "Panda", "Panther", "Parakeet", "Parrot", "Parrotfish", "Partridge", "Peacock", "Peafowl", "Pekingese", "Pelican", "Penguin", "Perch", "Pheasant", "Pig", "Pigeon", "Pike", "Pinniped", "Piranha", "Planarian", "Platypus", "Pony", "Poodle", "Porcupine", "Porpoise", "Possum", "Prawn", "Primate", "Puffin", "Puma", "Python", "Quail", "Rabbit", "Raccoon", "Rat", "Rattlesnake", "Raven", "Reindeer", "Rhinoceros", "Roadrunner", "Robin", "Rodent", "Rook", "Rooster", "Roundworm", "Sailfish", "Salamander", "Salmon", "Sawfish", "Scallop", "Scorpion", "Seahorse", "Setter", "Shark", "Sheep", "Shrew", "Shrimp", "Silkworm", "Silverfish", "Skink", "Skunk", "Sloth", "Slug", "Smelt", "Snail", "Snake", "Snipe", "Sole", "Spaniel", "Sparrow", "Spider", "Spoonbill", "Squid", "Squirrel", "Starfish", "Stingray", "Stoat", "Stork", "Sturgeon", "Swallow", "Swan", "Swift", "Swordfish", "Swordtail", "Tahr", "Takin", "Tapeworm", "Tapir", "Tarantula", "Termite", "Tern", "Terrier", "Thrush", "Tick", "Tiger", "Tigon", "Toad", "Tortoise", "Toucan", "Trout", "Tuna", "Turkey", "Turtle", "Tyrannosaurus", "Urial", "Viper", "Vole", "Vulture", "Wallaby", "Walrus", "Wasp", "Warbler", "Weasel", "Whale", "Whitefish", "Wildcat", "Wildebeest", "Wildfowl", "Wolf", "Wolverine", "Wombat", "Woodpecker", "Worm", "Wren", "Yak", "Zebra"],
	  descriptors: ["accessible", "active", "adaptable", "admirable", "adventurous", "agreeable", "alert", "allocentric", "amiable", "anticipative", "appreciative", "articulate", "aspiring", "athletic", "attractive", "balanced", "benevolent", "brilliant", "calm", "capable", "captivating", "caring", "challenging", "charismatic", "charming", "cheerful", "clean", "clever", "colorful", "companionly", "compassionate", "conciliatory", "confident", "conscientious", "considerate", "constant", "contemplative", "cooperative", "courageous", "courteous", "creative", "cultured", "curious", "daring", "debonair", "decent", "decisive", "dedicated", "deep", "dignified", "directed", "disciplined", "discreet", "dramatic", "dutiful", "dynamic", "earnest", "ebullient", "educated", "efficient", "elegant", "eloquent", "empathetic", "energetic", "enthusiastic", "esthetic", "exciting", "extraordinary", "fair", "faithful", "farsighted", "felicific", "firm", "flexible", "focused", "forecful", "forgiving", "forthright", "freethinking", "friendly", "gallant", "generous", "gentle", "genuine", "gracious", "hardworking", "healthy", "hearty", "helpful", "herioc", "honest", "honorable", "humble", "humorous", "idealistic", "imaginative", "impressive", "incisive", "incorruptible", "independent", "individualistic", "innovative", "inoffensive", "insightful", "insouciant", "intelligent", "intuitive", "invulnerable", "kind", "knowledge", "leaderly", "leisurely", "liberal", "logical", "lovable", "loyal", "lyrical", "magnanimous", "masculine", "mature", "methodical", "maticulous", "moderate", "modest", "neat", "nonauthoritarian", "objective", "observant", "open", "optimistic", "orderly", "organized", "original", "painstaking", "passionate", "patient", "patriotic", "peaceful", "perceptive", "perfectionist", "personable", "persuasive", "planful", "playful", "polished", "popular", "practical", "precise", "principled", "profound", "protean", "protective", "providential", "prudent", "punctual", "pruposeful", "rational", "realistic", "reflective", "relaxed", "reliable", "resourceful", "respectful", "responsible", "responsive", "reverential", "romantic", "rustic", "sage", "sane", "scholarly", "scrupulous", "secure", "selfless", "sensitive", "sentimental", "seraphic", "serious", "sexy", "sharing", "shrewd", "simple", "skillful", "sober", "sociable", "solid", "sophisticated", "spontaneous", "sporting", "stable", "steadfast", "steady", "stoic", "strong", "studious", "suave", "subtle", "sweet", "sympathetic", "systematic", "tasteful", "teacherly", "thorough", "tidy", "tolerant", "tractable", "trusting", "uncomplaining", "understanding", "undogmatic", "unfoolable", "upright", "urbane", "venturesome", "vivacious", "warm", "winning", "wise", "witty", "youthful", "absentminded", "aggressive", "ambitious", "amusing", "artful", "ascetic", "authoritarian", "boyish", "breezy", "businesslike", "busy", "casual", "crebral", "chummy", "circumspect", "competitive", "complex", "confidential", "conservative", "contradictory", "crisp", "cute", "deceptive", "determined", "dominating", "dreamy", "driving", "droll", "dry", "earthy", "effeminate", "emotional", "enigmatic", "experimental", "familial", "folksy", "formal", "freewheeling", "frugal", "glamorous", "guileless", "huried", "hypnotic", "iconoclastic", "idiosyncratic", "impassive", "impersonal", "impressionable", "intense", "invisible", "irreligious", "irreverent", "maternal", "mellow", "modern", "moralistic", "mystical", "neutral", "noncommittal", "noncompetitive", "obedient", "ordinary", "outspoken", "paternalistic", "physical", "placid", "political", "predictable", "preoccupied", "private", "progressive", "proud", "pure", "questioning", "quiet", "religious", "reserved", "restrained", "retiring", "sarcastic", "sensual", "skeptical", "smooth", "soft", "solemn", "solitary", "stern", "stoiid", "strict", "stubborn", "stylish", "subjective", "surprising", "soft", "tough", "unaggressive", "unambitious", "unceremonious", "unchanging", "undemanding", "unfathomable", "unhurried", "uninhibited", "unpatriotic", "unpredicatable", "unreligious", "unsentimental", "whimsical", "abrasive", "abrupt", "agonizing", "aimless", "airy", "aloof", "amoral", "angry", "anxious", "apathetic", "arbitrary", "argumentative", "arrogantt", "artificial", "asocial", "assertive", "astigmatic", "barbaric", "bewildered", "bizarre", "bland", "blunt", "biosterous", "brittle", "brutal", "calculating", "callous", "cantakerous", "careless", "cautious", "charmless", "childish", "clumsy", "coarse", "cold", "colorless", "complacent", "complaintive", "compulsive", "conceited", "condemnatory", "conformist", "confused", "contemptible", "conventional", "cowardly", "crafty", "crass", "crazy", "criminal", "critical", "crude", "cruel", "cynical", "decadent", "deceitful", "delicate", "demanding", "dependent", "desperate", "destructive", "devious", "difficult", "dirty", "disconcerting", "discontented", "discouraging", "discourteous", "dishonest", "disloyal", "disobedient", "disorderly", "disorganized", "disputatious", "disrespectful", "disruptive", "dissolute", "dissonant", "distractible", "disturbing", "dogmatic", "domineering", "dull", "egocentric", "enervated", "envious", "erratic", "escapist", "excitable", "expedient", "extravagant", "extreme", "faithless", "false", "fanatical", "fanciful", "fatalistic", "fawning", "fearful", "fickle", "fiery", "fixed", "flamboyant", "foolish", "forgetful", "fraudulent", "frightening", "frivolous", "gloomy", "graceless", "grand", "greedy", "grim", "gullible", "hateful", "haughty", "hedonistic", "hesitant", "hidebound", "hostile", "ignorant", "imitative", "impatient", "impractical", "imprudent", "impulsive", "inconsiderate", "incurious", "indecisive", "indulgent", "inert", "inhibited", "insecure", "insensitive", "insincere", "insulting", "intolerant", "irascible", "irrational", "irresponsible", "irritable", "lazy", "libidinous", "loquacious", "malicious", "mannered", "mannerless", "mawkish", "mealymouthed", "mechanical", "meddlesome", "melancholic", "meretricious", "messy", "miserable", "miserly", "misguided", "mistaken", "monstrous", "moody", "morbid", "naive", "narcissistic", "narrow", "natty", "negativistic", "neglectful", "neurotic", "nihilistic", "obnoxious", "obsessive", "obvious", "odd", "offhand", "opinionated", "opportunistic", "oppressed", "outrageous", "overimaginative", "paranoid", "passive", "pedantic", "perverse", "petty", "pharissical", "phlegmatic", "plodding", "pompous", "possessive", "predatory", "prejudiced", "presumptuous", "pretentious", "prim", "procrastinating", "profligate", "provocative", "pugnacious", "puritanical", "quirky", "reactionary", "reactive", "regimental", "regretful", "repentant", "repressed", "resentful", "ridiculous", "rigid", "ritualistic", "rowdy", "ruined", "sadistic", "sanctimonious", "scheming", "scornful", "secretive", "sedentary", "selfish", "shallow", "shortsighted", "shy", "silly", "sloppy", "slow", "sly", "softheaded", "sordid", "steely", "stiff", "stupid", "submissive", "superficial", "superstitious", "suspicious", "tactless", "tasteless", "tense", "thievish", "thoughtless", "timid", "transparent", "treacherous", "trendy", "troublesome", "unappreciative", "uncaring", "uncharitable", "unconvincing", "uncooperative", "uncreative", "uncritical", "unctuous", "undisciplined", "unfriendly", "ungrateful", "unhealthy", "unimaginative", "unimpressive", "unlovable", "unpolished", "unprincipled", "unrealistic", "unreflective", "unreliable", "unrestrained", "unstable", "vacuous", "vague", "venal", "venomous", "vindictive", "vulnerable", "weak", "willful", "wishful", "zany"],
	  objects: ['canteen', 'fire', 'flag', 'fork', 'goblet', 'knife', 'mug', 'pole', 'spoon', 'stein', 'sword', 'spear', 'knife', 'dagger', 'rapier', 'halberd', 'pike', 'shield', 'apple', 'pint', 'rapier', 'plate', 'bowl', 'candle', 'lantern', 'hearth', 'flame', 'book', 'scroll', 'potion', 'medic', 'copper', 'nail', 'sieve', 'castle', 'tower', 'mountain', 'flagstaff', 'breastplate', 'bodkin', 'arrow', 'bolt', 'net', 'vial', 'shovel', 'hatchet', 'pick'],
	  menuItems: [{ name: 'Ale', weight: 8.0, price: 0.02 }, { name: 'Lager', weight: 6.0, price: 0.03 }, { name: 'Stout', weight: 2.0, price: 0.04 }, { name: 'Mead', weight: 6.0, price: 0.01 }, { name: 'Cherry Mead', weight: 1.0, price: 0.10 }, { name: 'Cider', weight: 3.0, price: 0.08 }, { name: 'Rum', weight: 1.0, price: 0.1 }, { name: 'Wine', weight: 4.0, price: 0.1 }, { name: 'Hooch', weight: 1.5, price: 0.05 }]
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map