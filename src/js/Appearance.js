import {BaseCategory} from './BaseCategory';
import {getLabel} from "./PdfRenderer";

const fields = ['color', 'head', 'clarity', 'hue', 'retention', 'texture', 'legs', 'laces', 'score'];

const HEAD_OPTIONS = [
  {id: undefined, text: ''},
  {id: 'white', text: `White`},
  {id: 'ivory', text: `Ivory`},
  {id: 'beige', text: `Beige`},
  {id: 'tan', text: `Tan`},
  {id: 'brown', text: `Brown`}
];

const HUE_OPTIONS = [
  {id: 'none', text: 'None'},
  {id: 'orange', text: 'Orange'},
  {id: 'amber', text: `Amber`},
  {id: 'copper', text: `Copper`},
  {id: 'red', text: `Red`},
  {id: 'ruby', text: `Ruby`},
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
  {id: 0, text: `None`},
  {id: 1, text: `Poor`},
  {id: 2, text: `Medium-Low`},
  {id: 3, text: `Average`},
  {id: 4, text: `Good`},
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

function getColor(srm) {
  if (srm <= 2) return 'Pale Straw';
  if (srm == 3) return 'Straw';
  if (srm == 4) return 'Pale Gold';
  if (srm <= 6) return 'Deep Gold';
  if (srm <= 9) return 'Pale Amber';
  if (srm <= 12) return 'Medium Amber';
  if (srm <= 15) return 'Deep Amber';
  if (srm <= 18) return 'Amber-Brown';
  if (srm <= 20) return 'Brown';
  if (srm <= 24) return 'Ruby Brown';
  if (srm <= 30) return 'Deep Brown';
  return 'Black';
}

class Appearance extends BaseCategory {

  constructor() {
    super();
    this.flush();
  }

  flush() {
    this.flushFields(fields);
    this.hue = 'none';
    this.laces = false;
    this.legs = false;
  }

  load(json) {
    this.score = json.score;
    this.hue = json.hue;
    this.legs = json.legs;
    this.laces = json.laces;
    this.color = json.color;
    this.head = json.head;
    this.retention = json.retention;
    this.texture = json.texture;
    this.clarity = json.clarity;
    this.updateHandler();
  }

  checkCompletion() {
    this.required.length = 0;
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
    renderer.addSection('Appearance', this.score, 3);
    let color = [];
    if (this.color !== undefined) color.push(getColor(this.color) + " (" + this.color + ' SRM)');
    if (this.hue !== 'none') color.push(getLabel(HUE_OPTIONS, this.hue) + ' hue');
    renderer.addHeadline('Color', color);
    let clarity = [];
    if (this.clarity !== undefined) clarity.push(getLabel(CLARITY_OPTIONS, this.clarity));
    renderer.addHeadline2('Clarity', clarity);
    let head = [];
    if (this.head !== undefined) head.push(getLabel(HEAD_OPTIONS, this.head));
    renderer.addHeadline('Head', head);
    let texture = [];
    if (this.texture !== undefined) texture.push(getLabel(TEXTURE_OPTIONS, this.texture));
    renderer.addHeadline2('Texture', texture);
    let retention = [];
    if (this.retention !== undefined) retention.push(getLabel(RETENTION_OPTIONS, this.retention));
    renderer.addHeadline('Retention', retention);
    let other = [];
    if (this.laces && this.legs) other.push('Laces and legs!?');
    else if (this.laces) other.push('Laces cling on the glass');
    else if (this.legs) other.push('Legs');
    renderer.addHeadline2('Other', other);
  }

}


export {
  Appearance as AppearanceDto,
  getColor,
  CLARITY_OPTIONS,
  HEAD_OPTIONS,
  HUE_OPTIONS,
  RETENTION_OPTIONS,
  TEXTURE_OPTIONS
}
