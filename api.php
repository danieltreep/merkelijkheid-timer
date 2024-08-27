<?php
// api.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
header('Content-Type: application/json');

$host = $_SERVER['HTTP_HOST'];

if (strpos($host, 'localhost') !== false) {
    $conn = new mysqli('localhost', 'root', 'mysql', 'timer');
} else {
    $conn = new mysqli('localhost', 'merktoday_timer', 'F9gtrL3xDU2nfMgwMrJF', 'merktoday_timer');
}

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
        $escapedColumn = $conn->real_escape_string($column);

        // Check if the value is null
        if ($value === null) {
            $escapedValue = "NULL";
        } else {
            $escapedValue = "'" . $conn->real_escape_string($value) . "'";
        }

        $columns .= $escapedColumn . ', ';
        $values .= $escapedValue . ', ';
    }

    // Remove the trailing commas
    $columns = rtrim($columns, ', ');
    $values = rtrim($values, ', ');

    $sql = "INSERT INTO $table ($columns) VALUES ($values)";

    if ($conn->query($sql) === TRUE) {
        // Get the ID of the newly added row
        $newId = $conn->insert_id;
        $response = array('status' => 'success', 'message' => 'Data added successfully', 'id' => $newId);
    } else {
        $response = array('status' => 'error', 'message' => 'Error adding data: ' . $conn->error);
    }

    echo json_encode($response);
} 

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $table = $_GET['table'];
    
    // Check if required parameters are set
    if ($table === 'users' && isset($_GET['email'])) {
        $email = urldecode($_GET['email']); // Decode the email parameter

        // Assuming $conn is your mysqli connection object
        if (!$conn) {
            throw new Exception('Database connection failed');
        }

        // Prepare a SELECT query to check if the email exists and fetch the user ID
        $stmt = $conn->prepare('SELECT user_id FROM users WHERE email = ?');
       
        $stmt->bind_param('s', $email);
        if (!$stmt->execute()) {
            throw new Exception('Execute failed: ' . $stmt->error);
        }

        $result = $stmt->get_result();
        

        $userId = null;
        if ($row = $result->fetch_assoc()) {
            $userId = $row['user_id'];
        }

        $stmt->close();
        $conn->close();

        // Prepare the response
        $response = ['user_id' => $userId];
        echo json_encode($response);

    } 

    elseif ($table === 'statuses' && (isset($_GET['user_id']) || isset($_GET['date']))) {
        // Assuming $conn is your mysqli connection object
        if (!$conn) {
            throw new Exception('Database connection failed');
        }

        // Determine the query based on the provided parameters
        if (isset($_GET['user_id'])) {
            $user_id = urldecode($_GET['user_id']); // Decode the user_id parameter
            $stmt = $conn->prepare('SELECT * FROM statuses WHERE user_id = ?');
            $stmt->bind_param('s', $user_id);
        } elseif (isset($_GET['date'])) {
            $date = urldecode($_GET['date']); // Decode the date parameter
            $stmt = $conn->prepare('SELECT * FROM statuses JOIN users ON statuses.user_id = users.user_id WHERE statuses.date = ?');
            $stmt->bind_param('s', $date);
        }

        if (!$stmt->execute()) {
            throw new Exception('Execute failed: ' . $stmt->error);
        }

        $result = $stmt->get_result();
        $statuses = [];

        while ($row = $result->fetch_assoc()) {
            $statuses[] = $row;
        }

        $stmt->close();
        $conn->close();
      
        echo json_encode($statuses);
    } 

    elseif ($table === 'sessions') {

        $days = isset($_GET['days']) ? intval($_GET['days']) : 7;
        $daysAgo = date('Y-m-d 00:00:00', strtotime('-' . $days . 'days'));

        $query = "
            SELECT *
            FROM $table
            LEFT JOIN projects ON sessions.project_id = projects.project_id
            LEFT JOIN clients ON projects.client_id = clients.client_id
            LEFT JOIN tasks ON tasks.task_id = sessions.task_id
        ";

        if (isset($_GET['startdate']) && isset($_GET['enddate'])) { // Haal sessies op op tussen aangegeven data
            $endDate = $_GET['enddate'];
            $startDate = $_GET['startdate'];

            $endDateTimestamp = strtotime($endDate);
            $startDateTimestamp = strtotime($startDate);

            $formattedStartDate = date('Y-m-d 00:00:00', $startDateTimestamp);
            $formattedEndDate = date('Y-m-d 23:59:59', $endDateTimestamp);

            $enddate = "BETWEEN '$formattedStartDate' AND '$formattedEndDate'";

            $query .= "
                WHERE sessions.created_at $enddate
                ORDER BY sessions.created_at DESC
            ";
        } elseif (isset($_GET['userid'])) { // Haal sessies op van de gebruiker of die gedeeld zijn, van de laatste 7 dagen voor op de home
            $userid = $_GET['userid'];
            
            $query .= "
                WHERE (user_id = $userid OR JSON_CONTAINS(shared_with, '\"$userid\"', '$')) AND sessions.created_at >= '$daysAgo'
                ORDER BY sessions.created_at DESC
            ";
        } elseif (isset($_GET['isrunning'])) { // Haal alle lopende sessies op voor het tonen van online collega's
            $query .= "
                LEFT JOIN users ON users.user_id = sessions.user_id
                WHERE sessions.is_running = true
            ";
        } elseif (!isset($_GET['userid'])) { // Haal van alle collega's sessies op van de laatste ... dagen

            $query .= "
                WHERE sessions.created_at >= '$daysAgo'
            ";
        }

        if ($query !== "") {
            $result = $conn->query($query);

            // Check if the query was successful
            if (!$result) {
                die('Query error: ' . $conn->error);
            }

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
    }

    elseif ($table === 'projects') {
        
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
        $result = $conn->query("SELECT * FROM $table");
    
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
} 

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

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
        $idprefix = $table === 'statuses' ? substr_replace($table, '', -2) . '_' : substr_replace($table, '', -1) . '_';
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
    $idprefix = $table === 'statuses' ? substr_replace($table, '', -2) . '_' : substr_replace($table, '', -1) . '_';

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


