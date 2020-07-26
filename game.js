/* global state_data */

class Game {
  constructor(num_states) {
    this.hasDataLoaded = false;
    
    this.num_states = num_states;
    this.states = state_data;
    
    this.start_funds = 2.5 * 1000000000000; // Starting funds
    this.start_ppe = null;            // How much PPE is available at the start of the game
    this.start_spread_rate = null; // The spread rate of the virus at the start of the game
    this.num_patient_zeros = null; // How many people are infected at the start of the game
    
    this.date = new Date("21 January 2020");
    this.time_step = 5; // 5 frames per day - ie. For every 5 frames, it is a new day
    
    
    // states, init_funds, init_ppe, init_spread_rate, init_infected
    // this.country = new Country(this.states.slice(0, num_states), )
  }
}
