import React from 'react';
import Head from 'next/head';
import { useStyles } from '../styles/home.styles';
import DropzoneButton from '../components/Dropzone';
import { useState } from 'react';
import dataPreprocessing from '../utils/helpers/dataPreprocessing';
import csvToJson from '../utils/helpers/csvToJson';
import jsonToCsv from '../utils/helpers/jsonToCsv';
import { Button } from '@mantine/core';
import { CSVLink } from 'react-csv';
import { useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

export default function Home() {
  const { classes, theme } = useStyles();

  const [csvTemplate, setCsvTemplate] = useState<string[][] | undefined>();
  const [csvData, setCsvData] = useState<string | undefined>();
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    setCsvTemplate([["datasource", "Auctioneer ID", "Year Made", "MachineHours CurrentMeter", "Usage Band",
      "Sales date", "Model Description", "Base Model", "Secondary Description", "Model Series", "Model Descriptor",
      "Machine Size", "Product Class Description", "State of Usage", "Product Group", "Product Group Description",
      "Driver System", "Enclosure", "Control", "Touchpad Type", "Control Type", "Version", "Transmission", "Turbo Charged",
      "Extra features", "Machine Width", "Clean Room", "Engine Horsepower", "Hydraulics", "Push Block", "Ripper",
      "Scarifier", "Tip Control", "Screen Size", "Coupler", "Couple System", "Grouser Tracks", "Hydraulics Flow",
      "Tupper Type", "Screen Size.1", "Stick Length", "Thumb", "Pattern Changer", "Grouser Type", "Backhoe Mounting",
      "Blade Type", "Travel Possibilities", "Differential Type", "Steering Controls"]]);
  }, []);

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return response;
  }

  const handleUpload = (textData: string) => {
    setButtonLoading(true);

    postData("http://localhost:8501/v1/models/model:predict", { "instances": dataPreprocessing(textData) })
      .then((responseData) => {
        if (responseData.ok) {
          return responseData.json();
        }
        throw new Error('Something went wrong');
      })
      .then((responseData) => {
        showNotification({
          autoClose: 10000,
          title: "Predictions have been calculated successfully",
          message: null,
          color: 'teal',
          icon: <IconCheck />
        });

        const jsonData = csvToJson(textData).map((object, index) => {
          if (object.hasOwnProperty("Sales Price")) {
            object["Sales Price"] = responseData.predictions[index][0];

            return object;
          }
          return ({ "Sales Price": responseData.predictions[index][0], ...object });
        });

        setCsvData(jsonToCsv(jsonData));
        setButtonLoading(false);
      })
      .catch((error) => {
        console.log(error);
        showNotification({
          autoClose: 10000,
          title: "Something went wrong",
          message: null,
          color: 'red',
          icon: <IconX />
        });
      });
  }

  return (
    <>
      <Head>
        <title>Price Prediction Tool</title>
      </Head>
      <div className={classes.wrapper}>
        <DropzoneButton handleUpload={handleUpload} />

        {csvTemplate != undefined &&
          <CSVLink
            data={csvTemplate}
            filename={"template.csv"}
          >
            <Button
              className={classes.control}
              size="md"
              radius="xl"
            >
              Download template
            </Button>
          </CSVLink>
        }

        {csvData != undefined ?
          <CSVLink
            data={csvData}
            filename={"predictions.csv"}
          >
            <Button
              className={classes.control}
              loading={buttonLoading}
              loaderPosition="center"
              size="md"
              radius="xl"
            >
              Download predictions
            </Button>
          </CSVLink>
          :
          <Button
            className={classes.control}
            disabled
            size="md"
            radius="xl"
          >
            Download predictions
          </Button>
        }
      </div>
    </>
  )
}
