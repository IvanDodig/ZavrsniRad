<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="with=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <!-- Compiled and minified JavaScript -->
    

    <title>Eduroam Statistika</title>
    <link href="css/default.css" rel="stylesheet">
    
</head>

<body> 
     
    <nav class="nav-wraper center-align">
        <b>EDUROAM STATISTIKA</b>
    </nav>
    <div class="row container center-align">
        <ul class="pagination">
            <li class="waves-effect"><a href="/eduroam/">1</a></li>
            <li class="active"><a href="">2</a></li>
            <li class="waves-effect"><a href="/eduroam/lista.php">3</a></li>
        </ul>
    </div>
   

    <div class="card container center-align datum">
                
                <div class="row container ">

                    <div class="col s12 m10 input-field ">
                        <i class="material-icons prefix">event</i>
                        <label for="datum">Unesite Datum: </label>
                        <input id="datum" value = "Jul 02, 2020" type="text" class="datepicker center-align">
                    </div>
    
                    <div class="col s12 m2 valign-wrapper buton center">
                        <a  id="buton" class="btn-small">Pretraži</a>
                    </div>
    
                </div>
            </div>
    </div>



    <div class="row container">
        
        <div class="card container center-align col s12">
            <div class="card-content">
            <div class="chart-container">
            <canvas id="brojPrijavaPoDanu"></canvas>
        </div>
            </div>
        </div>
    </div>

  





	<!-- javascript -->
    <script src="js/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="js/Chart.min.js"></script>

    <script type="module" src="js/new/main.js"></script>
    <!-- <script src="js/failed-auth-graph.js"></script> -->
    <script>
        $(document).ready(function(){
            $('.datepicker').datepicker();
        });
        
    </script>
    
    
</body>
</html>