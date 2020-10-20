var ctx = $("#autentikacija");
    
var config = {
	type: 'line',
	data : {
		labels : [],
		datasets : [
			{
				label : "Uspješna",
				data : [],
				backgroundColor : "rgb(3,122,166,0.25)",
				borderColor : "rgb(3,122,166)",
				fill : true,
				pointRadius : 2,
			},
			{
				label : "Neuspješna",
				data :[],
				backgroundColor : "rgb(166,3,108,0.25)",
				borderColor : "rgb(166,3,108)",
				fill : true,
				pointRadius : 2
			},
		]
	},
	options : {
		title: {
			display: true,
			text: 'AUTENTIKACIJA',
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


function getData(datumOd,datumDo,data){
	var score = {
		LoginOK : [],
		LoginIncorrect : [],
		labels : []
	};
	var len = data.length;
	for(var d = new Date(datumOd); d <= new Date(datumDo); d.setDate(d.getDate() + 0.5)){
		for(var i = 0; i < 24; i += 3){
			var datum = new Date(d.setHours(i,0,0)); 
			var datumVrh =  new Date(d.setHours(i + 3,0,0)); 
			var loginOKBrojac = 0;
			var loginIncorrectBrojac = 0;
			for(var j = 0; j < len; j++){
				var vrijeme = new Date(data[j].vrijeme);
				if(vrijeme > datum && vrijeme < datumVrh){
					if(data[j].loginSucces.trim() == "Login OK"){
						loginOKBrojac ++;                      
					} else {
						loginIncorrectBrojac++;  
					}
				}
			}
			score.LoginOK.push(loginOKBrojac);
			score.LoginIncorrect.push(loginIncorrectBrojac);
			datum = datum.toString();
			datum = datum.split(' ');
			if(i == 0){
				datum = datum[0] + ' ' + datum[1] + ' ' + datum[2] + ' ' + datum[3];
			} else {
				datum = datum[4];
			}
			score.labels.push(datum);
		}
	}
    return score;
}

export {getData, ctx, config}