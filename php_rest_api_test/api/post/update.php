<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: PUT');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Post.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  $post = new Post($db);

  // Get raw posted data
  $data = json_decode(file_get_contents("php://input")); 

  // Store posted data to post object instance
  $post->id = $data->id;
  $post->title = $data->title;
  $post->body = $data->body;
  $post->author = $data->author;
  $post->category_id = $data->category_id;

  // Create post
  if ($post->update()) {
    echo json_encode(
      ['message' => 'Post Updated']
    );
  } else {
    echo json_encode(
      ['message' => 'Post Not Updated']
    );
  }