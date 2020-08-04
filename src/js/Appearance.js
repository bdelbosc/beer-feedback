import {BaseCategory} from './BaseCategory';

const fields = ['color', 'head', 'clarity', 'hue', 'retention', 'texture', 'legs', 'laces'];

const HEAD_OPTIONS = [
  {id: undefined, text: ''},
  {id: 'white', text: `White`},
  {id: 'ivory', text: `Ivory`},
  {id: 'beige', text: `Beige`},
  {id: 'tan', text: `Tan`},
  {id: 'brown', text: `Brown`}
];

const HUE_OPTIONS = [
  {id: 'none', text: ''},
  {id: 'copper', text: `Copper`},
  {id: 'red', text: `Red`},
  {id: 'garnet', text: `Garnet`},
];

const CLARITY_OPTIONS = [
  {id: undefined, text: ''},
  {id: 'brillant', text: `Brillant`},
  {id: 'clear', text: `Clear`},
  {id: 'hazy', text: `Hazy`},
  {id: 'cloudy', text: `Cloudy`},
  {id: 'opaque', text: `Opaque`}
];

const RETENTION_OPTIONS = [
  {id: undefined, text: ''},
  {id: 1, text: `Poor`},
  {id: 3, text: `Average`},
  {id: 5, text: `Long lasting`}
];

const TEXTURE_OPTIONS = [
  {id: undefined, text: ''},
  {id: 'thin', text: `Thin`},
  {id: 'frothy', text: `Frothy`},
  {id: 'creamy', text: `Creamy`},
  {id: 'dense', text: `Dense`},
  {id: 'rocky', text: `Rocky`},
  {id: 'bigbubbles', text: `Big bubbles`}
];

class Appearance extends BaseCategory {

  constructor() {
    super();
    // fields with default values
    this.hue = 'none';
    this.laces = false;
    this.legs = false;
  }

  checkCompletion() {
    console.log("checkCompletion appearance");
    this.required.length = 0;
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

export {Appearance as AppearanceDto, CLARITY_OPTIONS, HEAD_OPTIONS, HUE_OPTIONS, RETENTION_OPTIONS, TEXTURE_OPTIONS}
