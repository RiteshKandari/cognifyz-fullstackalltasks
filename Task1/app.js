const express = require('express');
const app = express();
const port = 3000;

// EJS ko view engine ke roop mein set karein
app.set('view engine', 'ejs');

// Middleware: Form data (URL-encoded) ko parse karne ke liye
app.use(express.urlencoded({ extended: true }));

// GET route: Homepage (form display karne ke liye)
app.get('/', (req, res) => {
  res.render('index');
});

// POST route: Form submission ko handle karne ke liye
app.post('/submit', (req, res) => {
  const userData = req.body; // Form data ko retrieve karte hain
  console.log('Received Data:', userData);
  // User data ko result page par render karte hain
  res.render('result', { data: userData });
});

// Server ko start karein
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
