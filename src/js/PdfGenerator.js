import {PdfRenderer} from "./PdfRenderer";
import pkg from "../../package.json";

function generatePdf(json) {
  let jsonString = JSON.stringify(json);
  console.info("Generate PDF");
  console.info(json);
  let renderer = new PdfRenderer("BEER SCORESHEET", json.score);
  renderer.addMetdata(pkg.version, json.user.name, json.beer.entry, json.beer.category, jsonString);
  renderScoresheet(renderer, json);
  // let name = 'scoresheet-' + json.beer.tastingDate.toISOString().slice(0, 10).replace(/-/g, "");
  let name = 'scoresheet-' + json.beer.tastingDate.replace(/-/g, "");
  name += '-' + json.beer.entry.replace(/\W/g, '_');
  name += '-' + json.beer.category.replace(/\W/g, '_');
  name += '-' + json.user.name.replace(/\W/g, '_') + '.pdf';
  console.info("Produce PDF " + name);
  return renderer.produce(name);
}

function renderScoresheet(renderer, json) {
  renderer.addVersion(pkg.version);
  json.user.render(renderer, json.beer.tastingDate);
  json.beer.render(renderer);
  json.aroma.render(renderer);
  json.appearance.render(renderer);
  json.flavor.render(renderer);
  json.mouthfeel.render(renderer);
  json.overall.render(renderer, json.score);
}


export {generatePdf}