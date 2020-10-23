<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/Category.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  $category = new Category($db);

  // Category query
  $result = $category->read();
  // Get row count
  $num = $result->rowCount();

  // Check if any category are available
  if ($num > 0) {
    // Category array
    $cat_arr = [];

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
      // Make $row key's values available locally
      extract($row);

      $cat_item = [
        'id' => $id,
        'name' => $name,
        'created_at' => $created_at
      ];
      // Push to data
      array_push($cat_arr, $cat_item);
    }
    // Turn to JSON & output
    echo json_encode($cat_arr);
  } else {
    // No Posts
    echo json_encode(['message' => 'No Category Found']);
  }
