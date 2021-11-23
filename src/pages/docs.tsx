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

const Docs: NextPage = () => {
  
  return (
    <>
      <Head>
        <title>Cognite Docs</title>
      </Head>

      <CogPage>
        <CogHeaderFull label={"Explore CDF"} icon={"fas fa-box"}>
          {}
        </CogHeaderFull>
      
      </CogPage>
    </>
  );
};

export default Docs;
