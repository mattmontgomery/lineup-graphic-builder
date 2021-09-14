import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import dynamic from "next/dynamic";
import { useState } from "react";

const defaultText = `Rubin|14|center
Rusnak|11|center-left-3, Kreilach|8|center, Menendez|10|center-right-3
Ruiz|6|center-left, Besler|13|center-right
Morgan|3|left, Glad|15|center-left, Silva|30|center-right, Herrera|22|right
Ochoa|1|center`;

const defaultMatchText = `San Jose Earthquakes vs. Real Salt Lake
Sept. 15, 2021, Avaya Stadium
Real Salt Lake projected lineup
`;

const GraphicComponent = dynamic(() => import("../Components/Graphic"), {
  ssr: false,
});
const Home: NextPage = () => {
  const [lineup, setLineup] = useState<string>(defaultText);
  const [matchDetail, setMatchDetail] = useState<string>(defaultMatchText);

  const players = lineup
    ?.split(`\n`)
    .filter(Boolean)
    .map((line): Lineup.Group => {
      return line.split(",").map((playerText) => {
        const [name, playerNumber, position] = playerText.trim().split("|") as [
          string,
          string,
          Lineup.PositionValues
        ];
        return { name, playerNumber, position };
      });
    });
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
        />

        <div className={styles.section}>
          <h3>Lineup input</h3>
          <textarea
            defaultValue={defaultText}
            className={styles.textarea}
            onChange={(ev) => setLineup(ev.currentTarget.value)}
          />
          <p className={styles.helperText}>
            Formatting: <code>Player Name|Number|position</code>. Separate
            players in one by commas.
          </p>
          <p className={styles.helperText}>
            {`Position is one of "left", "center-left", "center-left-3", "center",
            "center-right-3", "center-right", "right"`}
          </p>
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
