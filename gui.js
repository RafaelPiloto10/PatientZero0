/*
global createButton, height, textSize, width, simulation, random, state_data

*/
let btn_Advertise, btn_Display, isBudgetDisplayed, currentNews, currentDisplay;
function createButtons(){
  textSize(15);
  btn_Advertise = createButton('Advertise Awareness');
  btn_Advertise.position(5,height+10)
  btn_Advertise.size(100,50)
  btn_Advertise.mousePressed(advertise);
  
  btn_Display=createButton("Click Here to show your budget, or the News.");
  btn_Display.size(200,500)
  btn_Display.position(width+10,10)
  btn_Display.mousePressed(changeDisplay);
  isBudgetDisplayed=false;
  currentNews="There is no news at the moment.";
  currentDisplay=currentNews
}

function advertise()
{
  
}

function changeDisplay()
{
  isBudgetDisplayed=!isBudgetDisplayed;
  displayNewsStatus()
}

function displayNewsStatus()
{
  if(isBudgetDisplayed){
    currentDisplay="You have $"+"Million in bank.";
  }
  
  else
  {
    for(let i=0;i < simulation.country.states.length;i++)
      {
        if(simulation.country.states[i].not_reported_infected&&simulation.country.states[i].state_infected!=0&&(simulation.country.states[i].state_infected>=10||random(0,10)>=8)){
          currentNews=""+state_data[i].State+" has been confirmed infected!";
          simulation.country.states[i].not_reported_infected=false;
          currentDisplay=currentNews;
          return;
        }
      }
    if()
    //if(Math.random(0,10)>8)
      // while(true){
      //   let state=random(simulation.country.states);
      //   if(state.not_reported_infected==false){
      //     let infected_estimate=Math.pow(Math.round(Math.sqrt(state.state_infected)),2);
      //     currentNews="Estimates show there are "+infected_estimate+"infected in "+state.id+"!";
      //     currentDisplay=currentNews;
      //     return;
      //   }
      // }
    currentDisplay=currentNews;
  }
    
}


