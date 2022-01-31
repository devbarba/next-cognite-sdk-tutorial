import type { NextPage } from "next";
import Head from "next/head";
import HomePage from "../components/templates/HomePage";
import CogPage from "../components/templates/CogPage";
import {
  Grid,
} from "@mui/material";


const LandingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cognite | Home</title>
      </Head>
      <CogPage>
        <Grid container spacing={4} style={{ padding: 50 }}>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              Glossary da
            </Grid>
          </Grid>
        </Grid>
      </CogPage>
     
    </>
  );
};

export default LandingPage;
