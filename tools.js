function file_to_csv(file_name) {
  return new Promise(async (resolve, reject) => {
    await fetch(file_name)
      .then(response => response.text())
      .then(response => resolve($.csv.toObjects(response)));
  });
}

function read_json(file_name) {
  return new Promise(async (resolve, reject) => {
    await fetch(file_name)
      .then(response => response.json())
      .then(response => resolve(response));
  });
}

let complete_states = [];

read_json("data.json").then(states => {
  // console.log(states);
  // console.log(state_coords);
  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.State.toUpperCase();
    const bandB = b.State.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
  
  function compare2(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.state.toUpperCase();
    const bandB = b.state.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
  
  states.sort(compare);
  state_coords.sort(compare2);
  
  for(let i = 0; i < states.length; i++){
    completed_states.push({
      ...states[i],
      latitude: state_coords[i].latitude,
      longitude: state_coords[i].longitude
    });
  }
  
});
