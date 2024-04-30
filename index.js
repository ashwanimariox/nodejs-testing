const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'Ashwani123456789',
  database: 'nodejs_rest_api',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.use('/products', cors());
// Get all users
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
  // Get a user by ID
  app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    });
  });
  
  // Create a new user
  app.post('/products', (req, res) => {
    const { name, description } = req.body;
    db.query('INSERT INTO products (name, description) VALUES (?, ?)', [name, description], (err, result) => {
      if (err) throw err;
      res.json({ message: 'User added successfully', id: result.insertId });
    });
  });
  
  // Update a user
  app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    db.query('UPDATE products SET name = ?, description = ? WHERE id = ?', [name, description, id], (err) => {
      if (err) throw err;
      res.json({ message: 'User updated successfully' });
    });
  });
  
  // Delete a user
  app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
      if (err) throw err;
      res.json({ message: 'User deleted successfully' });
    });
  });
// Get all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get all cities
app.get('/cities', (req, res) => {
  db.query('SELECT * FROM cities', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get all companies
app.get('/company', (req, res) => {
  db.query('SELECT * FROM company', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// Get All Employees
app.get('/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, result) => {
  if (err) throw err;
  res.json(results);
 });
});

// Get employee by id
app.get('/employees/:id', (req, res) =>{
   const {id} = req.params;
   query.db('SELECT * FROM employees WHERE id = ?', [id], (err, results) => {
      if (err) throw err;
      res.json(results[0]);
   });
 })
})
