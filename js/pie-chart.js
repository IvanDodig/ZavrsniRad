var ctxPie = $("#failed");

var configPie = {
	type: 'pie',
	data : {
		labels : [],
		datasets : [
			{
				data: [100,111,111],
                backgroundColor: ["rgb(166,3,108,0.5)","rgb(3,122,166,0.5)","pink"]
			},
		]
	},
	options : {
		title: {
			display: true,
            text: 'UKUPAN BROJ',
            fontSize: 14,
            lineHeight: 5
		},
		legend : {
			display : true,
			position : "top"
		},
		maintainAspectRatio : false,
		
	}
}


function getPieData(dateFrom,dateTo,data){

    var duljina = data.length;
    var niz = [];
    var nizBrojac = [];

    var userNames = [];
    var userSucces = [];
    var userBrojac = [];

    dateFrom = new Date(dateFrom);

    dateTo = new Date(dateTo).setHours(23,59,59);
    dateTo = new Date(dateTo);

    for(var i=0; i < duljina; i++){

        var uspjeh = data[i].loginSucces.trim();
        var date =  new Date(data[i].vrijeme);
        var user = data[i].user;

       

        if( date >= dateFrom && date <= dateTo){
            if(!userNames.includes(user)){
                userNames.push(user);
                const indexOF = (element) => element == user;
                var index = userNames.findIndex(indexOF);
                userSucces[index] = uspjeh;
                userBrojac[index] = 1;
            } else {
                const indexOF = (element) => element == user;
                var index = userNames.findIndex(indexOF);
                userBrojac[index] ++;
            }
        
            if( !niz.includes(uspjeh) ){

                niz.push(uspjeh);
                const indexOF = (element) => element == uspjeh;
                var index = niz.findIndex(indexOF);
                nizBrojac[index] = 1;

            } else if( niz.includes(uspjeh)) {

                const indexOF = (element) => element == uspjeh;
                var index = niz.findIndex(indexOF);
                nizBrojac[index]++;

            }    
        }        
    }

    var brojacMax = []
    var userMax = []

    for(var j = 0; j < userNames.length; j++){
        for(var i = 0; i < niz.length; i++){
            if(!brojacMax[i]){
                brojacMax[i] = 0;
            }
            if(userSucces[j] == niz[i]){
                if (brojacMax[i] < userBrojac[j]) {
                    brojacMax[i] = userBrojac[j];
                    userMax[i] = userNames[j];
                }
            }    
        }
    }
    console.log(niz);
    console.log(brojacMax);
    console.log(userMax);



    return {
        data: nizBrojac,
        labels: niz,
        brojPrijava: brojacMax,
        korisnik: userMax
    }

}

export {getPieData, ctxPie, configPie}