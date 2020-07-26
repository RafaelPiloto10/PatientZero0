/* global state_data, frameCount */

class Simulation {
  /* 
    Constructor for the Simulation class
    
    @param num_states (int) - How many states will be included in the simulation
    
  */
  constructor(num_states) {
    this.num_states = num_states; // How many states should be considered in the model
    this.states = state_data; // State data including population

    this.start_funds = 2.5 * 1000000000000; // Starting funds
    this.start_ppe = null; // How much PPE is available at the start of the game
    this.start_spread_rate = null; // The spread rate of the virus at the start of the game
    this.num_patient_zeros = null; // How many people are infected at the start of the game

    this.date = new Date("21 January 2020");
    this.time_step = 50; // 5 frames per day - ie. For every 5 frames, it is a new day
    this.paused = false;

    // states, init_funds, init_ppe, init_spread_rate, init_infected
    // this.country = new Country(this.states.slice(0, num_states), )
  }
  
  /*
    Step a day in the simulation
    
  */
  step() {
    // TODO: Code that should happen each day ie. spread virus, update PPE, funds, etc.
    this.date.setDate(this.date.getDate() + 1);
    console.log(this.date.toDateString());
  }
  
  
  /*
    Update function - called every frame
    Checks if the game should step a day and handles draw calls
  */
  update() {
    if(frameCount % this.time_step == 0 && !this.paused) {
      this.step();
    }
  }
  
  /*
    Toggle whether or not the step function has been paused
    
    @param set - If you want to set the paused variable to something, use that - otherwise, it
  */
  togglePause(set = null) {
    this.paused = set == null ? !this.paused : set;
  }
}
