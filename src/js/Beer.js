import {BaseCategory} from './BaseCategory';
import {getLabel} from "./PdfRenderer";

const fields = ['category', 'special', 'comment', 'entry'];

const CATEGORY_OPTIONS = [
  {id: undefined, text: ''},
  {id: '01-A', text: 'American'},
  {id: '25B', text: `Saison`},
];

class Beer extends BaseCategory {

  constructor() {
    super();
    // fields with default values
    this.special = '';
    this.comment = '';
  }

  checkCompletion() {
    this.required.length = 0;
    // check for flavors categories
    let categories = [];
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

function renderBeer(renderer, beer) {
  renderer.addBeer(beer.entry, getLabel(CATEGORY_OPTIONS, beer.category), beer.special, beer.comment);
}

export {Beer as BeerDto, renderBeer, CATEGORY_OPTIONS}
