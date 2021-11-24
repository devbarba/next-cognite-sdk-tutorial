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

  useEffect(() => { }, [client]);

  async function searchAsset() {
    const searchAssets = await client.assets.search({
      search: {
        query: filters.name,
      }, limit: filters.limit,
    });

    if (searchAssets !== undefined && typeof searchAssets === "object") {
      let newAssets: any = [];
      searchAssets.map((a: Asset, idx) => {
        newAssets.push({
          id: a.id,
          name: a.name,
          description: a.description,
          created_at: {
            date: moment(a.createdTime).format("DD/MM/YYYY"),
            hour: moment(a.createdTime).format("HH:mm:ss"),
          },
        });
      });
      setAssets(newAssets);
      console.log(newAssets);
    }
  }

  useEffect(() => {
    if (filters.name) searchAsset();
  }, [filters]);

  useEffect(() => {
    // if (!router.query.id_token) handleLoggedIn(false);
  }, [router, loggedIn]);

  return (
    <>
      <Head>
        <title>Cognite Search</title>
      </Head>

      <CogPage>
        <CogHeaderFull label={"Search Assets"} icon={"fas fa-box"}>
          {}
        </CogHeaderFull>

        <CogFilter />

        <CogRoundedContainer>
          <h2>
            <div style={{ textAlign: "left", marginBottom: 20 }}>
              <p>{`${assets.length > 0 ? assets.length : 0} Assets`}</p>
            </div>
          </h2>

          <CogTable
            lastPage={lastPage}
            tableData={{
              headers: ["ID", "Asset", "Description", "Created At"],
              asterisc: [3],
              data: assets,
            }}
            noneMessage={"No assets registered."}
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
    </>
  );
};

export default Home;
