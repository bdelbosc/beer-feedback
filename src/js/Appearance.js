const fields = ['color', 'head', 'clarity', 'hue', 'retention', 'texture', 'legs', 'laces'];

class Appearance {

  constructor() {
    this.completed = false;
    this.updated = true;
    this.required = [];
    // fields with default values
    this.laces = false;
    this.legs = false;
  }

  isUpdated() {
    return this.updated;
  }

  isCompleted() {
    if (this.updated) {
      this.checkCompletion();
      this.updated = false;
    }
    return this.completed;
  }

  getRequired() {
    return this.required;
  }

  update() {
    this.updated = true;
  }

  checkCompletion() {
    console.log("checkCompletion");
    this.required.length = 0;
    for (var i = 0; i < fields.length; i++) {
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
    this.completed = this.required.length == 0;
  }
}

export {Appearance as AppearanceDto}
