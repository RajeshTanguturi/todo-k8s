require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// Environment defaults
const PORT = process.env.PORT || 4000;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
let MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/todosdb';

if (MONGO_USER && MONGO_PASS) {
  if (MONGO_URI.includes('$(MONGO_USER)') || MONGO_URI.includes('$(MONGO_PASS)')) {
    MONGO_URI = MONGO_URI
      .replace('$(MONGO_USER)', MONGO_USER)
      .replace('$(MONGO_PASS)', MONGO_PASS);
  }
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Mongo connection error:', err.message);
});

// Routes - basic CRUD for /api/todos

// Create
app.post('/api/todos', async (req, res) => {
  try {
    const todo = new Todo({ text: req.body.text });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

// Update (toggle done or change text)
app.put('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
app.delete('/api/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Health
app.get('/healthz', (req, res) => {
  res.send('OK');
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});