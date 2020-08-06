const fields = ['score'];
import {BaseCategory, compareCategory} from './BaseCategory';

class Aroma extends BaseCategory {

  constructor() {
    super();
    this.aromas = [];
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
}

export {Aroma as AromaDto}
