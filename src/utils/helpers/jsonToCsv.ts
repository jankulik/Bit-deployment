export default function jsonToCsv(jsonData: any) {
  var fields = Object.keys(jsonData[0])
  var textData = jsonData.map(function (row: any) {
    return fields.map(function (fieldName) {
      return JSON.stringify(row[fieldName]).replace(/['"]+/g, '');
    }).join(',');
  })
  textData.unshift(fields.join(','));
  textData = textData.join('\r\n');

  return textData;
}