import {BaseCategory} from './BaseCategory';

const fields = ['body', 'carbonation', 'warmth', 'creaminess', 'astringency', 'other'];

const BODY_OPTIONS = [
  {id: undefined, text: ''},
  {id: 0, text: 'Watery'},
  {id: 1, text: `Thin`},
  {id: 2, text: 'Light'},
  {id: 3, text: 'Medium'},
  {id: 4, text: 'Medium-Full'},
  {id: 5, text: 'Full'}
];

const CARBONATION_OPTIONS = [
  {id: undefined, text: ''},
  {id: 0, text: 'None'},
  {id: 1, text: `Low`},
  {id: 2, text: 'Medium Low'},
  {id: 3, text: 'Medium'},
  {id: 4, text: 'Medium-High'},
  {id: 5, text: 'High'}
];

const WARMTH_OPTIONS = [
  {id: undefined, text: ''},
  {id: 0, text: 'None'},
  {id: 1, text: `Low`},
  {id: 2, text: `Medium Low`},
  {id: 3, text: 'Medium'},
  {id: 4, text: 'Medium Hot'},
  {id: 5, text: 'Hot'},
];

const CREAMINESS_OPTIONS = [
  {id: undefined, text: ''},
  {id: 0, text: 'None'},
  {id: 1, text: `Low`},
  {id: 2, text: 'Medium Low'},
  {id: 3, text: 'Medium'},
  {id: 4, text: 'Medium-High'},
  {id: 5, text: 'High'}
]

const ASTRINGENCY_OPTIONS = [
  {id: 0, text: 'None'},
  {id: 1, text: `Low`},
  {id: 2, text: 'Medium Low'},
  {id: 3, text: 'Medium'},
  {id: 4, text: 'Medium-High'},
  {id: 5, text: 'High'}
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
  Mouthfeel as MouthfeelDto,
  ASTRINGENCY_OPTIONS,
  BODY_OPTIONS,
  CARBONATION_OPTIONS,
  CREAMINESS_OPTIONS,
  WARMTH_OPTIONS
}