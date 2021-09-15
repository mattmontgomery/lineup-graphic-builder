import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import dynamic from "next/dynamic";
import { useState } from "react";
import {
  FormControl,
  FormGroup,
  MenuItem,
  Select,
  Box,
  TextField,
} from "@material-ui/core";

import { SportsSoccer } from "@material-ui/icons";
import {
  FORMATION_LAYERS,
  FORMATION_POSITIONS,
  FORMATION_POSITION_NAMES,
} from "../utils/formation";

const defaultMatchText = `San Jose Earthquakes vs. Real Salt Lake
Sept. 15, 2021, Avaya Stadium
Real Salt Lake projected lineup
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
    <Box m={1}>
      <FormControl>
        <TextField
          onChange={(ev) => onChange("name", ev.currentTarget.value)}
          id={`outfield-${idx}`}
          variant="outlined"
          label={positionTitle}
          defaultValue={player.name}
        />
      </FormControl>
    </Box>
    <Box m={1}>
      <FormControl>
        <TextField
          onChange={(ev) => onChange("playerNumber", ev.currentTarget.value)}
          id={`outfield-no-${idx}`}
          variant="outlined"
          label="Player No."
          defaultValue={player.playerNumber}
        />
      </FormControl>
    </Box>
    <Box m={1}>
      {showPosition && (
        <TextField
          select
          onChange={(ev) => {
            onChange("position", ev.target.value as string);
          }}
          label="Position"
          value={player.position || "center"}
          variant="outlined"
        >
          <MenuItem value="left">Left</MenuItem>
          <MenuItem value="center-left">Left-Center</MenuItem>
          <MenuItem value="center-left-3">Left-Center (three)</MenuItem>
          <MenuItem value="center">Center</MenuItem>
          <MenuItem value="center-right-3">Right-Center (three)</MenuItem>
          <MenuItem value="center-right">Right-Center</MenuItem>
          <MenuItem value="right">Right</MenuItem>
        </TextField>
      )}
    </Box>
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

      <main className={styles.main}>
        <h1 className={styles.title}>Lineup Graphic Builder</h1>

        <p className={styles.description}>
          Because sometimes, you want to build a lineup graphic.
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
        />
        <div className={styles.formSection}>
          <form noValidate autoComplete="off">
            <Box m={1}>
              <FormGroup row>
                <Select
                  autoWidth
                  variant="outlined"
                  defaultValue="4-2-3-1"
                  onChange={(ev) =>
                    setFormation(ev.target.value as Lineup.Formations)
                  }
                  IconComponent={() => <SportsSoccer />}
                >
                  {Object.keys(FORMATION_POSITIONS).map((formation, idx) => (
                    <MenuItem key={idx} value={formation}>
                      {formation}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
            </Box>
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
          </form>
        </div>

        <div className={styles.section}>
          <h3>Match Detail input</h3>
          <textarea
            defaultValue={defaultMatchText}
            className={styles.textarea}
            onChange={(ev) => setMatchDetail(ev.currentTarget.value)}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
