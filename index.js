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


app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error querying products:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});


app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error querying product by ID:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results[0]);
  });
});;


app.post('/products', (req, res) => {
  const { name, description } = req.body;
  db.query('INSERT INTO products (name, description) VALUES (?, ?)', [name, description], (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Product added successfully', id: result.insertId });
  });
});


app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  db.query('UPDATE products SET name = ?, description = ? WHERE id = ?', [name, description, id], (err) => {
    if (err) {
      console.error('Error updating product:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Product updated successfully' });
  });
});


app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
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
  const { id, name, designation, department, salary } = req.query;
  const params = [];
  let sql = 'SELECT * FROM employees WHERE 1 = 1';

  if (id) {
    sql += ' AND id = ?';
    params.push(id);
  }

  if (name) {
    sql += ' AND name LIKE ?';
    params.push(`%${name}%`);
  }

  if (designation) {
    sql += ' AND designation LIKE ?';
    params.push(`%${designation}%`);
  }

  if (department) {
    sql += ' AND department LIKE ?';
    params.push(`%${department}%`);
  }

  if (salary) {
    sql += ' AND salary = ?';
    params.push(salary);
  }

  if (params.length === 0) {
    return res.status(400).json({ error: 'At least one query parameter is required' });
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error querying employees:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

app.post('/employees', (req, res) => {
  const { name, designation, department, salary } = req.body;
  db.query('INSERT INTO employees (name, designation, department, salary) VALUES (?, ?, ?, ?)', [name, designation, department, salary], (err, result) => {
    if (err) {
      console.error('Error adding employee:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Employee added successfully', id: result.insertId });
  });
});

app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, designation, department, salary } = req.body;
  db.query('UPDATE employees SET name = ?, designation = ?, department = ?, salary = ? WHERE id = ?', [name, designation, department, salary, id], (err) => {
    if (err) {
      console.error('Error updating employee:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Employee updated successfully' });
  });
});


app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM employees WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting employee:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Employee deleted successfully' });
  });
});




app.get('/availability', (req, res) => {
  db.query('SELECT * FROM availability', (err, results) => {
    if (err) {
      console.error('Error querying availability:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'List of Available Rooms', data: results });
  });
});

app.get('/availability/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM availability WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching availability:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length === 0) {
      console.log('Room is not available or Booked');
      res.status(404).json({ error: 'Room not found' });
    } else {
      console.log('Availability fetched successfully');
      res.json({ message: 'Room is Available', data: results });
    }
  });
});

app.put('/availability/:id', (req, res) => {
  const { id } = req.params;
  const { room_no, floor_no, category, charges, status } = req.body; 

  db.query('UPDATE booked SET status = ? WHERE id = ?', ['Available', id], (error) => {
    if (error) {
      console.error('Error updating booked status:', error);
      res.status(500).json({ error: 'An error occurred while updating booked status' });
      return;
    }
    
    db.query('INSERT INTO availability (room_no, floor_no, category, charges, status) VALUES (?, ?, ?, ?, ?)', 
      [room_no, floor_no, category, charges, status], 
      (err) => {
        if (err) {
          console.error('Error adding availability:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.status(200).json({ message: 'Room made available successfully' });
    });
  });
});

app.post('/availability', (req, res) => {
  const { room_no, floor_no, category, charges, status } = req.body; 

  db.query('INSERT INTO booked (room_no, floor_no, category, charges, status) VALUES (?, ?, ?, ?, ?)', 
    [room_no, floor_no, category, charges, status], 
    (err) => {
      if (err) {
        console.error('Error adding availability:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      db.query('DELETE FROM availability WHERE room_no = ? AND floor_no = ? AND category = ?', 
        [room_no, floor_no, category], 
        (err) => {
          if (err) {
            console.error('Error deleting availability:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          res.json({ message: 'Room booked successfully' });
      });
  });
});