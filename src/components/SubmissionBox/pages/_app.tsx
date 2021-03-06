import {
  AppBar,
  Box,
  Container,
  createStyles,
  CssBaseline,
  IconButton,
  Link,
  makeStyles,
  ThemeProvider,
  Toolbar,
  Typography
} from '@material-ui/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useState } from 'react';
import { darkTheme, lightTheme } from '../theme';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

export default function MyApp({ Component, pageProps }: AppProps) {
  const classes = useStyles();
  const [theme, setTheme] = useState(darkTheme);
  const isDarkTheme = theme === darkTheme;


  return (
    <React.Fragment>
      <Head>
        <title>Multiple File Upload</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <Typography variant="h6" className={classes.title}>
              Multiple File Upload
            </Typography>

            
          </Toolbar>
        </AppBar>

        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Container>
          <Box marginTop={10}>
            Source code (GitHub):{' '}
            <Link href="https://github.com/bmvantunes/youtube-2021-feb-multiple-file-upload-formik">
              https://github.com/bmvantunes/youtube-2021-feb-multiple-file-upload-formik
            </Link>
          </Box>
          <Box>
            YouTube video:{' '}
            <Link href="https://youtu.be/MAw0lQKqjRA">
              https://youtu.be/MAw0lQKqjRA
            </Link>
          </Box>
          <Box marginTop={3}>
            <Component {...pageProps} />
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
