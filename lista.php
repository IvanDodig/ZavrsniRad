
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

<?php

define('DB_HOST','localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'eduroam');

$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$mysqli){
	die("Connection failed: " . $mysqli->error);
}


$query = "SELECT * FROM auth";

$result = $mysqli->query($query);

$data = array();
foreach ($result as $row) {
	$data[] = $row;
}

$result->close();

$mysqli->close();

?>


<body> 
     
    <nav class="nav-wraper center-align">
        <b>EDUROAM STATISTIKA</b>
    </nav>

    <div class="row container center-align">
        <ul class="pagination">
            <li class="waves-effect"><a href="/eduroam/">1</a></li>
            <li class="waves-effect"><a href="/eduroam/loginok.php">2</a></li>
            <li class="active"><a href="">3</a></li>
        </ul>
    </div>


    <div class="row">
        
        <div class="card container center-align">
            

            <table class="striped centered">
        <thead>
          <tr>
              <th>Datum Prijave</th>
              <th>Uspješnost prijave</th>
              <th>Korisnik</th>
              <th>Ruter</th>
          </tr>
        </thead>

        <tbody>
            <?php
                $lastPage =  sizeof($data)/20;
                $lastIndex = 20*($lastPage - floor($lastPage));
                $iMax = 20;
                if(isset($_GET['page'])){
                    $currentPage = $_GET['page'];
                    if($_GET['page'] == floor($lastPage)){
                        $iMax = $lastIndex;
                    }
                } else {
                    $currentPage = 1;
                }
                for ($i=0; $i < $iMax; $i++) { 
                    
                    if (isset($_GET['page'])) {
                        $pageNumber = $_GET['page'];
                        $index = $i + $pageNumber*20;
                        echo '<tr>
                                <td>'.$data[$index]['vrijeme'].'</td>
                                <td>'.$data[$index]['loginSucces'].'</td>
                                <td>'.$data[$index]['user'].'</td>
                                <td>'.$data[$index]['client'].'</td>
                                <td>'.$data[$index]['failureMsg'].'</td>
                            </tr>';
                    } else {
                        echo '<tr>
                                <td>'.$data[$i]['vrijeme'].'</td>
                                <td>'.$data[$i]['loginSucces'].'</td>
                                <td>'.$data[$i]['user'].'</td>
                                <td>'.$data[$i]['client'].'</td>
                                <td>'.$data[$i]['failureMsg'].'</td>
                            </tr>';
                    }
                    
                   
                }
            ?>
          
        </tbody>
      </table>
            
  <ul class="pagination" style="padding-bottom: 30px;">
  <?php
    $previousPage = $currentPage -1;
    $nextPage = $currentPage + 1;
    if($currentPage == 1) {
        echo '<li class="disabled"><a href=""><i class="material-icons">chevron_left</i></a></li>
                <li class="active"><a href="">'.$currentPage.'</a></li>
                <li class="waves-effect"><a href="/eduroam/lista.php?page='.$nextPage.'"><i class="material-icons">chevron_right</i></a></li>';
    } else if($currentPage < floor($lastPage)){
        echo '<li class="waves-effect"><a href="/eduroam/lista.php?page='.$previousPage.'"><i class="material-icons">chevron_left</i></a></li>
                <li class="active"><a href="">'.$currentPage.'</a></li>
                <li class="waves-effect"><a href="/eduroam/lista.php?page='.$nextPage.'"><i class="material-icons">chevron_right</i></a></li>';
    } else {
        echo '<li class="waves-effect"><a href="/eduroam/lista.php?page='.$previousPage.'"><i class="material-icons">chevron_left</i></a></li>
        <li class="active"><a href="">'.$currentPage.'</a></li>
        <li class="disabled"><a href=""><i class="material-icons">chevron_right</i></a></li>';
    }

  ?>
  </ul>
        </div>
    </div>

    

	<!-- javascript -->
    <script src="js/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="js/Chart.min.js"></script>

    
</body>
</html>