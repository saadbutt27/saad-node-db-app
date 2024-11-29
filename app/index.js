// app/index.js
const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Create a connection to the database
const db = mysql.createConnection({
  host: "mysql_db_cont",
  user: "saadbutt",
  password: "saad246",
  database: "saaddb",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Could not connect to database:", err);
  } else {
    console.log("Connected to MySQL database.");

    // Create 'user' table if it doesn't exist
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS user (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email_id VARCHAR(100),
        date_of_birth DATE
      );
    `;

    db.query(createUserTableQuery, (err) => {
        if (err) {
          console.error("Error creating user table:", err);
        } else {
          console.log("User table created or already exists.");
  
          // Insert sample data if table is empty
          const insertSampleDataQuery = `
            INSERT INTO user (name, email_id, date_of_birth) VALUES
            ('Saad Butt', 'saad@email.com', '2002-07-27'),
            ('Muhammad Usman', 'usman@email.com', '2001-11-13'),
            ('Abdul Rahim', 'rahim@email.com', '1996-08-03'),
            ('Daniyal Alam', 'daniyal@email.com', '2001-09-18')
            ON DUPLICATE KEY UPDATE name = name; 
          `;
  
          db.query(insertSampleDataQuery, (err) => {
            if (err) {
              console.error("Error inserting sample data:", err);
            } else {
              console.log("Sample data inserted into user table.");
            }
          });
        }
    });
  }
});

// Basic route to query the database
app.get("/", (req, res) => {
  db.query("SELECT 'Connection Successful' AS message", (error, results) => {
    if (error) {
      res.send("Error querying the database");
    } else {
      res.json(results[0]);
    }
  });
});

app.get("/users", (req, res) => {
    const query = "SELECT * FROM user";
    db.query(query, (error, results) => {
      if (error) {
        console.error("Error retrieving user data:", error);
        res.status(500).send("Error retrieving user data");
      } else {
        res.json(results);
      }
    });
});

// Start server
app.listen(port, () => {
  console.log(`Node.js app running on http://localhost:${port}`);
});
