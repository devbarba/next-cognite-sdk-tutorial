import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFilters } from "../../../contexts/FilterContext";
import { useRoot } from "../../../contexts/RootContext";
import styles from "./CogFilter.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

type CogFilterProps = {
  labelSearch?: string;
};

export function CogFilter({ labelSearch }: CogFilterProps) {
  type typeFieldsFiltersPage = {
    [key: string]: string[];
  };

  const defaultLabelSearch = "Advanced search filters";
  const pathName = useRouter().pathname;
  const { handleCurrentPagination } = useRoot();
  const { filters, handleFilters } = useFilters();
  const [showFilters, setShowFilters] = useState(true);
  const [name, setName] = useState("");
  const [limit, setLimit] = useState();
  const [sdate, setSDate] = useState();
  const [edate, setEDate] = useState();
  const [publish, setPublish] = useState(Boolean);

  const fieldsFilter = [
    {
      label: "Asset Name",
      type: "text",
      mask: null,
      value: name,
      keyDown: null,
      onChangeFunction: setName,
    },
    {
      label: "Limit",
      type: "number",
      mask: null,
      value: limit,
      keyDown: null,
      onChangeFunction: setLimit,
    },
    {
      label: "Published",
      type: "boolean",
      mask: null,
      value: publish,
      keyDown: null,
      onChangeFunction: setPublish,
    },
    {
      label: "Start Date",
      type: "date",
      mask: null,
      value: sdate,
      keyDown: null,
      onChangeFunction: setSDate,
    },
    {
      label: "End Date",
      type: "date",
      mask: null,
      value: edate,
      keyDown: null,
      onChangeFunction: setEDate,
    },
  ];

  const filterFieldsPages: typeFieldsFiltersPage = {
    "/": ["Asset Name", "Limit"],
    "/t-series": ["Published"],
  };

  const filterFieldsPagesAtual = filterFieldsPages[pathName];

  const fieldsFilterExibhition = [fieldsFilter[0]];

  fieldsFilterExibhition.pop();

  fieldsFilter.map((valueFiltros, index) => {
    if (filterFieldsPagesAtual.includes(valueFiltros.label)) {
      fieldsFilterExibhition.push(valueFiltros);
    }
    return null;
  });

  const handleClean = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    handleCurrentPagination(1);
    setName("");
    setLimit(25);
    setSDate();
    setEDate();
    setPublish(false);
    handleFilters({
      name: "",
      limit: 25,
      sdate: "",
      edate: "",
      publish: false,
    });
  };

  const handleFilter = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    handleCurrentPagination(1);
    handleFilters({
      name,
      limit,
      sdate,
      edate,
      publish,
    });
  };

  const handleShowFilter = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div
      className={`block-Search-Filters ${
        showFilters ? "showFilter" : `${styles.cogFilterContainerSecondary}`
      }`}
    >
      <Grid className={`${styles.cogFilterDisable}`}>
        <div className={styles.cogFilterInputContainer}>
          {fieldsFilterExibhition.map((field, idx) => {
            return (
              <div key={idx} className={styles.cogFilterInputContainerInside}>
                <TextField

                  type={field.type}
                  placeholder="Search for Assets"
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    field.onChangeFunction(e.currentTarget.value)
                  }
                  onKeyPress={(e: any) => {
                    if (e.key === "Enter") {
                      handleFilter(e);
                    }
                  }}
                  //onKeyDown={field.keyDown}
                  value={field.value}
                  // @ts-ignore
                  options={field.options}
                />
              </div>
            );
          })}

          <Button
            text={"Clear Filters"}
            placeholder={"Clear Filters"}
            // buttonColor={'#FFFFFF'}
            type={"fit"}
            //@ts-ignore
            onClick={(e: React.FormEvent<HTMLInputElement>) => handleClean(e)}
            classesBlockOption={styles.cogFilterButtons}
          >
            Clear
          </Button>
          <Button
            text={"Filter"}
            type={"fit"}
            //@ts-ignore
            onClick={(e: React.FormEvent<HTMLInputElement>) => handleFilter(e)}
            classesBlockOption={"inline-block"}
          >
            Search
          </Button>
        </div>
      </Grid>
    </div>
  );
}
