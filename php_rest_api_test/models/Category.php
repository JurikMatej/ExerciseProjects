<?php
  class Category {
    // DB params
    private $conn;
    private $table = 'categories';

    // Post properties
    public $id;
    public $name;
    public $created_at;

        
    // Construct with database object
    public function __construct($db)
    {
      $this->conn = $db;
    }

    /**
     * Get all category records present in database
     */
    public function read() 
    {
      // Create query
      $sql = "
      SELECT 
        id,
        name,
        created_at
      FROM
        $this->table
      ORDER BY 
        created_at DESC
      ;";

      // Prepare statement
      $stmt = $this->conn->prepare($sql);

      // Execute statement
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
      $query = "
      SELECT
        id,
        name
      FROM
        $this->table
      WHERE 
        id = ?
      LIMIT 1;";

      //Prepare statement
      $stmt = $this->conn->prepare($query);
      
      // Bind ID
      $stmt->bindParam(1, $this->id);
      
      // Execute query
      $stmt->execute();
      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      
      // set properties
      $this->id = $row['id'];
      $this->name = $row['name'];
    }


    /**
     * Create Category
     * @return boolean
     */ 
    public function create() 
    {
      // Create Query
      $query = "
      INSERT INTO
        $this->table
      SET
        name = :name;";
      
      // Prepare Statement
      $stmt = $this->conn->prepare($query);
      
      // Clean data
      $this->name = htmlspecialchars(strip_tags($this->name));
      
      // Bind data
      $stmt-> bindParam(':name', $this->name);
      
      // Execute query
      if($stmt->execute()) {
        return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);
      return false;
    }
      
      
      /**
       * Update any existing category
       * @return boolean
       */
      public function update() {
        // Create Query
        $query = 
        "UPDATE 
          $this->table 
        SET
          name = :name
        WHERE
          id = :id;";
      
      // Prepare Statement
      $stmt = $this->conn->prepare($query);
      
      // Clean data
      $this->name = htmlspecialchars(strip_tags($this->name));
      $this->id = htmlspecialchars(strip_tags($this->id));
      
      // Bind data
      $stmt-> bindParam(':name', $this->name);
      $stmt-> bindParam(':id', $this->id);
      
      // Execute query
      if($stmt->execute()) {
        return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);
      return false;
    }

    
    /**
     * Delete any existing category
     * @return boolean
     */
    public function delete() 
    {
      // Create query
      $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';
      
      // Prepare Statement
      $stmt = $this->conn->prepare($query);
      
      // clean data
      $this->id = htmlspecialchars(strip_tags($this->id));
      
      // Bind Data
      $stmt-> bindParam(':id', $this->id);
      
      // Execute query
      if($stmt->execute()) {
        return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);
        return false;
    } 
  }