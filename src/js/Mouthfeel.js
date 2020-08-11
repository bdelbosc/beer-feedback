import {BaseCategory} from './BaseCategory';
import {getLabel} from "./PdfRenderer";

const fields = ['body', 'carbonation', 'warmth', 'creaminess', 'astringency', 'other', 'score'];

const BODY_OPTIONS = [
  {id: undefined, text: ''},
  {id: 0, text: 'Watery'},
  {id: 1, text: `Thin`},
  {id: 2, text: 'Medium-Light'},
  {id: 3, text: 'Medium'},
  {id: 4, text: 'Medium-Full'},
  {id: 5, text: 'Full'}
];

const CARBONATION_OPTIONS = [
  {id: undefined, text: ''},
  {id: 0, text: 'None'},
  {id: 1, text: `Low`},
  {id: 2, text: 'Medium-Low'},
  {id: 3, text: 'Medium'},
  {id: 4, text: 'Medium-High'},
  {id: 5, text: 'High'}
];

const WARMTH_OPTIONS = [
  {id: undefined, text: ''},
  {id: 0, text: 'None'},
  {id: 1, text: `Low`},
  {id: 2, text: `Medium-Low`},
  {id: 3, text: 'Medium'},
  {id: 4, text: 'Medium-Hot'},
  {id: 5, text: 'Hot'},
];

const CREAMINESS_OPTIONS = [
  {id: undefined, text: ''},
  {id: 0, text: 'None'},
  {id: 1, text: `Low`},
  {id: 2, text: 'Medium-Low'},
  {id: 3, text: 'Medium'},
  {id: 4, text: 'Medium-High'},
  {id: 5, text: 'High'}
]

const ASTRINGENCY_OPTIONS = [
  {id: 0, text: 'None'},
  {id: 1, text: `Low`},
  {id: 2, text: 'Medium-Low'},
  {id: 3, text: 'Medium'},
  {id: 4, text: 'Medium-High'},
  {id: 5, text: 'Harsh'}
]

class Mouthfeel extends BaseCategory {

  constructor() {
    super();
    // fields with default values
    this.other = '';
    this.astringency = 0;
    this.bodyInappropriate = false;
    this.carbonationInappropriate = false;
    this.warmthInappropriate = false;
    this.creaminessInappropriate = false;
    this.astringencyInappropriate = false;
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

function renderMouthfeel(renderer, mouthfeel) {
  renderer.addSection('Mouthfeel', mouthfeel.score, 5);
  renderer.addHeadline('Body', [getLabel(BODY_OPTIONS, mouthfeel.body, mouthfeel.bodyInappropriate)]);
  renderer.addHeadline2('Creaminess', [getLabel(CREAMINESS_OPTIONS, mouthfeel.creaminess, mouthfeel.creaminessInappropriate)]);
  renderer.addHeadline('Carbonation', [getLabel(CARBONATION_OPTIONS, mouthfeel.carbonation, mouthfeel.carbonationInappropriate)]);
  renderer.addHeadline2('Astringency', [getLabel(ASTRINGENCY_OPTIONS, mouthfeel.astringency, mouthfeel.astringencyInappropriate)]);
  renderer.addHeadline('Warmth', [getLabel(WARMTH_OPTIONS, mouthfeel.warmth, mouthfeel.warmthInappropriate)]);
  renderer.addHeadline('Other', [(mouthfeel.other !== undefined ? mouthfeel.other : '')]);

}

export {
  Mouthfeel as MouthfeelDto,
  renderMouthfeel,
  ASTRINGENCY_OPTIONS,
  BODY_OPTIONS,
  CARBONATION_OPTIONS,
  CREAMINESS_OPTIONS,
  WARMTH_OPTIONS
}
