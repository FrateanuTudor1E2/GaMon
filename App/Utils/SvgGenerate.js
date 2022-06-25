const svgCrt= require('svg-chartist');
const { createHtmlSVG } = require('./htmlGenerate');

async function prepareData(data,type){
    if(type==0){
        result=data.reduce(function(r,a){
            r[a.tipGunoi]= r[a.tipGunoi] || [];
            r[a.tipGunoi].push(a);
            return r;
        }, Object.create(null));
        return result;
    }
    else if( type==1){
        result=data.reduce(function(r,a){
            r[a.numeCartier]= r[a.numeCartier] || [];
            r[a.numeCartier].push(a);
            return r;
        }, Object.create(null));
        return result;
    }else if(type == 2){
        result=data.reduce(function(r,a){
            r[a.numeZona]= r[a.numeZona] || [];
            r[a.numeZona].push(a);
            return r;
        }, Object.create(null));
        return result;
    }

    return null;
}

async function makeSvg(data,type,res){

    const newData= await prepareData(data,type);
    
    var dataLabels=Object.keys(newData);
    
    var values=[];
    for(var i=0; i<dataLabels.length;i++){
        var arr=newData[dataLabels[i]];
        var sum= arr.reduce(function(_this,val){
            return _this+ val.sum;
        },0);
        values.push(sum);
    }
    
    const svgData= {
        title: 'SVG BAR CHART',
        labels: dataLabels,
        series:[values]
    };
    
    const options = {
        width: 700, 
      height: 350,
      stackBars: true,
      axisX: {
        showLabel: true,
        showGrid: false,
      }
    }
    
    const opts = {
        options: options,
        title: {
            height: 50,
            fill: "#4A5572"
        },
      css: `.ct-series-a .ct-bar, .ct-series-a .ct-line, .ct-series-a .ct-point, .ct-series-a .ct-slice-donut{
        stroke: #4A5572
      }`,
      onDraw: function (data) {
        if(data.type === 'bar') {
          data.element.attr({
            style: 'stroke-width: 30px'
          });
        }
      }
    }
    return svgCrt('bar',svgData,opts).then((svg)=>{
         const html =createHtmlSVG(svg);
         return html;
    })

    

}

module.exports={makeSvg};