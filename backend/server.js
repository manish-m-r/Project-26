const express = require('express');
const connectDB = require('./config/db');
const master = require('./models/master');


const app = express();
connectDB();

app.use(express.json({ extended: false}));

app.get('/',(req,res) => res.send('API Running'));

app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/coach', require('./routes/api/coach'));
app.use('/api/referee', require('./routes/api/referee'));
app.use('/api/tournament', require('./routes/api/tournament'));
app.use('/api/team', require('./routes/api/team'));
app.use('/api/login', require('./routes/api/login'));
app.use('/api/pending', require('./routes/api/pending'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));