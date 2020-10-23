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
  $post->id = isset($_GET['id']) ? $_GET['id'] : exit();

  // Get post
  $post->read_single();

  // Create array for json
  $post_item = [
    'id' => $post->id,
    'title' => $post->title,
    'body' => html_entity_decode($post->body),
    'author' => $post->author,
    'category_id' => $post->category_id,
    'category_name' => $post->category_name
  ];

  // Make JSON & output
  echo json_encode($post_item);