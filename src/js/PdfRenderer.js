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

const formatter = new Intl.DateTimeFormat('default', {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour12: false,
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit'
});

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

  addUser(name, rank, start) {
    this.doc.setFontSize(12);
    this.doc.text('Judge Name: ' + name, 10, 20);
    this.doc.setFontSize(9);
    this.doc.text('Rank: ' + rank, 10, 25);
    this.doc.text('Date: ' + formatter.format(start), 10, 30);
  }

  addBeer(entry, category, special, comment) {
    this.doc.setFontSize(12);
    this.doc.text('Entry # ' + entry, 85, 20);
    this.doc.text('Category: ' + category, 85, 25);
    this.doc.setFontSize(9);
    this.doc.text('Special ingredients: ' + (special ? special : ''), 85, 30);
    this.doc.text('Comments: ' + (comment ? comment : ''), 85, 35);
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

  addHeadline(head, text, x=this.defaultX) {
    this.doc.setFont("helvetica");
    this.doc.setFontSize(10);
    this.doc.setFontStyle("bold");
    this.doc.text(head, x + 30, this.y, null, null, "right");
    this.doc.setFontStyle("normal");
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== undefined) {
        this.doc.text(text[i], x + 35, this.y);
        this.y += 6;
      }
    }
    if (text.length == 0) {
      this.y += 6;
    }
  }

  addHeadline2(head, text) {
    this.y -= 6;
    this.addHeadline(head, text,  110);
  }


  addVersion(version) {
    this.doc.setFont("helvetica");
    this.doc.setFontSize(6);
    this.doc.text("beer-feedback version " + version, 200, 280, null, null, "right");
  }

  addMetdata(version, username, entry, category, json) {
    this.doc.setProperties({
      'author': username,
      'subject': 'Entry # ' + entry + ' Category:' + category,
      'creator': 'beer-feedback v' + version,
      'keywords': json
    });
  }

  produce(name) {
    this.doc.setProperties({'title': name.replace('.pdf', '')});
    this.doc.save(name);
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

export {PdfRenderer, getLabel, getScore, getScoreDescription};

