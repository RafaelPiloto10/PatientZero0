/*
global createButton, height, textSize

*/
let btn_Advertise;
function createButtons(){
  textSize(20);
  btn_Advertise = createButton('Advertise Awareness');
  btn_Advertise.position(5,height+10)
  btn_Advertise.size(100,50)
  btn_Advertise.mousePressed(advertise);
  
  
}

function advertise()
{
  
}


