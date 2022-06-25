function addToRow(row, text, type) {
    const cell = document.createElement(type);
    const cellText = document.createTextNode(text);
    cell.appendChild(cellText);
    row.appendChild(cell);
}

async function DeleteEvents(event) {
    event.preventDefault();
    const id = document.getElementById('id-event').value;
    const url = 'api/Events/' + id;
    fetch(url, {
        method: "DELETE",
        credentials: "same-origin"
    }).then(response => {
        window.alert("Event has been deleted");
    })

}
async function RequestsEvents(event) {
    event.preventDefault();

    fetch('api/Events', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
    }).then(response => response.json()).then(data => {

        const oldEvents = document.getElementById('table-events');
        var root;
        if (oldEvents !== null) {
            root = oldEvents.parentElement;
            root.removeChild(oldEvents);
        }
        if (data.json_agg != null) {
            const newEvents = document.createElement('div');
            newEvents.setAttribute('id', 'table-events');

            const tableEvents = document.createElement('table');
            tableEvents.setAttribute('class', 'table');
            const tableBody = document.createElement('tbody');

            const row = document.createElement("tr");

            addToRow(row, 'Event ID', 'th');
            addToRow(row, 'Description', 'th');
            addToRow(row, 'Name', 'th');
            tableBody.appendChild(row);

            for (var i = 0; i < data.json_agg.length; i++) {
                const row = document.createElement("tr");

                addToRow(row, data.json_agg.at(i).ID, 'td');
                addToRow(row, data.json_agg.at(i).descriere, 'td');
                addToRow(row, data.json_agg.at(i).nume, 'td');



                tableBody.appendChild(row);

            }

            tableEvents.appendChild(tableBody);
            newEvents.appendChild(tableEvents);
            root.appendChild(newEvents)
        }
    })
}
