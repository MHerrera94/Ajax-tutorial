<?php
include_once './conexion.php';

$search = $_POST['search'];

if (!empty($search)) {
    $query = "SELECT * FROM task WHERE name LIKE '$search%'";
    $result = mysqli_query($conn, $query);
    if (!$result) {
        die('Query Error' . mysqli_error($conn));
    } else {
        $json = array();

        while ($row = mysqli_fetch_array($result)) {
            $json[] = array(
                'id' => $row['id'],
                'name' => $row['name'],
                'description' => $row['description']
            );
        }
        $string_json = json_encode($json);
        echo $string_json;
    }
}
