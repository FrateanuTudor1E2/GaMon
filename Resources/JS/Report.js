
async function GarbageIsFull(event){
    event.preventDefault();
    const pubID=document.getElementById('pubele').value;
    fetch('api/PubStatus',{
        method:'PUT',
        body:JSON.stringify({'id': pubID,'status':'true'})
    }).then((response)=>{
        window.alert('Bin has been reported as full');
    }).catch(function(err){
        console.log(err);
    })
}


async function GarbageIsEmpty(event){
    event.preventDefault();
    const pubID=document.getElementById('id-pub').value;
    fetch('api/PubStatus',{
        method:'PUT',
        body:JSON.stringify({'id': pubID,'status':'false'})
    }).then((response)=>{
        window.alert('Bin has been emptied');
    }).catch(function(err){
        console.log(err);
    })
}