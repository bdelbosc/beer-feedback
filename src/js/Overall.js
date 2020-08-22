import {BaseCategory} from './BaseCategory';
import {getLabel, getScore, getScoreDescription} from "./PdfRenderer";
import faultData from '../data/fault-data.json';

const fields = ['accuracy', 'technical', 'intangible', 'drinkability', 'feedback', 'score'];

const ACCURACY_OPTIONS = [
  {id: undefined, text: ''},
  {id: 0, text: `Wrong Category`},
  {id: 1, text: 'Not to Style'},
  {id: 2, text: 'Style Deficiency'},
  {id: 3, text: 'Almost on Target'},
  {id: 4, text: 'Classic'},
  {id: 5, text: 'World Class'}
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
  {id: 4, text: 'I would drink a yard glass'}
];


class Overall extends BaseCategory {

  constructor() {
    super();
    this.flush();
    const jsonText = localStorage.getItem('overall');
    if (jsonText) {
      this.load(JSON.parse(unescape(jsonText)));
    }
  }

  flush() {
    this.flushFields(fields);
    this.feedback = '';
  }

  load(json) {
    this.score = json.score;
    this.feedback = json.feedback;
    this.accuracy = json.accuracy;
    this.technical = json.technical;
    this.intangible = json.intangible;
    this.drinkability = json.drinkability;
    this.updateHandler();
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

  getFaults(aroma, flavor) {
    let failures = new Set(aroma.getFailures());
    flavor.getFailures().forEach(item => failures.add(item));
    const solutions = [];
    failures.forEach(f => solutions.push(getFault(f)));
    return solutions;
  }

  render(renderer, score) {
    renderer.addSection('Overall Impression', this.score, 10);
    renderer.addHeadline('Accuracy', [getLabel(ACCURACY_OPTIONS, this.accuracy)]);
    renderer.addHeadline2('Technical Merit', [getLabel(TECHNICAL_OPTIONS, this.technical)]);
    renderer.addHeadline('Drinkability', [getLabel(DRINKABILITY_OPTIONS, this.drinkability)]);
    renderer.addHeadline2('Intangible', [getLabel(INTANGIBLE_OPTIONS, this.intangible)]);
    renderer.addHeadline('Scoring Guide', [getScore(score) + ': ' + getScoreDescription(score)]);
    renderer.addHeadline('Feedback', [this.feedback !== undefined ? this.feedback : '']);
  }

  save() {
    console.info("Saving overall");
    console.debug(this);
    const json = escape(JSON.stringify(this));
    localStorage.setItem('overall', json);
  }
}

function getFault(fault) {
  if (faultData[fault]) {
    return faultData[fault];
  }
  return {'name': fault, 'solution': '?', 'characteristic': ''}
}

export {
  Overall as OverallDto,
  ACCURACY_OPTIONS,
  DRINKABILITY_OPTIONS,
  INTANGIBLE_OPTIONS,
  TECHNICAL_OPTIONS
}
