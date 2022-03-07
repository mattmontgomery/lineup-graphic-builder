import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  FormGroup,
  MenuItem,
  Select,
  TextField,
  Grid,
  FormLabel,
} from "@mui/material";

import { SportsSoccer } from "@mui/icons-material";
import {
  FORMATION_LAYERS,
  FORMATION_POSITIONS,
  FORMATION_POSITION_NAMES,
} from "../utils/formation";

import { SwatchesPicker } from "react-color";
import useLocalStorage from "../utils/useLocalStorage";
import { useDebounce } from "../utils/useDebounce";

const defaultMatchText = `____ vs. ____
Date, Stadium
Projected lineup
`;

function getEmptyPlayerState(formation: Lineup.Formations) {
  return [
    EMPTY_PLAYER(formation, 0),
    EMPTY_PLAYER(formation, 1),
    EMPTY_PLAYER(formation, 2),
    EMPTY_PLAYER(formation, 3),
    EMPTY_PLAYER(formation, 4),
    EMPTY_PLAYER(formation, 5),
    EMPTY_PLAYER(formation, 6),
    EMPTY_PLAYER(formation, 7),
    EMPTY_PLAYER(formation, 8),
    EMPTY_PLAYER(formation, 9),
    EMPTY_PLAYER(formation, 10),
  ];
}

const GraphicComponent = dynamic(() => import("../Components/Graphic"), {
  ssr: false,
});

const PlayerInput = ({
  player,
  idx,
  positionTitle,
  onChange = () => {},
}: {
  player: Lineup.PositionedPlayer;
  idx: number;
  positionTitle?: string | null;
  showPosition?: boolean;
  onChange: (field: string, value: string) => void;
}): React.ReactElement => (
  <FormGroup row>
    <Grid spacing={1} container style={{ marginBottom: ".25rem" }}>
      <Grid item xs={6}>
        <FormLabel sx={{ fontSize: 14 }}>{positionTitle}</FormLabel>
        <TextField
          fullWidth
          hiddenLabel
          onChange={(ev) => onChange("name", ev.currentTarget.value)}
          id={`outfield-${idx}`}
          variant="filled"
          defaultValue={player.name}
        />
      </Grid>
      <Grid item xs={6}>
        <FormLabel sx={{ fontSize: 14 }}>Number</FormLabel>
        <TextField
          fullWidth
          hiddenLabel
          onChange={(ev) => onChange("playerNumber", ev.currentTarget.value)}
          id={`outfield-no-${idx}`}
          variant="filled"
          defaultValue={player.playerNumber}
        />
      </Grid>
    </Grid>
  </FormGroup>
);

const EMPTY_PLAYER = (
  formation: Lineup.Formations,
  idx: number
): Lineup.PositionedPlayer => ({
  idx,
  name: "",
  position: FORMATION_POSITIONS[formation][idx],
  playerNumber: "",
});

const Home: NextPage = () => {
  const [matchDetail, setMatchDetail] = useState<string>(defaultMatchText);
  const [defaultFormation, setDefaultFormation] =
    useLocalStorage<Lineup.Formations>("formation", "4-2-3-1");
  const [formation, setFormation] =
    useState<Lineup.Formations>(defaultFormation);

  useEffect(() => {
    setFormation(defaultFormation);
  }, [defaultFormation]);
  const [lsPlayerState, setLsPlayerState] = useLocalStorage<
    Lineup.PositionedPlayer[]
  >("player-state", getEmptyPlayerState(formation));

  const [playerState, setPlayerState] = useState<Lineup.PositionedPlayer[]>(
    lsPlayerState ? lsPlayerState : getEmptyPlayerState(formation)
  );

  const debouncedPlayerState = useDebounce<Lineup.PositionedPlayer[]>(
    playerState,
    1000
  );

  const playersInFormation = playerState.map((player, idx) => ({
    ...player,
    position: FORMATION_POSITIONS[formation][idx],
  }));

  const players: Lineup.Group[] = [
    ...FORMATION_LAYERS[formation].map((_, idx) =>
      playersInFormation.slice(
        FORMATION_LAYERS[formation][idx][0],
        FORMATION_LAYERS[formation][idx][1]
      )
    ),
  ].reverse();

  const [themeFill, setThemeFill] = useLocalStorage<string>(
    "theme-fill",
    "#C41F35"
  );
  const [themeStroke, setThemeStroke] = useLocalStorage<string>(
    "theme-stroke",
    "#00189E"
  );
  const [themeBackground, setThemeBackground] = useLocalStorage<string>(
    "theme-background",
    "#f0f0f0"
  );

  useEffect(() => {
    setLsPlayerState(debouncedPlayerState);
  }, [debouncedPlayerState, setLsPlayerState]);

  const [matchTitle, matchDate, subTitle] = matchDetail.split("\n");
  return (
    <div className={styles.container}>
      <Head>
        <title>Lineup Graphic Builder</title>
        <meta
          name="description"
          content="A tool for putting together lineup graphics!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container>
        <Grid item lg={6} md={8}>
          <main className={styles.main}>
            <h1 className={styles.title}>Lineup Graphic Builder</h1>

            <p className={styles.description}>
              Because sometimes, you want to build a lineup graphic.
              <SportsSoccer />
            </p>

            <GraphicComponent
              radius={25}
              players={players}
              matchDate={matchDate}
              matchTitle={matchTitle}
              subTitle={subTitle}
              onPlayerClick={(idx) => {
                document.getElementById(`outfield-${idx}`)?.focus();
              }}
              themeColors={{
                fill: themeFill,
                stroke: themeStroke,
                background: themeBackground,
              }}
            />
          </main>
        </Grid>
        <Grid item lg={6} md={4}>
          <div className={styles.formSection}>
            <form noValidate autoComplete="off">
              <h3>Formation</h3>
              <FormGroup row>
                <Select
                  fullWidth
                  variant="outlined"
                  defaultValue={formation}
                  onChange={(ev) => {
                    setFormation(ev.target.value as Lineup.Formations);
                    setDefaultFormation(ev.target.value as Lineup.Formations);
                  }}
                >
                  {Object.keys(FORMATION_POSITIONS)
                    .sort()
                    .map((formationOption, idx) => (
                      <MenuItem
                        key={idx}
                        value={formationOption}
                        selected={formationOption === formation}
                      >
                        {formationOption}
                      </MenuItem>
                    ))}
                </Select>
              </FormGroup>
              <h3>Players</h3>
              {playerState.map((player, idx) => {
                return (
                  <PlayerInput
                    player={player}
                    key={idx}
                    idx={idx}
                    positionTitle={FORMATION_POSITION_NAMES[formation][idx]}
                    showPosition={false}
                    onChange={(field, value) => {
                      setPlayerState([
                        ...playerState.slice(0, idx),
                        {
                          ...playerState[idx],
                          [field]: value,
                        },
                        ...playerState.slice(idx + 1),
                      ]);
                    }}
                  />
                );
              })}
              <FormGroup>
                <h3>Match Detail input</h3>
                <textarea
                  defaultValue={defaultMatchText}
                  className={styles.textarea}
                  onChange={(ev) => setMatchDetail(ev.currentTarget.value)}
                />
              </FormGroup>
            </form>
          </div>
        </Grid>
        <Grid container spacing={2}>
          <Grid item lg={4} md={6}>
            <h3>Player Color</h3>
            <SwatchesPicker
              color={themeFill}
              onChange={(color) => setThemeFill(color.hex)}
            />
          </Grid>
          <Grid item lg={4} md={6}>
            <h3>Player Outline</h3>
            <SwatchesPicker
              color={themeStroke}
              onChange={(color) => setThemeStroke(color.hex)}
            />
          </Grid>
          <Grid item lg={4} md={6}>
            <h3>Background Color</h3>
            <SwatchesPicker
              color={themeBackground}
              onChange={(color) => setThemeBackground(color.hex)}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
