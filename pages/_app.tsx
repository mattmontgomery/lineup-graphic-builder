import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import NavStyles from "../styles/Nav.module.css";
import Link from "next/link";
import { createTheme, ThemeProvider } from "@material-ui/core";
import "../styles/globals.css";

const theme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="initial-scale=.5, width=device-width" />
      </Head>
      <div>
        <nav className={NavStyles.ExternalNav}>
          <strong>Soccer Blogger Tools</strong>
          <Link href="https://lineup-graphic-builder.vercel.app">
            Lineup Graphic Builder
          </Link>
          <Link href="https://formguide.vercel.app">MLS Form Guide</Link>
        </nav>
        <Component {...pageProps} />
        <footer className={NavStyles.Footer}>
          Created and maintained by{" "}
          <a href="https://twitter.com/thecrossbarrsl">Matt Montgomery</a>.{" "}
          <a href="https://github.com/mattmontgomery/lineup-graphic-builder">
            Contribute on Github
          </a>
          . Something not working? Send me a tweet.
        </footer>
        <footer className={NavStyles.Changelog}>
          <p>
            <strong>2021-09-18</strong>: Added 3-2-3-2 formation..
          </p>
          <p>
            <strong>2021-09-16</strong>: Added W-M formation. Updated desktop
            view. Enhanced form usability. Updated color picker to swatches for
            ease of use. Quality of life improvements across the board.
          </p>
          <p>
            <strong>2021-09-15</strong>: Revamped user input interface, added
            formation dropdown, added color selector for player circles. Added
            download button
          </p>
          <p>
            <strong>2021-09-14</strong>: Initial work on Lineup Graphic Builder.
            Added text interface for modifying players.
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
}
export default MyApp;
