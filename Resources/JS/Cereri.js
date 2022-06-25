function addToRow(row, text, type) {
    const cell = document.createElement(type);
    const cellText = document.createTextNode(text);
    cell.appendChild(cellText);
    row.appendChild(cell);
}

async function RequestsHistory(event) {
    event.preventDefault();
    fetch('api/Cerere', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
    }).then(response => response.json()).then(data => {

        const oldHistory = document.getElementById('table-requests');
        var root;
        if (oldHistory !== null) {
            root = oldHistory.parentElement;
            root.removeChild(oldHistory);
        }
        if (data.json_agg != null) {
            const newHistory = document.createElement('div');
            newHistory.setAttribute('id', 'table-requests');

            const tableHistory = document.createElement('table');
            tableHistory.setAttribute('class', 'table');
            const tableBody = document.createElement('tbody');

            const row = document.createElement("tr");

            addToRow(row, 'Request ID', 'th');
            addToRow(row, 'Date of Request', 'th');
            addToRow(row, 'Quantity', 'th');
            addToRow(row, 'Type of Garbage', 'th');
            addToRow(row, 'Bin id', 'th');
            addToRow(row, 'Status', 'th')
            tableBody.appendChild(row);

            for (var i = 0; i < data.json_agg.length; i++) {
                const row = document.createElement("tr");

                addToRow(row, data.json_agg.at(i).ID, 'td');
                addToRow(row, data.json_agg.at(i).dataCerere, 'td');
                addToRow(row, data.json_agg.at(i).cantitate, 'td');
                addToRow(row, data.json_agg.at(i).tipGunoi, 'td');
                addToRow(row, data.json_agg.at(i).idPubela, 'td');
                if (data.json_agg.at(i).stare)
                    addToRow(row, 'solved', 'td');
                else
                    addToRow(row, 'not solved', 'td');

                tableBody.appendChild(row);

            }

            tableHistory.appendChild(tableBody);
            newHistory.appendChild(tableHistory);
            root.appendChild(newHistory)
        }
    })
}