import {BaseCategory} from './BaseCategory';
import {getLabel} from "./PdfRenderer";

const fields = ['accuracy', 'technical', 'intangible', 'drinkability', 'feedback', 'score'];

const ACCURACY_OPTIONS = [
  {id: undefined, text: ''},
  {id: 0, text: `Wrong Category`},
  {id: 1, text: 'Not to Style'},
  {id: 2, text: 'Style Deficiency'},
  {id: 3, text: 'Almost on Target'},
  {id: 4, text: 'Classic'},
  {id: 5, text: 'World class'}
];

const TECHNICAL_OPTIONS = [
  {id: undefined, text: ''},
  {id: 1, text: 'Significant Flaws'},
  {id: 3, text: 'Few Flaws'},
  {id: 4, text: 'Minor Flaws'},
  {id: 5, text: 'Flawless'}
];

const INTANGIBLE_OPTIONS = [
  {id: undefined, text: ''},
  {id: 0, text: 'Lifeless'},
  {id: 1, text: `Missing Complexity`},
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
    this.required.length = 0;
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

}

function renderOverall(renderer, overall) {
  renderer.addSection('Overall Impression', overall.score, 10);
  renderer.addHeadline('Accuracy', [getLabel(ACCURACY_OPTIONS, overall.accuracy)]);
  renderer.addHeadline('Technical Merit', [getLabel(TECHNICAL_OPTIONS, overall.technical)]);
  renderer.addHeadline('Drinkability', [getLabel(DRINKABILITY_OPTIONS, overall.drinkability)]);
  renderer.addHeadline('Intangible', [getLabel(INTANGIBLE_OPTIONS, overall.intangible)]);
  renderer.addHeadline('Feedback', [overall.feedback !== undefined ? overall.feedback : '']);
}

export {
  Overall as OverallDto,
  renderOverall,
  ACCURACY_OPTIONS,
  DRINKABILITY_OPTIONS,
  INTANGIBLE_OPTIONS,
  TECHNICAL_OPTIONS
}
