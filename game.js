class Game {
  constructor(state_data_csv) {
    this.hasDataLoaded = false;
    this.load_state_data(state_data_csv);
    this.state_coordinates = state_coords;
  }

  load_state_data(csv) {
    console.log("Loading State data...");
    return new Promise(async (resolve, reject) => {
      file_to_csv(csv).then(csv => {
        this.state_data = csv;
        this.hasDataLoaded = true;
        console.log("State data loaded!")
        resolve(csv);
      });
    });
  }
}
