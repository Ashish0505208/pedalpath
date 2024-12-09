const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize SQLite Database
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the users database.');

        // Create users table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    }
});

// Route to handle user sign-up
app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        if (row) {
            return res.status(400).json({ error: 'User already exists' });
        } else {
            // Insert user into the database
            const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            db.run(sql, [name, email, password], function(err) {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: 'Failed to create user' });
                }
                console.log(`Inserted user with email: ${email}`);
                return res.status(201).json({ message: 'User created successfully' });
            });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Received login request:', email, password); // Debug log

    db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        if (row) {
            console.log(`User ${email} logged in successfully.`);
            return res.status(200).json({ message: 'Login successful' });
        } else {
            console.log(`Login failed for ${email}.`);
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});
