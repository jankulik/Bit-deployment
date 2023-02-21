import csvToJson from "./csvToJson";

export default function dataPreprocessing(textData: string) {
  const yearMean = 1993.914251
  const hoursMean = 2672.779697
  
  let jsonData = csvToJson(textData);
  jsonData = jsonData.map(object => ({ ...object, "Sales Timestamp": Date.parse(object['Sales date'] + ' GMT') / 1000 }));

  jsonData = jsonData.map(object => {
    object["Year Made"] == 1000 ? object["Year Made"] = yearMean : object["Year Made"] = parseFloat(object["Year Made"]);
    object["MachineHours CurrentMeter"] == "" ? object["MachineHours CurrentMeter"] = hoursMean : object["MachineHours CurrentMeter"] = parseFloat(object["MachineHours CurrentMeter"]);
    object["Sales Timestamp"] = parseFloat(object["Sales Timestamp"])

    const input_1 = [object["Year Made"], object["MachineHours CurrentMeter"], object["Sales Timestamp"]];

    delete object[""];
    delete object["Sales Price"];
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

  jsonData = JSON.parse(JSON.stringify(jsonData).replace(/""/g, '"None or Unspecified"'));

  return jsonData;
}