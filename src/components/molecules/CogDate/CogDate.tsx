
import React, { useState } from "react";
import CogButton from "../../atoms/CogButton";
import CogInput from "../../atoms/CogInput";
import { Grid } from '@mui/material';
import styles from "./CogDate.module.scss";

export function CogDate() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState("");
  const datePicker = [
    {
      label: "Start Date",
      type: "date",
      mask: null,
      value: startDate,
      keyDown: null,
    },
    {
      label: "End Date",
      type: "date",
      mask: null,
      value: endDate,
      keyDown: null,
    },
  ];

  const dateSeries = [
    {
      label: "1w",
      type: "button",
      mask: null,
      value: startDate,
      keyDown: null,
    },
    {
      label: "1m",
      type: "button",
      mask: null,
      value: endDate,
      keyDown: null,
    },
    {
      label: "1y",
      type: "button",
      mask: null,
      value: endDate,
      keyDown: null,
    },
  ];

  const fetchReports = () => {
    alert("hello");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
      {datePicker.map((date, idx) => (
          <CogInput
            key={idx}
            label={date.label}
            type={date.type}
            onChange={(e: any) => {
              if (idx === 0) {
                setStartDate(e.target.value);
              } else {
                setEndDate(e.target.value);
              }
            }}
          />
        ))}
      </Grid>
      <Grid item xs={2}>

      <div className={styles.cogSeries}>
        {dateSeries.map((date, idx) => (
          <CogButton key={idx} text={date.label} />
        ))}
      </div>
    
      </Grid>
      
    </Grid>     
   
  );
}
