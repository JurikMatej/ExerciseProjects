<?php
  class Post {
    // Params
    private $conn;
    private $table = 'posts';

    // Post properties
    public $id;
    public $category_id;
    public $category_name;
    public $title;
    public $body;
    public $author;
    public $created_at;

    
    // Construct with database object
    public function __construct($db)
    {
      $this->conn = $db;
    }

    /**
     * Get all post records present in the database 
     * @return PDOStatement
     */
    public function read() {
      // Create query
      $sql = 
      "SELECT 
        c.name as category_name, 
        p.id, 
        p.category_id, 
        p.title, 
        p.body, 
        p.author, 
        p.created_at 
      FROM 
        $this->table p 
      LEFT JOIN 
        categories c ON p.category_id = c.id 
      ORDER BY 
        p.created_at DESC;"; 

      // Prepare statement
      $stmt = $this->conn->prepare($sql);
      
      // Execute query
      $stmt->execute();

      return $stmt;
    }


    /**
     * Get a single post record from the database
     * @return void
     */
    public function read_single() 
    {
      // Create query
      $sql = 
      "SELECT 
        c.name as category_name, 
        p.id, 
        p.category_id, 
        p.title, 
        p.body, 
        p.author, 
        p.created_at 
      FROM 
        $this->table p 
      LEFT JOIN 
        categories c ON p.category_id = c.id 
      WHERE 
        p.id = :id
      LIMIT 
        0, 1";
      
      // Prepare statement
      $stmt = $this->conn->prepare($sql);
      // Bind id
      $stmt->bindParam('id', $this->id);
      // Execute query
      $stmt->execute();

      // Set values to the calling instance
      $row = $stmt->fetch(PDO::FETCH_ASSOC);

      $this->title        = $row['title'];
      $this->body         = $row['body'];
      $this->author       = $row['author'];
      $this->category_id    = $row['category_id'];
      $this->category_name  = $row['category_name'];
    }


    /**
     * Create a new post 
     */
    public function create() 
    {
      // Create query
      $sql = "
      INSERT INTO
        $this->table
      SET 
        title = :title,
        body = :body,
        author = :author,
        category_id = :category_id
      ;";

      // Prepare statement
      $stmt = $this->conn->prepare($sql);

      // Clean data
      $this->title = htmlspecialchars(strip_tags($this->title));
      $this->body = htmlspecialchars(strip_tags($this->body));
      $this->author = htmlspecialchars(strip_tags($this->author));
      $this->category_id = htmlspecialchars(strip_tags($this->category_id));

      // Bind data
      $stmt->bindParam('id', $this->id);
      $stmt->bindParam('title', $this->title);
      $stmt->bindParam('body', $this->body);
      $stmt->bindParam('author', $this->author);
      $stmt->bindParam('category_id', $this->category_id);

      if ($stmt->execute()) {
        return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);
    }

    /**
     * Update any existing post 
     */
    public function update() 
    {
      // Create query
      $sql = "
      UPDATE
        $this->table
      SET 
        title = :title,
        body = :body,
        author = :author,
        category_id = :category_id
      WHERE 
        id = :id
      ;";

      // Prepare statement
      $stmt = $this->conn->prepare($sql);

      // Clean data
      $this->id = htmlspecialchars(strip_tags($this->id));
      $this->title = htmlspecialchars(strip_tags($this->title));
      $this->body = htmlspecialchars(strip_tags($this->body));
      $this->author = htmlspecialchars(strip_tags($this->author));
      $this->category_id = htmlspecialchars(strip_tags($this->category_id));

      // Bind data
      $stmt->bindParam('id', $this->id);
      $stmt->bindParam('title', $this->title);
      $stmt->bindParam('body', $this->body);
      $stmt->bindParam('author', $this->author);
      $stmt->bindParam('category_id', $this->category_id);

      if ($stmt->execute()) {
        return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);
    }


    /**
     * Delete any existing post
     */
    public function delete() 
    {
      // Create query
      $sql = "
      DELETE FROM
        $this->table
      WHERE 
        id = :id
      ;";

      // Prepare statement
      $stmt = $this->conn->prepare($sql);

      // Clean data
      $this->id = htmlspecialchars(strip_tags($this->id));

      // Bind data
      $stmt->bindParam('id', $this->id);

      if ($stmt->execute()) {
        return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);
    }
  }