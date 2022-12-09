
async function getMoveById(id, callbackFn) {
  await fetch(`http://localhost:8000/moves/${id}`)
    .then(r => r.json())
    .then(move => {
      callbackFn(move);
    });
}

export { getMoveById };