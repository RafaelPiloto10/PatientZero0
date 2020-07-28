/*
global createButton, height, textSize, width, simulation, random

*/
let btn_Advertise, btn_Display, isBudgetDisplayed;
function createButtons(){
  textSize(20);
  btn_Advertise = createButton('Advertise Awareness');
  btn_Advertise.position(5,height+10)
  btn_Advertise.size(100,50)
  btn_Advertise.mousePressed(advertise);
  
  btn_Display=createButton("Click Here to show your budget, or the News.");
  btn_Display.size(200,500)
  btn_Display.position(width+10,10)
  btn_Display.mousePressed(changeDisplay);
  isBudgetDisplayed=false;
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
  console.log("attempting ")
  if(isBudgetDisplayed){
    btn_Display.label="You have $"+"Million in bank.";
  }
  
  else{
    for(let i=0;i < simulation.country.states.length;i++)
      {
        if(simulation.country.states[i].not_reported_infected&&simulation.country.states[i].state_infected!=0&&(simulation.country.states[i].state_infected>=10||random(0,10)>=8)){
          btn_Display.label="Another state has been infected!";
          return;
        }
      }
    btn_Display.label="There are no news at the moment.";
  }
}


