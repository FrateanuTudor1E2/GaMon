function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}

const url="/api/Events";
fetch(url).then((response)=>{
    return response.json();
}).then((data)=>{
    
    const root= document.createElement('div');
    root.classList.add('container-text-area');
    
                
    for(var i=0; i<data.json_agg.length;i++){		
                        
        const eventItem= document.createElement('div');
        eventItem.classList.add('text-area');
        
        const eventTitle= document.createElement('h1');
        eventTitle.textContent= data.json_agg.at(i).nume;

        const eventDesc= document.createElement('p');
        eventDesc.textContent=data.json_agg.at(i).descriere;
        /*
        if(data.json_agg.at(i).image !== null){
            const img= document.createElement('img');
            img.src= 'data:image/jpeg;base64,'  + hexToBase64(data.json_agg.at(i).image);
            eventItem.append(img);
        }*/

        eventItem.append(eventTitle,eventDesc);
        root.append(eventItem);
    }
    document.body.append(root);
}).catch(function(err){
    console.log(err.message);
})