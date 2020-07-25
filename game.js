/* global state_coords, file_to_csv */

class Game {
  constructor(state_data_csv, num_states) {
    this.hasDataLoaded = false;
    this.create_state_data(state_data_csv);
    this.num_states = num_states;
    
    this.states = [];
  }

  load_state_population(csv) {
    console.log("Loading State data...");
    return new Promise(async (resolve, reject) => {
      file_to_csv(csv).then(csv => {
        this.state_population = csv;
        this.hasDataLoaded = true;
        console.log("State data loaded!");
        resolve(csv);
      });
    });
  }

  create_state_data(state_data_csv) {
    this.load_state_population(state_data_csv);
    this.state_coordinates = state_coords;
    
    for(let i = 1; i < this.num_states; i++){
      this.states.push({
        this.state_population[i].POPEST
      });
    }
    
  }
}
