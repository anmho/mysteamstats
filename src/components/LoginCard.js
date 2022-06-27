import {
  FormControl,
  TextField,
  Stack,
  Button,
  FormHelperText,
  CardContent,
  Card,
} from "@mui/material";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import config from "../config.js";
import dummy from "../dummy.json";

export default function LoginCard() {
  const [steamId, setSteamId] = useState(config.steamId);
  const { user, setUser, loggedIn, setLoggedIn } = useContext(UserContext);
  const [helperText, setHelperText] = useState("");
  /* 
    Component Purpose:
    1) Set steam Id of user
    2) fetch the owned games of this user
    3) 
      a) "Log in" user if successful
      b) Keep user at log in page if unsuccessful
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = {
      json: () => dummy,
      ok: true,
      status: 200,
    };
    const responseOk = true;
    // User not found or error
    if (!responseOk) {
      switch (response.status) {
      }
      setHelperText("Invalid user");
      return;
    }
    const data = response.json();
    console.log(data);
    const ownedGames = data.response.games;
    setUser({
      ...user,
      steamId: steamId,
      ownedGames: ownedGames,
    });
    setLoggedIn(true);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <FormControl
          onSubmit={(e) => handleSubmit(e)}
          spacing={1}
          display={"flex"}
        >
          <TextField
            value={config.steamId}
            onChange={(e) => setSteamId(e.target.value)}
            margin="normal"
            fullWidth
            label="Steam ID"
            id="steamId"
          />
        </FormControl>
        <Button type="submit" margin="normal" variant="contained">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
