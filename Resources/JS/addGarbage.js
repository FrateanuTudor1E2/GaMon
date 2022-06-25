const handleSubmit=event =>{
    event.preventDefault();
    console.log("form submited");
    creareCerere();
}

function removeFromDiv(what) {
    const el=document.getElementById(what);
    
    if(el !==null){
    el.parentElement.removeChild(el);
}
}
function createGunoi(type,parent,value){
    const optionGunoi=document.createElement('option');
    optionGunoi.setAttribute('value',value);
    optionGunoi.appendChild(document.createTextNode(type));
    parent.appendChild(optionGunoi);
}
async function creareCerere(event){
    event.preventDefault();
    const pubID=document.getElementById('pubele').value;
    const cant=document.getElementById('cantitate-gunoi').value;

    fetch('api/Cerere',{
        method:'POST',
        credentials: "same-origin",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        } ,
        body: JSON.stringify({'idPubela':pubID,'cantitate':cant})
    }).then((response)=>{
        window.alert("Garbage has been added");
    }).catch(function(err){
        console.log(err);
    })

}

async function selectPubele(){
    fetch('api/Pubele', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        const root = document.getElementById("form-garbage-request-div");
        const selectedOpt=document.getElementById("cartiere");
        removeFromDiv('form-pubele');

        const pubeleSelect=document.createElement('select');
        pubeleSelect.setAttribute('id','pubele');
        
        const formPubele=document.createElement('form');
        formPubele.setAttribute('id','form-pubele')
        formPubele.setAttribute('onsubmit', 'creareCerere(event)');
        formPubele.classList.add("form");

        const labelPub = document.createElement('label');
        labelPub.setAttribute('for', 'pubele');
        labelPub.textContent = 'Pubela:';
        formPubele.appendChild(labelPub);

        for (var i = 0; i < data.json_agg.length; i++)
            if (data.json_agg.at(i).idCartier.toString() === selectedOpt.value) {
            const optionPub = document.createElement('option');
            const numePub = document.createTextNode(data.json_agg.at(i).ID.toString()
            .concat(" ",data.json_agg.at(i).tipGunoi, " ", data.json_agg.at(i).cantitate, "/", data.json_agg.at(i).capacitate));
            optionPub.appendChild(numePub);
            optionPub.value = data.json_agg.at(i).ID;
            pubeleSelect.appendChild(optionPub);
            }

        formPubele.appendChild(pubeleSelect);

        const buttonReport=document.createElement('button');
        buttonReport.setAttribute('onclick','GarbageIsFull(event)');
        buttonReport.appendChild(document.createTextNode('Report Bin as full'));
        formPubele.appendChild(buttonReport);
        
        
        const labelCantitate = document.createElement('label');
        labelCantitate.setAttribute('for', 'cantitate-gunoi');
        labelCantitate.textContent = 'Cantitate:';
        formPubele.appendChild(labelCantitate);

        const cantitate=document.createElement('input');
        cantitate.setAttribute('id','cantitate-gunoi');
        cantitate.setAttribute('name','cantitate-gunoi');
        cantitate.setAttribute('min',1);
        cantitate.setAttribute('max',10);
        cantitate.setAttribute('type','number');
        formPubele.appendChild(cantitate);

        const tipGunoi=document.createElement('select');
        tipGunoi.setAttribute('id','tip-gunoi');

        createGunoi("plastic/metal",tipGunoi,0);
        createGunoi("menajer",tipGunoi,1);
        createGunoi("sticla",tipGunoi,2);
        createGunoi("hartie/carton",tipGunoi,3);        
            
        const button=document.createElement('input')
        button.setAttribute('type','submit');
        button.setAttribute('name','Submit');
        button.setAttribute('value','Submit');
        
        formPubele.appendChild(button);
       /* formPubele.submit(function(e){
            e.preventDefault();
            creareCerere();
            console.log("yes");
        })*/
        //formPubele.addEventListener('submit',creareCerere(event));
        root.appendChild(formPubele);
    }).catch(function (err) {
        console.log(err);
    })
}

async function selectZona() {

    fetch('api/Cartiere', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        
       
        const root = document.getElementById("form-garbage-request-div");
        const selectedOpt = document.getElementById("zone");
        
        removeFromDiv('form-cartier');
        removeFromDiv('form-pubele');
        
        const cartiereSelect = document.createElement('select');
        cartiereSelect.setAttribute('id', 'cartiere');
        cartiereSelect.setAttribute('onchange','selectPubele()');

        const defaultOpt=document.createElement('option');
        defaultOpt.appendChild(document.createTextNode("Cartier"));
        defaultOpt.value="Cartier";
        defaultOpt.selected=true;
        cartiereSelect.appendChild(defaultOpt);
        

        const formCartiere = document.createElement('form');
        formCartiere.setAttribute('id','form-cartier')
        formCartiere.setAttribute('method', 'GET');
        formCartiere.classList.add("form");

        const labelCart = document.createElement('label');
        labelCart.setAttribute('for', 'cartiere');
        labelCart.textContent = 'Cartier:';
        formCartiere.appendChild(labelCart);


        for (var i = 0; i < data.json_agg.length; i++)
            if (data.json_agg.at(i).idZona.toString() === selectedOpt.value) {
                const optionCart = document.createElement('option');
                const numeCart = document.createTextNode(data.json_agg.at(i).Nume + " "+data.json_agg.at(i).adresa);
                optionCart.appendChild(numeCart);
                optionCart.value = data.json_agg.at(i).ID;
                cartiereSelect.appendChild(optionCart);
            }
        formCartiere.appendChild(cartiereSelect);
        root.appendChild(formCartiere);
        
    }).catch(function (err) {
        console.log(err);
    })
}