
async function getPubeleFull(event) {
    event.preventDefault();
    fetch('api/getPubRaportat', {
        method: "GET",
        credentials: "same-origin",

    }).then(response => response.json()).then(data => {

        const oldPub = document.getElementById('table-pub');
        var root;
        if (oldPub !== null) {
            root= oldPub.parentElement;
            root.removeChild(oldPub);
        }
        if (data.json_agg != null) {
            const newPub = document.createElement('div');
            newPub.setAttribute('id', 'table-pub');

            const tablePub = document.createElement('table');
            tablePub.setAttribute('class', 'table');
            const tableBody = document.createElement('tbody');

            const row = document.createElement("tr");

            addToRow(row, 'Bin ID', 'th');
            addToRow(row, 'Garbage Quantity', 'th');
            addToRow(row, 'Cartier', 'th');
            addToRow(row, 'Zona', 'th');
            tableBody.appendChild(row);

            for (var i = 0; i < data.json_agg.length; i++) {
                const row = document.createElement("tr");

                addToRow(row, data.json_agg.at(i).ID, 'td');
                addToRow(row, data.json_agg.at(i).cantitate, 'td');
                addToRow(row, data.json_agg.at(i).cart, 'td');
                addToRow(row, data.json_agg.at(i).zn, 'td');



                tableBody.appendChild(row);

            }

            tablePub.appendChild(tableBody);
            newPub.appendChild(tablePub);
            root.appendChild(newPub)
        }
    })

}

async function DeleteReports(event) {
    event.preventDefault();
    const id = document.getElementById('id-report').value;
    const url = 'api/Reports/' + id;
    fetch(url, {
        method: "DELETE",
        credentials: "same-origin"
    }).then(response => {
        window.alert("Report has been deleted");
    })
}

async function RequestsReports(event) {

    event.preventDefault();

    fetch('api/Reports', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
    }).then(response => response.json()).then(data => {

        const oldReports = document.getElementById('table-reports');
        const root = oldReports.parentElement;
        if (oldReports !== null) {
            root.removeChild(oldReports);
        }
        if (data.json_agg != null) {
            const newReports = document.createElement('div');
            newReports.setAttribute('id', 'table-reports');

            const tableReports = document.createElement('table');
            tableReports.setAttribute('class', 'table');
            const tableBody = document.createElement('tbody');

            const row = document.createElement("tr");

            addToRow(row, 'Report ID', 'th');
            addToRow(row, 'Description', 'th');
            addToRow(row, 'idUser', 'th');
            tableBody.appendChild(row);

            for (var i = 0; i < data.json_agg.length; i++) {
                const row = document.createElement("tr");

                addToRow(row, data.json_agg.at(i).ID, 'td');
                addToRow(row, data.json_agg.at(i).descriere, 'td');
                addToRow(row, data.json_agg.at(i).idUser, 'td');


                tableBody.appendChild(row);

            }

            tableReports.appendChild(tableBody);
            newReports.appendChild(tableReports);
            root.appendChild(newReports)
        }
    })

}