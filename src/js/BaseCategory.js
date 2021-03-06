const LEVELS = ["None", "Low", "Medium-Low", "Medium", "Medium-High", "High"];

const categoryRank = function (category) {
  if (category === "malt") return 100;
  if (category === "hops") return 90;
  if (category === "fermentation") return 80;
  if (category === "others") return 70;
  if (category === "flaws") return 50;
  return 10;
}

const compareCategory = function compare(a, b) {
  const aa = categoryRank(a.category) + a.level;
  const bb = categoryRank(b.category) + b.level;
  if (bb > aa) return 1;
  if (aa > bb) return -1;
  return 0;
}

class BaseCategory {

  constructor() {
    this.completed = false;
    this.updated = true;
    this.required = [];
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

  updateHandler() {
    this.updated = true;
  }

  checkCompletion() {
    alert("Not implemented");
  }

  flushFields(fields) {
    for (let i=0; i<fields.length; i++) {
      if (this.hasOwnProperty(fields[i])) {
        delete this[fields[i]];
      }
    }
    this.updated = true;
    this.completed = false;
  }
}

export {BaseCategory, compareCategory, LEVELS};
