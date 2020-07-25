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
  console.log(states);
  console.log(state_coords);
});

