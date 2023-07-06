const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the Intro to Node and Express program!");
});

let resources = [
  { id: 1, name: 'Resource 1' },
  { id: 2, name: 'Resource 2' },
  { id: 3, name: 'Resource 3' }
];

app.use(express.json());

// Get all resources
app.get('/resources', (req, res) => {
  res.json(resources);
});

// Get a specific resource by ID
app.get('/resources/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const resource = resources.find(resource => resource.id === id);
  if (!resource) {
    res.status(404).json({ error: 'Resource not found' });
  } else {
    res.json(resource);
  }
});

// Create a new resource
app.post('/resources', (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    res.status(400).json({ error: 'Missing required fields' });
  } else {
    const newResource = { id, name };
    resources.push(newResource);
    res.status(201).json(newResource);
  }
});

// Update an existing resource
app.put('/resources/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const resource = resources.find(resource => resource.id === id);
  if (!resource) {
    res.status(404).json({ error: 'Resource not found' });
  } else if (!name) {
    res.status(400).json({ error: 'Missing required fields' });
  } else {
    resource.name = name;
    res.json(resource);
  }
});

// Delete a resource
app.delete('/resources/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = resources.findIndex(resource => resource.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Resource not found' });
  } else {
    const deletedResource = resources.splice(index, 1);
    res.json(deletedResource[0]);
  }
});

// Invalid route handler
app.use((req, res) => {
  res.status(404).json({ error: 'Invalid route' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
