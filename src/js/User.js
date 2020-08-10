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
    const username = localStorage.getItem('userName')
    if (username) this.name = username;
    const rank = localStorage.getItem('userRank')
    if (rank)
      this.rank =  parseInt(rank);
    else
      this.rank = 0;
    console.log("rank :" + this.rank  + " " + rank)
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
      if (this[fields[i]] === undefined || this[fields[i]].length == 0) {
        this.required.push(fields[i]);
      }
    }
    this.completed = (this.required.length === 0);
  }

  updateHandler(sort = false) {
    super.updateHandler();
  }

  save() {
    console.log("Saving user");
    console.log(user);
    localStorage.setItem('userName', this.name);
    localStorage.setItem('userRank', this.rank.toString());
  }
}

function renderUser(renderer, user) {
  renderer.addUser(user.name, getLabel(RANK_OPTIONS, user.rank));
}

export {User as UserDto, renderUser, RANK_OPTIONS}
