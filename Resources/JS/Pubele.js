function addPubela() {
    var tgunoi = document.getElementById("selected_type").value;
    var cap = document.Pubele.capacitate.value;
    var cant = document.Pubele.cantitate.value;
    var idCartier = document.Pubele.idcartier.value;

    fetch('/api/addPubela', {
        method: 'POST',
        body: JSON.stringify({
            "tipGunoi": tgunoi,
            "capacitate":cap,
            "cantitate":cant,
            "idCartier":idCartier

        } ),credentials: "same-origin"
    }).then((response) => {
        window.alert('Pubela has been registred')
    }).then(function (err) { console.log(err) }).then(() => {
        getPubela();
       
})
}
function getPubela() {
    document.getElementById("tbl2").textContent = '';
    fetch('/api/Pubele', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
    }).then(response => response.json()).then(data => {
        const root = document.getElementById("tbl2");
        var tr = document.createElement('tr');
        var td1 = tr.appendChild(document.createElement('th'));
        var td2 = tr.appendChild(document.createElement('th'));
        var td3 = tr.appendChild(document.createElement('th'));
        var td4 = tr.appendChild(document.createElement('th'));
        var td5 = tr.appendChild(document.createElement('th'));
        var td6 = tr.appendChild(document.createElement('th'));
        var td7 = tr.appendChild(document.createElement('th'));
       td1.innerHTML="ID";
       td2.innerHTML="TipGunoi";
       td3.innerHTML="dataCuratare";
       td4.innerHTML="capacitate";
       td5.innerHTML="cantitate";
       td6.innerHTML="idCartier";
       td7.innerHTML="Delete";
      root.appendChild(tr);
        for (var i = 0; i < data.json_agg.length; i++) {

            var tr = document.createElement('tr');


            var td1 = tr.appendChild(document.createElement('td'));
            var td2 = tr.appendChild(document.createElement('td'));
            var td3 = tr.appendChild(document.createElement('td'));
            var td4 = tr.appendChild(document.createElement('td'));
            var td5 = tr.appendChild(document.createElement('td'));
            var td6 = tr.appendChild(document.createElement('td'));
            var td7 = tr.appendChild(document.createElement('td'));

            td1.innerHTML = data.json_agg[i].ID;
            td2.innerHTML = data.json_agg[i].tipGunoi;
            td3.innerHTML = data.json_agg[i].dataCuratare
            td4.innerHTML = data.json_agg[i].capacitate;
            td5.innerHTML = data.json_agg[i].cantitate;
            td6.innerHTML = data.json_agg[i].idCartier
            td7.innerHTML = '<input type="button" name="del" value="Delete" onclick="delPubela(this);" class="btn btn-danger">'


            document.getElementById("tbl2").appendChild(tr);


        }
    })

}


function delPubela(pb) {
    var id = pb.parentNode.parentNode.children[0].innerText;
 fetch('/api/delPubela',{
    method : 'DELETE',
    body: JSON.stringify({"id":id
     })

 })

    var s = pb.parentNode.parentNode;
    s.parentNode.removeChild(s);
  
}