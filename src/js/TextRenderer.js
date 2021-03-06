import {getScore, splitLines} from "./PdfRenderer";


class TextRenderer {

  constructor(title, score) {
    this.score = score;
    this.text = [];
    this.text.push("# " + title);
  }

  addUser(name, rank, comment, start) {
    this.text.push('Judge Name: ' + name + ', rank: ' + rank)
    this.text.push('Date: ' + start);
    if (comment) this.text.push(comment);
  }

  addBeer(entry, category, special, comment) {
    this.text.push('Category: ' + category);
    this.text.push('Entry: # ' + entry)
    if (special) this.text.push('Special ingredients: ' + special);
    if (comment) this.text.push(comment);
    this.text.push('Score: ' + this.score + '/50 - ' + getScore(this.score));
  }

  addSection(title, score, max) {
    this.text.push("\n## " + title + " " + (score === undefined ? '-' : score.toString()) + "/" + max);
  }

  addHeadline(head, text) {
    text = text.filter(function( element ) {
      return element !== undefined;
    });
    if (text.length > 0) {
      this.text.push(head + ': ' + text.join(", "));
    }
  }

  addHeadlines(head, text) {
    this.addHeadline(head, [text]);
  }

  addHeadline2(head, text) {
    this.addHeadline(head, text);
  }

  addVersion(version) {
    // this.text.push("Generated with beer-feedback v" + version);
    // this.text.push("http://beer-feedback.surge.sh/");
  }

  produce() {
    return this.text.join("\n");
  }
}


export {TextRenderer};

