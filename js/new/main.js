$(document).ready(function() {

	var podaci;
   
	$.ajax({
		async : false,	
		url : "http://localhost/eduroam/api/oneDay.php",
		type : "GET",
		success : function(data){
            podaci = data;
		},
		error : function(data) {
			console.log(data);
		}
    }); 

    var ruteri = ["sum-ba-router-1",
    "sum-ba-router-2","sum-ba-router-3",
    "sum-ba-router-4","sum-ba-router-5","sum-ba-router-6",
    "sum-ba-router-7","sum-ba-router-fzs","sum-ba-router-alu",
    "sum-ba-router-mef","sum-ba-router-gf","sum-ba-router-econ","sum-ba-router-rod"];

    var fakulteti = ["FPMOZ","Rektorat 1","PF","SUM 1","Rektorat 2","FSRE","SUM 2","FZS","ALU","MEF","GF","EF","FPMOZ Rodoč"];
    var client = [];
    var broj = [];
    var colors = [];
    var datum = document.getElementById("datum").value;

    datum = new Date(datum).setHours(0,0,0,0);

    podaci.forEach(podatak => {
  
        if(new Date(podatak.date).setHours(0,0,0,0) == datum) {
            client.push(podatak.client);
            colors.push(random_rgba());
            broj.push(podatak.broj);
            for(var i = 0; i < ruteri.length; i++){
                if(podatak.client == ruteri[i]){
                    client[client.length -1] = fakulteti[i];
                }
            }
        }
    });

    var ctx = $("#brojPrijavaPoDanu");
    
    var config = {
        type: 'bar',
        data : {
            labels : client,
            datasets : [
                {
                    label : "",
                    data : broj,
                    backgroundColor : colors,
                },
            ]
        },
        options : {
            title: {
                display: true,
                text: 'BROJ USPJEŠNIH PRIJAVA ZA IZABRANI DATUM',
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


    var chart = new Chart(ctx, config);

    $('#buton').click(function() {
        chart.destroy();
        broj = [];
        client = [];
        colors = []
        datum = document.getElementById("datum").value;
        datum = new Date(datum).setHours(0,0,0,0);

        podaci.forEach(podatak => {
            if(new Date(podatak.date).setHours(0,0,0,0) == datum) {
                client.push(podatak.client);
                broj.push(podatak.broj);
                colors.push(random_rgba());
                for(var i = 0; i < ruteri.length; i++){
                    if(podatak.client == ruteri[i]){
                        client[client.length -1] = fakulteti[i];
                    }
                }
            }
        });
        config.data.datasets[0].data = broj;
        config.data.datasets[0].backgroundColor = colors;
        config.data.labels = client;

        chart = new Chart(ctx, config);
            
    });

});


function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ', 0.5)';
}
