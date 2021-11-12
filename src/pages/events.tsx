import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Asset } from "@cognite/sdk";
import { useAuth } from "../contexts/AuthContext";
import CogPage from "../components/templates/CogPage";
import CogRoundedContainer from "../components/atoms/CogRoundedContainer";
import CogHeaderFull from "../components/atoms/CogHeaderFull";
import CogTable from "../components/molecules/CogTable";
import { useRoot } from "../contexts/RootContext";
import { useRouter } from "next/router";
import CogFilter from "../components/molecules/CogFilter";
import { useFilters } from "../contexts/FilterContext";
import moment from "moment";
import Button from "@mui/material/Button";

const Home: NextPage = () => {
  const {
    lastPage,
    currentPagination,
    handleLastPage,
    handleCurrentPagination,
  } = useRoot();
  const { client, loggedIn, handleLoggedIn } = useAuth();
  const { filters } = useFilters();

  const router = useRouter();

  const [actualPage, setActualPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [assets, setAssets] = useState<Asset[]>({} as Asset[]);
  const [events,setEvents] = useState([]);

  useEffect(() => {}, [client]);

 
  async function searchEvent() {

    

    const searchEvents = await client.events.list({ filter: { startTime: { min: new Date('1 jan 2018') }, endTime: { max: new Date('1 jan 2019') } } });


    if (searchEvents !== undefined && typeof searchEvents === "object") {
      let newEvents: any = [];
      console.log(searchEvents)
      searchEvents.items.slice(1,10).map((events, idx ) => {
        newEvents.push({
          externalId: events.externalId,
          createdTime : events.createdTime,
          startTime: events.startTime,
          endTime : events.endTime
        });
      });
      setEvents(newEvents);
      console.log(newEvents)
    }
  }

  useEffect(() => {
    searchEvent();
  }, []);

  useEffect(() => {
    // if (!router.query.id_token) handleLoggedIn(false);
  }, [router, loggedIn]);

  return (
    <>
      <Head>
        <title>Cognite Search</title>
      </Head>

      {!router.query.id_token ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Button
            variant="contained"
            onClick={() => handleLoggedIn(true)}
            style={{
              // backgroundColor: 'var(--dark-blue)',
              // color: 'var(--white)',
              padding: "10px 20px",
            }}
          >
            Log in
          </Button>
        </div>
      ) : (
        <CogPage>
          <CogHeaderFull label={"Assets"} icon={"fas fa-box"}>
            {}
          </CogHeaderFull>

          <CogFilter />

          <CogRoundedContainer>
            <h2>
              <div style={{ textAlign: "left", marginBottom: 20 }}>
                <p>{`${events.length > 0 ? events.length : 0} Events`}</p>
              </div>
            </h2>

            <CogTable
              lastPage={lastPage}
              tableData={{
                headers: ["ID", "Asset", "Description", "Created At"],
                data: events,
              }}
              noneMessage={"No events registered."}
              contentType={[
                {
                  columnIndex: 0,
                  type: "normal",
                },
                {
                  columnIndex: 1,
                  type: "normal",
                },
                {
                  columnIndex: 2,
                  type: "normal",
                },
                {
                  columnIndex: 3,
                  type: "tippy",
                  content: "date",
                },
              ]}
            />
          </CogRoundedContainer>
        </CogPage>
      )}
    </>
  );
};

export default Home;
