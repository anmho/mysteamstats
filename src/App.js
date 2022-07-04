import { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  AppBar,
  Slider,
  Toolbar,
  Button,
  CssBaseline,
  Card,
  CardContent,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import config from "./config";
import LoginCard from "./components/LoginCard";
import UserContext from "./contexts/UserContext";
import PlaytimePieChart from "./components/PlaytimePieChart";
import { DatePicker } from "@mui/x-date-pickers";
import { dayjs } from "dayjs";
import GameWageCard from "./components/GameWageCard";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1b2838",
    },

    // secondary: "#171a21",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const COLORS = [
  "#e6194b",
  "#3cb54c",
  "#ffe019",
  "#4363d7",
  "#f58131",
  "#921eb4",
  "#46f0f0",
  "#f132e5",
  "#bcf609",
  "#fabdbe",
  "#018080",
  "#e7beff",
  "#9b6425",
  "#fffbc8",
  "#800000",
  "#aaffc3",
  "#818000",
  "#ffd8b1",
  "#000075",
  "#81807f",
];

function App() {
  const [steamId, setSteamId] = useState("76561198184167726");
  const { user, setUser, loggedIn, setLoggedIn } = useContext(UserContext);
  const [totalHours, setTotalHours] = useState(0);
  const [ownedGames, setOwnedGames] = useState([]);
  const [theme, setTheme] = useState("light");

  console.log(user.steamId);

  useEffect(() => {
    if (!user.ownedGames) return;

    const ownedGames = user.ownedGames
      .map((game) => {
        return {
          name: game.name,
          playtime: game.playtime_forever / 60,
        };
      })
      .sort((a, b) => {
        if (a.playtime === b.playtime) {
          return a.name > b.name ? 1 : -1;
        }
        return b.playtime - a.playtime;
      });

    setTotalHours(
      Math.round(
        user.ownedGames.reduce((totalHours, game) => {
          return totalHours + game.playtime_forever;
        }, 0) / 60
      )
    );

    setOwnedGames(ownedGames);
    console.log(ownedGames);
  }, [user]);

  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1, mb: 2 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Steam Stats
              </Typography>
              {/* <Button color="inherit">Login</Button> */}

              <IconButton
                sx={{ ml: 1 }}
                onClick={() => {
                  if (theme === "light") setTheme("dark");
                  else setTheme("light");
                }}
                color="inherit"
              >
                {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>

        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          // sx={{
          // background: "rgb(27,40,56)",
          // background: "linear-gradient(0deg, rgba(27,40,56,1) 0%, rgba(42,71,94,1) 100%)"
          // }}
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
              <DatePicker
                label="Birthdate"
                // value={value}
                onChange={(date) => {
                  console.log(dayjs(String(date.$d)));
                }}
                renderInput={(params) => <TextField {...params} />}
              />

              <LoginCard />
            </Stack>
          )}
          {loggedIn && (
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
            >
              {/* <AppBar></AppBar> */}
              <Card sx={{ width: "25%", mb: 5 }}>
                <CardContent>
                  <Stack justifyContent={"center"} alignItems={"center"}>
                    <Typography variant="h5">You have played for</Typography>
                    <Typography variant="h2">{totalHours} hours</Typography>
                    <PlaytimePieChart
                      COLORS={COLORS}
                      data={ownedGames.slice(0, 20)}
                    />
                  </Stack>
                </CardContent>
              </Card>
              <GameWageCard
                totalHours={totalHours}
                sx={{ mb: 5, width: "25%", p: 2 }}
              />

              <Card sx={{ p: 2 }}>
                <CardContent>
                  <Stack
                    alignItems="center"
                    alignContent={"center"}
                    justifyContent={"center"}
                  >
                    <Typography variant="h4" component="h2">
                      Your Top 20 Games by Play Time
                    </Typography>

                    <Stack
                      alignItems="center"
                      alignContent={"center"}
                      justifyContent={"center"}
                    >
                      {ownedGames.slice(0, 20).map((game, i) => {
                        return (
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            alignContent={"center"}
                            justifyContent={"center"}
                          >
                            <Box
                              width={10}
                              height={10}
                              sx={{
                                "background-color": COLORS[i % COLORS.length],
                              }}
                            />
                            <Typography
                              variant="body1"
                              sx={{
                                fontSize: Math.max(50 * ((20 - i) / 20), 10),
                              }}
                            >
                              {game.name}
                            </Typography>
                          </Stack>
                        );
                      })}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          )}
        </Stack>
        <Stack
          height={100}
          alignItems="center"
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Typography variant="h6">Snap Engineering Academy 2022</Typography>
        </Stack>
      </ThemeProvider>
    </>
  );
}

export default App;
