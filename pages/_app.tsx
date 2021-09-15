import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavStyles from "../styles/Nav.module.css";
import Link from "next/link";
import { createTheme, ThemeProvider } from "@material-ui/core";
import "../styles/globals.css";

const theme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
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
            <strong>2021-09-15</strong>: Revamped user input interface, added
            formation dropdown, added color selector for player circles
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
