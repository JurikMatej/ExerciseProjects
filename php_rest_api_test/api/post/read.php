<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/Post.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  $post = new Post($db);

  // Post query
  $result = $post->read();
  // Get row count
  $num = $result->rowCount();

  // Check if any posts are available
  if ($num > 0) {
    // Post array
    $posts_arr = [];

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
      // Make $row key's values available locally
      extract($row);

      $post_item = [
        'id' => $id,
        'title' => $title,
        'body' => html_entity_decode($body),
        'author' => $author,
        'category_id' => $category_id,
        'category_name' => $category_name
      ];
      // Push to data
      array_push($posts_arr, $post_item);
    }
    // Turn to JSON & output
    
    echo json_encode($posts_arr);
  } else {
    // No Posts
    echo json_encode(['message' => 'No Posts Found']);
  }
