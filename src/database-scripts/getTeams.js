const api = "http://localhost:8000/teams"

function getTeams(callbackFn) {
  fetch(api)
    .then(r => r.json())
    .then(teams => callbackFn(teams))
}

export { getTeams };