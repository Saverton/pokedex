
async function getMoveById(id, callbackFn) {
  fetch(`http://localhost:8000/moves/${id}`)
    .then(r => r.json())
    .then(move => {
      callbackFn(move);
    });
}

export { getMoveById };