/*
global createButton, height, textSize, width, simulation, random, state_data

*/
let btn_Advertise, btn_Display, isBudgetDisplayed, currentNews, currentDisplay, maxInfected;
function createButtons() {
  textSize(15);
  btn_Advertise = createButton("Advertise Awareness");
  btn_Advertise.position(5, height + 10);
  btn_Advertise.size(100, 50);
  btn_Advertise.mousePressed(advertise);

  btn_Display = createButton("Click Here to show your budget, or the News.");
  btn_Display.size(200, 500);
  btn_Display.position(width + 10, 10);
  btn_Display.mousePressed(changeDisplay);
  isBudgetDisplayed = false;
  currentNews = "There is no news at the moment.";
  currentDisplay = currentNews;
  maxInfected=0;
}

function advertise() {}

function changeDisplay() {
  isBudgetDisplayed = !isBudgetDisplayed;
  displayNewsStatus();
}

function displayNewsStatus() {
  if (isBudgetDisplayed) {// Display the budget if it is selected
    currentDisplay = "You have $" + "Million in bank.";
  } 
  
  else {
    for (let i = 0; i < simulation.country.states.length; i++) {//will display if any state has "discovered" COVID
      if (
        simulation.country.states[i].not_reported_infected &&
        simulation.country.states[i].state_infected != 0 &&
        (simulation.country.states[i].state_infected >= 10 ||
          random(0, 10) >= 8)
      ) {
        currentNews =
          "" + state_data[i].State + " has been confirmed infected!";
        simulation.country.states[i].not_reported_infected = false;
        currentDisplay = currentNews;
        return;
      }
    }
    if (simulation.country.statistics.total_infected>maxInfected)
      maxInfected=simulation.country.statistics.total_infected
    if (maxInfected > 1000) //estimates how many infected are in a state if there is enough
      if (Math.random(0, 10) > 5)
        while (true) {
          let state = random(simulation.country.states);
          if (!state.not_reported_infected && state.state_infected > 100) { 
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
      //displays if a state has become immune to COVID
      let state = random(simulation.country.states);
      if (state.state_recovered + state.state_deaths >= state.population) {
        currentNews = state.id + " Has become immune to COVID-19!";
        currentDisplay = currentNews;
        return;
      }
    currentDisplay = currentNews;
  }
}
