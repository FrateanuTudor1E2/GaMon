
const createRow= (row) =>`
<tr>
    <td>${row.from}</td>
    <td>${row.to}</td>
    <td>${row.sum}</td>
    <td>${row.tipGunoi}</td>
    <td>${row.idCartier}</td>
    <td>${row.numeCartier}</td>
    <td>${row.idZona}</td>
    <td>${row.numeZona}</td> 
</tr>`


const createTable = (rows)=>`
<table>
    <tr>
        <th>Date From</th>
        <th>Date To</th>
        <th>Quantity</th>
        <th>Garbage Type</th>
        <th>ID Cartier</th>
        <th>Name Cartier</th>
        <th>ID Zona</th>
        <th>Nume Zona</th>
    </tr>
    ${rows}
</table>`


const createHtml= (table)=>`
<html lang="en">
<head>
    <style>
        table {
          width: 100%;
        }
        tr {
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          padding: 15px;
        }
        tr:nth-child(odd) {
          background: #CCC
        }
        tr:nth-child(even) {
          background: #FFF
        }
        .no-content {
          background-color: red;
        }
      </style>
</head>
<body>
${table}
</body>

</html>
`

const createHtmlSVG=(svg)=>`
<html lang='en'>

<head></head>
<body>
${svg};
</body>
</html>
`

module.exports={
  createRow,
  createTable,
  createHtml,
  createHtmlSVG
}