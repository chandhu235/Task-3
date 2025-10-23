const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien' },
  { id: 2, title: '1984', author: 'George Orwell' }
];
app.get('/', (req, res) => {
  res.send('Welcome to the Books API! Try /books to see all books.');
});

app.get('/books', (req, res) => res.json(books));

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ message: 'Title and author required' });

  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  const deleted = books.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(PORT, () => console.log(`📚 Server running on http://localhost:${PORT}`));
