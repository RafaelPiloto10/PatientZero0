function file_to_csv(file_name) {
  return new Promise( async (resolve, reject) => {
    await fetch(file_name)
      .then(response => response.text())
      .then(response => resolve($.csv.toObjects(response)));
  });
}

function read_json(file_name) {
  return new Promise( async (resolve, reject) => {
    await fetch(file_name)
      .then(response => response.json())
      .then(response => resolve(response));
  });
}

let complete_states = [];

read_json("data.json").then((states) => {
  for(let i = 0; i < states.length; i++){
    for(let j = 0; i < state_coords.length; j++){
      if(states[i].State == state_coords[i].state) {
        complete_states.push({
          ...state_coords[i],
          states[i].Pop,
          states[i].Density,
          states[i].LandArea
        });
      }
    }
  }
  console.log()
});

