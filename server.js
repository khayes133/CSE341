const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 8080; 
const mongodb = require('./db/connect'); 
const bodyParser = require('body-parser'); 

app.use('/', require('./routes/'));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allor-Origin', '*'); 
    next(); 
}); 

mongodb.initDb((err, mongodb) => {
    if(err) {
        console.log(err); 
    }
    else{
        app.listen(port); 
        console.log(`Connected to the database and listening on port ${port}`);
    }
});



