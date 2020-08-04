const fields = ['bitterness', 'balance', 'finish'];
import {BaseCategory} from './BaseCategory';

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
    console.log("checkCompletion flavor");
    this.required.length = 0;
    for (let i = 0; i < fields.length; i++) {
      if (!this.hasOwnProperty(fields[i])) {
        this.required.push(fields[i]);
        console.log(fields[i] + " no props");
        continue;
      }
      if (this[fields[i]] === undefined) {
        this.required.push(fields[i]);
        console.log(fields[i] + " undefined");
      }
    }
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
    this.completed = (this.required.length === 0);
  }
}

export {Flavor as FlavorDto}
