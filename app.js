const express = require('express');
const app = express();
const mongoose = require('mongoose');

const User = require('./models/user')

const port = 3000;

mongoose.connect('mongodb://localhost:27017/sample');
 
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");    
});


app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome on landing page')
})

app.post('/seed-data', async (req, res) => {
    const data = req.body;
    const user = await User.create(data, (err, result) => {
        if(err) {
            res.send(err)
        } else {
            res.send('data inserted successfully')  
        }
    })
})

app.listen(port, (req, res) => {
    console.log(`listening on port ${port}`);
})