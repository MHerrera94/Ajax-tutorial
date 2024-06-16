<?php
include_once './conexion.php';

$query = "SELECT * FROM task";
$result = mysqli_query($conn, $query);

$json = array();
while ($row = mysqli_fetch_array($result)) {
    $json[] = array(
        'name' => $row['name'],
        'description' => $row['description'],
        'id' => $row['id']
    );
}
$jason = json_encode($json);
echo $jason;
