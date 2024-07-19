

<?php
// api.php
// Allow requests from any origin
header('Access-Control-Allow-Origin: *');

// Allow additional headers if needed
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

// Set the allowed methods (GET, POST, etc.)
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');

header('Content-Type: application/json');

$host = $_SERVER['HTTP_HOST'];

// Check if the host contains 'localhost'
if (strpos($host, 'localhost') !== false) {
    // Database connection for local environment
    $conn = new mysqli('localhost', 'root', 'mysql', 'timer');
} else {
    // Database connection for server environment
    $conn = new mysqli('localhost', 'merktoday_timer', 'F9gtrL3xDU2nfMgwMrJF', 'merktoday_timer');
}

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON data from request body
    $postData = json_decode(file_get_contents("php://input"), true);

    // Sanitize table name
    $table = $conn->real_escape_string($postData['table']);

    $columns = '';
    $values = '';

    // Retrieve columns and their values from the data
    foreach ($postData['data'] as $column => $value) {
        $escapedColumn = $conn->real_escape_string($column);

        // Check if the value is null
        if ($value === null) {
            $escapedValue = "NULL";
        } else {
            // Escape and quote the value if it's not null
            $escapedValue = "'" . $conn->real_escape_string($value) . "'";
        }

        $columns .= $escapedColumn . ', ';
        $values .= $escapedValue . ', ';
    }

    // Remove the trailing commas
    $columns = rtrim($columns, ', ');
    $values = rtrim($values, ', ');

    // Construct the SQL INSERT statement
    $sql = "INSERT INTO $table ($columns) VALUES ($values)";

    if ($conn->query($sql) === TRUE) {
        // Get the ID of the newly added row
        $newId = $conn->insert_id;
        $response = array('status' => 'success', 'message' => 'Data added successfully', 'id' => $newId);
    } else {
        $response = array('status' => 'error', 'message' => 'Error adding data: ' . $conn->error);
    }

    // Send the JSON response
    echo json_encode($response);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $table = $_GET['table'];

    // Check if a user already exists
    if ($table === 'users' && isset($_GET['email'])) {

        $email = $_GET['email'];
        
        // Prepare a SELECT query to check if the email exists and fetch the user ID
        $stmt = $conn->prepare('SELECT user_id FROM users WHERE email = ?');
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();

        // Fetch the user ID if any row is returned
        $userId = null;
        if ($row = $result->fetch_assoc()) {
            $userId = $row['user_id'];
        }

        // Close the statement
        $stmt->close();
        
        // Close the database connection
        $conn->close();

        // Send the JSON response. Send user ID if exists, otherwise false
        echo json_encode($userId !== null ? $userId : false);

    } elseif ($table === 'sessions' && isset($_GET['userid'])) {

        $userid = $_GET['userid'];
        $days = $_GET['days'];
        
        // Query that merges the tables: sessions, projects and clients
        $result = $conn->query("SELECT * FROM $table LEFT JOIN projects ON sessions.project_id = projects.project_id LEFT JOIN clients ON projects.client_id = clients.client_id LEFT JOIN tasks ON tasks.task_id = sessions.task_id WHERE (user_id = $userid OR JSON_CONTAINS(shared_with, '\"$userid\"', '$')) ORDER BY sessions.created_at DESC");
    
        // Fetch the data and encode it as JSON
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        
        // Close the database connection
        $conn->close();
    
        // Send the JSON response
        echo json_encode($data);

    } elseif ($table === 'sessions' && isset($_GET['isrunning'])) {

        $days = $_GET['days'];
        
        // Query that merges the tables: sessions, projects and clients
        $result = $conn->query("SELECT * FROM $table LEFT JOIN projects ON sessions.project_id = projects.project_id LEFT JOIN clients ON projects.client_id = clients.client_id  LEFT JOIN users ON users.user_id = sessions.user_id LEFT JOIN tasks ON tasks.task_id = sessions.task_id WHERE sessions.created_at >= DATE_SUB(NOW(), INTERVAL $days DAY) AND sessions.is_running = true");
    
        // Fetch the data and encode it as JSON
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        
        // Close the database connection
        $conn->close();
    
        // Send the JSON response
        echo json_encode($data);

    } elseif ($table === 'sessions') {

        $days = $_GET['days'];
        
        // Query that merges the tables: sessions, projects and clients
        $result = $conn->query("SELECT * FROM $table LEFT JOIN projects ON sessions.project_id = projects.project_id LEFT JOIN clients ON projects.client_id = clients.client_id LEFT JOIN tasks ON tasks.task_id = sessions.task_id WHERE sessions.created_at >= DATE_SUB(NOW(), INTERVAL $days DAY) ORDER BY sessions.created_at DESC");
    
        // Fetch the data and encode it as JSON
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        
        // Close the database connection
        $conn->close();
    
        // Send the JSON response
        echo json_encode($data);

    } elseif ($table === 'projects') {
        
        // Query that merges the tables: sessions, projects and clients
        $result = $conn->query("SELECT * FROM $table INNER JOIN clients ON projects.client_id = clients.client_id");
    
        // Fetch the data and encode it as JSON
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        
        // Close the database connection
        $conn->close();
    
        // Send the JSON response
        echo json_encode($data);

    } else {

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
    }


} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    $requestData = json_decode(file_get_contents("php://input"), true);

    // Extract parameters from the request data
    $id = $requestData['id']; 
    $table = $requestData['table']; 

    if ($table == 'clients') {
        // Find all project_ids related to the client
        $sqlProjectIds = "SELECT project_id FROM projects WHERE client_id = " . $conn->real_escape_string($id);
        $result = $conn->query($sqlProjectIds);

        $projectIds = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $projectIds[] = $row['project_id'];
            }
        }

        // Convert project_ids array to comma-separated string
        $projectIdsStr = implode(',', $projectIds);

        // Start transaction
        $conn->begin_transaction();

        $errorMessages = [];

        // Delete from sessions table
        if (!empty($projectIdsStr)) {
            $sqlSessions = "DELETE FROM sessions WHERE project_id IN (" . $conn->real_escape_string($projectIdsStr) . ")";
            if ($conn->query($sqlSessions) !== TRUE) {
                $errorMessages[] = "Error deleting sessions: " . $conn->error;
            }
        }

        // Delete from projects table
        $sqlProjects = "DELETE FROM projects WHERE client_id = " . $conn->real_escape_string($id);
        if ($conn->query($sqlProjects) !== TRUE) {
            $errorMessages[] = "Error deleting projects: " . $conn->error;
        }

        // Delete from clients table
        $sqlClients = "DELETE FROM clients WHERE client_id = " . $conn->real_escape_string($id);
        if ($conn->query($sqlClients) !== TRUE) {
            $errorMessages[] = "Error deleting client: " . $conn->error;
        }

        if (empty($errorMessages)) {
            // Commit transaction if no errors
            $conn->commit();
            $response = array('status' => 'success', 'message' => 'Client and related data deleted successfully');
        } else {
            // Rollback transaction if there were errors
            $conn->rollback();
            $response = array('status' => 'error', 'message' => implode(' ', $errorMessages));
        }
    } else {
        $idprefix = substr_replace($table, '', -1) . '_';
        $sql = "DELETE FROM " . $conn->real_escape_string($table) . " WHERE $idprefix" . "id = " . $conn->real_escape_string($id);

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Record deleted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error deleting record: ' . $conn->error);
        }
    }

    // Send the JSON response
    echo json_encode($response);
}

if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
  
    $requestData = json_decode(file_get_contents("php://input"), true);
    
    $id = $requestData['id']; 
    $table = $requestData['table']; 
    $data = $requestData['data']; 
    $idprefix = substr_replace($table, '', -1) . '_';

    // Initialize the SET part of the SQL query
    $setClause = '';

    // Construct the SET part of the SQL query
    foreach ($data as $column => $value) {
        if ($value === null) {
            $setClause .= $conn->real_escape_string($column) . " = NULL, ";
        } else {
            $setClause .= $conn->real_escape_string($column) . " = '" . $conn->real_escape_string($value) . "', ";
        }
    }

    // Remove the trailing comma
    $setClause = rtrim($setClause, ', ');

    // Construct the SQL query for the update operation
    $sql = "UPDATE " . $conn->real_escape_string($table) . 
           " SET " . $setClause .
           " WHERE " . $idprefix . "id = " . $conn->real_escape_string($id);

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


