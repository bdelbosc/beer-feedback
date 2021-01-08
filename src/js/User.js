import {BaseCategory} from './BaseCategory';
import {getLabel} from "./PdfRenderer";

const fields = ['name', 'rank'];

const RANK_OPTIONS = [
  {id: undefined, text: ''},
  {id: 'none', text: 'No Rank'},
  {id: 'home-brewer', text: 'Home Brewer'},
  {id: 'professional', text: 'Professional Brewer'},
  {id: 'beer-sommelier', text: 'Beer Sommelier'},
  {id: 'cicerone', text: 'Cicerone'},
  {id: 'gabf-wbc', text: 'GABF/WBC'},
  {id: 'bjcp-novice', text: `BJCP Novice`},
  {id: 'bjcp-apprentice', text: `BJCP Apprentice`},
  {id: 'bjcp-pending', text: 'BJCP Rank Pending'},
  {id: 'bjcp-recognized', text: `BJCP Recognized`},
  {id: 'bjcp-certified', text: `BJCP Certified`},
  {id: 'bjcp-national', text: `BJCP National`},
  {id: 'bjcp-master', text: `BJCP Master`},
  {id: 'bjcp-grand-master', text: `BJCP Grand Master`},
  {id: 'other', text: 'Other'},
  ];

class User extends BaseCategory {

  constructor() {
    super();
    const username = localStorage.getItem('userName')
    if (username) this.name = username;
    const rank = localStorage.getItem('userRank')
    if (rank) this.rank = rank;
    const comment = localStorage.getItem('userComment')
    if (comment)
      this.comment = comment;
    else
      this.comment = '';
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
    if (this.name !== undefined && this.name.trim().length == 0) {
      this.required.push("name");
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
    if (this.comment)
      localStorage.setItem('userComment', this.comment.toString());
    else
      localStorage.removeItem('userComment');
  }

  render(renderer, start) {
    renderer.addUser(this.name, getLabel(RANK_OPTIONS, this.rank), this.comment, start);
  }

}

export {User as UserDto, RANK_OPTIONS}
