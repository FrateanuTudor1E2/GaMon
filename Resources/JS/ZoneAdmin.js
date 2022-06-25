function addZona() {
    var name = document.Zone.nume.value;


    fetch('/api/addZona', {
        method: 'POST',
        body: JSON.stringify({
            "nume": name

        })

    }).then((response) => {
        window.alert('Zona has been registred')
    }).then(function (err) { console.log(err) }).then(() => {
        getZona();
       
})
}
function getZona() {
    document.getElementById("tb3").textContent = '';
    fetch('/api/getZone', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
    }).then(response => response.json()).then(data => {
        const root = document.getElementById("tb3");
        var tr = document.createElement('tr');
        var td1 = tr.appendChild(document.createElement('th'));
        var td2 = tr.appendChild(document.createElement('th'));
        var td3 = tr.appendChild(document.createElement('th'));
       td1.innerHTML="ID";
       td2.innerHTML="Nume";
       td3.innerHTML="Delete"
      root.appendChild(tr);
        for (var i = 0; i < data.json_agg.length; i++) {

            var tr = document.createElement('tr');

            var td1 = tr.appendChild(document.createElement('td'));
            var td2 = tr.appendChild(document.createElement('td'));
            var td3 = tr.appendChild(document.createElement('td'));


            td1.innerHTML = data.json_agg[i].ID;
            td2.innerHTML = data.json_agg[i].Nume;
            td3.innerHTML = '<input type="button" name="del" value="Delete" onclick="delZona(this);" class="btn btn-danger">'


            root.appendChild(tr);


        }

    })

}


function delZona(zn) {
    var id = zn.parentNode.parentNode.children[0].innerText;
 fetch('/api/delZona',{
    method : 'DELETE',
    body: JSON.stringify({"id":id,
     }),

 })

    var s = zn.parentNode.parentNode;
   
    
    s.parentNode.removeChild(s);
 
  


}