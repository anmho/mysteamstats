const baseUrl = "https://mysteamstatsserver.herokuapp.com/api";

export async function getOwnedGames(steamId) {
  const url = baseUrl + `/owned-games?steam_id=${steamId}`;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  };

  const data = await fetch(url, requestOptions)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  console.log(data);

  if (data === null) return null;

  const ownedGames = data.response.games;
  console.log(ownedGames);

  return ownedGames;
}

const steamUserService = {
  getOwnedGames,
};

export default steamUserService;
