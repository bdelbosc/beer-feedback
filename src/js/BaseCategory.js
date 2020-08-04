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

export {BaseCategory};
