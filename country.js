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
        "Trying to initialize 0 patient zer0s. Simulation cannot be played!!"
      );
      return false;
    }

    for (let i = 0; i < this.init_infected; i++) {
      let random_state = random(this.states);
      random_state.infect();
    }

    return true;
  }
  
  /*
    Simulate travel between states and they're impact based on elementary COVID probabilties
    NOTE: This simulation assumes air travel on airlines that follow CDC measures and social distance
    do not spread the virus during travel! Only flights operating in full capacity where the probability
    of spreading the virus is higher. 
  */
  simulate_random_travel() {
    // Probability of contracting COVID-19 on a plane
    //   - https://www.nationalgeographic.com/science/2020/01/how-coronavirus-spreads-on-a-plane/#close
    // How many people fly per day
    //   - https://www.cnn.com/travel/article/flight-capacity-united-states-coronavirus/index.html
    
    let daily_flights = 482; // Elementary estimate from the CNN article
    
    let amt_passangers_at_risk = 11; // Elemetary estiamte from the National Geographic article
    
    let prob_contracting_covid = 0.2; // Elementary probability from the National Geographic article
    
    for(let i = 0; i < daily_flights; i++){
      let departureState = random(this.states);
      let arrivalState = random(this.states);
      
      // randomly check if someone on a plane has COVID based on the probability that a person has COVID in the departure state 
      let r = random(); 
      if(r < departureState.prob_person_has_covid) {
        for(let j = 0; j < amt_passangers_at_risk; j++) {
          // Randomly spread the virus based on virus spread in the National Geographic article
          let r2 = random();
          if(r2 > prob_contracting_covid) {
            arrivalState.infect();
          }
        }
      }
    }
  
  }
}
