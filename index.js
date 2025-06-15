const express = require('express');
const mysql = require('mysql2');

// Initialize Express application
const app = express();
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Agregar contraseña de usuario local
    database: 'blogdb'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Crear post
app.post('/api/posts', (req, res) => {
    const { titulo, descripcion, fecharegistro, categoria, idautor } = req.body;
    const sql = 'INSERT INTO posts (titulo, descripcion, fecharegistro, categoria, idautor) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [titulo, descripcion, fecharegistro, categoria, idautor], (err, result) => {
        if (err) throw err;
        res.status(201).send({ idpost: result.insertId, titulo });
    });
});
// Leer posts
app.get('/api/posts', (req, res) => {
    const sql = `SELECT * FROM posts p
                JOIN autores a ON a.idautor = p.idautor
                ORDER BY p.fecharegistro DESC;`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Crear autor
app.post('/api/autor', (req, res) => {
    const { nombre, email, imagen } = req.body;
    const sql = 'INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)';
    db.query(sql, [nombre, email, imagen], (err, result) => {
        if (err) throw err;
        res.status(201).send({ idautor: result.insertId, nombre });
    });
});
// Leer autores
app.get('/api/autores', (req, res) => {
    const sql = 'SELECT * FROM autores';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


// Leer post by ID
app.get('/api/post/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM posts P
                JOIN autores A ON A.idautor = P.idautor
                WHERE p.idpost = ?;`;
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(404).send('Post no encontrado');
        }
        res.send(results[0]);
    });
});
// Leer posts by author ID
app.get('/api/posts/autor/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM posts P
                JOIN autores A ON A.idautor = P.idautor
                WHERE P.idautor = ?
                ORDER BY P.fecharegistro DESC;`;
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(404).send('Este autor no tiene posts registrados');
        }
        res.send(results);
    });
});


// Start the server
app.listen(3000, () => {
    console.log('Server listening at http://localhost:3000');
});