import type { NextPage } from "next";
import Head from "next/head";
import HomePage from "../components/templates/HomePage";
import {
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import Cards from "../contexts/store/cards.json";

const LandingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cognite | Home</title>
      </Head>
      <HomePage>
        <Grid container spacing={4} style={{ padding: 50 }}>
          <Grid item xs={7}>
            <Grid container spacing={4}>
              {Cards.map((card, idx) => (
                <Grid item xs={6} key={card.idx}>
                  <Card style={{ height: "auto", padding : 12 }}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          <i className={card.icon}></i> {card.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {card.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={5} >
            <iframe
              height="100%"
              width="100%"
              src="https://play.vidyard.com/CyU7KMvVfT47ok5Jh1vWPR??transparent=0"
              title="Vidyard video player"
              allowTransparency={true}
            ></iframe>
          </Grid>
        </Grid>
      </HomePage>
    </>
  );
};

export default LandingPage;
