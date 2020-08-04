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
    console.log("Update");
    console.log(this);
  }

  checkCompletion() {
    alert("Not implemented");
  }
}

export {BaseCategory, compareCategory};
