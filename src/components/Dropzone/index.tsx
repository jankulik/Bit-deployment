import { useRef } from 'react';
import { Text, Group, Button } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons';
import { useStyles } from './styles';

export default function DropzoneButton() {
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    console.log(response);
    return response.json();
  }

  const csvParser = (text: string) => {
    let arr = text.split('\n');
    let jsonObject = [];
    let headers = arr[0].split(',');
    for (let i = 1; i < arr.length; i++) {
      let data = arr[i].split(',');
      let obj: any = {};
      for (let j = 0; j < data.length; j++) {
        obj[headers[j].trim()] = data[j].trim();
      }
      jsonObject.push(obj);
    }

    const yearMean = 1993.914251
    const hoursMean = 2672.779697

    jsonObject = jsonObject.map(object => ({ ...object, "Sales Timestamp": Date.parse(object['Sales date'] + ' GMT') / 1000 }));

    jsonObject = jsonObject.map(object => {
      object["Year Made"] == 1000 ? object["Year Made"] = yearMean : object["Year Made"] = parseFloat(object["Year Made"]);
      object["MachineHours CurrentMeter"] == "" ? object["MachineHours CurrentMeter"] = hoursMean : object["MachineHours CurrentMeter"] = parseFloat(object["MachineHours CurrentMeter"]);
      object["Sales Timestamp"] = parseFloat(object["Sales Timestamp"])

      const input_1 = [object["Year Made"], object["MachineHours CurrentMeter"], object["Sales Timestamp"]];

      delete object[""];
      delete object["Sales Price"]
      delete object["Sales ID"];
      delete object["Machine ID"];
      delete object["Model ID"];
      delete object["Sales date"];
      delete object["Year Made"];
      delete object["MachineHours CurrentMeter"];
      delete object["Sales Timestamp"];

      const input_2 = Object.values(object);
      return { input_1, input_2 };
    });

    jsonObject = JSON.parse(JSON.stringify(jsonObject).replace(/""/g, '"None or Unspecified"'));
    console.log(jsonObject);

    postData("http://localhost:8501/v1/models/model:predict", { "instances": jsonObject })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.csv]}
        maxSize={30 * 1024 ** 2}
        onDrop={(file) => {
          if (file) {
            const reader = new FileReader();
            reader.onload = function (event: any) {
              const text = event.target.result;
              csvParser(text);
            };

            reader.readAsText(file[0]);
          }
        }}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group position="center">
            <Dropzone.Accept>
              <IconDownload size={50} color={theme.colors[theme.primaryColor][6]} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload
                size={50}
                color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Group>

          <Text align="center" weight={700} size="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>CSV file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Upload data</Dropzone.Idle>
          </Text>
          <Text align="center" size="sm" mt="xs" color="dimmed">
            Drag and drop the file here to upload. We can accept only <i>.csv</i> files that
            are less than 30mb in size.
          </Text>
        </div>
      </Dropzone>

      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
        Select files
      </Button>
    </div>
  );
}
