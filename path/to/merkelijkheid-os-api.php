<?php

// Include the database connection file
require_once 'db_connection.php';

// Check if the table parameter is set in the URL
if (isset($_GET['table'])) {
    $table = $_GET['table'];

    // Check if the user_id parameter is set in the URL
    if (isset($_GET['user_id'])) {
        $user_id = $_GET['user_id'];
        
        // Query to select all deliverables with parent information when available
        $sql = "SELECT uwd.*, 
                d.deliverable_title as parent_deliverable_title 
                FROM upcoming_weeks_deliverables uwd 
                LEFT JOIN deliverables d ON uwd.parent_deliverable_id = d.deliverable_id 
                WHERE uwd.assignee_user_id = $user_id 
                AND uwd.is_archived = '0' 
                AND uwd.is_done = '0'";
        
        $result = $conn->query($sql);
        
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