<?php
include_once './conexion.php';

if (isset($_POST['id'])) {
    $id = $_POST['id'];

    $query = "DELETE FROM task WHERE id='$id'";
    $result = mysqli_query($conn, $query);
    if (!$result) {
        die("Query failed");
    } else {
        echo "Tarea " . $id . " elimindada correctamente";
    }
}
