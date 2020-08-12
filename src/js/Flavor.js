import {BaseCategory, compareCategory, LEVELS} from './BaseCategory';
import {getLabel} from "./PdfRenderer";

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
  {id: 'sour', text: `Sour`},
  {id: 'fermentation', text: `Fermentation Forward`},
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
    this.flush();
  }

  flush() {
    this.flushFields(fields);
    this.flavors = [];
    this.bitternessInappropriate = false;
    this.balanceInappropriate = false;
    this.finishInappropriate = false;
  }

  load(json) {
    this.flavors = json.flavors;
    this.bitterness = json.bitterness;
    this.bitternessInappropriate = json.bitternessInappropriate;
    this.balance = json.balance;
    this.balanceInappropriate = json.balanceInappropriate;
    this.finish = json.finish;
    this.finishInappropriate = json.finishInappropriate;
    this.score = json.score;
    this.updateHandler();
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

function getFlavor(flavor, flaws = false) {
  let desc = LEVELS[flavor.level] + ' ' + flavor.trait;
  if (flavor.trait.trim() === 'Not Found') desc = 'Not detected';
  if (flavor.trait.trim() === 'Clean') desc = 'Clean';
  if (flavor.aftertaste) desc += ' aftertaste';
  if (flavor.inappropriate || flaws) desc += ' INAPPROPRIATE';
  return desc;
}

function renderFlavor(renderer, flavor) {
  renderer.addSection('Flavor', flavor.score, 20);
  let items = [];
  flavor.flavors.filter(f => f.category === 'malt').forEach(f => items.push(getFlavor(f)));
  renderer.addHeadline('Malt', items);
  items.length = 0;
  flavor.flavors.filter(f => f.category === 'hops').forEach(f => items.push(getFlavor(f)));
  renderer.addHeadline('Hops', items);
  items.length = 0;
  flavor.flavors.filter(f => f.category === 'fermentation').forEach(f => items.push(getFlavor(f)));
  renderer.addHeadline('Fermentation', items);
  items.length = 0;
  flavor.flavors.filter(f => f.category === 'others').forEach(f => items.push(getFlavor(f)));
  renderer.addHeadline('Other', items);
  items.length = 0;
  flavor.flavors.filter(f => f.category === 'flaws').forEach(f => items.push(getFlavor(f, true)));
  renderer.addHeadline('Flaws', items);

  renderer.addHeadline('Bitterness', [getLabel(BITTERNESS_OPTIONS, flavor.bitterness, flavor.bitternessInappropriate)]);
  renderer.addHeadline2('Balance', [getLabel(BALANCE_OPTIONS, flavor.balance, flavor.balanceInappropriate)]);
  renderer.addHeadline('Finish', [getLabel(DRYNESS_OPTIONS, flavor.finish, flavor.finishInappropriate)]);

}

export {Flavor as FlavorDto, renderFlavor, BALANCE_OPTIONS, BITTERNESS_OPTIONS, DRYNESS_OPTIONS}
