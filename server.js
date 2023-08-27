// server.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const app = express();

// Set up server port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// server.js


const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to the database');
});

mongoose.connection.on('error', (err) => {
  console.error(`Database connection error: ${err}`);
});
// server.js

const User = require('./models/user');

// GET: Return all users
app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(users);
  });
});

// POST: Add a new user to the database
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;

  const newUser = new User({ name, email, age });

  newUser.save((err, user) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(user);
  });
});

// PUT: Edit a user by ID
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  User.findByIdAndUpdate(
    id,
    { name, email, age },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json(user);
    }
  );
});

// DELETE: Remove a user by ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  User.findByIdAndRemove(id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: 'User removed successfully' });
  });
});
