<?php
include_once './conexion.php';

if (isset($_POST['name'])) {
    $name = $_POST['name'];
    $description = $_POST['description'];
    if (!empty($name) || !empty($description)) {
        $query = "INSERT INTO task(name, description) VALUES ('$name','$description')";
        $result = mysqli_query($conn, $query);
        if (!$result) {
            die('Query Failed.');
        }
    } else {
        echo "debe llenar el formulario";
    }
}
