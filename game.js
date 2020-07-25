/* global state_data */

class Game {
  constructor(num_states) {
    this.hasDataLoaded = false;
    this.num_states = num_states;
    this.states = state_data;
    // states, init_funds, init_ppe, init_spread_rate, init_infected
    this.country = new Country(this.states, )
  }
}
