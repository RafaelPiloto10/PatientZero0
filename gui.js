/*
global createButton, height, textSize, width, simulation, random, state_data, abbreviateNumber

*/
let btn_Advertise, btn_Display, btn_StartQuarantine, btn_UsePPE;
let isBudgetDisplayed, currentNews, currentDisplay;
function createButtons() {
  textSize(15);
  btn_Advertise = createButton("Broadcast Advertisements\nCost: $" +abbreviateNumber(simulation.advertisement_cost));
  btn_Advertise.position(5, height + 10);
  btn_Advertise.size(110, 55);
  btn_Advertise.mousePressed(advertise);

  btn_StartQuarantine=createButton("Quarantine!\nThis will be expensive.");
  btn_StartQuarantine.position(width+10,height/2);
  btn_StartQuarantine.size(110,50);
  btn_StartQuarantine.mousePressed(quarantine)
  
  btn_UsePPE=createButton("Use PPE\n");
  btn_UsePPE.position(width+10, height);
  btn_UsePPE.size(110,50);
  btn_UsePPE.mousePressed(usePPE)
  
  btn_Display = createButton("Click Here to cycle between your budget, or the news.");
  btn_Display.size(110, 100);
  btn_Display.position(width + 10, 10);
  btn_Display.mousePressed(changeDisplay);
  isBudgetDisplayed = false;
  currentNews = "There is no news at the moment.";
  currentDisplay = currentNews;
}

function advertise() {
  simulation.country.advertise();
}

function quarantine() {
  simulation.country.quarantine();
}

function usePPE() {
  simulation.country.usePPE();
}

function changeDisplay() {
  isBudgetDisplayed = !isBudgetDisplayed;
  displayNewsStatus();
}

function displayNewsStatus() {
  if (isBudgetDisplayed) {
    // Display the budget if it is selected
    currentDisplay = "You have $" + abbreviateNumber(simulation.country.funds)+ " in bank.";
  } else {
    
    for (let i = 0; i < simulation.country.states.length; i++) {
      if (
        simulation.country.states[i].not_reported_immunity &&
        simulation.country.states[i].state_deaths +
          simulation.country.states[i].state_recovered ==
          simulation.country.states[i].population
      ) {
        currentNews =
          "" + state_data[i].State + " is now immune to COVID-19!";
        simulation.country.states[i].not_reported_immunity = false;
        currentDisplay = currentNews;
        return;
      }
      currentDisplay = currentNews;
    }
    
    if (simulation.country.statistics.total_infected > 50000)
      //estimates how many infected are in a state if there is enough
      for (let i = 0; i < 100; i++) {
        let state = random(simulation.country.states);
        if (!state.not_reported_infected && state.not_reported_immunity && state.state_infected > 100) {
          let infected_estimate = Math.pow(
            Math.round(Math.sqrt(state.state_infected)),
            2
          );
          currentNews =
            "Estimates show there are " +
            infected_estimate +
            " infected in " +
            state.id +
            ".";
          currentDisplay = currentNews;
          return;
        }
      }
    
    for (let i = 0; i < simulation.country.states.length; i++) {
      //will display if any state has "discovered" COVID
      if (
        simulation.country.states[i].not_reported_infected &&
        simulation.country.states[i].state_infected != 0 &&
        (simulation.country.states[i].state_infected >= 30 ||
          random(0, 100) >= 95)
      ) {
        currentNews =
          "" + state_data[i].State + " has been confirmed infected!";
        simulation.country.states[i].not_reported_infected = false;
        currentDisplay = currentNews;
        return;
      }
    }
  }
}
