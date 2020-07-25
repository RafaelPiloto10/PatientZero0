class Game {
  constructor() {}

  load_state_data(csv) {
    return new Promise(async (resolve, reject) => {
        file_to_csv(csv).then(csv => {
        resolve(csv);
      });
    });
  }
}
