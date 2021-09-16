import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import dynamic from "next/dynamic";
import { useState } from "react";
import {
  FormGroup,
  MenuItem,
  Select,
  TextField,
  Grid,
} from "@material-ui/core";

import { SportsSoccer } from "@material-ui/icons";
import {
  FORMATION_LAYERS,
  FORMATION_POSITIONS,
  FORMATION_POSITION_NAMES,
} from "../utils/formation";

import { SwatchesPicker } from "react-color";

const defaultMatchText = `____ vs. ____
Date, Stadium
Projected lineup
`;

const GraphicComponent = dynamic(() => import("../Components/Graphic"), {
  ssr: false,
});

const PlayerInput = ({
  player,
  idx,
  positionTitle,
  showPosition = true,
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
        <TextField
          fullWidth
          onChange={(ev) => onChange("name", ev.currentTarget.value)}
          id={`outfield-${idx}`}
          variant="outlined"
          label={positionTitle}
          defaultValue={player.name}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          onChange={(ev) => onChange("playerNumber", ev.currentTarget.value)}
          id={`outfield-no-${idx}`}
          variant="outlined"
          label="Player No."
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
  const [formation, setFormation] = useState<Lineup.Formations>("4-2-3-1");

  const [playerState, setPlayerState] = useState<Lineup.PositionedPlayer[]>([
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
  ]);

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

  const [themeFill, setThemeFill] = useState<string>("#C41F35");
  const [themeStroke, setThemeStroke] = useState<string>("#00189E");

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
        <Grid item lg={6}>
          <main className={styles.main}>
            <h1 className={styles.title}>Lineup Graphic Builder</h1>

            <p className={styles.description}>
              Because sometimes, you want to build a lineup graphic.
              <SportsSoccer />
            </p>
          </main>

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
            }}
          />
        </Grid>
        <Grid item lg={6}>
          <div className={styles.formSection}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <h3>Player Color</h3>
                <SwatchesPicker
                  color={themeFill}
                  onChange={(color) => setThemeFill(color.hex)}
                />
              </Grid>
              <Grid item md={6}>
                <h3>Player Outline</h3>
                <SwatchesPicker
                  color={themeStroke}
                  onChange={(color) => setThemeStroke(color.hex)}
                />
              </Grid>
            </Grid>

            <form noValidate autoComplete="off">
              <h3>Formation</h3>
              <FormGroup row>
                <Select
                  fullWidth
                  variant="outlined"
                  defaultValue="4-2-3-1"
                  onChange={(ev) =>
                    setFormation(ev.target.value as Lineup.Formations)
                  }
                >
                  {Object.keys(FORMATION_POSITIONS).map((formation, idx) => (
                    <MenuItem key={idx} value={formation}>
                      {formation}
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
      </Grid>
    </div>
  );
};

export default Home;
