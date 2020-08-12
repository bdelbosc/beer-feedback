import {BaseCategory} from './BaseCategory';
import {getLabel} from "./PdfRenderer";

const fields = ['category', 'special', 'comment', 'entry'];

const CATEGORY_OPTIONS = [
  {id: undefined, text: ''},
  {id: "1A", text:"1A American Light Lager"},
  {id: "1B", text:"1B American Lager"},
  {id: "1C", text:"1C Cream Ale"},
  {id: "1D", text:"1D American Wheat Beer"},
  {id: "2A", text:"2A International Pale Lager"},
  {id: "2B", text:"2B International Amber Lager"},
  {id: "2C", text:"2C International Dark Lager"},
  {id: "3A", text:"3A Czech Pale Lager"},
  {id: "3B", text:"3B Czech Premium Pale Lager"},
  {id: "3C", text:"3C Czech Amber Lager"},
  {id: "3D", text:"3D Czech Dark Lager"},
  {id: "4A", text:"4A Munich Helles"},
  {id: "4B", text:"4B Festbier"},
  {id: "4C", text:"4C Helles Bock"},
  {id: "5A", text:"5A German Leichtbier"},
  {id: "5B", text:"5B Kölsch"},
  {id: "5C", text:"5C German Helles Exportbier"},
  {id: "5D", text:"5D German Pils"},
  {id: "6A", text:"6A Märzen"},
  {id: "6B", text:"6B Rauchbier"},
  {id: "6C", text:"6C Dunkles Bock"},
  {id: "7A", text:"7A Vienna Lager"},
  {id: "7B", text:"7B Altbier"},
  {id: "7C1", text:"7C1 Pale Kellerbier"},
  {id: "7C2", text:"7C2 Amber Kellerbier"},
  {id: "8A", text:"8A Munich Dunkel"},
  {id: "8B", text:"8B Schwarzbier"},
  {id: "9A", text:"9A Doppelbock"},
  {id: "9B", text:"9B Eisbock"},
  {id: "9C", text:"9C Baltic Porter"},
  {id: "10A", text:"10A Weissbier"},
  {id: "10B", text:"10B Dunkles Weissbier"},
  {id: "10C", text:"10C Weizenbock"},
  {id: "11A", text:"11A Ordinary Bitter"},
  {id: "11B", text:"11B Best Bitter"},
  {id: "11C", text:"11C Strong Bitter"},
  {id: "12A", text:"12A British Golden Ale"},
  {id: "12B", text:"12B Australian Sparkling Ale"},
  {id: "12C", text:"12C English IPA"},
  {id: "13A", text:"13A Dark Mild"},
  {id: "13B", text:"13B British Brown Ale"},
  {id: "13C", text:"13C English Porter"},
  {id: "14A", text:"14A Scottish Light"},
  {id: "14B", text:"14B Scottish Heavy"},
  {id: "14C", text:"14C Scottish Export"},
  {id: "15A", text:"15A Irish Red Ale"},
  {id: "15B", text:"15B Irish Stout"},
  {id: "15C", text:"15C Irish Extra Stout"},
  {id: "16A", text:"16A Sweet Stout"},
  {id: "16B", text:"16B Oatmeal Stout"},
  {id: "16C", text:"16C Tropical Stout"},
  {id: "16D", text:"16D Foreign Extra Stout"},
  {id: "17A1", text:"17A1 Burton Ale"},
  {id: "17B", text:"17B Old Ale"},
  {id: "17C", text:"17C Wee Heavy"},
  {id: "17D", text:"17D English Barleywine"},
  {id: "18A", text:"18A Blonde Ale"},
  {id: "18B", text:"18B American Pale Ale"},
  {id: "19A", text:"19A American Amber Ale"},
  {id: "19B", text:"19B California Common"},
  {id: "19C", text:"19C American Brown Ale"},
  {id: "20A", text:"20A American Porter"},
  {id: "20B", text:"20B American Stout"},
  {id: "20C", text:"20C Imperial Stout"},
  {id: "21A", text:"21A American IPA"},
  {id: "21B1", text:"21B1 Belgian IPA"},
  {id: "21B2", text:"21B2 Black IPA"},
  {id: "21B3", text:"21B3 Brown IPA"},
  {id: "21B4", text:"21B4 Red IPA"},
  {id: "21B5", text:"21B5 Rye IPA"},
  {id: "21B6", text:"21B6 White IPA"},
  {id: "21B7", text:"21B7 New England IPA"},
  {id: "22A", text:"22A Double IPA"},
  {id: "22B", text:"22B American Strong Ale"},
  {id: "22C", text:"22C American Barleywine"},
  {id: "22D", text:"22D Wheatwine"},
  {id: "23A", text:"23A Berliner Weisse"},
  {id: "23B", text:"23B Flanders Red Ale"},
  {id: "23C", text:"23C Oud Bruin"},
  {id: "23D", text:"23D Lambic"},
  {id: "23E", text:"23E Gueuze"},
  {id: "23F", text:"23F Fruit Lambic"},
  {id: "24A", text:"24A Witbier"},
  {id: "24B", text:"24B Belgian Pale Ale"},
  {id: "24C", text:"24C Bière de Garde"},
  {id: "25A", text:"25A Belgian Blonde Ale"},
  {id: "25B", text:"25B Saison"},
  {id: "25C", text:"25C Belgian Golden Strong Ale"},
  {id: "26A", text:"26A Trappist Single"},
  {id: "26B", text:"26B Belgian Dubbel"},
  {id: "26C", text:"26C Belgian Tripel"},
  {id: "26D", text:"26D Belgian Dark Strong Ale"},
  {id: "27A1", text:"27A1 Gose"},
  {id: "27A2", text:"27A2 Kentucky Common"},
  {id: "27A3", text:"27A3 Lichtenhainer"},
  {id: "27A4", text:"27A4 London Brown Ale"},
  {id: "27A5", text:"27A5 Piwo Grodziskie"},
  {id: "27A6", text:"27A6 Pre-Prohibition Lager"},
  {id: "27A7", text:"27A7 Pre-Prohibition Porter"},
  {id: "27A8", text:"27A8 Roggenbier"},
  {id: "27A9", text:"27A9 Sahti"},
  {id: "28A", text:"28A Brett Beer"},
  {id: "28B", text:"28B Mixed-Fermentation Sour Beer"},
  {id: "28C", text:"28C Wild Specialty Beer"},
  {id: "29A", text:"29A Friut Beer"},
  {id: "29B", text:"29B Fruit and Spice Beer"},
  {id: "29C", text:"29C Specialty Fruit Beer"},
  {id: "30A", text:"30A Spice, Herb or Vegetable Beer"},
  {id: "30B", text:"30B Autumn Seasonal Beer"},
  {id: "30C", text:"30C Winter Seasonal Beer"},
  {id: "31A", text:"31A Alternative Grain Beer"},
  {id: "31B", text:"31B Alternative Sugar Beer"},
  {id: "32A", text:"32A Classic Style Smoked Beer"},
  {id: "32B", text:"32B Specialty Smoked Beer"},
  {id: "33A", text:"33A Wood-Aged Beer"},
  {id: "33B", text:"33B Specialty Wood-Aged Beer"},
  {id: "34A", text:"34A Clone Beer"},
  {id: "34B", text:"34B Mixed-Style Beer"},
  {id: "34C", text:"34C Experimental Beer"},
  {id: "X1", text:"X1 Pampas Golden Ale"},
  {id: "X2", text:"X2 Argentine IPA"},
  {id: "X3", text:"X3 Italian Grape Ale"},
  {id: "X4", text:"X4 Catharina Sour"},
  {id: "X5", text:"X5 New Zealand Pilsner"}
];

class Beer extends BaseCategory {

  constructor() {
    super();
    const entry = localStorage.getItem('beerEntry')
    if (entry) this.entry = entry;
    const category = localStorage.getItem('beerCategory')
    if (category) this.category = category;
    const special = localStorage.getItem('beerSpecial')
    if (special)
      this.special = special;
    else
      this.special = '';
    const comment = localStorage.getItem('beerComment')
    if (comment)
      this.comment = comment;
    else
      this.comment = '';
  }

  flush() {
    this.flushFields(fields);
    this.comment = '';
    this.special = '';
  }

  load(json) {
    this.entry = json.entry;
    this.category = json.category;
    this.special = json.special;
    this.comment = json.comment;
    this.updateHandler();
  }

  checkCompletion() {
    this.required.length = 0;
    // check for flavors categories
    let categories = [];
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

  updateHandler(sort = false) {
    super.updateHandler();
    if (sort) {
      this.flavors.sort(compareCategory);
    }
  }

  save() {
    console.log("Saving beer");
    localStorage.setItem('beerEntry', this.entry);
    localStorage.setItem('beerCategory', this.category);
    if (this.special)
      localStorage.setItem('beerSpecial', this.special);
    else
      localStorage.removeItem('beerSpecial');
    if (this.comment)
      localStorage.setItem('beerComment', this.comment);
    else
      localStorage.removeItem('beerComment')
  }
}

function renderBeer(renderer, beer) {
  renderer.addBeer(beer.entry, getLabel(CATEGORY_OPTIONS, beer.category), beer.special, beer.comment);
}

export {Beer as BeerDto, renderBeer, CATEGORY_OPTIONS}
