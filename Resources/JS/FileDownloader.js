
async function requestHtml(event){
event.preventDefault();
const time=document.getElementById("selected-interval").value;
console.log(time);
fetch('api/generateHtml',{
    method:"POST",
    headers: {
        'Accept': 'text/html',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({'time':time})  

}).then((response)=>{return response.blob();})
.then((data)=>{
    var a= document.createElement("a");
    a.href= window.URL.createObjectURL(data);
    a.download="generatedHTML.hmtl";
    document.body.appendChild(a);
    a.click();
    a.remove();
})

}
async function requestCSV(event){
    event.preventDefault();
const time=document.getElementById("selected-interval").value;
console.log(time);
fetch('api/generateCSV',{
    method:"POST",
    headers: {
        'Accept': 'text/csv',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({'time':time})  

}).then((response)=>{return response.blob();})
.then((data)=>{
    var a= document.createElement("a");
    a.href= window.URL.createObjectURL(data);
    a.download="generatedCSV.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
})
}

async function requestPDF(event){
    event.preventDefault();
const time=document.getElementById("selected-interval").value;
console.log(time);
fetch('api/generatePDF',{
    method:"POST",
    headers: {
        'Accept': 'application/pdf',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({'time':time})  

}).then((response)=>{return response.blob();})
.then((data)=>{
    var a= document.createElement("a");
    a.href= window.URL.createObjectURL(data);
    a.download="generatedPDF.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
})
}
async function requestSVG(event){
    event.preventDefault();
const time=document.getElementById("selected-interval").value;
const type=document.getElementById("selected-type").value;
console.log(time);
fetch('api/generateSVG',{
    method:"POST",
    headers: {
        'Accept': 'text/html',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({'time':time,'type':type})  

}).then((response)=>{return response.blob();})
.then((data)=>{
    var a= document.createElement("a");
    a.href= window.URL.createObjectURL(data);
    a.download="generatedSVG.html";
    document.body.appendChild(a);
    a.click();
    a.remove();
})
}