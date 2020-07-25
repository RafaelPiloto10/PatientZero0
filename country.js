/* global random */

/*
  The country class meant to represent the entire country the player is trying to save
*/
class Country {
  /*
    Constructor for the country class
    
    @param num_states (int) - the total number of states in the country
    @param init_funds (float) - the starting amount of funds for the country
    @param init_ppe (int) - the starting amount of ppe for the country
    @param init_spread_rate (float) - the initial spread rate of the virus
    @param init_infected (int) - the starting amount of people infected at the beginning of the game
    
  */
  constructor(states, init_funds, init_ppe, init_spread_rate, init_infected) {
    this.states = states;
    this.num_states = this.states.length;

    this.funds = init_funds;
    this.ppe = init_ppe;

    this.deaths = 0;
    this.total_infected = init_infected;
    this.init_infected = init_infected;
    this.recovered = 0;
    this.spread_rate = init_spread_rate;

    this.populate_states();
    this.patient_zero();
  }

  /*
    Creates patient zer0s based on the intial amount of citizens infected
    
    @return Whether or not the operation was completed successfully
  */
  patient_zero() {
    if (this.init_infected == 0) {
      console.error(
        "Trying to initialize 0 patient zer0s. Game cannot be played!!"
      );
      return false;
    }

    for (let i = 0; i < this.init_infected; i++) {
      let random_state = random(this.states);
      random_state.infect();
    }

    return true;
  }
}
