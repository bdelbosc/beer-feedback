const fields = ['color', 'head', 'clarity', 'hue', 'retention', 'texture', 'legs', 'laces'];
import {BaseCategory} from './BaseCategory';

class Appearance extends BaseCategory {

  constructor() {
    super();
    // fields with default values
    this.hue = 'none';
    this.laces = false;
    this.legs = false;
  }

  checkCompletion() {
    console.log("checkCompletion appearance");
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
    this.completed = (this.required.length === 0);
  }
}

export {Appearance as AppearanceDto}
