export default function(textData: string) {
  let array = textData.split('\n');
  let jsonData = [];
  let headers = array[0].split(',');
  for (let i = 1; i < array.length; i++) {
    let data = array[i].split(',');
    let obj: any = {};
    for (let j = 0; j < data.length; j++) {
      obj[headers[j].trim()] = data[j].trim();
    }
    jsonData.push(obj);
  }

  return jsonData;
}