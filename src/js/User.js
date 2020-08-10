import {BaseCategory} from './BaseCategory';
import {getLabel} from "./PdfRenderer";

const fields = ['name', 'rank'];

const RANK_OPTIONS = [
  {id: 0, text: 'None'},
  {id: 1, text: `BJCP Novice`},
  {id: 2, text: `BJCP Apprentice`},
  {id: 3, text: 'BJCP Rank Pending'},
  {id: 4, text: `BJCP Recognized`},
  {id: 5, text: `BJCP Certified`},
  {id: 6, text: `BJCP National`},
  {id: 7, text: `BJCP Master`},
  {id: 8, text: `BJCP Grand Master`},
  {id: 9, text: 'Cicerone'},
  {id: 10, text: 'Professional'}
];

class User extends BaseCategory {

  constructor() {
    super();
    // fields with default values
    this.rank = 0;
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

function renderUser(renderer, user) {
  renderer.addUser(user.name, getLabel(RANK_OPTIONS, user.rank));
}

export {User as UserDto, renderUser, RANK_OPTIONS}
