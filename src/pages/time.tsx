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

const Time: NextPage = () => {
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
  const [models3D, setmodels3D] = useState()

  useEffect(() => { }, [client]);

  async function searchAsset() {

    const models3D = await client.models3D.list({ published: filters.publish });
    console.log(models3D);
    if (models3D !== undefined && typeof models3D === "object") {
      let newAssets: any = [];
      models3D.items.map((time) => {
        newAssets.push({
          id : time.id,
          name : time.name,
          created_at: {
            date: moment(time.createdTime).format("DD/MM/YYYY"),
            hour: moment(time.createdTime).format("HH:mm:ss"),
          },
        });
      });
      setAssets(newAssets);
      console.log(newAssets);
    }
  }
  useEffect(() => {
    if (filters.publish) searchAsset();
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
              headers: ["ID", "Name", "Created Time"],
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

export default Time;
