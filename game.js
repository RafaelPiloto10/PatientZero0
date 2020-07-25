class Game {
  constructor() {
  }

  load_state_data(csv) {
    return new Promise(async (resolve, reject) => {
      try {
        this.state_data = await $.csv.toObjects("2019PopulationEstimae.csv");
        resolve(this.state_data);
      } catch(err) {
        console.error("Could not load state data: " + err);
        reject();
      }
    });
  }
}
