const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser") 
//middle man
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });
const port = 80;


// define mongoose schema 
const contactSchema = new mongoose.Schema({
    //  A mongoose schema defines the shape of documents inside a particular collection
    name: String,
    phone: String,
    gmail: String,
    address: String

});

const contact = mongoose.model('contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    var mydata = new contact(req.body);
    mydata.save().then(() => {
        res.send("this is item been saved to the database")
    }).catch(() => {
        res.status(400).send("item was not save to the database")
    })
    // res.status(200).render('contact.pug', ); 
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});