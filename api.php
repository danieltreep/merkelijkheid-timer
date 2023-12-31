

<?php
// api.php
// Allow requests from any origin
header('Access-Control-Allow-Origin: *');

// Allow additional headers if needed
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

// Set the allowed methods (GET, POST, etc.)
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');

header('Content-Type: application/json');

// Establish a database connection (use your actual database credentials)
$conn = new mysqli('localhost', 'root', 'mysql', 'timer');

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $postData = json_decode(file_get_contents("php://input"), true);

    $table = $conn->real_escape_string($postData['table']);

    $columns = '';
    $values = '';

    // Retrieve columns and their values from the data
    foreach ($postData['data'] as $column => $value) {
        $columns .= $conn->real_escape_string($column) . ', ';
        $values .= "'" . $conn->real_escape_string($value) . "', ";
    }

    // Remove the trailing commas
    $columns = rtrim($columns, ', ');
    $values = rtrim($values, ', ');

    $sql = "INSERT INTO $table ($columns) VALUES ($values)";

    if ($conn->query($sql) === TRUE) {
        $response = array('status' => 'success', 'message' => 'Data added successfully');
    } else {
        $response = array('status' => 'error', 'message' => 'Error adding data: ' . $conn->error);
    }

    // Send the JSON response
    echo json_encode($response);

} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $table = $_GET['table'];

    // Perform a SELECT query
    $result = $conn->query('SELECT * FROM ' . $table);

    // Fetch the data and encode it as JSON
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Close the database connection
    $conn->close();

    // Send the JSON response
    echo json_encode($data);

} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    $requestData = json_decode(file_get_contents("php://input"), true);

    // Extract parameters from the request data
    $id = $requestData['id']; 
    $table = $requestData['table']; 

    $sql = "DELETE FROM " . $conn->real_escape_string($table) . " WHERE id = " . $conn->real_escape_string($id);

    if ($conn->query($sql) === TRUE) {
        $response = array('status' => 'success', 'message' => 'Record deleted successfully');
    } else {
        $response = array('status' => 'error', 'message' => 'Error deleting record: ' . $conn->error);
    }

    // Send the JSON response
    echo json_encode($response);

} elseif ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    // Parse incoming data
    $requestData = json_decode(file_get_contents("php://input"), true);

    // Extract parameters from the request data
    $id = $requestData['id']; 
    $table = $requestData['table']; 
    $data = $requestData['data']; // Replace with the actual data

    // Initialize the SET part of the SQL query
    $setClause = '';

    // Construct the SET part of the SQL query
    foreach ($data as $column => $value) {
        $setClause .= $conn->real_escape_string($column) . " = '" . $conn->real_escape_string($value) . "', ";
    }

    // Remove the trailing comma
    $setClause = rtrim($setClause, ', ');

    // Construct the SQL query for the update operation
    $sql = "UPDATE " . $conn->real_escape_string($table) . 
           " SET " . $setClause .
           " WHERE id = " . $conn->real_escape_string($id);

    // Execute the update query
    if ($conn->query($sql) === TRUE) {
        $response = array('status' => 'success', 'message' => 'Record updated successfully');
    } else {
        $response = array('status' => 'error', 'message' => 'Error updating record: ' . $conn->error);
    }

    // Send the JSON response
    echo json_encode($response);
}
?>


