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
    this.flush();
    const jsonText = localStorage.getItem('mouthfeel');
    if (jsonText) {
      this.load(JSON.parse(unescape(jsonText)));
    }
  }

  flush() {
    this.flushFields(fields);
    this.other = '';
    this.astringency = 0;
    this.bodyInappropriate = false;
    this.carbonationInappropriate = false;
    this.warmthInappropriate = false;
    this.creaminessInappropriate = false;
    this.astringencyInappropriate = false;
  }

  load(json) {
    this.score = json.score;
    this.other = json.other;
    this.body = json.body;
    this.carbonation = json.carbonation;
    this.warmth = json.warmth;
    this.creaminess = json.creaminess;
    this.astringency = json.astringency;
    this.bodyInappropriate = json.bodyInappropriate;
    this.carbonationInappropriate = json.carbonationInappropriate;
    this.warmthInappropriate = json.warmthInappropriate;
    this.creaminessInappropriate = json.creaminessInappropriate;
    this.astringencyInappropriate = json.astringencyInappropriate;
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

  render(renderer) {
    renderer.addSection('Mouthfeel', this.score, 5);
    renderer.addHeadline('Body', [getLabel(BODY_OPTIONS, this.body, this.bodyInappropriate)]);
    renderer.addHeadline2('Creaminess', [getLabel(CREAMINESS_OPTIONS, this.creaminess, this.creaminessInappropriate)]);
    renderer.addHeadline('Carbonation', [getLabel(CARBONATION_OPTIONS, this.carbonation, this.carbonationInappropriate)]);
    renderer.addHeadline2('Astringency', [getLabel(ASTRINGENCY_OPTIONS, this.astringency, this.astringencyInappropriate)]);
    renderer.addHeadline('Warmth', [getLabel(WARMTH_OPTIONS, this.warmth, this.warmthInappropriate)]);
    if (this.other)
      renderer.addHeadlines('Other sensations', this.other !== undefined ? this.other : '');
  }

  save() {
    console.info("Saving mouthfeel");
    console.debug(this);
    const json = escape(JSON.stringify(this));
    localStorage.setItem('mouthfeel', json);
  }
}

export {
  Mouthfeel as MouthfeelDto,
  ASTRINGENCY_OPTIONS,
  BODY_OPTIONS,
  CARBONATION_OPTIONS,
  CREAMINESS_OPTIONS,
  WARMTH_OPTIONS
}
