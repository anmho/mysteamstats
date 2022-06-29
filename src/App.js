import { useState, useContext, useEffect } from "react";
import { Typography, Stack, TextField } from "@mui/material";
import config from "./config";
import LoginCard from "./components/LoginCard";
import UserContext from "./contexts/UserContext";
import PlaytimePieChart from "./components/PlaytimePieChart";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

function App() {
  const [steamId, setSteamId] = useState(config.steamId);
  const [ownedGames, setOwnedGames] = useState([]);
  const { user, setUser, loggedIn, setLoggedIn } = useContext(UserContext);

  // useEffect(() => {}, []);

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
        {!loggedIn && (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <LoginCard />
            <DatePicker
              label="Birthdate"
              // value={value}
              onChange={(newValue) => {
                // setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        )}
        {loggedIn && (
          <>
            <Typography variant="h4" component="h2">
              Play Time Per Game
            </Typography>
            <PlaytimePieChart data={ownedGames} />
          </>
        )}
      </Stack>
    </>
  );
}

export default App;
