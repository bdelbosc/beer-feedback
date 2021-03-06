import jsPDF from 'jspdf';


function getScore(score) {
  if (score === undefined || score == 0) return '';
  if (score <= 13) return "Problematic";
  if (score <= 20) return "Fair";
  if (score <= 29) return "Good";
  if (score <= 37) return "Very Good";
  if (score <= 44) return "Excellent";
  if (score <= 50) return "Outstanding";
  return 'INVALID';
}

function getScoreDescription(score) {
  if (score === undefined || score == 0) return '';
  if (score <= 13) return "Major off flavors and aromas dominate";
  if (score <= 20) return "Off flavors/aromas or major style deficiencies";
  if (score <= 29) return "Misses the mark on style and/or minor flaws";
  if (score <= 37) return "Generally within style parameters, minor flaws";
  if (score <= 44) return "Examplifies style well, requires minor fine-tuning";
  if (score <= 50) return "World-class example of the style";
  return 'INVALID';
}

function getScoreLongDescription(score) {
  if (score === undefined || score == 0) return '';
  if (score <= 13) return "A beer with a major problem (usually " +
    "contamination) that overwhelms all other flavors and aromas. " +
    "Often barely palatable, may be undrinkable.";
  if (score <= 20) return "This beer has its share of problems that may " +
    "include missing the style parameters, off flavors and aromas, " +
    "balance problems, contamination, or other major flaws. " +
    "Scores near the lower end (14) of this range exhibit more major " +
    "flaws. Unpleasant to drink";
  if (score <= 29) return "A satisfactory beer that generally fits the style " +
    "parameters. Scores near the upper end of this range (29) may " +
    "have only a few minor flaws or be slightly out of style and also " +
    "may be lacking in balance or complexity. Scores near the " +
    "lower end of this range (21) tend to have more flaws and are likely " +
    "to have stylistic inconsistencies as well.";
  if (score <= 37) return "Beers in this range (30-37) may have a minor " +
    "flaw (technical or stylistic), or may be lacking in balance or " +
    "complexity.";
  if (score <= 44) return "Beers in this range (38-44) may have no flaws " +
    "but may be missing the intangibles for a world class beer.";
  if (score <= 50) return "World-class example of the style. " +
    "A beer with great character and no flaws.";
  return 'INVALID';
}


const formatter = new Intl.DateTimeFormat('default', {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour12: false,
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit'
});

function pdfUnescape(value) {
  return value.replace(/\\\\/g, '\\').replace(/\\\(/g, '(').replace(/\\\)/g, ')');
}

function splitLines(text) {
  const maxLength = 85;
  let rest = text;
  let lines = [];
  let i = 0;
  while (rest.length > 0 && i < 30) {
    let line = rest.split('\n')[0];
    if (line.length > maxLength) {
      line = rest.replace(/^(.{85}[^\s]*).*/m, "$1").split('\n')[0];
    } else if (line.length == 0) {
      rest = rest.substr(1, rest.length);
      continue;
    }
    rest = rest.substr(line.length, rest.length);
    lines.push(line.trim());
    i = i+1;
  }
  return lines;
}

class PdfRenderer {

  constructor(title, score) {
    this.doc = new jsPDF();
    this.y = 10;
    this.defaultX = 25;
    this.scoreX = 185;
    this.score = score;

    this.doc.setFont("helvetica");
    this.doc.setFontSize(18);
    this.doc.setFontStyle("bolditalic");
    this.doc.text(title, 105, 10, null, null, "center");
    this.doc.setFontSize(12);
    this.doc.setFontStyle("normal");
    this.doc.text('Score:', this.scoreX - 20, 20);
    this.doc.setFont("courier");
    this.doc.setFontStyle("bold");
    this.doc.setFontSize(14);
    this.doc.text((score > 0 ? score.toString() : '-'), this.scoreX, 20, null, null, "right");
    this.doc.setFontStyle("normal");
    this.doc.setFontSize(12);
    this.doc.text('/50', this.scoreX, 20);
    this.doc.setFont("helvetica");
    if (score > 0) this.doc.text(getScore(score), this.scoreX, 13, null, null, "right");
    this.y = 45;
  }

  addUser(name, rank, comment, start) {
    this.doc.setFontSize(12);
    this.doc.text('Judge Name: ' + name, 10, 20);
    this.doc.setFontSize(9);
    this.doc.text('Rank: ' + rank, 10, 25);
    this.doc.text('Date: ' + start, 10, 30);
    if (comment) this.doc.text(comment, 10, 35);
  }

  addBeer(entry, category, special, comment) {
    this.doc.setFontSize(12);
    this.doc.text('Entry # ' + entry, 85, 20);
    this.doc.text('Category: ' + category, 85, 25);
    this.doc.setFontSize(9);
    let posX = 30;
    if (special) {
      this.doc.text('Special ingredients: ' + special, 85, posX);
      posX = 35;
    }
    if (comment)
      this.doc.text(comment, 85, posX);
  }

  addSection(title, score, max) {
    this.y += 2;
    this.doc.setFont("helvetica");
    this.doc.setFontStyle("bold");
    this.doc.setFontSize(14);
    this.doc.text(title, 18, this.y);
    this.doc.setFontSize(12);
    this.doc.setFont("courier");
    this.doc.setFontStyle("bold");
    this.doc.text(score === undefined ? '-' : score.toString(), this.scoreX, this.y, null, null, "right");
    this.doc.setFontSize(10);
    this.doc.setFontStyle("normal");
    this.doc.text("/" + max, this.scoreX, this.y);
    this.doc.setLineWidth(0.15);
    this.doc.line(10, this.y + 2, 200, this.y + 2);
    this.doc.setFont("helvetica");
    this.y += 6;
  }

  addHeadlines(head, text, x = this.defaultX) {
    this.addHeadline(head, splitLines(text), x);
  }

  addHeadline(head, text, x=this.defaultX) {
    this.doc.setFont("helvetica");
    this.doc.setFontSize(10);
    this.doc.setFontStyle("bold");
    this.doc.text(head, x + 30, this.y, null, null, "right");
    this.doc.setFontSize(9);
    this.doc.setFontStyle("normal");
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== undefined) {
        this.doc.text(text[i], x + 35, this.y);
        this.y += 5;
      }
    }
    if (text.length == 0) {
      this.y += 5;
    }
  }

  addHeadline2(head, text) {
    this.y -= 5;
    this.addHeadline(head, text,  110);
  }

  addVersion(version) {
    this.doc.setFont("helvetica");
    this.doc.setFontSize(7);
    this.doc.text("Generated with beer-feedback v" + version, 10, 288, null, null, "left");
    this.doc.text("http://beer-feedback.surge.sh/", 10, 292, null, null, "left");
  }

  addMetdata(version, username, entry, category, json) {
    this.doc.setProperties({
      'author': username,
      'subject': 'Entry # ' + entry + ' Category:' + category,
      'creator': 'beer-feedback v' + version,
      'keywords': escape(json),
    });
  }

  produce(name) {
    this.doc.setProperties({'title': name.replace('.pdf', '')});
    return this.doc.save(name, {'returnPromise': true});
  }
}

function getLabel(options, id, inappropriate = false) {
  let suffix = '';
  if (inappropriate) suffix = ' INAPPROPRIATE'
  for (let i = 0; i < options.length; i++) {
    if (options[i].id === id) {
      return options[i].text + suffix;
    }
  }
  return id + suffix;
}

function parsePDF(text, updateData) {
  if (! text.startsWith('%PDF-1.3')) {
    throw ("Invalid file, a beer-feedback PDF Scoresheet is expected");
  }
  var lines = text.split('\n');
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('/Keywords (')) {
      let json = lines[i].slice(11, -1)
      console.debug("Got data from PDF: " + json);
      if (!json.startsWith('{')) {
        json = unescape(json);
        console.debug("Got json: " + json);
      }
      updateData(JSON.parse(json));
      return;
    }
  }
  throw ("Invalid PDF Scoresheet file, unable to find the JSON data!");
}

export {PdfRenderer, formatter, getLabel, getScore, getScoreDescription, getScoreLongDescription, parsePDF, splitLines};

