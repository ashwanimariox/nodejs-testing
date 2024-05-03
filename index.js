const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

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


app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});


app.post('/products', (req, res) => {
  const { name, description } = req.body;
  db.query('INSERT INTO products (name, description) VALUES (?, ?)', [name, description], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Product added successfully', id: result.insertId });
  });
});


app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  db.query('UPDATE products SET name = ?, description = ? WHERE id = ?', [name, description, id], (err) => {
    if (err) throw err;
    res.json({ message: 'Product updated successfully' });
  });
});


app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Product deleted successfully' });
  });
});


app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


app.get('/cities', (req, res) => {
  db.query('SELECT * FROM cities', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


app.get('/company', (req, res) => {
  db.query('SELECT * FROM company', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


app.get('/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => { 
    if (err) throw err;
    res.json(results);
  });
});


app.get('/employees/:id', (req, res) =>{
   const { id } = req.params;
   db.query('SELECT * FROM employees WHERE id = ?', [id], (err, results) => { 
      if (err) throw err;
      res.json(results[0]);
   });
});


app.post('/employees', (req, res) => {
  const { name, designation, department, salary } = req.body;
  db.query('INSERT INTO employees (name, designation, department, salary) VALUES (?, ?, ?, ?)', [name, designation, department, salary], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Employee added successfully', id: result.insertId });
  });
});


app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, designation, department, salary } = req.body;
  db.query('UPDATE employees SET name = ?, designation = ?, department = ?, salary = ? WHERE id = ?', [name, designation, department, salary, id], (err) => { 
    if (err) throw err;
    res.json({ message: 'Employee updated successfully' });
  });
});


app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM employees WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Employee deleted successfully' });
  });
});


app.get('/employees', (req, res) => {
  
  const { name, designation, salary } = req.query;
  
  
  let sql = 'SELECT * FROM employees WHERE 1';
  const params = [];

  if (name) {
    sql += ' AND name LIKE ?';
    params.push(`%${name}%`);
  }

  if (designation) {
    sql += ' AND designation LIKE ?';
    params.push(`%${designation}%`);
  }

  if (salary) {
    sql += ' AND salary = ?';
    params.push(salary);
  }

  
  db.query(sql, params, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/availability', (req, res) => {
  db.query('SELECT * FROM availability', (err, results) => {
    if (err) throw err;
    res.json({ message: 'List of Available Rooms', data: results });
  });
});



app.put('/availability/:id', (req, res) => {
  const { id } = req.params;
  const { room_no, floor_no, category, charges } = req.body;
  db.query('UPDATE availability SET room_no = ?, floor_no = ?, category = ?, charges = ? WHERE id = ?', [room_no, floor_no, category, charges, id], (err) => {
    if (err) throw err;
    res.json({ message: 'Room Booked Successfully' });
  });
});

app.post('/availability/:id', (req, res) => {
  const { id } = req.params;
  const { room_no, floor_no, category, charges } = req.body;
  db.query('INSERT INTO availability (room_no, floor_no, category, charges) VALUES (?, ?, ?, ?)', [room_no, floor_no, category, charges], (err) => {
    if (err) throw err;
    res.json({ message: 'Room Added Successfully' });
  });
});