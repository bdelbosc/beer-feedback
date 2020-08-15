import {BaseCategory} from './BaseCategory';
import {getLabel} from "./PdfRenderer";

const fields = ['name', 'rank'];

const RANK_OPTIONS = [
  {id: undefined, text: ''},
  {id: 'none', text: 'No Rank'},
  {id: 'bjcp-novice', text: `BJCP Novice`},
  {id: 'bjcp-apprentice', text: `BJCP Apprentice`},
  {id: 'bjcp-pending', text: 'BJCP Rank Pending'},
  {id: 'bjcp-recognized', text: `BJCP Recognized`},
  {id: 'bjcp-certified', text: `BJCP Certified`},
  {id: 'bjcp-national', text: `BJCP National`},
  {id: 'bjcp-master', text: `BJCP Master`},
  {id: 'bjcp-grand-master', text: `BJCP Grand Master`},
  {id: 'gabf-wbc', text: 'GABF/WBC'},
  {id: 'professinal', text: 'Professional Brewer'},
  {id: 'cicerone', text: 'Cicerone'},
  {id: 'beer-sommelier', text: 'Beer Sommelier'},
  {id: 'other', text: 'Other'}
];

class User extends BaseCategory {

  constructor() {
    super();
    const username = localStorage.getItem('userName')
    if (username) this.name = username;
    const rank = localStorage.getItem('userRank')
    if (rank) this.rank = rank;
  }

  checkCompletion() {
    this.required.length = 0;
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
    console.info("Saving user: " + this.name + ", rank: " + this.rank);
    if (this.name)
      localStorage.setItem('userName', this.name);
    else
      localStorage.removeItem('userName');
    if (this.rank)
      localStorage.setItem('userRank', this.rank.toString());
    else
      localStorage.removeItem('userRank');
  }
}

function renderUser(renderer, user) {
  renderer.addUser(user.name, getLabel(RANK_OPTIONS, user.rank));
}

export {User as UserDto, renderUser, RANK_OPTIONS}
