const api = "http://localhost:8000/teams";

function deleteTeam(teamID, callbackFn) {
  fetch(`${api}/${teamID}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (callbackFn) callbackFn(data);
    });
}

export { deleteTeam };
