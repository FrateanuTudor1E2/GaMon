fetch('api/Zone').then((response) => {
    return response.json();
}).then((data) => {
    const root = document.getElementById("zone");

    const defaultOpt = document.createElement('option');
    defaultOpt.appendChild(document.createTextNode("Zona"));
    defaultOpt.value = "Zona";
    defaultOpt.selected = true;
    root.appendChild(defaultOpt);
   

    for (var i = 0; i < data.json_agg.length; i++) {
        const zona = document.createElement('option');
        const numeZona = document.createTextNode(data.json_agg.at(i).Nume);
        zona.appendChild(numeZona);
        zona.value = data.json_agg.at(i).ID;
        root.appendChild(zona);
    }
}).catch(function (err) {
    console.log(err);
});