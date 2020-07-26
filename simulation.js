/* global state_data, frameCount, Country, State, fill, text, width, height*/

class Simulation {
  
  
  /* 
    Constructor for the Simulation class
    
    @param num_states (int) - How many states will be included in the simulation
    
  */
  constructor(num_states) {
    // Static field for simulation
    Simulation.start_date = new Date("21 January 2020"); // Date of patient zer0
    Simulation.mortality_rate = 0.035; // Avg. COVID 19 Mortality rate from WHO - https://www.who.int/docs/default-source/coronaviruse/situation-reports/20200306-sitrep-46-covid-19.pdf?sfvrsn=96b04adf_4
    Simulation.recovery_time = 14; // 14 days recovery time
    
    this.num_states = num_states; // How many states should be considered in the model
    this.states = state_data; // State data including population

    this.start_funds = 2.5 * 1000000000000; // Starting funds
    this.start_ppe = 1; // How much PPE is available at the start of the game
    this.start_spread_rate = 1; // The spread rate of the virus at the start of the game
    this.num_patient_zeros = 1; // How many people are infected at the start of the game

    Simulation.date = Simulation.start_date;
    this.time_step = 150; // frames per day - ie. For every N frames, it is a new day
    this.paused = false;    

    // states, init_funds, init_ppe, init_spread_rate, init_infected
    
    this.country = new Country(this.createStates(), this.start_ppe, this.start_spread_rate, this.num_patient_zeros);
  }

  /*
    Step a day in the simulation
  */
  step() {
    // TODO: Code that should happen each day ie. spread virus, update PPE, funds, etc.
    console.log(Simulation.date.toDateString(), this.country.statistics.total_infected);
    Simulation.date.setDate(Simulation.date.getDate() + 1);
    this.country.step(Simulation.date);
  }

  /*
    Update function - called every frame
    Checks if the game should step a day and handles draw calls
  */
  update() {
    if (frameCount % this.time_step == 0 && !this.paused) {
      this.step();
    }
  }

  /*
    Toggle whether or not the step function has been paused
    
    @param set - If you want to set the paused variable to something, use that - otherwise, it'll auto toggle
  */
  togglePause(set = null) {
    this.paused = set == null ? !this.paused : set;
  }
  
  /*
    Create the states based on their data
    
    @return A new array with the State data
  */
  createStates() {
    let states = [];
    
    for(let i = 0; i < this.num_states; i++) {
      // lon, lat, id, pop, pop_density, state_init_infected, revenue, state_init_ppe, spread_rate
      let state = state_data[i];
      states.push(new State(state.longitude, state.latitude, state.State, state.Pop, state.Density, 0, 1, 1, 0.2));
    }
    return states;
  }
  
  debug(){
    fill(255);
    text(`Date: ${Simulation.date.toDateString()}, 1st State Infected: ${this.country.states[0].state_infected}`, 20, 20);
  }
}
