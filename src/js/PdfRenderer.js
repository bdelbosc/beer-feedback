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
  if (score <= 20) return "Off flavors/aromas or major style dficiencies";
  if (score <= 29) return "Misses the mark on style and/or minor flaws";
  if (score <= 37) return "Generally within style parameters, minor flaws";
  if (score <= 44) return "Examplifies style well, requires minor fine-tuning";
  if (score <= 50) return "World-class example of the style";
  return 'INVALID';
}


class PdfRenderer {

  constructor(title, score) {
    this.doc = new jsPDF();
    this.y = 10;
    this.defaultX = 25;
    this.scoreX = 180;
    this.score = score;

    this.doc.setFont("helvetica");
    this.doc.setFontSize(18);
    this.doc.text(title, this.defaultX, 10);
    this.doc.setFontSize(14);
    this.doc.setFont("courier");
    this.doc.text((score > 0 ? score.toString() : '-'), this.scoreX, 30, null, null, "right");
    this.doc.text('/50', this.scoreX, 30);
    this.doc.setFont("helvetica");
    this.doc.setFontSize(12);
    if (score > 0) this.doc.text(getScore(score) + ": " + getScoreDescription(score), 25, 30);
    this.y = 45;
  }

  addSection(title, score, max) {
    this.y += 2;
    this.doc.setFontStyle("bold");
    this.doc.setFontSize(14);
    this.doc.text(title, 20, this.y);
    this.doc.setFontSize(12);
    this.doc.setFont("courier");
    this.doc.text(score === undefined ? '-' : score.toString(), this.scoreX, this.y, null, null, "right");
    this.doc.text("/" + max, this.scoreX, this.y);
    this.doc.setFont("helvetica");
    this.doc.setLineWidth(0.15);
    this.doc.line(10, this.y + 2, 200, this.y + 2);
    this.y += 6;
  }

  addHeadline(head, text) {
    this.doc.setFontSize(10);
    this.doc.setFontStyle("bold");
    this.doc.text(head, this.defaultX + 30, this.y, null, null, "right");
    this.doc.setFontStyle("normal");
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== undefined) {
        this.doc.text(text[i], this.defaultX + 40, this.y);
        this.y += 6;
      }
    }
    if (text.length == 0) {
      this.y += 6;
    }
  }

  produce(name) {


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

export {PdfRenderer, getLabel};

