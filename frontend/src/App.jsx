import React, { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || '';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  async function fetchTodos() {
    const res = await fetch(`${API_BASE}/api/todos`);
    setTodos(await res.json());
  }

  useEffect(() => { fetchTodos(); }, []);

  async function addTodo(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await fetch(`${API_BASE}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    setText('');
    await fetchTodos();
  }

  async function toggleDone(id, done) {
    await fetch(`${API_BASE}/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !done })
    });
    await fetchTodos();
  }

  async function deleteTodo(id) {
    await fetch(`${API_BASE}/api/todos/${id}`, { method: 'DELETE' });
    await fetchTodos();
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>Todo (K8s Demo)</h2>

      <form onSubmit={addTodo}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="New todo" />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(t => (
          <li key={t._id} style={{ marginTop: 8 }}>
            <input type="checkbox" checked={t.done} onChange={() => toggleDone(t._id, t.done)} />
            <span style={{ marginLeft: 8, textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>
            <button style={{ marginLeft: 12 }} onClick={() => deleteTodo(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}