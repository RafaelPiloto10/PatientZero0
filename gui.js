/*
global createButton, height, textSize, width

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
}


