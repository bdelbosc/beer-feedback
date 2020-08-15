const fields = ['score', 'comment'];
import {BaseCategory, compareCategory, LEVELS} from './BaseCategory';

class Aroma extends BaseCategory {

  constructor() {
    super();
    this.flush();
  }

  flush() {
    this.flushFields(fields);
    this.aromas = [];
    this.comment = '';
  }

  load(json) {
    this.aromas = json.aromas;
    this.score = json.score;
    if (json.comment)
      this.comment = json.comment;
    else
      this.comment = '';
    this.updateHandler();
  }

  checkCompletion() {
    this.required.length = 0;
    for (let i = 0; i < fields.length; i++) {
      if (!this.hasOwnProperty(fields[i])) {
        this.required.push(fields[i]);
        continue;
      }
      if (this[fields[i]] === undefined) {
        this.required.push(fields[i]);
      }
    }
    // check for aromas categories
    let categories = [];
    for (let i = 0; i < this.aromas.length; i++) {
      if (!categories.includes(this.aromas[i].category)) {
        categories.push(this.aromas[i].category);
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
    this.completed = (this.required.length === 0);
  }

  updateHandler(sort = false) {
    super.updateHandler();
    if (sort) {
      this.aromas.sort(compareCategory);
    }
  }

  render(renderer) {
    renderer.addSection('Aroma', this.score, 12);
    let items = [];
    this.aromas.filter(a => a.category === 'malt').forEach(a => items.push(getAroma(a)));
    renderer.addHeadline('Malt', items);
    items.length = 0;
    this.aromas.filter(a => a.category === 'hops').forEach(a => items.push(getAroma(a)));
    renderer.addHeadline('Hops', items);
    items.length = 0;
    this.aromas.filter(a => a.category === 'fermentation').forEach(a => items.push(getAroma(a)));
    renderer.addHeadline('Fermentation', items);
    items.length = 0;
    this.aromas.filter(a => a.category === 'others').forEach(a => items.push(getAroma(a)));
    renderer.addHeadline('Other', items);
    items.length = 0;
    this.aromas.filter(a => a.category === 'flaws').forEach(a => items.push(getAroma(a, true)));
    renderer.addHeadline('Flaws', items);
    if (this.comment)
      renderer.addHeadline('Comments', [this.comment]);
  }
}

function getAroma(aroma, flaws = false) {
  let desc = LEVELS[aroma.level] + ' ' + aroma.trait;
  if (aroma.trait.trim() === 'Not Found') desc = 'Not detected';
  if (aroma.trait.trim() === 'Clean') desc = 'Clean';
  if (aroma.initial) desc += ' on first nose';
  if (aroma.warms) desc += ' when the beer warms';
  if (aroma.inappropriate || flaws) desc += ' INAPPROPRIATE';
  return desc;
}


export {Aroma as AromaDto}
