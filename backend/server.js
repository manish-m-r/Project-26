const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

const app = express();

app.get('/',(req,res) => res.send('API Running'));
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/team', require('./routes/api/team'));
app.use('/api/referee', require('./routes/api/referee'));
app.use('/api/tournaments', require('./routes/api/tournaments'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));