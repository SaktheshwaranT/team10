const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 4091;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/bakery');
const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB connection successful");
});

const userSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    EmailAddress: String,
    PhoneNumber: String,
    FoodName: String,
    HowMuch: String,
    YourAddress: String
});

const users = mongoose.model("data", userSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '1.html'));
});

// POST route to handle form submission
app.post('/submit-order', (req, res) => {
    const newUser = new users({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        EmailAddress: req.body.EmailAddress,
        PhoneNumber: req.body.PhoneNumber,
        FoodName: req.body.FoodName,
        HowMuch: req.body.HowMuch,
        YourAddress: req.body.YourAddress
    });

    newUser.save()
        .then(() => res.send("Order saved successfully"))
        .catch(err => res.status(400).send("Error saving order: " + err));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
