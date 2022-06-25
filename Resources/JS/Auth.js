async function submitForm(event){
    event.preventDefault();
    var username= document.getElementById("Username").value;
    var password= document.getElementById("Password").value;
    const urlToken="/api/token";
    const urlAuth="/api/auth";
    fetch(urlToken,{
        method:'POST',
        credentials: "include",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({'username':username,'password':password})
    }).then(response=> response.json()).then(data=>{
        console.log(data);
    }).catch(function(err){
        console.log(err);
    }).then(()=>{
        fetch(urlAuth,{
        method:'POST',
        redirect: 'follow',
        credentials: "same-origin",
        headers:{
            'Accept':'text/html',
            'Content-Type':'text/html'
        }
    }).then(response=>{
        if(response.redirected)
            window.location.href=response.url;
            else
            window.alert("Wrong credentials");
    }).catch(function(err){
        console.log(err);
    })
    })
    
    
    

}
