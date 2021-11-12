const express = require('express');
const path= require('path')
const connectDB = require('./config/db');
var cors = require('cors');
const app = express();

//app.get('/',(req,res) => res.send('API Running'));
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/team', require('./routes/api/team'));
app.use('/api/referee', require('./routes/api/referee'));


// GET route '/'
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/HtmlAndCss/index.html')); 
})

app.get('/referee.html', function (req, res) {
   res.sendFile(path.join(__dirname + '/HtmlAndCss/referee.html'));
})

app.get('/refereeSignUP.html', function (req, res) {
   res.sendFile(path.join(__dirname + '/HtmlAndCss/refereeSignUP.html'));
})


app.get('/admin.html', function (req, res) {
   res.sendFile(path.join(__dirname + '/HtmlAndCss/admin.html')); 
})




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));