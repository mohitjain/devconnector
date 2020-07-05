const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Init Middle Ware
app.use(express.json({ extended: false }));

// Connect Database
connectDB();

// Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.get('/', (req, res) => res.send('Api Running'));

app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`);
});
