import {BaseCategory} from './BaseCategory';

const fields = ['accuracy', 'technical', 'intangible', 'drinkability', 'feedback', 'score'];

const ACCURACY_OPTIONS = [
  {id: undefined, text: ''},
  {id: 0, text: `Enter in a wrong category`},
  {id: 1, text: 'Not to style'},
  {id: 2, text: 'Style deficiency'},
  {id: 3, text: 'Almost on target'},
  {id: 4, text: 'Classic'},
  {id: 5, text: 'World class'}
];

const TECHNICAL_OPTIONS = [
  {id: undefined, text: ''},
  {id: 1, text: 'Significant Flaws'},
  {id: 3, text: 'Few Flaws'},
  {id: 4, text: 'Minor Flaw'},
  {id: 5, text: 'Flawless'}
];

const INTANGIBLE_OPTIONS = [
  {id: undefined, text: ''},
  {id: 0, text: 'Lifeless'},
  {id: 1, text: `Poor`},
  {id: 2, text: `Average`},
  {id: 3, text: 'Good'},
  {id: 4, text: 'Great'},
  {id: 5, text: 'Wonderful'}
];

const DRINKABILITY_OPTIONS = [
  {id: undefined, text: ''},
  {id: 2, text: `I would finish this sample`},
  {id: 3, text: `I would drink a pint`},
  {id: 4, text: 'I would pay money'},
  {id: 5, text: 'Send me the recipe'}
];


class Overall extends BaseCategory {

  constructor() {
    super();
    // fields with default values
    this.feedback = '';
  }

  checkCompletion() {
    console.log("checkCompletion mouthfeel");
    this.required.length = 0;
    // check other props
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

export {
  Overall as OverallDto,
  ACCURACY_OPTIONS,
  DRINKABILITY_OPTIONS,
  INTANGIBLE_OPTIONS,
  TECHNICAL_OPTIONS
}
