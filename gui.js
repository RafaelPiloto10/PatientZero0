/*
global createButton, height, textSize, width, simulation, random, state_data, Simulation, abbreviateNumber

*/
let btn_Advertise, btn_Display, btn_StartQuarantine, btn_UsePPE;
let isBudgetDisplayed, currentNews, currentDisplay;
let btnw = 140;
let btnh = 60;
function createButtons() {
  textSize(15);
  btn_Advertise = createButton(
    "Broadcast Advertisements\nCost: $" +
      abbreviateNumber(Simulation.advertisement_cost)
  );
  btn_Advertise.position(width + 10, 190);
  btn_Advertise.size(btnw, btnh);
  btn_Advertise.mousePressed(advertise);

  btn_StartQuarantine = createButton(
    "Quarantine!\nCost: $" + abbreviateNumber(Simulation.quarantine_cost)
  );
  btn_StartQuarantine.position(width + 10, 130);
  btn_StartQuarantine.size(btnw, btnh);
  btn_StartQuarantine.mousePressed(quarantine);

  btn_UsePPE = createButton(
    "Use PPE\nCost: $" + abbreviateNumber(Simulation.PPE_cost)
  );
  btn_UsePPE.position(width + 10, 70);
  btn_UsePPE.size(btnw, btnh);
  btn_UsePPE.mousePressed(usePPE);

  btn_Display = createButton(
    "← Cycle Display"
  );
  btn_Display.size(btnw,  btnh);
  btn_Display.position(width + 10, 10);
  btn_Display.mousePressed(changeDisplay);
  isBudgetDisplayed = false;
  currentNews = "There is no breaking news at this time.";
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
    currentDisplay =
      "United States Healthcare Budget: $" + abbreviateNumber(simulation.country.funds) + "\nTax Funding: " + abbreviateNumber(simulation.country.revenue )+ " in " + (simulation.country.days_till_pay) + " days";
  } else {
    currentDisplay = currentNews;
    for (let i = 0; i < simulation.country.states.length; i++) {
      if (
        simulation.country.states[i].not_reported_immunity &&
        simulation.country.states[i].state_deaths +
          simulation.country.states[i].state_recovered ==
          simulation.country.states[i].population
      ) {
        currentNews = "Breaking News: " + state_data[i].State + " is now immune to COVID-19!";
        simulation.country.states[i].not_reported_immunity = false;
        currentDisplay = currentNews;
        return;
      }
    }

      //estimates how many infected are in a state if there is enough
      for (let i = 0; i < 10; i++) {
        let state = random(simulation.country.states);
        if (
          !state.not_reported_infected &&
          state.state_infected > 1500
        ) {
          let infected_estimate = Math.pow(
            Math.round(Math.sqrt(state.state_infected)),
            2
          );
          currentNews =
            "Breaking News: Estimates show there are " +
            abbreviateNumber(infected_estimate) +
            " infected in " +
            state.id +
            ".";
          currentDisplay = currentNews;
          return;
        }
      }
    if (simulation.country.statistics.total_infected < 10000)
      for (let i = 0; i < simulation.country.states.length; i++) {
        //will display if any state has "discovered" COVID
        if (
          simulation.country.states[i].not_reported_infected &&
          simulation.country.states[i].state_infected != 0 &&
          (simulation.country.states[i].state_infected >= 30 ||
            random(0, 100) >= 95)
        ) {
          currentNews =
            "Breaking News: " + state_data[i].State + " has been confirmed infected!";
          simulation.country.states[i].not_reported_infected = false;
          currentDisplay = currentNews;
          return;
        }
      }
  }
}
