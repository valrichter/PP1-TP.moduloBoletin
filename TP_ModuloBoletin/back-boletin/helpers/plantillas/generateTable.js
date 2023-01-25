//* Aca se crea la tabla *//
const table = async function table(data, columns) {
  // console.log(data,columns);
  return {
    fontSize: 10,
    table: {
      headerRows: 1,
      body: await buildTableBody(data, columns),
    },

  };
};

function buildTableBody(data, columns) {
  var body = [];

  body.push(columns);

  data.forEach(function (row) {
    var dataRow = [];

    columns.forEach(function (column) {
      dataRow.push(row[column]);
    });

    body.push(dataRow);
  });
  return body;
}
//* Aca se crea la tabla *//

module.exports = table;
