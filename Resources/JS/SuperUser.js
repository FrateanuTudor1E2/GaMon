function addSuperUser() {
    var username = document.SUser.username.value;
    var email = document.SUser.email.value;
    var password = document.SUser.password.value;

    fetch('api/SuperUserRegister', {
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "email": email,
            "password": password
        })

    }).then((response)=>{window.alert('SuperUser has been registred')
}).then(function(err){console.log(err)}).then(()=>{
    document.getElementById("tbl1").textContent='';
    fetch('/api/SelectSuperUser', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
    }).then(response => response.json()).then(data => {
        const root = document.getElementById("tbl1");
        var tr = document.createElement('tr');
        var td1 = tr.appendChild(document.createElement('th'));
        var td2 = tr.appendChild(document.createElement('th'));
        var td3 = tr.appendChild(document.createElement('th'));
        var td4 = tr.appendChild(document.createElement('th'));
        var td5 = tr.appendChild(document.createElement('th'));
       td1.innerHTML="ID";
       td2.innerHTML="Username";
       td3.innerHTML="Email";
       td4.innerHTML="Password";
       td5.innerHTML="Delete";
      root.appendChild(tr);
        for (var i = 0; i < data.json_agg.length; i++) {
            
    var tr = document.createElement('tr');

    var td1 = tr.appendChild(document.createElement('td'));
    var td2 = tr.appendChild(document.createElement('td'));
    var td3 = tr.appendChild(document.createElement('td'));
    var td4 = tr.appendChild(document.createElement('td'));
    var td5 = tr.appendChild(document.createElement('td'));
    

    td1.innerHTML = data.json_agg[i].ID;
    td2.innerHTML = data.json_agg[i].username;
    td3.innerHTML = data.json_agg[i].email;
    td4.innerHTML = data.json_agg[i].passwordHash;
    td5.innerHTML = '<input type="button" name="del" value="Delete" onclick="delUser(this);" class="btn btn-danger">'
    

    document.getElementById("tbl1").appendChild(tr);


        }
    })

})
}
function getSuperUser() {
    document.getElementById("tbl1").textContent='';
    fetch('/api/SelectSuperUser', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
    }).then(response => response.json()).then(data => {
        
        const root = document.getElementById("tbl1");
        var tr = document.createElement('tr');
        var td1 = tr.appendChild(document.createElement('th'));
        var td2 = tr.appendChild(document.createElement('th'));
        var td3 = tr.appendChild(document.createElement('th'));
        var td4 = tr.appendChild(document.createElement('th'));
        var td5 = tr.appendChild(document.createElement('th'));
       td1.innerHTML="ID";
       td2.innerHTML="Username";
       td3.innerHTML="Email";
       td4.innerHTML="Password";
       td5.innerHTML="Delete";
      root.appendChild(tr);
        for (var i = 0; i < data.json_agg.length; i++) {
            
    var tr = document.createElement('tr');

    var td1 = tr.appendChild(document.createElement('td'));
    var td2 = tr.appendChild(document.createElement('td'));
    var td3 = tr.appendChild(document.createElement('td'));
    var td4 = tr.appendChild(document.createElement('td'));
    var td5 = tr.appendChild(document.createElement('td'));
  
    td1.innerHTML = data.json_agg[i].ID;
    td2.innerHTML = data.json_agg[i].username;
    td3.innerHTML = data.json_agg[i].email;
    td4.innerHTML = data.json_agg[i].passwordHash;
    td5.innerHTML = '<input type="button" name="del" value="Delete" onclick="delUser(this);" class="btn btn-danger">'
   

    document.getElementById("tbl1").appendChild(tr);


        }
    })

}

function delUser(usr) {
    var id = usr.parentNode.parentNode.children[0].innerText;
 fetch('/api/delSuperUser',{
    method : 'DELETE',
    body: JSON.stringify({"id":id,
     }),

 })

    var s = usr.parentNode.parentNode;
    s.parentNode.removeChild(s);

}




