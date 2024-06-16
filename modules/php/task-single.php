<?php
include_once './conexion.php';

$id = $_POST['id'];

$query = "SELECT * FROM task WHERE id='$id'";
$result = mysqli_query($conn, $query);
if (!$result) {
    die("Query failed");
} else {

    $json = array();
    while ($row = mysqli_fetch_array($result)) {
        $json[] = array(
            'name' => $row['name'],
            'description' => $row['description'],
            'id' => $row['id'],
        );
    }

    echo $json = json_encode($json[0]);
}
