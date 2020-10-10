const Band = require("./band");

class Bands {
  constructor() {
    this.bands = [];
  }

  add(band = new Band()) {
    this.bands.push(band);
  }

  getAll() {
    return this.bands;
  }

  remove(id = "") {
    this.bands = this.bands.filter((band) => band.id !== id);
    this.getAll();
  }

  addVote(id = "") {
    this.bands = this.bands.map((band) => {
      if (band.id === id) band.votes++;
      return band;
    });
  }
}

module.exports = Bands;
