/* global state_data, frameCount, Country, State, fill, text, width, height, currentDisplay, displayNewsStatus*/

class Simulation {
  
  
  /* 
    Constructor for the Simulation class
    
    @param num_states (int) - How many states will be included in the simulation
    
  */
  constructor(num_states, start_date) {
    // Static field for simulation
    Simulation.start_date = new Date(start_date); // Date of patient zer0
    Simulation.mortality_rate = 0.035; // Avg. COVID 19 Mortality rate from WHO - https://www.who.int/docs/default-source/coronaviruse/situation-reports/20200306-sitrep-46-covid-19.pdf?sfvrsn=96b04adf_4
    Simulation.spread_rate = 0.288;
    Simulation.spread_rate_step = 0.00000000001;
    Simulation.recovery_time = 14; // 14 days recovery time
    Simulation.healthcare_tax = 0.05; // Healthcare tax
    Simulation.median_household_income = 63179.00;
    Simulation.healthcare_fund_per_person = Simulation.median_household_income * Simulation.heathcare_tax;
    Simulation.PPE_cost = 2;
    Simulation.advertisement_cost = 400000;
    Simulation.quarentine_cost = 25000000000;
    
    this.num_states = num_states; // How many states should be considered in the model
    this.states = state_data; // State data including population

    this.start_funds = 2.5 * 1000000000000; // Starting funds
    this.start_ppe = 20000; // How much PPE is available at the start of the game
    this.num_patient_zeros = 1.0; // How many people are infected at the start of the game

    Simulation.date = new Date(start_date);
    this.time_step = 75 // 150; // frames per day - ie. For every N frames, it is a new day
    this.paused = false;    

    // states, init_funds, init_ppe, init_spread_rate, init_infected
    this.country = new Country(this.createStates(), this.start_funds, this.start_ppe, Simulation.spread_rate, this.num_patient_zeros);
  }

  /*
    Step a day in the simulation
  */
  step() {
    // TODO: Code that should happen each day ie. spread virus, update PPE, funds, etc.
    Simulation.date.setDate(Simulation.date.getDate() + 1);
    this.country.step();
    displayNewsStatus();
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
      let revenue = state.Pop * Simulation.healthcare_fund_per_person
      let init_ppe = 1;
      states.push(new State(state.longitude, state.latitude, state.State, state.Pop, state.Density, 0, revenue, init_ppe, Simulation.spread_rate));
    }
    return states;
  }

  /*
    Debug code to visualize the time and how many people are infected
  */
  debug(){
    fill(0);
    text(currentDisplay,width/2,20,width/2,height);
    text(`Date: ${Simulation.date.toDateString()}, Avg. Spread Rate: ${Number(this.country.statistics.spread_rate).toFixed(4)}`, 20, height - 40);
    text(`Population Infected: ${this.country.statistics.total_infected} Deaths: ${this.country.statistics.deaths} Recovered: ${this.country.statistics.recovered}`, 20, height - 15)
  }
}
