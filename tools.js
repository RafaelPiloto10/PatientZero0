function file_to_csv(file_name) {
  return new Promise( async (resolve, reject) => {
    await fetch(file_name)
      .then(response => response.text())
      .then(response => resolve(response));
  });
}
