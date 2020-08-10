import {BaseCategory, compareCategory} from './BaseCategory';

const fields = ['bitterness', 'balance', 'finish', 'score'];

const BITTERNESS_OPTIONS = [
  {id: undefined, text: ''},
  {id: 0, text: 'None'},
  {id: 1, text: `Low`},
  {id: 2, text: 'Medium-Low'},
  {id: 3, text: 'Medium'},
  {id: 4, text: 'Medium-High'},
  {id: 5, text: 'High'}
];

const BALANCE_OPTIONS = [
  {id: undefined, text: ''},
  {id: 'malty', text: `Malty`},
  {id: 'slightly-malt', text: `Slightly Malty`},
  {id: 'even', text: `Even`},
  {id: 'slightly-hoppy', text: `Slightly Hoppy`},
  {id: 'hoppy', text: `Hoppy`},
  {id: 'sligthly-sour', text: `Slightly Sour`},
  {id: 'sour', text: `Sour`}
];

const DRYNESS_OPTIONS = [
  {id: undefined, text: ''},
  {id: 0, text: `Biting`},
  {id: 1, text: `Dry`},
  {id: 2, text: `Balanced`},
  {id: 3, text: `Soft`},
  {id: 4, text: `Sweet`},
  {id: 5, text: `Cloying`},
];

class Flavor extends BaseCategory {

  constructor() {
    super();
    // fields with default values
    this.flavors = [];
    this.bitternessInappropriate = false;
    this.balanceInappropriate = false;
    this.finishInappropriate = false;
  }

  checkCompletion() {
    this.required.length = 0;
    // check for flavors categories
    let categories = [];
    for (let i = 0; i < this.flavors.length; i++) {
      if (!categories.includes(this.flavors[i].category)) {
        categories.push(this.flavors[i].category);
      }
    }
    if (!categories.includes("malt")) {
      this.required.push('malt');
    }
    if (!categories.includes("hops")) {
      this.required.push('hops');
    }
    if (!categories.includes("fermentation")) {
      this.required.push('fermentation');
    }
    // check other props
    for (let i = 0; i < fields.length; i++) {
      if (!this.hasOwnProperty(fields[i])) {
        this.required.push(fields[i]);
        continue;
      }
      if (this[fields[i]] === undefined) {
        this.required.push(fields[i]);
      }
    }
    this.completed = (this.required.length === 0);
  }

  updateHandler(sort = false) {
    super.updateHandler();
    if (sort) {
      this.flavors.sort(compareCategory);
    }
  }
}

function renderFlavor(renderer, flavor) {
  renderer.addSection('Flavor', flavor.score, 20);
  let items = [];
  flavor.flavors.filter(a => a.category === 'malt').forEach(a => items.push(levels[a.level] + ' ' + a.trait));
  renderer.addHeadline('Malt', items);
  items.length = 0;
  flavor.flavors.filter(a => a.category === 'hops').forEach(a => items.push(levels[a.level] + ' ' + a.trait));
  renderer.addHeadline('Hops', items);
  items.length = 0;
  flavor.flavors.filter(a => a.category === 'fermentation').forEach(a => items.push(levels[a.level] + ' ' + a.trait));
  renderer.addHeadline('Fermentation', items);
  items.length = 0;
  flavor.flavors.filter(a => a.category === 'others').forEach(a => items.push(levels[a.level] + ' ' + a.trait));
  renderer.addHeadline('Other', items);
  items.length = 0;
  flavor.flavors.filter(a => a.category === 'flaws').forEach(a => items.push(levels[a.level] + ' ' + a.trait));
  renderer.addHeadline('Flaws', items);


}

export {Flavor as FlavorDto, renderFlavor, BALANCE_OPTIONS, BITTERNESS_OPTIONS, DRYNESS_OPTIONS}
