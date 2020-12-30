const fields = ['score', 'comment'];
import {BaseCategory, compareCategory, LEVELS} from './BaseCategory';

class Aroma extends BaseCategory {

  constructor() {
    super();
    this.flush();
    const jsonText = localStorage.getItem('aroma');
    if (jsonText) {
      this.load(JSON.parse(unescape(jsonText)));
    }
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
      renderer.addHeadlines('Comments', this.comment);
  }

  getFailures() {
    let items = [];
    this.aromas.filter(a => a.category === 'flaws').forEach(a => items.push(getFailureName(a.trait.trim())));
    return items;
  }

  save() {
    console.info("Saving aroma");
    console.debug(this);
    const json = escape(JSON.stringify(this));
    localStorage.setItem('aroma', json);
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

function getFailureName(name) {
  if (name.startsWith("Phenolic")) return name;
  return name.split('/')[0];
}

export {Aroma as AromaDto, getFailureName}
