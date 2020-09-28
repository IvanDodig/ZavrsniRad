import {getData ,ctx, config} from './line-db-php.js'
import {getPieData, ctxPie, configPie} from './pie-chart.js'
import {getFailureMsgData, ctxFailureMsg, configFailureMsg} from './failure-msg-graph.js'

$(document).ready(function() {

	var podaci;
   
	$.ajax({
		async : false,	
		url : "http://localhost/eduroam/api/data.php",
		type : "GET",
		success : function(data){
            podaci = data;
		},
		error : function(data) {
			console.log(data);
		}
    });

    // dohvat datuma
    var datumOd = document.getElementById("datumOd").value;
    var datumDo = document.getElementById("datumDo").value;

    //prvi graf konfiguracija
    var data = getData(datumOd, datumDo, podaci);
    config.data.labels = data.labels;
    config.data.datasets[0].data = data.LoginOK;
    config.data.datasets[1].data = data.LoginIncorrect;

    //kreiranje prvog grafa
    var chart = new Chart(ctx, config);
    
    // pie graf konfiguracija
    var pieData = getPieData(datumOd, datumDo, podaci)
    configPie.data.labels = pieData.labels;
    configPie.data.datasets[0].data = pieData.data;

    let korisnik = pieData.korisnik;
    let brojPrijava = pieData.brojPrijava;
    let uspjehPrijave = pieData.labels;

    setMaxTable(korisnik,brojPrijava,uspjehPrijave);


    //kreiranje pie grafa
    var myPieChart = new Chart(ctxPie, configPie);

    // neuspješna prijava graf konfiguracija
    var failureMsgData =  getFailureMsgData(datumOd, datumDo, podaci);

    configFailureMsg.data.labels = failureMsgData.labels;
    configFailureMsg.data.datasets[0].data = failureMsgData.data;
    var colors = failureMsgData.colors;
    configFailureMsg.data.datasets[0].backgroundColor = colors;


    let items = failureMsgData.names;

    failureLabels(items,colors); 

    var failureMsgChart = new Chart(ctxFailureMsg, configFailureMsg);
	
	$('#buton').click(function() {
        chart.destroy();
        myPieChart.destroy();
        failureMsgChart.destroy();
		
		datumOd = document.getElementById("datumOd").value;
        datumDo = document.getElementById("datumDo").value;
        
        var data = getData(datumOd, datumDo, podaci);

        config.data.labels = data.labels;
        
		config.data.datasets[0].data = data.LoginOK;
        config.data.datasets[1].data = data.LoginIncorrect;

        // pie graf konfiguracija
        var pieData = getPieData(datumOd, datumDo, podaci)
        configPie.data.datasets[0].data = pieData.data;

        let korisnik = pieData.korisnik;
        let brojPrijava = pieData.brojPrijava;
        let uspjehPrijave = pieData.labels;
    
        setMaxTable(korisnik,brojPrijava,uspjehPrijave);


        var failureMsgData =  getFailureMsgData(datumOd, datumDo, podaci);

        configFailureMsg.data.labels = failureMsgData.labels;
        configFailureMsg.data.datasets[0].data = failureMsgData.data;
        var colors = failureMsgData.colors;
        configFailureMsg.data.datasets[0].backgroundColor = colors;


        let items = failureMsgData.names;

        failureLabels(items,colors); 

        failureMsgChart = new Chart(ctxFailureMsg, configFailureMsg);
    

        //kreiranje pie grafa
        myPieChart = new Chart(ctxPie, configPie);
        chart = new Chart(ctx,config);
        

	});

	$('#promjenaCharta').click(function() {
		if(config.type == "bar"){
			config.type = "line";
		} else {
			config.type = "bar";
		}
		
		chart.destroy();
		chart = new Chart(ctx, config);
    });
    
   
}); 


function setMaxTable(korisnik,brojPrijava,uspjehPrijave){
    let insertInto = document.getElementById('max');
    insertInto.innerHTML = '';
    for(var i = 0; i < korisnik.length; i++) {

        let tr = document.createElement('tr');
        insertInto.appendChild(tr);
        
        let ti = document.createElement('td');
        let ikona = document.createElement('i');
        ikona.className = "small material-icons prefix";
        ikona.innerHTML = "house";

        ti.appendChild(ikona);
        let tk = document.createElement('td');
        let tb = document.createElement('td');
        let tu = document.createElement('td');

        tr.appendChild(ti);
        tr.appendChild(tk);
        tr.appendChild(tb);
        tr.appendChild(tu);
 
        tk.innerHTML = korisnik[i];
        tb.innerHTML = brojPrijava[i];
        tu.innerHTML = uspjehPrijave[i]
    } 

}

function failureLabels(items,colors){
    let insert =  document.getElementById('lista');
    insert.innerHTML = '';

    let ul = document.createElement('ul');
    insert.appendChild(ul);

    let brojac = 1
    items.forEach(function (item) {
        let li = document.createElement('li');
        let i = document.createElement('i');
        ul.appendChild(li);
        li.appendChild(i);
        li.style.color = colors[brojac -1];

        ul.className = "collection"
        li.className = "collection-item";
        li.innerHTML += brojac + " - " +  item;
        brojac ++ ;
    });
	
}