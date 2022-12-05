const api = "http://localhost:8000/teams";

function postTeam(team, callbackFn) {
  fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(team),
  })
    .then((res) => res.json())
    .then((data) => {
      if (callbackFn) callbackFn(data);
    });
}

export { postTeam };
