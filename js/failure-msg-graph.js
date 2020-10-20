var ctxFailureMsg = $("#failureMsg");
var configFailureMsg = {
    type: 'bar',
    data : {
        labels : [] ,
        
        datasets : [
            {
                label : "",
                data : [],
                backgroundColor : "rgb(2,105,143,0.4)",
            },

        ]
    },
    options : {
        title: {
            display: true,
            text: 'RAZLOG NEUSPJEŠNE PRIJAVE'
        },
        legend : {
            display : false,
            position : "top"
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        maintainAspectRatio : false,
    }
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ', 0.5)';
}

function getFailureMsgData(dateFrom, dateTo, podaci){
    var duljina = podaci.length;
    dateFrom = new Date(dateFrom);
    dateTo = new Date(dateTo).setHours(23,59,59);
    dateTo = new Date(dateTo);
    var names = [];
    var labels = [];
    var data = [];
    var colors = [];
    for(var i=0; i < duljina; i++){
        var failureMsg = podaci[i].failureMsg;
        var date =  new Date(podaci[i].vrijeme);

        if( date >= dateFrom && date <= dateTo){
            if(failureMsg){
                if( !names.includes(failureMsg) ){
                    names.push(failureMsg);
                    data.push(1);
                } else {
                    const indexOF = (element) => element == failureMsg;
                    var index = names.findIndex(indexOF);
                    data[index]++;
                }
            }
        }
    }
    for(var j = 0; j < names.length; j++){
        labels.push(j+1);
        colors.push(random_rgba());
    }
    return {
        data,
        labels,
        names,
        colors
    }
}

export { getFailureMsgData, ctxFailureMsg, configFailureMsg };