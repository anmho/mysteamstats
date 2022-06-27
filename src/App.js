import { useState, useContext } from "react";
import { Typography, Stack } from "@mui/material";
import config from "./config";
import LoginCard from "./components/LoginCard";
import UserContext from "./contexts/UserContext";
import PlaytimePieChart from "./components/PlaytimePieChart";

function App() {
  const [steamId, setSteamId] = useState(config.steamId);
  const [ownedGames, setOwnedGames] = useState([]);
  const { user, setUser, loggedIn, setLoggedIn } = useContext(UserContext);

  console.log(user, loggedIn);

  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h1" component="h2">
          Steam Stats
        </Typography>
        <LoginCard />
      </Stack>
      <PlaytimePieChart data={ownedGames}/>
    </>
  );
}

export default App;
